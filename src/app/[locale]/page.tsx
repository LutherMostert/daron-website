import Image from "next/image";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { Container } from "@/components/Container";
import { InlineRFQ } from "@/components/InlineRFQ";
import { Link } from "@/i18n/routing";
import { contact, site } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Meta" });
  return {
    title: t("homeTitle"),
    description: t("homeDescription"),
    alternates: { canonical: "/" },
  };
}

const serviceLinks = [
  { key: "svc1" as const, href: "/services#chandlery" },
  { key: "svc2" as const, href: "/services#catering" },
  { key: "svc3" as const, href: "/services#warehousing" },
  { key: "svc4" as const, href: "/services#safety" },
  { key: "svc5" as const, href: "/services/dry-dock" },
];

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Home");

  const asideBullets = [
    t("asideBullet1"),
    t("asideBullet2"),
    t("asideBullet3"),
    t("asideBullet4"),
    t("asideBullet5"),
    t("asideBullet6"),
  ];

  const valueProps = [
    { title: t("vp1Title"), body: t("vp1Body") },
    { title: t("vp2Title"), body: t("vp2Body") },
    { title: t("vp3Title"), body: t("vp3Body") },
    { title: t("vp4Title"), body: t("vp4Body") },
    { title: t("vp5Title"), body: t("vp5Body") },
  ];

  const proofBullets = [
    t("proofAsideBullet1"),
    t("proofAsideBullet2"),
    t("proofAsideBullet3"),
    t("proofAsideBullet4"),
  ];

  const operations = [
    {
      src: "/images/site/operations/container-lift-subsea7.jpg",
      alt: t("ops1Alt"),
      caption: t("ops1Caption"),
    },
    {
      src: "/images/site/operations/seven-borealis-dock.jpg",
      alt: t("ops2Alt"),
      caption: t("ops2Caption"),
    },
    {
      src: "/images/site/operations/daron-truck-normand-energy.jpg",
      alt: t("ops3Alt"),
      caption: t("ops3Caption"),
    },
    {
      src: "/images/site/operations/daron-ranger-quayside.jpg",
      alt: t("ops4Alt"),
      caption: t("ops4Caption"),
    },
    {
      src: "/images/site/operations/daron-truck-cruise-ship.jpg",
      alt: t("ops5Alt"),
      caption: t("ops5Caption"),
    },
    {
      src: "/images/site/operations/truck-fleet-night.jpg",
      alt: t("ops6Alt"),
      caption: t("ops6Caption"),
    },
  ];

  return (
    <>
      {/* HERO — Skeleton Coast road (desert meets Atlantic) */}
      <section className="relative isolate overflow-hidden bg-[var(--color-navy)] text-white">
        <Image
          src="/images/site/skeleton-coast.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
          aria-hidden="true"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-[var(--color-navy)]/90 via-[var(--color-navy)]/70 to-[var(--color-navy)]/40"
        />
        <Container className="relative grid gap-12 py-20 sm:py-28 md:grid-cols-[1.4fr_1fr] md:items-center">
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-accent)]">
              {t("heroEyebrow", { founded: site.founded })}
            </p>
            <h1 className="font-[family-name:var(--font-poppins)] text-3xl font-bold leading-[1.05] sm:text-5xl md:text-6xl">
              {t("heroHeading")}
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
              {t("heroIntro")}
            </p>

            <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
              <a
                href={contact.whatsapp.href}
                className="rounded-full bg-[var(--color-accent)] px-8 py-3 text-center text-base font-semibold text-white transition-colors hover:bg-[var(--color-accent-deep)]"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t("heroQuoteCta")} &rarr;
              </a>
              <Link
                href="/contact"
                className="rounded-full border border-white/30 px-8 py-3 text-center text-base font-semibold text-white transition-colors hover:bg-white/10"
              >
                {t("heroCta")}
              </Link>
            </div>

            <p className="mt-5 text-xs text-white/55">
              {t("heroCallLine", { phone: contact.phone.display })}
            </p>
          </div>

          <aside className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">
            <p className="font-[family-name:var(--font-poppins)] text-sm font-semibold uppercase tracking-wider text-[var(--color-accent)]">
              {t("asideTitle")}
            </p>
            <ul className="mt-6 space-y-3.5 text-sm leading-snug">
              {asideBullets.map((item) => (
                <li key={item} className="flex gap-3">
                  <span
                    aria-hidden="true"
                    className="mt-1 inline-block h-2 w-2 flex-shrink-0 rounded-full bg-[var(--color-accent)]"
                  />
                  <span className="text-white/85">{item}</span>
                </li>
              ))}
            </ul>
          </aside>
        </Container>
      </section>

      {/* From Walvis Bay to the World */}
      <section className="relative isolate overflow-hidden bg-[#e8f7f2] py-20 sm:py-24">
        <Image
          src="/images/site/topographic-lines.png"
          alt=""
          aria-hidden="true"
          width={1667}
          height={1609}
          className="pointer-events-none absolute -right-24 top-0 h-full w-auto opacity-30"
        />
        <Container className="relative">
          <div className="grid items-center gap-10 md:grid-cols-[1.2fr_1fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-accent-deep)]">
                {t("storyEyebrow")}
              </p>
              <h2 className="mt-3 font-[family-name:var(--font-poppins)] text-2xl font-bold leading-tight text-[var(--color-navy)] sm:text-3xl md:text-4xl">
                {t("storyHeading")}
              </h2>
              <div className="mt-8 inline-block max-w-lg rounded-xl bg-[#f5b63c] p-6 text-[var(--color-navy)] shadow-sm">
                <p className="text-base leading-relaxed">
                  {t("storyBox", { founded: site.founded })}
                </p>
              </div>
              <div className="mt-5 max-w-xl space-y-4 text-base leading-relaxed text-[var(--color-navy)]/85">
                <p>{t("storyBody")}</p>
                <Link
                  href="/about"
                  className="inline-flex items-center font-semibold text-[var(--color-navy)] underline-offset-4 hover:underline"
                >
                  {t("storyLink")} &rarr;
                </Link>
              </div>
            </div>
            <div className="relative mx-auto w-full max-w-sm">
              <Image
                src="/images/site/container-lifted.png"
                alt={t("containerAlt")}
                width={924}
                height={1603}
                className="h-auto w-full"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Value props */}
      <section className="bg-[var(--color-sand)] py-20 sm:py-24">
        <Container>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-accent)]">
            {t("vpEyebrow")}
          </p>
          <h2 className="mt-3 max-w-3xl font-[family-name:var(--font-poppins)] text-2xl font-bold leading-tight text-[var(--color-navy)] sm:text-3xl md:text-4xl">
            {t("vpHeading")}
          </h2>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {valueProps.map((vp, idx) => (
              <article
                key={idx}
                className="rounded-2xl border border-[var(--color-line)] bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <p className="font-[family-name:var(--font-poppins)] text-xs font-semibold tracking-wider text-[var(--color-accent)]">
                  0{idx + 1}
                </p>
                <h3 className="mt-2 font-[family-name:var(--font-poppins)] text-lg font-semibold text-[var(--color-navy)]">
                  {vp.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--color-mute)]">
                  {vp.body}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* Proven at Scale */}
      <section className="bg-white py-20 sm:py-24">
        <Container>
          <div className="grid gap-12 md:grid-cols-[1.2fr_1fr] md:items-start">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-accent-deep)]">
                {t("proofEyebrow")}
              </p>
              <h2 className="mt-3 font-[family-name:var(--font-poppins)] text-3xl font-bold leading-[1.1] text-[var(--color-navy)] sm:text-4xl md:text-5xl">
                {t("proofHeading")}
              </h2>
              <div className="mt-6 max-w-xl space-y-4 text-base leading-relaxed text-[var(--color-mute)]">
                <p>{t("proofBody1")}</p>
                <p>
                  {t("proofBody2")}
                </p>
                <p className="font-[family-name:var(--font-poppins)] text-xl font-bold text-[var(--color-navy)] sm:text-2xl">
                  {t("proofPunchline")}
                </p>
              </div>
              <Link
                href="/industries/oil-and-gas"
                className="mt-8 inline-flex items-center rounded-full bg-[var(--color-navy)] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-navy-soft)]"
              >
                {t("proofCta")} &rarr;
              </Link>
            </div>
            <aside className="rounded-3xl bg-[var(--color-navy)] p-8 text-white shadow-lg">
              <p className="font-[family-name:var(--font-poppins)] text-xs font-semibold uppercase tracking-wider text-[var(--color-accent)]">
                {t("proofAsideTitle")}
              </p>
              <ul className="mt-6 space-y-5">
                {proofBullets.map((item) => (
                  <li key={item} className="flex gap-4">
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
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </span>
                    <span className="text-base leading-relaxed text-white/90">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </Container>
      </section>

      {/* Operations in action — visual proof band */}
      <section className="bg-[var(--color-sand)] py-20 sm:py-24">
        <Container>
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-accent-deep)]">
              {t("opsEyebrow")}
            </p>
            <h2 className="mt-3 font-[family-name:var(--font-poppins)] text-2xl font-bold leading-tight text-[var(--color-navy)] sm:text-3xl md:text-4xl">
              {t("opsHeading")}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[var(--color-mute)]">
              {t("opsIntro")}
            </p>
          </div>
          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {operations.map((op) => (
              <li
                key={op.src}
                className="group overflow-hidden rounded-2xl bg-white shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-[var(--color-navy)]">
                  <Image
                    src={op.src}
                    alt={op.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <p className="p-5 text-sm font-medium leading-snug text-[var(--color-navy)]">
                  {op.caption}
                </p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Meet Don — AI operations copilot */}
      <section className="bg-[var(--color-navy)] py-20 text-white sm:py-24">
        <Container>
          <div className="grid items-center gap-10 md:grid-cols-[1.3fr_1fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-accent)]">
                {t("innovEyebrow")}
              </p>
              <h2 className="mt-3 font-[family-name:var(--font-poppins)] text-2xl font-bold leading-tight sm:text-3xl md:text-4xl">
                {t("innovHeading")}
              </h2>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg">
                {t("innovBody")}
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/ai"
                  className="rounded-full bg-[var(--color-accent)] px-6 py-3 text-center text-base font-semibold text-[var(--color-navy)] transition-colors hover:bg-[var(--color-accent-deep)]"
                >
                  {t("innovHowCta")} &rarr;
                </Link>
                <a
                  href={contact.whatsapp.href}
                  className="rounded-full border border-white/30 px-6 py-3 text-center text-base font-semibold text-white transition-colors hover:bg-white/10"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t("innovChatCta")}
                </a>
              </div>
            </div>
            <aside className="rounded-3xl border border-white/10 bg-white/5 p-7 backdrop-blur">
              <p className="font-[family-name:var(--font-poppins)] text-xs font-semibold uppercase tracking-wider text-[var(--color-accent)]">
                {t("innovAsideTitle")}
              </p>
              <ul className="mt-4 space-y-3 text-sm">
                <li className="flex justify-between gap-4">
                  <span className="text-white/60">{t("innovAiEngine")}</span>
                  <span className="text-right font-medium">{t("innovAiEngineVal")}</span>
                </li>
                <li className="flex justify-between gap-4">
                  <span className="text-white/60">{t("innovPlatform")}</span>
                  <span className="text-right font-medium">{t("innovPlatformVal")}</span>
                </li>
                <li className="flex justify-between gap-4">
                  <span className="text-white/60">{t("innovCatalog")}</span>
                  <span className="text-right font-medium">{t("innovCatalogVal")}</span>
                </li>
                <li className="flex justify-between gap-4">
                  <span className="text-white/60">{t("innovChannel")}</span>
                  <span className="text-right font-medium">{t("innovChannelVal")}</span>
                </li>
              </ul>
            </aside>
          </div>
        </Container>
      </section>

      {/* Services teaser */}
      <section className="bg-white py-20 sm:py-24">
        <Container>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-accent)]">
                {t("svcEyebrow")}
              </p>
              <h2 className="mt-3 max-w-2xl font-[family-name:var(--font-poppins)] text-2xl font-bold leading-tight text-[var(--color-navy)] sm:text-3xl md:text-4xl">
                {t("svcHeading")}
              </h2>
            </div>
            <Link
              href="/services"
              className="inline-flex items-center font-semibold text-[var(--color-navy)] underline-offset-4 hover:underline"
            >
              {t("svcAllLink")} &rarr;
            </Link>
          </div>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {serviceLinks.map((s) => (
              <li
                key={s.key}
                className="rounded-2xl bg-[var(--color-sand)] p-6 transition-colors hover:bg-[var(--color-accent)] hover:text-white"
              >
                <Link href={s.href} className="block">
                  <p className="font-[family-name:var(--font-poppins)] text-lg font-semibold">
                    {t(s.key)}
                  </p>
                  <p className="mt-2 text-sm opacity-80">{t("svcLearnMore")} &rarr;</p>
                </Link>
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
