import type { Metadata, Viewport } from "next";
import { Poppins, Open_Sans } from "next/font/google";
import "./globals.css";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { ChatWidget } from "@/components/ChatWidget";
import { contact, site } from "@/lib/site";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  weight: ["400", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Marine, oil & gas, logistics — Walvis Bay`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.name} | Marine, oil & gas, logistics — Walvis Bay`,
    description: site.description,
    locale: site.locale,
    url: site.url,
  },
  twitter: {
    card: "summary_large_image",
    title: site.name,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  // NOTE: deliberately no maximumScale or userScalable — current site fails WCAG
  // by blocking pinch-zoom; we must not inherit that. (CLAUDE.md audit fix #6)
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  legalName: site.legalName,
  url: site.url,
  foundingDate: String(site.founded),
  description: site.description,
  email: contact.emails.operations,
  telephone: contact.phone.e164,
  sameAs: [contact.socials.linkedin, contact.socials.facebook],
  address: {
    "@type": "PostalAddress",
    streetAddress: `${contact.address.line1}, ${contact.address.line2}`,
    addressLocality: contact.address.city,
    addressRegion: contact.address.region,
    addressCountry: "NA",
  },
};

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: site.name,
  image: `${site.url}/og.png`,
  url: site.url,
  telephone: contact.phone.e164,
  email: contact.emails.operations,
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    streetAddress: `${contact.address.line1}, ${contact.address.line2}`,
    addressLocality: contact.address.city,
    addressRegion: contact.address.region,
    addressCountry: "NA",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: -22.957,
    longitude: 14.508,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
      ],
      opens: "08:00",
      closes: "17:00",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-NA"
      className={`${poppins.variable} ${openSans.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-white text-[var(--color-ink)]">
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <JsonLd id="ld-organization" data={orgJsonLd} />
        <JsonLd id="ld-localbusiness" data={localBusinessJsonLd} />
        <ChatWidget />
      </body>
    </html>
  );
}
