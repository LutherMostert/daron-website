import Link from "next/link";
import { contact } from "@/lib/site";
import { Container } from "./Container";

/**
 * Inline RFQ section — required on every page per CLAUDE.md audit fix #9.
 * Current site has only one form site-wide; we surface Don/WhatsApp + contact
 * routes prominently on every page.
 */
type Props = {
  variant?: "navy" | "sand";
  heading?: string;
  body?: string;
};

export function InlineRFQ({
  variant = "sand",
  heading = "Need a quote? Talk to Don.",
  body = "Don is our AI-powered quoting agent. Message on WhatsApp and a drafted quote lands in minutes — a human KAM reviews every request before it ships.",
}: Props) {
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
                isNavy ? "text-[var(--color-accent)]" : "text-[var(--color-accent)]"
              }`}
            >
              Inline RFQ
            </p>
            <h2
              id="rfq-heading"
              className="font-[family-name:var(--font-poppins)] text-2xl font-bold leading-tight sm:text-3xl"
            >
              {heading}
            </h2>
            <p
              className={`mt-3 max-w-2xl text-base leading-relaxed ${
                isNavy ? "text-white/80" : "text-[var(--color-mute)]"
              }`}
            >
              {body}
            </p>
          </div>
          <div className="flex flex-col items-stretch gap-3">
            <a
              href={contact.whatsapp.href}
              className="rounded-full bg-[var(--color-accent)] px-6 py-3 text-center text-base font-semibold text-white transition-colors hover:bg-[var(--color-accent-deep)]"
              target="_blank"
              rel="noopener noreferrer"
            >
              {contact.whatsapp.label} &rarr;
            </a>
            <Link
              href="/contact"
              className={`rounded-full border px-6 py-3 text-center text-base font-semibold transition-colors ${
                isNavy
                  ? "border-white/30 text-white hover:bg-white/10"
                  : "border-[var(--color-navy)] text-[var(--color-navy)] hover:bg-[var(--color-navy)] hover:text-white"
              }`}
            >
              Send a message
            </Link>
            <p
              className={`mt-1 text-center text-xs ${
                isNavy ? "text-white/60" : "text-[var(--color-mute)]"
              }`}
            >
              Or call{" "}
              <a
                href={contact.phone.href}
                className="font-semibold underline-offset-4 hover:underline"
              >
                {contact.phone.display}
              </a>
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
