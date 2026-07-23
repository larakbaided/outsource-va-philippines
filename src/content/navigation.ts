/**
 * Site navigation. Editing labels/hrefs here updates the header, mobile menu,
 * and footer navigation. Keep hrefs in sync with the App Router folder names.
 */

export type NavItem = {
  label: string;
  href: string;
};

/** Primary header navigation. */
export const mainNav: NavItem[] = [
  { label: "Services", href: "/services" },
  { label: "Our Talent", href: "/our-talent" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

/** Primary consultation call-to-action shown in the header. */
export const primaryCta = {
  label: "Book a Consultation",
  navLabel: "Find Your Virtual Professional",
} as const;

/** Footer link columns. */
export const footerNav: { title: string; items: NavItem[] }[] = [
  {
    title: "Company",
    items: [
      { label: "About", href: "/about" },
      { label: "How It Works", href: "/how-it-works" },
      { label: "Our Talent", href: "/our-talent" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Services",
    items: [
      { label: "GoHighLevel & CRM", href: "/services#gohighlevel" },
      { label: "Executive Support", href: "/services#executive" },
      { label: "Digital Marketing", href: "/services#marketing" },
      { label: "Social Media", href: "/services#social-media" },
    ],
  },
  {
    title: "Get Started",
    items: [
      { label: "Book a Consultation", href: "/book" },
      { label: "Send an Inquiry", href: "/contact#inquiry" },
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms & Conditions", href: "/terms" },
    ],
  },
];

/** The announcement bar shown above the header. */
export const announcement = {
  message: "Now accepting new client partnerships.",
  linkLabel: "Book your consultation",
} as const;
