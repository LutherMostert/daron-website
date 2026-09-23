"use client";

/**
 * Cookie consent store (analytics only — the site sets no ad cookies).
 *
 * Choice is kept in localStorage under CONSENT_KEY and broadcast on
 * CONSENT_EVENT so every subscriber (banner, GA loader) updates at once.
 * Google Analytics is only loaded after an explicit "granted" choice
 * (Consent Mode "basic" implementation: no Google requests before opt-in).
 */

export type ConsentChoice = "granted" | "denied";
export type ConsentState = ConsentChoice | "unset";

const CONSENT_KEY = "daron-cookie-consent";
const CONSENT_EVENT = "daron:consent-change";
const OPEN_EVENT = "daron:open-cookie-settings";

export function readConsent(): ConsentState {
  try {
    const v = window.localStorage.getItem(CONSENT_KEY);
    return v === "granted" || v === "denied" ? v : "unset";
  } catch {
    return "unset";
  }
}

export function subscribeConsent(onChange: () => void): () => void {
  window.addEventListener(CONSENT_EVENT, onChange);
  window.addEventListener("storage", onChange); // other tabs
  return () => {
    window.removeEventListener(CONSENT_EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

export function writeConsent(choice: ConsentChoice, measurementId: string) {
  try {
    window.localStorage.setItem(CONSENT_KEY, choice);
  } catch {
    // Storage blocked (private mode etc.): choice applies to this page view only.
  }

  const w = window as unknown as Record<string, unknown> & {
    gtag?: (...args: unknown[]) => void;
  };
  // Google's documented per-property opt-out flag.
  w[`ga-disable-${measurementId}`] = choice === "denied";

  if (typeof w.gtag === "function") {
    // GA already loaded this session (visitor is changing their choice).
    w.gtag("consent", "update", { analytics_storage: choice });
  }
  if (choice === "denied") clearAnalyticsCookies();

  window.dispatchEvent(new Event(CONSENT_EVENT));
}

export function openCookieSettings() {
  window.dispatchEvent(new Event(OPEN_EVENT));
}

export function onOpenCookieSettings(handler: () => void): () => void {
  window.addEventListener(OPEN_EVENT, handler);
  return () => window.removeEventListener(OPEN_EVENT, handler);
}

/** Remove GA cookies (_ga, _ga_<id>) on every domain level GA may have used. */
function clearAnalyticsCookies() {
  const host = window.location.hostname;
  const parts = host.split(".");
  const domains = new Set<string>(["", host, `.${host}`]);
  for (let i = 1; i < parts.length - 1; i++) {
    domains.add(`.${parts.slice(i).join(".")}`);
  }
  const names = document.cookie
    .split(";")
    .map((c) => c.split("=")[0]?.trim())
    .filter((n): n is string => !!n && n.startsWith("_ga"));
  for (const name of names) {
    for (const domain of domains) {
      document.cookie = `${name}=; Max-Age=0; path=/${domain ? `; domain=${domain}` : ""}`;
    }
  }
}
