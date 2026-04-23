import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import { Link } from "@/i18n/routing";
import { routing } from "@/i18n/routing";
import { Container } from "@/components/Container";
import { InlineRFQ } from "@/components/InlineRFQ";
import { JsonLd } from "@/components/JsonLd";
import { getPost, posts } from "@/lib/posts";
import { contact, site } from "@/lib/site";

type Params = Promise<{ locale: string; slug: string }>;

export async function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    posts.map((p) => ({ locale, slug: p.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  const url = `${site.url}/insights/${post.slug}`;
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/insights/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      url,
      publishedTime: post.date,
      authors: [site.name],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
  };
}

/**
 * Tiny markdown -> HTML for the limited subset we use in posts.ts.
 * Supported: ## headings, **bold**, > blockquote, paragraphs.
 * Good enough until Sanity Week 2 — keeps zero new dependencies.
 */
function renderBody(md: string): string {
  const escapeHtml = (s: string) =>
    s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  const blocks = md.trim().split(/\n{2,}/);
  return blocks
    .map((raw) => {
      const block = raw.trim();
      if (block.startsWith("## ")) {
        const text = escapeHtml(block.slice(3));
        return `<h2>${formatInline(text)}</h2>`;
      }
      if (block.startsWith("> ")) {
        const text = escapeHtml(block.slice(2));
        return `<blockquote>${formatInline(text)}</blockquote>`;
      }
      // List? lines starting with "- "
      if (block.split("\n").every((l) => l.trim().startsWith("- "))) {
        const items = block
          .split("\n")
          .map((l) => `<li>${formatInline(escapeHtml(l.trim().slice(2)))}</li>`)
          .join("");
        return `<ul>${items}</ul>`;
      }
      return `<p>${formatInline(escapeHtml(block.replace(/\n/g, " ")))}</p>`;
    })
    .join("");
}

function formatInline(s: string): string {
  return s.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
}

export default async function PostPage({ params }: { params: Params }) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Insights");

  const post = getPost(slug);
  if (!post) notFound();

  const html = renderBody(post.body);

  const formatter = new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: { "@type": "Organization", name: site.name },
    publisher: {
      "@type": "Organization",
      name: site.name,
      url: site.url,
    },
    mainEntityOfPage: `${site.url}/insights/${post.slug}`,
  };

  return (
    <>
      <article>
        {/* Article hero */}
        <section className="bg-[var(--color-navy)] text-white">
          <Container className="py-20 sm:py-28">
            <Link
              href="/insights"
              className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-accent)] hover:underline"
            >
              &larr; {t("backToInsights")}
            </Link>
            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-accent)]">
              {post.category} &middot;{" "}
              <time dateTime={post.date}>
                {formatter.format(new Date(post.date))}
              </time>
            </p>
            <h1 className="mt-3 max-w-3xl font-[family-name:var(--font-poppins)] text-3xl font-bold leading-[1.1] sm:text-4xl md:text-5xl">
              {post.title}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">
              {post.excerpt}
            </p>
          </Container>
        </section>

        {/* Article body */}
        <section className="bg-white py-16 sm:py-20">
          <Container>
            <div
              className="prose-daron max-w-3xl"
              dangerouslySetInnerHTML={{ __html: html }}
            />

            {post.tags && post.tags.length > 0 && (
              <div className="mt-10 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-[var(--color-sand)] px-3 py-1 text-xs font-medium text-[var(--color-mute)]"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            <div className="mt-12 flex flex-wrap gap-4 border-t border-[var(--color-line)] pt-8 text-sm">
              <Link
                href="/insights"
                className="font-semibold text-[var(--color-navy)] underline-offset-4 hover:underline"
              >
                &larr; {t("allInsights")}
              </Link>
              <span className="text-[var(--color-mute)]">&middot;</span>
              <a
                href={contact.whatsapp.href}
                className="font-semibold text-[var(--color-accent)] underline-offset-4 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t("talkCta")} &rarr;
              </a>
            </div>
          </Container>
        </section>
      </article>

      <InlineRFQ />
      <JsonLd id={`ld-article-${post.slug}`} data={articleJsonLd} />
    </>
  );
}
