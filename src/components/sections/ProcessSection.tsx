import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { ConsultationButton } from "@/components/ConsultationButton";
import { processSteps } from "@/content/process";

export function ProcessSection({
  tone = "default",
  showCta = true,
}: {
  tone?: "default" | "muted";
  showCta?: boolean;
}) {
  return (
    <Section tone={tone} id="how-it-works">
      <SectionHeading
        eyebrow="How it works"
        title="A clear, five-step path to the right support."
        description="No guesswork and no pressure — just an organized process designed to find a professional who genuinely fits your business."
      />

      <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
        {processSteps.map((step, i) => (
          <Reveal
            as="li"
            key={step.number}
            delay={i * 70}
            className="relative flex flex-col"
          >
            <div className="flex items-center gap-3">
              <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-primary font-serif text-lg text-primary-foreground">
                {step.number}
              </span>
              {i < processSteps.length - 1 && (
                <span
                  aria-hidden="true"
                  className="hidden h-px flex-1 bg-border lg:block"
                />
              )}
            </div>
            <h3 className="mt-4 text-lg font-medium">{step.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {step.description}
            </p>
          </Reveal>
        ))}
      </ol>

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
