import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { Badge } from "@/components/ui/badge";
import { industries } from "@/content/industries";

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
        {industries.map((industry, i) => (
          <Reveal key={industry} delay={i * 40}>
            <Badge variant="default" size="md" className="bg-surface">
              {industry}
            </Badge>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
