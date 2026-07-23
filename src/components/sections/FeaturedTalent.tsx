import Link from "next/link";
import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { TalentCard } from "@/components/cards/TalentCard";
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

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {team.map((member, i) => (
          <Reveal key={member.slug} delay={i * 60}>
            <TalentCard member={member} priority={i < 3} />
          </Reveal>
        ))}
      </div>

      <div className="mt-8 sm:hidden">
        <Button asChild variant="outline" className="w-full">
          <Link href="/our-talent">View all talent</Link>
        </Button>
      </div>
    </Section>
  );
}
