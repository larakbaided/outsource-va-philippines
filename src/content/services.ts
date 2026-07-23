/**
 * =========================================================================
 * SERVICES
 * -------------------------------------------------------------------------
 * Drives the homepage services preview and the full Services page. Edit copy,
 * task lists, and linked team members here. `icon` maps to a Lucide icon in
 * the ServiceIcon component. `relatedTeam` holds team member slugs.
 * =========================================================================
 */

export type Service = {
  slug: string;
  icon: "workflow" | "clipboard" | "megaphone" | "share" | "folder" | "layers";
  title: string;
  /** Short label used in nav/preview. */
  shortTitle: string;
  tagline: string;
  description: string;
  /** Who the service is for. */
  forWho: string;
  /** Condensed task list for the homepage card. */
  keyTasks: string[];
  /** Full responsibilities for the Services page. */
  responsibilities: string[];
  tools: string[];
  outcomes: string[];
  exampleTasks: string[];
  relatedTeam: string[];
};

export const services: Service[] = [
  {
    slug: "gohighlevel",
    icon: "workflow",
    title: "GoHighLevel & CRM Specialists",
    shortTitle: "GoHighLevel & CRM",
    tagline: "Make your CRM actually work for you.",
    description:
      "Experienced GoHighLevel professionals who build, organize, and maintain the systems that run your marketing and client management — so your tools support your business instead of slowing it down.",
    forWho:
      "Agencies, coaches, and service businesses using (or moving to) GoHighLevel who want their workflows, pipelines, and automations set up properly and maintained reliably.",
    keyTasks: [
      "Workflow automation",
      "Pipelines & calendars",
      "Funnels & forms",
      "Email & SMS campaigns",
      "CRM cleanup & integrations",
    ],
    responsibilities: [
      "Workflow automation",
      "Pipelines",
      "Calendars",
      "Funnels",
      "Forms and surveys",
      "Email and SMS campaigns",
      "CRM cleanup",
      "Integrations",
      "Troubleshooting",
      "Membership and course setup",
    ],
    tools: ["GoHighLevel", "Twilio", "Zapier / Make", "Stripe", "Google Workspace"],
    outcomes: [
      "Organized pipelines that reflect how you actually sell",
      "Automations that follow up consistently, without manual effort",
      "A clean CRM you can trust for reporting and decisions",
    ],
    exampleTasks: [
      "Rebuild a messy pipeline into clear, labeled stages",
      "Create a lead-nurture workflow with email and SMS steps",
      "Set up a booking calendar connected to reminders",
      "Migrate and clean contact data before a launch",
    ],
    relatedTeam: ["lara", "cassie"],
  },
  {
    slug: "executive",
    icon: "clipboard",
    title: "Executive Assistants",
    shortTitle: "Executive Support",
    tagline: "Protect your time and stay organized.",
    description:
      "Dependable executive assistants who take administrative work off your plate — managing your inbox, calendar, communication, and documentation so you can focus on leading and growing your business.",
    forWho:
      "Founders, executives, and busy business owners who need a reliable right hand to keep daily operations organized and moving.",
    keyTasks: [
      "Inbox & calendar management",
      "Meeting coordination",
      "Research & reporting",
      "Client follow-up",
      "SOPs & documentation",
    ],
    responsibilities: [
      "Inbox management",
      "Calendar management",
      "Meeting coordination",
      "Research",
      "Document organization",
      "Client follow-up",
      "Data entry",
      "Reporting",
      "Project coordination",
      "Standard operating procedures",
    ],
    tools: ["Google Workspace", "Microsoft 365", "Notion", "Asana", "Calendly", "Slack"],
    outcomes: [
      "A calendar and inbox that stay under control",
      "Fewer dropped follow-ups and missed details",
      "Documented processes your team can rely on",
    ],
    exampleTasks: [
      "Triage and organize a full inbox each morning",
      "Coordinate meetings across time zones",
      "Prepare a weekly priorities and reporting summary",
      "Draft a standard operating procedure for a recurring task",
    ],
    relatedTeam: ["wayne"],
  },
  {
    slug: "marketing",
    icon: "megaphone",
    title: "Digital Marketing Professionals",
    shortTitle: "Digital Marketing",
    tagline: "Move your marketing projects forward.",
    description:
      "Marketing support that helps you plan, execute, and finish the campaigns and systems that tend to stall — from funnels and email to launches and reporting.",
    forWho:
      "Businesses with marketing plans that keep getting delayed, who need experienced hands to coordinate and execute the work.",
    keyTasks: [
      "Campaign support",
      "Funnel planning",
      "Email marketing",
      "Lead nurture systems",
      "Analytics & reporting",
    ],
    responsibilities: [
      "Marketing campaign support",
      "Funnel planning",
      "Email marketing",
      "Lead nurture systems",
      "Website updates",
      "Analytics and reporting",
      "Content coordination",
      "Launch support",
    ],
    tools: ["GoHighLevel", "Mailchimp / ActiveCampaign", "Google Analytics", "Canva", "WordPress"],
    outcomes: [
      "Campaigns that actually get finished and launched",
      "Nurture systems that keep leads engaged over time",
      "Clear reporting on what is and isn't working",
    ],
    exampleTasks: [
      "Plan and build a multi-step launch funnel",
      "Write and schedule an email nurture sequence",
      "Update landing pages ahead of a campaign",
      "Assemble a monthly marketing performance report",
    ],
    relatedTeam: ["lara"],
  },
  {
    slug: "social-media",
    icon: "share",
    title: "Social Media Managers",
    shortTitle: "Social Media",
    tagline: "Show up consistently, on brand.",
    description:
      "Social media managers who keep your presence active and organized — planning content, scheduling posts, engaging your community, and reporting on results.",
    forWho:
      "Brands and personal brands that want a consistent, professional social presence without doing it all themselves.",
    keyTasks: [
      "Content planning",
      "Caption writing",
      "Scheduling",
      "Community engagement",
      "Reels & short-form support",
    ],
    responsibilities: [
      "Content planning",
      "Caption writing",
      "Scheduling",
      "Community engagement",
      "Basic graphic creation",
      "Performance reporting",
      "Reels and short-form content support",
      "Content repurposing",
    ],
    tools: ["Meta Business Suite", "Later", "Canva", "CapCut", "Google Analytics"],
    outcomes: [
      "A consistent posting rhythm you can count on",
      "On-brand content across every platform",
      "Engagement and reporting handled for you",
    ],
    exampleTasks: [
      "Build a monthly content calendar with captions",
      "Schedule and publish posts across platforms",
      "Repurpose a long video into short-form clips",
      "Report on reach, engagement, and growth",
    ],
    relatedTeam: ["joshua", "cath"],
  },
  {
    slug: "administrative",
    icon: "folder",
    title: "Administrative Virtual Assistants",
    shortTitle: "Administrative Support",
    tagline: "Handle the everyday details reliably.",
    description:
      "Organized administrative support for the recurring tasks that keep a business running — data entry, organization, coordination, and general assistance handled with care.",
    forWho:
      "Growing businesses that need dependable help with recurring administrative work and day-to-day organization.",
    keyTasks: [
      "Data entry",
      "Document organization",
      "Scheduling",
      "Research",
      "General coordination",
    ],
    responsibilities: [
      "Data entry and organization",
      "Document and file management",
      "Scheduling and coordination",
      "Research and list building",
      "Basic customer support",
      "Process documentation",
    ],
    tools: ["Google Workspace", "Microsoft 365", "Notion", "Airtable", "Trello"],
    outcomes: [
      "Recurring tasks handled without you chasing them",
      "Organized files and data you can find quickly",
      "More of your day freed for higher-value work",
    ],
    exampleTasks: [
      "Organize and standardize a shared drive",
      "Enter and verify data across systems",
      "Build a research list for outreach",
      "Coordinate a recurring weekly schedule",
    ],
    relatedTeam: ["wayne"],
  },
  {
    slug: "project-operations",
    icon: "layers",
    title: "Project & Operations Support",
    shortTitle: "Project & Operations",
    tagline: "Get focused projects done right.",
    description:
      "Focused support for technical, marketing, CRM, automation, or setup projects — with clear scope, organized execution, and reliable follow-through from start to finish.",
    forWho:
      "Businesses with a specific project — a system setup, migration, or launch — that needs experienced, organized execution.",
    keyTasks: [
      "Project scoping",
      "CRM & automation setup",
      "Migrations",
      "Launch coordination",
      "Process documentation",
    ],
    responsibilities: [
      "Project scoping and planning",
      "CRM and automation setup",
      "System migrations",
      "Launch and rollout coordination",
      "Integration and troubleshooting",
      "Process documentation and handover",
    ],
    tools: ["GoHighLevel", "Zapier / Make", "Notion", "Asana", "Google Workspace"],
    outcomes: [
      "A clearly scoped project delivered on plan",
      "Systems set up correctly the first time",
      "Documentation so the result is easy to maintain",
    ],
    exampleTasks: [
      "Migrate a business from another CRM into GoHighLevel",
      "Set up an end-to-end automation for a new offer",
      "Coordinate a product or course launch",
      "Document a completed setup for the team",
    ],
    relatedTeam: ["lara", "cassie"],
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

/** The four headline services shown on the homepage preview. */
export const featuredServiceSlugs = [
  "gohighlevel",
  "executive",
  "marketing",
  "social-media",
];
