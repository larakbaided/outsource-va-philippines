import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, ArrowRight, AlertCircle } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/layout/PageHeader";
import { ServiceIconTile } from "@/components/services/ServiceIcon";
import { ConsultationButton } from "@/components/ConsultationButton";
import { FaqSection } from "@/components/sections/FaqSection";
import { FinalCtaSection } from "@/components/sections/FinalCtaSection";
import { BreadcrumbSchema } from "@/components/seo/JsonLd";
import { industryPages, getIndustryPage } from "@/content/industries";
import { getService } from "@/content/services";

export function generateStaticParams() {
  return industryPages.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const industry = getIndustryPage(slug);
  if (!industry) return buildMetadata({ path: `/industries/${slug}` });
  return buildMetadata({
    path: `/industries/${industry.slug}`,
    title: industry.metaTitle,
    description: industry.metaDescription,
  });
}

export default async function IndustryDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const industry = getIndustryPage(slug);
  if (!industry) notFound();

  const relevant = industry.relevantServices
    .map(getService)
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Industries", path: "/industries" },
          { name: industry.name, path: `/industries/${industry.slug}` },
        ]}
      />

      <PageHeader
        eyebrow="Industry"
        title={industry.h1}
        description={industry.intro}
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Industries", href: "/industries" },
          { name: industry.name, href: `/industries/${industry.slug}` },
        ]}
      >
        <ConsultationButton source={`industry-${industry.slug}-header`} />
      </PageHeader>

      {/* Problems + how we help */}
      <Section>
        <div className="grid gap-10 lg:grid-cols-2">
          <Reveal>
            <h2 className="text-2xl sm:text-3xl">Common challenges we hear</h2>
            <ul className="mt-5 space-y-3">
              {industry.problems.map((p) => (
                <li key={p} className="flex items-start gap-3">
                  <AlertCircle className="mt-0.5 size-5 shrink-0 text-accent-strong" />
                  <span className="text-foreground/85">{p}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={80}>
            <h2 className="text-2xl sm:text-3xl">How a virtual assistant helps</h2>
            <ul className="mt-5 space-y-2">
              {industry.tasks.map((t) => (
                <li key={t} className="flex items-start gap-2">
                  <Check className="mt-0.5 size-4 shrink-0 text-accent-strong" />
                  <span className="text-foreground/85">{t}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Section>

      {/* Relevant services */}
      {relevant.length > 0 && (
        <Section tone="muted">
          <h2 className="text-2xl sm:text-3xl">Services that fit {industry.shortName}</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {relevant.map((s) => (
              <Link
                key={s.pageSlug}
                href={`/services/${s.pageSlug}`}
                className="group flex flex-col rounded-xl border border-border bg-surface p-5 transition-colors hover:border-accent/40"
              >
                <ServiceIconTile name={s.icon} />
                <span className="mt-4 font-medium">{s.title}</span>
                <span className="mt-1 flex-1 text-sm text-muted-foreground">
                  {s.tagline}
                </span>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-accent-strong">
                  Learn more
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            ))}
          </div>
        </Section>
      )}

      {/* Industry FAQs (with FAQPage schema) */}
      {industry.faqs.length > 0 && (
        <FaqSection
          items={industry.faqs}
          eyebrow="Questions"
          title={`${industry.shortName} — common questions`}
        />
      )}

      <Section tone="muted">
        <Card className="p-6 text-center sm:p-8">
          <p className="text-sm text-muted-foreground">
            Not sure where to start? See{" "}
            <Link href="/how-it-works" className="font-medium text-accent-strong hover:text-accent">
              how it works
            </Link>{" "}
            or{" "}
            <Link href="/why-hire-filipino-virtual-assistants" className="font-medium text-accent-strong hover:text-accent">
              why businesses hire Filipino virtual assistants
            </Link>
            .
          </p>
        </Card>
      </Section>

      <FinalCtaSection
        heading={`Ready to support your ${industry.shortName.toLowerCase()} business?`}
        description="Book a free 30-minute consultation. Tell us what you need, and we'll help you find the right professional."
      />
    </>
  );
}
