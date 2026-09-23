"use client";

import { track } from "@vercel/analytics";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

// Sends each conversion event to Vercel Analytics and, when the GA4 tag is
// loaded (production only), to Google Analytics as well so RFQ, phone,
// WhatsApp and chat-lead events can be marked as key events in GA4.
// Props carry no personal data (category, source, file name, path only).
export function trackEvent(event: string, props?: Record<string, string>) {
  track(event, props);
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", event, props ?? {});
  }
}
