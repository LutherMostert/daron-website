import Link from "next/link";
import type { Metadata } from "next";

import { Container } from "@/components/Container";
import { InlineRFQ } from "@/components/InlineRFQ";
import { PageHero } from "@/components/PageHero";
import { contact } from "@/lib/site";

export const metadata: Metadata = {
  title: "Meet Don — Daron's AI operations copilot",
  description:
    "Daron Namibia is the first ship chandler in Walvis Bay to deploy a dedicated AI operations copilot. Don reads RFQs, generates quotes, and keeps our team connected 24/7 — powered by Anthropic Claude and integrated with our full product catalog.",
  alternates: { canonical: "/ai" },
};

// Source: OpenClaw build session summary, 2026-04-22. Dual branding rule:
// "Don" = friendly/personal name, "Daron AI assistant" = formal product label.
// Header/footer CTAs stay "Daron AI assistant"; in-page body uses "Don".

const capabilities = [
  {
    title: "Reads any RFQ format",
    body: "Excel (.xlsx, .xls), PDF, and Word (.docx). Don extracts product, quantity, and unit from structured documents and text.",
  },
  {
    title: "Matches against our full catalog",
    body: "Provisions, bonded stores, cabin supplies, butchery, technical items — fuzzy matching across descriptions, live from Supabase.",
  },
  {
    title: "Applies client-specific pricing",
    body: "Tier-based pricing with live FX conversion (NAD → USD / EUR / ZAR). No guessing, no invented SKUs — only verified catalog data.",
  },
  {
    title: "Flags uncertain matches",
    body: "Rather than guess, Don surfaces ambiguous items so a human reviewer can confirm or correct before the quote goes out.",
  },
  {
    title: "Generates Daron-branded quotes",
    body: "Ready-to-send Excel output matching our existing client templates — direct client delivery once a human signs off.",
  },
  {
    title: "Speaks the team's language",
    body: "Recognizes 51 Daron Namibia team members by name and role, and client templates by email domain (MCTC, HMS Hamburg, D2S, Oceanic, Bourbon).",
  },
];

const techStack = [
  { capability: "Natural-language AI", tech: "Anthropic Claude Opus 4.7" },
  { capability: "Agent platform", tech: "OpenClaw 2026.4" },
  { capability: "Product catalog & pricing", tech: "Supabase" },
  { capability: "Document parsing", tech: "pandas · pdfplumber · markitdown" },
  { capability: "Output generation", tech: "openpyxl (Daron-branded Excel)" },
  { capability: "Voice transcription", tech: "OpenAI Whisper" },
  { capability: "Client channel", tech: "WhatsApp Business" },
];

