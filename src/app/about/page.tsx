import type { Metadata } from "next";

import { Container } from "@/components/Container";
import { InlineRFQ } from "@/components/InlineRFQ";
import { PageHero } from "@/components/PageHero";
import { certifications, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Founded in 2012, Daron Namibia has grown from a ship chandler into a full-service partner for marine, oil & gas, hospitality, mining, and industrial sectors.",
  alternates: { canonical: "/about" },
};

const values = [
  "We deliver the highest quality standards in every product and service.",
  "We put the client first, every time.",
  "We aim for the best in all we do.",
  "We meet our commitments and go the extra mile to get the job done.",
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Our journey"
        title="From ship chandler to full-service partner"
        intro={`Daron Namibia was founded in ${site.founded} with a clear vision: to deliver world-class supply chain services from right here in Namibia.`}
        image={{ src: "/images/site/harbour-port.jpg" }}
      />

      {/* Daron Group credibility band */}
      <section className="bg-[var(--color-navy)] py-14 text-white">
        <Container className="grid gap-8 text-center sm:grid-cols-3">
          <GroupStat value="1959" label="Daron Group established" />
          <GroupStat value="8" label="Countries across Africa" />
          <GroupStat value="350+" label="Employees across the group" />
        </Container>
      </section>

      {/* Story */}
      <section className="bg-white py-20 sm:py-24">
        <Container className="grid gap-10 md:grid-cols-[1fr_2fr] md:items-start">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-accent)]">
              The story
            </p>
            <h2 className="mt-3 font-[family-name:var(--font-poppins)] text-2xl font-bold leading-tight text-[var(--color-navy)] sm:text-3xl">
              Built in Walvis Bay. Backed by the Daron Group.
            </h2>
          </div>
          <div className="space-y-5 text-base leading-relaxed text-[var(--color-mute)]">
            <p>
              {`Daron Namibia was founded in ${site.founded} as the Namibian presence of the Daron Group — a family-owned marine support business that has been operating across Africa since 1959. The Group runs technical supply, provisions, food services, logistics and engineering operations through entities in Namibia, South Africa, Angola, Senegal, Mozambique, Congo and Côte d’Ivoire, with around 350 staff across the network.`}
            </p>
            <p>
              Starting as a ship chandler in Walvis Bay, we’ve expanded into
              catering, warehousing, logistics, health & safety, and dry-dock
              technical support — always guided by our promise of quality,
              service, and excellence. From humble beginnings, we’ve grown into
              a trusted partner for shipowners, offshore operators, hospitality
              groups and industrial clients across Africa.
            </p>
          </div>
        </Container>
      </section>

      {/* Mission / Vision */}
      <section className="bg-[var(--color-sand)] py-20 sm:py-24">
        <Container className="grid gap-6 md:grid-cols-2">
          <article className="rounded-2xl bg-white p-8 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-accent)]">
              Mission
            </p>
            <h2 className="mt-3 font-[family-name:var(--font-poppins)] text-xl font-semibold text-[var(--color-navy)]">
              Anchored in service
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[var(--color-mute)]">
              To consistently deliver reliable, client-focused marine and
              technical solutions, ensuring operational excellence and
              outstanding service at every step.
            </p>
          </article>
          <article className="rounded-2xl bg-white p-8 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-accent)]">
              Vision
            </p>
            <h2 className="mt-3 font-[family-name:var(--font-poppins)] text-xl font-semibold text-[var(--color-navy)]">
              Set on Africa’s future
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[var(--color-mute)]">
              To be Africa’s leading ship chandler and provider of marine,
              engineering, and technical goods &amp; services across
              industries.
            </p>
          </article>
        </Container>
      </section>

      {/* Values */}
      <section className="bg-white py-20 sm:py-24">
        <Container>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-accent)]">
            Values
          </p>
          <h2 className="mt-3 font-[family-name:var(--font-poppins)] text-2xl font-bold leading-tight text-[var(--color-navy)] sm:text-3xl">
            Your assurance, in four lines
          </h2>
          <ul className="mt-10 grid gap-5 md:grid-cols-2">
            {values.map((v, idx) => (
              <li
                key={v}
                className="flex gap-4 rounded-2xl border border-[var(--color-line)] p-6"
              >
                <span
                  aria-hidden="true"
                  className="font-[family-name:var(--font-poppins)] text-2xl font-bold text-[var(--color-accent)]"
                >
                  0{idx + 1}
                </span>
                <p className="text-base leading-relaxed text-[var(--color-ink)]">
                  {v}
                </p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Certifications */}
      <section className="bg-[var(--color-navy)] py-16 text-white">
        <Container>
          <div className="grid gap-8 md:grid-cols-[1fr_2fr] md:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-accent)]">
                Globally certified, locally grounded
              </p>
              <h2 className="mt-3 font-[family-name:var(--font-poppins)] text-2xl font-bold leading-tight sm:text-3xl">
                Standards that international operators expect
              </h2>
            </div>
            <ul className="grid gap-3 sm:grid-cols-2">
              {certifications.map((cert) => (
                <li
                  key={cert}
                  className="rounded-xl border border-white/15 bg-white/5 px-5 py-4 text-sm font-medium"
                >
                  {cert}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <InlineRFQ />
    </>
  );
}

function GroupStat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p className="font-[family-name:var(--font-poppins)] text-5xl font-bold text-[var(--color-accent)] sm:text-6xl">
        {value}
      </p>
      <p className="mt-3 text-sm leading-relaxed text-white/80">{label}</p>
    </div>
  );
}
