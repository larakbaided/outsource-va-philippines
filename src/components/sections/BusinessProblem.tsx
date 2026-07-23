import { ArrowRight } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { businessProblem } from "@/content/home";

export function BusinessProblem() {
  return (
    <Section tone="muted">
      <SectionHeading
        eyebrow="The problem"
        title={businessProblem.heading}
        align="center"
      />

      <div className="mx-auto mt-10 grid max-w-3xl gap-3 sm:grid-cols-2">
        {businessProblem.problems.map((problem, i) => (
          <Reveal
            key={problem}
            delay={i * 50}
            className="flex items-start gap-3 rounded-xl border border-border bg-surface p-4"
          >
            <span
              aria-hidden="true"
              className="mt-1.5 size-1.5 shrink-0 rounded-full bg-terracotta"
            />
            <p className="text-sm leading-relaxed text-foreground/80">{problem}</p>
          </Reveal>
        ))}
      </div>

      <Reveal className="mx-auto mt-10 flex max-w-2xl items-center justify-center gap-3 text-center">
        <ArrowRight className="hidden size-5 shrink-0 text-accent-strong sm:block" />
        <p className="text-lg font-medium text-foreground">
          {businessProblem.transition}
        </p>
      </Reveal>
    </Section>
  );
}
