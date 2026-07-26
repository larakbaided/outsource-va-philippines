import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/layout/PageHeader";
import { LegalDocument } from "@/components/legal/LegalDocument";
import { BreadcrumbSchema } from "@/components/seo/JsonLd";
import { termsSections } from "@/content/legal";

export const metadata: Metadata = buildMetadata({
  path: "/terms",
  title: "Terms and Conditions",
  description:
    "The terms governing use of the Outsource VA Philippines website. A general starter template pending legal review.",
});

export default function TermsPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Terms and Conditions", path: "/terms" },
        ]}
      />
      <PageHeader
        eyebrow="Legal"
        title="Terms and Conditions"
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Terms and Conditions", href: "/terms" },
        ]}
      />
      <LegalDocument
        sections={termsSections}
        notice="These Terms and Conditions are a general starter template provided for convenience. They are not legal advice and must be reviewed and adapted by a qualified professional before use. The governing law and legal entity details are placeholders pending confirmation."
      />
    </>
  );
}
