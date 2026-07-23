/**
 * =========================================================================
 * CONTACT FORM CONFIGURATION
 * -------------------------------------------------------------------------
 * Dropdown options for the contact form. Budget ranges are PLACEHOLDERS and
 * must be approved before launch — edit them here in one place.
 * =========================================================================
 */

export const serviceOptions = [
  "GoHighLevel and CRM Support",
  "Executive Assistant",
  "Digital Marketing",
  "Social Media Management",
  "Administrative Support",
  "Project or Operations Support",
  "Not Sure Yet",
] as const;

export const supportLevelOptions = [
  "Project-Based Support",
  "Part-Time Support",
  "Full-Time Support",
  "Not Sure Yet",
] as const;

export const teamSizeOptions = [
  "Just me",
  "2–5",
  "6–10",
  "11–25",
  "26–50",
  "50+",
] as const;

/** PLACEHOLDER budget ranges — replace with approved figures before launch. */
export const budgetOptions = [
  "Not sure yet",
  "Under $500 / month",
  "$500 – $1,000 / month",
  "$1,000 – $2,000 / month",
  "$2,000 – $4,000 / month",
  "$4,000+ / month",
  "Project-based (one-time)",
] as const;

export const referralOptions = [
  "Google Search",
  "Social Media",
  "Referral",
  "LinkedIn",
  "YouTube",
  "Other",
] as const;

/** A short, friendly set of timezone hints; users can also type their own. */
export const timezoneOptions = [
  "US Eastern (ET)",
  "US Central (CT)",
  "US Mountain (MT)",
  "US Pacific (PT)",
  "UK / Europe (GMT/CET)",
  "Australia (AEST)",
  "Other / Flexible",
] as const;

export type ServiceOption = (typeof serviceOptions)[number];
export type SupportLevelOption = (typeof supportLevelOptions)[number];
