"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { mainNav, primaryCta } from "@/content/navigation";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/button";
import { ConsultationButton } from "@/components/ConsultationButton";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu on route change and lock scroll while open.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  React.useEffect(() => setMenuOpen(false), [pathname]);
  React.useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b transition-colors duration-300",
        scrolled
          ? "border-border bg-background/85 backdrop-blur-md"
          : "border-transparent bg-background",
      )}
    >
      <div className="mx-auto flex h-18 max-w-page items-center justify-between px-5 sm:px-8 lg:px-12">
        <Link href="/" aria-label="Outsource VA Philippines — home">
          <Logo />
        </Link>

        {/*
          Desktop navigation appears at xl (1280px), not lg (1024px).

          Eight primary items plus the wordmark and the consultation button do
          not fit in 1024px: "Our Talent" and "How It Works" each wrap onto two
          lines and the wordmark breaks onto three. This was already true of the
          previous eight items before Testimonials existed, and swapping Blog
          out for Testimonials made it marginally worse rather than better —
          measured both ways, twelve characters against four. Tightening the
          padding produces a cramped row, not a fix.

          From 1024px to 1279px the menu button is shown instead, which offers
          the identical navigation with no wrapping. All eight fit comfortably
          on one row from 1280px up.
        */}
        <nav className="hidden items-center gap-1 xl:flex" aria-label="Primary">
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={cn(
                "rounded-full px-3.5 py-2 text-[0.95rem] font-medium transition-colors",
                isActive(item.href)
                  ? "text-accent-strong"
                  : "text-foreground/75 hover:text-foreground",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ConsultationButton
            source="header"
            size="sm"
            className="hidden sm:inline-flex"
          >
            {primaryCta.label}
          </ConsultationButton>

          <button
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-full text-foreground transition-colors hover:bg-primary/[0.06] xl:hidden"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </div>

      {/* Mobile / tablet menu — shown below xl, see the note on the nav above. */}
      {menuOpen && (
        <div
          className="fixed inset-x-0 bottom-0 top-18 z-40 overflow-y-auto border-t border-border bg-background xl:hidden"
          id="mobile-menu"
        >
          <nav
            className="mx-auto flex max-w-page flex-col gap-1 px-5 py-6 sm:px-8"
            aria-label="Mobile"
          >
            {mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={cn(
                  "rounded-xl px-4 py-3.5 text-lg font-medium transition-colors",
                  isActive(item.href)
                    ? "bg-surface-muted text-accent-strong"
                    : "text-foreground hover:bg-surface-muted",
                )}
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-4 flex flex-col gap-3">
              <ConsultationButton source="mobile-menu" size="lg">
                {primaryCta.label}
              </ConsultationButton>
              <Button asChild variant="outline" size="lg">
                <Link href="/contact#inquiry">Send an Inquiry</Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
