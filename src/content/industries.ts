/**
 * Industries. `industries` is the flat list shown as badges on the homepage.
 * `industryPages` holds the richer, dedicated industry landing pages. Badges
 * whose name matches an industry page link through to it automatically.
 */

export const industries: string[] = [
  "Coaches & Consultants",
  "Healthcare & Wellness",
  "Marketing Agencies",
  "Professional Services",
  "Online Education",
  "Real Estate",
  "Local Service Businesses",
  "E-commerce",
  "Personal Brands",
  "Startups",
];

export type IndustryPage = {
  slug: string;
  /** Must match the badge label in `industries` to auto-link. */
  name: string;
  /** Short label for cards/nav. */
  shortName: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  intro: string;
  problems: string[];
  /** How a VA helps — concrete tasks. */
  tasks: string[];
  /** Related service slugs (services.ts `slug`). */
  relevantServices: string[];
  faqs: { question: string; answer: string }[];
  keywords: string[];
};

export const industryPages: IndustryPage[] = [
  {
    slug: "real-estate",
    name: "Real Estate",
    shortName: "Real Estate",
    metaTitle: "Real Estate Virtual Assistant",
    metaDescription:
      "Hire a real estate virtual assistant from the Philippines for lead follow-up, CRM management, transaction coordination, and admin. Remote support for US real estate businesses.",
    h1: "Virtual Assistants for US Real Estate Businesses",
    intro:
      "Real estate runs on speed and follow-up. A real estate virtual assistant keeps your leads nurtured, your CRM current, and your transactions organized — so you can focus on clients and closings. Our Filipino professionals support US agents, teams, and brokerages remotely.",
    problems: [
      "Leads go cold because follow-up isn't consistent.",
      "Your CRM is a mess of half-entered contacts.",
      "Transaction paperwork and coordination eat your day.",
      "Listings and social posts go out late, or not at all.",
    ],
    tasks: [
      "Follow up with new leads by email and SMS",
      "Keep your CRM and pipeline up to date",
      "Coordinate transaction documents and timelines",
      "Schedule showings and manage your calendar",
      "Post listings and content to social media",
    ],
    relevantServices: ["gohighlevel", "administrative", "social-media"],
    faqs: [
      {
        question: "What can a real estate virtual assistant do?",
        answer:
          "Lead follow-up, CRM and pipeline management, transaction coordination, appointment scheduling, listing support, and social media — the recurring work behind a busy real estate business.",
      },
      {
        question: "Do your VAs know real estate CRMs?",
        answer:
          "Many work in GoHighLevel and other common real estate tools. We match you with someone experienced in the systems you already use.",
      },
    ],
    keywords: [
      "real estate virtual assistant Philippines",
      "real estate virtual assistant",
      "virtual assistant for realtors",
    ],
  },
  {
    slug: "coaches-consultants",
    name: "Coaches & Consultants",
    shortName: "Coaches & Consultants",
    metaTitle: "Virtual Assistants for Coaches & Consultants",
    metaDescription:
      "Hire a virtual assistant from the Philippines for your coaching or consulting business — client onboarding, scheduling, funnels, email, and content. Remote support for US coaches.",
    h1: "Virtual Assistants for Coaches and Consultants",
    intro:
      "Coaching and consulting is delivered by you — but the business around it doesn't have to be. A virtual assistant handles client onboarding, scheduling, funnels, email, and content, so you spend your time with clients instead of admin. We support US coaches and consultants remotely.",
    problems: [
      "Admin and scheduling pull you away from clients.",
      "Your funnels and email sequences need building and tending.",
      "Client onboarding is manual and inconsistent.",
      "Content and community engagement keep slipping.",
    ],
    tasks: [
      "Onboard new clients smoothly and consistently",
      "Manage your calendar and client scheduling",
      "Build and maintain funnels and email sequences",
      "Coordinate your content and social presence",
      "Keep your CRM and follow-up organized",
    ],
    relevantServices: ["executive", "gohighlevel", "marketing"],
    faqs: [
      {
        question: "How can a VA help my coaching business?",
        answer:
          "By taking over scheduling, client onboarding, email and funnel management, content coordination, and CRM upkeep — the operational work that scales your practice without more of your time.",
      },
      {
        question: "Can a VA manage my GoHighLevel or course platform?",
        answer:
          "Yes. Many of our professionals work in GoHighLevel and common course and community platforms, and can manage the systems your programs run on.",
      },
    ],
    keywords: [
      "virtual assistant for coaches",
      "virtual assistant for consultants",
      "coaching virtual assistant",
    ],
  },
  {
    slug: "marketing-agencies",
    name: "Marketing Agencies",
    shortName: "Marketing Agencies",
    metaTitle: "Virtual Assistants for Marketing Agencies",
    metaDescription:
      "White-label-friendly Filipino virtual assistants for US marketing agencies — GoHighLevel builds, client onboarding, campaign execution, and reporting. Scale delivery without hiring locally.",
    h1: "Virtual Assistants for US Marketing Agencies",
    intro:
      "Agencies win clients faster than they can staff delivery. Our Filipino virtual professionals give US marketing agencies dependable, white-label-friendly capacity — GoHighLevel builds, client onboarding, campaign execution, and reporting — so you grow without the cost and lag of local hiring.",
    problems: [
      "You're the bottleneck on client delivery.",
      "GoHighLevel builds and sub-accounts pile up.",
      "Onboarding new clients is slow and inconsistent.",
      "Reporting and campaign execution fall behind.",
    ],
    tasks: [
      "Build GoHighLevel sub-accounts, snapshots, and automations",
      "Onboard new agency clients consistently",
      "Execute campaigns, funnels, and email for clients",
      "Prepare client reports and dashboards",
      "Handle recurring build and maintenance work",
    ],
    relevantServices: ["gohighlevel", "gohighlevel-onboarding", "marketing"],
    faqs: [
      {
        question: "Do you work white-label with agencies?",
        answer:
          "Yes. We're comfortable supporting your delivery behind the scenes. Specific white-label and communication arrangements are agreed during your consultation.",
      },
      {
        question: "Can your team handle GoHighLevel across multiple client sub-accounts?",
        answer:
          "Yes. Supporting agency sub-accounts, snapshots, and recurring GoHighLevel builds is one of our most common engagements.",
      },
    ],
    keywords: [
      "virtual assistant for marketing agencies",
      "white label GoHighLevel virtual assistant",
      "agency virtual assistant",
    ],
  },
  {
    slug: "healthcare-wellness",
    name: "Healthcare & Wellness",
    shortName: "Healthcare & Wellness",
    metaTitle: "Healthcare & Wellness Virtual Assistant",
    metaDescription:
      "Hire a healthcare and wellness virtual assistant from the Philippines for scheduling, client communication, admin, and CRM. Remote support for US practices and wellness businesses.",
    h1: "Virtual Assistants for US Healthcare and Wellness Businesses",
    intro:
      "Healthcare and wellness businesses depend on responsiveness and organization. A virtual assistant handles scheduling, client communication, admin, and CRM upkeep so your team stays focused on care. Our Filipino professionals support US practices and wellness brands remotely.",
    problems: [
      "Appointment scheduling and reminders eat staff time.",
      "Client and patient inquiries go unanswered.",
      "Admin and intake paperwork pile up.",
      "Your CRM and follow-up aren't consistent.",
    ],
    tasks: [
      "Manage scheduling, reminders, and rebooking",
      "Respond to routine client inquiries",
      "Handle intake coordination and admin",
      "Keep your CRM and records organized",
      "Support email and review follow-up",
    ],
    relevantServices: ["administrative", "executive", "gohighlevel"],
    faqs: [
      {
        question: "What can a healthcare or wellness VA help with?",
        answer:
          "General administrative support — scheduling, reminders, routine communication, intake coordination, CRM upkeep, and follow-up. Any handling of sensitive information is scoped and agreed carefully during your consultation.",
      },
      {
        question: "Are your VAs suitable for medical practices?",
        answer:
          "They support the administrative and operational side of practices and wellness businesses. Compliance requirements specific to your practice are discussed and confirmed before any engagement begins.",
      },
    ],
    keywords: [
      "healthcare virtual assistant Philippines",
      "wellness virtual assistant",
      "medical administrative virtual assistant",
    ],
  },
];

export function getIndustryPage(slug: string): IndustryPage | undefined {
  return industryPages.find((i) => i.slug === slug);
}

export function getIndustryPageByName(name: string): IndustryPage | undefined {
  return industryPages.find((i) => i.name === name);
}
