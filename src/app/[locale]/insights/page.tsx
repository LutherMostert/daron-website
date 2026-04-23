import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { Link } from "@/i18n/routing";
import { Container } from "@/components/Container";
import { InlineRFQ } from "@/components/InlineRFQ";
import { PageHero } from "@/components/PageHero";
import { getPostsSorted } from "@/lib/posts";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Meta" });
  return {
    title: t("insightsTitle"),
    description: t("insightsDescription"),
    alternates: { canonical: "/insights" },
  };
}

export default async function InsightsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Insights");

  const posts = getPostsSorted();

  const formatter = new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <>
      <PageHero
        eyebrow={t("heroEyebrow")}
        title={t("heroTitle")}
        intro={t("heroIntro")}
        image={{ src: "/images/site/offshore-catering.jpg" }}
      />

      <section className="bg-white py-20 sm:py-24">
        <Container>
          <ul className="grid gap-8 md:grid-cols-2">
            {posts.map((post) => (
              <li
                key={post.slug}
                className="group flex flex-col rounded-2xl border border-[var(--color-line)] bg-white p-7 transition-shadow hover:shadow-lg"
              >
                <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-accent)]">
                  <span>{post.category}</span>
                  <time dateTime={post.date}>
                    {formatter.format(new Date(post.date))}
                  </time>
                </div>
                <h2 className="mt-4 font-[family-name:var(--font-poppins)] text-xl font-bold leading-snug text-[var(--color-navy)] group-hover:text-[var(--color-accent)] sm:text-2xl">
                  <Link href={`/insights/${post.slug}`}>{post.title}</Link>
                </h2>
                <p className="mt-3 flex-1 text-base leading-relaxed text-[var(--color-mute)]">
                  {post.excerpt}
                </p>
                <Link
                  href={`/insights/${post.slug}`}
                  className="mt-5 inline-flex items-center font-semibold text-[var(--color-navy)] underline-offset-4 group-hover:text-[var(--color-accent)] group-hover:underline"
                  aria-label={t("readLabel", { title: post.title })}
                >
                  {t("readArticle")} &rarr;
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <InlineRFQ />
    </>
  );
}
