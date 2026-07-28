"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/reveal";
import { TestimonialCard } from "@/components/testimonials/TestimonialCard";
import {
  activeTestimonialCategories,
  type TestimonialCategory,
} from "@/content/testimonials";
import type { TestimonialView } from "@/lib/testimonials";

type Filter = "All" | TestimonialCategory;

/**
 * The full testimonial collection with category filters.
 *
 * Filtering is component state, never a URL parameter. Six filters as
 * crawlable URLs would mean six near-duplicate thin pages competing with
 * /testimonial itself, which is exactly the kind of duplication that put
 * pages into "Discovered - currently not indexed" in the first place.
 *
 * On the filter controls: these are toggle buttons with `aria-pressed`, not
 * `role="tab"`. Tabs promise arrow-key navigation between them and a matching
 * tabpanel; a filter that reflows a grid is a pressed-state control, and
 * `aria-pressed` describes it truthfully. Tab and Enter/Space work as expected
 * with no extra keyboard handling.
 */
export function TestimonialDirectory({ items }: { items: TestimonialView[] }) {
  const [active, setActive] = React.useState<Filter>("All");

  const filters: Filter[] = ["All", ...activeTestimonialCategories];

  const visible =
    active === "All"
      ? items
      : items.filter((t) => t.categories.includes(active));

  return (
    <div>
      <div
        role="group"
        aria-label="Filter testimonials by service category"
        className="flex flex-wrap gap-2"
      >
        {filters.map((filter) => {
          const isActive = active === filter;
          return (
            <button
              key={filter}
              type="button"
              aria-pressed={isActive}
              onClick={() => setActive(filter)}
              className={cn(
                "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-surface text-foreground/75 hover:border-accent/40 hover:text-accent-strong",
              )}
            >
              {filter === "All" ? "All Testimonials" : filter}
            </button>
          );
        })}
      </div>

      {/*
        Screen readers get told the grid changed. Without this, pressing a
        filter is silent for anyone not watching the cards reflow.
      */}
      <p aria-live="polite" className="sr-only">
        {visible.length} {visible.length === 1 ? "testimonial" : "testimonials"}{" "}
        shown
        {active !== "All" ? ` for ${active}` : ""}.
      </p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((testimonial, i) => (
          <Reveal key={testimonial.id} delay={i * 50} className="h-full">
            <TestimonialCard testimonial={testimonial} priority={i < 3} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}
