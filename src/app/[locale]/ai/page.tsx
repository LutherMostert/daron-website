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
    title: t("aiTitle"),
    description: t("aiDescription"),
    alternates: { canonical: "/ai" },
  };
}

// Source: OpenClaw build session summary, 2026-04-22. Dual branding rule:
// "Don" = friendly/personal name, "Daron AI assistant" = formal product label.
// Header/footer CTAs stay "Daron AI assistant"; in-page body uses "Don".

export default async function AiPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("AI");

  const capabilities = [
    { title: t("cap1Title"), body: t("cap1Body") },
    { title: t("cap2Title"), body: t("cap2Body") },
    { title: t("cap3Title"), body: t("cap3Body") },
    { title: t("cap4Title"), body: t("cap4Body") },
    { title: t("cap5Title"), body: t("cap5Body") },
    { title: t("cap6Title"), body: t("cap6Body") },
  ];

  const techStack = [
    { capability: t("tech1Cap"), tech: t("tech1Tech") },
    { capability: t("tech2Cap"), tech: t("tech2Tech") },
    { capability: t("tech3Cap"), tech: t("tech3Tech") },
    { capability: t("tech4Cap"), tech: t("tech4Tech") },
    { capability: t("tech5Cap"), tech: t("tech5Tech") },
    { capability: t("tech6Cap"), tech: t("tech6Tech") },
    { capability: t("tech7Cap"), tech: t("tech7Tech") },
  ];

  const loopItems = [
    { title: t("human1Title"), body: t("human1Body") },
    { title: t("human2Title"), body: t("human2Body") },
    { title: t("human3Title"), body: t("human3Body") },
  ];

  return (
    <>
      <PageHero
        eyebrow={t("heroEyebrow")}
        title={t("heroTitle")}
        intro={t("heroIntro")}
        image={{ src: "/images/site/drydock/african-network-map.jpg" }}
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <a
            href={contact.whatsapp.href}
            className="rounded-full bg-[var(--color-accent)] px-6 py-3 text-center text-base font-semibold text-[var(--color-navy)] transition-colors hover:bg-[var(--color-accent-deep)]"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t("chatCta")} &rarr;
          </a>
          <Link
            href="#how-it-works"
            className="rounded-full border border-white/30 px-6 py-3 text-center text-base font-semibold text-white transition-colors hover:bg-white/10"
          >
            {t("howItWorks")}
          </Link>
        </div>
      </PageHero>

      {/* Built on enterprise-grade AI */}
      <section id="how-it-works" className="bg-white py-20 sm:py-24">
        <Container>
          <div className="grid gap-12 md:grid-cols-[1fr_2fr] md:items-start">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-accent-deep)]">
                {t("enterpriseEyebrow")}
              </p>
              <h2 className="mt-3 font-[family-name:var(--font-poppins)] text-2xl font-bold leading-tight text-[var(--color-navy)] sm:text-3xl md:text-4xl">
                {t("enterpriseHeading")}
              </h2>
            </div>
            <div className="space-y-5 text-base leading-relaxed text-[var(--color-mute)]">
              <p>{t.rich("enterpriseP1", { strong: (chunks) => <strong>{chunks}</strong> })}</p>
              <p>{t("enterpriseP2")}</p>
              <p>{t("enterpriseP3")}</p>
            </div>
          </div>
        </Container>
      </section>

      {/* What Don does — 6 capability cards */}
      <section className="bg-[var(--color-sand)] py-20 sm:py-24">
        <Container>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-accent-deep)]">
            {t("capEyebrow")}
          </p>
          <h2 className="mt-3 max-w-3xl font-[family-name:var(--font-poppins)] text-2xl font-bold leading-tight text-[var(--color-navy)] sm:text-3xl md:text-4xl">
            {t("capHeading")}
          </h2>
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {capabilities.map((cap, idx) => (
              <article
                key={cap.title}
                className="rounded-2xl border border-[var(--color-line)] bg-white p-6 shadow-sm"
              >
                <p className="font-[family-name:var(--font-poppins)] text-xs font-semibold tracking-wider text-[var(--color-accent-deep)]">
                  0{idx + 1}
                </p>
                <h3 className="mt-2 font-[family-name:var(--font-poppins)] text-lg font-semibold text-[var(--color-navy)]">
                  {cap.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--color-mute)]">
                  {cap.body}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* Human-in-the-loop */}
      <section className="bg-[var(--color-navy)] py-20 text-white sm:py-24">
        <Container>
          <div className="grid gap-10 md:grid-cols-[1fr_1.6fr] md:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-accent)]">
                {t("humanEyebrow")}
              </p>
              <h2 className="mt-3 font-[family-name:var(--font-poppins)] text-2xl font-bold leading-tight sm:text-3xl md:text-4xl">
                {t("humanHeading")}
              </h2>
            </div>
            <ul className="space-y-5">
              {loopItems.map((item) => (
                <li
                  key={item.title}
                  className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur"
                >
                  <p className="font-[family-name:var(--font-poppins)] text-base font-semibold text-[var(--color-accent)]">
                    {item.title}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-white/85">
                    {item.body}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* Technology stack */}
      <section className="bg-white py-20 sm:py-24">
        <Container>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-accent-deep)]">
            {t("techEyebrow")}
          </p>
          <h2 className="mt-3 max-w-3xl font-[family-name:var(--font-poppins)] text-2xl font-bold leading-tight text-[var(--color-navy)] sm:text-3xl md:text-4xl">
            {t("techHeading")}
          </h2>
          <div className="mt-10 overflow-hidden rounded-2xl border border-[var(--color-line)]">
            <table className="w-full border-collapse text-sm">
              <thead className="bg-[var(--color-navy)] text-white">
                <tr>
                  <th className="p-4 text-left font-[family-name:var(--font-poppins)] text-xs font-semibold uppercase tracking-wider">
                    {t("techColCapability")}
                  </th>
                  <th className="p-4 text-left font-[family-name:var(--font-poppins)] text-xs font-semibold uppercase tracking-wider">
                    {t("techColTechnology")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {techStack.map((row, idx) => (
                  <tr
                    key={row.capability}
                    className={
                      idx % 2 === 0
                        ? "bg-white"
                        : "bg-[var(--color-sand)]"
                    }
                  >
                    <td className="p-4 font-semibold text-[var(--color-navy)]">
                      {row.capability}
                    </td>
                    <td className="p-4 text-[var(--color-ink)]">
                      {row.tech}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-[var(--color-mute)]">
            {t.rich("techNote", { strong: (chunks) => <strong>{chunks}</strong> })}
          </p>
        </Container>
      </section>

      <InlineRFQ
        heading={t("rfqHeading")}
        body={t("rfqBody")}
      />
    </>
  );
}
