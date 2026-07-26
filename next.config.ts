import type { NextConfig } from "next";

// Security headers applied to every route. These are safe defaults that do not
// interfere with the site's own scripts, fonts, or the Calendly booking embed.
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  { key: "X-DNS-Prefetch-Control", value: "on" },
];

const nextConfig: NextConfig = {
  // Prefer modern formats; Next serves AVIF then WebP with automatic fallback.
  images: {
    formats: ["image/avif", "image/webp"],
    // Next 16 treats this as an allowlist (default [75]). 90 is used for
    // portrait photography, where 75 visibly softens skin and hair detail.
    qualities: [75, 90],
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
