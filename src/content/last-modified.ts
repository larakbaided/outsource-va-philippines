/**
 * =========================================================================
 * SITEMAP <lastmod> DATES
 * -------------------------------------------------------------------------
 * When a page in the sitemap was last meaningfully changed.
 *
 * "Meaningfully" means the copy a visitor reads changed — new sections,
 * rewritten paragraphs, added FAQs, revised pricing. It does NOT mean a
 * styling tweak, a dependency bump, or a redeploy.
 *
 * WHY THIS FILE EXISTS
 * The sitemap used to stamp every URL with the build time, so all 32 static
 * URLs claimed to change on every deploy. Search engines treat a <lastmod>
 * that always says "just now" as noise and stop using it to decide what to
 * recrawl — which costs you exactly the signal you want when pages are
 * waiting to be indexed. An accurate date that sits still for months is far
 * more valuable than a fresh one that means nothing.
 *
 * HOW TO UPDATE
 * After a real content edit, set the date on that page:
 *   - Services   → `updated` on the entry in services.ts
 *   - Industries → `updated` on the entry in industries.ts
 *   - Talent     → `updated` on the entry in team.ts
 *   - Blog posts → `updated` in the post's Markdown frontmatter
 *   - Everything else (home, pricing, about, …) → `staticRouteUpdated` below
 *
 * Anything without its own date falls back to CONTENT_BASELINE. Leaving it
 * alone is the correct choice when a page has not actually changed.
 *
 * Format is always YYYY-MM-DD, interpreted as UTC.
 * =========================================================================
 */

/**
 * Date the site's content was last reviewed as a whole. Used for any page
 * that has not been given its own date. Bump this only for a site-wide
 * content pass, never for a routine deploy.
 */
export const CONTENT_BASELINE = "2026-07-26";

/**
 * Per-page dates for routes whose copy lives in a page component rather than
 * in a content entry. Omit a route to let it use CONTENT_BASELINE.
 */
export const staticRouteUpdated: Record<string, string> = {
  // "/pricing": "2026-08-14",   ← example: bump when the rates actually change
};

/** YYYY-MM-DD → Date at UTC midnight. Falls back to the baseline. */
export function toLastModified(date?: string): Date {
  return new Date(`${date ?? CONTENT_BASELINE}T00:00:00Z`);
}
