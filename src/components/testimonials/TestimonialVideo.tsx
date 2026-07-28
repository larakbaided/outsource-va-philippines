"use client";

import * as React from "react";
import { VideoOff } from "lucide-react";
import type { Testimonial } from "@/content/testimonials";

/**
 * The video for one testimonial, sized to a fixed 16:9 box so nothing shifts
 * while the file loads.
 *
 * This component is only ever rendered inside an open dialog, which is what
 * makes the loading lazy: no `<video>` element — and therefore not one byte of
 * video — exists until someone asks to watch. `object-contain` means a portrait
 * recording letterboxes inside the box rather than being stretched or cropped.
 *
 * Two ways playback can fail, both handled rather than left as a broken player:
 *   - The container is one the browser cannot decode. Firefox, for instance,
 *     does not support QuickTime at all, and one migrated testimonial is .mov.
 *     `canPlayType` catches this up front, before a request is made.
 *   - The file itself fails to load (host down, moved, retired domain). The
 *     `error` event catches that.
 * Either way the client's written testimonial is shown instead, which is the
 * same words they said on camera.
 */
export function TestimonialVideo({ testimonial }: { testimonial: Testimonial }) {
  const { videoUrl, videoType, fullQuote, clientName } = testimonial;

  /*
    Ask the browser whether it can decode this container before requesting a
    single byte of it. This is a lazy initialiser rather than an effect: it
    needs a real DOM element, but it is a one-off question with an immediate
    answer, and setting state from an effect would cost an extra render pass.

    Safe from hydration mismatch because this component only ever mounts inside
    an already-open dialog — always client-side, always after hydration. The
    `document` guard is belt-and-braces for that invariant changing.
  */
  const [failed, setFailed] = React.useState(() => {
    if (!videoUrl || !videoType || typeof document === "undefined") return false;
    // "" means no support at all; "maybe" and "probably" both mean go ahead.
    return document.createElement("video").canPlayType(videoType) === "";
  });

  if (!videoUrl || failed) {
    return (
      <div className="rounded-xl border border-border bg-surface-muted p-5 sm:p-6">
        {videoUrl && (
          <p className="flex items-start gap-2.5 text-sm text-muted-foreground">
            <VideoOff className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
            <span>
              This video will not play in your browser. Here is what{" "}
              {clientName} said, in full.
            </span>
          </p>
        )}
        <blockquote
          className={
            videoUrl
              ? "mt-4 space-y-3 border-t border-border pt-4"
              : "space-y-3"
          }
        >
          {fullQuote.split("\n\n").map((para, i) => (
            <p key={i} className="text-[0.95rem] leading-relaxed text-foreground/85">
              {para}
            </p>
          ))}
        </blockquote>
      </div>
    );
  }

  return (
    <div className="aspect-video w-full overflow-hidden rounded-xl bg-primary">
      {/*
        autoPlay is deliberate and is not background autoplay: reaching this
        component always required a click on "Play testimonial from …", so
        sound is what the visitor just asked for. `controls` means playback is
        still fully theirs if a browser declines the autoplay.
      */}
      <video
        className="size-full object-contain"
        src={videoUrl}
        controls
        autoPlay
        playsInline
        preload="metadata"
        controlsList="nodownload"
        onError={() => setFailed(true)}
        aria-label={`Video testimonial from ${clientName}`}
      />
    </div>
  );
}
