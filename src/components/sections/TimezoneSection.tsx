import { Clock } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { Card } from "@/components/ui/card";
import {
  timezoneSection,
  timezoneGroups,
  timezoneDisclaimer,
} from "@/content/timezone";

export function TimezoneSection({
  tone = "default",
}: {
  tone?: "default" | "muted";
}) {
  return (
    <Section tone={tone}>
      <SectionHeading
        eyebrow={timezoneSection.eyebrow}
        title={timezoneSection.heading}
        description={timezoneSection.description}
      />

      <div className="mt-10 grid gap-5 sm:grid-cols-3">
        {timezoneGroups.map((group, i) => (
          <Reveal key={group.region} delay={i * 70} className="h-full">
            <Card className="flex h-full flex-col p-6 sm:p-7">
              <span className="inline-flex items-center gap-2 text-sm font-medium uppercase tracking-[0.1em] text-accent-strong">
                <span aria-hidden="true">{group.flag}</span>
                {group.region}
              </span>
              <span className="mt-3 inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                <Clock className="size-3.5 shrink-0" aria-hidden="true" />
                {group.zones}
              </span>
              <p className="mt-4 text-sm leading-relaxed text-foreground/80">
                {group.note}
              </p>
            </Card>
          </Reveal>
        ))}
      </div>

      <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
        {timezoneDisclaimer}
      </p>
    </Section>
  );
}
