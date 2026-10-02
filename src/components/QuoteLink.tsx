"use client";

import type { ComponentProps } from "react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "@/i18n/routing";
import { useCatalogueEnquiry } from "@/lib/enquiry-browser";
import { contact, site } from "@/lib/site";

type Props = Omit<ComponentProps<"a">, "href"> & { context?: string };

/** Open an email draft, retaining the page and any selected catalogue references. */
export function QuoteLink({ context, children, ...props }: Props) {
  const locale = useLocale();
  const pathname = usePathname();
  const t = useTranslations("QuoteEmail");
  const brands = useTranslations("Brands");
  const items = useCatalogueEnquiry();
  const isKatradis = pathname === "/brands/katradis" || context === "Katradis";
  const subject = [t("subject"), context || (isKatradis ? "Katradis" : ""), site.name]
    .filter(Boolean).join(" | ");
  const pageUrl = `${site.url}${locale === "en" ? "" : `/${locale}`}${pathname}`;
  const lines = [isKatradis ? brands("katradisWhatsapp") : t("body")];
  if (context) lines.push(`${t("regarding")}: ${context}`);
  if (items.length) {
    lines.push(t("catalogues"));
    for (const item of items) {
      lines.push([
        `${item.brand} — ${item.title}`,
        `${site.url}${item.file}`,
        item.detail && `${t("details")}: ${item.detail}`,
        item.quantity && `${t("quantity")}: ${item.quantity}`,
      ].filter(Boolean).join("\r\n"));
    }
  }
  lines.push(`${t("source")}: ${pageUrl}`);
  const href = `mailto:${contact.emails.operations}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\r\n\r\n"))}`;

  return <a {...props} href={href} title={t("openEmail", { email: contact.emails.operations })} data-quote-email>{children}</a>;
}
