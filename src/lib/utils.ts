import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge Tailwind classes with conditional logic, de-duplicating conflicts. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Build an absolute URL from a site-relative path using the configured site URL.
 *
 * Both parts are trimmed: this feeds sitemap <loc> values and JSON-LD url/@id
 * fields, where a single stray space from an environment variable produces a
 * URL that search engines treat as invalid.
 */
export function absoluteUrl(path: string, siteUrl: string) {
  const base = siteUrl.trim().replace(/\/$/, "");
  const trimmedPath = path.trim();
  const rel = trimmedPath.startsWith("/") ? trimmedPath : `/${trimmedPath}`;
  return `${base}${rel}`;
}
