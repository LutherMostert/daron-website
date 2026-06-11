/**
 * POST /api/contact
 *
 * Real endpoint for the contact-page form (replaces the old mailto: POST).
 * Accepts JSON or multipart/form-data — multipart allows an optional RFQ file
 * attachment (Excel / PDF / Word / CSV, ≤ 4 MB). Mirrors the hardened
 * /api/chat-lead pattern: rate-limit → validate → sanitise → log + optional
 * signed webhook. Week 2: forward to Hermes (the webhook payload already
 * carries the attachment base64 for it to consume).
 *
 * Body (JSON): { firstName, surname, email, phone?, message }
 * Body (multipart): same fields + rfqFile?: File
 * Response: 200 { ok: true } | 400 | 413 | 429
 */

import { after } from "next/server";
import { createHmac } from "node:crypto";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_FILE_BYTES = 4 * 1024 * 1024; // 4 MB upload cap
const ATTACH_FORWARD_BYTES = 3 * 1024 * 1024; // base64-forward cap (webhook payload size)
const ACCEPTED_EXTENSIONS = [
  ".xlsx",
  ".xls",
  ".csv",
  ".pdf",
  ".doc",
  ".docx",
  ".txt",
];

type ContactFields = {
  firstName: string;
  surname: string;
  email: string;
  phone: string;
  message: string;
};

type Attachment = {
  name: string;
  type: string;
  size: number;
  base64?: string;
};

function clean(value: unknown, max: number): string {
  if (typeof value !== "string") return "";
  return value.replace(/[\r\n\t]+/g, " ").trim().slice(0, max);
}

function cleanMultiline(value: unknown, max: number): string {
  if (typeof value !== "string") return "";
  return value.replace(/\r\n/g, "\n").trim().slice(0, max);
}

function isAcceptedFile(name: string): boolean {
  const lower = name.toLowerCase();
  return ACCEPTED_EXTENSIONS.some((ext) => lower.endsWith(ext));
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

  const contentType = request.headers.get("content-type") || "";
  let raw: Record<string, unknown> = {};
  let attachment: Attachment | null = null;

  if (contentType.includes("multipart/form-data")) {
    let fd: FormData;
    try {
      fd = await request.formData();
    } catch {
      return Response.json({ error: "Invalid request." }, { status: 400 });
    }
    raw = {
      firstName: fd.get("firstName"),
      surname: fd.get("surname"),
      email: fd.get("email"),
      phone: fd.get("phone"),
      message: fd.get("message"),
    };
    const f = fd.get("rfqFile");
    if (f instanceof File && f.size > 0) {
      if (f.size > MAX_FILE_BYTES) {
        return Response.json(
          { error: "File is too large — 4 MB max." },
          { status: 413 },
        );
      }
      if (!isAcceptedFile(f.name)) {
        return Response.json(
          { error: "Unsupported file type. Use Excel, PDF, Word or CSV." },
          { status: 400 },
        );
      }
      attachment = {
        name: clean(f.name, 160),
        type: clean(f.type, 100),
        size: f.size,
      };
      // Forward the content only when it fits a sane webhook payload; the
      // metadata is always logged either way.
      if (f.size <= ATTACH_FORWARD_BYTES) {
        attachment.base64 = Buffer.from(await f.arrayBuffer()).toString("base64");
      }
    }
  } else {
    try {
      raw = (await request.json()) as Record<string, unknown>;
    } catch {
      return Response.json({ error: "Invalid request." }, { status: 400 });
    }
  }

  const fields: ContactFields = {
    firstName: clean(raw.firstName, 80),
    surname: clean(raw.surname, 80),
    email: clean(raw.email, 160),
    phone: clean(raw.phone, 40),
    message: cleanMultiline(raw.message, 4000),
  };

  if (!fields.firstName || !fields.email.includes("@") || fields.message.length < 2) {
    return Response.json(
      { error: "Please provide your name, a valid email, and a message." },
      { status: 400 },
    );
  }

  const entry = {
    timestamp: new Date().toISOString(),
    source: "daron-website:contact-form",
    ...fields,
    attachment: attachment
      ? { name: attachment.name, type: attachment.type, size: attachment.size }
      : undefined,
    ip,
  };

  // Always log metadata (never the file content) — Vercel captures.
  console.log("[contact-lead]", JSON.stringify(entry));

  const webhookUrl =
    process.env.CONTACT_WEBHOOK_URL || process.env.CHAT_LEAD_WEBHOOK_URL;
  if (webhookUrl) {
    const text =
      `✉️ *New contact-form message — daron.com.na*\n` +
      `*${fields.firstName} ${fields.surname}* <${fields.email}>\n` +
      (fields.phone ? `Phone: ${fields.phone}\n` : "") +
      (attachment
        ? `📎 Attachment: ${attachment.name} (${Math.ceil(attachment.size / 1024)} KB)${attachment.base64 ? "" : " — too large to forward, ask the client to resend via WhatsApp/email"}\n`
        : "") +
      `\n${fields.message}`;
    const payload = JSON.stringify({ text, attachment: attachment ?? undefined });
    const headers: Record<string, string> = { "Content-Type": "application/json" };
    const secret = process.env.CHAT_LEAD_WEBHOOK_SECRET;
    if (secret) {
      headers["X-Daron-Signature"] =
        "sha256=" + createHmac("sha256", secret).update(payload).digest("hex");
    }
    // Run after the response is sent, but keep the function alive until the
    // webhook resolves (Vercel can otherwise freeze the instance mid-flight).
    after(() =>
      fetch(webhookUrl, { method: "POST", headers, body: payload }).catch((err) =>
        console.warn("[contact-lead] webhook failed:", err),
      ),
    );
  }

  return Response.json({ ok: true });
}
