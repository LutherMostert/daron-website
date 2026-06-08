import Image from "next/image";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { Link } from "@/i18n/routing";
import { Container } from "@/components/Container";
import { PageHero } from "@/components/PageHero";
import { InlineRFQ } from "@/components/InlineRFQ";
import { ClientWall } from "@/components/ClientWall";
import { JsonLd } from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo";
import { brands, getPartnerByName, site } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Brands" });
  return buildMetadata({
    locale,
    path: "/brands",
    title: t("heroTitle"),
    description: t("heroIntro"),
  });
}

export default async function BrandsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Brands");

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.url },
      { "@type": "ListItem", position: 2, name: "Brands", item: `${site.url}/brands` },
    ],
  };

  return (
    <>
      <PageHero
        eyebrow={t("heroEyebrow")}
        title={t("heroTitle")}
        intro={t("heroIntro")}
        image={{ src: "/images/site/operations/daron-team-hempel-launch.jpg" }}
      />

      <section className="bg-white py-20 sm:py-24">
        <Container>
          <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {brands.map((b, idx) => {
              const partner = getPartnerByName(b.partnerName);
              return (
                <li
                  key={b.slug}
                  data-reveal
                  style={
                    { "--reveal-delay": `${idx * 60}ms` } as React.CSSProperties
                  }
                >
                  <Link
                    href={`/brands/${b.slug}`}
                    className="group flex h-full flex-col rounded-2xl border border-[var(--color-line)] bg-white p-7 shadow-sm transition-shadow hover:shadow-md"
                  >
                    <div className="flex h-12 items-center">
                      {partner?.logo ? (
                        <Image
                          src={partner.logo}
                          alt={`${b.name} logo`}
                          width={partner.logoWidth}
                          height={partner.logoHeight}
                          className="h-8 w-auto max-w-[170px] object-contain object-left"
                        />
                      ) : (
                        <span className="font-[family-name:var(--font-poppins)] text-xl font-bold text-[var(--color-navy)]">
                          {b.name}
                        </span>
                      )}
                    </div>
                    <p className="mt-4 font-[family-name:var(--font-poppins)] text-lg font-semibold text-[var(--color-navy)]">
                      {b.tagline}
                    </p>
                    <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-[var(--color-accent-text)]">
                      {b.distributorTier}
                    </p>
                    <p className="mt-auto pt-5 text-sm font-semibold text-[var(--color-navy)]">
                      {t("cardCta")} &rarr;
                    </p>
                  </Link>
                </li>
              );
            })}
          </ul>
        </Container>
      </section>

      <ClientWall variant="sand" />

      <InlineRFQ />
      <JsonLd id="ld-brands-breadcrumb" data={breadcrumb} />
    </>
  );
}
