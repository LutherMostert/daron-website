import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { Container } from "@/components/Container";
import { PageHero } from "@/components/PageHero";
import { InlineRFQ } from "@/components/InlineRFQ";
import { JsonLd } from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo";
import { faqs } from "@/lib/faq";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Faq" });
  return buildMetadata({
    locale,
    path: "/faq",
    title: `${t("heroTitle")} — Ship Supply, Chandlery & Logistics`,
    description: t("heroIntro"),
  });
}

export default async function FaqPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Faq");

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
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
        image={{ src: "/images/site/operations/daron-ranger-quayside.jpg" }}
      />

      <section className="bg-white py-20 sm:py-24">
        <Container className="max-w-3xl">
          <ul className="space-y-4">
            {faqs.map((f, idx) => (
              <li key={idx} data-reveal>
                <details className="group rounded-2xl border border-[var(--color-line)] bg-white p-6 transition-shadow open:shadow-sm">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-[family-name:var(--font-poppins)] text-lg font-semibold text-[var(--color-navy)] [&::-webkit-details-marker]:hidden">
                    {f.q}
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      aria-hidden="true"
                      className="shrink-0 text-[var(--color-accent-text)] transition-transform duration-200 group-open:rotate-45"
                    >
                      <line x1="12" y1="5" x2="12" y2="19" />
                      <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                  </summary>
                  <p className="mt-4 text-base leading-relaxed text-[var(--color-mute)]">
                    {f.a}
                  </p>
                </details>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <InlineRFQ />
      <JsonLd id="ld-faq" data={faqLd} />
    </>
  );
}
