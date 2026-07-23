import { ImageResponse } from "next/og";

/**
 * Branded favicon (browser-tab icon), generated from the brand mark — a forest
 * rounded square with two overlapping "connection" dots (ivory + gold).
 *
 * TO USE A CUSTOM LOGO INSTEAD: delete this file and drop a square image named
 * `icon.png` (512×512, e.g. your logo) into src/app/. Next.js will use it
 * automatically. Also update apple-icon.tsx the same way if desired.
 */

export const runtime = "nodejs";
export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#1f3a2e",
          borderRadius: 14,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ display: "flex" }}>
          <div
            style={{
              width: 26,
              height: 26,
              borderRadius: 999,
              background: "#fbf9f4",
            }}
          />
          <div
            style={{
              width: 26,
              height: 26,
              borderRadius: 999,
              background: "#b08b4f",
              marginLeft: -11,
            }}
          />
        </div>
      </div>
    ),
    { ...size },
  );
}
