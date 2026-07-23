/**
 * Lightweight input sanitization for stored/emailed contact data.
 * Removes control characters, strips angle brackets to neutralize any HTML,
 * collapses excessive whitespace, and enforces a max length.
 */
export function sanitizeText(
  value: string | undefined | null,
  maxLength = 2000,
): string {
  if (!value) return "";
  return value
    // Strip ASCII control characters (0x00-0x1F and 0x7F).
    .replace(/[\x00-\x1F\x7F]/g, "")
    .replace(/[<>]/g, "")
    .replace(/[ \t]{2,}/g, " ")
    .trim()
    .slice(0, maxLength);
}

/** Escape a string for safe interpolation into HTML email templates. */
export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
