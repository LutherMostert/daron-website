/**
 * Single source of truth for site-wide constants.
 * All contact details and routes referenced from CLAUDE.md
 * (verified against daron.com.na extract 2026-04-20).
 */

export const site = {
  name: "Daron Namibia",
  legalName: "Daron Trading Namibia (Pty) Ltd",
  founded: 2012,
  tagline: "Supplying Africa's seas, shores & industries with confidence",
  url: "https://daron.com.na",
  description:
    "Daron Namibia supplies Africa's seas, shores and industries with confidence. Marine chandlery, oil and gas logistics, catering, warehousing — from Walvis Bay since 2012.",
  ogImage: "/og.png",
  locale: "en_NA",
  timezone: "Africa/Windhoek",
} as const;

export const contact = {
  address: {
    line1: "No. 31 Grand Avenue",
    line2: "Industrial Area",
    city: "Walvis Bay",
    region: "Erongo Region",
    country: "Namibia",
    postalCode: "",
  },
  phone: {
    e164: "+264833374710",
    display: "+264 83 337 4710",
    href: "tel:+264833374710",
  },
  whatsapp: {
    // Daron AI assistant, the AI quoting agent — front door for RFQs.
    e164: "+264811413840",
    display: "+264 81 141 3840",
    href: "https://wa.me/264811413840",
    label: "Chat with Daron AI assistant on WhatsApp",
  },
  emails: {
    operations: "dnoperations@daron-group.com",
    technical: "namtechnical@daron-group.com",
  },
  socials: {
    linkedin: "https://linkedin.com/company/daron-namibia",
    facebook: "https://www.facebook.com/WBshipchandlers",
  },
} as const;

export const nav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/industries", label: "Industries" },
  { href: "/why-daron", label: "Why Daron" },
  { href: "/insights", label: "Insights" },
  { href: "/contact", label: "Contact" },
] as const;

export const certifications = [
  "ISO 9001:2015",
  "HACCP food safety compliance",
  "ISSA listed",
  "IMPA listed",
] as const;

/**
 * Distribution partners. `logo` is optional — when absent the card renders a
 * text-only treatment. `catalogues` lists downloadable PDFs kept in
 * /public/catalogues/. Pending Yolande: source Honeywell + Blackline logo
 * files and Orlichem/Hempel product catalogues; confirm distributor tier.
 */
export type PartnerCatalogue = {
  title: string;
  file: string;
  sizeMB: number;
};

