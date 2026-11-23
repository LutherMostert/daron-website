import { escapeHtml } from "@/lib/rfq";

/**
 * Gated downloads (Vendor Registration Pack, Port Call Pack): request rules shared by the
 * form and the API route, plus the operations notification. Every file here is public-safe;
 * certificates and bank letters go out on request only.
 */
export const RESOURCE_ASSETS = {
  "vendor-pack": {
    name: "Vendor Registration Pack",
    files: [{ key: "pack", url: "/downloads/daron-namibia-vendor-registration-pack.docx?v=20261123" }],
    nextStep: {
      call: "They gave a coming call. Contact them about supply for it, and offer certificates for their vendor registration.",
      noCall: "Reply to offer certificates for their vendor registration, and ask about their next Walvis Bay call.",
    },
  },
  "port-call-pack": {
    name: "Port Call Pack",
    files: [
      { key: "checklist", url: "/downloads/daron-namibia-port-call-checklist.docx?v=20261123" },
      { key: "rfq", url: "/downloads/daron-namibia-rfq-template.xlsx?v=20261123" },
    ],
    nextStep: {
      call: "They gave a coming call. Contact them about supply for it and ask for the RFQ in the template.",
      noCall: "Reply to offer help with their next Walvis Bay call and ask for the RFQ in the template.",
    },
  },
} as const;

export type ResourceAsset = keyof typeof RESOURCE_ASSETS;
export type ResourceFileKey = (typeof RESOURCE_ASSETS)[ResourceAsset]["files"][number]["key"];

// Stable English values are stored and emailed; the forms show localised labels.
export const REQUEST_ROLES = [
  "Purchasing or procurement",
  "Technical or marine superintendent",
  "Master or officer on board",
  "Ship agent",
  "Offshore or rig operations",
  "Other",
] as const;

export const REQUEST_PLATFORMS = [
  "ShipServ",
  "MESPAS",
  "ProcureShip",
  "Own ERP or vendor portal",
  "Email or paper forms",
  "Other",
] as const;

const REQUEST_LOCALES = ["en", "fr", "pt"] as const;
const DAY_MS = 24 * 60 * 60 * 1000;

export type ResourceRequestFields = {
  asset: ResourceAsset;
  email: string;
  company: string;
  role: string;
  platform: string;
  vessel: string;
  eta: string;
  locale: string;
};

export type ResourceRequestErrorCode = "asset" | "email" | "company" | "role" | "platform" | "eta";

function single(value: unknown, max: number): string {
  if (typeof value !== "string") return "";
  return value.replace(/[\r\n\t]+/g, " ").replace(/\s{2,}/g, " ").trim().slice(0, max);
}

function isAsset(value: string): value is ResourceAsset {
  return Object.hasOwn(RESOURCE_ASSETS, value);
}

/** An ETA must be a real calendar date from yesterday (time-zone slack) to 400 days ahead. */
function isPlausibleEta(value: string, now: Date): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T00:00:00Z`);
  if (Number.isNaN(date.getTime()) || date.toISOString().slice(0, 10) !== value) return false;
  const today = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
  return date.getTime() >= today - DAY_MS && date.getTime() <= today + 400 * DAY_MS;
}

export function parseResourceRequest(
  raw: Record<string, unknown>,
  now = new Date(),
): { fields: ResourceRequestFields; error?: undefined; code?: undefined } | { fields?: undefined; error: string; code: ResourceRequestErrorCode } {
  // Requests without an asset come from the original Vendor Registration Pack form.
  const asset = single(raw.asset, 40) || "vendor-pack";
  if (!isAsset(asset)) return { error: "Unknown download.", code: "asset" };
  const locale = single(raw.locale, 2);
  const fields: ResourceRequestFields = {
    asset,
    email: single(raw.email, 160).toLowerCase(),
    company: single(raw.company, 120),
    role: single(raw.role, 60),
    platform: single(raw.platform, 60),
    vessel: single(raw.vessel, 120),
    eta: single(raw.eta, 10),
    locale: (REQUEST_LOCALES as readonly string[]).includes(locale) ? locale : "en",
  };

  if (!/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(fields.email)) return { error: "Enter a valid work email address.", code: "email" };
  if (fields.company.length < 2) return { error: "Enter your company name.", code: "company" };
  if (!(REQUEST_ROLES as readonly string[]).includes(fields.role)) return { error: "Choose your role.", code: "role" };
  if (fields.platform && !(REQUEST_PLATFORMS as readonly string[]).includes(fields.platform)) {
    return { error: "Choose where you register suppliers, or leave it blank.", code: "platform" };
  }
  if (fields.eta && !isPlausibleEta(fields.eta, now)) return { error: "Enter an ETA from today onwards.", code: "eta" };
  return { fields };
}

export function resourceDownloads(asset: ResourceAsset) {
  return RESOURCE_ASSETS[asset].files.map(file => ({ key: file.key, url: file.url }));
}

export function buildResourceEmail(fields: ResourceRequestFields, reference: string, timestamp: string) {
  const asset = RESOURCE_ASSETS[fields.asset];
  const hasCall = Boolean(fields.vessel || fields.eta);
  const call = hasCall
    ? `${fields.vessel || "Vessel not given"}${fields.eta ? `, ETA ${fields.eta}` : ""}`
    : "None given";
  const subject = `${asset.name} downloaded: ${fields.company}${hasCall ? ` (Walvis Bay call: ${call})` : ""}`;
  const rows: Array<[string, string]> = [
    ["Reference", reference],
    ["Download", asset.name],
    ["Received (UTC)", timestamp],
    ["Company", fields.company],
    ["Email", fields.email],
    ["Role", fields.role],
    ["Registers suppliers on", fields.platform || "Not given"],
    ["Coming call", call],
    ["Page language", fields.locale.toUpperCase()],
  ];
  const nextStep = hasCall ? asset.nextStep.call : asset.nextStep.noCall;

  const text = [
    `A visitor downloaded the ${asset.name} from the website.`,
    "",
    ...rows.map(([label, value]) => `${label}: ${value}`),
    "",
    `Next step: ${nextStep}`,
    "Reply to this email to contact them.",
  ].join("\n");

  const html = [
    `<p>A visitor downloaded the ${escapeHtml(asset.name)} from the website.</p>`,
    '<table cellpadding="6" cellspacing="0" style="border-collapse:collapse;font-family:Arial,sans-serif;font-size:14px">',
    ...rows.map(([label, value]) => `<tr><th align="left" style="border:1px solid #d7dedf;background:#f2f5f5">${escapeHtml(label)}</th><td style="border:1px solid #d7dedf">${escapeHtml(value)}</td></tr>`),
    "</table>",
    `<p><strong>Next step:</strong> ${escapeHtml(nextStep)}</p>`,
    "<p>Reply to this email to contact them.</p>",
  ].join("");

  return { subject, text, html };
}
