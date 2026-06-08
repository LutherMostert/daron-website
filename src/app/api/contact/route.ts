/**
 * POST /api/contact
 *
 * Real endpoint for the contact-page form (replaces the old mailto: POST).
 * Mirrors the hardened /api/chat-lead pattern: rate-limit → validate →
 * sanitise → log + optional signed webhook. Week 2: forward to Hermes.
 *
 * Body: { firstName, surname, email, phone?, message }
 * Response: 200 { ok: true } | 400 | 429
 */

import { createHmac } from "node:crypto";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type ContactBody = {
  firstName: string;
  surname: string;
  email: string;
  phone?: string;
  message: string;
};

function clean(value: unknown, max: number): string {
  if (typeof value !== "string") return "";
  return value.replace(/[\r\n\t]+/g, " ").trim().slice(0, max);
}

function cleanMultiline(value: unknown, max: number): string {
  if (typeof value !== "string") return "";
  return value.replace(/\r\n/g, "\n").trim().slice(0, max);
}

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const limit = checkRateLimit(`contact:${ip}`, {
    windowMs: 60 * 60 * 1000,
    max: 5,
  });
  if (!limit.allowed) {
    return Response.json(
      { error: "Too many messages — please try again later." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfterSeconds) } },
    );
  }

  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  const b = (raw ?? {}) as Partial<ContactBody>;
  const firstName = clean(b.firstName, 80);
  const surname = clean(b.surname, 80);
  const email = clean(b.email, 160);
  const phone = clean(b.phone, 40);
  const message = cleanMultiline(b.message, 4000);

  if (!firstName || !email.includes("@") || message.length < 2) {
    return Response.json(
      { error: "Please provide your name, a valid email, and a message." },
      { status: 400 },
    );
  }

  const entry = {
    timestamp: new Date().toISOString(),
    source: "daron-website:contact-form",
    firstName,
    surname,
    email,
    phone,
    message,
    ip,
  };

  console.log("[contact-lead]", JSON.stringify(entry));

  const webhookUrl =
    process.env.CONTACT_WEBHOOK_URL || process.env.CHAT_LEAD_WEBHOOK_URL;
  if (webhookUrl) {
    const text =
      `✉️ *New contact-form message — daron.com.na*\n` +
      `*${firstName} ${surname}* <${email}>\n` +
      (phone ? `Phone: ${phone}\n` : "") +
      `\n${message}`;
    const payload = JSON.stringify({ text });
    const headers: Record<string, string> = { "Content-Type": "application/json" };
    const secret = process.env.CHAT_LEAD_WEBHOOK_SECRET;
    if (secret) {
      headers["X-Daron-Signature"] =
        "sha256=" + createHmac("sha256", secret).update(payload).digest("hex");
    }
    fetch(webhookUrl, { method: "POST", headers, body: payload }).catch((err) =>
      console.warn("[contact-lead] webhook failed:", err),
    );
  }

  return Response.json({ ok: true });
}
