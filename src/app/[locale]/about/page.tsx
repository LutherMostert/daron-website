import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { Link } from "@/i18n/routing";
import { Container } from "@/components/Container";
import { InlineRFQ } from "@/components/InlineRFQ";
import { PageHero } from "@/components/PageHero";
import { certifications, contact, site } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Meta" });
  return {
    title: t("aboutTitle"),
    description: t("aboutDescription"),
    alternates: { canonical: "/about" },
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("About");

  const values = [t("value1"), t("value2"), t("value3"), t("value4")];

  return (
    <>
      <PageHero
        eyebrow={t("heroEyebrow")}
        title={t("heroTitle")}
        intro={t("heroIntro", { founded: site.founded })}
        image={{ src: "/images/site/harbour-port.jpg" }}
      />

      {/* Daron Group credibility band */}
      <section className="bg-[var(--color-navy)] py-14 text-white">
        <Container className="grid gap-8 text-center sm:grid-cols-3">
          <GroupStat value={t("stat1Value")} label={t("stat1Label")} />
          <GroupStat value={t("stat2Value")} label={t("stat2Label")} />
          <GroupStat value={t("stat3Value")} label={t("stat3Label")} />
        </Container>
      </section>

      {/* Story */}
      <section className="bg-white py-20 sm:py-24">
        <Container className="grid gap-10 md:grid-cols-[1fr_2fr] md:items-start">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-accent)]">
              {t("storyEyebrow")}
            </p>
            <h2 className="mt-3 font-[family-name:var(--font-poppins)] text-2xl font-bold leading-tight text-[var(--color-navy)] sm:text-3xl">
              {t("storyHeading")}
            </h2>
          </div>
          <div className="space-y-5 text-base leading-relaxed text-[var(--color-mute)]">
            <p>{t("storyP1", { founded: site.founded })}</p>
            <p>{t("storyP2")}</p>
          </div>
        </Container>
      </section>

      {/* Mission / Vision */}
      <section className="bg-[var(--color-sand)] py-20 sm:py-24">
        <Container className="grid gap-6 md:grid-cols-2">
          <article className="rounded-2xl bg-white p-8 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-accent)]">
              {t("missionEyebrow")}
            </p>
            <h2 className="mt-3 font-[family-name:var(--font-poppins)] text-xl font-semibold text-[var(--color-navy)]">
              {t("missionHeading")}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[var(--color-mute)]">
              {t("missionBody")}
            </p>
          </article>
          <article className="rounded-2xl bg-white p-8 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-accent)]">
              {t("visionEyebrow")}
            </p>
            <h2 className="mt-3 font-[family-name:var(--font-poppins)] text-xl font-semibold text-[var(--color-navy)]">
              {t("visionHeading")}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[var(--color-mute)]">
              {t("visionBody")}
            </p>
          </article>
        </Container>
      </section>

      {/* Values */}
      <section className="bg-white py-20 sm:py-24">
        <Container>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-accent)]">
            {t("valuesEyebrow")}
          </p>
          <h2 className="mt-3 font-[family-name:var(--font-poppins)] text-2xl font-bold leading-tight text-[var(--color-navy)] sm:text-3xl">
            {t("valuesHeading")}
          </h2>
          <ul className="mt-10 grid gap-5 md:grid-cols-2">
            {values.map((v, idx) => (
              <li
                key={idx}
                className="flex gap-4 rounded-2xl border border-[var(--color-line)] p-6"
              >
                <span
                  aria-hidden="true"
                  className="font-[family-name:var(--font-poppins)] text-2xl font-bold text-[var(--color-accent)]"
                >
                  0{idx + 1}
                </span>
                <p className="text-base leading-relaxed text-[var(--color-ink)]">
                  {v}
                </p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Innovation — Meet Don */}
      <section className="bg-[var(--color-sand)] py-20 sm:py-24">
        <Container>
          <div className="grid gap-12 md:grid-cols-[1fr_1.6fr] md:items-start">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-accent-deep)]">
                {t("innovEyebrow")}
              </p>
              <h2 className="mt-3 font-[family-name:var(--font-poppins)] text-2xl font-bold leading-tight text-[var(--color-navy)] sm:text-3xl md:text-4xl">
                {t("innovHeading")}
              </h2>
            </div>
            <div className="space-y-5 text-base leading-relaxed text-[var(--color-mute)]">
              <p>{t.rich("innovP1", { strong: (chunks) => <strong>{chunks}</strong> })}</p>
              <p>{t("innovP2")}</p>
              <p className="text-sm text-[var(--color-mute)]">
                <span className="font-semibold text-[var(--color-navy)]">
                  {t("innovPowered")}
                </span>{" "}
                {t("innovPoweredVal")}
                <br />
                <span className="font-semibold text-[var(--color-navy)]">
                  {t("innovAvailable")}
                </span>{" "}
                {t("innovAvailableVal", { phone: contact.whatsapp.display })}
              </p>
              <Link
                href="/ai"
                className="inline-flex items-center font-semibold text-[var(--color-navy)] underline-offset-4 hover:underline"
              >
                {t("innovCta")}
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Certifications */}
      <section className="bg-[var(--color-navy)] py-16 text-white">
        <Container>
          <div className="grid gap-8 md:grid-cols-[1fr_2fr] md:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-accent)]">
                {t("certEyebrow")}
              </p>
              <h2 className="mt-3 font-[family-name:var(--font-poppins)] text-2xl font-bold leading-tight sm:text-3xl">
                {t("certHeading")}
              </h2>
            </div>
            <ul className="grid gap-3 sm:grid-cols-2">
              {certifications.map((cert) => (
                <li
                  key={cert}
                  className="rounded-xl border border-white/15 bg-white/5 px-5 py-4 text-sm font-medium"
                >
                  {cert}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <InlineRFQ />
    </>
  );
}

function GroupStat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p className="font-[family-name:var(--font-poppins)] text-5xl font-bold text-[var(--color-accent)] sm:text-6xl">
        {value}
      </p>
      <p className="mt-3 text-sm leading-relaxed text-white/80">{label}</p>
    </div>
  );
}
