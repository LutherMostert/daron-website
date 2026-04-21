import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

import { Container } from "@/components/Container";
import { InlineRFQ } from "@/components/InlineRFQ";
import { PageHero } from "@/components/PageHero";
import { contact } from "@/lib/site";

export const metadata: Metadata = {
  title: "Dry Docking & Vessel Support",
  description:
    "Daron Namibia's technical dry-dock support in Walvis Bay: marine repairs, structural fabrication, mechanical & electrical services, safety & compliance, and ship chandling for vessels at berth, afloat, and in dry dock.",
  alternates: { canonical: "/services/dry-dock" },
};

// Source: Daron_Drydock_Presentation 2026.pdf (18 slides).
// All copy lifted from the presentation; flagged for Yolande refinement.

const walvisOps = [
  { title: "Marine Repairs", blurb: "Hull, mechanical, electrical, and structural repair work at berth, afloat, or during dry dock." },
  { title: "Technical Procurement", blurb: "Fast sourcing of spares, parts, tools, and consumables — local and global network of 2,500+ suppliers." },
  { title: "Vessel Provisions", blurb: "Deck and engine stores, provisions, consumables, bonded stores — ISSA & IMPA listed." },
  { title: "Logistics & Supply Chain Support", blurb: "Freight, customs, permits, kitting, milestone-based delivery, and dockside staging." },
];

const drydockCapabilities = [
  "Hull Inspection & Repairs",
  "Steel Fabrication",
  "Electrical Repairs",
  "Deck Equipment Servicing",
  "Safety Inspections",
];

const serviceSections = [
  {
    id: "mechanical",
    title: "Mechanical & Electrical Services",
    items: [
      "Engine and generator repairs",
      "Electric motor overhauls",
      "Compressor and air dryer repairs",
      "AC servicing and regassing",
      "Electrical diagnostics and repairs",
    ],
  },
  {
    id: "structural",
    title: "Structural & Fabrication Services",
    items: [
      "Steel and aluminium fabrication",
      "Structural repairs",
      "Battery box fabrication",
      "Floor plate installation",
      "Lashing and securing equipment fabrication",
    ],
  },
  {
    id: "safety",
    title: "Safety & Compliance Services",
    items: [
      "Fire fighting equipment servicing",
      "CO₂ system inspections",
      "Gas detection systems",
      "Life raft inspections",
      "Safety certifications",
    ],
  },
  {
    id: "chandling",
    title: "Ship Chandling & Technical Supplies",
    items: [
      "Deck and engine stores",
      "Marine chemicals & lubricants",
      "Technical spares",
      "Vessel provisions",
      "Consumables and safety equipment",
    ],
  },
];

const caseStudies = [
  {
    title: "Deck cleaning with Orlichem chemicals",
    body: "Before-and-after of specialised chemical cleaning on a working deck. Demonstrates the Orlichem chemical offer integrated into our dock scope.",
    image: "/images/site/drydock/case-study-orlichem-deck.jpg",
    alt: "Before and after photos of deck cleaning using Orlichem marine chemicals",
  },
  {
    title: "Hull coating refurbishment with Hempel",
    body: "Severe rust and marine fouling on a vessel bow, prepped and coated using Hempel marine systems. Daron is an official Hempel Group distributor.",
    image: "/images/site/drydock/case-study-hempel-bow.jpg",
    alt: "Before and after photos of vessel bow refurbishment using Hempel coatings",
  },
  {
    title: "SL Africa Vessel Project",
    body: "Completed ahead of schedule — fire safety system new install, mechanical & electrical repairs, navigation equipment repairs, fabrication & structural work, technical supplies and provisions.",
    image: "/images/site/drydock/case-study-sl-africa.jpg",
    alt: "SL Africa vessel project summary of works completed",
  },
  {
    title: "Winch & mechanical refurbishment",
    body: "Motor overhauls, compressor repairs, and mechanical maintenance on deck equipment — real work delivered by the Daron technical team.",
    image: "/images/site/drydock/case-study-winch-refurbishment.jpg",
    alt: "Before and after of winch mechanical refurbishment on a vessel",
  },
];

const whyDaron = [
  "Multidisciplinary marine expertise",
  "Rapid response capability",
  "Competitive procurement network",
  "Reliable project delivery",
  "Trusted partner for vessel readiness",
];

