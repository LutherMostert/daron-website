import type { Metadata, Viewport } from "next";
import { Poppins, Open_Sans } from "next/font/google";
import "./globals.css";

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
  title: "Daron Namibia | Marine supply, oil & gas logistics",
  description:
    "Daron Namibia supplies Africa's seas, shores & industries with confidence. Marine, oil & gas logistics from Walvis Bay. Chat with Don on WhatsApp.",
  metadataBase: new URL("https://daron-website.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Daron Namibia | Marine supply, oil & gas logistics",
    description:
      "Supplying Africa's seas, shores & industries with confidence. Marine, oil & gas logistics from Walvis Bay, Namibia.",
    url: "https://daron-website.vercel.app",
    siteName: "Daron Namibia",
    locale: "en_NA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Daron Namibia",
    description:
      "Supplying Africa's seas, shores & industries with confidence.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${openSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-[family-name:var(--font-open-sans)]">
        {children}
      </body>
    </html>
  );
}
