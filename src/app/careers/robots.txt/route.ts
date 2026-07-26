import { careersAbsoluteUrl } from "@/lib/careers-url";

/**
 * robots.txt for the careers subdomain, served at
 * careers.outsourcevaphilippines.com/robots.txt via src/proxy.ts.
 *
 * Written as a route handler rather than a `robots.ts` metadata file because
 * Next only generates that convention at the app root, and the root one
 * belongs to the marketing site.
 */
export const dynamic = "force-static";

export function GET(): Response {
  const body = [
    "User-agent: *",
    "Allow: /",
    "Disallow: /api/",
    "",
    `Sitemap: ${careersAbsoluteUrl("/sitemap.xml")}`,
    "",
  ].join("\n");

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=0, must-revalidate",
    },
  });
}
