import type { Metadata } from "next";
import { getPathname, routing, type Locale } from "@/i18n/routing";

/**
 * Single source of truth for per-page metadata.
 *
 * Fixes the i18n SEO trio the audit flagged:
 *   1. Locale-aware canonical — pt/fr pages now declare THEIR OWN url as
 *      canonical (not the English one), so Google keeps the translations.
 *   2. Per-page hreflang — every page emits a full `languages` map (+ x-default)
 *      for its own path, instead of the homepage-only map that used to live in
 *      the layout and was dropped on every inner route.
 *   3. Locale-correct Open Graph / Twitter, with full BCP-47 og:locale codes.
 *
 * Pass `path` as the locale-AGNOSTIC pathname (e.g. "/about", "/", or a fully
 * resolved dynamic path like `/insights/${slug}`).
 */
type BuildMetaArgs = {
  locale: string;
  path: string;
  title: string;
  description: string;
  /** Override the OG/Twitter title (defaults to `title`). */
  ogTitle?: string;
  /** Render the title verbatim (skip the "… | Daron Namibia" template) — for the home page. */
  titleAbsolute?: boolean;
  type?: "website" | "article";
};

const OG_LOCALE: Record<string, string> = {
  en: "en_NA",
  pt: "pt_PT",
  fr: "fr_FR",
};

function clampMetadataText(value: string, maxLength: number) {
  if (value.length <= maxLength) return value;
  const candidate = value.slice(0, maxLength - 3);
  const wordBoundary = candidate.lastIndexOf(" ");
  const trimmed = wordBoundary > maxLength * 0.65 ? candidate.slice(0, wordBoundary) : candidate;
  return `${trimmed.trimEnd()}...`;
}

export function buildMetadata({
  locale,
  path,
  title,
  description,
  ogTitle,
  titleAbsolute = false,
  type = "website",
}: BuildMetaArgs): Metadata {
  const loc: Locale = (routing.locales as readonly string[]).includes(locale)
    ? (locale as Locale)
    : routing.defaultLocale;

  const canonical = getPathname({ href: path, locale: loc });

  const languages: Record<string, string> = {};
  for (const l of routing.locales) {
    languages[l] = getPathname({ href: path, locale: l });
  }
  languages["x-default"] = getPathname({
    href: path,
    locale: routing.defaultLocale,
  });

  const metadataTitle = titleAbsolute ? title : clampMetadataText(title, 46);
  const metadataDescription = clampMetadataText(description, 160);

  return {
    title: titleAbsolute ? { absolute: metadataTitle } : metadataTitle,
    description: metadataDescription,
    alternates: { canonical, languages },
    openGraph: {
      type,
      url: canonical,
      title: ogTitle ?? title,
      description: metadataDescription,
      locale: OG_LOCALE[loc] ?? loc,
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle ?? title,
      description: metadataDescription,
    },
  };
}
