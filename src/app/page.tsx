import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { Hero } from "@/components/sections/Hero";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { BusinessProblem } from "@/components/sections/BusinessProblem";
import { ServicesPreview } from "@/components/sections/ServicesPreview";
import { WhyWorkWithUs } from "@/components/sections/WhyWorkWithUs";
import { FeaturedTalent } from "@/components/sections/FeaturedTalent";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { IndustriesSection } from "@/components/sections/IndustriesSection";
import { EngagementSection } from "@/components/sections/EngagementSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { FaqSection } from "@/components/sections/FaqSection";
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
      <FeaturedTalent />
      <ProcessSection />
      <IndustriesSection tone="muted" />
      <EngagementSection tone="default" />
      <TestimonialsSection tone="muted" />
      <FaqSection />
      <FinalCtaSection />
    </>
  );
}
