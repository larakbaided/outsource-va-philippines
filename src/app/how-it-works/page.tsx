import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { Section } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { Reveal } from "@/components/ui/reveal";
import { PageHeader } from "@/components/layout/PageHeader";
import { ConsultationButton } from "@/components/ConsultationButton";
import { EngagementSection } from "@/components/sections/EngagementSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { FinalCtaSection } from "@/components/sections/FinalCtaSection";
import { BreadcrumbSchema } from "@/components/seo/JsonLd";
import { processSteps } from "@/content/process";

export const metadata: Metadata = buildMetadata({
  path: "/how-it-works",
  title: "How It Works",
  description:
    "A clear five-step process — consultation, role definition, talent matching, interview and selection, then onboarding and support — to find the right virtual professional for your business.",
});

export default function HowItWorksPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "How It Works", path: "/how-it-works" },
        ]}
      />
      <PageHeader
        eyebrow="How it works"
        title="Finding the right support, made simple."
        description="Our process is designed to be thoughtful, not rushed. Every step is built around understanding your business and matching you with a professional who genuinely fits."
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "How It Works", href: "/how-it-works" },
        ]}
      >
        <ConsultationButton source="how-it-works-header" />
      </PageHeader>

      <Section>
        <ol className="mx-auto max-w-3xl space-y-5">
          {processSteps.map((step, i) => (
            <Reveal as="li" key={step.number} delay={i * 60}>
              <Card className="flex gap-5 p-6 sm:p-7">
                <div className="flex flex-col items-center">
                  <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-primary font-serif text-lg text-primary-foreground">
                    {step.number}
                  </span>
                  {i < processSteps.length - 1 && (
                    <span
                      aria-hidden="true"
                      className="mt-2 w-px flex-1 bg-border"
                    />
                  )}
                </div>
                <div className="pb-1">
                  <h2 className="text-xl font-medium">{step.title}</h2>
                  <p className="mt-2 leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </Card>
            </Reveal>
          ))}
        </ol>

        <div className="mx-auto mt-10 flex max-w-3xl">
          <ConsultationButton source="how-it-works-steps" size="lg">
            Start With a Free Consultation
          </ConsultationButton>
        </div>
      </Section>

      <EngagementSection tone="muted" />
      <FaqSection tone="default" />
      <FinalCtaSection />
    </>
  );
}
