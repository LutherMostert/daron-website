import type { Metadata } from "next";

import { Container } from "@/components/Container";
import { InlineRFQ } from "@/components/InlineRFQ";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Why Daron",
  description:
    "Why operators across Africa pick Daron Namibia: quotes in hours not days, deep inventory, 24/7 operational reality, family-owned accountability, and an AI-powered RFQ desk.",
  alternates: { canonical: "/why-daron" },
};

const reasons = [
  {
    eyebrow: "Speed",
    title: "Quotes in hours, not days.",
    body: "Demurrage on a single offshore rig can run upwards of US$50,000 per day. Slow procurement is not a paperwork issue — it is a P&L event. Our AI-powered quoting desk (Daron AI assistant) drafts an RFQ response within minutes on WhatsApp, with a human KAM reviewing every quote before it ships.",
  },
  {
    eyebrow: "Inventory depth",
    title: "If we don't have it, we know who does.",
    body: "Refrigerated, freezer, dry and bonded storage on-site, plus a network of 2,500+ suppliers across Africa and Europe. When a part isn't in Namibia, we have manufactured replacements on-site to keep an 11-day rig reactivation deadline.",
  },
  {
    eyebrow: "24/7 operational reality",
    title: "Vessels don't wait. Neither do we.",
    body: "Offshore operations run around the clock and our delivery posture matches that. Supplies have been delivered to a rig within an hour of being requested. We staff for it, equip for it, and run the workflow so customers can rely on it.",
  },
  {
    eyebrow: "Family-owned accountability",
    title: "Decisions are made by the people you call.",
    body: "We are a Namibian family business, not a satellite office of a multinational. The MD answers the phone. Decisions are quick because the chain of command is short. When something goes wrong, you talk to the people who can fix it — not a regional liaison three time zones away.",
  },
  {
    eyebrow: "Trusted partnerships",
    title: "Pelligrini, Orlichem, Hempel — and 2,500+ more.",
    body: "Our exclusive distribution agreements with Orlichem (specialised marine chemicals) and Hempel (marine coatings) anchor our chandlery offer. Our ongoing collaboration with Pelligrini on offshore projects — most recently the Saipem Santorini — speaks to the operating tempo international partners can expect from us.",
  },
  {
    eyebrow: "Compliance, every time",
    title: "ISO 9001:2015. HACCP. ISSA & IMPA listed.",
    body: "International credibility is not a marketing claim — it's a checklist that gets audited. We are certified to the standards your procurement team will ask about, and our processes are built around them.",
  },
];

export default function WhyDaronPage() {
  return (
    <>
      <PageHero
        eyebrow="Why Daron"
        title="Six reasons procurement teams across Africa pick us first"
        intro="Speed, depth, accountability, partnerships, certifications — and an AI quoting desk that answers in minutes. The full picture below."
        image={{ src: "/images/site/man-loading-ship.jpg" }}
      />

      <section className="bg-white py-20 sm:py-24">
        <Container>
          <ul className="grid gap-6 md:grid-cols-2">
            {reasons.map((r, idx) => (
              <li
                key={r.eyebrow}
                className="flex flex-col rounded-2xl border border-[var(--color-line)] bg-[var(--color-sand)] p-7"
              >
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-accent)]">
                    {r.eyebrow}
                  </p>
                  <span
                    aria-hidden="true"
                    className="font-[family-name:var(--font-poppins)] text-sm font-bold text-[var(--color-navy)]"
                  >
                    0{idx + 1}
                  </span>
                </div>
                <h2 className="mt-3 font-[family-name:var(--font-poppins)] text-xl font-bold leading-snug text-[var(--color-navy)] sm:text-2xl">
                  {r.title}
                </h2>
                <p className="mt-3 text-base leading-relaxed text-[var(--color-mute)]">
                  {r.body}
                </p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Proof block */}
      <section className="bg-[var(--color-navy)] py-20 text-white">
        <Container className="grid gap-8 md:grid-cols-3 md:gap-12">
          <Stat value="11" suffix=" days" label="Sapura Berani full rig reactivation, with Pelligrini" />
          <Stat value="2,500+" label="Suppliers across Africa and Europe in our network" />
          <Stat value=">10" suffix=" yrs" label="Operating from Walvis Bay since 2012" />
        </Container>
      </section>

      <InlineRFQ
        heading="See if we&apos;re the right fit for your operation."
        body="Send your RFQ on WhatsApp or message us directly. A KAM will be back to you the same day."
      />
    </>
  );
}

function Stat({
  value,
  suffix,
  label,
}: {
  value: string;
  suffix?: string;
  label: string;
}) {
  return (
    <div>
      <p className="font-[family-name:var(--font-poppins)] text-5xl font-bold text-[var(--color-accent)] sm:text-6xl">
        {value}
        {suffix && (
          <span className="ml-1 text-2xl font-semibold text-white sm:text-3xl">
            {suffix}
          </span>
        )}
      </p>
      <p className="mt-3 text-sm leading-relaxed text-white/80">{label}</p>
    </div>
  );
}
