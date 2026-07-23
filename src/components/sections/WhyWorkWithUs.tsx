import { Check, X } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { Card } from "@/components/ui/card";
import { whyWorkWithUs } from "@/content/home";

export function WhyWorkWithUs() {
  const { heading, description, independent, agency, disclaimer } = whyWorkWithUs;

  return (
    <Section>
      <SectionHeading eyebrow="Why work with us" title={heading} description={description} />

      <div className="mt-10 grid gap-5 lg:grid-cols-2">
        {/* Independent hiring */}
        <Reveal>
          <Card className="h-full border-dashed bg-surface-muted/40 p-6 sm:p-8">
            <h3 className="text-lg font-medium text-muted-foreground">
              {independent.title}
            </h3>
            <ul className="mt-5 space-y-3">
              {independent.points.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-terracotta/15 text-terracotta">
                    <X className="size-3.5" />
                  </span>
                  <span className="text-sm leading-relaxed text-muted-foreground">
                    {point}
                  </span>
                </li>
              ))}
            </ul>
          </Card>
        </Reveal>

        {/* Agency */}
        <Reveal delay={80}>
          <Card className="h-full border-accent/30 p-6 shadow-[var(--shadow-lift)] sm:p-8">
            <h3 className="text-lg font-medium text-foreground">{agency.title}</h3>
            <ul className="mt-5 space-y-3">
              {agency.points.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-success/15 text-success">
                    <Check className="size-3.5" />
                  </span>
                  <span className="text-sm leading-relaxed text-foreground/85">
                    {point}
                  </span>
                </li>
              ))}
            </ul>
          </Card>
        </Reveal>
      </div>

      <p className="mt-5 text-xs italic text-muted-foreground">{disclaimer}</p>
    </Section>
  );
}
