/**
 * Homepage-specific content: trust indicators, the business-problem section,
 * "why work with us" comparison, and hero labels. Edit copy here.
 */

export type TrustIndicator = {
  icon: "shieldCheck" | "target" | "messageCircle" | "handshake" | "infinity";
  label: string;
};

/** Truthful, capability-based trust indicators (no invented stats). */
export const trustIndicators: TrustIndicator[] = [
  { icon: "shieldCheck", label: "Carefully Vetted Professionals" },
  { icon: "target", label: "Specialized Skill Matching" },
  { icon: "messageCircle", label: "Clear Communication" },
  { icon: "handshake", label: "Ongoing Agency Support" },
  { icon: "infinity", label: "Built for Long-Term Partnerships" },
];

/** Floating labels around the hero visual. */
export const heroLabels: string[] = [
  "GoHighLevel",
  "Executive Support",
  "Digital Marketing",
  "Social Media",
  "Systems & Operations",
];

export const businessProblem = {
  heading: "Your business should not depend on you doing everything.",
  problems: [
    "Administrative work takes time away from growth.",
    "Marketing projects remain unfinished.",
    "CRM and automation systems are underused.",
    "Client communication becomes inconsistent.",
    "Hiring independently takes too much time.",
    "A poor hiring decision creates additional work.",
  ],
  transition:
    "We help you find experienced support that fits the way your business actually operates.",
};

export const whyWorkWithUs = {
  heading: "Hiring a random freelancer vs. a managed partnership.",
  description:
    "Independent hiring puts the entire burden — screening, onboarding, and follow-through — on you. A managed partnership shares that work and supports it over time.",
  independent: {
    title: "Hiring independently",
    points: [
      "You screen and vet every applicant yourself",
      "Unclear experience and inconsistent skills",
      "Onboarding is entirely on you",
      "No support if things don't work out",
      "A poor decision creates more work",
    ],
  },
  agency: {
    title: "With Outsource VA Philippines",
    points: [
      "Professionals screened for experience and communication",
      "Thoughtful matching based on your business needs",
      "Clear expectations before work begins",
      "Organized onboarding",
      "Agency support throughout the partnership",
      "Easier replacement support when necessary",
      "Professionals with specialized digital skills",
      "A long-term partnership mindset",
    ],
  },
  /** Kept honest — this is a supportive intent, not a guarantee. */
  disclaimer:
    "Replacement and support arrangements are discussed and confirmed during your consultation and are not guarantees.",
};

export const finalCta = {
  heading: "Build the support system your business needs to grow.",
  description:
    "Tell us where your time is going, what is falling behind, and what kind of expertise would make the biggest difference.",
};
