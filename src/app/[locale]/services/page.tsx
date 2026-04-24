import Image from "next/image";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { Container } from "@/components/Container";
import { InlineRFQ } from "@/components/InlineRFQ";
import { Link } from "@/i18n/routing";
import { PageHero } from "@/components/PageHero";
import { partners } from "@/lib/site";

type Pillar = {
  id: string;
  eyebrow: string;
  title: string;
  blurb: string;
  provide: string[];
  why: string[];
  href?: string;
  cta?: string;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Meta" });
  return {
    title: t("servicesTitle"),
    description: t("servicesDescription"),
    alternates: { canonical: "/services" },
  };
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Services");

  const pillars: Pillar[] = [
    {
      id: "chandlery",
      eyebrow: t("p1Eyebrow"),
      title: t("p1Title"),
      blurb: t("p1Blurb"),
      provide: [t("p1Provide1"), t("p1Provide2"), t("p1Provide3"), t("p1Provide4")],
      why: [t("p1Why1"), t("p1Why2"), t("p1Why3")],
    },
    {
      id: "catering",
      eyebrow: t("p2Eyebrow"),
      title: t("p2Title"),
      blurb: t("p2Blurb"),
      provide: [t("p2Provide1"), t("p2Provide2"), t("p2Provide3")],
      why: [t("p2Why1"), t("p2Why2"), t("p2Why3")],
    },
    {
      id: "warehousing",
      eyebrow: t("p3Eyebrow"),
      title: t("p3Title"),
      blurb: t("p3Blurb"),
      provide: [t("p3Provide1"), t("p3Provide2"), t("p3Provide3")],
      why: [t("p3Why1"), t("p3Why2"), t("p3Why3"), t("p3Why4")],
    },
    {
      id: "safety",
      eyebrow: t("p4Eyebrow"),
      title: t("p4Title"),
      blurb: t("p4Blurb"),
      provide: [t("p4Provide1"), t("p4Provide2"), t("p4Provide3"), t("p4Provide4")],
      why: [t("p4Why1"), t("p4Why2"), t("p4Why3"), t("p4Why4")],
    },
    {
      id: "dry-dock",
      eyebrow: t("p5Eyebrow"),
      title: t("p5Title"),
      blurb: t("p5Blurb"),
      provide: [
        t("p5Provide1"),
        t("p5Provide2"),
        t("p5Provide3"),
        t("p5Provide4"),
        t("p5Provide5"),
      ],
      why: [t("p5Why1"), t("p5Why2"), t("p5Why3"), t("p5Why4"), t("p5Why5")],
      href: "/services/dry-dock",
      cta: t("p5Cta"),
    },
  ];

  return (
    <>
      <PageHero
        eyebrow={t("heroEyebrow")}
        title={t("heroTitle")}
        intro={t("heroIntro")}
        image={{ src: "/images/site/operations/crew-lifting-pallet.jpg" }}
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
                  {t("whatWeProvide")}
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
                  {t("whyChooseUs")}
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

            {pillar.href && pillar.cta && (
              <div className="mt-8">
                <Link
                  href={pillar.href}
                  className="inline-flex items-center rounded-full bg-[var(--color-navy)] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-navy-soft)]"
                >
                  {pillar.cta} &rarr;
                </Link>
              </div>
            )}
          </Container>
        </section>
      ))}

      {/* Distribution partners */}
      <section className="bg-[var(--color-navy)] py-16 text-white">
        <Container>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-accent)]">
            {t("partnersEyebrow")}
          </p>
          <h2 className="mt-3 max-w-2xl font-[family-name:var(--font-poppins)] text-2xl font-bold leading-tight sm:text-3xl">
            {t("partnersHeading")}
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
                      {t("productCatalogues")}
                      {p.catalogues.length > 4 && (
                        <span className="ml-2 font-normal normal-case text-[var(--color-mute)]">
                          ({t("available", { count: p.catalogues.length })})
                        </span>
                      )}
                    </p>
                    <ul className="mt-3 max-h-72 space-y-2 overflow-y-auto pr-1">
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
