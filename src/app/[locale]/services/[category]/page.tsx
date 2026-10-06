import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";

import { Container } from "@/components/Container";
import { InlineRFQ } from "@/components/InlineRFQ";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { QuoteLink } from "@/components/QuoteLink";
import { categoryMeta, categorySlugs, getCategory, isCategorySlug } from "@/lib/category-pages";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { Link, routing } from "@/i18n/routing";

type Params = Promise<{ locale: string; category: string }>;

export const dynamicParams = false;

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => categorySlugs.map((category) => ({ locale, category })));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale, category } = await params;
  if (!isCategorySlug(category)) return {};
  const c = getCategory(category, locale);
  return buildMetadata({
    locale,
    path: `/services/${category}`,
    title: c.metaTitle,
    titleAbsolute: true,
    description: c.metaDescription,
  });
}

const heading = "font-[family-name:var(--font-poppins)] text-2xl font-bold leading-tight text-[var(--color-navy)] sm:text-3xl";

export default async function CategoryPage({ params }: { params: Params }) {
  const { locale, category } = await params;
  if (!isCategorySlug(category)) notFound();
  setRequestLocale(locale);
  const c = getCategory(category, locale);
  const meta = categoryMeta[category];
  const loc = (["en", "pt", "fr"] as const).find((l) => l === locale) ?? "en";
  const pageUrl = `${site.url}/services/${category}`;

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.url },
      { "@type": "ListItem", position: 2, name: "Services", item: `${site.url}/services` },
      { "@type": "ListItem", position: 3, name: c.title, item: pageUrl },
    ],
  };

  const serviceLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: c.title,
    serviceType: c.serviceType,
    url: pageUrl,
    description: c.intro,
    provider: {
      "@type": "Organization",
      "@id": `${site.url}/#organization`,
      name: site.name,
      alternateName: [...site.alternateNames],
      url: site.url,
    },
    areaServed: [
      { "@type": "City", name: "Walvis Bay" },
      { "@type": "City", name: "Lüderitz" },
      { "@type": "Country", name: "Namibia" },
    ],
    ...(c.brand ? { brand: { "@type": "Brand", name: c.brand.name, url: c.brand.url } } : {}),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: c.supplyHeading,
      itemListElement: c.supply.map((s) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: s.title, description: s.body },
      })),
    },
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: c.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <PageHero
        eyebrow={c.eyebrow}
        title={c.title}
        intro={c.intro}
        image={{ src: meta.image, alt: meta.imageAlt[loc] }}
      >
        <QuoteLink className="premium-button" context={c.title}>
          {c.rfqHeading} →
        </QuoteLink>
      </PageHero>

      <section className="bg-white py-20 sm:py-24">
        <Container>
          <h2 className={heading}>{c.supplyHeading}</h2>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {c.supply.map((item) => (
              <li key={item.title} className="rounded-2xl border border-[var(--color-line)] bg-[var(--color-sand)] p-6">
                <h3 className="font-[family-name:var(--font-poppins)] text-lg font-semibold text-[var(--color-navy)]">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--color-ink)]">{item.body}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="bg-[var(--color-sand)] py-20 sm:py-24">
        <Container className="grid gap-12 md:grid-cols-2">
          <div>
            <h2 className={heading}>{c.whyHeading}</h2>
            <ul className="mt-8 space-y-4">
              {c.why.map((w) => (
                <li key={w} className="rounded-2xl border border-[var(--color-line)] bg-white p-5 text-base leading-relaxed text-[var(--color-ink)]">
                  {w}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className={heading}>{c.sectorsHeading}</h2>
            <ul className="mt-8 flex flex-wrap gap-3">
              {c.sectors.map((s) => (
                <li key={s} className="rounded-full border border-[var(--color-line)] bg-white px-4 py-2 text-sm font-medium text-[var(--color-navy)]">
                  {s}
                </li>
              ))}
            </ul>
            <h2 className={`${heading} mt-12`}>{c.relatedHeading}</h2>
            <ul className="mt-6 space-y-3">
              {c.related.map((r) => (
                <li key={r.href}>
                  <Link href={r.href} className="inline-flex min-h-11 items-center font-semibold text-[var(--color-accent-text)] underline underline-offset-4">
                    {r.label} →
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <section className="bg-white py-20 sm:py-24">
        <Container className="max-w-3xl">
          <h2 className={heading}>{c.faqHeading}</h2>
          <div className="mt-8 divide-y divide-[var(--color-line)] border-y border-[var(--color-line)]">
            {c.faqs.map((f) => (
              <details key={f.q} className="group py-5">
                <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 font-semibold text-[var(--color-navy)]">
                  <h3 className="text-base">{f.q}</h3>
                  <span aria-hidden="true" className="text-[var(--color-accent-text)] transition group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-base leading-relaxed text-[var(--color-ink)]">{f.a}</p>
              </details>
            ))}
          </div>
        </Container>
      </section>

      <InlineRFQ variant="navy" heading={c.rfqHeading} body={c.rfqBody} />

      <JsonLd id={`ld-${category}-breadcrumb`} data={breadcrumb} />
      <JsonLd id={`ld-${category}-service`} data={serviceLd} />
      <JsonLd id={`ld-${category}-faq`} data={faqLd} />
    </>
  );
}
