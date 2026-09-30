/**
 * Engagement / service-model options. Hour figures are read from
 * @/content/pricing (the single source) — never hardcode a rate in this file.
 * Dollar figures are intentionally not shown here; every engagement is
 * confirmed with a custom quote during a consultation.
 */

import { monthHours } from "@/content/pricing";

export type EngagementOption = {
  slug: string;
  name: string;
  description: string;
  bestFor: string;
  highlights: string[];
};

export const engagementOptions: EngagementOption[] = [
  {
    slug: "part-time",
    name: "Part-Time Support",
    description:
      "For businesses that need consistent support for selected responsibilities.",
    bestFor: "Owners who need reliable, ongoing help a few hours a day or week.",
    highlights: [
      `${monthHours.partTime} hours a month, consistent weekly hours`,
      "Focused on selected responsibilities",
      "Room to grow as needs increase",
    ],
  },
  {
    slug: "full-time",
    name: "Full-Time Support",
    description:
      "For businesses ready to add a dedicated professional to their team.",
    bestFor: "Teams ready for a dedicated, deeply embedded contractor.",
    highlights: [
      `${monthHours.fullTime} hours a month, in your working hours`,
      "Deeper ownership of systems and routines",
      "A dedicated professional on your account",
    ],
  },
  {
    slug: "project",
    name: "Specialized Project Support",
    description:
      "For focused technical, marketing, CRM, automation, or setup projects.",
    bestFor: "A specific build, migration, or launch with a clear scope.",
    highlights: [
      "Clear, defined project scope",
      "Experienced technical execution",
      "Documentation and handover on completion",
    ],
  },
];

/** Shown near the engagement cards. */
export const engagementNote =
  "Rates depend on specialization, experience, hours, and engagement type — book a consultation for a custom quote.";