export const partners = [
  {
    name: "Orlichem",
    note: "Exclusive distributor — specialised marine chemicals",
    category: "Marine chemicals & coatings",
    logo: "/images/partners/orlichem.png",
    logoWidth: 5500,
    logoHeight: 1872,
    // Ordered by relevance to Daron's sectors (Marine/Oil & Gas first,
    // hospitality/institutional last). 2024 brochure set (March 2024).
    catalogues: [
      {
        title: "Marine chemicals",
        file: "/catalogues/orlichem-marine-brochure-2024.pdf",
        sizeMB: 7.4,
      },
      {
        title: "Engineering",
        file: "/catalogues/orlichem-engineering-brochure-2024.pdf",
        sizeMB: 5.9,
      },
      {
        title: "Clean-in-place (CIP)",
        file: "/catalogues/orlichem-cip-brochure-2024.pdf",
        sizeMB: 5.3,
      },
      {
        title: "Kitchen",
        file: "/catalogues/orlichem-kitchen-brochure-2024.pdf",
        sizeMB: 3.4,
      },
      {
        title: "Metal treatment",
        file: "/catalogues/orlichem-metal-treatment-brochure-2024.pdf",
        sizeMB: 3.4,
      },
      {
        title: "Laundry",
        file: "/catalogues/orlichem-laundry-brochure-2024.pdf",
        sizeMB: 3.8,
      },
      {
        title: "Institutional",
        file: "/catalogues/orlichem-institutional-brochure-2024.pdf",
        sizeMB: 3.3,
      },
      {
        title: "Housekeeping",
        file: "/catalogues/orlichem-housekeeping-brochure-2024.pdf",
        sizeMB: 2.2,
      },
      {
        title: "Hand hygiene",
        file: "/catalogues/orlichem-hand-hygiene-brochure-2024.pdf",
        sizeMB: 2.4,
      },
    ] satisfies PartnerCatalogue[],
  },
  {
    name: "Hempel",
    note: "Exclusive distributor — marine coatings",
    category: "Marine chemicals & coatings",
    logo: "/images/partners/hempel.png",
    logoWidth: 1467,
    logoHeight: 574,
    catalogues: [
      {
        title: "Marine & Fleet coatings",
        file: "/catalogues/hempel-marine-and-fleet-brochure.pdf",
        sizeMB: 3.4,
      },
      {
        title: "Oil & Gas coatings",
        file: "/catalogues/hempel-oil-and-gas-brochure.pdf",
        sizeMB: 1.2,
      },
      {
        title: "Mineral & Mining coatings",
        file: "/catalogues/hempel-mineral-and-mining-brochure.pdf",
        sizeMB: 2.4,
      },
    ] satisfies PartnerCatalogue[],
  },
  {
    name: "Honeywell",
    note: "Distributor — gas detection & industrial safety instruments",
    category: "Health & safety",
    logo: null,
    logoWidth: 0,
    logoHeight: 0,
    catalogues: [
      {
        title: "Marine eGuide (2023)",
        file: "/catalogues/honeywell-marine-eguide-2023.pdf",
        sizeMB: 3.0,
      },
      {
        title: "Marine infographic (2023)",
        file: "/catalogues/honeywell-marine-infographic-2023.pdf",
        sizeMB: 1.0,
      },
      {
        title: "BW Clip single-gas detector",
        file: "/catalogues/honeywell-bw-clip-brochure.pdf",
        sizeMB: 8.8,
      },
      {
        title: "BW Solo single-gas detector",
        file: "/catalogues/honeywell-bw-solo-brochure.pdf",
        sizeMB: 0.9,
      },
      {
        title: "HABWFS fixed safety range",
        file: "/catalogues/honeywell-habwfs-product-range.pdf",
        sizeMB: 0.9,
      },
    ] satisfies PartnerCatalogue[],
  },
  {
    name: "Blackline Safety",
    note: "Distributor — connected safety & lone-worker monitoring",
    category: "Health & safety",
    logo: null,
    logoWidth: 0,
    logoHeight: 0,
    catalogues: [
      {
        title: "G7 wearable multi-gas",
        file: "/catalogues/blackline-g7-wearable-brochure.pdf",
        sizeMB: 0.9,
      },
      {
        title: "G7c datasheet",
        file: "/catalogues/blackline-g7c-datasheet.pdf",
        sizeMB: 0.7,
      },
      {
        title: "G7 EXO area monitor",
        file: "/catalogues/blackline-g7-exo-brochure.pdf",
        sizeMB: 8.6,
      },
    ] satisfies PartnerCatalogue[],
  },
  {
    name: "Hammelmann",
    note: "Exclusive distributor (Namibia) — high-pressure plunger pumps & water-jetting systems",
    category: "Industrial pumps & water jetting",
    logo: null,
    logoWidth: 0,
    logoHeight: 0,
    catalogues: [
      {
        title: "Company presentation (2023)",
        file: "/catalogues/hammelmann-company-presentation-2023.pdf",
        sizeMB: 11.1,
      },
      {
        title: "Industrial cleaning",
        file: "/catalogues/hammelmann-industrial-cleaning-brochure.pdf",
        sizeMB: 25.4,
      },
      {
        title: "Petrochemical, oil & gas",
        file: "/catalogues/hammelmann-petrochemical-oil-gas-brochure.pdf",
        sizeMB: 13.6,
      },
    ] satisfies PartnerCatalogue[],
  },
] as const;

/**
 * Per-brand landing-page content. Keyed by `slug` → `/brands/[slug]`.
 * `partnerName` links back to the `partners` array for the logo + catalogues.
 * Prose is English for launch (PT/FR via Sanity, Week 2) but each page still
 * ships locale-correct title/description/canonical/hreflang.
 */
