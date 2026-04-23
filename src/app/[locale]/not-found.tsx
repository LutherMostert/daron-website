"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Container } from "@/components/Container";
import { contact } from "@/lib/site";

export default function NotFound() {
  const t = useTranslations("NotFound");

  return (
    <section className="bg-[var(--color-navy)] text-white">
      <Container className="flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-accent)]">
          {t("label")}
        </p>
        <h1 className="mt-4 max-w-2xl font-[family-name:var(--font-poppins)] text-3xl font-bold leading-tight sm:text-5xl">
          {t("heading")}
        </h1>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
          {t("body")}
        </p>
        <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row">
          <Link
            href="/"
            className="rounded-full bg-white px-7 py-3 text-base font-semibold text-[var(--color-navy)] transition-colors hover:bg-white/90"
          >
            {t("backHome")}
          </Link>
          <a
            href={contact.whatsapp.href}
            className="rounded-full bg-[var(--color-accent)] px-7 py-3 text-base font-semibold text-white transition-colors hover:bg-[var(--color-accent-deep)]"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t("chatCta")}
          </a>
        </div>
      </Container>
    </section>
  );
}
