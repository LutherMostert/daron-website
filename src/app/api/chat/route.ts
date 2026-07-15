import Anthropic from "@anthropic-ai/sdk";
import { generateText } from "ai";
import { buildDonSystemPrompt, type DonLead } from "@/lib/don-prompt";
import { redactInternalIdentifiers } from "@/lib/routing";
import { contact } from "@/lib/site";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_OUTPUT_TOKENS = 1024;
const MAX_MESSAGE_CHARS = 2000;
const MAX_HISTORY = 20;
const PROVIDER_COOLDOWN_MS = 5 * 60 * 1000;

const OFFLINE_FALLBACK = `Sorry - I'm temporarily offline. You can still reach us directly on WhatsApp at ${contact.whatsapp.display} or email ${contact.emails.operations}, and the Daron team will pick it up.`;

type Provider = "gateway" | "anthropic" | "openai";
type IncomingMessage = { role: "user" | "assistant"; content: string };
type ChatPayload = { lead: DonLead; messages: IncomingMessage[]; locale?: string };

const unavailableUntil = new Map<Provider, number>();

function localeInstruction(locale: unknown): string {
  if (locale === "pt")
    return "\n\nThe visitor is browsing in Portuguese. Reply in Portuguese unless they clearly write in another language.";
  if (locale === "fr")
    return "\n\nThe visitor is browsing in French. Reply in French unless they clearly write in another language.";
  return "";
}

function isValidLead(value: unknown): value is DonLead {
  if (!value || typeof value !== "object") return false;
  const lead = value as Record<string, unknown>;
  return (
    typeof lead.name === "string" &&
    lead.name.trim().length > 0 &&
    lead.name.length < 200 &&
    typeof lead.email === "string" &&
    lead.email.includes("@") &&
    lead.email.length < 200 &&
    (lead.company === undefined || (typeof lead.company === "string" && lead.company.length < 200)) &&
    (lead.vessel === undefined || (typeof lead.vessel === "string" && lead.vessel.length < 200)) &&
    (lead.whatsapp === undefined || (typeof lead.whatsapp === "string" && lead.whatsapp.length < 50))
  );
}

function isValidMessages(value: unknown): value is IncomingMessage[] {
  if (!Array.isArray(value) || value.length === 0 || value.length > MAX_HISTORY) return false;
  return value.every(
    (message) =>
      message &&
      typeof message === "object" &&
      (message.role === "user" || message.role === "assistant") &&
      typeof message.content === "string" &&
      message.content.length > 0 &&
      message.content.length <= MAX_MESSAGE_CHARS,
  );
}

function isConfigured(provider: Provider) {
  if (provider === "gateway") {
    return Boolean(process.env.AI_GATEWAY_API_KEY || process.env.VERCEL_OIDC_TOKEN || process.env.VERCEL);
  }
  return provider === "anthropic"
    ? Boolean(process.env.ANTHROPIC_API_KEY)
    : Boolean(process.env.OPENAI_API_KEY);
}

function isSuppressed(provider: Provider) {
  return (unavailableUntil.get(provider) ?? 0) > Date.now();
}

function providerOrder(): Provider[] {
  if (process.env.AI_PRIMARY_PROVIDER === "anthropic") return ["anthropic", "gateway", "openai"];
  if (process.env.AI_PRIMARY_PROVIDER === "openai") return ["openai", "gateway", "anthropic"];
  return ["gateway", "openai", "anthropic"];
}

async function askGateway(system: string, messages: IncomingMessage[]): Promise<string> {
  const result = await generateText({
    model: process.env.AI_GATEWAY_MODEL || "google/gemini-2.5-flash-lite",
    system,
    messages,
    maxOutputTokens: MAX_OUTPUT_TOKENS,
    abortSignal: AbortSignal.timeout(25000),
  });
  return result.text.trim();
}

async function askAnthropic(system: string, messages: IncomingMessage[]): Promise<string> {
  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  const response = await client.messages.create({
    model: process.env.ANTHROPIC_CHAT_MODEL || "claude-sonnet-4-5",
    max_tokens: MAX_OUTPUT_TOKENS,
    system,
    messages,
  });
  return response.content
    .filter((block) => block.type === "text")
    .map((block) => block.text)
    .join("")
    .trim();
}

type OpenAIResponse = {
  output_text?: string;
  output?: Array<{ content?: Array<{ type?: string; text?: string }> }>;
  error?: { message?: string };
};

async function askOpenAI(system: string, messages: IncomingMessage[]): Promise<string> {
  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: process.env.OPENAI_CHAT_MODEL || "gpt-5-mini",
      instructions: system,
      input: messages,
      max_output_tokens: MAX_OUTPUT_TOKENS,
    }),
    signal: AbortSignal.timeout(25000),
  });

  const body = (await response.json().catch(() => ({}))) as OpenAIResponse;
  if (!response.ok) throw new Error(`OpenAI ${response.status}: ${body.error?.message || "request failed"}`);

  const text =
    body.output_text ||
    body.output
      ?.flatMap((item) => item.content ?? [])
      .filter((item) => item.type === "output_text" && item.text)
      .map((item) => item.text)
      .join("") ||
    "";
  return text.trim();
}

export function GET() {
  const configured = providerOrder().filter(isConfigured);
  const available = configured.filter((provider) => !isSuppressed(provider));
  return Response.json(
    {
      available: available.length > 0,
      status: available.length > 0 ? (available.length < configured.length ? "degraded" : "operational") : "offline",
    },
    { headers: { "Cache-Control": "no-store" } },
  );
}

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const limit = await checkRateLimit(`chat:${ip}`, { windowMs: 60 * 60 * 1000, max: 20 });
  if (!limit.allowed) {
    return Response.json(
      {
        error: `Too many messages from this connection. Try again in ${Math.ceil(limit.retryAfterSeconds / 60)} minutes, or use WhatsApp at ${contact.whatsapp.display}.`,
      },
      { status: 429, headers: { "Retry-After": String(limit.retryAfterSeconds) } },
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

  const system = buildDonSystemPrompt(body.lead) + localeInstruction(body.locale);
  const failures: string[] = [];

  for (const provider of providerOrder()) {
    if (!isConfigured(provider) || isSuppressed(provider)) continue;
    try {
      const raw = provider === "gateway"
        ? await askGateway(system, body.messages)
        : provider === "openai"
          ? await askOpenAI(system, body.messages)
          : await askAnthropic(system, body.messages);
      if (!raw) throw new Error("Provider returned an empty response.");

      unavailableUntil.delete(provider);
      const { clean, redactionCount } = redactInternalIdentifiers(raw);
      if (redactionCount > 0) {
        console.warn(`[chat] redacted ${redactionCount} internal identifier(s) from ${provider} output`);
      }

      return new Response(clean, {
        status: 200,
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
          "Cache-Control": "no-store",
          "X-Daron-AI-Provider": provider,
        },
      });
    } catch (error) {
      unavailableUntil.set(provider, Date.now() + PROVIDER_COOLDOWN_MS);
      failures.push(provider);
      console.error(`[chat] ${provider} failed`, error);
    }
  }

  console.error(`[chat] no provider available; attempted: ${failures.join(", ") || "none"}`);
  return Response.json({ error: OFFLINE_FALLBACK }, { status: 503 });
}
