import { ImageResponse } from "next/og";

/**
 * Apple touch icon (iOS home-screen / bookmarks). Larger version of the
 * brand mark. Replace by dropping an `apple-icon.png` (180×180) in src/app/.
 */

export const runtime = "nodejs";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#1f3a2e",
          borderRadius: 40,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ display: "flex" }}>
          <div
            style={{
              width: 74,
              height: 74,
              borderRadius: 999,
              background: "#fbf9f4",
            }}
          />
          <div
            style={{
              width: 74,
              height: 74,
              borderRadius: 999,
              background: "#b08b4f",
              marginLeft: -32,
            }}
          />
        </div>
      </div>
    ),
    { ...size },
  );
}
