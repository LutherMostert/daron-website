"use client";

import Image from "next/image";
import { useState, useRef, useEffect, useTransition } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname, useRouter, type Locale } from "@/i18n/routing";
import { routing } from "@/i18n/routing";
import { contact, site } from "@/lib/site";
import { Container } from "./Container";

const navItems = [
  { href: "/about" as const, key: "about" as const },
  { href: "/services" as const, key: "services" as const },
  { href: "/industries" as const, key: "industries" as const },
  { href: "/why-daron" as const, key: "whyDaron" as const },
  { href: "/insights" as const, key: "insights" as const },
  { href: "/contact" as const, key: "contact" as const },
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
    startTransition(() => {
      router.replace({ pathname }, { locale: nextLocale });
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
        className="flex items-center gap-1 rounded-md border border-[var(--color-line)] px-2.5 py-1.5 text-xs font-semibold text-[var(--color-navy)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] disabled:opacity-50"
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
          className="absolute right-0 top-full mt-1 min-w-[120px] overflow-hidden rounded-md border border-[var(--color-line)] bg-white shadow-lg"
        >
          {routing.locales.map((loc) => (
            <li key={loc} role="option" aria-selected={loc === locale}>
              <button
                type="button"
                onClick={() => select(loc)}
                className={`flex w-full items-center gap-2 px-3 py-2 text-left text-sm transition-colors hover:bg-[var(--color-sand)] ${
                  loc === locale
                    ? "font-semibold text-[var(--color-accent)]"
                    : "text-[var(--color-ink)]"
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

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-line)] bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/85">
      <Container className="flex h-20 items-center justify-between gap-4">
        <Link
          href="/"
          className="flex items-center"
          aria-label={`${site.name} home`}
        >
          <Image
            src="/images/logo-daron.png"
            alt="Daron Namibia"
            width={359}
            height={215}
            priority
            className="h-14 w-auto"
          />
        </Link>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-6 text-sm font-medium">
            {navItems.map((n) => (
              <li key={n.href}>
                <Link
                  href={n.href}
                  className="text-[var(--color-ink)] transition-colors hover:text-[var(--color-accent)]"
                >
                  {tNav(n.key)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <LanguageSwitcher />
          <a
            href={contact.whatsapp.href}
            className="rounded-full bg-[var(--color-accent)] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-deep)]"
            target="_blank"
            rel="noopener noreferrer"
          >
            {tHeader("chatCta")} &rarr;
          </a>
        </div>

        <button
          type="button"
          aria-label={open ? tHeader("closeMenu") : tHeader("openMenu")}
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-[var(--color-line)] text-[var(--color-navy)] md:hidden"
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
        <div id="mobile-nav" className="border-t border-[var(--color-line)] bg-white md:hidden">
          <Container className="flex flex-col py-4">
            <ul className="flex flex-col gap-1 text-base font-medium">
              <li>
                <Link
                  href="/"
                  onClick={() => setOpen(false)}
                  className="block rounded-md px-2 py-2 text-[var(--color-ink)] transition-colors hover:bg-[var(--color-sand)] hover:text-[var(--color-accent)]"
                >
                  {tNav("home")}
                </Link>
              </li>
              {navItems.map((n) => (
                <li key={n.href}>
                  <Link
                    href={n.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-md px-2 py-2 text-[var(--color-ink)] transition-colors hover:bg-[var(--color-sand)] hover:text-[var(--color-accent)]"
                  >
                    {tNav(n.key)}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-3 flex items-center gap-3">
              <LanguageSwitcher />
              <a
                href={contact.whatsapp.href}
                onClick={() => setOpen(false)}
                className="inline-flex flex-1 items-center justify-center rounded-full bg-[var(--color-accent)] px-5 py-3 text-sm font-semibold text-white"
                target="_blank"
                rel="noopener noreferrer"
              >
                {tHeader("chatCtaMobile")} &rarr;
              </a>
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}
