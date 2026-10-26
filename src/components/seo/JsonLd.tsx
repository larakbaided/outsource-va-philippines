import { site } from "@/content/site";
import { absoluteUrl } from "@/lib/utils";

/** Render a JSON-LD script tag. Server component — no client JS. */
function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // JSON.stringify output is safe structured data, not user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function OrganizationSchema() {
  // Only include social profiles that are genuinely configured.
  const sameAs = Object.values(site.social).filter(Boolean);

  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        // Plain Organization (not LocalBusiness/ProfessionalService): this is a
        // remote agency with no public storefront, so a LocalBusiness type with
        // no address would be a signal mismatch.
        "@type": "Organization",
        "@id": absoluteUrl("/#organization", site.url),
        name: site.name,
        description: site.description,
        url: site.url,
        logo: {
          "@type": "ImageObject",
          url: absoluteUrl("/android-chrome-512x512.png", site.url),
          width: 512,
          height: 512,
        },
        image: absoluteUrl(site.seo.ogImage, site.url),
        // Truthful country-level origin (no fabricated street address).
        address: { "@type": "PostalAddress", addressCountry: "PH" },
        // Clients are served remotely in the United States.
        areaServed: { "@type": "Country", name: "United States" },
        founder: { "@type": "Person", name: site.founder.name },
        knowsAbout: [
          "GoHighLevel",
          "CRM Management",
          "Marketing Automation",
          "Digital Marketing",
          "Executive Assistance",
          "Social Media Management",
          "Business Operations",
        ],
        // Only emitted when real social profiles exist in site.social.
        ...(sameAs.length ? { sameAs } : {}),
        slogan: site.tagline,
      }}
    />
  );
}

export function WebSiteSchema() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": absoluteUrl("/#website", site.url),
        name: site.name,
        url: site.url,
        description: site.seo.homeDescription,
        publisher: { "@id": absoluteUrl("/#organization", site.url) },
        inLanguage: "en-US",
      }}
    />
  );
}

export function ServiceSchema({
  name,
  description,
  path,
  serviceType,
}: {
  name: string;
  description: string;
  path: string;
  serviceType?: string;
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Service",
        name,
        description,
        ...(serviceType ? { serviceType } : {}),
        url: absoluteUrl(path, site.url),
        provider: { "@id": absoluteUrl("/#organization", site.url) },
        areaServed: { "@type": "Country", name: "United States" },
      }}
    />
  );
}

type Crumb = { name: string; path: string };

export function BreadcrumbSchema({ items }: { items: Crumb[] }) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((c, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: c.name,
          item: absoluteUrl(c.path, site.url),
        })),
      }}
    />
  );
}

export function FaqSchema({
  items,
}: {
  items: { question: string; answer: string }[];
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: items.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: { "@type": "Answer", text: f.answer },
        })),
      }}
    />
  );
}

export function PersonSchema({
  name,
  jobTitle,
  path,
  image,
  description,
  skills,
}: {
  name: string;
  jobTitle: string;
  path: string;
  image?: string;
  description: string;
  skills: string[];
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Person",
        name,
        jobTitle,
        url: absoluteUrl(path, site.url),
        ...(image ? { image: absoluteUrl(image, site.url) } : {}),
        description,
        knowsAbout: skills,
        worksFor: { "@id": absoluteUrl("/#organization", site.url) },
      }}
    />
  );
}

export function ArticleSchema({
  title,
  description,
  path,
  datePublished,
  dateModified,
  author,
  image,
}: {
  title: string;
  description: string;
  path: string;
  datePublished: string;
  dateModified?: string;
  author: string;
  image?: string;
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: title,
        description,
        mainEntityOfPage: absoluteUrl(path, site.url),
        url: absoluteUrl(path, site.url),
        datePublished,
        dateModified: dateModified ?? datePublished,
        author: { "@type": "Person", name: author },
        publisher: { "@id": absoluteUrl("/#organization", site.url) },
        ...(image ? { image: absoluteUrl(image, site.url) } : {}),
        inLanguage: "en-US",
      }}
    />
  );
}
