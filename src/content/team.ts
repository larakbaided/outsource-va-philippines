/**
 * =========================================================================
 * TEAM / TALENT DIRECTORY
 * -------------------------------------------------------------------------
 * The five founding professionals. Edit names, roles, bios, and skills here.
 *
 * IMPORTANT — profile images:
 *   Place final approved staff photos in /public/team/ using the filenames
 *   in `image` below (e.g. lara-profile.webp). Until real photos are provided,
 *   the UI renders an elegant initials avatar (see TalentAvatar). Generated or
 *   temporary images must NOT be presented as real photographs of the named
 *   person. `imageIsPlaceholder: true` keeps the avatar fallback active.
 * =========================================================================
 */

export type Specialty =
  | "GoHighLevel"
  | "Executive Support"
  | "Digital Marketing"
  | "Social Media";

export type TeamMember = {
  slug: string;
  name: string;
  /** Presentation used only to pick neutral pronouns in copy. */
  pronouns: "she/her" | "he/him" | "they/them";
  role: string;
  experience: string;
  /** Primary specialty used by the Our Talent filter. */
  specialty: Specialty;
  /** Additional specialties this person can also be filtered under. */
  alsoFilters?: Specialty[];
  shortBio: string;
  summary: string;
  strengths: string[];
  skills: string[];
  tools: string[];
  responsibilities: string[];
  services: string[];
  industries: string[];
  /** Path under /public. Rendered only when imageIsPlaceholder is false. */
  image: string;
  imageIsPlaceholder: boolean;
  /** Tailwind gradient classes for the temporary initials avatar. */
  avatarGradient: string;
};

