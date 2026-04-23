import Image from "next/image";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { Container } from "@/components/Container";
import { InlineRFQ } from "@/components/InlineRFQ";
import { Link } from "@/i18n/routing";
import { PageHero } from "@/components/PageHero";
import { contact } from "@/lib/site";

// Source: Daron_Drydock_Presentation 2026.pdf (18 slides).
// All copy lifted from the presentation; flagged for Yolande refinement.

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Meta" });
  return {
    title: t("dryDockTitle"),
    description: t("dryDockDescription"),
    alternates: { canonical: "/services/dry-dock" },
  };
}

export default async function DryDockPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("DryDock");

  const walvisOps = [
    { title: t("op1Title"), blurb: t("op1Body") },
    { title: t("op2Title"), blurb: t("op2Body") },
    { title: t("op3Title"), blurb: t("op3Body") },
    { title: t("op4Title"), blurb: t("op4Body") },
  ];

  const drydockCapabilities = [
    t("cap1"),
    t("cap2"),
    t("cap3"),
    t("cap4"),
    t("cap5"),
  ];

  const serviceSections = [
    {
      id: "mechanical",
      title: t("mechTitle"),
      items: [t("mech1"), t("mech2"), t("mech3"), t("mech4"), t("mech5")],
    },
    {
      id: "structural",
      title: t("structTitle"),
      items: [t("struct1"), t("struct2"), t("struct3"), t("struct4"), t("struct5")],
    },
    {
      id: "safety",
      title: t("safetyTitle"),
      items: [t("safety1"), t("safety2"), t("safety3"), t("safety4"), t("safety5")],
    },
    {
      id: "chandling",
      title: t("chandTitle"),
      items: [t("chand1"), t("chand2"), t("chand3"), t("chand4"), t("chand5")],
    },
  ];

  const caseStudies = [
    {
      title: t("case1Title"),
      body: t("case1Body"),
      image: "/images/site/drydock/case-study-orlichem-deck.jpg",
      alt: t("case1Alt"),
    },
    {
      title: t("case2Title"),
      body: t("case2Body"),
      image: "/images/site/drydock/case-study-hempel-bow.jpg",
      alt: t("case2Alt"),
    },
    {
      title: t("case3Title"),
      body: t("case3Body"),
      image: "/images/site/drydock/case-study-sl-africa.jpg",
      alt: t("case3Alt"),
    },
    {
      title: t("case4Title"),
      body: t("case4Body"),
      image: "/images/site/drydock/case-study-winch-refurbishment.jpg",
      alt: t("case4Alt"),
    },
  ];

  const whyDaron = [
    t("why1"),
    t("why2"),
    t("why3"),
    t("why4"),
    t("why5"),
  ];

  return (
    <>
      <PageHero
        eyebrow={t("heroEyebrow")}
        title={t("heroTitle")}
        intro={t("heroIntro")}
        image={{ src: "/images/site/man-loading-ship.jpg" }}
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <a
            href={contact.whatsapp.href}
            className="rounded-full bg-[var(--color-accent)] px-6 py-3 text-center text-base font-semibold text-[var(--color-navy)] transition-colors hover:bg-[var(--color-accent-deep)]"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t("sendSchedule")} &rarr;
          </a>
          <Link
            href="/contact"
            className="rounded-full border border-white/30 px-6 py-3 text-center text-base font-semibold text-white transition-colors hover:bg-white/10"
          >
            {t("contactTeam")}
          </Link>
        </div>
      </PageHero>

      {/* Walvis Bay Operations — 4 core pillars */}
      <section className="bg-white py-20 sm:py-24">
        <Container>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-accent-deep)]">
            {t("opsEyebrow")}
          </p>
          <h2 className="mt-3 max-w-3xl font-[family-name:var(--font-poppins)] text-2xl font-bold leading-tight text-[var(--color-navy)] sm:text-3xl md:text-4xl">
            {t("opsHeading")}
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
            {t("supportEyebrow")}
          </p>
          <h2 className="mt-3 max-w-3xl font-[family-name:var(--font-poppins)] text-2xl font-bold leading-tight sm:text-3xl md:text-4xl">
            {t("supportHeading")}
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
            {t("scopeEyebrow")}
          </p>
          <h2 className="mt-3 max-w-3xl font-[family-name:var(--font-poppins)] text-2xl font-bold leading-tight text-[var(--color-navy)] sm:text-3xl md:text-4xl">
            {t("scopeHeading")}
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
            {t("caseEyebrow")}
          </p>
          <h2 className="mt-3 max-w-3xl font-[family-name:var(--font-poppins)] text-2xl font-bold leading-tight text-[var(--color-navy)] sm:text-3xl md:text-4xl">
            {t("caseHeading")}
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
                {t("whyEyebrow")}
              </p>
              <h2 className="mt-3 font-[family-name:var(--font-poppins)] text-2xl font-bold leading-tight text-[var(--color-navy)] sm:text-3xl md:text-4xl">
                {t("whyHeading")}
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
        heading={t("rfqHeading")}
        body={t("rfqBody")}
      />
    </>
  );
}
