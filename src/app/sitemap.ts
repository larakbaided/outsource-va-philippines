import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { absoluteUrl } from "@/lib/utils";
import { team } from "@/content/team";
import { services } from "@/content/services";
import { industryPages } from "@/content/industries";
import { getAllPosts } from "@/lib/blog";
import { staticRouteUpdated, toLastModified } from "@/content/last-modified";

type SitemapRoute = {
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  /** YYYY-MM-DD. Falls back to CONTENT_BASELINE when absent. */
  updated?: string;
};

/**
 * Every entry's `lastModified` comes from a date recorded alongside the
 * content, never from the clock. Build time would mark all 32 static URLs as
 * changed on every deploy, and a <lastmod> that always reads "just now" is a
 * signal search engines learn to ignore. See content/last-modified.ts for how
 * to bump a page's date after a real content edit.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: SitemapRoute[] = [
    { path: "/", priority: 1, changeFrequency: "weekly" },
    { path: "/services", priority: 0.9, changeFrequency: "monthly" },
    { path: "/industries", priority: 0.8, changeFrequency: "monthly" },
    { path: "/pricing", priority: 0.9, changeFrequency: "monthly" },
    { path: "/why-hire-filipino-virtual-assistants", priority: 0.7, changeFrequency: "monthly" },
    { path: "/our-talent", priority: 0.9, changeFrequency: "monthly" },
    { path: "/testimonial", priority: 0.8, changeFrequency: "monthly" },
    { path: "/how-it-works", priority: 0.8, changeFrequency: "monthly" },
    { path: "/about", priority: 0.7, changeFrequency: "monthly" },
    { path: "/contact", priority: 0.8, changeFrequency: "monthly" },
    { path: "/book", priority: 0.8, changeFrequency: "monthly" },
    { path: "/blog", priority: 0.7, changeFrequency: "weekly" },
    { path: "/privacy-policy", priority: 0.3, changeFrequency: "yearly" },
    { path: "/terms", priority: 0.3, changeFrequency: "yearly" },
  ];

  const staticRoutes: SitemapRoute[] = staticPages.map((route) => ({
    ...route,
    updated: staticRouteUpdated[route.path],
  }));

  const serviceRoutes: SitemapRoute[] = services.map((s) => ({
    path: `/services/${s.pageSlug}`,
    priority: 0.8,
    changeFrequency: "monthly" as const,
    updated: s.updated,
  }));

  const industryRoutes: SitemapRoute[] = industryPages.map((i) => ({
    path: `/industries/${i.slug}`,
    priority: 0.7,
    changeFrequency: "monthly" as const,
    updated: i.updated,
  }));

  const talentRoutes: SitemapRoute[] = team.map((m) => ({
    path: `/our-talent/${m.slug}`,
    priority: 0.6,
    changeFrequency: "monthly" as const,
    updated: m.updated,
  }));

  // Blog posts carry their own date in Markdown frontmatter.
  const blogEntries: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: absoluteUrl(`/blog/${post.slug}`, site.url),
    lastModified: toLastModified(post.updated ?? post.date),
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
    lastModified: toLastModified(route.updated),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  return [...staticEntries, ...blogEntries];
}
