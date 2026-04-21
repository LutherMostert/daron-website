@AGENTS.md

# Daron Website Rebuild — Project Brief

**Owner:** Luther Mostert (MD, Daron Namibia) · **Repo:** `daron-website` · **Target domain:** daron.com.na
**Status:** Week 0 infrastructure complete — placeholder landing page live at https://daron-website.vercel.app (2026-04-21). Real content build kicks off Week 1.

## Source of truth
- `DARON-SITE-EXTRACT.md` (repo root, gitignored) — full copy/content/assets scrape from the live WordPress site, 2026-04-20. Real tagline, contact details, marketing copy, brand asset URLs all live here. **Pull from it, don't invent.**
- `AGENTS.md` — Next.js 16 has breaking changes from training-data-era Next.js; read `node_modules/next/dist/docs/` before using unfamiliar APIs.

## Stack
- Next.js 16.2.4 (App Router) · React 19.2.4 · TypeScript 5 · pnpm
- Tailwind v4 — CSS-based `@theme` config lives in `src/app/globals.css` (NOT `tailwind.config.js`)
- Week 2+: Sanity CMS · Supabase (reuse Hermes instance) · `@anthropic-ai/sdk` (Claude Sonnet 4.5 chatbot) · pgvector · M365 Graph API (Mail.Read)

## Locked decisions
- **Real content + real contact details only** — copy lifted verbatim from extract, flagged with source comment for Yolande to refine.
- **Brand starter (pending Firecracker/Lisa refinement Week 1):** deep navy `#0A2540` + white + orange accent `#F97316`; Poppins headings / Open Sans body (carry forward from current site).
- **Light mode only for launch.** Dark-mode support deferred post-cutover.
- **Viewport:** `width=device-width, initial-scale=1` — NEVER `maximum-scale=1` or `user-scalable=0` (current site's WCAG fail that must not be inherited).
- **One `<h1>` per page, semantic HTML, mobile-first.**
- Quote intake routes to Hermes Week 2; `quotes@daron-group.com` provisioned then.

## The audit fixes — must ship on every page
1. Unique `<title>` per page
2. Meta description (150–160 chars) per page
3. Open Graph tags (`og:title`, `og:description`, `og:image`, `og:url`, `og:type`)
4. Twitter Card tags (`twitter:card`, `title`, `description`, `image`)
5. Canonical URL
6. Viewport allows pinch-zoom (no `maximum-scale`)
7. Exactly one `<h1>` per page, logical heading hierarchy
8. Alt text on every image (current site fails 13/14)
9. Inline RFQ CTA reachable from every page (current site has 1 form total)
10. `tel:` / `mailto:` / `https://wa.me/` links — never plain text
11. JSON-LD `Organization` + `LocalBusiness` site-wide; `Article` on blog posts
12. `robots.txt` + generated `sitemap.xml`
13. Fast mobile (LCP < 2.5s, CLS < 0.1) via `next/image` + font optimization

## Real contact (from extract — do not change without source)
- Address: No. 31 Grand Avenue, Industrial Area, Walvis Bay, Erongo Region, Namibia
- Phone (landline): +264 83 337 4710
- WhatsApp (Don, AI quoting agent): +264 81 141 3840 — `https://wa.me/264811413840`
- Ops email: dnoperations@daron-group.com
- Technical email: namtechnical@daron-group.com
- LinkedIn: https://linkedin.com/company/daron-namibia
- Founded 2012 · GMT+2 (CAT)

## About Don (reference for Week 2 chatbot build)
- **Don** is the human-facing name for the **Hermes AI quoting agent** — one identity, multiple channels.
- Backend: Python/FastAPI at `~/projects/hermes`, Supabase (~6,600 SKUs), GPT-4o. Runs on Luther's Ubuntu/WSL.
- WhatsApp front door already live at **+264 81 141 3840** — customers message Don, Don drafts quotes in minutes, human KAM steps in on escalation (Cheslin = technical, Yolande = ops).
- **Week 0 usage:** `wa.me/264811413840` links only — do NOT build any Don↔Hermes integration. Hermes/WhatsApp wiring is already live on Luther's end.
- **Week 2+:** the floating chatbot widget on the site must share Don's identity, tone, and knowledge base — same agent, different channel. Branding consistency is the point.
- Don surfaces in Week 0 at these touch-points: Header "Chat with Don →" CTA, Footer WhatsApp link, Contact page card (equal prominence to email cards), Home hero secondary CTA, RFQ form success state ("Or chat with Don now on WhatsApp").

## Tagline
"SUPPLYING AFRICA'S SEAS, SHORES & INDUSTRIES WITH CONFIDENCE"

## Site routes (7)
- `/` · `/about` · `/services` · `/industries` · `/why-daron` · `/insights` · `/contact`
- Week 4 redirects: `/about-us` → `/about`, `/industries-we-serve` → `/industries`, `/why-choose-us` → `/why-daron`, `/coming-soon` → `/` (410 or 301).

## Pending decisions (ordered by blast radius)
- **P0 (blocks Week 0 build):** GitHub account owner (personal `lutheroldbuck` vs. `daron-group` org); Vercel account origin (fresh via `luther.mostert@daron-group.com` vs. existing); preview subdomain public or private.
- **P1 (Week 1):** Firecracker brand brief outcome; Yolande Sanity onboarding; Yolande sign-off on rewritten Why-Daron copy.
- **P2 (Week 2):** `quotes@daron-group.com` MX setup; Hermes FastAPI endpoint contract; Supabase pgvector schema.
- **P3 (Week 3):** M365 app registration + Mail.Read admin consent; embedding-model choice (`text-embedding-3-small` vs. Voyage); Zoe's moderation workflow.
- **P4 (Week 4):** Cloudflare DNS cutover window; analytics provider (leaning Plausible); privacy-policy legal review.

## Do-not-do
- Never push to `main` without Luther's explicit OK (solo repo, approval habit).
- Never install a dependency without stating what + why first.
- Never commit `.env*` or secrets.
- Never ship a page without the 13 audit fixes above.
- Never write `Lorem ipsum` placeholders — real copy from the extract, flagged `{/* source: daron.com.na extract 2026-04-20; pending Yolande refinement */}` when editable.

## Team
- Luther Mostert — MD, solo technical operator on the build
- Yolande Kuhn — GM, Sanity CMS owner
- Lisa Herbst — Firecracker agency, brand review
- Zoe — Firecracker, chatbot Q&A moderation

## Sister systems (integrate Week 2–4, do NOT rebuild)
- **Hermes** (`~/projects/hermes`, same machine) — Python/FastAPI RFQ quoting engine, Supabase, ~6600 SKUs, GPT-4o, WhatsApp KAM interface. New site's RFQ posts here.
- **Falcon** — Notion-based vessel-arrival detection + outreach drafting; scores leads HOT/WARM/COLD. Week 4: Falcon response → Hermes RFQ handoff.

## Deployment
- Vercel project: daron-website
- Vercel team: luthermostert's (Hobby plan)
- Production URL: https://daron-website.vercel.app
- Preview URL pattern: https://daron-website-git-<branch>-luthermosterts-projects.vercel.app
- Auto-deploy: main branch → production; every push triggers rebuild
- Env vars: none in Week 0 (added in Week 2 for Supabase/Anthropic)
