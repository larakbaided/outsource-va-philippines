import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, MapPin, Briefcase, CalendarDays } from "lucide-react";
import { Section } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { PageHeader } from "@/components/layout/PageHeader";
import { Markdown } from "@/components/blog/Markdown";
import { JobCard } from "@/components/careers/JobCard";
import { ApplicationForm } from "@/components/careers/ApplicationForm";
import { JobPostingSchema } from "@/components/careers/JobPostingSchema";
import {
  getAllJobSlugs,
  getJobBySlug,
  getOtherJobs,
  isJobOpen,
  formatJobDate,
} from "@/lib/jobs";
import { careersAbsoluteUrl } from "@/lib/careers-url";

type Params = { slug: string };

/** Only slugs returned by generateStaticParams render; anything else 404s. */
export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return getAllJobSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const job = getJobBySlug(slug);
  if (!job) return {};

  const description =
    job.meta.summary ||
    `${job.meta.title} — ${job.meta.type}, ${job.meta.location}.`;

  return {
    title: job.meta.title,
    description,
    alternates: { canonical: careersAbsoluteUrl(`/jobs/${job.meta.slug}`) },
    openGraph: {
      type: "article",
      title: `${job.meta.title} | Careers — Outsource VA Philippines`,
      description,
      url: careersAbsoluteUrl(`/jobs/${job.meta.slug}`),
    },
  };
}

export default async function JobPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const job = getJobBySlug(slug);
  if (!job) notFound();

  const { meta, content } = job;
  const open = isJobOpen(meta);
  const others = getOtherJobs(slug);

  return (
    <>
      <JobPostingSchema meta={meta} description={meta.summary} />

      <PageHeader
        eyebrow={meta.department}
        title={meta.title}
        description={meta.summary || undefined}
        breadcrumbs={[
          { name: "Careers", href: "/" },
          { name: "Open Roles", href: "/jobs" },
          { name: meta.title, href: `/jobs/${meta.slug}` },
        ]}
      >
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline" size="md">
            {meta.type}
          </Badge>
          {!open && (
            <Badge variant="default" size="md">
              Closed
            </Badge>
          )}
        </div>
      </PageHeader>

      <Section>
        <div className="grid gap-10 lg:grid-cols-[1.6fr_1fr]">
          {/* Role detail */}
          <Reveal>
            <Markdown content={content} />

            <div className="mt-10">
              <Button asChild variant="link">
                <Link href="/jobs">
                  <ArrowLeft className="size-4" />
                  Back to all roles
                </Link>
              </Button>
            </div>
          </Reveal>

          {/* Facts + skills */}
          <Reveal delay={80}>
            <div className="lg:sticky lg:top-24">
              <Card className="p-6">
                <h2 className="text-base font-medium">Role at a glance</h2>
                <dl className="mt-4 space-y-3 text-sm">
                  <Fact icon={Briefcase} label="Type" value={meta.type} />
                  <Fact icon={MapPin} label="Location" value={meta.location} />
                  {meta.hours && (
                    <Fact icon={Clock} label="Hours" value={meta.hours} />
                  )}
                  <Fact
                    icon={CalendarDays}
                    label="Posted"
                    value={formatJobDate(meta.posted)}
                  />
                  {meta.closing && (
                    <Fact
                      icon={CalendarDays}
                      label="Applications close"
                      value={formatJobDate(meta.closing)}
                    />
                  )}
                  {meta.compensation && (
                    <Fact
                      icon={Briefcase}
                      label="Compensation"
                      value={meta.compensation}
                    />
                  )}
                </dl>

                {meta.tools.length > 0 && (
                  <>
                    <h3 className="mt-6 text-base font-medium">Tools</h3>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {meta.tools.map((tool) => (
                        <Badge key={tool} variant="outline" size="sm">
                          {tool}
                        </Badge>
                      ))}
                    </div>
                  </>
                )}

                {open && (
                  <Button asChild className="mt-6 w-full">
                    <Link href="#apply">Apply for this role</Link>
                  </Button>
                )}
              </Card>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Application */}
      <Section tone="muted" id="apply">
        <div className="mx-auto max-w-2xl">
          {open ? (
            <>
              <h2 className="text-3xl sm:text-4xl">Apply for this role</h2>
              <p className="mt-3 text-muted-foreground">
                A few minutes is all it takes. We read every application and
                will let you know either way.
              </p>
              <div className="mt-8">
                <ApplicationForm
                  jobSlug={meta.slug}
                  jobTitle={meta.title}
                />
              </div>
            </>
          ) : (
            <Card className="p-8 text-center">
              <h2 className="text-2xl">This role has closed.</h2>
              <p className="mx-auto mt-3 max-w-md text-muted-foreground">
                Applications are no longer being accepted for {meta.title}.
                Have a look at what else is open.
              </p>
              <div className="mt-7 flex justify-center">
                <Button asChild>
                  <Link href="/jobs">View open roles</Link>
                </Button>
              </div>
            </Card>
          )}
        </div>
      </Section>

      {/* Other roles */}
      {others.length > 0 && (
        <Section>
          <h2 className="text-2xl sm:text-3xl">Other open roles</h2>
          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {others.map((other, i) => (
              <Reveal key={other.slug} delay={i * 60} className="h-full">
                <JobCard job={other} />
              </Reveal>
            ))}
          </div>
        </Section>
      )}
    </>
  );
}

function Fact({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="flex gap-2.5">
      <Icon className="mt-0.5 size-4 shrink-0 text-accent-strong" />
      <div>
        <dt className="text-muted-foreground">{label}</dt>
        <dd className="font-medium">{value}</dd>
      </div>
    </div>
  );
}
