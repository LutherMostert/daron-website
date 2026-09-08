"use client";

import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { contact } from "@/lib/site";
import { Container } from "./Container";

/**
 * Inline RFQ section — required on every page per CLAUDE.md audit fix #9.
 * Current site has only one form site-wide; we surface Daron AI assistant/WhatsApp + contact
 * routes prominently on every page.
 */
type Props = {
  variant?: "navy" | "sand";
  heading?: string;
  body?: string;
};

export function InlineRFQ({
  variant = "sand",
  heading,
  body,
}: Props) {
  const t = useTranslations("InlineRFQ");
  const resolvedHeading = heading ?? t("defaultHeading");
  const resolvedBody = body ?? t("defaultBody");
  const isNavy = variant === "navy";
  return (
    <section
      aria-labelledby="rfq-heading"
      className={
        isNavy
          ? "bg-[var(--color-navy)] text-white"
          : "bg-[var(--color-sand)] text-[var(--color-ink)]"
      }
    >
      <Container className="py-16 sm:py-20">
        <div className="grid gap-8 md:grid-cols-[1.4fr_1fr] md:items-center">
          <div>
            <p
              className={`mb-3 text-xs font-semibold uppercase tracking-[0.2em] ${
                isNavy ? "text-[var(--color-accent)]" : "text-[var(--color-accent-text)]"
              }`}
            >
              {t("eyebrow")}
            </p>
            <h2
              id="rfq-heading"
              className="font-[family-name:var(--font-poppins)] text-2xl font-bold leading-tight sm:text-3xl"
            >
              {resolvedHeading}
            </h2>
            <p
              className={`mt-3 max-w-2xl text-base leading-relaxed ${
                isNavy ? "text-white/80" : "text-[var(--color-mute)]"
              }`}
            >
              {resolvedBody}
            </p>
          </div>
          <div className="flex flex-col items-stretch gap-3">
            <a
              href={contact.whatsapp.href}
              className="order-2 border border-current px-6 py-3 text-center text-sm font-semibold transition-colors hover:opacity-80"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("whatsappCta")} &rarr;
            </a>
            <Link
              href="/contact#rfq"
              className="premium-button order-1 justify-center"
            >
              {t("contactCta")}
            </Link>
            <p
              className={`order-3 mt-1 text-center text-xs ${
                isNavy ? "text-white/60" : "text-[var(--color-mute)]"
              }`}
            >
              {t.rich("orCall", {
                phone: contact.phone.display,
                phoneLink: (chunks) => (
                  <a
                    href={contact.phone.href}
                    className="font-semibold underline-offset-4 hover:underline"
                  >
                    {chunks}
                  </a>
                ),
              })}
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
