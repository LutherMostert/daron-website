import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

/**
 * AI assistants (ChatGPT, Copilot, Claude, Perplexity, Gemini) only recommend
 * suppliers they can crawl. `*` already allows everyone; the named groups make
 * the intent explicit so nobody "tightens" robots later and silently drops
 * Daron out of AI answers. API routes stay closed to every crawler.
 */
const AI_AND_SEARCH_BOTS = [
  "Googlebot",
  "Bingbot",
  "OAI-SearchBot", // ChatGPT search results — blocking this removes us from ChatGPT answers
  "ChatGPT-User", // ChatGPT fetching a page a user asked about
  "GPTBot", // OpenAI model training
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended", // Gemini training (does not control AI Overviews)
  "Applebot",
  "Applebot-Extended",
  "DuckDuckBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: AI_AND_SEARCH_BOTS, allow: "/", disallow: "/api/" },
      { userAgent: "*", allow: "/", disallow: "/api/" },
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
