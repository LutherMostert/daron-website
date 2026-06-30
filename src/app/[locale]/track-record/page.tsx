import Image from "next/image";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { Link } from "@/i18n/routing";
import { Container } from "@/components/Container";
import { CountUp } from "@/components/CountUp";
import { PageHero } from "@/components/PageHero";
import { InlineRFQ } from "@/components/InlineRFQ";
import { JsonLd } from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "TrackRecord" });
  return buildMetadata({
    locale,
    path: "/track-record",
    title: `${t("heroTitle")} — Offshore, Dry-Dock & Provisioning`,
    description: t("heroIntro"),
  });
}

const cases = [
  {
    key: "case1",
    image: "/images/site/drydock/case-study-orlichem-deck.jpg",
  },
  {
    key: "case2",
    image: "/images/site/drydock/case-study-hempel-bow.jpg",
  },
  {
    key: "case3",
    image: "/images/site/drydock/case-study-sl-africa.jpg",
  },
  {
    key: "case4",
    image: "/images/site/drydock/case-study-winch-refurbishment.jpg",
  },
] as const;

export default async function TrackRecordPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("TrackRecord");
  const tDry = await getTranslations("DryDock");
  const tWhy = await getTranslations("WhyDaron");

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.url },
      {
        "@type": "ListItem",
        position: 2,
        name: "Track record",
        item: `${site.url}/track-record`,
      },
    ],
  };

  return (
    <>
      <PageHero
        eyebrow={t("heroEyebrow")}
        title={t("heroTitle")}
        intro={t("heroIntro")}
        image={{ src: "/images/site/operations/normand-energy-wide.jpg" }}
      />

      {/* Headline numbers */}
      <section className="bg-[var(--color-navy)] py-16 text-white">
        <Container className="grid gap-8 md:grid-cols-3 md:gap-12">
          <div data-reveal>
            <p className="font-[family-name:var(--font-poppins)] text-5xl font-bold text-[var(--color-accent)] sm:text-6xl">
              <CountUp to={11} separator={false} />
              <span className="ml-1 text-2xl font-semibold text-white sm:text-3xl">
                {tWhy("stat1Suffix")}
              </span>
            </p>
            <p className="mt-3 text-sm leading-relaxed text-white/80">
              {tWhy("stat1Label")}
            </p>
          </div>
          <div data-reveal style={{ "--reveal-delay": "90ms" } as React.CSSProperties}>
            <p className="font-[family-name:var(--font-poppins)] text-5xl font-bold text-[var(--color-accent)] sm:text-6xl">
              <CountUp to={2500} suffix="+" />
            </p>
            <p className="mt-3 text-sm leading-relaxed text-white/80">
              {tWhy("stat2Label")}
            </p>
          </div>
          <div data-reveal style={{ "--reveal-delay": "180ms" } as React.CSSProperties}>
            <p className="font-[family-name:var(--font-poppins)] text-5xl font-bold text-[var(--color-accent)] sm:text-6xl">
              <CountUp to={10} prefix=">" separator={false} />
              <span className="ml-1 text-2xl font-semibold text-white sm:text-3xl">
                {tWhy("stat3Suffix")}
              </span>
            </p>
            <p className="mt-3 text-sm leading-relaxed text-white/80">
              {tWhy("stat3Label")}
            </p>
          </div>
        </Container>
      </section>

      {/* Featured operation — Sapura Berani */}
      <section className="bg-white py-20 sm:py-24">
        <Container className="grid gap-10 md:grid-cols-[1.3fr_1fr] md:items-center">
          <div data-reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-accent-text)]">
              {t("sapuraEyebrow")}
            </p>
            <h2 className="mt-3 font-[family-name:var(--font-poppins)] text-2xl font-bold leading-tight text-[var(--color-navy)] sm:text-3xl md:text-4xl">
              {t("sapuraTitle")}
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-[var(--color-mute)]">
              {t("sapuraBody")}
            </p>
            <Link
              href="/insights/reviving-sapura-berani"
              className="mt-6 inline-flex items-center rounded-full bg-[var(--color-navy)] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-navy-soft)]"
            >
              {t("sapuraCta")} &rarr;
            </Link>
          </div>
          <div
            data-reveal
            className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-[var(--color-navy)]"
          >
            <Image
              src="/images/site/operations/seven-borealis-dusk.jpg"
              alt=""
              aria-hidden="true"
              fill
              sizes="(max-width: 768px) 100vw, 40vw"
              className="object-cover"
            />
          </div>
        </Container>
      </section>

      {/* Dry-dock & technical case studies */}
      <section className="bg-[var(--color-sand)] py-20 sm:py-24">
        <Container>
          <h2 className="font-[family-name:var(--font-poppins)] text-2xl font-bold leading-tight text-[var(--color-navy)] sm:text-3xl">
            {t("casesHeading")}
          </h2>
          <ul className="mt-10 grid gap-6 sm:grid-cols-2">
            {cases.map((c, idx) => (
              <li
                key={c.key}
                data-reveal
                style={{ "--reveal-delay": `${idx * 70}ms` } as React.CSSProperties}
                className="overflow-hidden rounded-2xl bg-white shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="relative aspect-[16/9] w-full bg-[var(--color-navy)]">
                  <Image
                    src={c.image}
                    alt={tDry(`${c.key}Alt`)}
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-[family-name:var(--font-poppins)] text-lg font-semibold text-[var(--color-navy)]">
                    {tDry(`${c.key}Title`)}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--color-mute)]">
                    {tDry(`${c.key}Body`)}
                  </p>
                </div>
              </li>
            ))}
          </ul>
          <Link
            href="/industries/oil-and-gas"
            className="mt-10 inline-flex items-center font-semibold text-[var(--color-navy)] underline-offset-4 hover:underline"
          >
            {t("rigsCta")} &rarr;
          </Link>
        </Container>
      </section>

      <InlineRFQ variant="navy" />
      <JsonLd id="ld-trackrecord-breadcrumb" data={breadcrumb} />
    </>
  );
}
