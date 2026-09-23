"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { GoogleAnalytics } from "./GoogleAnalytics";
import {
  onOpenCookieSettings,
  readConsent,
  subscribeConsent,
  writeConsent,
  type ConsentState,
} from "@/lib/consent";

/**
 * Cookie banner + consent-gated Google Analytics loader.
 *
 * - Nothing from Google loads until the visitor clicks Accept.
 * - Accept and Decline are equal-weight buttons (no dark patterns).
 * - The choice persists; "Cookie settings" in the footer reopens the banner.
 * - Mobile: sits above the sticky RFQ/Call/Chat bar. Desktop: bottom-left,
 *   clear of the chat button (bottom-right).
 */
export function CookieConsent({ measurementId }: { measurementId: string }) {
  const t = useTranslations("Cookies");
  const consent = useSyncExternalStore<ConsentState | "pending">(
    subscribeConsent,
    readConsent,
    () => "pending", // server render: decide on the client only
  );
  const [reopened, setReopened] = useState(false);

  useEffect(() => onOpenCookieSettings(() => setReopened(true)), []);

  const choose = (choice: "granted" | "denied") => {
    writeConsent(choice, measurementId);
    setReopened(false);
  };

  const showBanner = consent === "unset" || (reopened && consent !== "pending");

  return (
    <>
      {consent === "granted" && <GoogleAnalytics measurementId={measurementId} />}

      {showBanner && (
        <div
          role="dialog"
          aria-modal="false"
          aria-labelledby="cookie-consent-title"
          aria-describedby="cookie-consent-body"
          className="fixed inset-x-3 bottom-[calc(3.75rem+env(safe-area-inset-bottom))] z-[45] rounded-2xl border border-[var(--color-line)] bg-white p-5 shadow-2xl sm:inset-x-auto sm:left-6 sm:max-w-md xl:bottom-6"
        >
          <h2
            id="cookie-consent-title"
            className="font-[family-name:var(--font-poppins)] text-base font-semibold text-[var(--color-navy)]"
          >
            {t("title")}
          </h2>
          <p
            id="cookie-consent-body"
            className="mt-2 text-sm leading-relaxed text-[var(--color-mute)]"
          >
            {t("body")}{" "}
            <Link
              href="/privacy"
              className="font-semibold text-[var(--color-accent-text)] underline underline-offset-2"
            >
              {t("privacy")}
            </Link>
          </p>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => choose("denied")}
              className="rounded-full border-2 border-[var(--color-navy)] px-4 py-2.5 text-sm font-semibold text-[var(--color-navy)] transition-colors hover:bg-[var(--color-sand)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-text)] focus-visible:ring-offset-2"
            >
              {t("decline")}
            </button>
            <button
              type="button"
              onClick={() => choose("granted")}
              className="rounded-full border-2 border-[var(--color-navy)] bg-[var(--color-navy)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-navy-soft)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-text)] focus-visible:ring-offset-2"
            >
              {t("accept")}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
