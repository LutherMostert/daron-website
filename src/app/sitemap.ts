import type { MetadataRoute } from "next";
import { posts } from "@/lib/posts";
import { site } from "@/lib/site";
import { getPathname, routing } from "@/i18n/routing";

type ChangeFreq = NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;

function absUrl(path: string, locale: string): string {
  return `${site.url}${getPathname({ href: path, locale })}`;
}

/** One sitemap entry per route, with xhtml:link hreflang alternates for en/pt/fr. */
function entry(
  path: string,
  priority: number,
  changeFrequency: ChangeFreq,
  lastModified: Date,
): MetadataRoute.Sitemap[number] {
  const languages: Record<string, string> = {};
  for (const l of routing.locales) languages[l] = absUrl(path, l);
  languages["x-default"] = absUrl(path, routing.defaultLocale);

  return {
    url: absUrl(path, routing.defaultLocale),
    lastModified,
    changeFrequency,
    priority,
    alternates: { languages },
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: Array<{ path: string; priority: number; cf: ChangeFreq }> = [
    { path: "/", priority: 1.0, cf: "weekly" },
    { path: "/about", priority: 0.8, cf: "monthly" },
    { path: "/services", priority: 0.9, cf: "monthly" },
    { path: "/services/ship-chandlery", priority: 0.9, cf: "monthly" },
    { path: "/services/dry-dock", priority: 0.7, cf: "monthly" },
    { path: "/industries", priority: 0.8, cf: "monthly" },
    { path: "/industries/oil-and-gas", priority: 0.8, cf: "monthly" },
    { path: "/brands", priority: 0.7, cf: "monthly" },
    { path: "/brands/hempel", priority: 0.7, cf: "monthly" },
    { path: "/brands/orlichem", priority: 0.7, cf: "monthly" },
    { path: "/brands/honeywell", priority: 0.7, cf: "monthly" },
    { path: "/brands/blackline-safety", priority: 0.7, cf: "monthly" },
    { path: "/brands/hammelmann", priority: 0.7, cf: "monthly" },
    { path: "/why-daron", priority: 0.8, cf: "monthly" },
    { path: "/track-record", priority: 0.8, cf: "monthly" },
    { path: "/ai", priority: 0.7, cf: "monthly" },
    { path: "/faq", priority: 0.6, cf: "monthly" },
    { path: "/insights", priority: 0.8, cf: "weekly" },
    { path: "/contact", priority: 0.8, cf: "monthly" },
    { path: "/privacy", priority: 0.3, cf: "yearly" },
  ];

  const staticEntries = staticRoutes.map((r) => entry(r.path, r.priority, r.cf, now));
  const postEntries = posts.map((p) =>
    entry(`/insights/${p.slug}`, 0.6, "yearly", new Date(p.date)),
  );

  return [...staticEntries, ...postEntries];
}
