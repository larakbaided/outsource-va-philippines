"use client";

import * as React from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { TalentCard } from "@/components/cards/TalentCard";
import type { TeamMember } from "@/content/team";

/**
 * Sliding carousel of talent cards — drag, touch-swipe, arrow buttons, dot
 * indicators, and autoplay that starts when the carousel scrolls into view.
 * Autoplay pauses on hover and is disabled under prefers-reduced-motion.
 * Responsive: ~1 card on mobile, 2 on tablet, 3 on desktop.
 */
export function TalentCarousel({ members }: { members: TeamMember[] }) {
  // Lazy state (not a ref) so we don't read `.current` during render.
  const [autoplay] = React.useState(() =>
    Autoplay({
      delay: 4000,
      playOnInit: false, // starts only when scrolled into view
      stopOnInteraction: false,
      stopOnMouseEnter: true,
    }),
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { align: "start", loop: true },
    [autoplay],
  );

  const containerRef = React.useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = React.useState(false);
  const [canNext, setCanNext] = React.useState(false);
  const [snaps, setSnaps] = React.useState<number[]>([]);
  const [selected, setSelected] = React.useState(0);

  const onSelect = React.useCallback(() => {
    if (!emblaApi) return;
    setCanPrev(emblaApi.canScrollPrev());
    setCanNext(emblaApi.canScrollNext());
    setSelected(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  React.useEffect(() => {
    if (!emblaApi) return;
    // Initialize carousel state from the Embla instance (browser-only API).
    /* eslint-disable react-hooks/set-state-in-effect */
    setSnaps(emblaApi.scrollSnapList());
    onSelect();
    /* eslint-enable react-hooks/set-state-in-effect */
    emblaApi.on("select", onSelect).on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect).off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  // Start autoplay when the carousel enters the viewport; pause when it leaves.
  React.useEffect(() => {
    const node = containerRef.current;
    if (!node || !emblaApi) return;

    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return; // respect reduced-motion: no autoplay

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) autoplay.play();
          else autoplay.stop();
        });
      },
      { threshold: 0.35 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [emblaApi, autoplay]);

  return (
    <div ref={containerRef}>
      {/* Viewport */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="-ml-5 flex touch-pan-y">
          {members.map((member, i) => (
            <div
              key={member.slug}
              className="min-w-0 shrink-0 grow-0 basis-[86%] pl-5 sm:basis-1/2 lg:basis-1/3"
            >
              <TalentCard member={member} priority={i < 3} />
            </div>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="mt-6 flex items-center justify-between">
        {/* Dots */}
        <div className="flex items-center gap-2" aria-label="Slides">
          {snaps.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === selected ? "true" : undefined}
              onClick={() => emblaApi?.scrollTo(i)}
              className={cn(
                "h-2 rounded-full transition-all",
                i === selected
                  ? "w-6 bg-accent"
                  : "w-2 bg-foreground/20 hover:bg-foreground/40",
              )}
            />
          ))}
        </div>

        {/* Arrows */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Previous"
            onClick={() => emblaApi?.scrollPrev()}
            disabled={!canPrev}
            className="inline-flex size-11 items-center justify-center rounded-full border border-border bg-surface text-foreground transition-colors hover:border-accent/40 hover:text-accent-strong disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronLeft className="size-5" />
          </button>
          <button
            type="button"
            aria-label="Next"
            onClick={() => emblaApi?.scrollNext()}
            disabled={!canNext}
            className="inline-flex size-11 items-center justify-center rounded-full border border-border bg-surface text-foreground transition-colors hover:border-accent/40 hover:text-accent-strong disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronRight className="size-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
