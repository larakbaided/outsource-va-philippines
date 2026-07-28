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
 * The header has room for roughly eight items before the row stops fitting, so
 * what is NOT here is deliberate:
 *
 *   - Blog lives in the footer's Company column and in the homepage's "Latest
 *     from the blog" section.
 *   - Pricing lives in the footer's Get Started column, alongside the booking
 *     and inquiry links it belongs with.
 *
 * Both routes are unaffected — still built, still in the sitemap, still
 * crawlable, still linked from elsewhere in the page body.
 *
 * Home points at "/". Header.tsx's `isActive` already compares "/" by exact
 * match rather than prefix, so it highlights only on the homepage instead of
 * on every page of the site.
 */
export const mainNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Industries", href: "/industries" },
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
