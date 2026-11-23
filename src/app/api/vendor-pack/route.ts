/**
 * POST /api/vendor-pack
 *
 * Gated Vendor Registration Pack on /procurement-resources. Stores the request
 * as a lead, alerts the operations desk (reply-to = the visitor) and returns
 * the download link. The visitor gets no automatic email from this route.
 * Succeeds when the lead was stored OR the operations email went out.
 */
import { persistLead } from "@/lib/lead-store";
import { sendOperationsEmail } from "@/lib/lead-notifications";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";
import { contact } from "@/lib/site";
import { buildVendorPackEmail, parseVendorPackRequest, PACK_DOWNLOAD_PATH } from "@/lib/vendor-pack";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BODY_BYTES = 8 * 1024;

export async function POST(request: Request) {
  if (Number(request.headers.get("content-length")) > MAX_BODY_BYTES) {
    return Response.json({ error: "Request is too large." }, { status: 413 });
  }

  const ip = getClientIp(request);
  const limit = await checkRateLimit(`vendor-pack:${ip}`, { windowMs: 60 * 60 * 1000, max: 10 });
  if (!limit.allowed) {
    return Response.json(
      {
        error: limit.unavailable
          ? `The pack is temporarily unavailable. Please email ${contact.emails.operations}.`
          : "Too many requests - please try again later.",
        code: limit.unavailable ? "unavailable" : "rate",
      },
      { status: limit.unavailable ? 503 : 429, headers: { "Retry-After": String(limit.retryAfterSeconds) } },
    );
  }

  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return Response.json({ error: "Invalid request." }, { status: 400 });
  const body = raw as Record<string, unknown>;
  if (body.website) return Response.json({ error: "Invalid request." }, { status: 400 });

  const parsed = parseVendorPackRequest(body);
  if (!parsed.fields) return Response.json({ error: parsed.error, code: parsed.code }, { status: 400 });
  const fields = parsed.fields;

  const timestamp = new Date().toISOString();
  let reference = "";
  try {
    reference = await persistLead("resource", { timestamp, source: "daron-website:vendor-pack", ...fields, ip });
  } catch (error) {
    console.error("[vendor-pack] durable storage failed", error);
  }

  const notification = buildVendorPackEmail(fields, reference || "not stored", timestamp);
  const notified = await sendOperationsEmail({ ...notification, replyTo: fields.email });

  if (!reference && !notified) {
    return Response.json(
      { error: `We could not prepare the pack. Please email ${contact.emails.operations}.`, code: "unavailable" },
      { status: 503 },
    );
  }

  console.log("[vendor-pack] recorded", reference || "email-only", notified ? "notified" : "not-notified");
  return Response.json({
    ok: true,
    reference: reference || null,
    downloadUrl: PACK_DOWNLOAD_PATH,
    stored: Boolean(reference),
    notified,
  });
}
