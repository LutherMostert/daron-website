/**
 * POST /api/resource-request
 *
 * Gated downloads (Vendor Registration Pack, Port Call Pack). Stores the request as a lead,
 * alerts the operations desk (reply-to = the visitor) and returns the download links.
 * The visitor gets no automatic email from this route.
 * Succeeds when the lead was stored OR the operations email went out.
 */
import { persistLead } from "@/lib/lead-store";
import { sendOperationsEmail } from "@/lib/lead-notifications";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";
import { buildResourceEmail, parseResourceRequest, resourceDownloads } from "@/lib/resource-requests";
import { contact } from "@/lib/site";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BODY_BYTES = 8 * 1024;

export async function POST(request: Request) {
  if (Number(request.headers.get("content-length")) > MAX_BODY_BYTES) {
    return Response.json({ error: "Request is too large." }, { status: 413 });
  }

  const ip = getClientIp(request);
  const limit = await checkRateLimit(`resource-request:${ip}`, { windowMs: 60 * 60 * 1000, max: 10 });
  if (!limit.allowed) {
    return Response.json(
      {
        error: limit.unavailable
          ? `Downloads are temporarily unavailable. Please email ${contact.emails.operations}.`
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

  const parsed = parseResourceRequest(body);
  if (!parsed.fields) return Response.json({ error: parsed.error, code: parsed.code }, { status: 400 });
  const fields = parsed.fields;

  const timestamp = new Date().toISOString();
  let reference = "";
  try {
    reference = await persistLead("resource", { timestamp, source: `daron-website:${fields.asset}`, ...fields, ip });
  } catch (error) {
    console.error("[resource-request] durable storage failed", error);
  }

  const notification = buildResourceEmail(fields, reference || "not stored", timestamp);
  const notified = await sendOperationsEmail({ ...notification, replyTo: fields.email });

  if (!reference && !notified) {
    return Response.json(
      { error: `We could not prepare the download. Please email ${contact.emails.operations}.`, code: "unavailable" },
      { status: 503 },
    );
  }

  console.log("[resource-request] recorded", fields.asset, reference || "email-only", notified ? "notified" : "not-notified");
  const downloads = resourceDownloads(fields.asset);
  return Response.json({
    ok: true,
    asset: fields.asset,
    reference: reference || null,
    downloads,
    downloadUrl: downloads[0].url,
    stored: Boolean(reference),
    notified,
  });
}
