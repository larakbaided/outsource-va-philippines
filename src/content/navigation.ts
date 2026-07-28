/**
 * Site navigation. Editing labels/hrefs here updates the header, mobile menu,
 * and footer navigation. Keep hrefs in sync with the App Router folder names.
 */

export type NavItem = {
  label: string;
  href: string;
};

/**
 * Primary header navigation.
 *
 * Blog is deliberately absent: it is reached from the footer's Company column
 * and from the homepage's "Latest from the blog" section, so repeating it here
 * spent one of the few header slots on a link that already had two entry
 * points. /blog is unaffected — still built, still in the sitemap, still
 * crawlable.
 */
export const mainNav: NavItem[] = [
  { label: "Services", href: "/services" },
  { label: "Industries", href: "/industries" },
  { label: "Pricing", href: "/pricing" },
  { label: "Our Talent", href: "/our-talent" },
  { label: "Testimonials", href: "/testimonial" },
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
      { label: "Why Filipino VAs", href: "/why-hire-filipino-virtual-assistants" },
      { label: "Our Talent", href: "/our-talent" },
      { label: "Client Testimonials", href: "/testimonial" },
      { label: "Industries", href: "/industries" },
      { label: "Blog", href: "/blog" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Services",
    items: [
      { label: "GoHighLevel VA", href: "/services/gohighlevel-virtual-assistant" },
      { label: "GoHighLevel Onboarding", href: "/services/gohighlevel-onboarding" },
      { label: "Executive Assistant", href: "/services/executive-assistant" },
      { label: "Digital Marketing", href: "/services/digital-marketing-support" },
      { label: "Social Media", href: "/services/social-media-management" },
    ],
  },
  {
    title: "Get Started",
    items: [
      { label: "Pricing", href: "/pricing" },
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
