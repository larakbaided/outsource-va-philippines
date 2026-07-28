import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { Section, SectionHeading } from "@/components/ui/section";
import { PageHeader } from "@/components/layout/PageHeader";
import { FinalCtaSection } from "@/components/sections/FinalCtaSection";
import { BreadcrumbSchema } from "@/components/seo/JsonLd";
import { TestimonialDirectory } from "@/components/testimonials/TestimonialDirectory";
import {
  orderedTestimonials,
  testimonialServiceTags,
} from "@/content/testimonials";
import { toTestimonialViews } from "@/lib/testimonials";

export const metadata: Metadata = buildMetadata({
  path: "/testimonial",
  title: "Client Testimonials",
  description:
    "Hear from businesses that have worked with experienced Filipino virtual assistants across GoHighLevel, executive support, marketing, social media, and operations.",
});

/**
 * Structured data on this page is deliberately limited to BreadcrumbList.
 *
 * VideoObject is omitted: Google requires `uploadDate` and a real
 * `thumbnailUrl` for video results, and neither exists for these files. The
 * source page recorded no publish dates, and its poster images were already
 * 404. Emitting a VideoObject with invented dates or a portrait photograph
 * standing in as a thumbnail would be exactly the kind of fabricated markup
 * that earns a manual action.
 *
 * Review / AggregateRating is omitted as well. These are reviews of us,
 * published by us, which Google classes as self-serving and excludes from
 * review rich results — and no client ever gave a numeric rating to aggregate.
 * The testimonials are marked up as ordinary quoted content, which is what
 * they are. Organization and WebSite schema already come from the marketing
 * layout.
 */
export default function TestimonialPage() {
  const items = toTestimonialViews(orderedTestimonials);
  const videoCount = orderedTestimonials.filter((t) => t.videoUrl).length;

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Client Testimonials", path: "/testimonial" },
        ]}
      />

      <PageHeader
        eyebrow="Client Success Stories"
        title="Real support. Real partnerships. Real client experiences."
        description="Discover how experienced Filipino virtual professionals have helped businesses organise their systems, strengthen their marketing, manage day-to-day operations, and move important work forward."
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Client Testimonials", href: "/testimonial" },
        ]}
      >
        {/*
          Both figures are counted from the testimonial data at build time, so
          they cannot drift from what is actually on the page — and there is no
          rounded-up "clients served" number here, because we have no verified
          source for one.
        */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-muted-foreground">
          <span className="font-medium text-foreground">
            {orderedTestimonials.length} client testimonials
          </span>
          <span aria-hidden="true" className="text-border">
            |
          </span>
          <span>{videoCount} recorded on video</span>
        </div>

        {/*
          The full breadth of work, as one line of text rather than thirteen
          badges. As badges this wrapped to seven rows at 390px and pushed the
          testimonials themselves below the fold, which is the opposite of the
          restrained trust cue this slot is for. Every service still appears as
          a badge on the card of the client it was delivered for, which is
          where it actually means something.
        */}
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          <span className="text-foreground/80">Support delivered across: </span>
          {testimonialServiceTags.join(", ")}.
        </p>
      </PageHeader>

      <Section>
        <SectionHeading
          eyebrow="The collection"
          title="Every testimonial, in the client's own words."
          description="Filter by the kind of support each business needed. Play a video to hear it directly, or read the full written testimonial on any card."
        />
        <div className="mt-10">
          <TestimonialDirectory items={items} />
        </div>
      </Section>

      <FinalCtaSection
        heading="Build the support system your business needs to grow."
        description="Tell us what is taking up your time, what is falling behind, and which skills would make the biggest difference in your business."
      />
    </>
  );
}
