import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { Container } from "@/components/Container";
import { PageHero } from "@/components/PageHero";
import { contact, site } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Meta" });
  return {
    title: t("privacyTitle"),
    description: t("privacyDescription"),
    alternates: { canonical: "/privacy" },
    robots: { index: true, follow: true },
  };
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Privacy");

  const lastUpdated = new Date("2026-04-23").toLocaleDateString(
    locale === "pt" ? "pt-PT" : locale === "fr" ? "fr-FR" : "en-GB",
    { year: "numeric", month: "long", day: "numeric" },
  );

  return (
    <>
      <PageHero
        eyebrow={t("heroEyebrow")}
        title={t("heroTitle")}
        intro={t("heroIntro")}
      />

      <section className="bg-white py-16 sm:py-20">
        <Container>
          <div className="mx-auto max-w-3xl space-y-10 text-[var(--color-ink)]">
            <p className="text-sm text-[var(--color-mute)]">
              {t("lastUpdated", { date: lastUpdated })}
            </p>

            <div className="space-y-3">
              <h2 className="font-[family-name:var(--font-poppins)] text-2xl font-bold">
                {t("sec1Heading")}
              </h2>
              <p className="leading-relaxed">{t("sec1Body")}</p>
            </div>

            <div className="space-y-3">
              <h2 className="font-[family-name:var(--font-poppins)] text-2xl font-bold">
                {t("sec2Heading")}
              </h2>
              <p className="leading-relaxed">{t("sec2Body")}</p>
              <ul className="list-disc space-y-2 pl-6 leading-relaxed">
                <li>{t("sec2Item1")}</li>
                <li>{t("sec2Item2")}</li>
                <li>{t("sec2Item3")}</li>
                <li>{t("sec2Item4")}</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h2 className="font-[family-name:var(--font-poppins)] text-2xl font-bold">
                {t("sec3Heading")}
              </h2>
              <p className="leading-relaxed">{t("sec3Body")}</p>
              <ul className="list-disc space-y-2 pl-6 leading-relaxed">
                <li>{t("sec3Item1")}</li>
                <li>{t("sec3Item2")}</li>
                <li>{t("sec3Item3")}</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h2 className="font-[family-name:var(--font-poppins)] text-2xl font-bold">
                {t("sec4Heading")}
              </h2>
              <p className="leading-relaxed">{t("sec4Body")}</p>
            </div>

            <div className="space-y-3">
              <h2 className="font-[family-name:var(--font-poppins)] text-2xl font-bold">
                {t("sec5Heading")}
              </h2>
              <p className="leading-relaxed">{t("sec5Body")}</p>
              <ul className="list-disc space-y-2 pl-6 leading-relaxed">
                <li>{t("sec5Item1")}</li>
                <li>{t("sec5Item2")}</li>
                <li>{t("sec5Item3")}</li>
                <li>{t("sec5Item4")}</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h2 className="font-[family-name:var(--font-poppins)] text-2xl font-bold">
                {t("sec6Heading")}
              </h2>
              <p className="leading-relaxed">
                {t("sec6Body")}{" "}
                <a
                  href={`mailto:${contact.emails.operations}`}
                  className="font-semibold text-[var(--color-accent)] hover:underline"
                >
                  {contact.emails.operations}
                </a>
                .
              </p>
              <p className="leading-relaxed">
                {t("sec6Postal", {
                  address: `${contact.address.line1}, ${contact.address.line2}, ${contact.address.city}, ${contact.address.country}`,
                })}
              </p>
            </div>

            <div className="rounded-lg border border-[var(--color-line)] bg-[var(--color-sand)] p-6">
              <p className="text-sm leading-relaxed">
                {t("siteNote", { siteName: site.name, url: site.url })}
              </p>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
