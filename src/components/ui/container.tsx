import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Centered max-width wrapper with responsive gutters.
 *
 * Width comes from the `--container-page` token in globals.css (`max-w-page`),
 * so the page measure is changed in one place. Keep the gutter scale in sync
 * with Header, CareersHeader and AnnouncementBar, which repeat these classes
 * because they need `flex` on the same element.
 */
export function Container({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("mx-auto w-full max-w-page px-5 sm:px-8 lg:px-12", className)}
      {...props}
    />
  );
}
