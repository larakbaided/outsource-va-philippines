"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/reveal";
import { TalentCard } from "@/components/cards/TalentCard";
import {
  team,
  specialties,
  memberMatchesSpecialty,
  type Specialty,
} from "@/content/team";

type Filter = "All" | Specialty;

const filters: Filter[] = ["All", ...specialties];

export function TalentDirectory() {
  const [active, setActive] = React.useState<Filter>("All");

  const visible =
    active === "All"
      ? team
      : team.filter((m) => memberMatchesSpecialty(m, active));

  return (
    <div>
      {/* Filter controls */}
      <div
        className="flex flex-wrap gap-2"
        role="tablist"
        aria-label="Filter talent by specialty"
      >
        {filters.map((filter) => {
          const isActive = active === filter;
          return (
            <button
              key={filter}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActive(filter)}
              className={cn(
                "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-surface text-foreground/75 hover:border-accent/40 hover:text-accent-strong",
              )}
            >
              {filter === "All" ? "All Professionals" : filter}
            </button>
          );
        })}
      </div>

      {/* Grid */}
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((member, i) => (
          <Reveal key={member.slug} delay={i * 50}>
            <TalentCard member={member} showAskButton priority={i < 3} />
          </Reveal>
        ))}
      </div>

      {visible.length === 0 && (
        <p className="mt-10 text-center text-muted-foreground">
          No professionals match this filter yet.
        </p>
      )}

      <p className="mt-8 text-sm text-muted-foreground">
        Availability confirmed during consultation.
      </p>
    </div>
  );
}
