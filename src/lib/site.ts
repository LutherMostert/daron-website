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
  url: "https://daron-website.vercel.app",
  // Once daron.com.na DNS cuts over (Week 4), update url + canonicals.
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
    catalogues: [],
  },
  {
    name: "Hempel",
    note: "Exclusive distributor — marine coatings",
    category: "Marine chemicals & coatings",
    logo: "/images/partners/hempel.png",
    logoWidth: 1467,
    logoHeight: 574,
    catalogues: [],
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
] as const;
