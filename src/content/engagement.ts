/**
 * Engagement / service-model options. No prices are shown until approved.
 * Add an approved `price` string later to display pricing on the cards.
 */

export type EngagementOption = {
  slug: string;
  name: string;
  description: string;
  bestFor: string;
  highlights: string[];
  /** PLACEHOLDER — leave empty until pricing is approved. */
  price?: string;
};

export const engagementOptions: EngagementOption[] = [
  {
    slug: "part-time",
    name: "Part-Time Support",
    description:
      "For businesses that need consistent support for selected responsibilities.",
    bestFor: "Owners who need reliable, ongoing help a few hours a day or week.",
    highlights: [
      "Consistent weekly hours",
      "Focused on selected responsibilities",
      "Room to grow as needs increase",
    ],
  },
  {
    slug: "full-time",
    name: "Full-Time Support",
    description:
      "For businesses ready to add a dedicated professional to their team.",
    bestFor: "Teams ready for a dedicated, deeply embedded team member.",
    highlights: [
      "A dedicated professional on your team",
      "Deeper ownership of systems and routines",
      "Full-time availability in your working hours",
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
  "Engagement recommendations are based on role scope, skill requirements, schedule, and business needs.";