export default function AiPage() {
  return (
    <>
      <PageHero
        eyebrow="Innovation"
        title="Meet Don — Daron's AI operations copilot"
        intro="Daron Namibia is the first ship chandler in Walvis Bay to deploy a dedicated AI operations copilot. Don handles RFQs, generates quotes, and keeps our team connected 24/7 — powered by Anthropic's Claude, integrated with our product catalog, and available on WhatsApp."
        image={{ src: "/images/site/drydock/african-network-map.jpg" }}
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <a
            href={contact.whatsapp.href}
            className="rounded-full bg-[var(--color-accent)] px-6 py-3 text-center text-base font-semibold text-[var(--color-navy)] transition-colors hover:bg-[var(--color-accent-deep)]"
            target="_blank"
            rel="noopener noreferrer"
          >
            Chat with Daron AI assistant &rarr;
          </a>
          <Link
            href="#how-it-works"
            className="rounded-full border border-white/30 px-6 py-3 text-center text-base font-semibold text-white transition-colors hover:bg-white/10"
          >
            How it works
          </Link>
        </div>
      </PageHero>

      {/* Built on enterprise-grade AI */}
      <section id="how-it-works" className="bg-white py-20 sm:py-24">
        <Container>
          <div className="grid gap-12 md:grid-cols-[1fr_2fr] md:items-start">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-accent-deep)]">
                Built on enterprise-grade AI
              </p>
              <h2 className="mt-3 font-[family-name:var(--font-poppins)] text-2xl font-bold leading-tight text-[var(--color-navy)] sm:text-3xl md:text-4xl">
                An always-on AI colleague — not a chatbot.
              </h2>
            </div>
            <div className="space-y-5 text-base leading-relaxed text-[var(--color-mute)]">
              <p>
                Don is powered by <strong>Anthropic&rsquo;s Claude Opus
                4.7</strong>, one of the most capable language models
                available. He runs on the <strong>OpenClaw</strong> agent
                platform and integrates directly with our product catalog,
                pricing engine, and client database inside Supabase.
              </p>
              <p>
                When an RFQ lands — whether that&rsquo;s an email from a key
                account, an Excel spreadsheet from a vessel in port, or a
                voice note on WhatsApp — Don reads it, matches every line
                against our live catalog, applies the right client pricing
                tier, and drafts a ready-to-send quote inside minutes.
              </p>
              <p>
                A Daron specialist reviews and approves every quote before it
                leaves our system. Don accelerates response time; he does not
                replace the trust, judgment, and accountability our clients
                rely on.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* What Don does — 6 capability cards */}
      <section className="bg-[var(--color-sand)] py-20 sm:py-24">
        <Container>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-accent-deep)]">
            What Don does
          </p>
          <h2 className="mt-3 max-w-3xl font-[family-name:var(--font-poppins)] text-2xl font-bold leading-tight text-[var(--color-navy)] sm:text-3xl md:text-4xl">
            RFQ to ready-to-send quote, in minutes
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
                Human-in-the-loop, always
              </p>
              <h2 className="mt-3 font-[family-name:var(--font-poppins)] text-2xl font-bold leading-tight sm:text-3xl md:text-4xl">
                Fast doesn&rsquo;t mean unchecked
              </h2>
            </div>
            <ul className="space-y-5">
              {[
                {
                  title: "Never sends without approval",
                  body: "No quote leaves Daron&rsquo;s system without a specialist review and sign-off.",
                },
                {
                  title: "Flags uncertainty",
                  body: "Ambiguous matches are surfaced, not guessed at. The human makes the call.",
                },
                {
                  title: "Only uses verified data",
                  body: "No invented SKUs, no invented prices — only what&rsquo;s in our live catalog and pricing engine.",
                },
              ].map((item) => (
                <li
                  key={item.title}
                  className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur"
                >
                  <p className="font-[family-name:var(--font-poppins)] text-base font-semibold text-[var(--color-accent)]">
                    {item.title}
                  </p>
                  <p
                    className="mt-2 text-sm leading-relaxed text-white/85"
                    dangerouslySetInnerHTML={{ __html: item.body }}
                  />
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
            Technology stack
          </p>
          <h2 className="mt-3 max-w-3xl font-[family-name:var(--font-poppins)] text-2xl font-bold leading-tight text-[var(--color-navy)] sm:text-3xl md:text-4xl">
            What&rsquo;s under the hood
          </h2>
          <div className="mt-10 overflow-hidden rounded-2xl border border-[var(--color-line)]">
            <table className="w-full border-collapse text-sm">
              <thead className="bg-[var(--color-navy)] text-white">
                <tr>
                  <th className="p-4 text-left font-[family-name:var(--font-poppins)] text-xs font-semibold uppercase tracking-wider">
                    Capability
                  </th>
                  <th className="p-4 text-left font-[family-name:var(--font-poppins)] text-xs font-semibold uppercase tracking-wider">
                    Technology
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
            Running on the <strong>Claude Max</strong> enterprise subscription
            — no per-token costs, highest reasoning capability available.
          </p>
        </Container>
      </section>

      <InlineRFQ
        heading="Send Don your next RFQ."
        body="Drop a spreadsheet, a PDF, or a voice note on WhatsApp. Don reads it, matches every line against our catalog, and drafts a quote inside minutes — a Daron specialist reviews every quote before it ships."
      />
    </>
  );
}
