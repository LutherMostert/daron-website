"use client";

import { BrandLogo } from "./BrandLogo";
import { useState, useRef, useEffect, useTransition } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname, useRouter, type Locale } from "@/i18n/routing";
import { routing } from "@/i18n/routing";
import { site } from "@/lib/site";
import { Container } from "./Container";

const navItems = [
  { href: "/about" as const, key: "about" as const },
  { href: "/services" as const, key: "services" as const },
  { href: "/solutions" as const, key: "solutions" as const },
  { href: "/industries" as const, key: "industries" as const },
  { href: "/track-record" as const, key: "trackRecord" as const },
  { href: "/brands" as const, key: "brands" as const },
];

function LanguageSwitcher() {
  const t = useTranslations("LanguageSwitcher");
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function select(nextLocale: Locale) {
    setOpen(false);
    if (nextLocale === locale) return;
    startTransition(() => {
      router.replace(`${pathname}${window.location.search}${window.location.hash}`, { locale: nextLocale, scroll: false });
    });
  }

  const labels: Record<Locale, string> = { en: "EN", pt: "PT", fr: "FR" };

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        disabled={isPending}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label={`${t("label")}: ${t(locale)}`}
        className="flex items-center gap-1 rounded-md border border-white/15 bg-white/[0.04] px-2.5 py-1.5 text-xs font-semibold text-white/82 transition-colors hover:border-[var(--color-accent)] hover:text-white disabled:opacity-50"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="10" />
          <path d="M2 12h20" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
        {labels[locale]}
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      {open && (
        <ul
          role="listbox"
          aria-label={t("label")}
          className="absolute right-0 top-full mt-1 min-w-[120px] overflow-hidden rounded-md border border-white/10 bg-[#0b1828] shadow-lg"
        >
          {routing.locales.map((loc) => (
            <li key={loc} role="option" aria-selected={loc === locale}>
              <button
                type="button"
                onClick={() => select(loc)}
                className={`flex w-full items-center gap-2 px-3 py-2 text-left text-sm transition-colors hover:bg-[var(--color-sand)] ${
                  loc === locale
                    ? "font-semibold text-[var(--color-accent)]"
                    : "text-white/78"
                }`}
              >
                <span className="text-xs font-bold">{labels[loc]}</span>
                {t(loc)}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const tNav = useTranslations("Nav");
  const tHeader = useTranslations("Header");
  const tGrowth = useTranslations("Growth");

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#07111f]/92 text-white shadow-[0_1px_0_rgba(255,255,255,.04)] backdrop-blur-xl supports-[backdrop-filter]:bg-[#07111f]/82">
      <Container className="flex h-20 max-w-[1320px] items-center justify-between gap-4">
        <div className="header-brand-group"><Link
          href="/"
          className="inline-flex shrink-0 items-center py-2"
          aria-label={`${site.name} home`}
        >
          <BrandLogo />
        </Link>
        <a href="https://daron-group.com/" target="_blank" rel="noopener noreferrer" className="header-affiliation">{tGrowth("affiliation")} ↗</a></div>

        <nav aria-label="Primary" className="hidden xl:block">
          <ul className="flex items-center gap-4 text-sm font-medium xl:gap-5">
            {navItems.map((n) => (
              <li key={n.href}>
                <Link
                  href={n.href}
                  className="whitespace-nowrap text-white/72 transition-colors hover:text-white"
                >
                  {tNav(n.key)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden shrink-0 items-center gap-3 xl:flex">
          <LanguageSwitcher />
          <Link
            href="/contact#rfq"
            className="shrink-0 whitespace-nowrap rounded-md bg-[var(--color-cta)] px-4 py-2 text-sm font-semibold text-[var(--color-cta-ink)] transition-colors hover:bg-[var(--color-cta-deep)]"
          >
            {tHeader("chatCta")} &rarr;
          </Link>
        </div>

        <button
          type="button"
          aria-label={open ? tHeader("closeMenu") : tHeader("openMenu")}
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-white/15 text-white xl:hidden"
        >
          <span className="sr-only">{open ? tHeader("closeMenu") : tHeader("openMenu")}</span>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            {open ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </>
            ) : (
              <>
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </>
            )}
          </svg>
        </button>
      </Container>

      {open && (
        <div id="mobile-nav" className="border-t border-white/10 bg-[#07111f] xl:hidden">
          <Container className="flex flex-col py-4">
            <ul className="flex flex-col gap-1 text-base font-medium">
              <li>
                <Link
                  href="/"
                  onClick={() => setOpen(false)}
                  className="block rounded-md px-2 py-2 text-white/78 transition-colors hover:bg-white/10 hover:text-white"
                >
                  {tNav("home")}
                </Link>
              </li>
              {navItems.map((n) => (
                <li key={n.href}>
                  <Link
                    href={n.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-md px-2 py-2 text-white/78 transition-colors hover:bg-white/10 hover:text-white"
                  >
                    {tNav(n.key)}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-3 flex items-center gap-3">
              <LanguageSwitcher />
              <Link
                href="/contact#rfq"
                onClick={() => setOpen(false)}
                className="inline-flex flex-1 items-center justify-center rounded-full bg-[var(--color-cta)] px-5 py-3 text-sm font-semibold text-[var(--color-cta-ink)]"
              >
                {tHeader("chatCtaMobile")} &rarr;
              </Link>
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}
