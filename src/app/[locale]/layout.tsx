import type { Metadata, Viewport } from "next";
import { Poppins, Open_Sans } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import "../globals.css";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { ChatWidget } from "@/components/ChatWidget";
import { contact, site } from "@/lib/site";
import { routing } from "@/i18n/routing";

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

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Meta" });

  return {
    metadataBase: new URL(site.url),
    title: {
      default: t("homeTitle"),
      template: `%s | ${site.name}`,
    },
    description: t("homeDescription"),
    alternates: {
      canonical: "/",
      languages: {
        en: "/",
        pt: "/pt",
        fr: "/fr",
        "x-default": "/",
      },
    },
    openGraph: {
      type: "website",
      siteName: site.name,
      title: t("homeTitle"),
      description: t("homeDescription"),
      locale: locale === "en" ? "en_NA" : locale,
      url: site.url,
      images: [
        {
          url: "/images/site/operations/normand-energy-wide.jpg",
          alt: `${site.name} — operations in Walvis Bay`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: site.name,
      description: t("homeDescription"),
      images: ["/images/site/operations/normand-energy-wide.jpg"],
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
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  // NOTE: deliberately no maximumScale or userScalable — current site fails WCAG
  // by blocking pinch-zoom; we must not inherit that. (CLAUDE.md audit fix #6)
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: site.name,
  url: site.url,
  description: site.description,
  inLanguage: ["en", "pt", "fr"],
  publisher: {
    "@type": "Organization",
    name: site.name,
    url: site.url,
  },
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
  image: `${site.url}/images/site/operations/normand-energy-wide.jpg`,
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

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <html
      lang={locale}
      className={`${poppins.variable} ${openSans.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-white text-[var(--color-ink)]">
        <NextIntlClientProvider>
          <Header />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
          <JsonLd id="ld-website" data={websiteJsonLd} />
          <JsonLd id="ld-organization" data={orgJsonLd} />
          <JsonLd id="ld-localbusiness" data={localBusinessJsonLd} />
          <ChatWidget />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
