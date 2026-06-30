"use client";

import { useEffect } from "react";

/**
 * Last-resort boundary that catches errors in the root layout itself. It
 * replaces the whole document, so it must render its own <html>/<body> and
 * cannot rely on the locale provider — kept deliberately minimal and inline.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[global-error]", error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0a2540",
          color: "#ffffff",
          fontFamily:
            'system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
          textAlign: "center",
          padding: "2rem",
        }}
      >
        <div style={{ maxWidth: 520 }}>
          <p
            style={{
              color: "#15b4c7",
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: 3,
              textTransform: "uppercase",
            }}
          >
            Daron Namibia
          </p>
          <h1 style={{ fontSize: 32, fontWeight: 700, lineHeight: 1.2, marginTop: 12 }}>
            Something went wrong.
          </h1>
          <p style={{ color: "rgba(255,255,255,0.8)", marginTop: 16, lineHeight: 1.6 }}>
            Please try again. If it keeps happening, reach us on WhatsApp at{" "}
            +264&nbsp;81&nbsp;141&nbsp;3840 or email dnoperations@daron-group.com.
          </p>
          <button
            type="button"
            onClick={reset}
            style={{
              marginTop: 28,
              border: "none",
              cursor: "pointer",
              background: "#f97316",
              color: "#0a2540",
              fontWeight: 600,
              fontSize: 16,
              padding: "12px 28px",
              borderRadius: 9999,
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
