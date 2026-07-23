"use client";

import * as React from "react";
import { CalendarClock, ExternalLink, Loader2 } from "lucide-react";
import { site } from "@/content/site";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";

const CALENDLY_CSS = "https://assets.calendly.com/assets/external/widget.css";
const CALENDLY_JS = "https://assets.calendly.com/assets/external/widget.js";

/**
 * Responsive, lazy-loaded Calendly inline embed.
 * - Loads the widget only when scrolled into view.
 * - Shows a loading state, then the embed.
 * - Falls back to an "Open Booking Calendar" button if the script fails.
 */
export function CalendlyEmbed() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [status, setStatus] = React.useState<
    "idle" | "loading" | "ready" | "error"
  >("idle");

  // Start loading when the embed nears the viewport.
  React.useEffect(() => {
    const node = containerRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setStatus((s) => (s === "idle" ? "loading" : s));
          observer.disconnect();
        }
      },
      { rootMargin: "200px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // Inject the Calendly assets once we're in "loading".
  React.useEffect(() => {
    if (status !== "loading") return;

    if (!document.querySelector(`link[href="${CALENDLY_CSS}"]`)) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = CALENDLY_CSS;
      document.head.appendChild(link);
    }

    const finish = () => setStatus("ready");
    const fail = () => setStatus("error");

    const existing = document.querySelector<HTMLScriptElement>(
      `script[src="${CALENDLY_JS}"]`,
    );
    if (existing) {
      if ((window as unknown as { Calendly?: unknown }).Calendly) finish();
      else {
        existing.addEventListener("load", finish);
        existing.addEventListener("error", fail);
      }
      return;
    }

    const script = document.createElement("script");
    script.src = CALENDLY_JS;
    script.async = true;
    script.addEventListener("load", finish);
    script.addEventListener("error", fail);
    document.body.appendChild(script);

    // Safety net: if it hasn't loaded in 8s, show the fallback.
    const timeout = window.setTimeout(() => {
      setStatus((s) => (s === "ready" ? s : "error"));
    }, 8000);
    return () => window.clearTimeout(timeout);
  }, [status]);

  return (
    <div ref={containerRef} className="w-full">
      {status === "error" ? (
        <div className="flex flex-col items-center gap-4 rounded-2xl border border-border bg-surface px-6 py-12 text-center">
          <CalendarClock className="size-10 text-accent-strong" />
          <div>
            <p className="font-medium">Ready to book your consultation?</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Open our booking calendar in a new tab to choose a time.
            </p>
          </div>
          <Button asChild variant="accent">
            <a
              href={site.calendlyUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("calendly_opened", { source: "embed-fallback" })}
            >
              Open Booking Calendar
              <ExternalLink className="size-4" />
            </a>
          </Button>
        </div>
      ) : (
        <div className="relative min-h-[680px] overflow-hidden rounded-2xl border border-border bg-surface">
          {status !== "ready" && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-muted-foreground">
              <Loader2 className="size-6 animate-spin" />
              <p className="text-sm">Loading booking calendar…</p>
            </div>
          )}
          {(status === "loading" || status === "ready") && (
            <div
              className="calendly-inline-widget h-[680px] w-full"
              data-url={`${site.calendlyUrl}?hide_gdpr_banner=1&background_color=fbf9f4&primary_color=b08b4f`}
              style={{ minWidth: "280px" }}
            />
          )}
        </div>
      )}

      {/* Always-available fallback link for reliability + accessibility. */}
      <p className="mt-4 text-center text-sm text-muted-foreground">
        Having trouble?{" "}
        <a
          href={site.calendlyUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackEvent("calendly_opened", { source: "embed-link" })}
          className="font-medium text-accent-strong underline underline-offset-2"
        >
          Open the booking calendar in a new tab
        </a>
        .
      </p>
    </div>
  );
}
