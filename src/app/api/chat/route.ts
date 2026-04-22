/**
 * POST /api/chat
 *
 * Streaming chat endpoint that powers the Don widget.
 * Server-Sent Events over a Fetch streaming response (Next 16 App Router).
 *
 * Body: {
 *   lead: { name, email, company?, vessel?, whatsapp? },
 *   messages: [{ role: "user"|"assistant", content: string }]
 * }
 *
 * Response: text/plain stream of raw token deltas. Client appends as they arrive.
 *
 * Safety / abuse guards built-in:
 *   - Require ANTHROPIC_API_KEY env var (fails fast if missing).
 *   - Reject malformed body with 400.
 *   - Cap single message length at 2000 chars.
 *   - Cap total conversation history at 20 messages.
 *   - Cap total prompt tokens indirectly via `max_tokens` output cap.
 *   - No durable rate limit yet — TODO hook Upstash / Vercel KV pre-launch.
 *
 * Source of Don's identity: src/lib/don-prompt.ts
 */

import Anthropic from "@anthropic-ai/sdk";
import { buildDonSystemPrompt, type DonLead } from "@/lib/don-prompt";
import { contact } from "@/lib/site";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MODEL = "claude-sonnet-4-5";
const MAX_OUTPUT_TOKENS = 1024;
const MAX_MESSAGE_CHARS = 2000;
const MAX_HISTORY = 20;

const OFFLINE_FALLBACK = `Sorry — I'm offline right now. You can still reach us directly on WhatsApp at ${contact.whatsapp.display} or email ${contact.emails.operations}, and the Daron team will pick it up.`;

/**
 * Produce a visitor-safe message from any thrown error.
 * Real error details go to the server log (Vercel log stream) for Luther.
 */
function userFacingFallback(err: unknown): string {
  const code = (err as { status?: number })?.status;
  // Don't reveal "invalid api key" or internals to a visitor.
  if (code === 401 || code === 403) return OFFLINE_FALLBACK;
  if (code === 429) return "Don's handling a lot of conversations right now — try again in a minute.";
  if (code === 529) return "Daron AI is briefly overloaded. Please try again shortly.";
  return OFFLINE_FALLBACK;
}

type IncomingMessage = { role: "user" | "assistant"; content: string };

type ChatPayload = {
  lead: DonLead;
  messages: IncomingMessage[];
};

function isValidLead(x: unknown): x is DonLead {
  if (!x || typeof x !== "object") return false;
  const l = x as Record<string, unknown>;
  return (
    typeof l.name === "string" &&
    l.name.trim().length > 0 &&
    l.name.length < 200 &&
    typeof l.email === "string" &&
    l.email.includes("@") &&
    l.email.length < 200 &&
    (l.company === undefined || (typeof l.company === "string" && l.company.length < 200)) &&
    (l.vessel === undefined || (typeof l.vessel === "string" && l.vessel.length < 200)) &&
    (l.whatsapp === undefined || (typeof l.whatsapp === "string" && l.whatsapp.length < 50))
  );
}

function isValidMessages(x: unknown): x is IncomingMessage[] {
  if (!Array.isArray(x)) return false;
  if (x.length === 0 || x.length > MAX_HISTORY) return false;
  return x.every(
    (m) =>
      m &&
      typeof m === "object" &&
      (m.role === "user" || m.role === "assistant") &&
      typeof m.content === "string" &&
      m.content.length > 0 &&
      m.content.length <= MAX_MESSAGE_CHARS,
  );
}

export async function POST(request: Request) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return Response.json(
      {
        error:
          "Don is offline right now. (Server missing ANTHROPIC_API_KEY — please add one in Vercel env and redeploy.)",
      },
      { status: 503 },
    );
  }

  let body: ChatPayload;
  try {
    body = (await request.json()) as ChatPayload;
  } catch {
    return Response.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  if (!isValidLead(body.lead)) {
    return Response.json({ error: "Missing or invalid contact details." }, { status: 400 });
  }
  if (!isValidMessages(body.messages)) {
    return Response.json({ error: "Invalid message history." }, { status: 400 });
  }

  const client = new Anthropic({ apiKey });

  // Open the stream outside the ReadableStream so we can catch initial auth /
  // config errors before returning the response and render a clean fallback.
  let stream;
  try {
    stream = await client.messages.stream({
      model: MODEL,
      max_tokens: MAX_OUTPUT_TOKENS,
      system: buildDonSystemPrompt(body.lead),
      messages: body.messages.map((m) => ({ role: m.role, content: m.content })),
    });
  } catch (err) {
    // Log full detail server-side for Luther; return a friendly body to the visitor.
    console.error("[chat] stream open failed:", err);
    return new Response(userFacingFallback(err), {
      status: 200,
      headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" },
    });
  }

  const encoder = new TextEncoder();
  const readable = new ReadableStream<Uint8Array>({
    async start(controller) {
      try {
        for await (const chunk of stream) {
          if (
            chunk.type === "content_block_delta" &&
            chunk.delta.type === "text_delta" &&
            chunk.delta.text
          ) {
            controller.enqueue(encoder.encode(chunk.delta.text));
          }
        }
      } catch (err) {
        // Mid-stream failure — write the friendly fallback, log the real cause.
        console.error("[chat] mid-stream failure:", err);
        controller.enqueue(encoder.encode(`\n\n${userFacingFallback(err)}`));
      } finally {
        controller.close();
      }
    },
  });

  return new Response(readable, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Accel-Buffering": "no",
    },
  });
}
