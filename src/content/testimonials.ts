/**
 * =========================================================================
 * CLIENT TESTIMONIALS
 * -------------------------------------------------------------------------
 * Migrated from the previous business site, virtualassistph.co/client-testimonials.
 * Every name, company, role, service, tool, quote and video URL below came
 * from that page. NOTHING here is invented.
 *
 * Editing rules — read before touching this file:
 *   - Never add a testimonial that a client has not actually given.
 *   - Never add a rating, star score, review count or date. None were
 *     recorded on the source page, and inventing them would be both
 *     dishonest and a structured-data violation.
 *   - `services` and `tools` describe what OUR side delivered (the source
 *     page labelled these "My Role:" and "Tools I Use:" from Lara's
 *     perspective). They are not the client's own job description.
 *   - `clientRole` is only set where the client stated their own title out
 *     loud in their testimonial. Where they did not, it stays undefined —
 *     we do not infer titles from photographs, logos or email signatures.
 *
 * Transcript fidelity: `fullQuote` preserves what each client said. Only
 * obvious transcription slips were corrected — a misspelled name ("Laura"
 * for Lara), a stray full stop mid-sentence, company-name capitalisation.
 * Wording, meaning and emphasis are untouched. See MIGRATION NOTES at the
 * bottom of this file for the exact per-testimonial list.
 *
 * VIDEO HOSTING: self-hosted. The four videos live in /public/testimonials,
 * re-encoded from the originals — see MIGRATION NOTES 4. Nothing depends on
 * the old virtualassistph.co domain any more, so retiring it is safe.
 * =========================================================================
 */

/** Filter categories. Only categories backed by a real testimonial exist. */
export const testimonialCategories = [
  "GoHighLevel & CRM",
  "Executive Support",
  "Digital Marketing",
  "Social Media",
  "Content & Creative",
  "Operations",
] as const;

export type TestimonialCategory = (typeof testimonialCategories)[number];

export type Testimonial = {
  /** URL-safe id. Used for React keys and modal labelling. */
  id: string;
  clientName: string;
  /** Omitted when the source page listed no company. */
  company?: string;
  /** Only when the client stated their own title in the testimonial. */
  clientRole?: string;
  /** What we delivered for them. */
  services: string[];
  /** Tools used on the engagement. */
  tools: string[];
  /** Contiguous excerpt pulled from fullQuote — never stitched together. */
  shortQuote: string;
  /** The client's full testimonial. */
  fullQuote: string;
  /** Path under /public. Undefined for written-only testimonials. */
  videoUrl?: string;
  /**
   * MIME type, used to ask the browser up front whether it can decode this
   * file. Only MP4 is permitted: the original Josh P. recording was a
   * QuickTime .mov, and measurement showed neither Chrome nor Firefox can
   * decode that container. Narrowing the type here stops that mistake
   * returning. Convert to H.264 MP4 before adding anything new.
   */
  videoType?: "video/mp4";
  /**
   * Path under /public. Optional: a client may be happy for their words to be
   * published but not their photograph. TestimonialCard renders a quote-led
   * card with no media frame when this is absent.
   */
  clientImage?: string;
  categories: TestimonialCategory[];
  /** Shown in the homepage section. */
  featured?: boolean;
  sortOrder: number;
  /** `pageSlug` values from services.ts, for contextual internal links. */
  relatedServices?: string[];
};

