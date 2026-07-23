import { Quote } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { Reveal } from "@/components/ui/reveal";
import {
  testimonials,
  testimonialsPlaceholderNotice,
} from "@/content/testimonials";

export function TestimonialsSection({
  tone = "default",
}: {
  tone?: "default" | "muted";
}) {
  const hasTestimonials = testimonials.length > 0;

  return (
    <Section tone={tone}>
      <SectionHeading
        eyebrow="Client stories"
        title="What partners say about working with us."
        align="center"
      />

      {hasTestimonials ? (
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 60} className="h-full">
              <Card className="flex h-full flex-col p-6 sm:p-7">
                <Quote className="size-7 text-accent/50" aria-hidden="true" />
                <blockquote className="mt-4 flex-1 text-[0.975rem] leading-relaxed text-foreground/85">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <footer className="mt-5">
                  <p className="font-medium">{t.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {t.position}, {t.company}
                  </p>
                </footer>
              </Card>
            </Reveal>
          ))}
        </div>
      ) : (
        /* DEV PLACEHOLDER — remove automatically once real testimonials exist. */
        <Reveal className="mx-auto mt-10 max-w-2xl">
          <Card className="border-dashed p-8 text-center sm:p-10">
            <Quote className="mx-auto size-8 text-accent/40" aria-hidden="true" />
            <p className="mt-4 text-lg font-medium">
              {testimonialsPlaceholderNotice}
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              We only publish genuine, client-approved testimonials. This space is
              reserved for their words.
            </p>
          </Card>
        </Reveal>
      )}
    </Section>
  );
}
