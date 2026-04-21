import Link from "next/link";
import { Container } from "@/components/Container";
import { contact } from "@/lib/site";

export default function NotFound() {
  return (
    <section className="bg-[var(--color-navy)] text-white">
      <Container className="flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-accent)]">
          404 &middot; Not found
        </p>
        <h1 className="mt-4 max-w-2xl font-[family-name:var(--font-poppins)] text-3xl font-bold leading-tight sm:text-5xl">
          That page has slipped its mooring.
        </h1>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
          Try the homepage, or send your question to Daron AI assistant on WhatsApp &mdash;
          we&apos;ll route it to the right team.
        </p>
        <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row">
          <Link
            href="/"
            className="rounded-full bg-white px-7 py-3 text-base font-semibold text-[var(--color-navy)] transition-colors hover:bg-white/90"
          >
            Back to home
          </Link>
          <a
            href={contact.whatsapp.href}
            className="rounded-full bg-[var(--color-accent)] px-7 py-3 text-base font-semibold text-white transition-colors hover:bg-[var(--color-accent-deep)]"
            target="_blank"
            rel="noopener noreferrer"
          >
            Chat with Daron AI assistant &rarr;
          </a>
        </div>
      </Container>
    </section>
  );
}
