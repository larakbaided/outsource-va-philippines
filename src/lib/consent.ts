/**
 * Analytics consent structure — a foundation for a future cookie banner.
 *
 * Today this returns `true` when analytics is configured, so tracking works
 * once IDs are supplied. To add a cookie banner later:
 *   1. Store the user's choice (e.g. cookie/localStorage key `ovap-consent`).
 *   2. Have this read that choice and return false until granted.
 *   3. Re-render <Analytics /> when consent changes.
 */

export const CONSENT_STORAGE_KEY = "ovap-analytics-consent";

export type ConsentState = "granted" | "denied" | "unknown";

/** Server-side default: allow analytics scripts to load if IDs are present. */
export function analyticsAllowedByDefault(): boolean {
  return true;
}

/** Client-side read of a stored consent choice (for a future banner). */
export function readStoredConsent(): ConsentState {
  if (typeof window === "undefined") return "unknown";
  try {
    const value = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    if (value === "granted" || value === "denied") return value;
  } catch {
    /* ignore */
  }
  return "unknown";
}