export type Brand = {
  slug: string;
  partnerName: string;
  name: string;
  tagline: string;
  distributorTier: string;
  sectors: string[];
  intro: string[];
  ranges: { title: string; body: string }[];
  heroImage: string;
};

export const brands: Brand[] = [
  {
    slug: "hempel",
    partnerName: "Hempel",
    name: "Hempel",
    tagline: "Marine, protective, mining & oil-and-gas coatings",
    distributorTier: "Authorised Hempel distributor — Namibia",
    sectors: ["Marine & fleet", "Oil & gas", "Mineral & mining"],
    intro: [
      "Daron Namibia is an authorised distributor for Hempel, one of the world's leading suppliers of marine and protective coatings. From our base in Walvis Bay we supply Hempel systems for hull maintenance, newbuild and dry-dock projects across Namibia and the wider Southern African coast.",
      "Hempel coatings are specified by ship owners and operators worldwide for antifouling, corrosion protection and fouling control. We integrate them directly into our dry-dock and ship-chandlery scopes, so the right system, primer and topcoat are on the quay when the vessel is — backed by technical support and our 2,500+ supplier network for everything around the can.",
    ],
    ranges: [
      { title: "Marine & fleet coatings", body: "Antifouling, fouling-release, anticorrosive and tank-coating systems for vessels in service and at dry dock." },
      { title: "Oil & gas coatings", body: "High-performance protective coatings for offshore structures, rigs and topside assets operating in harsh marine environments." },
      { title: "Mineral & mining coatings", body: "Heavy-duty protective systems for mining plant, structural steel and industrial assets inland." },
    ],
    heroImage: "/images/site/drydock/case-study-hempel-bow.jpg",
  },
  {
    slug: "orlichem",
    partnerName: "Orlichem",
    name: "Orlichem",
    tagline: "Specialised marine & industrial chemicals",
    distributorTier: "Exclusive Orlichem distributor — Namibia",
    sectors: ["Marine", "Catering & galley", "Industrial & institutional"],
    intro: [
      "Daron Namibia is the exclusive distributor for Orlichem specialised marine and industrial chemicals. Orlichem's range covers the full cleaning and treatment cycle a working vessel or facility needs — from engine-room and tank chemicals to galley, laundry and hand-hygiene products.",
      "Because we hold the Orlichem line locally, we can pull the right chemical into a dry-dock scope, a deck-cleaning job or a routine resupply without waiting on import — the same chemicals our technical team used to bring the Sapura Berani back to life in 11 days.",
    ],
    ranges: [
      { title: "Marine & engineering chemicals", body: "Degreasers, descalers, fuel and water treatments, and tank-cleaning chemicals for engine room and deck." },
      { title: "Clean-in-place (CIP) & metal treatment", body: "Process-line cleaning and metal-treatment chemistry for industrial and food-grade applications." },
      { title: "Galley, kitchen & laundry", body: "Warewash, kitchen hygiene and laundry systems for catering operations on rig, vessel and shore." },
      { title: "Housekeeping & hand hygiene", body: "Institutional housekeeping, surface and hand-hygiene ranges for accommodation and facilities." },
    ],
    heroImage: "/images/site/drydock/case-study-orlichem-deck.jpg",
  },
  {
    slug: "honeywell",
    partnerName: "Honeywell",
    name: "Honeywell Gas Detection",
    tagline: "Portable & fixed gas detection and industrial safety",
    distributorTier: "Honeywell distributor — gas detection & safety instruments",
    sectors: ["Oil & gas", "Marine", "Mining & industrial"],
    intro: [
      "Daron Namibia distributes Honeywell gas detection and industrial safety instruments — the portable and fixed detection that keeps crews safe in confined spaces, on deck and across industrial sites.",
      "We supply, and arrange calibration and servicing for, Honeywell's BW range and fixed safety systems, aligned to the ISO 9001 quality controls our oil & gas, marine and mining clients audit against.",
    ],
    ranges: [
      { title: "BW Clip & BW Solo single-gas detectors", body: "Maintenance-free and serviceable single-gas monitors for confined-space entry and personal protection." },
      { title: "HABWFS fixed safety range", body: "Fixed gas detection for permanent installation on industrial and marine assets." },
      { title: "Marine gas detection", body: "Detection specified for shipboard and offshore use, with marine eGuide support." },
      { title: "Calibration & servicing", body: "On-site calibration, bump-testing and servicing via trained technicians." },
    ],
    heroImage: "/images/site/operations/seven-borealis-dock.jpg",
  },
  {
    slug: "blackline-safety",
    partnerName: "Blackline Safety",
    name: "Blackline Safety",
    tagline: "Connected safety & lone-worker monitoring",
    distributorTier: "Blackline Safety distributor — Namibia",
    sectors: ["Lone-worker monitoring", "Connected gas detection", "Oil & gas"],
    intro: [
      "Daron Namibia distributes Blackline Safety connected-safety devices — wearable gas detection and lone-worker monitoring that streams live location and gas readings back to a monitoring console.",
      "For operations where a worker may be alone, in a confined space, or far from help, Blackline's G7 range turns gas detection into a connected safety net — supplied and supported locally from Walvis Bay.",
    ],
    ranges: [
      { title: "G7 wearable multi-gas", body: "Connected wearable multi-gas detection with live alerts and two-way communication." },
      { title: "G7c cellular-connected", body: "Cellular-connected personal monitor for lone workers across dispersed sites." },
      { title: "G7 EXO area monitor", body: "Rapid-deploy connected area monitor for site-wide and perimeter gas detection." },
    ],
    heroImage: "/images/site/operations/truck-fleet-night.jpg",
  },
  {
    slug: "hammelmann",
    partnerName: "Hammelmann",
    name: "Hammelmann",
    tagline: "High-pressure plunger pumps & water-jetting systems",
    distributorTier: "Exclusive Hammelmann distributor — Namibia",
    sectors: ["Industrial cleaning", "Petrochemical, oil & gas", "Surface preparation"],
    intro: [
      "Daron Namibia is the exclusive Namibian distributor for Hammelmann high-pressure plunger pumps and water-jetting systems — German-engineered equipment for industrial cleaning, surface preparation and cutting.",
      "From tube and heat-exchanger cleaning in petrochemical plants to surface prep ahead of coating, Hammelmann systems handle the high-pressure work that keeps industrial and oil-and-gas assets in service. We supply the equipment and back it with our technical and procurement network.",
    ],
    ranges: [
      { title: "Industrial cleaning systems", body: "High-pressure water-jetting for tube bundles, heat exchangers, tanks and process equipment." },
      { title: "Petrochemical, oil & gas", body: "Plunger-pump systems specified for petrochemical and oil-and-gas maintenance and turnarounds." },
      { title: "Surface preparation & cutting", body: "Hydro-blasting and water-jet cutting for surface prep ahead of coating and for precision removal work." },
    ],
    heroImage: "/images/site/operations/container-lift-subsea7.jpg",
  },
];

export function getBrand(slug: string): Brand | undefined {
  return brands.find((b) => b.slug === slug);
}

export function getPartnerByName(name: string) {
  return partners.find((p) => p.name === name);
}

/**
 * Operators, vessels and partners Daron has supplied — all already named in
 * existing site copy / project history. Used for the "trusted by" wall.
 * (Names, not logos, to avoid trademark-usage questions; Luther to confirm he's
 * comfortable naming each publicly — most already appear on the live site.)
 */
export const clients = [
  { name: "Subsea7", note: "Offshore construction — heavy-lift support" },
  { name: "Pellegrini", note: "Offshore catering partner — Sapura Berani, Saipem Santorini" },
  { name: "Saipem", note: "Saipem Santorini project" },
  { name: "Bourbon", note: "Offshore marine services" },
  { name: "Odfjell Drilling", note: "Deepsea Mira · Bollsta · Hercules" },
  { name: "Transocean", note: "Transocean Marianas (2013)" },
  { name: "MCTC", note: "Marine catering" },
  { name: "Oceanic", note: "Offshore operations" },
] as const;