export const testimonials: Testimonial[] = [
  {
    id: "josh-p",
    clientName: "Josh P.",
    company: "The Sustainable Business",
    clientRole: "Owner",
    services: ["Landing Page Designer", "Personal Assistant"],
    tools: ["Go High Level", "Descript", "Ruzuku", "Canva", "Synthesia / Pictory.ai"],
    shortQuote: "She has exceeded my expectations at every step along the way.",
    fullQuote:
      "Hi, this is Josh Patrick and I am the owner of The Sustainable Business. I've had Lara working with me for about the last three months, and she has been just incredible. Before she came on board, I was struggling with getting landing pages done, sales pages done, content being put out appropriately for our clients, and building a membership site.\n\nShe has been instrumental in helping all of those things become real. So I highly recommend her. If you're considering her, I don't think you'll be disappointed. In fact, I think you'll be thrilled. She has exceeded my expectations at every step along the way, so I hope you hire her and good luck.",
    videoUrl: "/testimonials/josh-p.mp4",
    videoType: "video/mp4",
    clientImage: "/testimonials/josh-p.webp",
    categories: ["GoHighLevel & CRM", "Digital Marketing", "Executive Support"],
    featured: true,
    sortOrder: 1,
    relatedServices: [
      "gohighlevel-virtual-assistant",
      "website-developer",
      "digital-marketing-support",
    ],
  },
  {
    id: "kingsley-n",
    clientName: "Kingsley N.",
    company: "Harrington Financial",
    clientRole: "Director",
    services: [
      "Admin Assistant",
      "Social Media Manager",
      "Social Media Outreach Specialist",
    ],
    tools: ["Meta Business Suite", "Canva", "Google Spreadsheets", "SpareRoom"],
    shortQuote:
      "Lara has been with us for about 9-10 months and has been transformative for our business.",
    fullQuote:
      "Hi, I'm Kingsley, Director of Harrington Capital. Lara has been with us for about 9-10 months and has been transformative for our business.\n\nBefore Lara, managing our rapid growth and daily operations was challenging. Lara, recommended by a trusted associate, immediately proved invaluable. She organized our spreadsheets, email inboxes, and folders, and implemented effective routines that streamlined our workflow.\n\nHer skills allowed us to better manage clients and attract new business through creative social media outreach. Lara is reliable, organized, professional, and friendly. I highly recommend her for her outstanding work and contributions. Thank you, Lara.",
    videoUrl: "/testimonials/kingsley-n.mp4",
    videoType: "video/mp4",
    clientImage: "/testimonials/kingsley-n.webp",
    categories: ["Executive Support", "Operations", "Social Media"],
    featured: true,
    sortOrder: 2,
    relatedServices: [
      "administrative-virtual-assistant",
      "social-media-management",
    ],
  },
  {
    id: "joshua-w",
    clientName: "Joshua W.",
    company: "Wenner Ventures, Inc.",
    services: ["Personal Assistant", "Social Media Manager", "Video Editor"],
    tools: [
      "Meta Business Suite",
      "Canva",
      "Submagic",
      "CapCut",
      "Google Spreadsheets",
    ],
    shortQuote:
      "She makes working with a virtual assistant effortless and has significantly improved my workflow.",
    fullQuote:
      "Hi, I'm Joshua from Wenner Ventures, Inc. Hiring Lara as my personal assistant has been a game changer. Previously, I struggled with assistants who needed extensive guidance. Lara, however, quickly learned and excelled.\n\nShe handles content editing and scheduling across all my platforms seamlessly. Beyond that, she manages various other tasks with ease. Lara is a self-starter, incredibly responsive, compassionate, and an excellent communicator. She makes working with a virtual assistant effortless and has significantly improved my workflow.\n\nI highly recommend Lara for her outstanding skills and professionalism.",
    videoUrl: "/testimonials/joshua-w.mp4",
    videoType: "video/mp4",
    clientImage: "/testimonials/joshua-w.webp",
    categories: ["Social Media", "Content & Creative", "Executive Support"],
    featured: true,
    sortOrder: 3,
    relatedServices: ["social-media-management", "executive-assistant"],
  },
  {
    id: "paul-x",
    clientName: "Paul X.",
    company: "Contentcreator.com",
    services: ["Content Writing", "Course Creation"],
    tools: [
      "Kajabi",
      "SurferSEO / Semrush",
      "Slack",
      "Canva",
      "Meta Business Suite",
    ],
    shortQuote:
      "Her communication and writing skills are top-notch, and she was a joy to work with.",
    fullQuote:
      "Hi, my name is Paul Xavier from Content Creator.com. Lara Katrina worked with us for six months on a blogging project, and she absolutely excelled. Her communication and writing skills are top-notch, and she was a joy to work with.\n\nI would definitely hire Lara again. She learns quickly and communicates exceptionally well, which was crucial for our project. She also did great graphic design work and effectively used AI tools for writing. Overall, Lara is a fantastic team member, and I highly recommend her.",
    // No `videoUrl` — his video was withdrawn. Photograph retained. See
    // MIGRATION NOTES 5.
    clientImage: "/testimonials/paul-x.webp",
    categories: ["Content & Creative", "Digital Marketing"],
    sortOrder: 4,
    relatedServices: ["digital-marketing-support"],
  },
  {
    id: "drikus-c",
    clientName: "Drikus C.",
    company: "Strong Jaw LLC",
    services: [
      "Social Media Management",
      "Graphic Designer",
      "Photo and Video Editor",
    ],
    tools: ["Figma", "Notion", "Slack", "Canva", "Meta Business Suite"],
    shortQuote:
      "Her expertise in creative design, video editing, and script creation has made a huge difference.",
    fullQuote:
      "Before Lara, we struggled to complete tasks promptly. Her expertise in creative design, video editing, and script creation has made a huge difference.\n\nLara's efficiency and attention to detail have consistently helped us meet deadlines and maintain high-quality output. Her proactive approach and willingness to tackle new challenges have been invaluable. She has been a tremendous asset to Strongjaw LLC, and I am grateful for her outstanding work.",
    videoUrl: "/testimonials/drikus-c.mp4",
    videoType: "video/mp4",
    clientImage: "/testimonials/drikus-c.webp",
    categories: ["Social Media", "Content & Creative"],
    sortOrder: 5,
    relatedServices: ["social-media-management"],
  },
  {
    id: "jerry-y",
    clientName: "Jerry Y.",
    services: [
      "Executive Assistant",
      "Photo and Video Editor",
      "Landing Page Editor",
    ],
    tools: [
      "Go High Level",
      "Canva",
      "Google Workspace",
      "CapCut",
      "Meta Business Suite",
    ],
    shortQuote: "Working with Lara as my Executive Assistant was a game-changer.",
    fullQuote:
      "Working with Lara as my Executive Assistant was a game-changer. She is incredibly organized, detail-oriented, and manages tasks with remarkable efficiency. She did calendar management, travel booking, and content creation such as video and photo editing.\n\nLara's exceptional communication skills made coordination effortless, and her quick learning ability allowed her to handle complex projects seamlessly. I am always telling her how I can help her to improve her skills more because she has potential. Her professionalism and positive attitude were invaluable!",
    clientImage: "/testimonials/jerry-y.webp",
    categories: ["Executive Support", "GoHighLevel & CRM", "Content & Creative"],
    sortOrder: 6,
    relatedServices: ["executive-assistant", "gohighlevel-virtual-assistant"],
  },
  {
    id: "almira-b",
    clientName: "Almira B.",
    services: [
      "Social Media Manager",
      "Personal Assistant",
      "Landing Page Editor",
    ],
    tools: ["Kajabi", "Canva", "Slack", "Meta Business Suite", "CapCut"],
    shortQuote:
      "She asks all the right questions, and will figure out solutions to the complexities in my business.",
    fullQuote:
      "Lara is absolutely fabulous. She asks all the right questions, and will figure out solutions to the complexities in my business.\n\nShe's also forward thinking, and when she delivers her work to me, she has thought through it, anticipates my needs, and provides everything in a way that is easy to use, and simplifies and systemizes my business.\n\nShe is also fantastic at creating graphics and social media content. My Instagram grid looks amazing!\n\nI'm absolutely thrilled with Lara and highly recommend her.",
    clientImage: "/testimonials/almira-b.webp",
    categories: ["Social Media", "Executive Support", "Digital Marketing"],
    sortOrder: 7,
    relatedServices: ["social-media-management", "executive-assistant"],
  },
];

