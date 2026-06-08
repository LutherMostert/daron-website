import { ImageResponse } from "next/og";

// Generated Apple touch icon — navy tile, white "D", teal accent dot.
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0a2540",
          fontFamily: "sans-serif",
        }}
      >
        <span style={{ color: "#ffffff", fontSize: 110, fontWeight: 700 }}>D</span>
        <span style={{ color: "#15b4c7", fontSize: 110, fontWeight: 700 }}>.</span>
      </div>
    ),
    { ...size },
  );
}
