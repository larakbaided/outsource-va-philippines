import { site } from "@/content/site";
import { careersAbsoluteUrl } from "@/lib/careers-url";
import type { JobMeta } from "@/lib/jobs";

/**
 * JobPosting structured data so roles can appear in Google Jobs.
 *
 * Deliberately omits `baseSalary`: we do not publish contractor pay, and an
 * invented figure would be worse than none. Add it only from an approved
 * `compensation` value.
 */
export function JobPostingSchema({
  meta,
  description,
}: {
  meta: JobMeta;
  description: string;
}) {
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: meta.title,
    description: description || meta.title,
    datePosted: meta.posted,
    ...(meta.closing ? { validThrough: `${meta.closing}T23:59:59Z` } : {}),
    // Roles are contractor engagements, not employment.
    employmentType: "CONTRACTOR",
    hiringOrganization: {
      "@type": "Organization",
      name: site.name,
      sameAs: site.url,
      logo: new URL("/android-chrome-512x512.png", site.url).toString(),
    },
    jobLocationType: "TELECOMMUTE",
    applicantLocationRequirements: {
      "@type": "Country",
      name: "Philippines",
    },
    directApply: true,
    url: careersAbsoluteUrl(`/jobs/${meta.slug}`),
    identifier: {
      "@type": "PropertyValue",
      name: site.name,
      value: meta.slug,
    },
    industry: meta.department,
    ...(meta.skills.length ? { skills: meta.skills.join(", ") } : {}),
  };

  return (
    <script
      type="application/ld+json"
      // JSON.stringify output is safe structured data, not user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
