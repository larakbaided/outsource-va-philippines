import type { Metadata } from "next";
import { site } from "@/content/site";
import { absoluteUrl } from "@/lib/utils";

type BuildMetadataArgs = {
  title?: string;
  description?: string;
  /** Site-relative path, e.g. "/services". */
  path?: string;
  /**
   * Custom social sharing image. When omitted, the site-wide generated image
   * (src/app/opengraph-image.tsx) is used automatically via file convention.
   */
  ogImage?: string;
  noIndex?: boolean;
};

/**
 * Build consistent, per-page metadata (canonical URL, Open Graph, Twitter).
 * `title` is composed with the brand name via the template in layout.tsx.
 */
export function buildMetadata({
  title,
  description = site.seo.homeDescription,
  path = "/",
  ogImage,
  noIndex = false,
}: BuildMetadataArgs = {}): Metadata {
  const canonical = absoluteUrl(path, site.url);
  const image = ogImage
    ? ogImage.startsWith("http")
      ? ogImage
      : absoluteUrl(ogImage, site.url)
    : undefined;

  return {
    // Omit `title` entirely when not provided so pages (like the homepage)
    // correctly inherit the layout's title.default instead of an empty title.
    ...(title ? { title } : {}),
    description,
    alternates: { canonical },
    robots: noIndex ? { index: false, follow: false } : undefined,
    openGraph: {
      type: "website",
      siteName: site.name,
      title: title ? `${title} | ${site.name}` : site.seo.socialTitle,
      description,
      url: canonical,
      // Only override the auto-generated OG image when a custom one is given.
      ...(image
        ? { images: [{ url: image, width: 1200, height: 630, alt: site.name }] }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: title ? `${title} | ${site.name}` : site.seo.socialTitle,
      description,
      ...(image ? { images: [image] } : {}),
    },
  };
}
