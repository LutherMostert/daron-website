import { createHmac } from "node:crypto";
import { persistLead } from "@/lib/lead-store";
import { postSignedWebhook, sendOperationsEmail } from "@/lib/lead-notifications";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";
import { contact } from "@/lib/site";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_FILE_BYTES = 4 * 1024 * 1024;
const ATTACH_FORWARD_BYTES = 3 * 1024 * 1024;
const ACCEPTED_EXTENSIONS = [".xlsx", ".xls", ".csv", ".pdf", ".doc", ".docx", ".txt"];

type ContactFields = {
  firstName: string;
  surname: string;
  company: string;
  vessel: string;
  email: string;
  phone: string;
  deliveryPoint: string;
  urgency: string;
  category: string;
  preferredContact: string;
  message: string;
};

type Attachment = {
  name: string;
  type: string;
  size: number;
  base64: string;
};

function clean(value: unknown, max: number): string {
  if (typeof value !== "string") return "";
  return value.replace(/[\r\n\t]+/g, " ").trim().slice(0, max);
}

function cleanMultiline(value: unknown, max: number): string {
  if (typeof value !== "string") return "";
  return value.replace(/\r\n/g, "\n").trim().slice(0, max);
}

function extension(name: string) {
  const lower = name.toLowerCase();
  return ACCEPTED_EXTENSIONS.find((ext) => lower.endsWith(ext));
}

function beginsWith(bytes: Uint8Array, signature: number[]) {
  return signature.every((value, index) => bytes[index] === value);
}

