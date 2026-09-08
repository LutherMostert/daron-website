"use client";

import { track } from "@vercel/analytics";

export function trackEvent(event: string, props?: Record<string, string>) {
  track(event, props);
}
