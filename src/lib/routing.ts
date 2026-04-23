/**
 * Daron service-category → KAM email routing.
 * Extracted from the training pack tags.yaml routing table (2026-04-23).
 *
 * When a visitor opens a chat, we classify their intent via a quick keyword
 * match on the first message + form fields. The lead-capture email is then
 * forwarded (via webhook) to the right KAM directly instead of the generic
 * ops inbox — so Pierre gets fuel RFQs, Hardus gets paint, etc.
 *
 * Fall-through: generic ops@ mailbox.
 */

export type ServiceCategory =
  | "provisions_food"
  | "provisions_dairy"
  | "provisions_dry"
  | "technical_paint"
  | "technical_measuring"
  | "technical_electrical"
  | "technical_spares"
  | "stores_ppe"
  | "stores_stationery"
  | "consumables_gases"
  | "fuel_bunker"
  | "medical"
  | "safety_firefighting"
  | "admin_finance"
  | "shipping_docs"
  | "order_confirmation"
  | "delivery_discrepancy"
  | "legal_dispute"
  | "port_agency_tlc"
  | "general_inquiry";

/**
 * Service-category → first-name owner for visitor-facing routing message.
 * (We mention the KAM by first name, not their email, to the visitor.)
 */
export const CATEGORY_OWNER_FIRST_NAME: Record<ServiceCategory, string> = {
  provisions_food: "Adriaan",
  provisions_dairy: "Adriaan",
  provisions_dry: "Jani",
  technical_paint: "Hardus",
  technical_measuring: "Hardus",
  technical_electrical: "Hein",
  technical_spares: "Hein",
  stores_ppe: "Charl",
  stores_stationery: "Jani",
  consumables_gases: "Esau",
  fuel_bunker: "Pierre",
  medical: "Adriaan",
  safety_firefighting: "Hein",
  admin_finance: "Yolande",
  shipping_docs: "Linda",
  order_confirmation: "Linda",
  delivery_discrepancy: "Adriaan",
  legal_dispute: "Luther",
  port_agency_tlc: "Ricardo (TLC Namibia)",
  general_inquiry: "the team",
};

/**
 * Classify a visitor's first message + form fields into a service category.
 * Fast keyword heuristic — prefers specificity over recall (better to fall
 * through to "general_inquiry" than to mis-route).
 */
