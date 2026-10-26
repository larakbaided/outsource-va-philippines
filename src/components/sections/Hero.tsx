import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/ui/reveal";
import { ConsultationButton } from "@/components/ConsultationButton";
import { TalentAvatar } from "@/components/talent/TalentAvatar";
import { team } from "@/content/team";
import { hero, heroLabels, trustIndicators } from "@/content/home";

/** Chip colors behind each collage photo — decorative only. */
const CHIP_COLORS = [
  "bg-[#F5C84C]",
  "bg-accent",
  "bg-[#FF8FA3]",
  "bg-primary",
];

export function Hero() {
  const collage = team.slice(0, 4);

  return (
    <section className="relative overflow-hidden">
      {/* Soft mint wash */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(55%_45%_at_85%_0%,rgba(52,201,142,0.14),transparent),radial-gradient(45%_35%_at_0%_100%,rgba(52,201,142,0.08),transparent)]"
      />
      <Container className="grid items-center gap-12 py-16 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:py-24">
        <div className="max-w-xl lg:max-w-2xl">
          <Reveal>
            <Badge variant="accent" size="md" className="mb-5">
              {hero.badge}
            </Badge>
            <h1 className="text-5xl leading-[1] sm:text-6xl lg:text-[3.8rem]">
              {hero.headline}
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              {hero.subheadline}
            </p>
          </Reveal>

          <Reveal delay={80}>
            <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
              <span className="flex -space-x-3">
                {collage.slice(0, 3).map((member) => (
                  <TalentAvatar
                    key={member.slug}
                    member={member}
                    className="size-9 rounded-full ring-2 ring-surface"
                    sizes="40px"
                  />
                ))}
              </span>
              <span className="flex items-center gap-1.5 font-medium text-foreground/80">
                <CheckCircle2 className="size-4 text-accent-strong" />
                {trustIndicators[0].label}
              </span>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <ConsultationButton source="hero" size="lg" />
              <Button asChild variant="outline" size="lg">
                <Link href="/our-talent">Meet Our Talent</Link>
              </Button>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              {hero.reassurance}
            </p>
          </Reveal>
        </div>

        {/* Visual composition — staggered pill-shaped collage with color
            chips behind each photo, echoing a bold, playful collage style. */}
        <Reveal delay={120} className="relative">
          <div className="relative mx-auto h-[22rem] w-full max-w-xs sm:h-[26rem] sm:max-w-sm lg:h-[30rem] lg:max-w-md">
            {collage.map((member, i) => (
              <div
                key={member.slug}
                className={`absolute size-28 rounded-[1.5rem] p-1.5 shadow-[var(--shadow-lift)] sm:size-36 sm:rounded-[1.75rem] sm:p-2 lg:size-44 lg:rounded-[2rem] ${CHIP_COLORS[i % CHIP_COLORS.length]} ${COLLAGE_POSITION[i]}`}
              >
                <TalentAvatar
                  member={member}
                  priority={i === 0}
                  className="h-full w-full rounded-[1.1rem] sm:rounded-[1.35rem] lg:rounded-[1.5rem]"
                  sizes="176px"
                />
              </div>
            ))}

            {/* Floating skill widgets */}
            <WidgetCard className="left-0 top-6">{heroLabels[0]}</WidgetCard>
            <WidgetCard className="bottom-10 right-0">{heroLabels[1]}</WidgetCard>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

const COLLAGE_POSITION = [
  "left-8 top-0",
  "right-4 top-16",
  "left-0 bottom-0",
  "bottom-8 right-10",
];

function WidgetCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`absolute z-10 inline-flex items-center gap-2 rounded-2xl border border-border bg-surface px-3.5 py-2.5 text-xs font-semibold text-foreground shadow-[var(--shadow-lift)] ${className ?? ""}`}
    >
      <span className="inline-block size-2 rounded-full bg-accent" />
      {children}
    </span>
  );
}
