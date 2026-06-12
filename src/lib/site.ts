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

export type Partner = {
  name: string;
  note: string;
  category: string;
  /** null → text-only card (no logo sourced yet). */
  logo: string | null;
  logoWidth: number;
  logoHeight: number;
  catalogues: PartnerCatalogue[];
};

export const partners: Partner[] = [
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
    logo: "/images/partners/honeywell.svg",
    logoWidth: 678,
    logoHeight: 120,
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
    logo: "/images/partners/blackline-safety.svg",
    logoWidth: 356,
    logoHeight: 55,
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
    // Official header logo — largest transparent raster available (don't
    // display wider than ~175px).
    logo: "/images/partners/hammelmann.png",
    logoWidth: 175,
    logoHeight: 39,
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
];

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
  /** Named product families — sourced from the manufacturer brochures/sites. */
  keyProducts?: string[];
  heroImage: string;
};

export const brands: Brand[] = [
  {
    slug: "hempel",
    partnerName: "Hempel",
    name: "Hempel",
    tagline: "Marine, protective, fire & energy coatings",
    distributorTier: "Authorised Hempel distributor — Namibia",
    sectors: ["Marine & fleet", "Oil & gas", "Energy & infrastructure", "Mineral & mining"],
    intro: [
      "Daron Namibia is an authorised distributor for Hempel — a global coatings manufacturer operating in more than 80 countries. From Walvis Bay we supply Hempel's marine and protective systems for hull maintenance, newbuild and dry-dock projects across Namibia and the wider Southern African coast.",
      "Hempel coatings are specified worldwide for antifouling, fouling control, corrosion protection and passive fire protection. We integrate them straight into our dry-dock and ship-chandlery scopes — the right primer, topcoat or antifouling on the quay when the vessel is, backed by technical support.",
    ],
    ranges: [
      { title: "Antifouling & self-polishing hull coatings", body: "SPC and silyl-acrylate antifouling systems — including the Globic, Sonic, Dynamic and Oceanic+ families — for controlled polishing, low friction and extended dry-dock intervals." },
      { title: "Fouling-release & biocide-free systems", body: "Hempaguard (ActiGuard®), Hempasil and Silic One deliver biocide-free fouling defence with an ultra-smooth surface, targeting fuel savings and lower emissions." },
      { title: "Anticorrosive & protective coatings", body: "Avantguard activated-zinc, Quattro XO pure epoxy and Galvosil inorganic zinc silicate protect steel in marine, offshore and infrastructure service." },
      { title: "Passive fire protection", body: "Hempafire and Hempacore intumescent coatings protect structural steel against cellulosic fire on offshore, commercial and industrial structures." },
      { title: "Tank, cargo & ballast linings", body: "Hempaline chemical- and abrasion-resistant linings for cargo holds, ballast tanks and process vessels in oil & gas and chemical service." },
    ],
    keyProducts: ["Hempaguard", "Globic", "Hempasil", "Silic One", "Avantguard", "Quattro XO", "Galvosil", "Hempafire", "Hempacore", "Hempaline"],
    heroImage: "/images/site/drydock/case-study-hempel-bow.jpg",
  },
  {
    slug: "orlichem",
    partnerName: "Orlichem",
    name: "Orlichem",
    tagline: "Specialised marine & industrial chemicals",
    distributorTier: "Exclusive Orlichem distributor — Namibia",
    sectors: ["Marine & shipping", "Engineering & manufacturing", "Catering & galley", "Laundry", "Food processing & CIP", "Hospitality & institutional"],
    intro: [
      "Daron Namibia is the exclusive distributor for Orlichem — a South African speciality-chemical manufacturer (established 2008, ISO 9001 and Intertek certified). We bring Orlichem's SANS- and EN 1276-certified formulations to vessels, facilities and operators across the Namibian market.",
      "Orlichem's range covers the full cleaning and treatment cycle a working vessel or facility needs — engine-room, boiler and water treatment through to galley, laundry and hand hygiene. Because we hold the line locally, the right chemical reaches a dry-dock, deck-cleaning job or routine resupply without waiting on import.",
    ],
    ranges: [
      { title: "Marine vessel chemicals", body: "Engine-room and air-system cleaning, boiler and evaporator treatment, fuel treatment, ballast- and potable-water treatment, corrosion control and oil-spill dispersant — every department aboard a commercial vessel." },
      { title: "Engineering & industrial degreasers", body: "Water- and solvent-based degreasers for manufacturing, automotive and marine — including Wipe Out (SANS 1828 food-approved), CSM, Degrasol and Eco-Solve." },
      { title: "Clean-in-place (CIP) & metal treatment", body: "Acid CIP and Alkaline CIP LF circulation cleaning, plus corrosion control, degreasing and pickling/passivation for metal treatment." },
      { title: "Galley, kitchen & laundry", body: "HACCP-compliant, EN 1276-certified kitchen degreasers, sanitisers and dishwash, plus marine laundry systems (Atom Wash, AquaTerge Ultra, Atom Soft)." },
      { title: "Housekeeping & hand hygiene", body: "Floorcare, general-purpose cleaners, odour control and EN 1276-certified hand-care ranges for accommodation, hospitality and institutional use." },
    ],
    keyProducts: ["Wipe Out", "CSM", "Degrasol", "Eco-Solve", "Acid CIP", "Alkaline CIP LF", "Atom Wash", "AquaTerge Ultra", "Aqua Kleer"],
    heroImage: "/images/site/drydock/case-study-orlichem-deck.jpg",
  },
  {
    slug: "honeywell",
    partnerName: "Honeywell",
    name: "Honeywell Gas Detection",
    tagline: "Portable, marine & fixed gas detection",
    distributorTier: "Honeywell gas-detection distributor — Namibia",
    sectors: ["Oil & gas", "Marine & offshore", "Petrochemical & refining", "Mining & industrial"],
    intro: [
      "Daron Namibia distributes Honeywell gas detection — a world leader in portable and fixed detection trusted across oil & gas, petrochemical, marine and industrial sites. We supply and support the full range from Walvis Bay, from single-gas clips to fixed transmitters.",
      "From maintenance-free single-gas detectors to multi-gas marine instruments and ATEX-certified fixed systems, Honeywell's portfolio covers every layer of protection — critical for offshore vessels, terminals, refineries and confined-space entry across Namibia and the region.",
    ],
    ranges: [
      { title: "BW Solo — next-generation single-gas detector", body: "Serviceable single-gas monitor for H₂S, CO, O₂, SO₂, H₂, NH₃ and more on the long-life 1-Series sensor (5-year life, 3-year warranty), with Bluetooth to the Safety Communicator app and IntelliDoX automated bump testing." },
      { title: "BW Clip — maintenance-free single-gas detector", body: "Disposable, always-on detector in 2- and 3-year versions for H₂S, CO, O₂ or SO₂ — no calibration, charging or sensor changes. Ideal for turnarounds and confined-space entry." },
      { title: "BW Ultra & BW Flex — multi-gas portables for marine", body: "The BW Ultra monitors five gases (O₂, LEL, CO, VOCs, H₂S) and is SOLAS-compliant for confined-space entry; the BW Flex tests four gases from 15 sensor options with up to two months' runtime." },
      { title: "BW RigRat — wireless perimeter monitor", body: "Up to six sensors from 23 gas types, IP66/68-rated, deployed in arrays to form a wireless safety perimeter around hazardous offshore and marine areas." },
      { title: "Fixed detection — Sensepoint XCD, XNX & Searchline", body: "Sensepoint XCD and XNX Universal transmitters plus Searchpoint Optima Plus and Searchline Excel open-path IR for permanent flammable, toxic and hydrocarbon detection on vessels, jetties and terminals." },
      { title: "Calibration & servicing", body: "On-site calibration, bump-testing and IntelliDoX-based fleet management via trained technicians, aligned to our ISO 9001 controls." },
    ],
    keyProducts: ["BW Solo", "BW Clip", "BW Ultra", "BW Flex", "BW RigRat", "Sensepoint XCD", "XNX Universal Transmitter", "Searchline Excel"],
    heroImage: "/images/site/operations/seven-borealis-dock.jpg",
  },
  {
    slug: "blackline-safety",
    partnerName: "Blackline Safety",
    name: "Blackline Safety",
    tagline: "Connected gas detection & lone-worker monitoring",
    distributorTier: "Blackline Safety distributor — Namibia",
    sectors: ["Lone-worker monitoring", "Connected gas detection", "Oil, gas & petrochemical", "Mining & industrial"],
    intro: [
      "Daron Namibia distributes Blackline Safety — a global leader in connected gas detection and lone-worker protection, covering 165,000+ workers across 70+ countries. We supply and support the full Blackline portfolio from Walvis Bay, bringing live cloud-connected safety to Namibian industry.",
      "Blackline combines wearable gas detectors, area monitors and the Blackline Live cloud platform to give safety teams real-time worker location and gas-exposure data, automatic fall and no-motion alerts, and optional 24/7 live monitoring — so lone workers and whole sites stay accounted for.",
    ],
    ranges: [
      { title: "G7 wearable multi-gas detector", body: "Intrinsically-safe personal monitor detecting up to five gases from 20+ cartridge options, with built-in 4G (optional satellite), live streaming to Blackline Live, and automatic fall, no-motion, SOS and missed-check-in alerts." },
      { title: "G7c cellular connected wearable", body: "Adds 4G/3G cellular with assisted-GPS speakerphone for two-way voice between worker and monitoring staff; gas, bump-test and calibration data stream automatically to Blackline Analytics. ATEX/IECEx and Class I Div 1 certified." },
      { title: "G7 EXO area monitor", body: "Direct-to-cloud area monitor detecting up to five gases via 360° diffusion or optional pump, with 4G + optional Iridium satellite and 100+ days' battery — integrates with G7 wearables and can trigger external alarms or gates." },
      { title: "Blackline Live monitoring platform", body: "Cloud portal giving real-time visibility of every worker's location, gas status and alerts; your team or Blackline's 24/7 Safety Operations Centre can mobilise responders to an exact GPS location." },
      { title: "Blackline Analytics & compliance", body: "Automatically time- and location-stamps every reading, bump test and calibration, surfacing gas-exposure trends and compliance gaps with no manual data collection." },
    ],
    keyProducts: ["G7 wearable", "G7c cellular", "G7 EXO area monitor", "Blackline Live", "Blackline Analytics"],
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
 * Official logos displayed where sourced (usage approved by Luther, 2026-06-12);
 * entries without a logo render as a text card.
 */
export type Client = {
  name: string;
  note: string;
  logo?: string;
  logoWidth?: number;
  logoHeight?: number;
};

export const clients: Client[] = [
  {
    name: "Subsea7",
    note: "Offshore construction — heavy-lift support",
    logo: "/images/clients/subsea7.svg",
    logoWidth: 253,
    logoHeight: 31,
  },
  {
    name: "Pellegrini",
    note: "Offshore catering partner — Sapura Berani, Saipem Santorini",
    logo: "/images/clients/pellegrini.png",
    logoWidth: 1181,
    logoHeight: 240,
  },
  {
    name: "Saipem",
    note: "Saipem Santorini project",
    // Stacked/portrait lockup — ClientWall gives portrait logos a taller box.
    logo: "/images/clients/saipem.svg",
    logoWidth: 932,
    logoHeight: 1213,
  },
  {
    name: "Bourbon",
    note: "Offshore marine services",
    logo: "/images/clients/bourbon.png",
    logoWidth: 235,
    logoHeight: 90,
  },
  {
    name: "Odfjell Drilling",
    note: "Deepsea Mira · Bollsta · Hercules",
    logo: "/images/clients/odfjell-drilling.svg",
    logoWidth: 874,
    logoHeight: 347,
  },
  {
    name: "Transocean",
    note: "Transocean Marianas (2013)",
    logo: "/images/clients/transocean.svg",
    logoWidth: 1024,
    logoHeight: 233,
  },
  {
    name: "MCTC",
    note: "Marine catering",
    logo: "/images/clients/mctc.png",
    logoWidth: 1500,
    logoHeight: 637,
  },
  {
    name: "Oceanic",
    note: "Offshore operations",
    logo: "/images/clients/oceanic.svg",
    logoWidth: 832,
    logoHeight: 144,
  },
];

