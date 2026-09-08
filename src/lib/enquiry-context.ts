import { partners } from "./site";

export const catalogueDirectory = partners.flatMap(partner => partner.catalogues.map(catalogue => ({
  file: catalogue.file, title: catalogue.title, brand: partner.name,
})));
export const enquirySources = {
  "vessel-reactivation": "Vessel reactivation",
  "planned-maintenance": "Planned maintenance",
  "remote-site-supply": "Remote-site supply",
  "group-network": "Daron Group support",
  "procurement-resources": "Supplier onboarding documents",
} as const;
export type EnquirySource = keyof typeof enquirySources;
export type CatalogueSelection = { file: string; detail: string; quantity: string };
export type CatalogueReference = CatalogueSelection & { title: string; brand: string };
export const MAX_CATALOGUES = 10;

/** Resolve titles and URLs from our own catalogue directory, never from a submitted URL. */
export function parseCatalogueSelections(raw: unknown): { items: CatalogueReference[]; error?: string } {
  if (raw === undefined || raw === null || raw === "") return { items: [] };
  let value: unknown = raw;
  if (typeof raw === "string") {
    if (raw.length > 8000) return { items: [], error: "Catalogue list is too large." };
    try { value = JSON.parse(raw); } catch { return { items: [], error: "Invalid catalogue list." }; }
  }
  if (!Array.isArray(value) || value.length > MAX_CATALOGUES) return { items: [], error: "Choose up to 10 catalogues per enquiry." };
  const items: CatalogueReference[] = [];
  for (const item of value) {
    if (!item || typeof item !== "object") return { items: [], error: "Invalid catalogue reference." };
    const known = catalogueDirectory.find(catalogue => catalogue.file === item.file);
    if (!known || typeof item.detail !== "string" || typeof item.quantity !== "string" || item.detail.length > 300 || item.quantity.length > 80) return { items: [], error: "Invalid catalogue reference or item details." };
    if (items.some(existing => existing.file === item.file)) return { items: [], error: "Remove duplicate catalogue references." };
    items.push({ ...known, detail: item.detail.replace(/[\r\n\t]+/g, " "), quantity: item.quantity.replace(/[\r\n\t]+/g, " ") });
  }
  return { items };
}
