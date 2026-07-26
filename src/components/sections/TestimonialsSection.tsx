import { Quote } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { Reveal } from "@/components/ui/reveal";
import { testimonials } from "@/content/testimonials";

export function TestimonialsSection({
  tone = "default",
}: {
  tone?: "default" | "muted";
}) {
  // Render nothing until genuine, client-approved testimonials exist — we never
  // ship a placeholder or fabricated social proof to production.
  if (testimonials.length === 0) return null;

  return (
    <Section tone={tone}>
      <SectionHeading
        eyebrow="Client stories"
        title="What partners say about working with us."
        align="center"
      />

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
    </Section>
  );
}
