import { parseCatalogueSelections, enquirySources, type CatalogueReference, type EnquirySource } from "./enquiry-context";
/** Shared intake rules and an escaped, Outlook-friendly operations notification. */
export const MAX_FILE_BYTES = 4 * 1024 * 1024;
export const ACCEPTED_EXTENSIONS = [".xlsx", ".xls", ".csv", ".pdf", ".doc", ".docx", ".txt"];
export const CATEGORIES = ["Ship chandlery", "Provisions / catering", "Oil & gas / offshore", "Technical stores", "Coatings / surface preparation", "Health & safety", "Dry dock", "Warehousing / logistics", "Other"];
export type ContactFields = {
  requestType: "quote" | "enquiry";
  firstName: string; surname: string; company: string; vessel: string;
  email: string; phone: string; deliveryPoint: string; urgency: string;
  category: string; preferredContact: string; message: string;
  catalogueSelections: CatalogueReference[]; sourceContext: string; multiLocation: string;
};
const single = (value: unknown, max: number) => typeof value === "string" ? value.replace(/[\r\n\t]+/g, " ").trim().slice(0, max) : "";
export function parseContact(raw: Record<string, unknown>, hasAttachment: boolean): { fields?: ContactFields; error?: string } {
  const catalogues = parseCatalogueSelections(raw.catalogueSelections);
  if (catalogues.error) return { error: catalogues.error };
  const source = single(raw.sourceContext, 80);
  if (source && !Object.hasOwn(enquirySources, source)) return { error: "Invalid enquiry source." };
  const fields: ContactFields = {
    requestType: raw.requestType === "quote" ? "quote" : "enquiry",
    firstName: single(raw.firstName, 120), surname: single(raw.surname, 80), company: single(raw.company, 120),
    email: single(raw.email, 160), phone: single(raw.phone, 40), vessel: single(raw.vessel, 120),
    deliveryPoint: single(raw.deliveryPoint, 140), urgency: single(raw.urgency, 120), category: single(raw.category, 120),
    preferredContact: single(raw.preferredContact, 80) || "Email",
    message: typeof raw.message === "string" ? raw.message.replace(/\r\n/g, "\n").trim().slice(0, 4000) : "",
    catalogueSelections: catalogues.items, sourceContext: source,
    multiLocation: typeof raw.multiLocation === "string" ? raw.multiLocation.trim().slice(0, 500) : "",
  };
  if (raw.requestType && !["quote", "enquiry"].includes(String(raw.requestType))) return { error: "Choose a quotation request or a general enquiry." };
  if (!fields.firstName || !fields.company || !/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(fields.email)) return { error: "Please provide your name, company and a valid email address." };
  if (!["Email", "WhatsApp", "Phone call"].includes(fields.preferredContact)) return { error: "Choose email, WhatsApp or phone as your reply method." };
  if (fields.preferredContact !== "Email" && !/^\+[1-9]\d{6,14}$/.test(fields.phone.replace(/[\s().-]/g, ""))) return { error: "Enter a phone number with country code for WhatsApp or a call, or choose email." };
  if (fields.category && !CATEGORIES.includes(fields.category)) return { error: "Please choose a listed service." };
  if (fields.message.length < 10 && !hasAttachment && !catalogues.items.some(item => item.detail.trim())) return { error: "Describe your requirement (at least 10 characters), add a catalogue product reference, or attach your requirement." };
  if (fields.requestType === "quote" && !fields.category) return { error: "Choose the service you need, or select Other." };
  return { fields };
}
export function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]!);
}
export function buildRfqEmail(fields: ContactFields, reference: string, timestamp: string, attachment?: { name: string; size: number }) {
  const label = fields.requestType === "quote" ? "Quotation request" : "General enquiry";
  const subject = `[${reference}] ${label} | ${fields.company}${fields.vessel ? ` | ${fields.vessel}` : ""}`;
  const missing = fields.requestType === "quote" ? [["vessel / project", fields.vessel], ["delivery point", fields.deliveryPoint], ["required date / ETA", fields.urgency]].filter(([, value]) => !value).map(([name]) => name) : [];
  const rows = [
    ["Contact", `${fields.firstName} ${fields.surname}`.trim()], ["Company", fields.company],
    ...(fields.sourceContext ? [["Enquiry context", enquirySources[fields.sourceContext as EnquirySource]]] : []),
    ...(fields.multiLocation ? [["Multiple locations / dates", fields.multiLocation]] : []),
    ["Reply by", fields.preferredContact], ["Email", fields.email], ["Phone / WhatsApp", fields.phone || "Not provided"],
    ["Service", fields.category || "Not selected"], ["Vessel / project", fields.vessel || "Not provided"],
    ["Delivery point", fields.deliveryPoint || "Not provided"], ["Required date / ETA", fields.urgency || "Not provided"],
    ["Attachment", attachment ? `${attachment.name} (${Math.ceil(attachment.size / 1024)} KB) — attached to this email` : "None"],
    ["Received", new Date(timestamp).toLocaleString("en-GB", { timeZone: "Africa/Windhoek", hour12: false }) + " CAT (UTC+2)"],
  ].filter(([, value]) => fields.requestType === "quote" || !["Not provided", "Not selected", "None"].includes(value));
  const action = fields.preferredContact === "Email" ? `Reply to this email to contact ${fields.firstName}.` : `Contact ${fields.firstName} by ${fields.preferredContact} on ${fields.phone}. Email is also available.`;
  const note = missing.length ? `Clarify before quoting: ${missing.join(", ")}.` : fields.requestType === "enquiry" ? "Information request. No quotation scope has been confirmed." : "Review the requirement and attachment before preparing a quotation.";
  const catalogueText = fields.catalogueSelections.map((item, index) => `${index + 1}. ${item.brand} — ${item.title}\nProduct / page: ${item.detail.trim() || "Please clarify"}\nQuantity / units: ${item.quantity.trim() || "Please clarify"}\nReference PDF: https://www.daron.com.na${item.file}`).join("\n\n");
  const customerMessage = fields.message || (attachment ? "Requirement supplied in the attached file." : "See catalogue references below.");
  const message = customerMessage + (catalogueText ? `\n\nCATALOGUE REFERENCES\n${catalogueText}\n\nCatalogue references do not confirm product selection, stock or pricing.` : "");
  const catalogueHtml = fields.catalogueSelections.length ? `<h2 style="margin-top:28px;font-size:16px">Catalogue references</h2>${fields.catalogueSelections.map(item => `<p style="padding:16px;background:#f4f2ed;font-size:14px;line-height:1.8;word-break:break-word"><strong>${escapeHtml(item.brand)} — ${escapeHtml(item.title)}</strong><br>Product / page: ${escapeHtml(item.detail.trim() || "Please clarify")}<br>Quantity / units: ${escapeHtml(item.quantity.trim() || "Please clarify")}<br><a href="https://www.daron.com.na${escapeHtml(item.file)}" style="color:#0a5965">Open reference PDF →</a></p>`).join("")}<p style="font-size:12px;color:#526174">Catalogue references do not confirm product selection, stock or pricing.</p>` : "";
  const text = ["DARON NAMIBIA", `${label} — ${reference}`, action, note, "", "CUSTOMER'S MESSAGE", message, "", ...rows.map(([key, value]) => `${key}: ${value}`), "", "Submitted through the website. Customer details and claims are not independently verified."].join("\n");
  const replyHref = `mailto:${fields.email}?subject=${encodeURIComponent(`Re: ${subject}`)}`;
  const phone = fields.phone.replace(/[\s().-]/g, "");
  const validPhone = /^\+[1-9]\d{6,14}$/.test(phone);
  const contactHref = fields.preferredContact === "WhatsApp" && validPhone ? `https://wa.me/${phone.slice(1)}` : fields.preferredContact === "Phone call" && validPhone ? `tel:${phone}` : replyHref;
  const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head><body style="margin:0;background:#f4f2ed;font-family:Arial,sans-serif;color:#172b40"><table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td style="padding:28px 12px"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:640px;margin:auto;background:#fff"><tr><td style="padding:28px;background:#0a2540;color:#fff"><img src="https://www.daron.com.na/images/logo-daron.png" alt="Daron Namibia" width="110" style="display:block;background:#fff;margin-bottom:24px"><p style="font-size:12px;letter-spacing:2px;color:#a9dce1">WEBSITE ENQUIRY</p><h1 style="font-size:28px;margin:12px 0">${label}</h1><p style="margin:0;color:#dbe6ee">${escapeHtml(reference)}</p></td></tr><tr><td style="padding:28px"><h2 style="margin:0 0 12px;font-size:22px">${escapeHtml(fields.company)}</h2><p style="line-height:1.6">${escapeHtml(action)}</p><p style="padding:14px;background:#f4f2ed;line-height:1.6">${escapeHtml(note)}</p><h2 style="margin-top:28px;font-size:16px">Customer's message</h2><div style="font-size:16px;line-height:1.7;white-space:pre-wrap">${escapeHtml(customerMessage).replace(/\n/g, "<br>")}</div>${catalogueHtml}<p style="margin:26px 0"><a href="${escapeHtml(contactHref)}" style="display:inline-block;background:#f97316;color:#0a2540;padding:14px 22px;font-weight:bold;text-decoration:none">${fields.preferredContact === "Email" ? "Reply to customer" : `Contact by ${fields.preferredContact}`}</a></p><table width="100%" cellpadding="0" cellspacing="0" style="font-size:14px">${rows.map(([key, value]) => `<tr><th align="left" valign="top" style="width:36%;border-top:1px solid #e2e8f0;padding:12px 8px 12px 0;font-weight:normal;color:#526174">${escapeHtml(key)}</th><td style="border-top:1px solid #e2e8f0;padding:12px 0;word-break:break-word;white-space:pre-wrap">${escapeHtml(value)}</td></tr>`).join("")}</table><p style="font-size:12px;line-height:1.6;color:#526174;margin-top:24px">Submitted through the website. Customer details and claims are not independently verified.</p></td></tr></table></td></tr></table></body></html>`;
  return { subject, text, html };
}
