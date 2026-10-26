/**
 * =========================================================================
 * CONTACT FORM CONFIGURATION
 * -------------------------------------------------------------------------
 * Dropdown options for the contact form. Budget brackets are derived from the
 * published rate card in @/content/pricing so they can never drift from it —
 * do not write a figure into this file by hand.
 * =========================================================================
 */

import {
  highestFullTimeUsd,
  lowestFullTimeUsd,
  lowestMonthlyUsd,
  projectFloorUsd,
  usd,
} from "@/content/pricing";

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

/** Budget brackets. Every boundary is a real figure from the rate card. */
export const budgetOptions = [
  "Not sure yet",
  `Under ${usd(lowestMonthlyUsd)} / month`,
  `${usd(lowestMonthlyUsd)} – ${usd(lowestFullTimeUsd)} / month`,
  `${usd(lowestFullTimeUsd)} – ${usd(highestFullTimeUsd)} / month`,
  `Over ${usd(highestFullTimeUsd)} / month`,
  `Scoped project (from ${usd(projectFloorUsd)})`,
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
