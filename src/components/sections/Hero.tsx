import type { CSSProperties } from "react";
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

/** Each collage slot's position, size, and float timing — decorative only.
    One photo anchors dead center (no empty middle) with the rest clustered
    tightly around it — overlapping a little, like a huddle rather than a
    ring with a hole in it. Durations/delays are staggered so the seven
    photos drift out of sync, like a loose cluster of balloons rather than
    one bouncing in unison. */
const COLLAGE_ITEMS = [
  {
    pos: "left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2",
    size: "size-32 sm:size-40 lg:size-48",
    chip: "bg-accent",
    duration: "6.3s",
    delay: "0s",
  },
  {
    pos: "left-[4%] top-[2%]",
    size: "size-24 sm:size-28 lg:size-36",
    chip: "bg-[#F5C84C]",
    duration: "6.5s",
    delay: "-1s",
  },
  {
    pos: "right-[2%] top-[8%]",
    size: "size-24 sm:size-32 lg:size-40",
    chip: "bg-[#6FC6F2]",
    duration: "5.5s",
    delay: "-2.5s",
  },
  {
    pos: "left-0 top-[48%] -translate-y-1/2",
    size: "size-20 sm:size-24 lg:size-28",
    chip: "bg-[#C9A8F5]",
    duration: "7s",
    delay: "-3.5s",
  },
  {
    pos: "right-0 top-[52%] -translate-y-1/2",
    size: "size-20 sm:size-24 lg:size-28",
    chip: "bg-accent-strong",
    duration: "6s",
    delay: "-1.8s",
  },
  {
    pos: "left-[8%] bottom-0",
    size: "size-24 sm:size-28 lg:size-36",
    chip: "bg-[#FF8FA3]",
    duration: "6.8s",
    delay: "-4s",
  },
  {
    pos: "right-[4%] bottom-[2%]",
    size: "size-28 sm:size-36 lg:size-44",
    chip: "bg-primary",
    duration: "5.8s",
    delay: "-2.8s",
  },
];

export function Hero() {
  const collage = team.slice(0, 7);

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

        {/* Visual composition — a loose, floating cluster of color-chipped
            photos, each bobbing on its own timer like balloons. */}
        <Reveal delay={120} className="relative">
          <div className="relative mx-auto h-[26rem] w-full max-w-sm sm:h-[30rem] sm:max-w-md lg:h-[34rem] lg:max-w-lg">
            {collage.map((member, i) => {
              const item = COLLAGE_ITEMS[i % COLLAGE_ITEMS.length];
              return (
                <div
                  key={member.slug}
                  className={`animate-float absolute rounded-[1.5rem] p-1.5 shadow-[var(--shadow-lift)] sm:rounded-[1.75rem] sm:p-2 lg:rounded-[2rem] ${item.chip} ${item.pos} ${item.size}`}
                  style={
                    {
                      "--float-duration": item.duration,
                      "--float-delay": item.delay,
                    } as CSSProperties
                  }
                >
                  <TalentAvatar
                    member={member}
                    priority={i === 0}
                    className="h-full w-full rounded-[1.1rem] sm:rounded-[1.35rem] lg:rounded-[1.5rem]"
                    sizes="176px"
                  />
                </div>
              );
            })}

            {/* Floating skill widgets — pushed just outside the photo
                cluster so they read as a separate layer, not another chip. */}
            <WidgetCard className="-left-3 top-1/4 z-20">{heroLabels[0]}</WidgetCard>
            <WidgetCard className="-right-3 bottom-1/4 z-20">{heroLabels[1]}</WidgetCard>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

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
