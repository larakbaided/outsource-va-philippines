import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/ui/reveal";
import { ConsultationButton } from "@/components/ConsultationButton";
import { TalentAvatar } from "@/components/talent/TalentAvatar";
import { team } from "@/content/team";
import { heroLabels } from "@/content/home";

export function Hero() {
  // A clean, aligned collage of three founding professionals.
  const [a, b, c] = team;

  return (
    <section className="relative overflow-hidden">
      {/* Soft background wash */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_80%_0%,rgba(176,139,79,0.10),transparent),radial-gradient(50%_40%_at_0%_100%,rgba(143,166,150,0.14),transparent)]"
      />
      <Container className="grid items-center gap-12 py-16 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:py-24">
        {/* Copy */}
        <div className="max-w-xl">
          <Reveal>
            <Badge variant="accent" size="md" className="mb-5">
              Premium Filipino Virtual Talent
            </Badge>
            <h1 className="text-4xl leading-[1.08] sm:text-5xl lg:text-[3.4rem]">
              Exceptional virtual talent for businesses ready to grow.
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              Build a more capable, efficient team with experienced virtual
              professionals carefully matched to your goals, systems, and working
              style.
            </p>
          </Reveal>

          <Reveal delay={80}>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ConsultationButton source="hero" size="lg" />
              <Button asChild variant="outline" size="lg">
                <Link href="/our-talent">Meet Our Talent</Link>
              </Button>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              No pressure. Just a 30-minute conversation about your needs.
            </p>
          </Reveal>
        </div>

        {/* Visual composition — 3-image collage.
           A CSS grid with a fixed aspect ratio: one large portrait spanning
           the full height on the left, two stacked images on the right. The
           row spans keep every edge aligned regardless of image dimensions. */}
        <Reveal delay={120} className="relative">
          <div className="relative mx-auto w-full max-w-sm lg:max-w-md">
            <div className="grid aspect-[4/5] grid-cols-5 grid-rows-2 gap-3 sm:gap-4">
              <TalentAvatar
                member={a}
                priority
                className="col-span-3 row-span-2 h-full w-full rounded-2xl shadow-[var(--shadow-lift)]"
                sizes="(max-width: 1024px) 65vw, 680px"
              />
              <TalentAvatar
                member={b}
                className="col-span-2 row-span-1 h-full w-full rounded-2xl shadow-[var(--shadow-soft)]"
                sizes="(max-width: 1024px) 45vw, 460px"
              />
              <TalentAvatar
                member={c}
                className="col-span-2 row-span-1 h-full w-full rounded-2xl shadow-[var(--shadow-soft)]"
                sizes="(max-width: 1024px) 45vw, 460px"
              />
            </div>

            {/* Floating skill labels */}
            <FloatingLabel className="-left-3 top-10 sm:-left-6">
              {heroLabels[0]}
            </FloatingLabel>
            <FloatingLabel className="-right-3 top-1/2 -translate-y-1/2 sm:-right-6">
              {heroLabels[1]}
            </FloatingLabel>
            <FloatingLabel className="-left-2 bottom-10 sm:-left-5">
              {heroLabels[2]}
            </FloatingLabel>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

function FloatingLabel({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`absolute z-10 rounded-full border border-border bg-surface px-3 py-1.5 text-xs font-medium text-foreground/80 shadow-[var(--shadow-soft)] ${className ?? ""}`}
    >
      {children}
    </span>
  );
}
