import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/layout/PageHeader";
import { ConsultationButton } from "@/components/ConsultationButton";
import { FinalCtaSection } from "@/components/sections/FinalCtaSection";
import { BreadcrumbSchema } from "@/components/seo/JsonLd";
import { industries, industryPages } from "@/content/industries";

export const metadata: Metadata = buildMetadata({
  path: "/industries",
  title: "Industries We Serve",
  description:
    "Filipino virtual assistants for US real estate, coaches and consultants, marketing agencies, healthcare and wellness businesses, and more. Remote support matched to your industry.",
});

export default function IndustriesPage() {
  const featuredNames = new Set(industryPages.map((i) => i.name));
  const otherIndustries = industries.filter((i) => !featuredNames.has(i));

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Industries", path: "/industries" },
        ]}
      />
      <PageHeader
        eyebrow="Who we support"
        title="Virtual assistants matched to your industry."
        description="We support a wide range of growing US businesses. These are a few of the industries where our virtual professionals do their best work."
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Industries", href: "/industries" },
        ]}
      >
        <ConsultationButton source="industries-header" />
      </PageHeader>

      <Section>
        <div className="grid gap-5 sm:grid-cols-2">
          {industryPages.map((industry, i) => (
            <Reveal key={industry.slug} delay={i * 60}>
              <Card className="group flex h-full flex-col p-6 transition-shadow duration-300 hover:shadow-[var(--shadow-lift)] sm:p-7">
                <h2 className="text-xl font-medium tracking-tight">
                  <Link
                    href={`/industries/${industry.slug}`}
                    className="transition-colors hover:text-accent-strong"
                  >
                    {industry.name}
                  </Link>
                </h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {industry.intro}
                </p>
                <Link
                  href={`/industries/${industry.slug}`}
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-accent-strong transition-colors hover:text-accent"
                >
                  See how we help
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </Card>
            </Reveal>
          ))}
        </div>

        {otherIndustries.length > 0 && (
          <div className="mt-12">
            <h2 className="text-lg font-medium">We also commonly support</h2>
            <div className="mt-4 flex flex-wrap gap-2.5">
              {otherIndustries.map((name) => (
                <Badge key={name} variant="default" size="md" className="bg-surface">
                  {name}
                </Badge>
              ))}
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Don&apos;t see yours? It&apos;s still worth a conversation.
            </p>
          </div>
        )}
      </Section>

      <FinalCtaSection
        heading="Let's talk about your business."
        description="Tell us what you do and where you need support. We'll help you find the right professional for your industry and goals."
      />
    </>
  );
}