function contentMatchesExtension(bytes: Uint8Array, ext: string): boolean {
  if (ext === ".pdf") return beginsWith(bytes, [0x25, 0x50, 0x44, 0x46, 0x2d]);
  if (ext === ".docx" || ext === ".xlsx") {
    return (
      beginsWith(bytes, [0x50, 0x4b, 0x03, 0x04]) ||
      beginsWith(bytes, [0x50, 0x4b, 0x05, 0x06]) ||
      beginsWith(bytes, [0x50, 0x4b, 0x07, 0x08])
    );
  }
  if (ext === ".doc" || ext === ".xls") {
    return beginsWith(bytes, [0xd0, 0xcf, 0x11, 0xe0, 0xa1, 0xb1, 0x1a, 0xe1]);
  }
  if (ext === ".csv" || ext === ".txt") {
    if (bytes.some((value) => value === 0)) return false;
    try {
      new TextDecoder("utf-8", { fatal: true }).decode(bytes.slice(0, 8192));
      return true;
    } catch {
      return false;
    }
  }
  return false;
}

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const limit = await checkRateLimit(`contact:${ip}`, { windowMs: 60 * 60 * 1000, max: 5 });
  if (!limit.allowed) {
    return Response.json(
      { error: "Too many messages - please try again later." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfterSeconds) } },
    );
  }

  const contentType = request.headers.get("content-type") || "";
  let raw: Record<string, unknown> = {};
  let attachment: Attachment | undefined;

  if (contentType.includes("multipart/form-data")) {
    let formData: FormData;
    try {
      formData = await request.formData();
    } catch {
      return Response.json({ error: "Invalid request." }, { status: 400 });
    }

    raw = {
      firstName: formData.get("firstName"),
      surname: formData.get("surname"),
      company: formData.get("company"),
      vessel: formData.get("vessel"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      deliveryPoint: formData.get("deliveryPoint"),
      urgency: formData.get("urgency"),
      category: formData.get("category"),
      preferredContact: formData.get("preferredContact"),
      message: formData.get("message"),
    };

    const file = formData.get("rfqFile");
    if (file instanceof File && file.size > 0) {
      if (file.size > MAX_FILE_BYTES) {
        return Response.json({ error: "File is too large - 4 MB maximum." }, { status: 413 });
      }
      const ext = extension(file.name);
      if (!ext) {
        return Response.json({ error: "Unsupported file type. Use Excel, PDF, Word, CSV or TXT." }, { status: 400 });
      }

      const bytes = new Uint8Array(await file.arrayBuffer());
      if (!contentMatchesExtension(bytes, ext)) {
        return Response.json(
          { error: "The attachment content does not match its file type. Please export it again and retry." },
          { status: 400 },
        );
      }
      attachment = {
        name: clean(file.name, 160),
        type: clean(file.type, 100),
        size: file.size,
        base64: Buffer.from(bytes).toString("base64"),
      };
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
    company: clean(raw.company, 120),
    vessel: clean(raw.vessel, 120),
    email: clean(raw.email, 160),
    phone: clean(raw.phone, 40),
    deliveryPoint: clean(raw.deliveryPoint, 140),
    urgency: clean(raw.urgency, 120),
    category: clean(raw.category, 120),
    preferredContact: clean(raw.preferredContact, 80),
    message: cleanMultiline(raw.message, 4000),
  };

  if (!fields.firstName || !fields.company || !fields.email.includes("@") || fields.message.length < 2) {
    return Response.json(
      { error: "Please provide your name, company, a valid email, and the RFQ details." },
      { status: 400 },
    );
  }

  const timestamp = new Date().toISOString();
  const entry = {
    timestamp,
    source: "daron-website:contact-form",
    ...fields,
    attachment: attachment
      ? { name: attachment.name, type: attachment.type, size: attachment.size }
      : undefined,
    ip,
  };

  let reference: string;
  try {
    reference = await persistLead("contact", entry);
  } catch (error) {
    console.error("[contact-lead] durable storage failed", error);
    return Response.json(
      { error: `We could not secure the RFQ. Please email ${contact.emails.operations} or call ${contact.phone.display}.` },
      { status: 503 },
    );
  }
  console.log("[contact-lead]", JSON.stringify({ ...entry, reference }));

  const text = [
    `New website RFQ - ${reference}`,
    "",
    `${fields.firstName} ${fields.surname}`.trim(),
    `Company: ${fields.company}`,
    `Email: ${fields.email}`,
    fields.phone ? `Phone/WhatsApp: ${fields.phone}` : "",
    fields.vessel ? `Vessel/project: ${fields.vessel}` : "",
    fields.deliveryPoint ? `Delivery point: ${fields.deliveryPoint}` : "",
    fields.urgency ? `Urgency/ETA: ${fields.urgency}` : "",
    fields.category ? `Category: ${fields.category}` : "",
    fields.preferredContact ? `Preferred response: ${fields.preferredContact}` : "",
    attachment ? `Attachment: ${attachment.name} (${Math.ceil(attachment.size / 1024)} KB)` : "",
    "",
    fields.message,
  ].filter(Boolean).join("\n");

  const webhookAttachment = attachment && attachment.size <= ATTACH_FORWARD_BYTES ? attachment : undefined;
  const payload = JSON.stringify({
    text,
    reference,
    attachment: webhookAttachment,
  });
  const secret = process.env.CHAT_LEAD_WEBHOOK_SECRET;
  const signature = secret
    ? `sha256=${createHmac("sha256", secret).update(payload).digest("hex")}`
    : undefined;

  const [emailDelivered, webhookDelivered] = await Promise.all([
    sendOperationsEmail({
      subject: `[${reference}] Website RFQ - ${fields.company}`,
      text,
      replyTo: fields.email,
      attachment: attachment ? { name: attachment.name, base64: attachment.base64 } : undefined,
    }),
    postSignedWebhook({
      url: process.env.CONTACT_WEBHOOK_URL || process.env.CHAT_LEAD_WEBHOOK_URL,
      payload,
      signature,
    }),
  ]);

  if (!emailDelivered && !webhookDelivered) {
    return Response.json(
      {
        error: `Your RFQ was secured as ${reference}, but the operations notification could not be delivered. Please email ${contact.emails.operations} and quote this reference.`,
        reference,
        stored: true,
      },
      { status: 503 },
    );
  }

  return Response.json({ ok: true, reference, notified: true });
}
