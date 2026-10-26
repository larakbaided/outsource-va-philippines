import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { Hero } from "@/components/sections/Hero";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { BusinessProblem } from "@/components/sections/BusinessProblem";
import { ServicesPreview } from "@/components/sections/ServicesPreview";
import { WhyWorkWithUs } from "@/components/sections/WhyWorkWithUs";
import { FeaturedTestimonials } from "@/components/sections/FeaturedTestimonials";
import { FeaturedTalent } from "@/components/sections/FeaturedTalent";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { IndustriesSection } from "@/components/sections/IndustriesSection";
import { EngagementSection } from "@/components/sections/EngagementSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { BlogPreview } from "@/components/sections/BlogPreview";
import { FinalCtaSection } from "@/components/sections/FinalCtaSection";

export const metadata: Metadata = buildMetadata({ path: "/" });

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <BusinessProblem />
      <ServicesPreview />
      <WhyWorkWithUs />
      {/*
        Social proof directly after our own claims about ourselves, and before
        we introduce individual professionals. Replaces the old text-only
        TestimonialsSection, which sat far lower and never rendered — it had no
        approved testimonials to show.
      */}
      <FeaturedTestimonials />
      <FeaturedTalent />
      <ProcessSection />
      <IndustriesSection tone="muted" />
      <EngagementSection tone="default" />
      <FaqSection />
      <BlogPreview tone="muted" />
      <FinalCtaSection />
    </>
  );
}
