import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { Link } from "@/i18n/routing";
import { routing } from "@/i18n/routing";
import { Container } from "@/components/Container";
import { InlineRFQ } from "@/components/InlineRFQ";
import { JsonLd } from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo";
import { brands, getBrand, getPartnerByName, contact, site } from "@/lib/site";

type Params = Promise<{ locale: string; brand: string }>;

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    brands.map((b) => ({ locale, brand: b.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { locale, brand } = await params;
  const b = getBrand(brand);
  if (!b) return {};
  return buildMetadata({
    locale,
    path: `/brands/${b.slug}`,
    title: `${b.name} — ${b.distributorTier}`,
    description: b.intro[0].slice(0, 155),
  });
}

export default async function BrandPage({ params }: { params: Params }) {
  const { locale, brand } = await params;
  setRequestLocale(locale);
  const b = getBrand(brand);
  if (!b) notFound();
  const partner = getPartnerByName(b.partnerName);
  const t = await getTranslations("Brands");

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.url },
      { "@type": "ListItem", position: 2, name: "Brands", item: `${site.url}/brands` },
      {
        "@type": "ListItem",
        position: 3,
        name: b.name,
        item: `${site.url}/brands/${b.slug}`,
      },
    ],
  };

  const serviceLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${b.name} — ${b.tagline}`,
    serviceType: "Authorised distribution",
    provider: { "@type": "Organization", name: site.name, url: site.url },
    areaServed: { "@type": "Country", name: "Namibia" },
    description: b.intro[0],
  };

  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-[var(--color-navy)] text-white">
        <Image
          src={b.heroImage}
          alt=""
          fill
          priority
          sizes="100vw"
          aria-hidden="true"
          className="object-cover object-center opacity-40 kenburns"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-[var(--color-navy)] via-[var(--color-navy)]/85 to-[var(--color-navy)]/55"
        />
        <Container className="relative py-16 sm:py-24">
          <Link
            href="/brands"
            className="inline-flex items-center text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-accent)] hover:text-white"
          >
            &larr; {t("backToBrands")}
          </Link>

          {partner?.logo ? (
            <div className="mt-6 inline-flex items-center rounded-lg bg-white px-4 py-3">
              <Image
                src={partner.logo}
                alt={`${b.name} logo`}
                width={partner.logoWidth}
                height={partner.logoHeight}
                className="h-9 w-auto max-w-[200px] object-contain"
              />
            </div>
          ) : (
            <p className="mt-6 font-[family-name:var(--font-poppins)] text-3xl font-bold sm:text-4xl">
              {b.name}
            </p>
          )}

          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-accent)]">
            {b.distributorTier}
          </p>
          <h1 className="mt-3 max-w-3xl font-[family-name:var(--font-poppins)] text-3xl font-bold leading-tight sm:text-5xl">
            {b.tagline}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg">
            {b.intro[0]}
          </p>
          <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
            <a
              href={contact.whatsapp.href}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-[var(--color-cta)] px-7 py-3 text-center text-base font-semibold text-[var(--color-cta-ink)] transition-colors hover:bg-[var(--color-cta-deep)]"
            >
              {t("sendRfq")} &rarr;
            </a>
            <Link
              href="/contact"
              className="rounded-full border border-white/30 px-7 py-3 text-center text-base font-semibold text-white transition-colors hover:bg-white/10"
            >
              {t("talkCta")}
            </Link>
          </div>
        </Container>
      </section>

      {/* Intro + sectors */}
      <section className="bg-white py-20 sm:py-24">
        <Container className="grid gap-12 md:grid-cols-[1.6fr_1fr] md:items-start">
          <div className="space-y-5 text-base leading-relaxed text-[var(--color-mute)]">
            {b.intro.map((para, i) => (
              <p key={i} data-reveal>
                {para}
              </p>
            ))}
          </div>
          <aside data-reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-accent-text)]">
              {t("sectorsLabel")}
            </p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {b.sectors.map((s) => (
                <li
                  key={s}
                  className="rounded-full border border-[var(--color-line)] bg-[var(--color-sand)] px-4 py-2 text-sm font-medium text-[var(--color-navy)]"
                >
                  {s}
                </li>
              ))}
            </ul>
          </aside>
        </Container>
      </section>

      {/* Ranges */}
      <section className="bg-[var(--color-sand)] py-20 sm:py-24">
        <Container>
          <h2 className="font-[family-name:var(--font-poppins)] text-2xl font-bold leading-tight text-[var(--color-navy)] sm:text-3xl">
            {t("rangesHeading")}
          </h2>
          <ul className="mt-10 grid gap-6 md:grid-cols-2">
            {b.ranges.map((r, idx) => (
              <li
                key={r.title}
                data-reveal
                style={
                  { "--reveal-delay": `${idx * 60}ms` } as React.CSSProperties
                }
                className="rounded-2xl border border-[var(--color-line)] bg-white p-7 shadow-sm"
              >
                <h3 className="font-[family-name:var(--font-poppins)] text-lg font-semibold text-[var(--color-navy)]">
                  {r.title}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-[var(--color-mute)]">
                  {r.body}
                </p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Catalogues */}
      {partner && partner.catalogues.length > 0 && (
        <section className="bg-white py-20 sm:py-24">
          <Container>
            <h2 className="font-[family-name:var(--font-poppins)] text-2xl font-bold leading-tight text-[var(--color-navy)] sm:text-3xl">
              {t("cataloguesHeading")}{" "}
              <span className="text-base font-normal text-[var(--color-mute)]">
                {t("available", { count: partner.catalogues.length })}
              </span>
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[var(--color-mute)]">
              {t("cataloguesNote")}
            </p>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {partner.catalogues.map((cat) => (
                <li key={cat.file}>
                  <a
                    href={cat.file}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between gap-3 rounded-xl border border-[var(--color-line)] bg-white px-4 py-3 text-sm transition-colors hover:border-[var(--color-accent)]"
                  >
                    <span className="flex items-center gap-2 font-medium text-[var(--color-navy)]">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="shrink-0 text-[var(--color-accent-text)]"
                        aria-hidden="true"
                      >
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <polyline points="14 2 14 8 20 8" />
                        <line x1="12" y1="18" x2="12" y2="12" />
                        <polyline points="9 15 12 18 15 15" />
                      </svg>
                      {cat.title}
                    </span>
                    <span className="shrink-0 text-xs text-[var(--color-mute)]">
                      PDF · {cat.sizeMB} MB
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}

      <InlineRFQ
        variant="navy"
        heading={t("rfqHeading", { brand: b.name })}
        body={t("rfqBody")}
      />

      <JsonLd id="ld-brand-breadcrumb" data={breadcrumb} />
      <JsonLd id="ld-brand-service" data={serviceLd} />
    </>
  );
}
