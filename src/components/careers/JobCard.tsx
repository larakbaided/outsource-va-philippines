import Link from "next/link";
import { ArrowRight, Clock, MapPin } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { JobMeta } from "@/lib/jobs";

/** A single open role on the listing. */
export function JobCard({ job }: { job: JobMeta }) {
  return (
    <Card className="relative flex h-full flex-col p-6 transition-colors hover:border-accent/40 sm:p-7">
      <div className="flex flex-wrap items-center gap-2">
        <Badge variant="sage" size="sm">
          {job.department}
        </Badge>
        <Badge variant="outline" size="sm">
          {job.type}
        </Badge>
        {job.featured && (
          <Badge variant="accent" size="sm">
            Featured
          </Badge>
        )}
      </div>

      <h3 className="mt-4 text-xl font-medium">
        <Link
          href={`/jobs/${job.slug}`}
          className="after:absolute after:inset-0 hover:text-accent-strong"
        >
          {job.title}
        </Link>
      </h3>

      {job.summary && (
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {job.summary}
        </p>
      )}

      <dl className="mt-4 flex flex-wrap gap-x-5 gap-y-1.5 text-sm text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <dt className="sr-only">Location</dt>
          <MapPin className="size-4 shrink-0 opacity-70" aria-hidden="true" />
          <dd>{job.location}</dd>
        </div>
        {job.hours && (
          <div className="flex items-center gap-1.5">
            <dt className="sr-only">Hours</dt>
            <Clock className="size-4 shrink-0 opacity-70" aria-hidden="true" />
            <dd>{job.hours}</dd>
          </div>
        )}
      </dl>

      {job.skills.length > 0 && (
        <div className="mt-5 flex flex-wrap gap-1.5">
          {job.skills.slice(0, 4).map((skill) => (
            <Badge key={skill} variant="default" size="sm">
              {skill}
            </Badge>
          ))}
        </div>
      )}

      <p className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-accent-strong">
        View role and apply
        <ArrowRight className="size-4" aria-hidden="true" />
      </p>
    </Card>
  );
}
