/**
 * Engagement / service-model options. Every price shown here is read from
 * @/content/pricing (the single source) — never hardcode a rate in this file.
 */

import { engagementTerms, monthHours } from "@/content/pricing";

export type EngagementOption = {
  slug: string;
  name: string;
  description: string;
  bestFor: string;
  highlights: string[];
  /** Short price line, read from @/content/pricing. */
  price?: string;
};

/** Look up the published price line for an engagement slug. */
const priceFor = (slug: string) =>
  engagementTerms.find((t) => t.slug === slug)?.priceLine;

export const engagementOptions: EngagementOption[] = [
  {
    slug: "part-time",
    name: "Part-Time Support",
    price: priceFor("part-time"),
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
    price: priceFor("full-time"),
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
    price: priceFor("project"),
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
  "Which rate applies depends on specialization, experience, hours, and engagement type.";
