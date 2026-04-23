import Image from "next/image";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { Link } from "@/i18n/routing";
import { Container } from "@/components/Container";
import { InlineRFQ } from "@/components/InlineRFQ";
import { PageHero } from "@/components/PageHero";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Meta" });
  return {
    title: t("industriesTitle"),
    description: t("industriesDescription"),
    alternates: { canonical: "/industries" },
  };
}

type Industry = {
  name: string;
  promise: string;
  body: string;
  image: string;
  imageAlt: string;
  imageWidth: number;
  imageHeight: number;
  href?: string;
  cta?: string;
};

export default async function IndustriesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Industries");

  const industries: Industry[] = [
    {
      name: t("marineName"),
      promise: t("marinePromise"),
      body: t("marineBody"),
      image: "/images/site/man-loading-ship.jpg",
      imageAlt: t("marineAlt"),
      imageWidth: 1396,
      imageHeight: 933,
    },
    {
      name: t("oilGasName"),
      promise: t("oilGasPromise"),
      body: t("oilGasBody"),
      image: "/images/site/offshore-catering.jpg",
      imageAlt: t("oilGasAlt"),
      imageWidth: 2560,
      imageHeight: 1128,
      href: "/industries/oil-and-gas",
      cta: t("oilGasCta"),
    },
    {
      name: t("hospName"),
      promise: t("hospPromise"),
      body: t("hospBody"),
      image: "/images/site/food-supply-worker.jpg",
      imageAlt: t("hospAlt"),
      imageWidth: 2050,
      imageHeight: 904,
    },
    {
      name: t("miningName"),
      promise: t("miningPromise"),
      body: t("miningBody"),
      image: "/images/site/mining.jpeg",
      imageAlt: t("miningAlt"),
      imageWidth: 2560,
      imageHeight: 1474,
    },
  ];

  return (
    <>
      <PageHero
        eyebrow={t("heroEyebrow")}
        title={t("heroTitle")}
        intro={t("heroIntro")}
        image={{ src: "/images/site/containers-row.png" }}
      />

      <section className="bg-white py-20 sm:py-24">
        <Container>
          <ul className="grid gap-8 md:grid-cols-2">
            {industries.map((ind) => (
              <li
                key={ind.name}
                className="group flex flex-col overflow-hidden rounded-2xl border border-[var(--color-line)] bg-white shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-[var(--color-sand)]">
                  <Image
                    src={ind.image}
                    alt={ind.imageAlt}
                    width={ind.imageWidth}
                    height={ind.imageHeight}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[var(--color-navy)]/70 to-transparent"
                  />
                </div>
                <div className="flex flex-1 flex-col p-7">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-accent-deep)]">
                    {ind.name}
                  </p>
                  <h2 className="mt-3 font-[family-name:var(--font-poppins)] text-xl font-bold leading-snug text-[var(--color-navy)] sm:text-2xl">
                    {ind.promise}
                  </h2>
                  <p className="mt-3 text-base leading-relaxed text-[var(--color-mute)]">
                    {ind.body}
                  </p>
                  {ind.href && ind.cta && (
                    <Link
                      href={ind.href}
                      className="mt-5 inline-flex items-center font-semibold text-[var(--color-navy)] underline-offset-4 hover:underline"
                    >
                      {ind.cta} &rarr;
                    </Link>
                  )}
                </div>
              </li>
            ))}
          </ul>
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
