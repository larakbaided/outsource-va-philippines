import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/layout/PageHeader";
import { ConsultationButton } from "@/components/ConsultationButton";
import { ServiceIconTile } from "@/components/services/ServiceIcon";
import { TimezoneSection } from "@/components/sections/TimezoneSection";
import { IndustriesSection } from "@/components/sections/IndustriesSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { FinalCtaSection } from "@/components/sections/FinalCtaSection";
import { BreadcrumbSchema, ServiceSchema } from "@/components/seo/JsonLd";
import { australiaPage, whyAustralia, howVasWorkAu, australiaFaqs } from "@/content/australia";
import { services } from "@/content/services";

export const metadata: Metadata = buildMetadata({
  path: "/australia",
  title: australiaPage.metaTitle,
  description: australiaPage.metaDescription,
});

export default function AustraliaPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Australia", path: "/australia" },
        ]}
      />
      <ServiceSchema
        name="Virtual Assistant Services for Australian Businesses"
        description={australiaPage.metaDescription}
        path="/australia"
        areaServed={["Australia"]}
      />

      <PageHeader
        eyebrow={australiaPage.eyebrow}
        title={australiaPage.h1}
        description={australiaPage.intro}
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Australia", href: "/australia" },
        ]}
      >
        <ConsultationButton source="australia-header" />
      </PageHeader>

      {/* Why Australian businesses hire Filipino VAs */}
      <Section>
        <SectionHeading
          eyebrow="Why Australia"
          title={whyAustralia.heading}
          description={whyAustralia.description}
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {whyAustralia.reasons.map((reason, i) => (
            <Reveal key={reason.title} delay={i * 60}>
              <Card className="flex h-full flex-col p-6 sm:p-7">
                <h3 className="text-lg font-medium">{reason.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {reason.body}
                </p>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Services we provide */}
      <Section tone="muted">
        <SectionHeading
          eyebrow="Services"
          title="Support for the work that matters most."
          description="From technical CRM work to day-to-day operations, matched to what your Australian business actually needs."
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <Link
              key={s.pageSlug}
              href={`/services/${s.pageSlug}`}
              className="group flex flex-col rounded-xl border border-border bg-surface p-5 transition-colors hover:border-accent/40"
            >
              <ServiceIconTile name={s.icon} />
              <span className="mt-4 font-medium">{s.shortTitle}</span>
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

      {/* How our VAs work with Australian businesses */}
      <Section>
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl sm:text-3xl">{howVasWorkAu.heading}</h2>
          <div className="mt-5 space-y-4">
            {howVasWorkAu.paragraphs.map((paragraph) => (
              <p key={paragraph} className="leading-relaxed text-muted-foreground">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </Section>

      {/* Australian timezone compatibility */}
      <TimezoneSection tone="muted" />

      {/* Industries we support */}
      <IndustriesSection />

      {/* How hiring works */}
      <ProcessSection tone="muted" />

      {/* FAQ */}
      <FaqSection
        items={australiaFaqs}
        eyebrow="Questions"
        title="Australian businesses — common questions"
      />

      <FinalCtaSection
        heading="Let's talk about your Australian business."
        description="Book a free 30-minute consultation. Tell us what you need, and we'll help you find the right professional — with AEST-friendly working hours."
        source="australia-final-cta"
      />
    </>
  );
}
