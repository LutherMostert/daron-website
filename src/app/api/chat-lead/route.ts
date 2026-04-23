/**
 * POST /api/chat-lead
 *
 * Captures a gated-chat lead at the moment the visitor opens a conversation.
 * Now enriched (2026-04-23) with category classification from the training
 * pack routing table — each lead is tagged with a service_category and the
 * notification payload calls out the target KAM (from tags.yaml) so it can
 * be fanned out to the right person downstream.
 *
 * Behaviour:
 *   - Always log to server output (Vercel captures; Luther can grep [chat-lead])
 *   - Optional webhook forward (CHAT_LEAD_WEBHOOK_URL) for Slack/Discord/GChat
 *   - Future: Supabase `leads` table + per-category webhook routing
 *
 * Body: { name, email, company?, vessel?, whatsapp?, firstMessage?, referrer?, userAgent? }
 * Response: 204 on success, 400 on malformed body.
 */

import { classifyIntent, CATEGORY_OWNER_FIRST_NAME } from "@/lib/routing";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type LeadBody = {
  name: string;
  email: string;
  company?: string;
  vessel?: string;
  whatsapp?: string;
  firstMessage?: string;
  referrer?: string;
  userAgent?: string;
};

function isValidLeadBody(x: unknown): x is LeadBody {
  if (!x || typeof x !== "object") return false;
  const l = x as Record<string, unknown>;
  return (
    typeof l.name === "string" &&
    l.name.trim().length > 0 &&
    l.name.length < 200 &&
    typeof l.email === "string" &&
    l.email.includes("@") &&
    l.email.length < 200
  );
}

export async function POST(request: Request) {
  // Per-IP lead-capture limit: 5 per hour. A real visitor starts one chat;
  // this blocks form-spam loops without ever annoying a human.
  const ip = getClientIp(request);
  const limit = checkRateLimit(`chat-lead:${ip}`, {
    windowMs: 60 * 60 * 1000,
    max: 5,
  });
  if (!limit.allowed) {
    return Response.json(
      { error: "Too many chat starts — try again later." },
      {
        status: 429,
        headers: { "Retry-After": String(limit.retryAfterSeconds) },
      },
    );
  }

  let body: LeadBody;
  try {
    body = (await request.json()) as LeadBody;
  } catch {
    return Response.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  if (!isValidLeadBody(body)) {
    return Response.json({ error: "Name and email required." }, { status: 400 });
  }

  const timestamp = new Date().toISOString();
  const category = classifyIntent({
    message: body.firstMessage,
    company: body.company,
    vessel: body.vessel,
  });
  const owner = CATEGORY_OWNER_FIRST_NAME[category];

  const entry = {
    timestamp,
    source: "daron-website:chat-widget",
    category,
    target_owner: owner,
    ...body,
    ip:
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "unknown",
  };

  // Always log — Vercel captures, grep for [chat-lead]
  console.log("[chat-lead]", JSON.stringify(entry));

  // Optional webhook forward
  const webhookUrl = process.env.CHAT_LEAD_WEBHOOK_URL;
  if (webhookUrl) {
    const text =
      `💬 *New chat on daron.com.na*\n` +
      `Category: *${category}* → routing to *${owner}*\n` +
      `\n` +
      `*${entry.name}* <${entry.email}>\n` +
      (entry.company ? `Company: ${entry.company}\n` : "") +
      (entry.vessel ? `Vessel: ${entry.vessel}\n` : "") +
      (entry.whatsapp ? `WhatsApp: ${entry.whatsapp}\n` : "") +
      (entry.firstMessage ? `\nFirst message: ${entry.firstMessage.slice(0, 300)}\n` : "") +
      (entry.referrer ? `\nReferrer: ${entry.referrer}\n` : "");

    fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    }).catch((err) => console.warn("[chat-lead] webhook failed:", err));
  }

  return new Response(null, { status: 204 });
}
