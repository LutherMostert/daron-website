import { ImageResponse } from "next/og";

// Generated favicon — navy tile, white "D", teal accent dot.
export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
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
          borderRadius: 14,
          fontFamily: "sans-serif",
        }}
      >
        <span style={{ color: "#ffffff", fontSize: 42, fontWeight: 700 }}>D</span>
        <span style={{ color: "#15b4c7", fontSize: 42, fontWeight: 700 }}>.</span>
      </div>
    ),
    { ...size },
  );
}
