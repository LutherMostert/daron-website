import { Resend } from "resend";
import { contact } from "@/lib/site";

let resend: Resend | null | undefined;

function getResend() {
  if (resend !== undefined) return resend;
  resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
  return resend;
}

export type EmailAttachment = {
  name: string;
  base64: string;
};

export async function sendOperationsEmail(args: {
  subject: string;
  text: string;
  replyTo: string;
  attachment?: EmailAttachment;
}): Promise<boolean> {
  const client = getResend();
  if (!client) return false;

  const emailDomain = process.env.RESEND_EMAIL_DOMAIN;
  const from =
    process.env.RFQ_FROM_EMAIL ||
    (emailDomain ? `Daron Website <website@${emailDomain}>` : "Daron Website <onboarding@resend.dev>");
  const to = process.env.RFQ_TO_EMAIL || contact.emails.operations;

  try {
    const { error } = await client.emails.send({
      from,
      to: [to],
      replyTo: args.replyTo,
      subject: args.subject,
      text: args.text,
      attachments: args.attachment
        ? [{ filename: args.attachment.name, content: Buffer.from(args.attachment.base64, "base64") }]
        : undefined,
    });
    if (error) {
      console.error("[lead-email] Resend rejected notification", error);
      return false;
    }
    return true;
  } catch (error) {
    console.error("[lead-email] notification failed", error);
    return false;
  }
}

export async function postSignedWebhook(args: {
  url?: string;
  payload: string;
  signature?: string;
}): Promise<boolean> {
  if (!args.url) return false;
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (args.signature) headers["X-Daron-Signature"] = args.signature;

  try {
    const response = await fetch(args.url, {
      method: "POST",
      headers,
      body: args.payload,
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) {
      console.error("[lead-webhook] notification rejected", response.status);
      return false;
    }
    return true;
  } catch (error) {
    console.error("[lead-webhook] notification failed", error);
    return false;
  }
}
