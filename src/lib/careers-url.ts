import { site } from "@/content/site";

/**
 * Public origin of the careers subdomain, derived from the main site URL so
 * there is one place to change the domain.
 *
 * Canonicals, Open Graph URLs, JobPosting schema and the careers sitemap all
 * use the subdomain — never the internal /careers path, which visitors never
 * see (see src/proxy.ts).
 */
export const careersUrl: string =
  process.env.NEXT_PUBLIC_CAREERS_URL || deriveCareersUrl(site.url);

function deriveCareersUrl(mainUrl: string): string {
  try {
    const url = new URL(mainUrl);
    const host = url.hostname.replace(/^www\./, "");
    return `${url.protocol}//careers.${host}`;
  } catch {
    return "https://careers.outsourcevaphilippines.com";
  }
}

/** Absolute URL on the careers subdomain for a subdomain-relative path. */
export function careersAbsoluteUrl(path: string): string {
  return new URL(path, careersUrl).toString().replace(/\/$/, "") || careersUrl;
}
