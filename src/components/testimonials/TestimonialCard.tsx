"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronDown, FileText, Play, Quote } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { TestimonialVideo } from "@/components/testimonials/TestimonialVideo";
import { testimonialAttribution } from "@/content/testimonials";
import type { TestimonialView } from "@/lib/testimonials";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

/**
 * One client testimonial, built from the same pieces as TalentCard — 4:3 media
 * on top, `p-6` body, lift on hover — so it reads as part of the original site.
 *
 * Two decisions worth knowing about:
 *
 * 1. The client's photograph is the video preview. The source page's own poster
 *    images were already returning 404 before this migration, and a frame
 *    grabbed from the middle of a talking-head video makes a poor thumbnail
 *    anyway. The photograph is the client's own, so nothing here is invented.
 *
 * 2. The full testimonial lives in a native `<details>`, not in the dialog.
 *    That keeps every word in the server-rendered HTML where search engines
 *    can read it, and it keeps working with JavaScript disabled. `<details>`
 *    also gives correct keyboard behaviour for free. The dialog is reserved
 *    for the video, where nothing is lost by mounting on demand.
 */
export function TestimonialCard({
  testimonial,
  priority = false,
}: {
  testimonial: TestimonialView;
  /** Eager-load the image for cards above the fold. */
  priority?: boolean;
}) {
  const {
    id,
    clientName,
    company,
    services,
    tools,
    shortQuote,
    fullQuote,
    videoUrl,
    clientImage,
    relatedLinks,
  } = testimonial;

  const attribution = testimonialAttribution(testimonial);
  const paragraphs = fullQuote.split("\n\n");

  /*
    The media frame is only drawn when there is something to put in it. A
    testimonial with neither a photograph nor a video becomes a quote-led card,
    which is a deliberate variant rather than an empty grey box. The frame is
    still drawn for a video with no photograph, so a video can never become
    unreachable just because its client declined a photo.
  */
  const hasMedia = Boolean(clientImage || videoUrl);

  const writtenBadge = (
    /*
      Saying "written testimonial" is more honest than a play button that does
      nothing, and it explains the absence rather than leaving it as a gap.
    */
    <Badge variant="default" className="bg-surface/90 backdrop-blur-sm">
      <FileText className="size-3" aria-hidden="true" />
      Written testimonial
    </Badge>
  );

  return (
    <Card className="flex h-full flex-col overflow-hidden transition-shadow duration-300 hover:shadow-[var(--shadow-lift)]">
      {hasMedia && (
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-surface-muted">
        {clientImage && (
        <Image
          src={clientImage}
          alt={company ? `${clientName} of ${company}` : clientName}
          fill
          sizes="(max-width: 640px) 95vw, (max-width: 1024px) 47vw, 420px"
          priority={priority}
          quality={85}
          /*
            Sources are 4:5 portraits shown in a 4:3 frame, so the crop has to
            lose height somewhere. Biasing up the frame keeps faces in view
            instead of centring on the torso.
          */
          className="object-cover object-[50%_20%]"
        />
        )}

        {videoUrl ? (
          <Dialog>
            <DialogTrigger asChild>
              <button
                type="button"
                /*
                  The whole media area is the play target — a comfortably large
                  touch target on any screen. `inset` ring rather than `outline`
                  so the focus indicator stays inside the rounded card.
                */
                className="group absolute inset-0 flex cursor-pointer items-center justify-center bg-primary/10 transition-colors hover:bg-primary/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
                aria-label={`Play testimonial from ${clientName}`}
                onClick={() =>
                  trackEvent("testimonial_video_played", { testimonial: id })
                }
              >
                <span
                  aria-hidden="true"
                  className="flex size-14 items-center justify-center rounded-full bg-surface/90 shadow-[var(--shadow-soft)] transition-transform duration-300 group-hover:scale-105"
                >
                  <Play className="size-5 translate-x-px fill-primary text-primary" />
                </span>
              </button>
            </DialogTrigger>

            <DialogContent className="max-w-3xl">
              <DialogHeader>
                <DialogTitle className="pr-8 text-xl sm:text-2xl">
                  {clientName}
                  {attribution && (
                    <span className="mt-1 block text-sm font-normal text-muted-foreground">
                      {attribution}
                    </span>
                  )}
                </DialogTitle>
              </DialogHeader>
              <TestimonialVideo testimonial={testimonial} />
            </DialogContent>
          </Dialog>
        ) : (
          <span className="absolute bottom-3 left-3">{writtenBadge}</span>
        )}
      </div>
      )}

      <div className="flex flex-1 flex-col p-6">
        {/* With no media frame to sit on, the badge belongs at the top here. */}
        {!hasMedia && <div className="mb-4">{writtenBadge}</div>}

        <Quote
          className={cn("text-accent/50", hasMedia ? "size-6" : "size-8")}
          aria-hidden="true"
        />

        {/*
          Without a media frame the card has roughly 250px of height to account
          for once the grid stretches it to match its row. Setting the quote in
          a larger, editorial size fills that space with the client's actual
          words instead of leaving a hole that reads as a failed image load.
        */}
        <blockquote
          className={cn(
            "mt-3 leading-relaxed text-foreground/85",
            hasMedia ? "text-[0.975rem]" : "text-lg sm:text-xl",
          )}
        >
          &ldquo;{shortQuote}&rdquo;
        </blockquote>

        {/*
          The client's name is the card's heading, which keeps the page
          hierarchy honest: h1 page title → h2 section → h3 client → h4 labels
          inside the expanded testimonial.
        */}
        <div className="mt-4">
          <h3 className="text-[1.05rem] font-medium tracking-tight">
            {clientName}
          </h3>
          {attribution && (
            <p className="text-sm text-muted-foreground">{attribution}</p>
          )}
        </div>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {services.map((service) => (
            <Badge key={service} variant="outline" size="sm">
              {service}
            </Badge>
          ))}
        </div>

        {/*
          `mt-auto` pins the disclosure to the bottom so it lines up across a
          row of cards with unequal quote lengths. The quote-led variant opts
          out: with no media frame there is far more slack, and pushing the
          disclosure down would strand it below an obvious gap.
        */}
        <details
          className={cn(
            "group border-t border-border pt-4 [&>summary]:list-none [&>summary::-webkit-details-marker]:hidden",
            hasMedia ? "mt-auto" : "mt-8",
          )}
        >
          <summary className="flex cursor-pointer items-center gap-1.5 pt-1 text-sm font-medium text-accent-strong transition-colors hover:text-accent">
            <span className="group-open:hidden">Read full testimonial</span>
            <span className="hidden group-open:inline">Hide testimonial</span>
            <ChevronDown
              className="size-4 transition-transform duration-200 group-open:rotate-180"
              aria-hidden="true"
            />
          </summary>

          <div className="mt-4 space-y-3">
            {paragraphs.map((para, i) => (
              <p
                key={i}
                className="text-[0.925rem] leading-relaxed text-muted-foreground"
              >
                {para}
              </p>
            ))}

            {tools.length > 0 && (
              <div className="pt-2">
                <h4 className="text-xs font-medium uppercase tracking-[0.12em] text-foreground/70">
                  Tools used
                </h4>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {tools.map((tool) => (
                    <Badge key={tool} variant="default" size="sm">
                      {tool}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {relatedLinks.length > 0 && (
              <div className="pt-2">
                <h4 className="text-xs font-medium uppercase tracking-[0.12em] text-foreground/70">
                  Related services
                </h4>
                {/*
                  `inline-block py-1` lifts these from 18px to 26px tall. They
                  are a wrapped list of separate targets rather than links
                  inside a sentence, so the inline exception in WCAG 2.2
                  SC 2.5.8 does not cover them and they need the real 24px.
                */}
                <ul className="mt-1.5 flex flex-wrap gap-x-4">
                  {relatedLinks.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="inline-block py-1 text-sm text-accent-strong underline-offset-4 hover:underline"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </details>
      </div>
    </Card>
  );
}
