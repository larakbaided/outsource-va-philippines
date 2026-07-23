import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Temporary text-based wordmark for Outsource VA Philippines.
 *
 * The abstract mark is two overlapping rounded nodes joined by a link —
 * representing connection, partnership, and remote collaboration.
 *
 * TO REPLACE WITH A FINAL LOGO:
 * Drop an SVG/PNG into /public and swap the <LogoMark /> + wordmark below for
 * a Next.js <Image>. Keep the component name/props so nothing else changes.
 */

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      aria-hidden="true"
      className={cn("size-9", className)}
    >
      {/* Left node — the client */}
      <circle cx="14" cy="20" r="8.5" className="stroke-primary" strokeWidth="2.5" />
      {/* Right node — the professional */}
      <circle
        cx="26"
        cy="20"
        r="8.5"
        className="stroke-accent"
        strokeWidth="2.5"
      />
      {/* Connecting link */}
      <path
        d="M20 15.5v9"
        className="stroke-accent-strong"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

type LogoProps = {
  className?: string;
  /** Render on dark backgrounds (footer / primary sections). */
  inverted?: boolean;
};

export function Logo({ className, inverted = false }: LogoProps) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-serif text-lg font-semibold tracking-tight",
            inverted ? "text-primary-foreground" : "text-foreground",
          )}
        >
          Outsource VA
        </span>
        <span
          className={cn(
            "text-[0.7rem] font-medium uppercase tracking-[0.28em]",
            inverted ? "text-primary-foreground/70" : "text-accent-strong",
          )}
        >
          Philippines
        </span>
      </span>
    </span>
  );
}
