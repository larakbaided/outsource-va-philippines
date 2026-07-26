import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/layout/PageHeader";
import { JobDirectory } from "@/components/careers/JobDirectory";
import { getOpenJobs, getDepartments } from "@/lib/jobs";
import { careersAbsoluteUrl } from "@/lib/careers-url";
import { noOpenRoles } from "@/content/careers";

export const metadata: Metadata = {
  title: "Open Roles",
  description:
    "Current openings for Filipino virtual professionals — GoHighLevel and CRM, executive support, marketing and administrative roles working remotely with US businesses.",
  alternates: { canonical: careersAbsoluteUrl("/jobs") },
};

export default function JobsPage() {
  const jobs = getOpenJobs();
  const departments = getDepartments();

  return (
    <>
      <PageHeader
        eyebrow="Open roles"
        title={
          jobs.length > 0
            ? `We're hiring for ${jobs.length} role${jobs.length === 1 ? "" : "s"}.`
            : noOpenRoles.heading
        }
        description={
          jobs.length > 0
            ? "Every role below is remote, ongoing, and with a US-based client business. Read the detail, then apply in a few minutes."
            : noOpenRoles.body
        }
        breadcrumbs={[
          { name: "Careers", href: "/" },
          { name: "Open Roles", href: "/jobs" },
        ]}
      />

      <Section>
        {jobs.length > 0 ? (
          <JobDirectory jobs={jobs} departments={departments} />
        ) : (
          <Card className="p-8 text-center sm:p-10">
            <h2 className="text-xl font-medium">Nothing open at the moment</h2>
            <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
              {noOpenRoles.body}
            </p>
            <div className="mt-7 flex justify-center">
              <Button asChild variant="outline">
                <Link href="/">Read how hiring works</Link>
              </Button>
            </div>
          </Card>
        )}
      </Section>
    </>
  );
}
