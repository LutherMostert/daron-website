import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

// Branded 1200×630 social card, generated at build for every [locale] route.
// Replaces the dead `/og.png` reference and gives every page a proper card.
export const alt = `${site.name} — when operations cannot wait`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background:
            "linear-gradient(135deg, #081d33 0%, #0a2540 55%, #103a52 100%)",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ display: "flex", alignItems: "baseline" }}>
            <span style={{ color: "#ffffff", fontSize: 64, fontWeight: 700, letterSpacing: -1 }}>
              DARON
            </span>
            <span style={{ color: "#15b4c7", fontSize: 64, fontWeight: 700 }}>.</span>
          </div>
          <span
            style={{
              color: "rgba(255,255,255,0.65)",
              fontSize: 22,
              letterSpacing: 6,
              textTransform: "uppercase",
              marginLeft: 8,
            }}
          >
            Namibia
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              width: 96,
              height: 6,
              background: "#f97316",
              borderRadius: 4,
              marginBottom: 28,
            }}
          />
          <span
            style={{
              color: "#ffffff",
              fontSize: 58,
              fontWeight: 700,
              lineHeight: 1.1,
              maxWidth: 880,
            }}
          >
            When operations cannot wait, Daron moves.
          </span>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ color: "rgba(255,255,255,0.75)", fontSize: 26 }}>
            Marine supply · Offshore support · Logistics · Walvis Bay
          </span>
          <span style={{ color: "#f97316", fontSize: 26, fontWeight: 600 }}>
            Since 2012
          </span>
        </div>
      </div>
    ),
    { ...size },
  );
}
