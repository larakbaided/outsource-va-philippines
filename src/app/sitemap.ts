import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { absoluteUrl } from "@/lib/utils";
import { team } from "@/content/team";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: {
    path: string;
    priority: number;
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  }[] = [
    { path: "/", priority: 1, changeFrequency: "weekly" },
    { path: "/services", priority: 0.9, changeFrequency: "monthly" },
    { path: "/our-talent", priority: 0.9, changeFrequency: "monthly" },
    { path: "/how-it-works", priority: 0.8, changeFrequency: "monthly" },
    { path: "/about", priority: 0.7, changeFrequency: "monthly" },
    { path: "/contact", priority: 0.8, changeFrequency: "monthly" },
    { path: "/book", priority: 0.8, changeFrequency: "monthly" },
    { path: "/privacy-policy", priority: 0.3, changeFrequency: "yearly" },
    { path: "/terms", priority: 0.3, changeFrequency: "yearly" },
  ];

  const talentRoutes = team.map((m) => ({
    path: `/our-talent/${m.slug}`,
    priority: 0.6,
    changeFrequency: "monthly" as const,
  }));

  // NOTE: lastModified is intentionally omitted (no build-time Date available
  // and static routes have no meaningful per-page timestamp).
  return [...staticRoutes, ...talentRoutes].map((route) => ({
    url: absoluteUrl(route.path, site.url),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
