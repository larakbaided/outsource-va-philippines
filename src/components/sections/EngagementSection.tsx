import { Check } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ConsultationButton } from "@/components/ConsultationButton";
import { engagementOptions, engagementNote } from "@/content/engagement";

export function EngagementSection({
  tone = "muted",
}: {
  tone?: "default" | "muted";
}) {
  return (
    <Section tone={tone} id="engagement">
      <SectionHeading
        eyebrow="Ways to work together"
        title="Flexible engagement options."
        description="Choose the arrangement that fits your needs today — and adjust as your business grows."
      />

      <div className="mt-10 grid gap-5 lg:grid-cols-3">
        {engagementOptions.map((option, i) => (
          <Reveal key={option.slug} delay={i * 70} className="h-full">
            <Card className="flex h-full flex-col p-6 sm:p-7">
              <h3 className="text-xl font-medium">{option.name}</h3>
              {option.price ? (
                <p className="mt-1 text-accent-strong">{option.price}</p>
              ) : (
                <Badge variant="outline" size="sm" className="mt-2 w-fit">
                  Pricing discussed on consultation
                </Badge>
              )}
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {option.description}
              </p>

              <ul className="mt-5 flex-1 space-y-2.5">
                {option.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-2 text-sm">
                    <Check className="mt-0.5 size-4 shrink-0 text-accent-strong" />
                    <span className="text-foreground/80">{h}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6">
                <ConsultationButton
                  source={`engagement-${option.slug}`}
                  variant="outline"
                  className="w-full"
                >
                  Discuss Your Needs
                </ConsultationButton>
              </div>
            </Card>
          </Reveal>
        ))}
      </div>

      <p className="mt-6 text-sm text-muted-foreground">{engagementNote}</p>
    </Section>
  );
}
