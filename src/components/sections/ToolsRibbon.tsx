import type { CSSProperties } from "react";
import { ToolLogo } from "@/components/sections/ToolsMarquee";
import { tools } from "@/content/tools";

/**
 * Decorative companion to the heading in ServicesPreview, filling the dead
 * space beside it on large screens. A subset of tool chips drift along a
 * single S-curved path (CSS motion-path) with staggered negative
 * animation-delays, so several are visible along the ribbon at once instead
 * of all bunching up together. Pure CSS — no JavaScript ships for this.
 *
 * Hidden below `lg`: the space it fills only exists once the heading's
 * max-w-2xl column stops spanning the full container width.
 */

const RIBBON_TOOLS = tools.slice(0, 8);

const TIMINGS = [
  { duration: "11s", delay: "0s" },
  { duration: "13s", delay: "-1.6s" },
  { duration: "12s", delay: "-3.2s" },
  { duration: "14s", delay: "-4.8s" },
  { duration: "11.5s", delay: "-6.4s" },
  { duration: "13.5s", delay: "-8s" },
  { duration: "12.5s", delay: "-9.6s" },
  { duration: "14.5s", delay: "-11.2s" },
];

export function ToolsRibbon() {
  return (
    <div className="relative hidden h-[340px] w-[320px] shrink-0 lg:block">
      {RIBBON_TOOLS.map((tool, i) => {
        const timing = TIMINGS[i % TIMINGS.length];
        return (
          <div
            key={tool.slug}
            className="tools-ribbon-path animate-ribbon absolute flex size-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-surface shadow-[var(--shadow-soft)]"
            style={
              {
                "--ribbon-duration": timing.duration,
                "--ribbon-delay": timing.delay,
              } as CSSProperties
            }
          >
            <ToolLogo tool={tool} />
            <span className="sr-only">{tool.name}</span>
          </div>
        );
      })}
    </div>
  );
}
