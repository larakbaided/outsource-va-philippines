import { cn } from "@/lib/utils";
import { tools, type Tool } from "@/content/tools";

/**
 * Continuously scrolling ribbon of the tools our professionals work with.
 *
 * Server component — the motion is pure CSS (see the `tools-marquee` keyframes
 * in globals.css), so this ships no JavaScript.
 *
 * How the seamless loop works: the list is rendered twice inside a track that
 * is exactly twice one list's width, and the track animates to translateX(-50%)
 * — precisely one list — before repeating, so there is no jump. Item spacing
 * uses margin-right rather than flex `gap` on purpose: `gap` would add a half-
 * gap discrepancy at the seam and the loop would visibly stutter.
 *
 * The second copy is aria-hidden so screen readers announce each tool once.
 * The track also sits in a scrollable container, so touch users can swipe and
 * reduced-motion users can scroll manually.
 */

/** Brand mark, or a neutral monogram when no licensed logo exists. */
function ToolLogo({ tool }: { tool: Tool }) {
  // Decorative: the tool name sits beside it as real text, so announcing the
  // mark too would just repeat it.
  if (tool.logoSrc) {
    // A plain <img> is deliberate: these are tiny SVG brand marks, which gain
    // nothing from the image optimizer, and putting SVGs through next/image
    // would mean enabling dangerouslyAllowSVG. Dimensions are set so there is
    // no layout shift as they load.
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={tool.logoSrc}
        alt=""
        aria-hidden="true"
        width={20}
        height={20}
        loading="lazy"
        decoding="async"
        className="size-5 shrink-0 object-contain"
      />
    );
  }

  if (tool.logoPath) {
    return (
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        focusable="false"
        className="size-5 shrink-0"
        style={{ fill: tool.brandHex }}
      >
        <path d={tool.logoPath} />
      </svg>
    );
  }

  return (
    <span
      aria-hidden="true"
      className="grid size-5 shrink-0 place-items-center rounded-[0.3rem] bg-sage-soft font-serif text-[0.7rem] font-semibold leading-none text-primary"
    >
      {tool.name.charAt(0)}
    </span>
  );
}

function ToolPill({ tool }: { tool: Tool }) {
  return (
    <li className="mr-3 shrink-0 sm:mr-4">
      <span className="flex items-center gap-2 rounded-full border border-border bg-surface px-3.5 py-2.5 shadow-[var(--shadow-soft)] sm:gap-2.5 sm:px-4 sm:py-3">
        <ToolLogo tool={tool} />
        <span className="whitespace-nowrap text-[0.8rem] font-medium text-foreground/85 sm:text-sm">
          {tool.name}
        </span>
      </span>
    </li>
  );
}

function ToolList({ ariaHidden = false }: { ariaHidden?: boolean }) {
  return (
    <ul
      className="flex shrink-0 items-center"
      {...(ariaHidden
        ? { "aria-hidden": true as const }
        : { "aria-label": "Tools our virtual professionals work with" })}
    >
      {tools.map((tool) => (
        <ToolPill key={`${ariaHidden ? "dup-" : ""}${tool.slug}`} tool={tool} />
      ))}
    </ul>
  );
}

export function ToolsMarquee({ className }: { className?: string }) {
  return (
    <div className={cn("mt-10", className)}>
      <h3 className="text-base font-medium">
        Tools our virtual professionals work with
      </h3>
      <p className="mt-1.5 text-sm text-muted-foreground">
        Experienced across the platforms modern businesses use every day.
      </p>

      {/*
        `overflow-hidden` here is what stops the duplicated track from causing
        horizontal page overflow — the track is intentionally ~2x wider than
        the viewport.
      */}
      <div className="tools-marquee group relative mt-5 overflow-hidden">
        {/* Soft edge fades. Sized in rem so they scale with the layout. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-background to-transparent sm:w-16"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-background to-transparent sm:w-16"
        />

        <div className="tools-marquee-scroll overflow-x-auto py-1">
          <div className="animate-tools-marquee flex w-max items-center">
            <ToolList />
            <ToolList ariaHidden />
          </div>
        </div>
      </div>
    </div>
  );
}
