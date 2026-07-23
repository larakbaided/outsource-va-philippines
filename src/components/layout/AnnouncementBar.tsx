"use client";

import * as React from "react";
import { X } from "lucide-react";
import { site } from "@/content/site";
import { announcement } from "@/content/navigation";
import { trackEvent } from "@/lib/analytics";

const STORAGE_KEY = "ovap-announcement-dismissed";

export function AnnouncementBar() {
  const [dismissed, setDismissed] = React.useState(true);

  React.useEffect(() => {
    // Read the dismissed flag on mount (sessionStorage is browser-only, so this
    // cannot be the SSR-safe initial state — hence the intentional set here).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDismissed(sessionStorage.getItem(STORAGE_KEY) === "1");
  }, []);

  if (dismissed) return null;

  return (
    <div className="relative bg-primary text-primary-foreground">
      <div className="mx-auto flex max-w-6xl items-center justify-center gap-x-2 gap-y-1 px-10 py-2.5 text-center text-sm sm:px-6">
        <p className="font-medium">
          {announcement.message}{" "}
          <a
            href={site.calendlyUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent("consultation_cta_clicked", { source: "announcement" })}
            className="underline decoration-accent decoration-2 underline-offset-4 transition-colors hover:text-accent"
          >
            {announcement.linkLabel}
          </a>
        </p>
      </div>
      <button
        type="button"
        onClick={() => {
          sessionStorage.setItem(STORAGE_KEY, "1");
          setDismissed(true);
        }}
        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-1.5 text-primary-foreground/80 transition-colors hover:bg-white/10 hover:text-primary-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        aria-label="Dismiss announcement"
      >
        <X className="size-4" />
      </button>
    </div>
  );
}
