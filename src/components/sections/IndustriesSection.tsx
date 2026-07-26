import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { Badge } from "@/components/ui/badge";
import { industries, getIndustryPageByName } from "@/content/industries";

export function IndustriesSection({
  tone = "default",
}: {
  tone?: "default" | "muted";
}) {
  return (
    <Section tone={tone}>
      <SectionHeading
        eyebrow="Who we support"
        title="Industries we commonly serve."
        description="We support a wide range of growing businesses. If you don't see yours listed, it's still worth a conversation."
        align="center"
      />

      <div className="mx-auto mt-10 flex max-w-3xl flex-wrap justify-center gap-2.5">
        {industries.map((industry, i) => {
          const page = getIndustryPageByName(industry);
          return (
            <Reveal key={industry} delay={i * 40}>
              {page ? (
                <Link href={`/industries/${page.slug}`}>
                  <Badge
                    variant="default"
                    size="md"
                    className="bg-surface transition-colors hover:border-accent/40 hover:text-accent-strong"
                  >
                    {industry}
                  </Badge>
                </Link>
              ) : (
                <Badge variant="default" size="md" className="bg-surface">
                  {industry}
                </Badge>
              )}
            </Reveal>
          );
        })}
      </div>

      <div className="mt-8 text-center">
        <Link
          href="/industries"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-accent-strong transition-colors hover:text-accent"
        >
          Explore industries we serve
          <ArrowRight className="size-4" />
        </Link>
      </div>
    </Section>
  );
}
