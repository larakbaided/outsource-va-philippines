/**
 * =========================================================================
 * CONTACT FORM CONFIGURATION
 * -------------------------------------------------------------------------
 * Dropdown options for the contact form.
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

/** Qualitative budget bands — no dollar figures, so no currency assumption. */
export const budgetOptions = [
  "Not sure yet",
  "Just exploring options",
  "Have a monthly budget in mind",
  "Have a project budget in mind",
  "Ready to move forward",
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
