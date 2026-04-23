import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { Link } from "@/i18n/routing";
import { Container } from "@/components/Container";
import { InlineRFQ } from "@/components/InlineRFQ";
import { PageHero } from "@/components/PageHero";
import { contact } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Meta" });
  return {
    title: t("oilGasTitle"),
    description: t("oilGasDescription"),
    alternates: { canonical: "/industries/oil-and-gas" },
  };
}

export default async function OilAndGasPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("OilGas");

  const supported = [
    {
      name: "Deepsea Mira",
      note: t("rig1Note"),
    },
    {
      name: "Deepsea Bollsta",
      note: t("rig2Note"),
    },
    {
      name: "Deepsea Hercules",
      note: t("rig3Note"),
    },
    {
      name: "Transocean Marianas",
      note: t("rig4Note"),
    },
  ];

  const whatWeDo = [
    {
      title: t("supply1Title"),
      body: t("supply1Body"),
    },
    {
      title: t("supply2Title"),
      body: t("supply2Body"),
    },
    {
      title: t("supply3Title"),
      body: t("supply3Body"),
    },
    {
      title: t("supply4Title"),
      body: t("supply4Body"),
    },
  ];

  return (
    <>
      <PageHero
        eyebrow={t("heroEyebrow")}
        title={t("heroTitle")}
        intro={t("heroIntro")}
        image={{ src: "/images/site/offshore-catering.jpg" }}
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <a
            href={contact.whatsapp.href}
            className="rounded-full bg-[var(--color-accent)] px-6 py-3 text-center text-base font-semibold text-[var(--color-navy)] transition-colors hover:bg-[var(--color-accent-deep)]"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t("sendRfq")} &rarr;
          </a>
          <Link
            href="/contact"
            className="rounded-full border border-white/30 px-6 py-3 text-center text-base font-semibold text-white transition-colors hover:bg-white/10"
          >
            {t("talkToTeam")}
          </Link>
        </div>
      </PageHero>

      {/* Rigs supported */}
      <section className="bg-white py-20 sm:py-24">
        <Container>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-accent-deep)]">
            {t("rigsEyebrow")}
          </p>
          <h2 className="mt-3 max-w-3xl font-[family-name:var(--font-poppins)] text-2xl font-bold leading-tight text-[var(--color-navy)] sm:text-3xl md:text-4xl">
            {t("rigsHeading")}
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-[var(--color-mute)] sm:text-lg">
            {t("rigsBody")}
          </p>
          <ul className="mt-10 grid gap-5 sm:grid-cols-2">
            {supported.map((rig) => (
              <li
                key={rig.name}
                className="rounded-2xl border border-[var(--color-line)] bg-[var(--color-sand)] p-6"
              >
                <p className="font-[family-name:var(--font-poppins)] text-xl font-bold text-[var(--color-navy)]">
                  {rig.name}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-[var(--color-mute)]">
                  {rig.note}
                </p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Authority pull-quote */}
      <section className="bg-[var(--color-navy)] py-16 text-white sm:py-20">
        <Container>
          <blockquote className="mx-auto max-w-4xl text-center font-[family-name:var(--font-poppins)] text-2xl font-bold leading-tight sm:text-3xl md:text-4xl">
            &ldquo;{t("quote")}&rdquo;
          </blockquote>
          <p className="mt-6 text-center text-sm uppercase tracking-[0.2em] text-[var(--color-accent)]">
            {t("quoteAttribution")}
          </p>
        </Container>
      </section>

      {/* What we supply offshore */}
      <section className="bg-white py-20 sm:py-24">
        <Container>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-accent-deep)]">
            {t("supplyEyebrow")}
          </p>
          <h2 className="mt-3 max-w-3xl font-[family-name:var(--font-poppins)] text-2xl font-bold leading-tight text-[var(--color-navy)] sm:text-3xl md:text-4xl">
            {t("supplyHeading")}
          </h2>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {whatWeDo.map((item) => (
              <article
                key={item.title}
                className="rounded-2xl border border-[var(--color-line)] bg-white p-7 shadow-sm"
              >
                <h3 className="font-[family-name:var(--font-poppins)] text-xl font-bold text-[var(--color-navy)]">
                  {item.title}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-[var(--color-mute)]">
                  {item.body}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* Why this matters */}
      <section className="bg-[var(--color-sand)] py-20 sm:py-24">
        <Container>
          <div className="grid gap-10 md:grid-cols-[1fr_1.6fr] md:items-start">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-accent-deep)]">
                {t("whyEyebrow")}
              </p>
              <h2 className="mt-3 font-[family-name:var(--font-poppins)] text-2xl font-bold leading-tight text-[var(--color-navy)] sm:text-3xl md:text-4xl">
                {t("whyHeading")}
              </h2>
            </div>
            <div className="space-y-5 text-base leading-relaxed text-[var(--color-mute)]">
              <p>
                <strong className="text-[var(--color-navy)]">{t("whyScale")}</strong>{" "}
                {t("whyScaleBody")}
              </p>
              <p>
                <strong className="text-[var(--color-navy)]">{t("whyPressure")}</strong>{" "}
                {t("whyPressureBody")}
              </p>
              <p>
                <strong className="text-[var(--color-navy)]">{t("whyTrack")}</strong>{" "}
                {t("whyTrackBody")}
              </p>
            </div>
          </div>
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
