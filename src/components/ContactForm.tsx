"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

type Status = "idle" | "sending" | "success" | "error";

export function ContactForm() {
  const t = useTranslations("Contact");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = {
      firstName: String(fd.get("firstName") || ""),
      surname: String(fd.get("surname") || ""),
      email: String(fd.get("email") || ""),
      phone: String(fd.get("phone") || ""),
      message: String(fd.get("message") || ""),
    };

    setStatus("sending");
    setErrorMsg("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
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
