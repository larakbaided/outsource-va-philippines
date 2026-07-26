/**
 * =========================================================================
 * CENTRAL BUSINESS CONFIGURATION
 * -------------------------------------------------------------------------
 * Edit this file to update brand-wide information. Values marked with the
 * `PLACEHOLDER — ...` prefix must be reviewed and replaced with approved,
 * legally-correct business details before launch.
 *
 * A non-technical editor can safely change the text values here.
 * =========================================================================
 */

export const site = {
  /** Public-facing brand name. Do NOT abbreviate to "OVAP" unless approved. */
  name: "Outsource VA Philippines",
  shortName: "Outsource VA Philippines",

  /** Primary brand message. */
  tagline: "The right virtual talent. The support your business deserves.",
  brandMessage:
    "Experienced Filipino virtual professionals, carefully matched to help your business operate, market, and grow more effectively.",
  description:
    "Outsource VA Philippines connects international businesses with experienced Filipino virtual professionals in GoHighLevel, digital marketing, executive support, social media, and business operations.",
  footerDescription:
    "Outsource VA Philippines connects international businesses with experienced Filipino virtual professionals in GoHighLevel, marketing, executive support, social media, and operations.",

  /** Consultation booking link — used by every "Book a Consultation" CTA. */
  calendlyUrl:
    process.env.NEXT_PUBLIC_CALENDLY_URL ||
    "https://calendly.com/work-larakatrina/30min",

  /** Production URL. PLACEHOLDER — set NEXT_PUBLIC_SITE_URL before launch. */
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://www.example.com",

  /* ----------------------------------------------------------------------
   * EDITABLE BUSINESS PLACEHOLDERS — replace with approved details.
   * -------------------------------------------------------------------- */
  legal: {
    /** Registered/legal business name (may differ from the public brand). */
    companyName: "Outsource VA Philippines",
    /** PLACEHOLDER — Registered business address. */
    address: "[Registered Business Address]",
    /** PLACEHOLDER — Public business email. */
    email: "[hello@your-domain.com]",
    /** PLACEHOLDER — Public business phone number. */
    phone: "[+00 000 000 0000]",
    /** PLACEHOLDER — Governing jurisdiction for Terms (e.g. "the Philippines"). */
    governingLaw: "[Governing Jurisdiction]",
  },

  founder: {
    name: "Lara",
    role: "Founder",
    title: "Digital Marketing Manager & GoHighLevel Expert",
  },

  /** Social links. Left empty on purpose — add real URLs to enable them. */
  social: {
    facebook: "",
    instagram: "",
    linkedin: "",
    tiktok: "",
    youtube: "",
  },

  /** Default social sharing / SEO copy. */
  seo: {
    homeTitle:
      "Filipino Virtual Assistants for US Businesses | Outsource VA Philippines",
    homeDescription:
      "Hire experienced Filipino virtual assistants for your US business. Specialists in GoHighLevel, executive support, CRM and marketing automation, social media, and admin — carefully matched and agency-supported.",
    socialTitle: "Reliable Filipino Virtual Assistants for Growing US Businesses",
    /**
     * Default social image. Points to the auto-generated OG image
     * (src/app/opengraph-image.tsx). To use a designed image instead, add
     * /public/og-image.png and set this to "/og-image.png".
     */
    ogImage: "/opengraph-image",
  },
} as const;

export type Site = typeof site;
