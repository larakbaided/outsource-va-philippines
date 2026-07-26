/**
 * =========================================================================
 * SERVICES
 * -------------------------------------------------------------------------
 * Drives the homepage services preview, the /services overview page, and the
 * dedicated /services/[pageSlug] pages. Edit copy, task lists, page SEO, and
 * linked team members here. `icon` maps to a Lucide icon in the ServiceIcon
 * component. `relatedTeam` / `relatedServices` hold slugs.
 * =========================================================================
 */

export type Service = {
  /** Anchor id used on the /services overview page (e.g. /services#gohighlevel). */
  slug: string;
  /** Keyword-rich URL slug for the dedicated page (/services/{pageSlug}). */
  pageSlug: string;
  icon:
    | "workflow"
    | "clipboard"
    | "megaphone"
    | "share"
    | "folder"
    | "layers"
    | "code";
  title: string;
  /** Short label used in nav/preview. */
  shortTitle: string;
  tagline: string;
  description: string;
  /** Who the service is for. */
  forWho: string;
  /** Condensed task list for the homepage card. */
  keyTasks: string[];
  /** Full responsibilities for the service pages. */
  responsibilities: string[];
  tools: string[];
  outcomes: string[];
  exampleTasks: string[];
  relatedTeam: string[];

  /* ---- Dedicated-page SEO + narrative content ---- */
  /** Schema.org Service.serviceType. */
  serviceType: string;
  /** Concise meta title (brand is appended via the layout template). */
  metaTitle: string;
  metaDescription: string;
  /** Page H1 — keyword-led, with US framing. */
  h1: string;
  /** Opening paragraph for the dedicated page. */
  intro: string;
  /** Customer problems this service solves. */
  problems: string[];
  /** Page-specific FAQs — also power FAQPage schema on the page. */
  faqs: { question: string; answer: string }[];
  /** Related service slugs (anchor `slug` values) for internal linking. */
  relatedServices: string[];
  /** Target keywords for reference (not injected as meta keywords). */
  keywords: string[];
};

