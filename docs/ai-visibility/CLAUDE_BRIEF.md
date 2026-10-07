# CLAUDE_BRIEF: AI-visibility content and fixes for www.daron.com.na

**To:** Claude (developer, working in `LutherMostert/daron-website`)
**From:** Luther Mostert · **Date:** 6 Oct 2026
**Goal:** make Daron Namibia the clearest, best-corroborated answer for "ship chandler Walvis Bay" and related buyer questions in AI assistants and search, ahead of Namibia Ship Chandlers (NSC).
**Inputs in this folder:** `01`–`05` page copy, `06` About/footer copy, `07` JSON-LD, `08` llms.txt. Background: `../daron-ai-visibility-audit.md`.

> **The live site moved on during the day.** A deploy at about 20:45 CAT on 6 Oct added `@id`s, `alternateName`, the "Formerly Walvis Bay Ship Chandlers" block and the anchorage card on `/services/ship-chandlery`, and the WBSC Q&A on `/faq`. Before changing anything, compare each item below with `main`, and skip whatever is already done.

## Ground rules
1. Follow `CLAUDE.md` and `AGENTS.md`. This is Next.js 16: check `node_modules/next/dist/docs/` before using unfamiliar APIs. Work on a branch (e.g. `feat/ai-visibility-pages`) and share the Vercel preview URL. **Do not push to `main` without Luther's OK.** Say what any new dependency is, and why, before you install it.
2. **Nothing containing `[CONFIRM` may ship.** Add a check (e.g. `scripts/check-confirm.mjs` run in `prebuild`) that fails the build if `[CONFIRM` appears in `messages/`, `src/` or `public/llms.txt`. Where Luther answers "no", delete the sentence or Q&A. Do not soften it.
3. Visible FAQ text and FAQPage JSON-LD must come from the **same data**, so they can never drift apart.
4. **i18n:** every route is generated for en, pt and fr, and the sitemap lists all three. [CONFIRM with Luther: translate the new pages into PT and FR now, or ship them in English for all locales first.] If English only, use the `/services/coatings` pattern (a `copy` object with an `en` fallback). Do not leave missing next-intl keys.

## 1. Add the new pages (match the existing route and component patterns)
Use `src/app/[locale]/services/ship-chandlery/page.tsx` as the template: `PageHero`, `Container`, a `<details>` FAQ accordion, `InlineRFQ variant="navy"`, `JsonLd` (BreadcrumbList + Service + FAQPage), `buildMetadata({ …, titleAbsolute: true })` and `setRequestLocale`. Consider pulling out a shared `<FaqAccordion faqs>` component plus a `faqPageLd(faqs)` helper and reusing them on every page below.

| # | Route | File | Copy |
|---|---|---|---|
| 1.1 | `/services/ship-chandlery` | existing page: **rewrite in place**, keep the URL | `01-ship-chandling-walvis-bay.md` |
| 1.2 | `/services/anchorage-launch-delivery` | new `src/app/[locale]/services/anchorage-launch-delivery/page.tsx` | `02-…md` |
| 1.3 | `/services/marine-paint-namibia` | new | `03-…md` |
| 1.4 | `/services/industrial-cleaning-chemicals` | new | `04-…md` |
| 1.5 | `/ports-we-serve` | new `src/app/[locale]/ports-we-serve/page.tsx` | `05-…md` |

- Use the SEO title, meta description, H1, hero image (existing assets), breadcrumb and Service JSON-LD from each file. The Service `provider` must be `{"@id": "https://www.daron.com.na/#organization"}`.
- Add the internal links listed at the end of each file. In particular: `/brands/hempel` ↔ `/services/marine-paint-namibia`, `/brands/orlichem` ↔ `/services/industrial-cleaning-chemicals`, `/services/coatings` → both, and chandlery → anchorage → ports.