export const team: TeamMember[] = [
  {
    slug: "lara",
    name: "Lara",
    pronouns: "she/her",
    role: "Digital Marketing Manager & GoHighLevel Expert",
    experience: "8 Years of Experience",
    specialty: "GoHighLevel",
    alsoFilters: ["Digital Marketing"],
    shortBio:
      "Lara helps businesses organize and improve their marketing systems, CRM processes, funnels, automations, client journeys, and digital operations. She combines technical GoHighLevel expertise with practical marketing and operations experience.",
    summary:
      "Lara leads Outsource VA Philippines and brings eight years of hands-on experience across digital marketing, CRM strategy, and GoHighLevel implementation. She understands both the technical systems that power a business and the day-to-day operations that keep it running, helping clients turn scattered tools into organized, dependable processes.",
    strengths: [
      "Translating business goals into working CRM systems",
      "Building funnels and automations that fit real workflows",
      "Bringing structure to marketing operations",
    ],
    skills: [
      "GoHighLevel",
      "CRM Strategy",
      "Workflow Automation",
      "Funnels",
      "Digital Marketing",
      "Email Marketing",
      "Website Management",
      "Systems Optimization",
    ],
    tools: [
      "GoHighLevel",
      "Zapier / Make",
      "Google Workspace",
      "Meta Business Suite",
      "Stripe",
      "WordPress",
    ],
    responsibilities: [
      "Map and improve CRM pipelines and client journeys",
      "Design marketing funnels and nurture automations",
      "Plan and coordinate campaigns end to end",
      "Optimize existing systems and integrations",
    ],
    services: [
      "GoHighLevel & CRM Support",
      "Digital Marketing Support",
      "Systems & Operations",
    ],
    industries: ["Coaches & Consultants", "Marketing Agencies", "Service Businesses"],
    image: "/team/lara-profile.webp",
    imageIsPlaceholder: false,
    avatarGradient: "from-[#1f3a2e] to-[#3d7a55]",
  },
  {
    slug: "cassie",
    name: "Cassie",
    pronouns: "she/her",
    role: "GoHighLevel Expert",
    experience: "4 Years of Experience",
    specialty: "GoHighLevel",
    shortBio:
      "Cassie supports businesses with reliable GoHighLevel implementation, including workflows, pipelines, calendars, forms, campaigns, and day-to-day CRM maintenance.",
    summary:
      "Cassie is a dependable GoHighLevel specialist who keeps CRM systems running smoothly. From building workflows and pipelines to configuring calendars, forms, and campaigns, she focuses on careful implementation and steady day-to-day maintenance so clients can trust their systems to work.",
    strengths: [
      "Meticulous workflow and pipeline building",
      "Reliable, well-tested CRM configuration",
      "Clear documentation of what was set up and why",
    ],
    skills: [
      "GoHighLevel",
      "Workflow Building",
      "Pipelines",
      "Calendar Setup",
      "Forms",
      "Email & SMS",
      "CRM Maintenance",
      "Testing",
    ],
    tools: ["GoHighLevel", "Twilio", "Google Calendar", "Zapier", "Slack"],
    responsibilities: [
      "Build and test GoHighLevel workflows and pipelines",
      "Configure calendars, forms, and surveys",
      "Set up email and SMS campaigns",
      "Maintain and troubleshoot CRM data",
    ],
    services: ["GoHighLevel & CRM Support"],
    industries: ["Coaches & Consultants", "Local Service Businesses", "Real Estate"],
    image: "/team/cassie-profile.webp",
    imageIsPlaceholder: false,
    avatarGradient: "from-[#9a7638] to-[#c07a5b]",
  },
  {
    slug: "wayne",
    name: "Wayne",
    pronouns: "he/him",
    role: "Executive Assistant",
    experience: "3 Years of Experience",
    specialty: "Executive Support",
    shortBio:
      "Wayne helps business owners stay organized by managing administrative responsibilities, schedules, communication, documentation, and important day-to-day priorities.",
    summary:
      "Wayne keeps busy business owners organized and on track. He manages the administrative details — schedules, inboxes, documentation, and follow-ups — so leaders can focus on the work that only they can do. Reliable and detail-oriented, he brings calm structure to a busy day.",
    strengths: [
      "Protecting the owner's time and focus",
      "Staying on top of details and deadlines",
      "Clear, professional client communication",
    ],
    skills: [
      "Executive Support",
      "Inbox Management",
      "Calendar Management",
      "Research",
      "Documentation",
      "Client Communication",
      "Task Management",
      "Administrative Support",
    ],
    tools: ["Google Workspace", "Microsoft 365", "Notion", "Asana", "Slack", "Calendly"],
    responsibilities: [
      "Manage inboxes and prioritize communication",
      "Coordinate calendars and meetings",
      "Prepare research, documents, and reports",
      "Track tasks and follow up on priorities",
    ],
    services: ["Executive & Administrative Support"],
    industries: ["Professional Services", "Healthcare & Wellness", "Startups"],
    image: "/team/wayne-profile.webp",
    imageIsPlaceholder: false,
    avatarGradient: "from-[#2c4a3a] to-[#8fa696]",
  },
  {
    slug: "joshua",
    name: "Joshua",
    pronouns: "he/him",
    role: "Social Media Manager",
    experience: "4 Years of Experience",
    specialty: "Social Media",
    shortBio:
      "Joshua helps brands maintain a consistent online presence through strategic content planning, scheduling, community support, reporting, and content coordination.",
    summary:
      "Joshua helps brands show up consistently online. He plans content, manages scheduling, supports community engagement, and reports on what's working — coordinating the moving pieces so a brand's social presence stays active, on-message, and organized.",
    strengths: [
      "Consistent, on-brand content planning",
      "Turning performance data into next steps",
      "Coordinating content across platforms",
    ],
    skills: [
      "Social Media Strategy",
      "Content Planning",
      "Scheduling",
      "Community Engagement",
      "Reporting",
      "Short-Form Content",
      "Brand Consistency",
      "Content Coordination",
    ],
    tools: ["Meta Business Suite", "Later", "Canva", "CapCut", "Google Analytics"],
    responsibilities: [
      "Plan and maintain content calendars",
      "Schedule and publish across platforms",
      "Support community engagement",
      "Report on performance and trends",
    ],
    services: ["Social Media Management"],
    industries: ["Personal Brands", "E-commerce", "Coaches & Consultants"],
    image: "/team/joshua-profile.webp",
    imageIsPlaceholder: false,
    avatarGradient: "from-[#1f3a2e] to-[#b08b4f]",
  },
  {
    slug: "cath",
    name: "Cath",
    pronouns: "she/her",
    role: "Social Media Manager",
    experience: "3 Years of Experience",
    specialty: "Social Media",
    shortBio:
      "Cath supports businesses with organized, on-brand social media content, publishing, engagement, and creative coordination across multiple platforms.",
    summary:
      "Cath brings order and creativity to social media. She builds content calendars, writes captions, schedules posts, and keeps engagement steady — coordinating creative work so a brand looks polished and consistent across every platform.",
    strengths: [
      "Organized content calendars and publishing",
      "On-brand captions and creative coordination",
      "Steady community engagement",
    ],
    skills: [
      "Content Calendars",
      "Caption Writing",
      "Social Scheduling",
      "Engagement",
      "Content Repurposing",
      "Basic Graphics",
      "Performance Tracking",
      "Brand Support",
    ],
    tools: ["Canva", "Later", "Meta Business Suite", "CapCut", "Google Drive"],
    responsibilities: [
      "Build and manage content calendars",
      "Write captions and schedule posts",
      "Repurpose content across formats",
      "Track performance and engagement",
    ],
    services: ["Social Media Management"],
    industries: ["E-commerce", "Local Service Businesses", "Personal Brands"],
    image: "/team/cath-profile.webp",
    imageIsPlaceholder: false,
    avatarGradient: "from-[#9a7638] to-[#3d7a55]",
  },
];

export function getTeamMember(slug: string): TeamMember | undefined {
  return team.find((m) => m.slug === slug);
}

export const specialties: Specialty[] = [
  "GoHighLevel",
  "Executive Support",
  "Digital Marketing",
  "Social Media",
];

/** Does a member match a specialty filter (primary or secondary)? */
export function memberMatchesSpecialty(m: TeamMember, s: Specialty): boolean {
  return m.specialty === s || (m.alsoFilters?.includes(s) ?? false);
}
