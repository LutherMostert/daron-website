"use client";
import { Suspense, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { trackEvent } from "@/lib/analytics";
import { contact } from "@/lib/site";
import { ACCEPTED_EXTENSIONS, CATEGORIES, MAX_FILE_BYTES } from "@/lib/rfq";
import { CatalogueEnquiryList } from "./CatalogueEnquiry";
import { useCatalogueEnquiry, saveCatalogueEnquiry } from "@/lib/enquiry-browser";
import { enquirySources } from "@/lib/enquiry-context";

export function ContactForm() {
  const t = useTranslations("Growth");
  return <Suspense fallback={<p role="status">{t("loading")}</p>}><ContactFormContent /></Suspense>;
}
function ContactFormContent() {
  const t = useTranslations("Intake");
  const g = useTranslations("Growth"); const search = useSearchParams();
  const requestedSource = search.get("from") || "";
  const source = Object.hasOwn(enquirySources, requestedSource) ? requestedSource : "";
  const catalogues = useCatalogueEnquiry();
  const hasCatalogueRequirement = catalogues.some(item => item.detail.trim());
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error" | "stored">("idle");
  const [requestType, setRequestType] = useState(source === "procurement-resources" ? "enquiry" : "quote");
  const [preferred, setPreferred] = useState("Email");
  const [fileName, setFileName] = useState("");
  const [error, setError] = useState("");
  const [reference, setReference] = useState("");
  const busy = useRef(false);
  const resultRef = useRef<HTMLDivElement>(null);
  const finish = () => requestAnimationFrame(() => resultRef.current?.focus());
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); if (busy.current) return;
    const form = event.currentTarget; const data = new FormData(form); const file = data.get("rfqFile");
    data.set("catalogueSelections", JSON.stringify(catalogues)); data.set("sourceContext", source);
    if (file instanceof File && file.size) {
      if (file.size > MAX_FILE_BYTES || !ACCEPTED_EXTENSIONS.some(ext => file.name.toLowerCase().endsWith(ext))) {
        setError(t("fileError")); setStatus("error"); finish(); return;
      }
    } else data.delete("rfqFile");
    busy.current = true; setStatus("sending"); setError("");
    try {
      const response = await fetch("/api/contact", { method: "POST", body: data, signal: AbortSignal.timeout(30000) });
      const result = await response.json();
      if (result.reference) setReference(result.reference);
      if (result.stored && !response.ok) { setStatus("stored"); finish(); return; }
      if (!response.ok || !result.ok) throw new Error(result.error || t("sendError"));
      setStatus("success"); saveCatalogueEnquiry([]); trackEvent("RFQ_Submit_Success", { category: String(data.get("category") || "Unknown"), requestType, source: source || "direct" });
      form.reset(); finish();
    } catch (error) {
      setStatus("error"); setError(error instanceof Error && error.name !== "TimeoutError" ? error.message : t("sendError")); finish();
    } finally { busy.current = false; }
  }
  if (status === "success" || status === "stored") return <div ref={resultRef} tabIndex={-1} className="intake-result" role="status">
    <span className="premium-eyebrow">{t("reference")}</span><p className="my-3 font-mono text-sm">{reference}</p>
    <h2 className="text-3xl font-semibold">{t(status === "stored" ? "storedTitle" : "successTitle")}</h2>
    <p className="my-5 leading-7">{t(status === "stored" ? "storedBody" : "successBody")}</p>
    <a className="premium-button" href={`mailto:${contact.emails.operations}?subject=${encodeURIComponent(`Website enquiry ${reference}`)}`}>{t("emailTeam")} →</a>
    <a className="mt-5 block font-semibold" href={contact.phone.href}>{t("call")} {contact.phone.display}</a>
    {status === "success" && <button className="mt-8 underline" type="button" onClick={() => { setStatus("idle"); setReference(""); setFileName(""); }}>{t("another")}</button>}
  </div>;
  return <form id="enquiry-form" onSubmit={submit} className="intake-form" encType="multipart/form-data">
    <fieldset disabled={status === "sending"} className="space-y-6"><legend className="sr-only">{t("formTitle")}</legend>
      {source && <p className="enquiry-context-label">{g("context")} <strong>{g(`sources.${source}`)}</strong></p>}
      <CatalogueEnquiryList />
      <div className="intake-choice" role="group" aria-label={t("typeLabel")}>
        {(["quote", "enquiry"] as const).map(type => <label key={type} className={requestType === type ? "selected" : ""}><input type="radio" name="requestType" value={type} checked={requestType === type} onChange={() => setRequestType(type)} /><span><strong>{t(type)}</strong><small>{t(`${type}Hint`)}</small></span></label>)}
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="firstName" label={t("name")} required autoComplete="name" maxLength={120} />
        <Field id="company" label={t("company")} required autoComplete="organization" maxLength={120} />
        <Field id="email" label={t("email")} required type="email" autoComplete="email" maxLength={160} />
        <label className="intake-field"><span>{t("reply")}</span><select name="preferredContact" value={preferred} onChange={event => setPreferred(event.target.value)}>{["Email", "WhatsApp", "Phone call"].map((value, index) => <option key={value} value={value}>{t(`reply${index}`)}</option>)}</select></label>
      </div>
      {preferred !== "Email" && <Field id="phone" label={t("phone")} required type="tel" autoComplete="tel" placeholder="+264 …" maxLength={40} pattern="\+[0-9 ().\-]{7,24}" />}
      <label className="intake-field"><span>{t("service")}{requestType === "quote" ? " *" : ` · ${t("optional")}`}</span><select name="category" defaultValue="" required={requestType === "quote"}><option value="">{t("choose")}</option>{CATEGORIES.map((value, index) => <option key={value} value={value}>{t(`category${index}`)}</option>)}</select></label>
      <label className="intake-field"><span>{t("message")}{!fileName && !hasCatalogueRequirement && " *"}</span><textarea name="message" rows={4} minLength={fileName || hasCatalogueRequirement ? undefined : 10} maxLength={4000} required={!fileName && !hasCatalogueRequirement} placeholder={t(requestType === "quote" ? "messageQuote" : "messageEnquiry")} /></label>
      <label className="intake-upload"><span><strong>{t("attach")}</strong><small>{fileName || t("attachHint")}</small></span><input type="file" name="rfqFile" accept={ACCEPTED_EXTENSIONS.join(",")} aria-label={t("attach")} onChange={event => setFileName(event.target.files?.[0]?.name || "")} /><small>{t("fileLimit")}</small></label>
      {requestType === "quote" && <details className="intake-details"><summary>{t("deliveryDetails")} <span>{t("optional")}</span></summary><div className="mt-5 grid gap-5 sm:grid-cols-2"><Field id="vessel" label={t("vessel")} maxLength={120} /><Field id="deliveryPoint" label={t("delivery")} maxLength={140} /><Field id="urgency" label={t("date")} placeholder={t("dateHint")} maxLength={120} /></div></details>}
      <details className="intake-details"><summary>{g("multiTitle")} <span>{t("optional")}</span></summary><label className="intake-field mt-5"><span>{g("multiLabel")}</span><textarea name="multiLocation" rows={3} maxLength={500} placeholder={g("multiHint")} /></label><p className="mt-3 text-xs leading-6 text-slate-600">{g("multiNote")}</p></details>
      <div className="intake-trap" aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
      <div ref={resultRef} tabIndex={-1}>{status === "error" && <p role="alert" className="border-l-2 border-red-700 bg-red-50 p-4 text-sm text-red-800">{error}</p>}</div>
      <button className="premium-button w-full justify-between" type="submit" disabled={status === "sending"}>{t(status === "sending" ? "sending" : requestType === "quote" ? "sendQuote" : "sendEnquiry")}<span aria-hidden="true">→</span></button>
      <p className="text-xs leading-6 text-slate-600">{t("privacyIntro")} <Link href="/privacy" className="underline">{t("privacy")}</Link>. {t("urgent")}</p>
    </fieldset>
  </form>;
}
function Field({ label, id, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label: string; id: string }) {
  return <label className="intake-field" htmlFor={id}><span>{label}{props.required && " *"}</span><input id={id} name={id} {...props} /></label>;
}
