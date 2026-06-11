"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

type Status = "idle" | "sending" | "success" | "error";

const MAX_FILE_BYTES = 4 * 1024 * 1024; // 4 MB
const ACCEPTED_EXTENSIONS = [".xlsx", ".xls", ".csv", ".pdf", ".doc", ".docx", ".txt"];
const ACCEPT_ATTR = ACCEPTED_EXTENSIONS.join(",");

function isAcceptedFile(name: string): boolean {
  const lower = name.toLowerCase();
  return ACCEPTED_EXTENSIONS.some((ext) => lower.endsWith(ext));
}

export function ContactForm() {
  const t = useTranslations("Contact");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const file = fd.get("rfqFile");

    // Client-side file guardrails (the API re-validates).
    if (file instanceof File && file.size > 0) {
      if (file.size > MAX_FILE_BYTES) {
        setErrorMsg(t("fileTooLarge"));
        setStatus("error");
        return;
      }
      if (!isAcceptedFile(file.name)) {
        setErrorMsg(t("fileWrongType"));
        setStatus("error");
        return;
      }
    } else {
      fd.delete("rfqFile");
    }

    setStatus("sending");
    setErrorMsg("");
    try {
      // Multipart — lets the visitor attach an RFQ file (Excel/PDF/Word/CSV).
      const res = await fetch("/api/contact", { method: "POST", body: fd });
      if (!res.ok) {
        const j = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(j.error || "");
      }
      form.reset();
      setStatus("success");
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        aria-live="polite"
        className="rounded-2xl border border-[var(--color-accent)]/40 bg-[var(--color-accent)]/10 p-6"
      >
        <h3 className="font-[family-name:var(--font-poppins)] text-lg font-semibold text-[var(--color-navy)]">
          {t("formSuccessTitle")}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-[var(--color-mute)]">
          {t("formSuccessBody")}
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-4 text-sm font-semibold text-[var(--color-navy)] underline-offset-4 hover:underline"
        >
          {t("formAnother")}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="mt-6 grid gap-4" noValidate>
      <Field id="firstName" label={t("firstName")} autoComplete="given-name" required />
      <Field id="surname" label={t("surname")} autoComplete="family-name" required />
      <Field id="email" label={t("contactEmail")} type="email" autoComplete="email" required />
      <Field id="phone" label={t("telephone")} type="tel" autoComplete="tel" />

      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="message"
          className="text-sm font-semibold text-[var(--color-ink)]"
        >
          {t("yourMessage")}
          <span className="ml-0.5 text-[var(--color-accent-text)]" aria-hidden="true">
            *
          </span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          className="rounded-md border border-[var(--color-line)] bg-white px-3 py-2 text-base text-[var(--color-ink)] focus:border-[var(--color-accent)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/30"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="rfqFile" className="text-sm font-semibold text-[var(--color-ink)]">
          {t("fileLabel")}
        </label>
        <input
          id="rfqFile"
          name="rfqFile"
          type="file"
          accept={ACCEPT_ATTR}
          className="rounded-md border border-dashed border-[var(--color-line)] bg-white px-3 py-2.5 text-sm text-[var(--color-mute)] file:mr-3 file:rounded-full file:border-0 file:bg-[var(--color-sand)] file:px-4 file:py-1.5 file:text-sm file:font-semibold file:text-[var(--color-navy)] focus:border-[var(--color-accent)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/30"
        />
        <p className="text-xs text-[var(--color-mute)]">{t("fileHint")}</p>
      </div>

      <div aria-live="polite" className="min-h-[1.25rem]">
        {status === "error" && (
          <p role="alert" className="text-sm font-medium text-red-600">
            {errorMsg || t("formErrorBody")}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-1 rounded-full bg-[var(--color-cta)] px-6 py-3 text-base font-semibold text-[var(--color-cta-ink)] transition-colors hover:bg-[var(--color-cta-deep)] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "sending" ? t("formSending") : t("sendMessage")}
      </button>
      <p className="text-xs text-[var(--color-mute)]">{t("formNote")}</p>
    </form>
  );
}

function Field({
  id,
  label,
  type = "text",
  autoComplete,
  required,
}: {
  id: string;
  label: string;
  type?: string;
  autoComplete?: string;
  required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-semibold text-[var(--color-ink)]">
        {label}
        {required && (
          <span className="ml-0.5 text-[var(--color-accent-text)]" aria-hidden="true">
            *
          </span>
        )}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        required={required}
        autoComplete={autoComplete}
        className="rounded-md border border-[var(--color-line)] bg-white px-3 py-2 text-base text-[var(--color-ink)] focus:border-[var(--color-accent)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/30"
      />
    </div>
  );
}
