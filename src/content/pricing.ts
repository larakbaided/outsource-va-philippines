/**
 * =========================================================================
 * PRICING — SINGLE SOURCE OF TRUTH (mirrors docs/OFFER.md)
 * -------------------------------------------------------------------------
 * Every rate, payment term and offer claim on the site comes from this file.
 * Do not hardcode a price anywhere else, and do not add a rate, term or
 * guarantee that is not written in docs/OFFER.md.
 * =========================================================================
 */

/** Hours in a billed month. */
export const monthHours = { partTime: 80, fullTime: 160 } as const;

/** Minimum price for a scoped project, in whole USD. */
export const projectFloorUsd = 1500;

/** Role activation fee, in whole USD. */
export const activationFeeUsd = 500;

export type RateCardRow = {
  role: string;
  /** USD per month at 80 hours. */
  partTime: number;
  /** USD per month at 160 hours. */
  fullTime: number;
  /** USD per hour on scoped project work. */
  projectHourly: number;
};

export const rateCard: RateCardRow[] = [
  { role: "Executive Assistant", partTime: 960, fullTime: 1760, projectHourly: 14 },
  { role: "Social Media Manager", partTime: 1120, fullTime: 2080, projectHourly: 16 },
  { role: "Digital Marketing Professional", partTime: 1360, fullTime: 2560, projectHourly: 19 },
  { role: "GoHighLevel & CRM Specialist", partTime: 1760, fullTime: 3360, projectHourly: 25 },
];

/** Format a whole-dollar USD amount, e.g. 1760 -> "$1,760". */
export function usd(amount: number): string {
  return `$${amount.toLocaleString("en-US")}`;
}

/** Card boundaries, derived — never write these numbers out by hand. */
export const lowestMonthlyUsd = Math.min(...rateCard.map((r) => r.partTime));
export const lowestFullTimeUsd = Math.min(...rateCard.map((r) => r.fullTime));
export const highestFullTimeUsd = Math.max(...rateCard.map((r) => r.fullTime));

/** What decides which rate applies. Exactly four, per docs/OFFER.md. */
export const rateFactors: { title: string; body: string }[] = [
  {
    title: "Specialization",
    body: "A general administrative role and a GoHighLevel build are different skills, and they sit at different points on the card.",
  },
  {
    title: "Experience",
    body: "More experience costs more, and usually needs less direction to get the work right.",
  },
  {
    title: "Hours",
    body: `A part-time month is ${monthHours.partTime} hours. A full-time month is ${monthHours.fullTime} hours.`,
  },
  {
    title: "Engagement type",
    body: "Ongoing support is billed monthly. A scoped project is quoted per outcome.",
  },
];

export type EngagementTerms = {
  slug: string;
  name: string;
  /** Short price line, e.g. "From $960 / month". */
  priceLine: string;
  detail: string;
};

/** The three ways to engage, priced from the rate card above. */
export const engagementTerms: EngagementTerms[] = [
  {
    slug: "part-time",
    name: "Part-time support",
    priceLine: `From ${usd(lowestMonthlyUsd)} / month`,
    detail: `${monthHours.partTime} hours a month, consistent weekly hours on selected responsibilities.`,
  },
  {
    slug: "full-time",
    name: "Full-time support",
    priceLine: `From ${usd(lowestFullTimeUsd)} / month`,
    detail: `${monthHours.fullTime} hours a month, a dedicated professional in your working hours.`,
  },
  {
    slug: "project",
    name: "Scoped project",
    priceLine: `From ${usd(projectFloorUsd)}`,
    detail: "Priced per outcome, with documentation and handover.",
  },
];

/**
 * The activation fee and its refund condition. These are exported together on
 * purpose: the fee must never appear on a page without the condition, in this
 * order. See docs/OFFER.md.
 */
export const activationFee = {
  label: "On acceptance",
  terms: `${usd(activationFeeUsd)} role activation fee, credited in full against your first monthly invoice. It is not an extra cost.`,
  refundCondition:
    "If we cannot put at least two candidates in front of you that you are willing to interview within 14 days, the activation fee is refunded in full.",
} as const;

/** Payment schedule after the activation fee. Order matters. */
export const paymentSchedule: { label: string; terms: string }[] = [
  {
    label: "Before the start date",
    terms: "First month, in advance — after you have interviewed and chosen your professional.",
  },
  {
    label: "Monthly thereafter",
    terms: "One month in advance, on the same date each month, by card or ACH auto-debit.",
  },
  { label: "Scoped projects", terms: "50% deposit, 50% on handover." },
  {
    label: "Ending an engagement",
    terms: "30 days' written notice, either side. No exit fee.",
  },
  { label: "Proposal validity", terms: "Rates quoted in a proposal are valid for 14 days." },
];

/** Included in the monthly rate. */
export const includedInRate: string[] = [
  "Sourcing, screening and shortlisting for the specific role",
  "Experience and reference verification",
  "Written and spoken English assessment",
  "Matching to your tools and way of working",
  "Onboarding support through the first 30 days",
  "Ongoing support and a route to raise problems with us",
  "Contractor invoicing, payments and administration",
];

/** Not included. Kept plain on purpose — it prevents disputes later. */
export const notIncludedInRate: string[] = [
  "Employment, benefits or statutory contributions — the professional is an independent contractor",
  "Software licences and subscriptions",
  "Work outside the agreed scope or hours",
  "Equipment beyond the professional's own workstation and connection",
  "Any guarantee of a specific business outcome or revenue result",
];

/** How the working relationship is structured. */
export const contractorPosition = {
  heading: "How the working relationship works",
  body: [
    "We place experienced Filipino professionals as independent contractors with US businesses, and manage the match.",
    "You pay us monthly in advance. We pay the contractor. The professional is not your employee and not a payroll liability.",
    "You direct the work day to day. We handle sourcing, vetting, matching, onboarding, invoicing and ongoing support.",
  ],
} as const;
