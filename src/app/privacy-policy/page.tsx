import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/layout/PageHeader";
import { LegalDocument } from "@/components/legal/LegalDocument";
import { BreadcrumbSchema } from "@/components/seo/JsonLd";
import { privacySections } from "@/content/legal";

export const metadata: Metadata = buildMetadata({
  path: "/privacy-policy",
  title: "Privacy Policy",
  description:
    "How Outsource VA Philippines collects, uses, and protects your information. A general starter policy pending legal review.",
});

export default function PrivacyPolicyPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Privacy Policy", path: "/privacy-policy" },
        ]}
      />
      <PageHeader
        eyebrow="Legal"
        title="Privacy Policy"
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Privacy Policy", href: "/privacy-policy" },
        ]}
      />
      <LegalDocument
        sections={privacySections}
        notice="This Privacy Policy is a general starter template provided for convenience. It is not legal advice and must be reviewed and adapted by a qualified professional before you rely on it. Business-specific details (legal entity name, address, and privacy contact email) are placeholders pending confirmation."
      />
    </>
  );
}
