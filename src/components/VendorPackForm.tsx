"use client";
import { useRef, useState } from "react";
import { Link } from "@/i18n/routing";
import { trackEvent } from "@/lib/analytics";
import { contact } from "@/lib/site";
import { PACK_PLATFORMS, PACK_ROLES } from "@/lib/vendor-pack";
import type { VendorPackContent } from "@/lib/vendor-pack-content";

type Status = "idle" | "sending" | "ready" | "error";

export function VendorPackForm({ copy, locale }: { copy: VendorPackContent; locale: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [errorCode, setErrorCode] = useState("");
  const [reference, setReference] = useState("");
  const [downloadUrl, setDownloadUrl] = useState("");
  const busy = useRef(false);
  const resultRef = useRef<HTMLDivElement>(null);
  const focusResult = () => requestAnimationFrame(() => resultRef.current?.focus());

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy.current) return;
    const values: Record<string, string> = {};
    new FormData(event.currentTarget).forEach((value, key) => { if (typeof value === "string") values[key] = value; });
    busy.current = true;
    setStatus("sending");
    setErrorCode("");
    try {
      const response = await fetch("/api/vendor-pack", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, locale }),
        signal: AbortSignal.timeout(20000),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok || !result.ok || !result.downloadUrl) {
        setErrorCode(typeof result.code === "string" ? result.code : "");
        setStatus("error");
        focusResult();
        return;
      }
      setReference(result.reference || "");
      setDownloadUrl(result.downloadUrl);
      setStatus("ready");
      trackEvent("Vendor_Pack_Request", {
        role: values.role || "unknown",
        platform: values.platform || "not given",
        call: values.vessel || values.eta ? "yes" : "no",
      });
      focusResult();
    } catch {
      setStatus("error");
      focusResult();
    } finally {
      busy.current = false;
    }
  }

  const opsEmail = contact.emails.operations;
  if (status === "ready") {
    const subject = `Certificates for vendor registration${reference ? ` - ${reference}` : ""}`;
    return (
      <div ref={resultRef} tabIndex={-1} className="intake-result" role="status">
        <span className="premium-eyebrow">{copy.ready}</span>
        <h3 className="mt-3 text-2xl font-semibold">{copy.successTitle}</h3>
        <p className="my-5 leading-7">{copy.successBody}</p>
        <a
          className="premium-button"
          href={downloadUrl}
          download="Daron Namibia - Vendor Registration Pack.docx"
          onClick={() => trackEvent("Vendor_Pack_Download", { locale })}
        >
          {copy.download} →
        </a>
        {reference && <p className="mt-6 text-sm">{copy.reference}: <span className="font-mono">{reference}</span></p>}
        <a className="premium-text-link mt-4 inline-block" href={`mailto:${opsEmail}?subject=${encodeURIComponent(subject)}`}>
          {copy.certCta} →
        </a>
      </div>
    );
  }

  const errorText = errorCode === "eta" ? copy.etaError : errorCode === "rate" ? copy.rateError : copy.error;
  return (
    <form onSubmit={submit} className="intake-form">
      <fieldset disabled={status === "sending"} className="space-y-5">
        <legend className="sr-only">{copy.formTitle}</legend>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field id="pack-email" name="email" label={copy.email} required type="email" autoComplete="email" maxLength={160} />
          <Field id="pack-company" name="company" label={copy.company} required autoComplete="organization" maxLength={120} />
        </div>
        <label className="intake-field" htmlFor="pack-role">
          <span>{copy.role} *</span>
          <select id="pack-role" name="role" required defaultValue="">
            <option value="">{copy.choose}</option>
            {PACK_ROLES.map((value, index) => <option key={value} value={value}>{copy.roles[index]}</option>)}
          </select>
        </label>
        <label className="intake-field" htmlFor="pack-platform">
          <span>{copy.platform} · {copy.optional}</span>
          <select id="pack-platform" name="platform" defaultValue="">
            <option value="">{copy.choose}</option>
            {PACK_PLATFORMS.map((value, index) => <option key={value} value={value}>{copy.platforms[index]}</option>)}
          </select>
        </label>
        <div className="intake-details">
          <p className="text-sm font-semibold">{copy.callTitle} <span className="font-normal text-slate-500">· {copy.optional}</span></p>
          <p className="mt-2 text-xs leading-6 text-slate-600">{copy.callHint}</p>
          <div className="mt-4 grid gap-5 sm:grid-cols-2">
            <Field id="pack-vessel" name="vessel" label={copy.vessel} maxLength={120} />
            <Field id="pack-eta" name="eta" label={copy.eta} type="date" />
          </div>
        </div>
        <div className="intake-trap" aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
        <div ref={resultRef} tabIndex={-1}>
          {status === "error" && (
            <p role="alert" className="border-l-2 border-red-700 bg-red-50 p-4 text-sm text-red-800">
              {errorText}{errorCode === "eta" ? "" : <> <a className="underline" href={`mailto:${opsEmail}`}>{opsEmail}</a>.</>}
            </p>
          )}
        </div>
        <button className="premium-button w-full justify-between" type="submit">
          {status === "sending" ? copy.sending : copy.submit}<span aria-hidden="true">→</span>
        </button>
        <p className="text-xs leading-6 text-slate-600">
          {copy.privacy} <Link href="/privacy" className="underline">{copy.privacyLink}</Link>.
        </p>
      </fieldset>
    </form>
  );
}

function Field({ label, id, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label: string; id: string }) {
  return (
    <label className="intake-field" htmlFor={id}>
      <span>{label}{props.required && " *"}</span>
      <input id={id} {...props} />
    </label>
  );
}
