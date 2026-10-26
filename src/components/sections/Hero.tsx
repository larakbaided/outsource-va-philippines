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

export function Hero() {
  const stack = team.slice(0, 4);

  return (
    <section className="relative overflow-hidden">
      <Container className="relative py-20 sm:py-24 lg:py-28">
        {/* Floating notification cards — hidden below lg, where they'd
            collide with the centered copy. */}
        <NotificationCard className="left-0 top-4 hidden lg:block">
          {heroLabels[0]}
        </NotificationCard>
        <NotificationCard className="right-0 top-16 hidden lg:block">
          {heroLabels[1]}
        </NotificationCard>
        <NotificationCard className="bottom-6 left-6 hidden lg:block">
          {heroLabels[2]}
        </NotificationCard>
        <NotificationCard className="bottom-16 right-4 hidden lg:block">
          {trustIndicators[0].label}
        </NotificationCard>

        <Reveal className="mx-auto max-w-3xl text-center">
          <Badge variant="accent" size="md" className="mb-6">
            {hero.badge}
          </Badge>
          <h1 className="text-5xl leading-[1.02] sm:text-6xl lg:text-7xl">
            {hero.headline}
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            {hero.subheadline}
          </p>
        </Reveal>

        <Reveal delay={80} className="mt-9 flex flex-col items-center">
          <div className="flex flex-col gap-3 sm:flex-row">
            <ConsultationButton source="hero" size="lg" />
            <Button asChild variant="outline" size="lg">
              <Link href="/our-talent">Meet Our Talent</Link>
            </Button>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            {hero.reassurance}
          </p>

          <div className="mt-8 flex items-center gap-3">
            <span className="flex -space-x-3">
              {stack.map((member) => (
                <TalentAvatar
                  key={member.slug}
                  member={member}
                  className="size-9 rounded-full ring-2 ring-surface"
                  sizes="40px"
                />
              ))}
            </span>
            <span className="flex items-center gap-1.5 text-sm font-medium text-foreground/80">
              <CheckCircle2 className="size-4 text-accent-strong" />
              {trustIndicators[1].label}
            </span>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

function NotificationCard({
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
