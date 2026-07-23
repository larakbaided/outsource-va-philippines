/**
 * Testimonials.
 *
 * NO FAKE TESTIMONIALS. `testimonials` is intentionally empty. When real,
 * approved testimonials are provided, add them here and the placeholder
 * development notice in the Testimonials section will stop showing.
 *
 * Shape for when you add real ones:
 *   { quote, name, position, company, image? }
 */

export type Testimonial = {
  quote: string;
  name: string;
  position: string;
  company: string;
  /** Optional path under /public for a client photo or logo. */
  image?: string;
};

export const testimonials: Testimonial[] = [];

/** Shown while no approved testimonials exist. Remove logic once populated. */
export const testimonialsPlaceholderNotice =
  "Approved client testimonials will be added here.";
