"use client";

import { useState } from "react";

type Status = "idle" | "sending" | "success" | "error";

const MAX_FILE_BYTES = 4 * 1024 * 1024; // 4 MB
const ACCEPTED_EXTENSIONS = [".xlsx", ".xls", ".csv", ".pdf", ".doc", ".docx", ".txt"];
const ACCEPT_ATTR = ACCEPTED_EXTENSIONS.join(",");

function isAcceptedFile(name: string): boolean {
  const lower = name.toLowerCase();
  return ACCEPTED_EXTENSIONS.some((ext) => lower.endsWith(ext));
}

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const file = fd.get("rfqFile");

    if (file instanceof File && file.size > 0) {
      if (file.size > MAX_FILE_BYTES) {
        setErrorMsg("File is too large — 4 MB max. Send larger RFQs by WhatsApp or email.");
        setStatus("error");
        return;
      }
      if (!isAcceptedFile(file.name)) {
        setErrorMsg("Unsupported file type. Use Excel, PDF, Word, CSV or TXT.");
        setStatus("error");
        return;
      }
    } else {
      fd.delete("rfqFile");
    }

    setStatus("sending");
    setErrorMsg("");
    try {
      const res = await fetch("/api/contact", { method: "POST", body: fd });
      if (!res.ok) {
        const j = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(j.error || "The RFQ could not be sent. Please call or WhatsApp Daron now.");
      }
      form.reset();
      setStatus("success");
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "The RFQ could not be sent. Please call or WhatsApp Daron now.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div role="status" aria-live="polite" className="border border-[var(--color-accent)]/40 bg-[var(--color-accent)]/10 p-6">
        <h3 className="font-[family-name:var(--font-poppins)] text-xl font-black tracking-[-0.04em] text-[var(--color-navy)]">RFQ received.</h3>
        <p className="mt-2 text-sm leading-relaxed text-[var(--color-mute)]">The operations team has the request. For urgent vessel supply, call or WhatsApp Daron directly.</p>
        <button type="button" onClick={() => setStatus("idle")} className="mt-4 text-sm font-semibold text-[var(--color-navy)] underline-offset-4 hover:underline">Send another RFQ</button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="mt-7 grid gap-4" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field id="firstName" label="Name" autoComplete="given-name" required />
        <Field id="surname" label="Surname" autoComplete="family-name" />
        <Field id="company" label="Company" autoComplete="organization" required />
        <Field id="vessel" label="Vessel / project" placeholder="Optional, but helpful" />
        <Field id="email" label="Email" type="email" autoComplete="email" required />
        <Field id="phone" label="Telephone / WhatsApp" type="tel" autoComplete="tel" />
        <Field id="deliveryPoint" label="Port / delivery point" placeholder="Walvis Bay, offshore, mine site…" />
        <Field id="urgency" label="Urgency / ETA" placeholder="Today, 24h, next port call…" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Select id="category" label="Requirement type" options={["Ship chandlery", "Provisions / catering", "Oil & gas / offshore", "Technical stores", "Health & safety", "Dry dock", "Warehousing / logistics", "Other"]} />
        <Select id="preferredContact" label="Preferred response" options={["WhatsApp", "Email", "Phone call"]} />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="message" className="text-sm font-semibold text-[var(--color-ink)]">RFQ details <span className="text-[var(--color-accent-text)]" aria-hidden="true">*</span></label>
        <textarea id="message" name="message" rows={5} required placeholder="Paste the requirement, quantities, delivery date, vessel name, agency details or any notes the buyer should know." className="border border-[var(--color-line)] bg-white px-4 py-3 text-base text-[var(--color-ink)] outline-none transition focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/30" />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="rfqFile" className="text-sm font-semibold text-[var(--color-ink)]">Attach RFQ file</label>
        <input id="rfqFile" name="rfqFile" type="file" accept={ACCEPT_ATTR} className="border border-dashed border-slate-300 bg-white px-4 py-5 text-sm text-[var(--color-mute)] file:mr-3 file:border-0 file:bg-[var(--color-navy)] file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white focus:border-[var(--color-accent)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/30" />
        <p className="text-xs text-[var(--color-mute)]">Excel, PDF, Word, CSV or TXT. Max 4 MB. Larger RFQs can be sent by WhatsApp or email.</p>
      </div>

      <div aria-live="polite" className="min-h-[1.25rem]">
        {status === "error" && <p role="alert" className="text-sm font-medium text-red-600">{errorMsg}</p>}
      </div>

      <button type="submit" disabled={status === "sending"} className="mt-1 bg-[var(--color-cta)] px-6 py-4 text-base font-black uppercase tracking-[0.14em] text-[var(--color-cta-ink)] transition-colors hover:bg-[var(--color-cta-deep)] disabled:cursor-not-allowed disabled:opacity-60">
        {status === "sending" ? "Sending RFQ…" : "Send Your RFQ"}
      </button>
      <p className="text-xs leading-5 text-[var(--color-mute)]">For urgent supply, call Daron directly after submitting. This form does not replace emergency contact.</p>
    </form>
  );
}

function Field({
  id,
  label,
  type = "text",
  autoComplete,
  required,
  placeholder,
}: {
  id: string;
  label: string;
  type?: string;
  autoComplete?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-semibold text-[var(--color-ink)]">{label}{required && <span className="ml-0.5 text-[var(--color-accent-text)]" aria-hidden="true">*</span>}</label>
      <input id={id} name={id} type={type} required={required} autoComplete={autoComplete} placeholder={placeholder} className="border border-[var(--color-line)] bg-white px-4 py-3 text-base text-[var(--color-ink)] outline-none transition placeholder:text-slate-400 focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/30" />
    </div>
  );
}

function Select({ id, label, options }: { id: string; label: string; options: string[] }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-semibold text-[var(--color-ink)]">{label}</label>
      <select id={id} name={id} className="border border-[var(--color-line)] bg-white px-4 py-3 text-base text-[var(--color-ink)] outline-none transition focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/30">
        {options.map((option) => <option key={option}>{option}</option>)}
      </select>
    </div>
  );
}
