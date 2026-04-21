import Link from "next/link";
import { contact, nav, site } from "@/lib/site";
import { Container } from "./Container";

export function Footer() {
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
              {site.tagline}. Marine chandlery, oil &amp; gas logistics,
              catering, warehousing — from Walvis Bay since {site.founded}.
            </p>
            <a
              href={contact.whatsapp.href}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-[var(--color-accent)] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-deep)]"
              target="_blank"
              rel="noopener noreferrer"
            >
              Chat with Daron AI assistant on WhatsApp &rarr;
            </a>
          </div>

          <div>
            <h2 className="font-[family-name:var(--font-poppins)] text-sm font-semibold uppercase tracking-wider text-[var(--color-accent)]">
              Sitemap
            </h2>
            <ul className="mt-4 space-y-2 text-sm">
              {nav.map((n) => (
                <li key={n.href}>
                  <Link
                    href={n.href}
                    className="text-white/75 transition-colors hover:text-white"
                  >
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-[family-name:var(--font-poppins)] text-sm font-semibold uppercase tracking-wider text-[var(--color-accent)]">
              Contact
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
                  LinkedIn &rarr;
                </a>
                <a
                  href={contact.socials.facebook}
                  className="transition-colors hover:text-white"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Facebook &rarr;
                </a>
              </p>
            </address>
          </div>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col items-center justify-between gap-3 py-5 text-xs text-white/55 sm:flex-row">
          <p>
            &copy; {site.founded}&ndash;{year} {site.legalName}. All rights
            reserved.
          </p>
          <p>Walvis Bay, Namibia &middot; GMT+2 (CAT)</p>
        </Container>
      </div>
    </footer>
  );
}
