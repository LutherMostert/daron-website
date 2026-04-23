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

const nextConfig: NextConfig = {
  turbopack: {
    root: PROJECT_ROOT,
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
  // Allow next/image to optimise the WordPress media library while we
  // migrate assets in Week 1; remove once everything lives in /public.
  images: {
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
