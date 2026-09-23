import Script from "next/script";

/**
 * Google Analytics 4 (gtag.js).
 *
 * Rendered only by <CookieConsent> after the visitor accepts analytics
 * cookies, so Consent Mode is set to analytics granted / ads denied (the site
 * runs no ads). Client-side route changes are picked up by GA4 Enhanced
 * Measurement ("page changes based on browser history events"), on by
 * default — no manual page_view calls needed. CSP allow-list for these hosts
 * lives in next.config.ts.
 */
export function GoogleAnalytics({ measurementId }: { measurementId: string }) {
  return (
    <>
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = gtag;
gtag('consent', 'default', {
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  analytics_storage: 'granted'
});
gtag('js', new Date());
gtag('config', '${measurementId}');`}
      </Script>
      <Script
        id="ga4-src"
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
    </>
  );
}
