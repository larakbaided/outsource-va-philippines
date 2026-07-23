import Link from "next/link";
import { Section, SectionHeading } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { TalentCarousel } from "@/components/talent/TalentCarousel";
import { team } from "@/content/team";

export function FeaturedTalent() {
  return (
    <Section tone="muted" id="talent">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <SectionHeading
          eyebrow="Our talent"
          title="Meet the founding professionals."
          description="Experienced specialists across GoHighLevel, executive support, marketing, and social media — ready to be matched to businesses like yours."
          className="max-w-2xl"
        />
        <Button asChild variant="outline" className="hidden shrink-0 sm:inline-flex">
          <Link href="/our-talent">View all talent</Link>
        </Button>
      </div>

      <div className="mt-10">
        <TalentCarousel members={team} />
      </div>

      <div className="mt-8 sm:hidden">
        <Button asChild variant="outline" className="w-full">
          <Link href="/our-talent">View all talent</Link>
        </Button>
      </div>
    </Section>
  );
}
