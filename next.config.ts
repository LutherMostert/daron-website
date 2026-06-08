import type { NextConfig } from "next";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

// Pin Turbopack's root to this project directory. Without this, Next.js 16
// infers the workspace root from the nearest lockfile — and since
// C:\Users\LutherMostert\package-lock.json exists one level up, it was
// resolving env files (.env.local) and tracing from the user home, not the
// project. That made `.env.local` invisible to route handlers at runtime.
const PROJECT_ROOT = dirname(fileURLToPath(import.meta.url));

/*
 * Content-Security-Policy.
 * Pragmatic baseline: blocks clickjacking (frame-ancestors), external script
 * injection to non-allowed hosts, plugin/object embeds, and <base> hijacking,
 * while keeping 'unsafe-inline' for script/style (Next's hydration bootstrap +
 * inline JSON-LD + Tailwind are statically generated, so nonces aren't viable
 * here). Allows Plausible (analytics) and the WordPress media host we still
 * optimise images from during asset migration.
 * Tighten to a nonce/hash strategy once the app moves off static export.
 */
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://plausible.io",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://www.daron.com.na",
  "font-src 'self' data:",
  "connect-src 'self' https://plausible.io",
  "frame-ancestors 'self'",
  "form-action 'self' mailto:",
  "base-uri 'self'",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
  { key: "X-DNS-Prefetch-Control", value: "on" },
];

const nextConfig: NextConfig = {
  turbopack: {
    root: PROJECT_ROOT,
  },
  // Apply security headers to every route.
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  // Old WordPress URL slugs → new Next.js routes (CLAUDE.md "Site routes")
  async redirects() {
    return [
      { source: "/about-us", destination: "/about", permanent: true },
      { source: "/services-2", destination: "/services", permanent: true },
      {
        source: "/industries-we-serve",
        destination: "/industries",
        permanent: true,
      },
      {
        source: "/why-choose-us",
        destination: "/why-daron",
        permanent: true,
      },
      { source: "/coming-soon", destination: "/", permanent: true },
    ];
  },
  images: {
    // Serve modern formats first — AVIF typically 20-30% smaller than WebP.
    formats: ["image/avif", "image/webp"],
    // Allow next/image to optimise the WordPress media library while we
    // migrate assets; remove once everything lives in /public.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.daron.com.na",
        pathname: "/wp-content/uploads/**",
      },
    ],
  },
};

export default withNextIntl(nextConfig);
