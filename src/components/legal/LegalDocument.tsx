import { AlertTriangle } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import type { LegalSection } from "@/content/legal";

/** Renders a legal document with a review notice and numbered sections. */
export function LegalDocument({
  sections,
  notice,
}: {
  sections: LegalSection[];
  notice: string;
}) {
  return (
    <Container className="py-14 lg:py-20">
      <div className="mx-auto max-w-3xl">
        {/* Review disclaimer */}
        <div className="mb-10 flex items-start gap-3 rounded-xl border border-accent/30 bg-accent/[0.06] p-4">
          <AlertTriangle className="mt-0.5 size-5 shrink-0 text-accent-strong" />
          <p className="text-sm leading-relaxed text-foreground/80">{notice}</p>
        </div>

        <div className="space-y-10">
          {sections.map((section, i) => (
            <Reveal as="section" key={section.heading}>
              <h2 className="flex items-baseline gap-3 text-2xl">
                <span className="font-serif text-base text-accent-strong">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {section.heading}
              </h2>
              <div className="mt-3 space-y-3">
                {section.body.map((para, j) => (
                  <p
                    key={j}
                    className="leading-relaxed text-muted-foreground"
                  >
                    {para}
                  </p>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Container>
  );
}