/** Display order for every list on the site. */
export const orderedTestimonials = [...testimonials].sort(
  (a, b) => a.sortOrder - b.sortOrder,
);

/** The subset shown on the homepage. */
export const featuredTestimonials = orderedTestimonials.filter(
  (t) => t.featured,
);

/**
 * Categories that actually have at least one testimonial, in the canonical
 * order above. Derived rather than hardcoded so a filter can never render
 * with an empty result set.
 */
export const activeTestimonialCategories = testimonialCategories.filter(
  (category) => testimonials.some((t) => t.categories.includes(category)),
);

/** Distinct services across all testimonials — used for the page's trust row. */
export const testimonialServiceTags = Array.from(
  new Set(orderedTestimonials.flatMap((t) => t.services)),
).sort((a, b) => a.localeCompare(b));

/** How the client is described beneath their name. Never returns a stray comma. */
export function testimonialAttribution(t: Testimonial): string {
  return [t.clientRole, t.company].filter(Boolean).join(", ");
}

/**
 * =========================================================================
 * MIGRATION NOTES — virtualassistph.co/client-testimonials → /testimonial
 * -------------------------------------------------------------------------
 * 1. Text corrections applied (transcription slips only, meaning untouched):
 *    - Josh P.: "Josh Patrick and. I am the owner" → removed the stray full
 *      stop. "the sustainable business" → "The Sustainable Business".
 *      "Laura" → "Lara". A sentence fragment ("...sales pages done. Content
 *      being put out...") was rejoined with commas. The source was also
 *      missing its closing quotation mark.
 *    - Paul X.: "Laura" → "Lara" (twice). His spoken rendering of the brand,
 *      "Content Creator.com", is left as he said it; the company field uses
 *      the source page's own label, "Contentcreator.com".
 *    - Almira B.: stripped `&nbsp;` artifacts left by the old editor.
 *    - Kingsley N., Joshua W., Drikus C., Jerry Y.: no changes needed.
 *
 * 2. Known inconsistencies in the SOURCE data, deliberately preserved:
 *    - Kingsley N. is labelled "Harrington Financial" on the source page but
 *      says "Director of Harrington Capital" in his testimonial. Both are
 *      kept as they were given. Worth confirming with him which is correct.
 *    - Drikus C. is labelled "Strong Jaw LLC"; he says "Strongjaw LLC".
 *
 * 3. Deliberately absent data:
 *    - Almira B. and Jerry Y. had no company on the source page, so they have
 *      no `company`. Jerry's photograph shows a "Next Level Physio" shirt;
 *      that is NOT evidence of his employer and has not been recorded.
 *    - Paul X. has no video — withdrawn, see note 5. He does have a photograph.
 *    - Joshua W., Paul X. and Drikus C. never state their own job title, so
 *      they have no `clientRole`.
 *    - No dates, durations, ratings or view counts existed on the source page.
 *
 * 4. Media:
 *    - Five of the seven testimonials have video. Almira B. and Jerry Y. were
 *      written-only on the source page and remain so here.
 *    - The source page's five `poster` images were already dead (HTTP 404 on
 *      virtualassistph.co) before this migration, so no posters carried over.
 *      Cards use the client's own photograph as the video preview instead.
 *    - Client photographs WERE migrated and now live in /public/testimonials
 *      as 800x1000 WebP, so they are served by this project, not the old site.
 *    - Videos are self-hosted too, re-encoded from the originals on
 *      2026-07-28 with ffmpeg 8.1.2. H.264 MP4, capped at 1280px wide with no
 *      upscaling, CRF 25, +faststart so playback begins before the download
 *      finishes. Audio streams were copied rather than re-encoded: all four
 *      were already AAC, so a re-encode would have lost quality for nothing.
 *
 *        josh-p       73.3 MB -> 3.7 MB   1920x1080 -> 1280x720
 *        kingsley-n   37.8 MB -> 8.2 MB     848x480 unchanged (never upscale)
 *        joshua-w     36.9 MB -> 7.2 MB   1920x1080 -> 1280x720
 *        drikus-c     36.3 MB -> 8.4 MB   1920x1080 -> 1280x720
 *        total       175.8 MB -> 27.5 MB  (84% smaller)
 *
 *      Josh P.'s original was a 73 MB QuickTime at 11.75 Mbps — roughly
 *      twenty times the bitrate a 49-second talking head needs, which is why
 *      that one file shrank by 95% with no visible quality loss. It was also
 *      unplayable: canPlayType("video/quicktime") returns "" in both Chrome
 *      and Firefox. As MP4 it now plays everywhere, so his card no longer
 *      depends on the written fallback.
 *
 * 5. Paul X. — video withdrawn, photograph retained (2026-07-28):
 *    His video is not published. `videoUrl` and `videoType` are absent, so his
 *    card shows the "Written testimonial" treatment, and the file was never
 *    copied into this repository — the only remaining copy is the original on
 *    the old site.
 *
 *    His photograph and written testimonial are published. Both were briefly
 *    removed earlier the same day and the photograph was reinstated; it is
 *    regenerated from the same source and with the same settings as the other
 *    six, so it is 800x1000 WebP like the rest.
 *
 *    Do not publish his video without his explicit permission.
 * =========================================================================
 */
