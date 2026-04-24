"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { contact, site } from "@/lib/site";
import { Container } from "./Container";

const navItems = [
  { href: "/" as const, key: "home" as const },
  { href: "/about" as const, key: "about" as const },
  { href: "/services" as const, key: "services" as const },
  { href: "/industries" as const, key: "industries" as const },
  { href: "/why-daron" as const, key: "whyDaron" as const },
  { href: "/insights" as const, key: "insights" as const },
  { href: "/contact" as const, key: "contact" as const },
];

export function Footer() {
  const t = useTranslations("Footer");
  const tNav = useTranslations("Nav");
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 bg-[var(--color-navy)] text-white">
      <Container className="py-14">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <p className="font-[family-name:var(--font-poppins)] text-2xl font-bold">
              DARON<span className="text-[var(--color-accent)]">.</span>
              <span className="ml-2 text-xs font-normal uppercase tracking-[0.2em] text-white/60">
                Namibia
              </span>
            </p>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-white/75">
              {t("tagline", { founded: site.founded })}
            </p>
            <p className="mt-3 max-w-md text-xs italic leading-relaxed text-[var(--color-accent)]">
              {t("proofLine")}
            </p>
            <a
              href={contact.whatsapp.href}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-[var(--color-accent)] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-deep)]"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("chatCta")} &rarr;
            </a>
          </div>

          <div>
            <h2 className="font-[family-name:var(--font-poppins)] text-sm font-semibold uppercase tracking-wider text-[var(--color-accent)]">
              {t("sitemap")}
            </h2>
            <ul className="mt-4 space-y-2 text-sm">
              {navItems.map((n) => (
                <li key={n.href}>
                  <Link
                    href={n.href}
                    className="text-white/75 transition-colors hover:text-white"
                  >
                    {tNav(n.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-[family-name:var(--font-poppins)] text-sm font-semibold uppercase tracking-wider text-[var(--color-accent)]">
              {t("contactHeading")}
            </h2>
            <address className="mt-4 space-y-2 text-sm not-italic text-white/75">
              <p>
                {contact.address.line1}
                <br />
                {contact.address.line2}
                <br />
                {contact.address.city}, {contact.address.country}
              </p>
              <p>
                <a
                  href={contact.phone.href}
                  className="transition-colors hover:text-white"
                >
                  {contact.phone.display}
                </a>
              </p>
              <p>
                <a
                  href={`mailto:${contact.emails.operations}`}
                  className="transition-colors hover:text-white"
                >
                  {contact.emails.operations}
                </a>
              </p>
              <p>
                <a
                  href={`mailto:${contact.emails.technical}`}
                  className="transition-colors hover:text-white"
                >
                  {contact.emails.technical}
                </a>
              </p>
              <p className="flex flex-wrap gap-x-4 gap-y-1">
                <a
                  href={contact.socials.linkedin}
                  className="transition-colors hover:text-white"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t("linkedin")} &rarr;
                </a>
                <a
                  href={contact.socials.facebook}
                  className="transition-colors hover:text-white"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t("facebook")} &rarr;
                </a>
              </p>
            </address>
          </div>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col items-center justify-between gap-3 py-5 text-xs text-white/55 sm:flex-row">
          <p>
            {t("copyright", {
              startYear: site.founded,
              year,
              legalName: site.legalName,
            })}
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="/privacy"
              className="transition-colors hover:text-white"
            >
              {t("privacyLink")}
            </Link>
            <span aria-hidden className="text-white/30">
              ·
            </span>
            <p>{t("location")}</p>
          </div>
        </Container>
      </div>
    </footer>
  );
}
