/**
 * Timezone / working-hours coverage section. Shown on the homepage and the
 * market landing pages (/australia, /united-states).
 *
 * Careful wording on purpose: we do not promise 24/7 coverage — working
 * hours are agreed per engagement, matched to the role and the client's
 * schedule, not guaranteed round-the-clock.
 */

export const timezoneSection = {
  eyebrow: "Working hours",
  heading: "Support that works in your time zone.",
  description:
    "Our Filipino virtual professionals support businesses across Australian and US working hours, depending on the role and the schedule you agree together — not a fixed 9-to-5 in one zone.",
};

export type TimezoneGroup = {
  region: string;
  flag: string;
  zones: string;
  note: string;
};

export const timezoneGroups: TimezoneGroup[] = [
  {
    region: "Australia",
    flag: "🇦🇺",
    zones: "AEST / AEDT, ACST, AWST",
    note: "Overlap with an Australian business day, including early-morning coverage for teams that start before their clients log on.",
  },
  {
    region: "United States",
    flag: "🇺🇸",
    zones: "ET, CT, MT, PT",
    note: "Overlap with US business hours, including afternoon-into-evening coverage for teams working Eastern or Pacific schedules.",
  },
  {
    region: "Worldwide",
    flag: "🌎",
    zones: "Other regions",
    note: "For businesses outside Australia and the US, working hours are confirmed during your consultation based on the role and the overlap that makes sense.",
  },
];

export const timezoneDisclaimer =
  "Specific working-hour arrangements are agreed per engagement and set out in your services agreement — we don't promise round-the-clock coverage on every role.";
