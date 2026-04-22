import Link from "next/link";
import type { Metadata } from "next";

import { Container } from "@/components/Container";
import { InlineRFQ } from "@/components/InlineRFQ";
import { PageHero } from "@/components/PageHero";
import { contact } from "@/lib/site";

export const metadata: Metadata = {
  title: "Oil & Gas — Proven in Offshore Drilling",
  description:
    "Daron Namibia has supplied multiple offshore drilling rigs simultaneously, under active drilling conditions. Deepsea Mira, Deepsea Bollsta, Deepsea Hercules, and Transocean Marianas (2013) — our offshore track record.",
  alternates: { canonical: "/industries/oil-and-gas" },
};

const supported = [
  {
    name: "Deepsea Mira",
    note: "Semi-submersible drilling rig — active offshore campaign",
  },
  {
    name: "Deepsea Bollsta",
    note: "Semi-submersible drilling rig — supplied simultaneously",
  },
  {
    name: "Deepsea Hercules",
    note: "Semi-submersible drilling rig — supplied simultaneously",
  },
  {
    name: "Transocean Marianas",
    note: "Semi-submersible — our first major offshore engagement (2013)",
  },
];

const whatWeDo = [
  {
    title: "Provisions & catering",
    body: "Fresh produce, dry goods, butchery, bonded stores, and dietitian-designed menus — staged, kitted, and delivered to rig on schedule.",
  },
  {
    title: "Technical supply",
    body: "Spares, tools, consumables, and critical-path items sourced locally and through our 2,500+ supplier network across Africa and Europe.",
  },
  {
    title: "Marine chemicals & coatings",
    body: "Exclusive distribution of Orlichem specialised marine chemicals and Hempel marine coatings — integrated into rig maintenance and dry-dock scopes.",
  },
  {
    title: "Logistics & clearance",
    body: "Customs clearance, freight forwarding, permits, branded fleet, and dockside staging — the handoff to the rig is our problem, not yours.",
  },
];

export default function OilAndGasPage() {
  return (
    <>
      <PageHero
        eyebrow="Oil & Gas"
        title="Proven in offshore drilling environments"
        intro="Trusted to supply multiple offshore rigs simultaneously under active drilling conditions. Our offshore track record runs from the Transocean Marianas (2013) to the Deepsea Mira, Deepsea Bollsta, and Deepsea Hercules — all supplied at the same time, under real operational pressure."
        image={{ src: "/images/site/offshore-catering.jpg" }}
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <a
            href={contact.whatsapp.href}
            className="rounded-full bg-[var(--color-accent)] px-6 py-3 text-center text-base font-semibold text-[var(--color-navy)] transition-colors hover:bg-[var(--color-accent-deep)]"
            target="_blank"
            rel="noopener noreferrer"
          >
            Send offshore RFQ &rarr;
          </a>
          <Link
            href="/contact"
            className="rounded-full border border-white/30 px-6 py-3 text-center text-base font-semibold text-white transition-colors hover:bg-white/10"
          >
            Talk to our oil & gas team
          </Link>
        </div>
      </PageHero>

      {/* Rigs supported */}
      <section className="bg-white py-20 sm:py-24">
        <Container>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-accent-deep)]">
            Rigs we have supplied
          </p>
          <h2 className="mt-3 max-w-3xl font-[family-name:var(--font-poppins)] text-2xl font-bold leading-tight text-[var(--color-navy)] sm:text-3xl md:text-4xl">
            Multiple offshore campaigns. One supply partner.
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-[var(--color-mute)] sm:text-lg">
            Daron Namibia has successfully supported multiple offshore rigs
            during active drilling operations — supplied simultaneously, under
            real operational pressure.
          </p>
          <ul className="mt-10 grid gap-5 sm:grid-cols-2">
            {supported.map((rig) => (
              <li
                key={rig.name}
                className="rounded-2xl border border-[var(--color-line)] bg-[var(--color-sand)] p-6"
              >
                <p className="font-[family-name:var(--font-poppins)] text-xl font-bold text-[var(--color-navy)]">
                  {rig.name}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-[var(--color-mute)]">
                  {rig.note}
                </p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Authority pull-quote */}
      <section className="bg-[var(--color-navy)] py-16 text-white sm:py-20">
        <Container>
          <blockquote className="mx-auto max-w-4xl text-center font-[family-name:var(--font-poppins)] text-2xl font-bold leading-tight sm:text-3xl md:text-4xl">
            &ldquo;Trusted to supply multiple offshore rigs simultaneously
            under active drilling conditions.&rdquo;
          </blockquote>
          <p className="mt-6 text-center text-sm uppercase tracking-[0.2em] text-[var(--color-accent)]">
            Daron Namibia &middot; Walvis Bay
          </p>
        </Container>
      </section>

      {/* What we supply offshore */}
      <section className="bg-white py-20 sm:py-24">
        <Container>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-accent-deep)]">
            What we supply offshore
          </p>
          <h2 className="mt-3 max-w-3xl font-[family-name:var(--font-poppins)] text-2xl font-bold leading-tight text-[var(--color-navy)] sm:text-3xl md:text-4xl">
            Full-service offshore supply from Walvis Bay
          </h2>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {whatWeDo.map((item) => (
              <article
                key={item.title}
                className="rounded-2xl border border-[var(--color-line)] bg-white p-7 shadow-sm"
              >
                <h3 className="font-[family-name:var(--font-poppins)] text-xl font-bold text-[var(--color-navy)]">
                  {item.title}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-[var(--color-mute)]">
                  {item.body}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* Why this matters */}
      <section className="bg-[var(--color-sand)] py-20 sm:py-24">
        <Container>
          <div className="grid gap-10 md:grid-cols-[1fr_1.6fr] md:items-start">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-accent-deep)]">
                Why this matters
              </p>
              <h2 className="mt-3 font-[family-name:var(--font-poppins)] text-2xl font-bold leading-tight text-[var(--color-navy)] sm:text-3xl md:text-4xl">
                Three things oil & gas operators ask for
              </h2>
            </div>
            <div className="space-y-5 text-base leading-relaxed text-[var(--color-mute)]">
              <p>
                <strong className="text-[var(--color-navy)]">Scale.</strong>{" "}
                Handling multiple rigs at once means our workflow, inventory,
                and team are sized for real campaign load — not a single
                one-off.
              </p>
              <p>
                <strong className="text-[var(--color-navy)]">Pressure.</strong>{" "}
                Active drilling is demurrage territory. Slow procurement is
                a P&amp;L event. Our supply posture is built around the pace
                offshore operations demand.
              </p>
              <p>
                <strong className="text-[var(--color-navy)]">Track record.</strong>{" "}
                Our first offshore engagement was in 2013. We&rsquo;ve been
                learning rig supply for over a decade — the lessons are baked
                into how we operate today.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <InlineRFQ
        variant="navy"
        heading="Offshore campaign coming up?"
        body="Send us your rig roster and provisioning schedule. The Daron AI assistant drafts a response on WhatsApp within minutes — a technical KAM reviews every scope before it ships."
      />
    </>
  );
}
