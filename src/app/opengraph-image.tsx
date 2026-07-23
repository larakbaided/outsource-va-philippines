import { ImageResponse } from "next/og";

/**
 * Auto-generated 1200x630 social sharing image, used site-wide by default.
 * Uses the brand palette and wordmark — no external assets required.
 * Replace with a designed image later by adding /public/og-image.png and
 * pointing site.seo.ogImage at it.
 */

export const runtime = "nodejs";
export const alt = "Outsource VA Philippines — Premium Filipino Virtual Assistants";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#fbf9f4",
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        {/* Wordmark */}
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <div style={{ display: "flex" }}>
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 999,
                border: "5px solid #1f3a2e",
              }}
            />
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 999,
                border: "5px solid #b08b4f",
                marginLeft: -18,
              }}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: 30, fontWeight: 700, color: "#1f3a2e" }}>
              Outsource VA
            </span>
            <span
              style={{
                fontSize: 15,
                letterSpacing: 6,
                textTransform: "uppercase",
                color: "#9a7638",
              }}
            >
              Philippines
            </span>
          </div>
        </div>

        {/* Headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <span style={{ fontSize: 40, color: "#b08b4f", fontWeight: 600 }}>
            Premium Filipino Virtual Talent
          </span>
          <span
            style={{
              fontSize: 62,
              lineHeight: 1.1,
              color: "#1f3a2e",
              fontWeight: 700,
              maxWidth: 900,
            }}
          >
            Exceptional virtual talent for businesses ready to grow.
          </span>
        </div>

        {/* Footer tags */}
        <div style={{ display: "flex", gap: 16 }}>
          {["GoHighLevel", "Executive Support", "Digital Marketing", "Social Media"].map(
            (tag) => (
              <span
                key={tag}
                style={{
                  fontSize: 22,
                  color: "#1f3a2e",
                  background: "#ffffff",
                  border: "1px solid #e7e1d3",
                  borderRadius: 999,
                  padding: "10px 22px",
                }}
              >
                {tag}
              </span>
            ),
          )}
        </div>
      </div>
    ),
    { ...size },
  );
}
