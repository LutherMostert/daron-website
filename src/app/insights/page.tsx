import Link from "next/link";
import type { Metadata } from "next";

import { Container } from "@/components/Container";
import { InlineRFQ } from "@/components/InlineRFQ";
import { PageHero } from "@/components/PageHero";
import { getPostsSorted } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Articles and updates from Daron Namibia: case studies, market commentary, and the operating reality of marine, oil & gas, and logistics in southern Africa.",
  alternates: { canonical: "/insights" },
};

const formatter = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

export default function InsightsPage() {
  const posts = getPostsSorted();

  return (
    <>
      <PageHero
        eyebrow="Insights"
        title="From Africa’s supply chain frontline"
        intro="Articles and updates designed to keep you informed — operating reality, market shifts, and the partnerships behind the work."
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
                  aria-label={`Read: ${post.title}`}
                >
                  Read article &rarr;
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
