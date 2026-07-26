import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { absoluteUrl } from "@/lib/utils";
import { team } from "@/content/team";
import { services } from "@/content/services";
import { industryPages } from "@/content/industries";
import { getAllPosts } from "@/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: {
    path: string;
    priority: number;
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  }[] = [
    { path: "/", priority: 1, changeFrequency: "weekly" },
    { path: "/services", priority: 0.9, changeFrequency: "monthly" },
    { path: "/industries", priority: 0.8, changeFrequency: "monthly" },
    { path: "/pricing", priority: 0.9, changeFrequency: "monthly" },
    { path: "/why-hire-filipino-virtual-assistants", priority: 0.7, changeFrequency: "monthly" },
    { path: "/our-talent", priority: 0.9, changeFrequency: "monthly" },
    { path: "/how-it-works", priority: 0.8, changeFrequency: "monthly" },
    { path: "/about", priority: 0.7, changeFrequency: "monthly" },
    { path: "/contact", priority: 0.8, changeFrequency: "monthly" },
    { path: "/book", priority: 0.8, changeFrequency: "monthly" },
    { path: "/blog", priority: 0.7, changeFrequency: "weekly" },
    { path: "/privacy-policy", priority: 0.3, changeFrequency: "yearly" },
    { path: "/terms", priority: 0.3, changeFrequency: "yearly" },
  ];

  const serviceRoutes = services.map((s) => ({
    path: `/services/${s.pageSlug}`,
    priority: 0.8,
    changeFrequency: "monthly" as const,
  }));

  const industryRoutes = industryPages.map((i) => ({
    path: `/industries/${i.slug}`,
    priority: 0.7,
    changeFrequency: "monthly" as const,
  }));

  const talentRoutes = team.map((m) => ({
    path: `/our-talent/${m.slug}`,
    priority: 0.6,
    changeFrequency: "monthly" as const,
  }));

  // Blog posts carry their own lastModified (from frontmatter date/updated).
  const blogEntries: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: absoluteUrl(`/blog/${post.slug}`, site.url),
    lastModified: new Date(`${post.updated ?? post.date}T00:00:00Z`),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const staticEntries: MetadataRoute.Sitemap = [
    ...staticRoutes,
    ...serviceRoutes,
    ...industryRoutes,
    ...talentRoutes,
  ].map((route) => ({
    url: absoluteUrl(route.path, site.url),
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  return [...staticEntries, ...blogEntries];
}
