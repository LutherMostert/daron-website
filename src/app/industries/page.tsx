import Image from "next/image";
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
    image: "/images/site/man-loading-ship.jpg",
    imageAlt: "Worker loading supplies onto a vessel at Walvis Bay harbour",
    imageWidth: 1396,
    imageHeight: 933,
  },
  {
    name: "Oil & gas",
    promise: "Provisioning for offshore rigs.",
    body: "Provisioning and logistics solutions aligned with strict industry standards, designed for the pace and accountability that offshore operations demand.",
    image: "/images/site/offshore-catering.jpg",
    imageAlt: "Offshore oil and gas platform operations",
    imageWidth: 2560,
    imageHeight: 1128,
  },
  {
    name: "Hospitality",
    promise: "Supplying quality that guests can taste.",
    body: "Reliable delivery of fresh produce and catering support for hotels and resorts. We bring the same supply chain discipline our marine clients rely on to your front of house.",
    image: "/images/site/food-supply-worker.jpg",
    imageAlt: "Daron food supply worker preparing fresh produce",
    imageWidth: 2050,
    imageHeight: 904,
  },
  {
    name: "Mining & industrial",
    promise: "Powering productivity on site.",
    body: "Technical supplies, warehousing, and logistics designed for demanding environments — bonded storage, branded fleet, and the workflow to keep production lines moving.",
    image: "/images/site/mining.jpeg",
    imageAlt: "Industrial and mining supply operations in Namibia",
    imageWidth: 2560,
    imageHeight: 1474,
  },
];

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        eyebrow="Industries"
        title="One partner. Endless solutions."
        intro="From chandlery to catering, warehousing to logistics — we manage it all across four sectors that shape Africa&apos;s economies."
        image={{ src: "/images/site/containers-row.png" }}
      />

      <section className="bg-white py-20 sm:py-24">
        <Container>
          <ul className="grid gap-8 md:grid-cols-2">
            {industries.map((ind) => (
              <li
                key={ind.name}
                className="group flex flex-col overflow-hidden rounded-2xl border border-[var(--color-line)] bg-white shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-[var(--color-sand)]">
                  <Image
                    src={ind.image}
                    alt={ind.imageAlt}
                    width={ind.imageWidth}
                    height={ind.imageHeight}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[var(--color-navy)]/70 to-transparent"
                  />
                </div>
                <div className="p-7">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-accent-deep)]">
                    {ind.name}
                  </p>
                  <h2 className="mt-3 font-[family-name:var(--font-poppins)] text-xl font-bold leading-snug text-[var(--color-navy)] sm:text-2xl">
                    {ind.promise}
                  </h2>
                  <p className="mt-3 text-base leading-relaxed text-[var(--color-mute)]">
                    {ind.body}
                  </p>
                </div>
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
