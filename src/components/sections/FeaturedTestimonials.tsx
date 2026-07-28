import Link from "next/link";
import { Section, SectionHeading } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { TestimonialCard } from "@/components/testimonials/TestimonialCard";
import { featuredTestimonials } from "@/content/testimonials";
import { toTestimonialViews } from "@/lib/testimonials";

/**
 * Homepage social proof. Sits between "Why Work With Us" and "Our Talent": the
 * visitor has just read our claims about ourselves, so client voices belong
 * here, before we ask them to look at individual professionals.
 *
 * Three testimonials, not all seven — enough to be credible without pushing
 * the rest of the homepage down. The full collection lives at /testimonial.
 * Which three is controlled by `featured` in content/testimonials.ts, chosen
 * to span CRM and landing pages, executive and operations support, and social
 * and content work rather than three variations on the same capability.
 *
 * Layout deliberately mirrors FeaturedTalent — heading left, outline link
 * right on desktop, full-width button underneath on mobile.
 */
export function FeaturedTestimonials({
  tone = "default",
}: {
  tone?: "default" | "muted";
}) {
  // Never render an empty section, and never fabricate the social proof that
  // would fill it.
  if (featuredTestimonials.length === 0) return null;

  const items = toTestimonialViews(featuredTestimonials);

  return (
    <Section tone={tone} id="testimonials">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <SectionHeading
          eyebrow="Client Testimonials"
          title="Trusted by businesses that needed dependable support."
          description="Hear directly from the clients who have worked with our virtual professionals across CRM automation, executive support, digital marketing, social media, content, and business operations."
        />
        <Button asChild variant="outline" className="hidden shrink-0 sm:inline-flex">
          <Link href="/testimonial">View all testimonials</Link>
        </Button>
      </div>

      <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {items.map((testimonial, i) => (
          <Reveal key={testimonial.id} delay={i * 60} className="h-full">
            <TestimonialCard testimonial={testimonial} />
          </Reveal>
        ))}
      </div>

      <div className="mt-8 sm:hidden">
        <Button asChild variant="outline" className="w-full">
          <Link href="/testimonial">View all testimonials</Link>
        </Button>
      </div>
    </Section>
  );
}
