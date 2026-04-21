/**
 * Blog/Insights data — verbatim from daron.com.na 2026-04-20 extract.
 * Will move into Sanity CMS in Week 2; for now, hardcoded TS so /insights
 * has real, indexable content for SEO + Yolande review.
 *
 * source: DARON-SITE-EXTRACT.md (gitignored)
 */

export type Post = {
  slug: string;
  title: string;
  date: string; // ISO
  category: string;
  excerpt: string;
  /** JSX-friendly paragraphs (Markdown-style content rendered as HTML in template) */
  body: string;
  tags?: string[];
};

export const posts: Post[] = [
  {
    slug: "reviving-sapura-berani",
    title:
      "Reviving Sapura Berani: How Daron Namibia Set a New Standard in Rig Reactivation",
    date: "2025-11-20",
    category: "Namibia",
    excerpt:
      "Cold-stacked for 13 months in the Gulf of Mexico, the Sapura Berani arrived in Namibia with significant logistical hurdles. We had 11 days to bring it back to life.",
    body: `
Four years ago, Daron Namibia faced one of its most challenging and rewarding projects: the reactivation of the **Sapura Berani**. Cold-stacked in the Gulf of Mexico for 13 months, the rig arrived in Namibia with significant logistical and operational hurdles. Partnering with one of the oil and gas industry's leading caterers, **Pelligrini**, we embarked on a mission to restore the rig to full functionality in record time.

## The Challenges

The kitchen was in total disarray with broken equipment. Rooms were dirty and mold-ridden, lacking proper bedding. The laundry room had malfunctioning machines, and there were no readily available spare parts in Namibia. Mold had taken hold in the freezers. Initial pipe bursts caused flooding in crew quarters.

The deadline: **11 days**.

## The Daron Difference

**Trusted partnerships and expertise.** We combined local expertise with Pelligrini's global oil and gas know-how. When partners lacked Namibian work permits, we filled the gap. Where parts weren't available locally, we manufactured replacements on-site.

**A network of excellence.** Our trusted team of local laborers and specialists deployed immediately, working in shifts to compress timelines without sacrificing quality.

**Supply chain mastery.** Rapid importation of machinery and a partnership with **Orlichem** for specialised mold and stain chemicals meant nothing waited on procurement.

**Adaptability and collaboration.** Supplies were delivered to the rig within an hour of being requested.

## The Results

The rig was fully reactivated in **11 days**. The first three days alone covered kitchen and laundry repair, full sanitation, and meal prep for personnel on board. Pelligrini's appreciation letter that followed has become a benchmark for the kind of execution we hold ourselves to — and they have remained a preferred client ever since.

We are currently collaborating with Pelligrini again on the **Saipem Santorini** project.

> Being a supplier is not enough; we must be a full-service solutions partner.

This project was made possible by our network of **2,500+ suppliers across Africa and Europe** — the depth that lets us answer "yes" when the deadline is tight and the parts are obscure.
`,
    tags: [
      "Throwback",
      "OilAndGas",
      "SapuraBerani",
      "Namibia",
      "DaronNamibia",
      "ClientSupport",
      "Innovation",
      "Teamwork",
    ],
  },
  {
    slug: "namibia-oil-and-gas-roadmap",
    title:
      "Unveiling Namibia's Oil and Gas Potential: A Roadmap to Growth and Partnership",
    date: "2025-11-19",
    category: "Oil & Gas",
    excerpt:
      "Namibia stands at the threshold of a defining moment. A roadmap for sustainable growth, local content, and partnership with the global energy sector.",
    body: `
Namibia stands at the threshold of a defining moment. The discoveries in the Orange Basin have positioned the country as one of the most exciting offshore frontiers in the world, but discoveries alone do not build economies. **What we do next will decide whether Namibia becomes a benchmark or another resource story that never reached its potential.**

## Local Content as the Blueprint

A well-designed local content agreement is not a tax on international operators — it is the blueprint for sustainable growth. It ensures that infrastructure, jobs, and skills compound inside Namibia rather than leaving with the cargo.

The model that works is straightforward: clear participation thresholds, transparent procurement, and a credible national supply chain that international partners can plug into without friction.

## Why Namibia

- **Strategic location.** Walvis Bay is the natural gateway to southern Africa's offshore basins and the SADC interior.
- **Political stability.** A multi-decade record of peaceful transitions and a predictable rule of law.
- **Untapped offshore potential.** Multiple commercial-scale discoveries across consecutive years, with appraisal continuing.

## The Supply Chain Opportunities

- **Logistics and transport** — port handling, freight forwarding, customs, fleet.
- **Catering and accommodation** — offshore-grade nutrition, hospitality on rotation.
- **Engineering and maintenance** — local fabrication, certified technicians, rapid spares.
- **Support services** — permits, visas, crew rotations, security.

## Bridging the Skills Gap

The skills challenge is real but solvable. The right approach combines targeted training programmes with structured knowledge transfer from international partners — and a multi-year commitment to investing in people, not just equipment.

## A Call to Action

To the international investors and operators reading this: Namibia is open, organised, and ready. The companies that build long-term partnerships with Namibian suppliers now will own the operational depth that the next decade of activity will demand.
`,
    tags: ["OilAndGas", "Namibia", "OrangeBasin", "LocalContent", "Investment"],
  },
  {
    slug: "namibia-energy-and-industry-pulse",
    title: "The Namibia Energy & Industry Pulse",
    date: "2025-10-06",
    category: "Logistics",
    excerpt:
      "Mining surges, the Orange Basin keeps delivering, and the logistics map is being redrawn. Four sections on what is actually moving.",
    body: `
The numbers are staggering. Mining is on a tear, the Orange Basin keeps delivering, and the regional logistics map is being quietly redrawn. Here is what is actually moving — and where the policy decisions of the next twelve months matter most.

## 1. Mining

Uranium is up **18% year-to-date** and now accounts for **25% of Namibian exports**. **Etango-8**, **Tumas**, and **Reptile** are all advancing — collectively reinforcing Namibia's position as one of the most credible uranium suppliers in a tightening global market.

Otjikoto Gold's commissioning of a **10 MW solar plant** is the kind of practical decarbonisation move that makes balance sheets work and political relationships easier. Expect more of these.

The risk: rigid 51% ownership rules, applied bluntly, will crack investor confidence faster than they will deliver local upside. Policy certainty is the oxygen — design the rules carefully, then leave them alone.

## 2. Oil & Gas / Orange Basin

Rhino Resources' **Volans-1X** condensate-rich gas strike is the **third major discovery this year**. The Orange Basin is sustaining a roughly **60% success rate** versus an African average of about 16%.

The commercialisation challenge is real. Without midstream and gas-handling infrastructure, these discoveries remain "**paper oil**" — known, valued, but not yet flowing. The next investment cycle has to fund the offtake side, not just the upstream.

## 3. Logistics & Supply

A new Namibian consulate in **Lubumbashi** (with DRC visa-on-arrival) is the kind of quiet diplomatic move that reshapes corridor economics. Expect a real shift of copper export volumes from **Lobito to Walvis Bay** as the route stabilises.

TransNamib's refit programme is overdue and welcome. Reliable rail unlocks bulk volumes that road haulage cannot economically carry.

## 4. Policy & Investment

The **NAMPOA–COGANAM 2-year MoU** signed this quarter is the kind of structured industry-government dialogue Namibia has needed. Combined with the **National Local Content Conference in Swakopmund**, the conversations are moving in the right direction.

Policy certainty is the oxygen. What we do next will determine whether we become Africa's benchmark economy — or another resource story that never reached its potential.
`,
    tags: ["Logistics", "Mining", "OilAndGas", "Policy", "Namibia"],
  },
];

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}

export function getPostsSorted(): Post[] {
  return [...posts].sort((a, b) => (a.date < b.date ? 1 : -1));
}
