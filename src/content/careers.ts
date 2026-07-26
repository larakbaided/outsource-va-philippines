/**
 * =========================================================================
 * CAREERS SITE CONTENT — careers.outsourcevaphilippines.com
 * -------------------------------------------------------------------------
 * Editable copy for the careers subdomain. Job listings themselves live as
 * Markdown in src/content/jobs/ — see the README in that folder.
 *
 * Nothing here may promise pay, benefits or employment. Professionals are
 * placed as independent contractors, so statutory benefits do not apply and
 * must not be implied.
 * =========================================================================
 */

export type NavItem = { label: string; href: string };

/** Careers header navigation. Hrefs are relative to the careers subdomain. */
export const careersNav: NavItem[] = [
  { label: "Open Roles", href: "/jobs" },
  { label: "How Hiring Works", href: "/#how-hiring-works" },
  { label: "Working With Us", href: "/#working-with-us" },
  { label: "FAQs", href: "/#faqs" },
];

export const careersSeo = {
  /**
   * Landing-page title. Deliberately excludes the brand name — the root
   * layout's title template appends "| Outsource VA Philippines" to it.
   */
  title: "Careers — Remote Roles with US Businesses",
  description:
    "Work with US businesses as a Filipino virtual professional. Browse open roles in GoHighLevel and CRM, executive support, marketing and admin — remote, matched, and supported.",
  socialTitle: "Remote roles with US businesses — Outsource VA Philippines",
};

export const careersHero = {
  badge: "Now hiring Filipino virtual professionals",
  headline: "Remote work with US businesses, without the job-board grind.",
  subheadline:
    "We match experienced Filipino professionals with US companies that need them, then support the placement over time. You get a real role with one business, not a queue of one-off gigs.",
  reassurance: "No placement fees. We're paid by the client, never by you.",
};

/** What the candidate can expect from us. All factual — no invented perks. */
export const workingWithUs = {
  heading: "What working with us actually means.",
  description:
    "We're an agency, not a marketplace. That changes a few things worth knowing before you apply.",
  points: [
    {
      title: "You're matched, not listed",
      body: "We put you forward for roles that fit your experience. You aren't bidding against fifty other people for the same job.",
    },
    {
      title: "One client at a time",
      body: "Placements are ongoing engagements with a single business, so you learn how they work instead of restarting every few weeks.",
    },
    {
      title: "We handle the money",
      body: "We invoice the client and pay you. You never chase a client for payment or negotiate rates mid-engagement.",
    },
    {
      title: "Support after you start",
      body: "We stay involved through your first 30 days and beyond. If something isn't working, you have somewhere to raise it.",
    },
    {
      title: "Independent contractor",
      body: "You'd be engaged as an independent contractor, not an employee of the client. That means no statutory benefits or employment protections from them, and you handle your own taxes.",
    },
    {
      title: "You need your own setup",
      body: "A reliable computer and internet connection are on you. Software licences the client requires are on them.",
    },
  ],
};

export const hiringSteps = [
  {
    number: 1,
    title: "Apply",
    description:
      "Send us your résumé and a short note about the role. It takes a few minutes.",
  },
  {
    number: 2,
    title: "Screening",
    description:
      "We review your experience against the role and shortlist candidates who fit.",
  },
  {
    number: 3,
    title: "English assessment",
    description:
      "A written and spoken assessment. Most of our clients work in English all day, so this matters.",
  },
  {
    number: 4,
    title: "Verification",
    description:
      "We verify your experience and check references before putting you forward.",
  },
  {
    number: 5,
    title: "Client interview",
    description:
      "You meet the client and they decide. You're free to decide it isn't right for you too.",
  },
  {
    number: 6,
    title: "Onboarding",
    description:
      "We help set expectations and routines, and stay with you through the first 30 days.",
  },
];

export const careersFaqs = [
  {
    question: "Do I pay anything to apply or be placed?",
    answer:
      "No. There is no application fee and no placement fee. We are paid by the client business, never by the professional.",
  },
  {
    question: "Am I an employee of the client?",
    answer:
      "No. Professionals are engaged as independent contractors. The client directs your day-to-day work, but you are not on their payroll and statutory employment benefits do not apply. You are responsible for your own taxes.",
  },
  {
    question: "What equipment do I need?",
    answer:
      "Your own working computer and a reliable internet connection, plus a quiet place to take calls. Any software licences the role requires are provided by the client.",
  },
  {
    question: "What hours would I work?",
    answer:
      "It depends on the role. Most of our clients are US-based and want meaningful overlap with their business hours. Each listing states the expectation, and specific hours are agreed before you start.",
  },
  {
    question: "How long does the process take?",
    answer:
      "It varies with the role and how quickly interviews can be scheduled. We would rather make a good match than a fast one, and we will keep you updated either way.",
  },
  {
    question: "What if I don't hear back?",
    answer:
      "We read every application. If a role isn't the right fit we keep your details on file for future openings unless you ask us not to.",
  },
  {
    question: "Can I apply for more than one role?",
    answer:
      "Yes. Apply for each role you're genuinely suited to and tell us in your note which you'd prefer.",
  },
];

export const noOpenRoles = {
  heading: "No open roles right now.",
  body: "We post new roles here as they come up. If your background fits the kind of work we do, send us your résumé anyway and we'll keep it on file.",
};

export const careersCta = {
  heading: "See a role that fits?",
  description:
    "Applications take a few minutes. We read every one, and we'll tell you either way.",
};
