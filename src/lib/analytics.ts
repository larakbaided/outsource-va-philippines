/**
 * Lightweight analytics event dispatch.
 *
 * This is a safe no-op until real tracking IDs are supplied via env vars
 * (see .env.example and src/components/analytics/Analytics.tsx). It forwards
 * events to gtag / GTM dataLayer / Meta Pixel when those scripts are loaded.
 */

export type AnalyticsEvent =
  | "consultation_cta_clicked"
  | "calendly_opened"
  | "calendly_booking_completed"
  | "contact_form_started"
  | "contact_form_submitted"
  | "talent_profile_viewed"
  | "service_card_clicked";

type Props = Record<string, string | number | boolean | undefined>;

interface AnalyticsWindow extends Window {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
  fbq?: (...args: unknown[]) => void;
}

export function trackEvent(event: AnalyticsEvent, props: Props = {}): void {
  if (typeof window === "undefined") return;
  const w = window as AnalyticsWindow;

  try {
    w.dataLayer?.push({ event, ...props });
    w.gtag?.("event", event, props);
    w.fbq?.("trackCustom", event, props);
  } catch {
    /* never let analytics break the UI */
  }
}
