import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { buildMetadata } from "@/lib/seo";

import { Container } from "@/components/Container";
import { CountUp } from "@/components/CountUp";
import { InlineRFQ } from "@/components/InlineRFQ";
import { PageHero } from "@/components/PageHero";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Meta" });
  return buildMetadata({
    locale,
    path: "/why-daron",
    title: t("whyDaronTitle"),
    description: t("whyDaronDescription"),
  });
}

export default async function WhyDaronPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("WhyDaron");

  const reasons = [
    { eyebrow: t("r1Eyebrow"), title: t("r1Title"), body: t("r1Body") },
    { eyebrow: t("r2Eyebrow"), title: t("r2Title"), body: t("r2Body") },
    { eyebrow: t("r3Eyebrow"), title: t("r3Title"), body: t("r3Body") },
    { eyebrow: t("r4Eyebrow"), title: t("r4Title"), body: t("r4Body") },
    { eyebrow: t("r5Eyebrow"), title: t("r5Title"), body: t("r5Body") },
    { eyebrow: t("r6Eyebrow"), title: t("r6Title"), body: t("r6Body") },
  ];

  return (
    <>
      <PageHero
        eyebrow={t("heroEyebrow")}
        title={t("heroTitle")}
        intro={t("heroIntro")}
        image={{ src: "/images/site/operations/seven-borealis-dusk.jpg" }}
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
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-accent-text)]">
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
          <Stat to={11} wordSuffix={t("stat1Suffix")} label={t("stat1Label")} delay={0} />
          <Stat to={2500} numberSuffix="+" label={t("stat2Label")} delay={90} />
          <Stat to={10} prefix=">" wordSuffix={t("stat3Suffix")} label={t("stat3Label")} delay={180} />
        </Container>
      </section>

      <InlineRFQ
        heading={t("rfqHeading")}
        body={t("rfqBody")}
      />
    </>
  );
}

function Stat({
  to,
  prefix,
  numberSuffix,
  wordSuffix,
  label,
  delay = 0,
}: {
  to: number;
  prefix?: string;
  numberSuffix?: string;
  wordSuffix?: string;
  label: string;
  delay?: number;
}) {
  return (
    <div
      data-reveal
      style={{ "--reveal-delay": `${delay}ms` } as React.CSSProperties}
    >
      <p className="font-[family-name:var(--font-poppins)] text-5xl font-bold text-[var(--color-accent)] sm:text-6xl">
        <CountUp to={to} prefix={prefix} suffix={numberSuffix} />
        {wordSuffix && (
          <span className="ml-1 text-2xl font-semibold text-white sm:text-3xl">
            {wordSuffix}
          </span>
        )}
      </p>
      <p className="mt-3 text-sm leading-relaxed text-white/80">{label}</p>
    </div>
  );
}
