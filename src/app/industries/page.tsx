import type { Metadata } from "next";

import { Container } from "@/components/Container";
import { InlineRFQ } from "@/components/InlineRFQ";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Industries we serve",
  description:
    "Daron Namibia provides tailored provisioning and technical support for the marine, offshore, oil & gas, hospitality, mining, and industrial sectors.",
  alternates: { canonical: "/industries" },
};

const industries = [
  {
    name: "Marine & offshore",
    promise: "Reliable support at every port.",
    body: "Tailored chandlery, catering, and technical supplies and services that keep vessels and rigs operating smoothly — from routine resupply to fast-turnaround reactivations.",
  },
  {
    name: "Oil & gas",
    promise: "Provisioning for offshore rigs.",
    body: "Provisioning and logistics solutions aligned with strict industry standards, designed for the pace and accountability that offshore operations demand.",
  },
  {
    name: "Hospitality",
    promise: "Supplying quality that guests can taste.",
    body: "Reliable delivery of fresh produce and catering support for hotels and resorts. We bring the same supply chain discipline our marine clients rely on to your front of house.",
  },
  {
    name: "Mining & industrial",
    promise: "Powering productivity on site.",
    body: "Technical supplies, warehousing, and logistics designed for demanding environments — bonded storage, branded fleet, and the workflow to keep production lines moving.",
  },
];

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        eyebrow="Industries"
        title="One partner. Endless solutions."
        intro="From chandlery to catering, warehousing to logistics — we manage it all across four sectors that shape Africa&apos;s economies."
      />

      <section className="bg-white py-20 sm:py-24">
        <Container>
          <ul className="grid gap-6 md:grid-cols-2">
            {industries.map((ind) => (
              <li
                key={ind.name}
                className="flex flex-col rounded-2xl border border-[var(--color-line)] bg-[var(--color-sand)] p-7 transition-shadow hover:shadow-md"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-orange)]">
                  {ind.name}
                </p>
                <h2 className="mt-3 font-[family-name:var(--font-poppins)] text-xl font-bold leading-snug text-[var(--color-navy)] sm:text-2xl">
                  {ind.promise}
                </h2>
                <p className="mt-3 text-base leading-relaxed text-[var(--color-mute)]">
                  {ind.body}
                </p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <InlineRFQ
        variant="navy"
        heading="Talk to us about your industry needs."
        body="One partner. Endless solutions. From chandlery to catering, warehousing to logistics — we manage it all."
      />
    </>
  );
}
