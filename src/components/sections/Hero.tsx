import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/ui/reveal";
import { ConsultationButton } from "@/components/ConsultationButton";
import { TalentAvatar } from "@/components/talent/TalentAvatar";
import { OrganicBlob, OrganicBlobFill } from "@/components/decoration/OrganicBlob";
import { team } from "@/content/team";
import { hero, heroLabels } from "@/content/home";
import { announcement } from "@/content/navigation";

export function Hero() {
  // A clean, aligned collage of three founding professionals.
  const [a, b, c] = team;

  return (
    <section className="relative overflow-hidden">
      <Container className="py-6 sm:py-8 lg:py-10">
        <Reveal>
          <div className="relative grid overflow-hidden rounded-[2rem] shadow-[var(--shadow-lift)] sm:rounded-[2.5rem] lg:grid-cols-2">
            {/* Left panel — warm gradient banner */}
            <div className="relative overflow-hidden bg-gradient-to-br from-accent-gradient-from to-accent-gradient-to px-6 py-12 sm:px-10 sm:py-16 lg:px-12 lg:py-20">
              <OrganicBlob
                className="absolute -left-24 -top-24 size-[22rem] text-white/15"
                strokeWidth={10}
              />
              <div className="relative max-w-md">
                <Badge className="mb-5 border-white/40 bg-white/70 text-foreground backdrop-blur-sm">
                  {hero.badge}
                </Badge>
                <h1 className="text-4xl leading-[1.04] text-foreground sm:text-5xl">
                  {hero.headline}
                </h1>
                <p className="mt-5 text-lg leading-relaxed text-foreground/80">
                  {hero.subheadline}
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <ConsultationButton source="hero" size="lg" variant="primary" />
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="border-foreground/25 bg-white/40 backdrop-blur-sm hover:border-foreground/50 hover:bg-white/60"
                  >
                    <Link href="/our-talent">Meet Our Talent</Link>
                  </Button>
                </div>
                <p className="mt-4 text-sm text-foreground/70">
                  {hero.reassurance}
                </p>
              </div>
            </div>

            {/* Right panel — talent collage on the dark brand surface */}
            <div className="relative overflow-hidden bg-primary px-6 py-12 sm:px-10 sm:py-16 lg:px-12 lg:py-20">
              <OrganicBlobFill className="absolute -bottom-20 -right-16 size-[26rem] text-white/5" />

              <div className="relative mx-auto w-full max-w-sm">
                <div className="grid aspect-[4/5] grid-cols-5 grid-rows-2 gap-3 sm:gap-4">
                  <TalentAvatar
                    member={a}
                    priority
                    className="col-span-3 row-span-2 h-full w-full rounded-2xl shadow-[var(--shadow-lift)]"
                    sizes="(max-width: 1024px) 65vw, 780px"
                  />
                  <TalentAvatar
                    member={b}
                    className="col-span-2 row-span-1 h-full w-full rounded-2xl shadow-[var(--shadow-soft)]"
                    sizes="(max-width: 1024px) 45vw, 520px"
                  />
                  <TalentAvatar
                    member={c}
                    className="col-span-2 row-span-1 h-full w-full rounded-2xl shadow-[var(--shadow-soft)]"
                    sizes="(max-width: 1024px) 45vw, 520px"
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
            </div>

            {/* Floating status pill, straddling both panels on large screens */}
            <div className="pointer-events-none absolute inset-x-0 bottom-4 flex justify-center lg:bottom-6 lg:justify-end lg:pr-10">
              <span className="pointer-events-auto inline-flex items-center gap-2 rounded-full bg-surface px-4 py-2 text-xs font-medium text-foreground shadow-[var(--shadow-lift)] sm:text-sm">
                <span className="inline-block size-2 rounded-full bg-success" />
                {announcement.message}
              </span>
            </div>
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
