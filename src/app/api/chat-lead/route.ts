/**
 * POST /api/chat-lead
 *
 * Captures a gated-chat lead at the moment the visitor opens a conversation.
 * Current behaviour (Week 0 shipping): log to server output + forward to an
 * optional webhook for quick visibility (Slack/Discord/Google Chat incoming
 * webhook URL via CHAT_LEAD_WEBHOOK_URL). In Week 2+, migrate to Supabase
 * `leads` table per CLAUDE.md roadmap.
 *
 * Body: { name, email, company?, vessel?, whatsapp?, referrer?, userAgent? }
 *
 * Response: 204 on success, 400 on malformed body.
 *
 * This endpoint intentionally does NOT block the chat from starting if the
 * lead-capture sink (webhook) is unavailable — logging-to-console is always
 * attempted so Luther can retrieve leads from Vercel logs even if webhooks fail.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type LeadBody = {
  name: string;
  email: string;
  company?: string;
  vessel?: string;
  whatsapp?: string;
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
  const entry = {
    timestamp,
    source: "daron-website:chat-widget",
    ...body,
    ip:
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "unknown",
  };

  // Always log — Vercel captures this so Luther can grep leads from the log.
  console.log("[chat-lead]", JSON.stringify(entry));

  // Optional webhook forward (Slack/Discord/Google Chat). Fire-and-forget —
  // we do NOT block the chat start on webhook success.
  const webhookUrl = process.env.CHAT_LEAD_WEBHOOK_URL;
  if (webhookUrl) {
    const text =
      `💬 New chat on daron.com.na\n` +
      `*${entry.name}* <${entry.email}>\n` +
      (entry.company ? `Company: ${entry.company}\n` : "") +
      (entry.vessel ? `Vessel: ${entry.vessel}\n` : "") +
      (entry.whatsapp ? `WhatsApp: ${entry.whatsapp}\n` : "") +
      (entry.referrer ? `Referrer: ${entry.referrer}\n` : "");

    // Slack/Discord-compatible payload (both accept { text }).
    fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    }).catch((err) => console.warn("[chat-lead] webhook failed:", err));
  }

  return new Response(null, { status: 204 });
}
