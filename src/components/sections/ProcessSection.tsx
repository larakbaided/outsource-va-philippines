"use client";

import * as React from "react";
import { Check } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";
import { ConsultationButton } from "@/components/ConsultationButton";
import { processSteps } from "@/content/process";
import { cn } from "@/lib/utils";

/**
 * Scroll-driven explainer: the step list scrolls past a sticky status card
 * that highlights the step currently in view and checks off everything
 * before it. An IntersectionObserver watching a thin band at mid-viewport
 * drives which step is "active" — no scroll-position math, so it stays
 * correct regardless of section height or viewport size.
 */
export function ProcessSection({
  tone = "default",
  showCta = true,
}: {
  tone?: "default" | "muted";
  showCta?: boolean;
}) {
  const [activeStep, setActiveStep] = React.useState(1);
  const stepRefs = React.useRef<(HTMLLIElement | null)[]>([]);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const step = Number(entry.target.getAttribute("data-step"));
            if (step) setActiveStep(step);
          }
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );
    for (const el of stepRefs.current) {
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <Section tone={tone} id="how-it-works">
      <SectionHeading
        eyebrow="How it works"
        title="A clear, five-step path to the right support."
        description="No guesswork and no pressure — just an organized process designed to find a professional who genuinely fits your business."
      />

      <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_22rem] lg:gap-16">
        <ol className="space-y-14 sm:space-y-16 lg:space-y-28">
          {processSteps.map((step, i) => {
            const active = step.number === activeStep;
            return (
              <li
                key={step.number}
                ref={(el) => {
                  stepRefs.current[i] = el;
                }}
                data-step={step.number}
                className={cn(
                  "transition-opacity duration-300",
                  active ? "opacity-100" : "opacity-50",
                )}
              >
                <span className="text-sm font-semibold text-accent-strong">
                  Step {step.number}
                </span>
                <h3 className="mt-2 text-2xl sm:text-3xl">{step.title}</h3>
                <p className="mt-3 max-w-md text-base leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </li>
            );
          })}
        </ol>

        {/* Sticky status card — hidden on small screens, where a pinned
            panel would fight the page for scroll space. */}
        <div className="hidden lg:block">
          <div className="sticky top-28 rounded-3xl border border-border bg-surface p-6 shadow-[var(--shadow-lift)]">
            <p className="text-sm font-medium text-muted-foreground">
              Your matching process
            </p>
            <ul className="mt-5 space-y-2">
              {processSteps.map((step) => {
                const done = step.number < activeStep;
                const active = step.number === activeStep;
                return (
                  <li
                    key={step.number}
                    className={cn(
                      "flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors duration-300",
                      active && "bg-accent/10",
                    )}
                  >
                    <span
                      className={cn(
                        "flex size-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold transition-colors duration-300",
                        done
                          ? "bg-accent text-accent-foreground"
                          : active
                            ? "bg-primary text-primary-foreground"
                            : "bg-surface-muted text-muted-foreground",
                      )}
                    >
                      {done ? <Check className="size-3.5" /> : step.number}
                    </span>
                    <span
                      className={cn(
                        "text-sm font-medium transition-colors duration-300",
                        active
                          ? "text-foreground"
                          : done
                            ? "text-foreground/70"
                            : "text-muted-foreground",
                      )}
                    >
                      {step.title}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>

      {showCta && (
        <div className="mt-10">
          <ConsultationButton source="process">
            Start With a Free Consultation
          </ConsultationButton>
        </div>
      )}
    </Section>
  );
}