export const services: Service[] = [
  {
    slug: "gohighlevel",
    pageSlug: "gohighlevel-virtual-assistant",
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
    serviceType: "GoHighLevel & CRM Management",
    metaTitle: "GoHighLevel Virtual Assistant",
    metaDescription:
      "Hire a GoHighLevel virtual assistant from the Philippines to build workflows, pipelines, funnels, and automations. Experienced GHL specialists supporting US agencies and businesses.",
    h1: "GoHighLevel Virtual Assistants for US Businesses",
    intro:
      "A GoHighLevel virtual assistant takes the technical weight of your CRM off your plate — building and maintaining the workflows, pipelines, funnels, and automations that run your marketing and client management. Our GHL specialists support US agencies, coaches, and service businesses remotely, so your platform works the way it should.",
    problems: [
      "Your GoHighLevel account is set up but underused or disorganized.",
      "Automations break, misfire, or were never finished.",
      "Leads slip through because follow-up isn't systematized.",
      "You're working inside the CRM instead of on your business.",
    ],
    faqs: [
      {
        question: "What can a GoHighLevel virtual assistant do?",
        answer:
          "They build and maintain workflows, pipelines, calendars, funnels, forms, and email/SMS campaigns, clean up CRM data, and troubleshoot integrations — the day-to-day GoHighLevel work most owners don't have time for.",
      },
      {
        question: "Do your GoHighLevel VAs work with agencies?",
        answer:
          "Yes. Many of our clients are agencies and coaches who run their own or their clients' marketing on GoHighLevel. We can support your sub-accounts, snapshots, and recurring build work.",
      },
      {
        question: "Can you fix or clean up an existing GoHighLevel account?",
        answer:
          "Yes. We regularly reorganize messy pipelines, repair broken automations, and clean contact data so your account is reliable for reporting and follow-up.",
      },
    ],
    relatedServices: ["gohighlevel-onboarding", "marketing"],
    keywords: [
      "GoHighLevel virtual assistant",
      "GHL virtual assistant",
      "GoHighLevel specialist",
      "GoHighLevel automation specialist",
      "hire a GoHighLevel expert",
      "outsource GoHighLevel management",
    ],
  },
  {
    slug: "gohighlevel-onboarding",
    pageSlug: "gohighlevel-onboarding",
    icon: "workflow",
    title: "GoHighLevel Onboarding Specialists",
    shortTitle: "GHL Onboarding",
    tagline: "Launch on GoHighLevel the right way.",
    description:
      "Specialists who set up your GoHighLevel account correctly from day one — account structure, migrations, snapshots, integrations, and team training — so you start with a platform that works instead of a blank slate.",
    forWho:
      "Agencies and businesses new to GoHighLevel (or switching from another CRM) who want their account, sub-accounts, and core systems set up properly before they go live.",
    keyTasks: [
      "Account & sub-account setup",
      "Data & CRM migration",
      "Snapshot configuration",
      "Integrations & domains",
      "Team training & handover",
    ],
    responsibilities: [
      "Account and sub-account structure",
      "Data migration from your previous CRM",
      "Snapshot setup and customization",
      "Calendar, pipeline, and form configuration",
      "Email, SMS, and domain setup",
      "Integration with your existing tools",
      "Team training and documentation",
    ],
    tools: ["GoHighLevel", "Twilio", "Mailgun", "Zapier / Make", "Google Workspace"],
    outcomes: [
      "A GoHighLevel account configured correctly from the start",
      "Clean data migrated without loss",
      "A team that knows how to use the platform",
    ],
    exampleTasks: [
      "Migrate contacts and pipelines from another CRM into GoHighLevel",
      "Configure a reusable snapshot for new sub-accounts",
      "Connect domains, email, and phone (Twilio) correctly",
      "Run a team walkthrough and leave documentation",
    ],
    relatedTeam: ["lara", "cassie"],
    serviceType: "GoHighLevel Onboarding",
    metaTitle: "GoHighLevel Onboarding Specialist",
    metaDescription:
      "Hire a GoHighLevel onboarding specialist from the Philippines to set up your account, migrate data, configure snapshots, and train your team. Start on GHL the right way.",
    h1: "GoHighLevel Onboarding Specialists for US Businesses",
    intro:
      "Getting onto GoHighLevel is where most businesses get stuck. A GoHighLevel onboarding specialist sets up your account the right way — structure, migration, snapshots, integrations, and team training — so you launch with a working platform instead of an empty one.",
    problems: [
      "You signed up for GoHighLevel and don't know where to start.",
      "Migrating from another CRM feels risky and overwhelming.",
      "Your sub-accounts and snapshots aren't set up to scale.",
      "Your team doesn't know how to use the platform yet.",
    ],
    faqs: [
      {
        question: "What does GoHighLevel onboarding include?",
        answer:
          "Account and sub-account setup, data migration from your previous CRM, snapshot configuration, calendar/pipeline/form setup, email/SMS and domain configuration, integrations, and team training with documentation.",
      },
      {
        question: "Can you migrate from another CRM to GoHighLevel?",
        answer:
          "Yes. We migrate contacts, pipelines, and core assets carefully to avoid data loss, and verify everything before you go live.",
      },
      {
        question: "Is onboarding a one-time project?",
        answer:
          "Usually yes — it's a scoped setup project. Many clients then move to ongoing GoHighLevel support once they're live, which we also provide.",
      },
    ],
    relatedServices: ["gohighlevel", "project-operations"],
    keywords: [
      "GoHighLevel onboarding specialist",
      "GoHighLevel setup",
      "GHL onboarding",
      "GoHighLevel migration",
    ],
  },
  {
    slug: "executive",
    pageSlug: "executive-assistant",
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
    serviceType: "Executive Assistance",
    metaTitle: "Executive Virtual Assistant",
    metaDescription:
      "Hire an executive virtual assistant from the Philippines to manage your inbox, calendar, communication, and daily operations. Experienced remote EAs for busy US founders and executives.",
    h1: "Executive Virtual Assistants for US Founders and Executives",
    intro:
      "An executive virtual assistant protects your time. Ours manage inboxes, calendars, meetings, research, and documentation for busy US founders and executives — bringing calm structure to your day so you can focus on the work only you can do.",
    problems: [
      "Your inbox and calendar run you, not the other way around.",
      "Follow-ups and details fall through the cracks.",
      "You're doing administrative work instead of leading.",
      "There's no one keeping your day organized and on track.",
    ],
    faqs: [
      {
        question: "What's the difference between an executive VA and a general VA?",
        answer:
          "An executive assistant supports a leader directly — managing communication, scheduling, and priorities with a high level of ownership and discretion — while a general VA handles broader recurring administrative tasks.",
      },
      {
        question: "Can an executive assistant work in my time zone?",
        answer:
          "Many of our professionals accommodate US working hours. Specific hours and overlap are confirmed during your consultation.",
      },
    ],
    relatedServices: ["administrative", "project-operations"],
    keywords: [
      "executive virtual assistant",
      "executive assistant Philippines",
      "remote executive assistant",
    ],
  },
  {
    slug: "marketing",
    pageSlug: "digital-marketing-support",
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
    serviceType: "Digital Marketing Support",
    metaTitle: "Digital Marketing Virtual Assistant",
    metaDescription:
      "Hire a digital marketing virtual assistant from the Philippines to plan and execute campaigns, funnels, email, and reporting. Experienced remote marketing support for US businesses.",
    h1: "Digital Marketing Virtual Assistants for US Businesses",
    intro:
      "A digital marketing virtual assistant helps you finish the campaigns and systems that keep stalling — funnels, email, launches, and reporting. Ours bring experienced hands to plan, execute, and report on the marketing work your business keeps putting off.",
    problems: [
      "Marketing projects start but never get finished.",
      "Your email list and nurture sequences are neglected.",
      "You don't have clear reporting on what's working.",
      "Launches feel chaotic and last-minute.",
    ],
    faqs: [
      {
        question: "What does a digital marketing virtual assistant handle?",
        answer:
          "Campaign support, funnel planning, email marketing, lead-nurture systems, landing-page updates, content coordination, and analytics reporting — the execution behind your marketing plan.",
      },
      {
        question: "Do your marketing VAs know GoHighLevel?",
        answer:
          "Many do. If your marketing runs on GoHighLevel, we can match you with someone experienced in building funnels, campaigns, and automations inside the platform.",
      },
    ],
    relatedServices: ["gohighlevel", "social-media"],
    keywords: [
      "digital marketing virtual assistant",
      "marketing virtual assistant",
      "email marketing assistant",
    ],
  },
  {
    slug: "social-media",
    pageSlug: "social-media-management",
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
    serviceType: "Social Media Management",
    metaTitle: "Social Media Virtual Assistant",
    metaDescription:
      "Hire a social media virtual assistant from the Philippines to plan content, schedule posts, engage your community, and report on results. Consistent, on-brand support for US brands.",
    h1: "Social Media Virtual Assistants for US Brands",
    intro:
      "A social media virtual assistant keeps your presence active and on-brand — planning content, scheduling posts, engaging your community, and reporting on results. Ours help US brands and personal brands show up consistently without doing it all themselves.",
    problems: [
      "Posting is inconsistent and reactive.",
      "You don't have time to engage or reply.",
      "Content ideas never turn into a real calendar.",
      "You can't tell whether social is actually working.",
    ],
    faqs: [
      {
        question: "Which platforms do your social media VAs support?",
        answer:
          "Commonly Instagram, Facebook, LinkedIn, TikTok, and YouTube — planning, scheduling, captions, community engagement, short-form repurposing, and reporting. Specific platforms are matched to your brand.",
      },
      {
        question: "Do they create graphics and video?",
        answer:
          "They handle basic graphics in Canva and short-form editing in tools like CapCut, and coordinate with designers for anything more advanced.",
      },
    ],
    relatedServices: ["marketing", "administrative"],
    keywords: [
      "social media virtual assistant",
      "social media manager Philippines",
      "content scheduling VA",
    ],
  },
  {
    slug: "administrative",
    pageSlug: "administrative-virtual-assistant",
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
    serviceType: "Administrative Support",
    metaTitle: "Administrative Virtual Assistant",
    metaDescription:
      "Hire an administrative virtual assistant from the Philippines for data entry, scheduling, research, and day-to-day organization. Dependable remote admin support for US businesses.",
    h1: "Administrative Virtual Assistants for US Businesses",
    intro:
      "An administrative virtual assistant handles the recurring details that keep a business running — data entry, organization, scheduling, research, and coordination. Ours bring dependable, organized support so the everyday work gets done without you chasing it.",
    problems: [
      "Recurring admin tasks pile up and get delayed.",
      "Files and data are disorganized and hard to find.",
      "You're doing low-value work instead of growing the business.",
      "Nothing is documented, so everything depends on you.",
    ],
    faqs: [
      {
        question: "What tasks can an administrative VA take over?",
        answer:
          "Data entry, document and file management, scheduling and coordination, research and list building, basic customer support, and process documentation.",
      },
      {
        question: "Can I start part-time?",
        answer:
          "Yes. Administrative support works well part-time or project-based. We'll right-size the arrangement during your consultation.",
      },
    ],
    relatedServices: ["executive", "project-operations"],
    keywords: [
      "administrative virtual assistant",
      "admin virtual assistant",
      "general virtual assistant",
    ],
  },
  {
    slug: "project-operations",
    pageSlug: "crm-automation",
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
    serviceType: "CRM & Automation Setup",
    metaTitle: "CRM & Automation Virtual Assistant",
    metaDescription:
      "Hire a CRM and marketing automation specialist from the Philippines for focused setup, migration, and integration projects. Organized project execution for US businesses.",
    h1: "CRM & Marketing Automation Specialists",
    intro:
      "Some work is a project, not a role — a CRM setup, a migration, or an automation build that needs to be done right. Our specialists scope, execute, and document focused CRM and marketing-automation projects for US businesses, with clear ownership from start to finish.",
    problems: [
      "A system needs setting up and no one owns it.",
      "You're migrating platforms and dread the data mess.",
      "Automations need building before a launch.",
      "Past setups were never documented or handed over.",
    ],
    faqs: [
      {
        question: "Do you handle one-off projects, not just ongoing support?",
        answer:
          "Yes. For focused CRM, automation, migration, or setup work, we offer project-based support with a clear scope, a timeline discussion, and a documented handover.",
      },
      {
        question: "Which platforms do you work with?",
        answer:
          "GoHighLevel most often, plus common automation tools like Zapier and Make, and standard business apps. Specific tools are matched to your project.",
      },
    ],
    relatedServices: ["gohighlevel", "gohighlevel-onboarding"],
    keywords: [
      "marketing automation virtual assistant",
      "CRM virtual assistant",
      "CRM setup specialist",
      "automation specialist",
    ],
  },
  {
    slug: "web-development",
    pageSlug: "website-developer",
    icon: "code",
    title: "Website Developers",
    shortTitle: "Website Development",
    tagline: "Someone to build it, and keep it working.",
    description:
      "Experienced developers who build and maintain the web side of your business — pages, landing pages, integrations, and the ongoing fixes that keep everything running.",
    forWho:
      "Businesses that need website work done properly and then looked after, without hiring an agency for every small change.",
    keyTasks: [
      "Website builds & pages",
      "Landing pages",
      "Integrations & APIs",
      "Bug fixes",
      "Ongoing maintenance",
    ],
    responsibilities: [
      "Build and update website pages",
      "Build landing pages for campaigns",
      "Connect third-party tools and APIs",
      "Fix bugs and broken functionality",
      "Improve page speed and responsiveness",
      "Keep plugins, dependencies and platforms updated",
      "Set up forms and tracking",
      "Implement design handoffs",
      "Test across devices and browsers",
      "Document what was built and why",
    ],
    // PLACEHOLDER — confirm Vince's actual stack and replace this list.
    tools: ["Git", "WordPress", "Google Workspace", "Figma", "Slack"],
    outcomes: [
      "A site that works on every device, not just the one it was built on",
      "Changes handled as they come up, instead of piling into a redesign",
      "The tools you use talking to each other properly",
    ],
    exampleTasks: [
      "Build a landing page for a campaign launch",
      "Connect a website form to your CRM so leads arrive automatically",
      "Fix a checkout or booking flow that stopped working",
      "Speed up pages that load slowly on mobile",
    ],
    relatedTeam: ["vince"],
    serviceType: "Website Development",
    metaTitle: "Website Developer",
    metaDescription:
      "Hire a website developer from the Philippines to build pages, connect integrations, fix bugs, and maintain your site. Experienced remote development support for US businesses.",
    h1: "Website Developers for US Businesses",
    intro:
      "A website developer handles the build-and-maintain work that sits behind your site — pages and landing pages, integrations with the tools you already use, and the fixes that come up along the way. Our developers support US businesses remotely, so small changes get handled instead of waiting for a redesign.",
    problems: [
      "Small website changes sit in a queue for weeks.",
      "Your site works on desktop but breaks on a phone.",
      "Forms, tracking, or integrations quietly stopped working.",
      "An agency quote for a minor fix costs more than the fix.",
    ],
    faqs: [
      {
        question: "What kind of website work can a developer handle?",
        answer:
          "Building and updating pages, landing pages for campaigns, connecting forms and integrations, fixing broken functionality, improving speed and mobile layout, and keeping platforms and plugins up to date.",
      },
      {
        question: "Can a developer maintain a site someone else built?",
        answer:
          "Usually, yes. We'd look at what the site is built on first and tell you honestly what can be maintained and what would be better rebuilt.",
      },
      {
        question: "Do you build sites from scratch or only maintain them?",
        answer:
          "Both. A new build is normally scoped as a project with a defined outcome and a handover; ongoing maintenance works better as a monthly arrangement.",
      },
    ],
    relatedServices: ["project-operations", "gohighlevel"],
    keywords: [
      "website developer Philippines",
      "hire a website developer",
      "remote web developer",
      "website maintenance virtual assistant",
      "full stack developer Philippines",
    ],
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export function getServiceByPageSlug(pageSlug: string): Service | undefined {
  return services.find((s) => s.pageSlug === pageSlug);
}

/** The four headline services shown on the homepage preview. */
export const featuredServiceSlugs = [
  "gohighlevel",
  "executive",
  "marketing",
  "social-media",
];