## 2. Sitemap and navigation
1. `src/app/sitemap.ts`: add the 4 new routes (priority 0.9 for anchorage and ports, 0.8 for the other two). Replace `const now = new Date()` with a real per-route `lastModified` (e.g. a `updated` date stored with each page's content), so `lastmod` stops changing on every build (audit check #32). Show "Updated <date>" on the service pages.
2. **Footer** (`Footer.tsx`, "Sitemap" column): add Ship chandlery, Anchorage delivery, Ports we serve, Marine paint and Cleaning chemicals, with new `Nav` keys in `messages/*.json`.
3. **`/services` index and home "What we deliver" cards:** link the Coatings card to `/services/marine-paint-namibia`. Add cards or links for anchorage delivery and cleaning chemicals.
4. **Header:** do not add five items. Optionally add `/ports-we-serve` if it fits at `xl`, or leave the header as it is.
5. `CLAUDE.md` "Site routes (7)" is out of date. Update it with the current route list.

## 3. Schema changes (see `07-organization-localbusiness-schema.md`)
1. In `src/app/[locale]/layout.tsx`, build one linked `@graph` (Organization `#organization` + LocalBusiness `#localbusiness`) from `site.ts` constants: `alternateName`, `postalCode` 9000 [CONFIRM], `parentOrganization` Daron Group with its URL, `employee`/`founder` Luther Mostert, `brand`, `contactPoint`, `areaServed`, extended `knowsAbout`, and `sameAs` (LinkedIn, Facebook, ShipServ now; Google Business Profile, IMPA and ISSA when confirmed). Filter out empty values.
2. `src/app/[locale]/brands/[brand]/page.tsx`: set the Service `provider` to the Organization `@id`, and add `brand: {"@type":"Brand", name, url: manufacturerUrl}`.
3. Add `Service` JSON-LD (provider `@id`, `areaServed`) to `/services/coatings`, `/services/dry-dock`, `/solutions/*` and `/industries/*` (audit check #21).
4. Validate every changed page in https://validator.schema.org and Google's Rich Results Test on the preview URL.

## 4. "Formerly WBSC" on the site (see `06-about-formerly-wbsc.md`)
1. **Footer:** add the line "Daron Namibia (Pty) Ltd, formerly Walvis Bay Ship Chandlers" (new key `Footer.formerly`), shown on every page.
2. **About:** in `About.storyP1` (en, pt and fr), **replace the live text "founded in 2012 as the Namibian presence of the Daron Group"**. It is wrong. Confirmed history (Luther, 6 Oct 2026): Walvis Bay Ship Chandlers was founded in 2012; the Daron Group invested in and joined it in 2023, and the company became Daron Namibia (rename completed at the end of 2024). Use the replacement paragraph in `06-about-formerly-wbsc.md`. Add the "Our history" section with its timeline and the "Company facts" block. Update `Meta.aboutTitle` and `aboutDescription`, and use a descriptive H1. Grep the repo (including `src/lib/don-prompt.ts`) for any other copy implying Daron Namibia was set up by the group in 2012, and fix it.
3. Make the countries figure in the About stat band match the text (8 in the stat, 7 named) once Luther confirms one number.
4. `messages/en.json` `facebookLink`: change "Walvis Bay Ship Chandlers on Facebook" to "Daron Namibia (formerly Walvis Bay Ship Chandlers) on Facebook".
5. Home `Meta.homeDescription`: add "formerly Walvis Bay Ship Chandlers".
6. **Remove "exclusive" wherever it describes Hempel.** Luther's rule: Daron is the **official Hempel distributor** for Namibia, never "exclusive". Known places on `main` (en, pt and fr): `src/lib/site.ts` partners → Hempel `note: "Exclusive distributor — marine coatings"` (→ "Official Hempel distributor — marine coatings"); `Services.p1Provide4` "Exclusive distributor for Orlichem and Hempel" (→ "Exclusive Orlichem distributor and official Hempel distributor"); `messages/*.json` line ~581 `supply3Body` "Exclusive distribution of Orlichem … and Hempel …"; `WhyDaron.r5Body` "Our exclusive distribution agreements with Orlichem … and Hempel …"; `src/lib/don-prompt.ts` "exclusive Hempel + Orlichem distributor". Then `grep -rniE "exclusiv" messages src` and check each hit that mentions Hempel. "Exclusive" stays correct for Orlichem and Hammelmann.

### 4a. Apply Luther's other confirmed answers to existing live copy
Confirmed 6 Oct 2026, so use these as firm copy everywhere, including pt and fr:
1. **Lüderitz:** vessels at Lüderitz are supplied **by road from Walvis Bay**. Lead time: **48 hours**. Add this to `Faq` "Where are you based and which ports do you serve?", `ShipChandlery.areaBody` and the schema `areaServed`.
2. **Anchorage:** deliveries are made by a **contracted launch operator** (never name the operator) and need **48 hours' notice**. Update `ShipChandlery.delivery2Body` and `faq4A` to say "by a contracted launch operator".
3. **24/7:** deliveries run **24/7, including weekends and public holidays**. Update the hours line on `/services/ship-chandlery` (currently "Mon–Fri 08:00–17:00 CAT · Offshore RFQs handled 24/7 on WhatsApp") and the `/contact` hours, so they say office hours Mon–Fri 08:00–17:00, deliveries 24/7. Keep the LocalBusiness `openingHoursSpecification` as office hours, and add 24/7 `hoursAvailable` on the contactPoint (see `07`).
4. **Bonded stores:** all lines (tobacco, spirits, beer, wine) **plus SIM cards**, and they **can be delivered to vessels at anchorage**. Reflect this in `ShipChandlery.delivery4Body` and `faq3A`, and in `Services.p1Provide3`.

## 5. Replace the 9 Orlichem PDFs that still say WBSC
All 9 Orlichem brochures (in `public/catalogues/`, listed in `partners` in `src/lib/site.ts`) print **"Walvis Bay Ship Chandlers (Pty) Ltd, 10 Gamsberg Avenue, Light Industrial, Walvis Bay · operations@wbsc.com.na"**:

1. `orlichem-marine-brochure-2024.pdf`
2. `orlichem-engineering-brochure-2024.pdf`
3. `orlichem-cip-brochure-2024.pdf`
4. `orlichem-kitchen-brochure-2024.pdf`
5. `orlichem-metal-treatment-brochure-2024.pdf`
6. `orlichem-laundry-brochure-2024.pdf`
7. `orlichem-institutional-brochure-2024.pdf`
8. `orlichem-housekeeping-brochure-2024.pdf`
9. `orlichem-hand-hygiene-brochure-2024.pdf`

- **Preferred:** swap in updated brochures from Orlichem that show Daron Namibia, No. 31 Grand Avenue, Industrial Area, Walvis Bay, +264 83 337 4710 and dnoperations@daron-group.com. Keep the file names, or update `site.ts` and the sizes if they change. [CONFIRM: has Luther received the new files?]
- **If the new files aren't ready:** prepend a one-page Daron contact cover to each PDF with a small offline script (state the tool first, e.g. `pdf-lib` as a devDependency, or system `qpdf`). Also add an `X-Robots-Tag: noindex` header for `/catalogues/orlichem-:file*` in `next.config.ts` `headers()` until the corrected files are live.

## 6. llms.txt
Add `public/llms.txt` from `08-llms-txt.md` (it returns 404 today). Check that it is served at `/llms.txt` as `text/plain` and that the middleware does not rewrite it.

## 7. Other on-site fixes from the audit (fail or partial items)
1. **Titles ≤ 60 chars and buyer wording (#12):**
   - Home: `Ship Chandler & Hempel Distributor, Walvis Bay | Daron` (54 chars).
   - The brand template `${b.name} — ${b.distributorTier}` repeats the brand name and runs to 64–87 chars. Add a `seoTitle` field to `Brand` instead, for example:
     - Hempel: `Hempel Distributor in Namibia (Walvis Bay) | Daron Namibia`
     - Orlichem: `Orlichem Cleaning Chemicals, Namibia | Daron Namibia`
     - Hammelmann: `Hammelmann Water-Jetting Pumps in Namibia | Daron`
   - Shorten the other titles over 60: chandlery 75, FAQ 79, track record 86, Honeywell 87, Industrial Scientific 83, Blackline 73, industries 68, contact 66, why-daron 63, services 62, coatings 62, and the insights articles (94 and 96).
2. **Descriptive H1s (#15):** Home `Ship chandler and marine supplier in Walvis Bay, Namibia`. Services `Ship chandling, provisions, coatings and dry-dock support in Walvis Bay`. Industries `Industries we supply from Walvis Bay`. Contact `Contact Daron Namibia in Walvis Bay`. Keep the current slogans as eyebrows or subtitles. Fix `/solutions`, where H3s appear before the first H2.
3. **FAQ depth (#29)** in `src/lib/faq.ts`: update "Where are you based and which ports do you serve?" to match `/ports-we-serve` and link to it. Add Katradis and Industrial Scientific to the brands answer. Add these Q&As, reusing the answers from the page files: anchorage delivery (contracted launch), Lüderitz (by road from Walvis Bay), the official Hempel distributor in Namibia, industrial degreasers in Namibia, 24/7 deliveries including weekends and public holidays, and bonded stores (all lines plus SIM cards, also at anchorage).
4. **Outbound brand links (#37):** set `manufacturerUrl` for Hempel (https://www.hempel.com), Hammelmann (https://www.hammelmann.com) and Orlichem [CONFIRM URL]. Note that the brand template also shows `t("manufacturerImage")` whenever `manufacturerUrl` is set. Make that caption conditional (Katradis only), so it doesn't wrongly label Daron's own hero photos.
5. **Contact page (#31):** show the postal code. Replace the Google Maps *search* URL (chandlery page) with the verified Google Business Profile link, and add it to `/contact` and the footer [CONFIRM: GBP URL]. Optionally embed a map; note that the CSP currently blocks third-party frames and images, so a plain link is simpler.
6. **Legacy domain wbsc.com.na (#8):** the root already 301s, but `/about/` and `/contact/` still serve the old WordPress site. If wbsc.com.na can be added to this Vercel project, add host-based redirects (`has: [{type:"host", value:"(www.)?wbsc.com.na"}]`): `/about*` → `/about`, `/contact*` → `/contact`, everything else → `/`. If it is hosted elsewhere, give Luther the exact rule for IT.
7. **Minor (optional):** the 404 template emits both `noindex` and `index, follow`, so keep only `noindex`. Remove the `host:` line from `robots.ts`. Make the homepage canonical and the sitemap agree on the trailing slash. Enlarge small tap targets. Preload the LCP hero image. Make http://daron.com.na reach https://www.daron.com.na in one hop (Vercel domain settings).
8. **Ops checks (no code):** in Vercel → Firewall, confirm no bot-protection or AI-bot rule challenges GPTBot, OAI-SearchBot, ClaudeBot or PerplexityBot. Confirm the site is verified in Google Search Console and Bing Webmaster Tools and the sitemap is submitted. Optionally add IndexNow (a key file in `public/` plus a post-deploy ping).

## 8. QA before asking Luther to merge
- `pnpm build` passes, the `[CONFIRM` guard passes and lint is clean.
- Each new or changed page has one H1, a title of 60 characters or fewer, a description of 155 or fewer, a self-referencing canonical, hreflang alternates, and Breadcrumb + Service + FAQPage JSON-LD that validate.
- FAQ JSON-LD text matches the visible text exactly.
- The pages appear in `/sitemap.xml` and in the footer, and `/llms.txt` returns 200.
- Lighthouse mobile: SEO 100, performance ≥ 90 on the new pages.
- Send Luther the preview URLs and a list of anything you skipped because it was already on `main`.

## Open questions for Luther (still to answer before go-live)
Answered on 6 Oct 2026 and now applied as firm copy: Lüderitz served by road with a 48-hour lead time; contracted launch operator with 48 hours' notice for anchorage; 24/7 deliveries; "official" (never "exclusive") Hempel distributor; bonded stores (all lines plus SIM cards, also at anchorage); history (WBSC 2012, Daron Group 2023). Still open:

1. Lead times for alongside (Walvis Bay) and offshore deliveries.
2. Launch hire: included, charged at cost on the quote, or not mentioned?
3. Size or weight limits for a single launch delivery (pallets, drums, rope coils).
4. Quote turnaround (e.g. the same working day).
5. Packing by department (provisions, bonded, deck, engine, cabin): yes or no?
6. Lubricant brands, and any cabin-store lines to name (linen, toiletries).
7. Hempel stock held in Walvis Bay, tinting or colour-matching, pack sizes, and lead time for non-stock items.
8. Coating inspection or specification support (NACE): who provides it (Daron, Hempel or the group)?
9. Inland delivery: which other towns and mine sites (Swakopmund, Windhoek, mines)?
10. Orlichem: SDS on request, pack sizes, and dosing or training. Also confirm the official URL (orlichem.co.za?).
11. Postal code (9000?).
12. Timeline years: Orlichem and Hammelmann exclusivity, Deepsea campaign, Sapura Berani, and the move to 31 Grand Avenue.
13. Were 10 Gamsberg Ave, 82 Hanna Mupetami Rd or Circumferential Rd ever company premises?
14. Company registration number (2012/0895 still valid?).
15. One group figure each for countries (7, 8 or 15) and staff.
16. ISO 9001 certificate number and certification body; HACCP certifier.
17. ISSA and IMPA member numbers or profile URLs (or change the "listed" wording).
18. Google Business Profile URL, exact map pin, and IMPA/ISSA URLs for `sameAs`.
19. Luther as `founder` or `employee` in the schema.
20. Publish Namibia staff count, other leaders, warehouse size and fleet numbers?
21. Is forwarding set up for operations@ and contact@wbsc.com.na?
22. PT/FR: translate now, or ship English first?
23. Updated Orlichem PDFs received, or use the cover-page fallback?

---
**Not for the developer (off-site, Luther and the office):** rename and verify the old "Walvis Bay Ship Chandlers" Google Business Profile as Daron Namibia (then Bing Places and Apple Business Connect). Ask Hempel to fix its Namibia distributor entry (82 Hanna Mupetami Road and operations@wbsc.com.na → No. 31 Grand Avenue, dnoperations@daron-group.com, plus a link to /brands/hempel). Ask Hammelmann and Orlichem to list Daron with links. Correct ShipServ (port "Strand, ZA" → Walvis Bay; add brands), MagicPort (filed under France), IMPA, Shipmarket, Namibia Trade Gateway, WebPortunities, the LinkedIn company page (website, street number 21 → 31, "formerly WBSC") and the Facebook page name. Add a link from daron-group.com to daron.com.na. Start a review programme. Make the ISSA and IMPA memberships publicly checkable.
