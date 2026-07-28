import { services } from "@/content/services";
import type { Testimonial } from "@/content/testimonials";

export type ServiceLink = { href: string; label: string };

/**
 * A testimonial with its `relatedServices` slugs already resolved to real
 * links.
 *
 * This resolution happens on the server on purpose. The card and the filter
 * grid are client components, and services.ts carries every word of copy for
 * all thirteen service pages — importing it from the client would ship all of
 * that to the browser to render a handful of link labels. Server components
 * build these views and pass down only `{ href, label }`.
 */
export type TestimonialView = Testimonial & { relatedLinks: ServiceLink[] };

/**
 * Resolve one testimonial's related-service slugs into links.
 *
 * Unknown slugs are dropped rather than rendered as a dead link, so a typo or
 * a renamed service page degrades to one fewer link instead of a 404.
 */
export function toTestimonialView(testimonial: Testimonial): TestimonialView {
  const relatedLinks = (testimonial.relatedServices ?? []).flatMap((slug) => {
    const service = services.find((s) => s.pageSlug === slug);
    return service
      ? [{ href: `/services/${service.pageSlug}`, label: service.shortTitle }]
      : [];
  });

  return { ...testimonial, relatedLinks };
}

export function toTestimonialViews(items: Testimonial[]): TestimonialView[] {
  return items.map(toTestimonialView);
}
