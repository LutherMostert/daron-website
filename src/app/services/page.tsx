import Image from "next/image";
import type { Metadata } from "next";

import { Container } from "@/components/Container";
import { InlineRFQ } from "@/components/InlineRFQ";
import { PageHero } from "@/components/PageHero";
import { partners } from "@/lib/site";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Daron Namibia offers ship chandlery, offshore catering, warehousing & logistics, and health & safety equipment — all managed through one dependable provider.",
  alternates: { canonical: "/services" },
};

const pillars = [
  {
    id: "chandlery",
    eyebrow: "01 / Ship chandlery",
    title: "Keeping vessels equipped, safe & ready",
    blurb:
      "Our chandlery services keep vessels and offshore rigs fully operational, no matter the need.",
    provide: [
      "Deck stores, safety & survival equipment, engine parts",
      "Provision stores, stationery, pyrotechnics, medicine",
      "Spare parts and bonded stores",
      "Exclusive distributor for Orlichem and Hempel",
    ],
    why: [
      "One-stop supply with fast fulfilment",
      "ISSA / IMPA listed for international compatibility",
      "Reliable local and global sourcing backed by trusted relationships",
    ],
  },
  {
    id: "catering",
    eyebrow: "02 / Catering",
    title: "Fueling crews & clients with fresh, balanced meals",
    blurb:
      "From offshore rigs to hospitality groups, we design and deliver catering solutions that balance nutrition, cost-efficiency, and taste.",
    provide: [
      "Fresh produce, dry goods, vacuum-packed meats",
      "Menus designed with dietitians for balanced nutrition",
      "Emergency stock control to ensure consistency",
    ],
    why: [
      "In-house butchery and perishables warehousing",
      "Expert dietician collaboration",
      "Reliable supply for demanding environments",
    ],
  },
  {
    id: "warehousing",
    eyebrow: "03 / Warehousing & logistics",
    title: "Smart storage, seamless delivery",
    blurb:
      "Our warehousing and logistics infrastructure ensures smooth operations from storage to delivery.",
    provide: [
      "Refrigerated, freezer, dry and bonded storage",
      "Customs clearance, freight forwarding, permits",
      "Visas, crew changes, and travel arrangements",
    ],
    why: [
      "Large onsite warehousing capacity",
      "Optimized workflows that reduce delays and risks",
      "Logistics managed through trusted exclusive partners",
      "A dedicated and branded fleet",
    ],
  },
  {
    id: "safety",
    eyebrow: "04 / Health & safety",
    title: "Protecting crews and sites with trusted safety equipment",
    blurb:
      "Industrial health and safety supply, backed by global technology leaders trusted across oil & gas, marine and mining operations.",
    // source: scope added 2026-04-21 at Luther's request; copy pending
    // Yolande refinement — confirm SKU range + distributor tier.
    provide: [
      "Gas detection — portable and fixed (Honeywell BW, Blackline G7)",
      "Connected safety and lone-worker monitoring (Blackline Safety)",
      "PPE, respiratory protection and escape sets",
      "Calibration, servicing and training support",
    ],
    why: [
      "Authorized distributor for Honeywell and Blackline Safety",
      "Equipment certified for harsh offshore and industrial environments",
      "On-site calibration and servicing via trained technicians",
      "Aligned with our ISO 9001 quality controls",
    ],
  },
];

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Four pillars. One partner. Endless solutions."
        intro="Procurement, catering, warehousing, logistics and health & safety — managed in-house by people who know your operation."
      />

      {pillars.map((pillar, idx) => (
        <section
          key={pillar.id}
          id={pillar.id}
          className={
            idx % 2 === 0
              ? "bg-white py-20 sm:py-24"
              : "bg-[var(--color-sand)] py-20 sm:py-24"
          }
        >
          <Container>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-accent)]">
              {pillar.eyebrow}
            </p>
            <h2 className="mt-3 max-w-3xl font-[family-name:var(--font-poppins)] text-2xl font-bold leading-tight text-[var(--color-navy)] sm:text-3xl md:text-4xl">
              {pillar.title}
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-[var(--color-mute)] sm:text-lg">
              {pillar.blurb}
            </p>

            <div className="mt-10 grid gap-8 md:grid-cols-2">
              <div className="rounded-2xl border border-[var(--color-line)] bg-white p-6 shadow-sm">
                <h3 className="font-[family-name:var(--font-poppins)] text-sm font-semibold uppercase tracking-wider text-[var(--color-navy)]">
                  What we provide
                </h3>
                <ul className="mt-4 space-y-3 text-sm leading-relaxed text-[var(--color-ink)]">
                  {pillar.provide.map((p) => (
                    <li key={p} className="flex gap-3">
                      <span
                        aria-hidden="true"
                        className="mt-1 inline-block h-2 w-2 flex-shrink-0 rounded-full bg-[var(--color-accent)]"
                      />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-[var(--color-line)] bg-white p-6 shadow-sm">
                <h3 className="font-[family-name:var(--font-poppins)] text-sm font-semibold uppercase tracking-wider text-[var(--color-navy)]">
                  Why choose us
                </h3>
                <ul className="mt-4 space-y-3 text-sm leading-relaxed text-[var(--color-ink)]">
                  {pillar.why.map((w) => (
                    <li key={w} className="flex gap-3">
                      <span
                        aria-hidden="true"
                        className="mt-1 inline-block h-2 w-2 flex-shrink-0 rounded-full bg-[var(--color-navy)]"
                      />
                      <span>{w}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Container>
        </section>
      ))}

      {/* Distribution partners */}
      <section className="bg-[var(--color-navy)] py-16 text-white">
        <Container>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-accent)]">
            Distribution partners
          </p>
          <h2 className="mt-3 max-w-2xl font-[family-name:var(--font-poppins)] text-2xl font-bold leading-tight sm:text-3xl">
            Brands we represent in Namibia
          </h2>
          <ul className="mt-10 grid gap-6 md:grid-cols-2">
            {partners.map((p) => (
              <li
                key={p.name}
                className="flex flex-col gap-5 rounded-2xl border border-white/15 bg-white p-6"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-14 items-center">
                    {p.logo ? (
                      <Image
                        src={p.logo}
                        alt={`${p.name} logo`}
                        width={p.logoWidth}
                        height={p.logoHeight}
                        className="max-h-12 w-auto"
                      />
                    ) : (
                      <span className="font-[family-name:var(--font-poppins)] text-2xl font-bold tracking-tight text-[var(--color-navy)]">
                        {p.name}
                      </span>
                    )}
                  </div>
                  <span className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-[var(--color-accent-deep)]">
                    {p.category}
                  </span>
                </div>
                <div>
                  <p className="font-[family-name:var(--font-poppins)] text-lg font-bold text-[var(--color-navy)]">
                    {p.name}
                  </p>
                  <p className="mt-1 text-sm text-[var(--color-mute)]">{p.note}</p>
                </div>
                {p.catalogues.length > 0 && (
                  <div className="border-t border-[var(--color-line)] pt-4">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-[var(--color-navy)]">
                      Product catalogues
                    </p>
                    <ul className="mt-3 space-y-2">
                      {p.catalogues.map((c) => (
                        <li key={c.file}>
                          <a
                            href={c.file}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center justify-between gap-3 rounded-md px-2 py-1.5 text-sm text-[var(--color-ink)] transition-colors hover:bg-[var(--color-sand)]"
                          >
                            <span className="flex items-center gap-2">
                              <svg
                                width="14"
                                height="14"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="text-[var(--color-accent-deep)]"
                                aria-hidden="true"
                              >
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                <polyline points="14 2 14 8 20 8" />
                              </svg>
                              <span className="group-hover:underline">
                                {c.title}
                              </span>
                            </span>
                            <span className="text-xs text-[var(--color-mute)]">
                              PDF · {c.sizeMB.toFixed(1)} MB
                            </span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <InlineRFQ />
    </>
  );
}
