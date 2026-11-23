import { escapeHtml } from "@/lib/rfq";

/**
 * Vendor Registration Pack: request rules shared by the form and the API route,
 * plus the operations notification. The pack itself is a public-safe Word file
 * (no certificates, bank letters or personal data); certificates go out on request.
 */
export const PACK_DOWNLOAD_PATH = "/downloads/daron-namibia-vendor-registration-pack.docx?v=20261123";

// Stable English values are stored and emailed; the form shows localised labels.
export const PACK_ROLES = [
  "Purchasing or procurement",
  "Technical or marine superintendent",
  "Master or officer on board",
  "Ship agent",
  "Offshore or rig operations",
  "Other",
] as const;

export const PACK_PLATFORMS = [
  "ShipServ",
  "MESPAS",
  "ProcureShip",
  "Own ERP or vendor portal",
  "Email or paper forms",
  "Other",
] as const;

const PACK_LOCALES = ["en", "fr", "pt"] as const;
const DAY_MS = 24 * 60 * 60 * 1000;

export type VendorPackFields = {
  email: string;
  company: string;
  role: string;
  platform: string;
  vessel: string;
  eta: string;
  locale: string;
};

export type VendorPackErrorCode = "email" | "company" | "role" | "platform" | "eta";

function single(value: unknown, max: number): string {
  if (typeof value !== "string") return "";
  return value.replace(/[\r\n\t]+/g, " ").replace(/\s{2,}/g, " ").trim().slice(0, max);
}

/** An ETA must be a real calendar date from yesterday (time-zone slack) to 400 days ahead. */
function isPlausibleEta(value: string, now: Date): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T00:00:00Z`);
  if (Number.isNaN(date.getTime()) || date.toISOString().slice(0, 10) !== value) return false;
  const today = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
  return date.getTime() >= today - DAY_MS && date.getTime() <= today + 400 * DAY_MS;
}

export function parseVendorPackRequest(
  raw: Record<string, unknown>,
  now = new Date(),
): { fields: VendorPackFields; error?: undefined; code?: undefined } | { fields?: undefined; error: string; code: VendorPackErrorCode } {
  const locale = single(raw.locale, 2);
  const fields: VendorPackFields = {
    email: single(raw.email, 160).toLowerCase(),
    company: single(raw.company, 120),
    role: single(raw.role, 60),
    platform: single(raw.platform, 60),
    vessel: single(raw.vessel, 120),
    eta: single(raw.eta, 10),
    locale: (PACK_LOCALES as readonly string[]).includes(locale) ? locale : "en",
  };

  if (!/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(fields.email)) return { error: "Enter a valid work email address.", code: "email" };
  if (fields.company.length < 2) return { error: "Enter your company name.", code: "company" };
  if (!(PACK_ROLES as readonly string[]).includes(fields.role)) return { error: "Choose your role.", code: "role" };
  if (fields.platform && !(PACK_PLATFORMS as readonly string[]).includes(fields.platform)) {
    return { error: "Choose where you register suppliers, or leave it blank.", code: "platform" };
  }
  if (fields.eta && !isPlausibleEta(fields.eta, now)) return { error: "Enter an ETA from today onwards.", code: "eta" };
  return { fields };
}

export function buildVendorPackEmail(fields: VendorPackFields, reference: string, timestamp: string) {
  const hasCall = Boolean(fields.vessel || fields.eta);
  const call = hasCall
    ? `${fields.vessel || "Vessel not given"}${fields.eta ? `, ETA ${fields.eta}` : ""}`
    : "None given";
  const subject = `Vendor pack downloaded: ${fields.company}${hasCall ? ` (Walvis Bay call: ${call})` : ""}`;
  const rows: Array<[string, string]> = [
    ["Reference", reference],
    ["Received (UTC)", timestamp],
    ["Company", fields.company],
    ["Email", fields.email],
    ["Role", fields.role],
    ["Registers suppliers on", fields.platform || "Not given"],
    ["Coming call", call],
    ["Page language", fields.locale.toUpperCase()],
  ];
  const nextStep = hasCall
    ? "They gave a coming call. Contact them about supply for it, and offer certificates for their vendor registration."
    : "Reply to offer certificates for their vendor registration, and ask about their next Walvis Bay call.";

  const text = [
    "A visitor downloaded the Vendor Registration Pack from the website.",
    "",
    ...rows.map(([label, value]) => `${label}: ${value}`),
    "",
    `Next step: ${nextStep}`,
    "Reply to this email to contact them.",
  ].join("\n");

  const html = [
    "<p>A visitor downloaded the Vendor Registration Pack from the website.</p>",
    '<table cellpadding="6" cellspacing="0" style="border-collapse:collapse;font-family:Arial,sans-serif;font-size:14px">',
    ...rows.map(([label, value]) => `<tr><th align="left" style="border:1px solid #d7dedf;background:#f2f5f5">${escapeHtml(label)}</th><td style="border:1px solid #d7dedf">${escapeHtml(value)}</td></tr>`),
    "</table>",
    `<p><strong>Next step:</strong> ${escapeHtml(nextStep)}</p>`,
    "<p>Reply to this email to contact them.</p>",
  ].join("");

  return { subject, text, html };
}
