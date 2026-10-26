import { cn } from "@/lib/utils";

/**
 * Soft organic blob outline used as a background accent on hero/banner
 * sections — echoes the brand's rounded, hand-drawn visual language.
 * Purely decorative: aria-hidden, no interactive content.
 */
export function OrganicBlob({
  className,
  strokeWidth = 1.5,
}: {
  className?: string;
  strokeWidth?: number;
}) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 600 600"
      fill="none"
      className={cn("pointer-events-none", className)}
    >
      <path
        d="M110 180C170 90 300 50 400 90C500 130 560 230 540 330C520 430 420 500 320 520C220 540 100 510 60 420C20 330 50 270 110 180Z"
        stroke="currentColor"
        strokeWidth={strokeWidth}
      />
    </svg>
  );
}

/** Filled version — used where a soft solid wash reads better than an outline. */
export function OrganicBlobFill({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 600 600"
      fill="currentColor"
      className={cn("pointer-events-none", className)}
    >
      <path d="M110 180C170 90 300 50 400 90C500 130 560 230 540 330C520 430 420 500 320 520C220 540 100 510 60 420C20 330 50 270 110 180Z" />
    </svg>
  );
}