export function classifyIntent(input: {
  message?: string;
  company?: string;
  vessel?: string;
}): ServiceCategory {
  const text = [(input.message ?? ""), (input.company ?? ""), (input.vessel ?? "")]
    .join(" ")
    .toLowerCase();

  // Port agency / TLC redirect — check first, it's not Daron's lane
  if (
    /\bpfda\b|port\s*agent|port\s*agency|husbandry|vessel\s*clearance|namport\s*tariff|tlc\s+namibia/.test(
      text,
    )
  ) {
    return "port_agency_tlc";
  }

  // Legal / disputes → Luther directly
  if (/\b(dispute|arbitration|litigation|claim|lawyer|legal|mabasen|amelia)\b/.test(text)) {
    return "legal_dispute";
  }

  // Fuel
  if (/\b(fuel|bunker|diesel|mgo|hfo|lfo|rescue\s*boat)\b/.test(text)) {
    return "fuel_bunker";
  }

  // Paint
  if (/\b(paint|hempel|international\s*paint|coating|primer|topcoat)\b/.test(text)) {
    return "technical_paint";
  }

  // Measuring / electronics
  if (/\b(fluke|multimeter|megger|calibrat|gas\s*detect|meter|measuring)\b/.test(text)) {
    return "technical_measuring";
  }

  // Electrical / batteries
  if (/\b(battery|batteries|lithium|electrical|inverter|ups|control\s*unit)\b/.test(text)) {
    return "technical_electrical";
  }

  // Safety / firefighting
  if (/\b(firefight|fire\s*fighting|extinguisher|imo\s*signal|life\s*raft|lifejacket|safety)\b/.test(text)) {
    return "safety_firefighting";
  }

  // Medical
  if (/\b(medical|first\s*aid|medicine|pharmaceutical|hospital\s*fridge)\b/.test(text)) {
    return "medical";
  }

  // Gases
  if (/\b(oxygen|acetylene|argon|nitrogen|gas\s*cylinder|industrial\s*gas)\b/.test(text)) {
    return "consumables_gases";
  }

  // PPE
  if (/\b(ppe|helmet|coverall|glove|safety\s*boot|safety\s*shoe)\b/.test(text)) {
    return "stores_ppe";
  }

  // Stationery
  if (/\b(stationery|stationary|paper|pen|printer|ink|toner)\b/.test(text)) {
    return "stores_stationery";
  }

  // Provisions — dairy
  if (/\b(dairy|milk|butter|cheese|yoghurt|yogurt|cream)\b/.test(text)) {
    return "provisions_dairy";
  }

  // Provisions — food
  if (
    /\b(provision|food|beef|chicken|pork|fish|frozen|fresh|meat|bread|vegetable|fruit|galley|cater|butchery|hake|mackerel|kingklip)\b/.test(
      text,
    )
  ) {
    return "provisions_food";
  }

  // Dry stores
  if (/\b(dry\s*stores?|rice|flour|sugar|canned|tinned|pasta)\b/.test(text)) {
    return "provisions_dry";
  }

  // Technical spares (fallback for technical)
  if (/\b(spare|part|engine|pump|valve|filter|bearing|mechanical|technical)\b/.test(text)) {
    return "technical_spares";
  }

  // Admin / finance
  if (/\b(invoice|payment|account|statement|soa|ageing|aging|refund|rebate)\b/.test(text)) {
    return "admin_finance";
  }

  // Shipping docs / delivery
  if (/\b(shipping\s*doc|delivery\s*note|packing\s*list|order\s*confirm)\b/.test(text)) {
    return "shipping_docs";
  }

  // Delivery discrepancy
  if (/\b(discrepanc|short\s*deliver|wrong\s*item|missing\s*item|damaged)\b/.test(text)) {
    return "delivery_discrepancy";
  }

  return "general_inquiry";
}

/**
 * Redact potential internal identifiers that should never leak to a public
 * visitor even if the model slips. Applied to the assistant's outgoing stream
 * before it's sent to the widget.
 *
 * Patterns we redact:
 *   - Daron internal account codes (CAS003001, D2S001, MONT008, OSM001,
 *     GAR002, AFRI005, CARAPAU, SEAWORKS, etc.) — ANY [A-Z]{2,}\d{3,} followed
 *     by optional digits
 *   - Daron internal document numbers (WQTEL*, WSAL*, WINV*, WCRN*, WPOX*,
 *     QTEWC*, MRFRD-*, DTAGZRH* V.Ships code)
 *   - Known supplier names that shouldn't be named publicly
 */
const REDACT_PATTERNS: RegExp[] = [
  // Account codes: 2-5 uppercase letters + 3+ digits (e.g. CAS003001, D2S001, MONT008)
  /\b[A-Z]{2,5}\d{3,}\b/g,
  // Daron document prefixes
  /\bWQTE[A-Z]?\d+[.\d]*\b/g,
  /\bWSAL[A-Z]?\d+\b/g,
  /\bWINV[A-Z]?\d+\b/g,
  /\bWCRN[A-Z]?\d+\b/g,
  /\bWPOX\d+\b/g,
  /\bQTEWC\d+[.\d]*\b/g,
  /\bMRFRD-\d+\.\d+\.\d+\b/g,
  /\bDTAGZRH\d+\b/g,
  // Known supplier names that should not be exposed publicly
  /\bWestern Enterprises\b/gi,
  /\bMarine Global Trading\b/gi,
  /\bBenguela\s+(?:Supplies|Marine)\b/gi,
  /\bMarine Ropes\b/gi,
  /\bAMS Lifting\b/gi,
  /\bAfrishore\b/gi,
];

export function redactInternalIdentifiers(text: string): {
  clean: string;
  redactionCount: number;
} {
  let clean = text;
  let redactionCount = 0;
  for (const pattern of REDACT_PATTERNS) {
    clean = clean.replace(pattern, () => {
      redactionCount++;
      return "[redacted]";
    });
  }
  return { clean, redactionCount };
}
