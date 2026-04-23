"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { contact, nav, site } from "@/lib/site";
import { Container } from "./Container";

const languages = [
  { code: "en", label: "EN", name: "English" },
  { code: "pt", label: "PT", name: "Português" },
  { code: "fr", label: "FR", name: "Français" },
] as const;

type LangCode = (typeof languages)[number]["code"];

function LanguageToggle() {
  const [lang, setLang] = useState<LangCode>("en");
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem("lang") as LangCode | null;
    if (saved && languages.some((l) => l.code === saved)) {
      setLang(saved);
      document.documentElement.lang = saved;
    }
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function select(code: LangCode) {
    setLang(code);
    setOpen(false);
    localStorage.setItem("lang", code);
    document.documentElement.lang = code;
  }

  const current = languages.find((l) => l.code === lang)!;

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label={`Language: ${current.name}`}
        className="flex items-center gap-1 rounded-md border border-[var(--color-line)] px-2.5 py-1.5 text-xs font-semibold text-[var(--color-navy)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="10" />
          <path d="M2 12h20" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
        {current.label}
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      {open && (
        <ul
          role="listbox"
          aria-label="Select language"
          className="absolute right-0 top-full mt-1 min-w-[120px] overflow-hidden rounded-md border border-[var(--color-line)] bg-white shadow-lg"
        >
          {languages.map((l) => (
            <li key={l.code} role="option" aria-selected={l.code === lang}>
              <button
                type="button"
                onClick={() => select(l.code)}
                className={`flex w-full items-center gap-2 px-3 py-2 text-left text-sm transition-colors hover:bg-[var(--color-sand)] ${
                  l.code === lang
                    ? "font-semibold text-[var(--color-accent)]"
                    : "text-[var(--color-ink)]"
                }`}
              >
                <span className="text-xs font-bold">{l.label}</span>
                {l.name}
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
            {nav
              .filter((n) => n.href !== "/")
              .map((n) => (
                <li key={n.href}>
                  <Link
                    href={n.href}
                    className="text-[var(--color-ink)] transition-colors hover:text-[var(--color-accent)]"
                  >
                    {n.label}
                  </Link>
                </li>
              ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <LanguageToggle />
          <a
            href={contact.whatsapp.href}
            className="rounded-full bg-[var(--color-accent)] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-deep)]"
            target="_blank"
            rel="noopener noreferrer"
          >
            Chat with Daron AI assistant &rarr;
          </a>
        </div>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-[var(--color-line)] text-[var(--color-navy)] md:hidden"
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
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
              {nav.map((n) => (
                <li key={n.href}>
                  <Link
                    href={n.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-md px-2 py-2 text-[var(--color-ink)] transition-colors hover:bg-[var(--color-sand)] hover:text-[var(--color-accent)]"
                  >
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-3 flex items-center gap-3">
              <LanguageToggle />
              <a
                href={contact.whatsapp.href}
                onClick={() => setOpen(false)}
                className="inline-flex flex-1 items-center justify-center rounded-full bg-[var(--color-accent)] px-5 py-3 text-sm font-semibold text-white"
                target="_blank"
                rel="noopener noreferrer"
              >
                Chat with Daron AI assistant on WhatsApp &rarr;
              </a>
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}
