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
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        "@id": absoluteUrl("/#organization", site.url),
        name: site.name,
        description: site.description,
        url: site.url,
        image: absoluteUrl(site.seo.ogImage, site.url),
        areaServed: "Worldwide",
        knowsAbout: [
          "GoHighLevel",
          "CRM Management",
          "Digital Marketing",
          "Executive Assistance",
          "Social Media Management",
          "Business Operations",
        ],
        // Contact details are placeholders until approved business info exists.
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
        inLanguage: "en",
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
