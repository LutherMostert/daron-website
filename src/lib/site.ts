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
    // Don, the AI quoting agent — front door for RFQs.
    e164: "+264811413840",
    display: "+264 81 141 3840",
    href: "https://wa.me/264811413840",
    label: "Chat with Don on WhatsApp",
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

export const partners = [
  {
    name: "Orlichem",
    note: "Exclusive distributor — specialised marine chemicals",
    logo: "/images/partners/orlichem.png",
    logoWidth: 5500,
    logoHeight: 1872,
  },
  {
    name: "Hempel",
    note: "Exclusive distributor — marine coatings",
    logo: "/images/partners/hempel.png",
    logoWidth: 1467,
    logoHeight: 574,
  },
] as const;
