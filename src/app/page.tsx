import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

import { Container } from "@/components/Container";
import { InlineRFQ } from "@/components/InlineRFQ";
import { contact, site } from "@/lib/site";

export const metadata: Metadata = {
  title: `${site.name} | Marine, oil & gas, logistics — Walvis Bay`,
  description:
    "From ship chandlery to catering and logistics, Daron Namibia delivers comprehensive, compliant, and dependable supply chain solutions across industries from Walvis Bay.",
  alternates: { canonical: "/" },
};

const valueProps = [
  {
    title: "Everything you need, one trusted partner",
    body: "Procurement, logistics, catering, staffing, technical supplies — all managed through one dependable provider.",
  },
  {
    title: "Infrastructure built for reliability",
    body: "Modern warehousing with refrigerated, frozen, and dry storage ensures consistent quality and supply.",
  },
  {
    title: "Certified to global standards",
    body: "ISO 9001:2015, HACCP compliance, ISSA & IMPA listings guarantee international credibility.",
  },
  {
    title: "Rooted in Namibian integrity",
    body: "Guided by honesty, stewardship, and a commitment to long-term partnerships.",
  },
  {
    title: "A network that reaches across Africa",
    body: "Through the Daron Group network, we serve ports and industries across the continent.",
  },
];

const serviceLinks = [
  { title: "Ship chandlery & marine specialties", href: "/services#chandlery" },
  { title: "Catering & provisioning", href: "/services#catering" },
  { title: "Warehousing & logistics", href: "/services#warehousing" },
  { title: "Health & safety equipment", href: "/services#safety" },
];

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-[var(--color-navy)] text-white">
        <Image
          src="/images/vessel-seven-borealis.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-30"
          aria-hidden="true"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-[var(--color-navy)] via-[var(--color-navy)]/85 to-[var(--color-navy)]/40"
        />
        <Container className="relative grid gap-12 py-20 sm:py-28 md:grid-cols-[1.4fr_1fr]">
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-accent)]">
              Daron Namibia &middot; Since {site.founded}
            </p>
            <h1 className="font-[family-name:var(--font-poppins)] text-3xl font-bold leading-[1.05] sm:text-5xl md:text-6xl">
              Supplying Africa&apos;s seas, shores &amp; industries with
              confidence
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
              From ship chandlery to catering and logistics, Daron Namibia
              delivers comprehensive, compliant, and dependable supply chain
              solutions across industries.
            </p>

            <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
              <Link
                href="/contact"
                className="rounded-full bg-[var(--color-accent)] px-8 py-3 text-center text-base font-semibold text-white transition-colors hover:bg-[var(--color-accent-deep)]"
              >
                Contact us for tailored solutions
              </Link>
              <a
                href={contact.whatsapp.href}
                className="rounded-full border border-white/30 px-8 py-3 text-center text-base font-semibold text-white transition-colors hover:bg-white/10"
                target="_blank"
                rel="noopener noreferrer"
              >
                Request a quote &rarr;
              </a>
            </div>

            <p className="mt-5 text-xs text-white/55">
              Or call{" "}
              <a
                href={contact.phone.href}
                className="font-semibold text-white/80 hover:text-white"
              >
                {contact.phone.display}
              </a>{" "}
              &middot; Walvis Bay &middot; GMT+2 (CAT)
            </p>
          </div>

          <aside className="rounded-3xl border border-white/10 bg-white/5 p-7 backdrop-blur">
            <p className="font-[family-name:var(--font-poppins)] text-sm font-semibold uppercase tracking-wider text-[var(--color-accent)]">
              Why operators choose us
            </p>
            <ul className="mt-5 space-y-4 text-sm leading-relaxed">
              {[
                "ISO 9001:2015 + HACCP certified",
                "ISSA / IMPA listed for international compatibility",
                "Network of 2,500+ suppliers across Africa & Europe",
                "In-house warehousing — refrigerated, frozen, dry, bonded",
                "Branded fleet + trusted logistics partners",
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <span
                    aria-hidden="true"
                    className="mt-1 inline-block h-2 w-2 flex-shrink-0 rounded-full bg-[var(--color-accent)]"
                  />
                  <span className="text-white/85">{item}</span>
                </li>
              ))}
            </ul>
          </aside>
        </Container>
      </section>

      {/* From Walvis Bay to the World */}
      <section className="bg-white py-20 sm:py-24">
        <Container>
          <div className="grid gap-10 md:grid-cols-[1fr_2fr] md:items-start">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-accent)]">
                Our story
              </p>
              <h2 className="mt-3 font-[family-name:var(--font-poppins)] text-2xl font-bold leading-tight text-[var(--color-navy)] sm:text-3xl md:text-4xl">
                From Walvis Bay to the world: your one-stop supply partner
              </h2>
            </div>
            <div className="space-y-5 text-base leading-relaxed text-[var(--color-mute)]">
              <p>
                Founded in {site.founded} in Walvis Bay, Daron Namibia has
                grown from a dedicated ship chandler into a full-service
                provider supporting the marine, oil &amp; gas, hospitality,
                mining, and industrial sectors.
              </p>
              <p>
                We streamline procurement, logistics, and catering through our
                in-house infrastructure and expert teams, so you can focus on
                your operations while we take care of the rest.
              </p>
              <Link
                href="/about"
                className="inline-flex items-center font-semibold text-[var(--color-navy)] underline-offset-4 hover:underline"
              >
                Read our story &rarr;
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Value props */}
      <section className="bg-[var(--color-sand)] py-20 sm:py-24">
        <Container>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-accent)]">
            Why Daron
          </p>
          <h2 className="mt-3 max-w-3xl font-[family-name:var(--font-poppins)] text-2xl font-bold leading-tight text-[var(--color-navy)] sm:text-3xl md:text-4xl">
            Five reasons operators across Africa work with us
          </h2>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {valueProps.map((vp, idx) => (
              <article
                key={vp.title}
                className="rounded-2xl border border-[var(--color-line)] bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <p className="font-[family-name:var(--font-poppins)] text-xs font-semibold tracking-wider text-[var(--color-accent)]">
                  0{idx + 1}
                </p>
                <h3 className="mt-2 font-[family-name:var(--font-poppins)] text-lg font-semibold text-[var(--color-navy)]">
                  {vp.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--color-mute)]">
                  {vp.body}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* Services teaser */}
      <section className="bg-white py-20 sm:py-24">
        <Container>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-accent)]">
                Services
              </p>
              <h2 className="mt-3 max-w-2xl font-[family-name:var(--font-poppins)] text-2xl font-bold leading-tight text-[var(--color-navy)] sm:text-3xl md:text-4xl">
                Explore how we keep operations moving
              </h2>
            </div>
            <Link
              href="/services"
              className="inline-flex items-center font-semibold text-[var(--color-navy)] underline-offset-4 hover:underline"
            >
              All services &rarr;
            </Link>
          </div>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {serviceLinks.map((s) => (
              <li
                key={s.title}
                className="rounded-2xl bg-[var(--color-sand)] p-6 transition-colors hover:bg-[var(--color-accent)] hover:text-white"
              >
                <Link href={s.href} className="block">
                  <p className="font-[family-name:var(--font-poppins)] text-lg font-semibold">
                    {s.title}
                  </p>
                  <p className="mt-2 text-sm opacity-80">Learn more &rarr;</p>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <InlineRFQ
        variant="navy"
        heading="Tight deadline? We've reactivated rigs in 11 days."
        body="When the cargo is moving and your supplier needs to keep up, the Daron AI assistant drafts your quote on WhatsApp in minutes. A KAM reviews every request before it ships."
      />
    </>
  );
}
