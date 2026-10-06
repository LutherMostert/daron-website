import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { Container } from "@/components/Container";
import { PageHero } from "@/components/PageHero";
import { InlineRFQ } from "@/components/InlineRFQ";
import { JsonLd } from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo";
import { Link } from "@/i18n/routing";
import { contact, site } from "@/lib/site";
import { getCategory } from "@/lib/category-pages";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ShipChandlery" });
  return buildMetadata({
    locale,
    path: "/services/ship-chandlery",
    title: `${t("heroTitle")} — Marine Supplies & Provisions`,
    description: t("metaDescription"),
  });
}

export default async function ShipChandleryPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("ShipChandlery");
  const tS = await getTranslations("Services");

  const provide = [
    tS("p1Provide1"),
    tS("p1Provide2"),
    tS("p1Provide3"),
    tS("p1Provide4"),
  ];
  const why = [tS("p1Why1"), tS("p1Why2"), tS("p1Why3")];
  const delivery = [1, 2, 3, 4].map((n) => ({
    title: t(`delivery${n}Title`),
    body: t(`delivery${n}Body`),
  }));
  const chandleryFaqs = [1, 2, 3, 4, 5, 6, 7].map((n) => ({
    q: t(`faq${n}Q`),
    a: t(`faq${n}A`),
  }));

  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${contact.address.line1}, ${contact.address.line2}, ${contact.address.city}, ${contact.address.country}`,
  )}`;

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.url },
      { "@type": "ListItem", position: 2, name: "Services", item: `${site.url}/services` },
      {
        "@type": "ListItem",
        position: 3,
        name: "Ship Chandlery in Walvis Bay",
        item: `${site.url}/services/ship-chandlery`,
      },
    ],
  };

  const serviceLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Ship Chandlery — Walvis Bay",
    serviceType: "Ship chandler",
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
    description: t("heroIntro"),
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: chandleryFaqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <PageHero
        eyebrow={t("heroEyebrow")}
        title={t("heroTitle")}
        intro={t("heroIntro")}
        image={{ src: "/images/site/man-loading-ship.jpg" }}
      />

      <section className="bg-white py-20 sm:py-24">
        <Container className="grid gap-12 md:grid-cols-[1.5fr_1fr] md:items-start">
          <div data-reveal>
            <h2 className="font-[family-name:var(--font-poppins)] text-2xl font-bold leading-tight text-[var(--color-navy)] sm:text-3xl">
              {t("provideHeading")}
            </h2>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {provide.map((item) => (
                <li key={item} className="flex gap-3">
                  <span
                    aria-hidden="true"
                    className="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[var(--color-accent)]"
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-[var(--color-navy)]"
                      aria-hidden="true"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  <span className="text-base leading-relaxed text-[var(--color-ink)]">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
            <ul className="mt-8 space-y-1">
              {(["vessel-provisions", "industrial-cleaning-chemicals", "marine-paint"] as const).map((slug) => (
                <li key={slug}>
                  <Link href={`/services/${slug}`} className="inline-flex min-h-11 items-center font-semibold text-[var(--color-accent-text)] underline underline-offset-4">{getCategory(slug, locale).title} &rarr;</Link>
                </li>
              ))}
              <li>
                <Link href="/brands/katradis" className="inline-flex min-h-11 items-center font-semibold text-[var(--color-accent-text)] underline underline-offset-4">{t("katradisLink")} &rarr;</Link>
              </li>
            </ul>
          </div>

          <aside
            data-reveal
            className="rounded-2xl border border-[var(--color-line)] bg-[var(--color-sand)] p-7"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-accent-text)]">
              {t("areaHeading")}
            </p>
            <address className="mt-4 space-y-3 text-sm not-italic leading-relaxed text-[var(--color-ink)]">
              <p>
                {contact.address.line1}
                <br />
                {contact.address.line2}
                <br />
                {contact.address.city}, {contact.address.region}, {contact.address.country}
              </p>
              <p>
                <a
                  href={contact.phone.href}
                  className="font-semibold text-[var(--color-navy)] hover:text-[var(--color-accent-text)]"
                >
                  {contact.phone.display}
                </a>
              </p>
              <p>Mon–Fri 08:00–17:00 CAT · Offshore RFQs handled 24/7 on WhatsApp</p>
            </address>
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center font-semibold text-[var(--color-navy)] underline-offset-4 hover:underline"
            >
              {t("mapCta")} &rarr;
            </a>
          </aside>
        </Container>
      </section>

      <section className="bg-[var(--color-sand)] py-20 sm:py-24">
        <Container className="max-w-3xl">
          <h2 className="font-[family-name:var(--font-poppins)] text-2xl font-bold leading-tight text-[var(--color-navy)] sm:text-3xl">
            {t("whyHeading")}
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-[var(--color-mute)]">
            {t("areaBody")}
          </p>
          <ul className="mt-8 grid gap-4 sm:grid-cols-3">
            {why.map((item) => (
              <li
                key={item}
                className="rounded-2xl border border-[var(--color-line)] bg-white p-6 text-sm font-medium leading-relaxed text-[var(--color-navy)]"
              >
                {item}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="bg-white py-20 sm:py-24">
        <Container>
          <h2 className="font-[family-name:var(--font-poppins)] text-2xl font-bold leading-tight text-[var(--color-navy)] sm:text-3xl">
            {t("deliveryHeading")}
          </h2>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {delivery.map((item) => (
              <li
                key={item.title}
                className="rounded-2xl border border-[var(--color-line)] bg-[var(--color-sand)] p-6"
              >
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
        <Container className="max-w-3xl">
          <h2 className="font-[family-name:var(--font-poppins)] text-2xl font-bold leading-tight text-[var(--color-navy)] sm:text-3xl">
            {t("heritageHeading")}
          </h2>
          <p className="mt-6 text-base leading-relaxed text-[var(--color-ink)]">
            {t("heritageBody")}
          </p>
        </Container>
      </section>

      <section className="bg-white py-20 sm:py-24">
        <Container className="max-w-3xl">
          <h2 className="font-[family-name:var(--font-poppins)] text-2xl font-bold leading-tight text-[var(--color-navy)] sm:text-3xl">
            {t("faqHeading")}
          </h2>
          <div className="mt-8 divide-y divide-[var(--color-line)] border-y border-[var(--color-line)]">
            {chandleryFaqs.map((f) => (
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

      <InlineRFQ variant="navy" />

      <JsonLd id="ld-chandlery-breadcrumb" data={breadcrumb} />
      <JsonLd id="ld-chandlery-service" data={serviceLd} />
      <JsonLd id="ld-chandlery-faq" data={faqLd} />
    </>
  );
}
