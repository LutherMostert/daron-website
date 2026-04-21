import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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

export default nextConfig;
