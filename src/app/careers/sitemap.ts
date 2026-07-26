import type { MetadataRoute } from "next";
import { getOpenJobs } from "@/lib/jobs";
import { careersAbsoluteUrl } from "@/lib/careers-url";

/**
 * Sitemap for the careers subdomain.
 *
 * Served at careers.outsourcevaphilippines.com/sitemap.xml — src/proxy.ts
 * rewrites that request onto /careers/sitemap.xml. Every URL uses the
 * subdomain, never the internal /careers path.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = [
    {
      url: careersAbsoluteUrl("/"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: careersAbsoluteUrl("/jobs"),
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
  ];

  const jobEntries: MetadataRoute.Sitemap = getOpenJobs().map((job) => ({
    url: careersAbsoluteUrl(`/jobs/${job.slug}`),
    lastModified: new Date(`${job.posted}T00:00:00Z`),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticEntries, ...jobEntries];
}
