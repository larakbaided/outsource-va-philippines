import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { Section } from "@/components/ui/section";
import { PageHeader } from "@/components/layout/PageHeader";
import { TalentDirectory } from "@/components/talent/TalentDirectory";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { FinalCtaSection } from "@/components/sections/FinalCtaSection";
import { BreadcrumbSchema, PersonSchema } from "@/components/seo/JsonLd";
import { team } from "@/content/team";

export const metadata: Metadata = buildMetadata({
  path: "/our-talent",
  title: "Our Talent",
  description:
    "Meet the founding professionals at Outsource VA Philippines — experienced specialists in GoHighLevel, executive support, digital marketing, and social media.",
});

export default function OurTalentPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Our Talent", path: "/our-talent" },
        ]}
      />
      {team.map((m) => (
        <PersonSchema
          key={m.slug}
          name={m.name}
          jobTitle={m.role}
          path={`/our-talent/${m.slug}`}
          description={m.shortBio}
          skills={m.skills}
          image={m.imageIsPlaceholder ? undefined : m.image}
        />
      ))}

      <PageHeader
        eyebrow="Our talent"
        title="Experienced professionals, ready to be matched."
        description="Each member of our founding team brings focused, real-world experience. Filter by specialty to find the kind of support your business needs."
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Our Talent", href: "/our-talent" },
        ]}
      />

      <Section>
        <TalentDirectory />
      </Section>

      <ProcessSection tone="muted" />
      <FinalCtaSection
        heading="Found someone who fits?"
        description="Book a consultation and we'll talk through how the right professional can support your goals — or help you find an even better match."
      />
    </>
  );
}
