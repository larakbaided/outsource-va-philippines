"use client";

import * as React from "react";

/**
 * Cloudflare Turnstile widget. Renders only when a site key is configured;
 * otherwise it renders nothing and the form submits without a token (the
 * server skips verification when the secret is also absent).
 */

interface TurnstileWindow extends Window {
  turnstile?: {
    render: (
      el: HTMLElement,
      opts: {
        sitekey: string;
        callback: (token: string) => void;
        "expired-callback"?: () => void;
        "error-callback"?: () => void;
        theme?: "light" | "dark" | "auto";
      },
    ) => string;
    reset: (id?: string) => void;
  };
}

const SCRIPT_SRC =
  "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

export function Turnstile({
  onVerify,
  onExpire,
}: {
  onVerify: (token: string) => void;
  onExpire?: () => void;
}) {
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  const ref = React.useRef<HTMLDivElement>(null);
  const widgetId = React.useRef<string | null>(null);

  React.useEffect(() => {
    if (!siteKey || !ref.current) return;
    const w = window as TurnstileWindow;

    const render = () => {
      if (!ref.current || widgetId.current || !w.turnstile) return;
      widgetId.current = w.turnstile.render(ref.current, {
        sitekey: siteKey,
        callback: onVerify,
        "expired-callback": onExpire,
        theme: "auto",
      });
    };

    if (w.turnstile) {
      render();
      return;
    }

    // Load the script once.
    const existing = document.querySelector<HTMLScriptElement>(
      `script[src="${SCRIPT_SRC}"]`,
    );
    if (existing) {
      existing.addEventListener("load", render);
      return () => existing.removeEventListener("load", render);
    }

    const script = document.createElement("script");
    script.src = SCRIPT_SRC;
    script.async = true;
    script.defer = true;
    script.addEventListener("load", render);
    document.head.appendChild(script);
  }, [siteKey, onVerify, onExpire]);

  if (!siteKey) return null;

  return <div ref={ref} className="min-h-[65px]" aria-label="Verification" />;
}

export const turnstileConfigured = Boolean(
  process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY,
);
