"use client";

import * as React from "react";
import { Button, type ButtonProps } from "@/components/ui/button";
import { site } from "@/content/site";
import { trackEvent } from "@/lib/analytics";

type ConsultationButtonProps = Omit<ButtonProps, "asChild"> & {
  /** Where the click originated, for analytics attribution. */
  source?: string;
  children?: React.ReactNode;
};

/**
 * Primary conversion CTA. Opens the Calendly booking page in a new tab and
 * fires a consultation analytics event. Used across every page.
 */
export function ConsultationButton({
  source = "unknown",
  children = "Book a Free Consultation",
  variant = "accent",
  ...props
}: ConsultationButtonProps) {
  return (
    <Button asChild variant={variant} {...props}>
      <a
        href={site.calendlyUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => {
          trackEvent("consultation_cta_clicked", { source });
          trackEvent("calendly_opened", { source });
        }}
      >
        {children}
      </a>
    </Button>
  );
}