export default function DryDockPage() {
  return (
    <>
      <PageHero
        eyebrow="Dry Docking & Vessel Support"
        title="Technical dry-dock support for vessels in Walvis Bay"
        intro="Daron Namibia supports vessels at berth, afloat, and during dry dock — marine repairs, technical procurement, vessel provisions, and supply-chain coordination from a family-owned Namibian business inside the wider Daron Group."
        image={{ src: "/images/site/man-loading-ship.jpg" }}
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <a
            href={contact.whatsapp.href}
            className="rounded-full bg-[var(--color-accent)] px-6 py-3 text-center text-base font-semibold text-[var(--color-navy)] transition-colors hover:bg-[var(--color-accent-deep)]"
            target="_blank"
            rel="noopener noreferrer"
          >
            Send docking schedule &rarr;
          </a>
          <Link
            href="/contact"
            className="rounded-full border border-white/30 px-6 py-3 text-center text-base font-semibold text-white transition-colors hover:bg-white/10"
          >
            Contact technical team
          </Link>
        </div>
      </PageHero>

      {/* Walvis Bay Operations — 4 core pillars */}
      <section className="bg-white py-20 sm:py-24">
        <Container>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-accent-deep)]">
            Walvis Bay Operations
          </p>
          <h2 className="mt-3 max-w-3xl font-[family-name:var(--font-poppins)] text-2xl font-bold leading-tight text-[var(--color-navy)] sm:text-3xl md:text-4xl">
            Supporting vessels at berth, afloat, and during dry dock
          </h2>
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {walvisOps.map((op) => (
              <li
                key={op.title}
                className="rounded-2xl border border-[var(--color-line)] bg-[var(--color-sand)] p-6"
              >
                <h3 className="font-[family-name:var(--font-poppins)] text-lg font-bold text-[var(--color-navy)]">
                  {op.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--color-mute)]">
                  {op.blurb}
                </p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Dry Dock Support Services — 5 capabilities */}
      <section className="bg-[var(--color-navy)] py-20 text-white sm:py-24">
        <Container>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-accent)]">
            Dry Dock Support Services
          </p>
          <h2 className="mt-3 max-w-3xl font-[family-name:var(--font-poppins)] text-2xl font-bold leading-tight sm:text-3xl md:text-4xl">
            Typical scope during a dry docking
          </h2>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {drydockCapabilities.map((cap) => (
              <li
                key={cap}
                className="rounded-2xl border border-white/15 bg-white/5 p-5 text-center backdrop-blur"
              >
                <span className="font-[family-name:var(--font-poppins)] text-base font-semibold">
                  {cap}
                </span>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* 4 detailed service sections */}
      <section className="bg-white py-20 sm:py-24">
        <Container>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-accent-deep)]">
            Detailed Scope
          </p>
          <h2 className="mt-3 max-w-3xl font-[family-name:var(--font-poppins)] text-2xl font-bold leading-tight text-[var(--color-navy)] sm:text-3xl md:text-4xl">
            What our technical team delivers
          </h2>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {serviceSections.map((section) => (
              <article
                key={section.id}
                id={section.id}
                className="rounded-2xl border border-[var(--color-line)] bg-white p-7 shadow-sm"
              >
                <h3 className="font-[family-name:var(--font-poppins)] text-xl font-bold text-[var(--color-navy)]">
                  {section.title}
                </h3>
                <ul className="mt-4 space-y-3 text-sm leading-relaxed text-[var(--color-ink)]">
                  {section.items.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span
                        aria-hidden="true"
                        className="mt-1 inline-block h-2 w-2 flex-shrink-0 rounded-full bg-[var(--color-accent)]"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* Case studies */}
      <section className="bg-[var(--color-sand)] py-20 sm:py-24">
        <Container>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-accent-deep)]">
            Project Portfolio
          </p>
          <h2 className="mt-3 max-w-3xl font-[family-name:var(--font-poppins)] text-2xl font-bold leading-tight text-[var(--color-navy)] sm:text-3xl md:text-4xl">
            Real work, delivered by the Daron technical team
          </h2>
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {caseStudies.map((study) => (
              <article
                key={study.title}
                className="overflow-hidden rounded-2xl border border-[var(--color-line)] bg-white shadow-sm"
              >
                <div className="relative aspect-[16/9] w-full bg-[var(--color-navy)]">
                  <Image
                    src={study.image}
                    alt={study.alt}
                    width={1500}
                    height={844}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-[family-name:var(--font-poppins)] text-lg font-bold text-[var(--color-navy)]">
                    {study.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--color-mute)]">
                    {study.body}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* Why choose Daron Namibia */}
      <section className="bg-white py-20 sm:py-24">
        <Container>
          <div className="grid gap-10 md:grid-cols-[1fr_2fr] md:items-start">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-accent-deep)]">
                Why Daron Namibia
              </p>
              <h2 className="mt-3 font-[family-name:var(--font-poppins)] text-2xl font-bold leading-tight text-[var(--color-navy)] sm:text-3xl md:text-4xl">
                A trusted partner for vessel readiness
              </h2>
            </div>
            <ul className="space-y-5">
              {whyDaron.map((reason, idx) => (
                <li key={reason} className="flex gap-5">
                  <span
                    aria-hidden="true"
                    className="font-[family-name:var(--font-poppins)] text-2xl font-bold text-[var(--color-accent-deep)]"
                  >
                    0{idx + 1}
                  </span>
                  <p className="text-base leading-relaxed text-[var(--color-ink)]">
                    {reason}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <InlineRFQ
        variant="navy"
        heading="Send your docking schedule or scope of work."
        body="The Daron AI assistant drafts a response on WhatsApp within minutes. A technical KAM reviews every scope before it ships."
      />
    </>
  );
}
