"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/reveal";
import { JobCard } from "@/components/careers/JobCard";
import type { JobMeta } from "@/lib/jobs";

/** Open roles with a department filter. Mirrors TalentDirectory. */
export function JobDirectory({
  jobs,
  departments,
}: {
  jobs: JobMeta[];
  departments: string[];
}) {
  const [active, setActive] = React.useState<string>("All");

  const visible =
    active === "All" ? jobs : jobs.filter((j) => j.department === active);

  const filters = ["All", ...departments];

  return (
    <div>
      {departments.length > 1 && (
        <div
          className="flex flex-wrap gap-2"
          role="tablist"
          aria-label="Filter roles by department"
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
                {filter === "All" ? "All Roles" : filter}
              </button>
            );
          })}
        </div>
      )}

      <div
        className={cn(
          "grid gap-5 sm:grid-cols-2 lg:grid-cols-3",
          departments.length > 1 ? "mt-8" : "mt-0",
        )}
      >
        {visible.map((job, i) => (
          <Reveal key={job.slug} delay={i * 50}>
            <JobCard job={job} />
          </Reveal>
        ))}
      </div>

      {visible.length === 0 && (
        <p className="mt-10 text-center text-muted-foreground">
          No roles match this filter right now.
        </p>
      )}
    </div>
  );
}
