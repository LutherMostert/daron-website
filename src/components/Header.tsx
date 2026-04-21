"use client";

import Link from "next/link";
import { useState } from "react";
import { contact, nav, site } from "@/lib/site";
import { Container } from "./Container";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-line)] bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/85">
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link
          href="/"
          className="font-[family-name:var(--font-poppins)] text-lg font-bold tracking-tight text-[var(--color-navy)]"
          aria-label={`${site.name} home`}
        >
          DARON<span className="text-[var(--color-orange)]">.</span>
          <span className="ml-1 text-[10px] font-normal uppercase tracking-[0.18em] text-[var(--color-mute)]">
            Namibia
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-6 text-sm font-medium">
            {nav
              .filter((n) => n.href !== "/")
              .map((n) => (
                <li key={n.href}>
                  <Link
                    href={n.href}
                    className="text-[var(--color-ink)] transition-colors hover:text-[var(--color-orange)]"
                  >
                    {n.label}
                  </Link>
                </li>
              ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href={contact.whatsapp.href}
            className="rounded-full bg-[var(--color-orange)] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-orange-deep)]"
            target="_blank"
            rel="noopener noreferrer"
          >
            Chat with Don &rarr;
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
                    className="block rounded-md px-2 py-2 text-[var(--color-ink)] transition-colors hover:bg-[var(--color-sand)] hover:text-[var(--color-orange)]"
                  >
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
            <a
              href={contact.whatsapp.href}
              onClick={() => setOpen(false)}
              className="mt-3 inline-flex items-center justify-center rounded-full bg-[var(--color-orange)] px-5 py-3 text-sm font-semibold text-white"
              target="_blank"
              rel="noopener noreferrer"
            >
              Chat with Don on WhatsApp &rarr;
            </a>
          </Container>
        </div>
      )}
    </header>
  );
}
