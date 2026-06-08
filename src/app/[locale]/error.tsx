"use client";

import { useEffect } from "react";
import { Link } from "@/i18n/routing";
import { Container } from "@/components/Container";
import { contact } from "@/lib/site";

/**
 * Route-level error boundary for localized pages. Renders inside the locale
 * layout (Header/Footer stay), so it only needs the section markup.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Real cause goes to the server/console log for Luther; visitor sees a calm message.
    console.error("[route-error]", error);
  }, [error]);

  return (
    <section className="bg-[var(--color-navy)] text-white">
      <Container className="flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-accent)]">
          Something went wrong
        </p>
        <h1 className="mt-4 max-w-2xl font-[family-name:var(--font-poppins)] text-3xl font-bold leading-tight sm:text-4xl">
          We hit a snag loading this page.
        </h1>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-white/80">
          Try again, head back home, or reach the Daron team directly on WhatsApp —
          we&apos;ll route it to the right person.
        </p>
        <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row">
          <button
            type="button"
            onClick={reset}
            className="rounded-full bg-[var(--color-cta)] px-7 py-3 text-base font-semibold text-[var(--color-cta-ink)] transition-colors hover:bg-[var(--color-cta-deep)]"
          >
            Try again
          </button>
          <Link
            href="/"
            className="rounded-full border border-white/30 px-7 py-3 text-base font-semibold text-white transition-colors hover:bg-white/10"
          >
            Back to home
          </Link>
          <a
            href={contact.whatsapp.href}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-white/30 px-7 py-3 text-base font-semibold text-white transition-colors hover:bg-white/10"
          >
            WhatsApp the team
          </a>
        </div>
      </Container>
    </section>
  );
}
