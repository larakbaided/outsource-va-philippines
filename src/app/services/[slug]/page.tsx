import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, ArrowRight, Wrench, Target as TargetIcon, AlertCircle } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/layout/PageHeader";
import { ServiceIconTile } from "@/components/services/ServiceIcon";
import { TalentAvatar } from "@/components/talent/TalentAvatar";
import { ConsultationButton } from "@/components/ConsultationButton";
import { FaqSection } from "@/components/sections/FaqSection";
import { FinalCtaSection } from "@/components/sections/FinalCtaSection";
import {
  BreadcrumbSchema,
  ServiceSchema,
} from "@/components/seo/JsonLd";
import { services, getService, getServiceByPageSlug } from "@/content/services";
import { getTeamMember } from "@/content/team";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.pageSlug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceByPageSlug(slug);
  if (!service) return buildMetadata({ path: `/services/${slug}` });
  return buildMetadata({
    path: `/services/${service.pageSlug}`,
    title: service.metaTitle,
    description: service.metaDescription,
  });
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceByPageSlug(slug);
  if (!service) notFound();

  const teamMembers = service.relatedTeam
    .map(getTeamMember)
    .filter((m): m is NonNullable<typeof m> => Boolean(m));

  const related = service.relatedServices
    .map(getService)
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
          { name: service.title, path: `/services/${service.pageSlug}` },
        ]}
      />
      <ServiceSchema
        name={service.metaTitle}
        description={service.metaDescription}
        path={`/services/${service.pageSlug}`}
        serviceType={service.serviceType}
      />

      <PageHeader
        eyebrow={service.shortTitle}
        title={service.h1}
        description={service.intro}
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Services", href: "/services" },
          { name: service.title, href: `/services/${service.pageSlug}` },
        ]}
      >
        <ConsultationButton source={`service-${service.pageSlug}-header`} />
      </PageHeader>

      {/* Problems this service solves */}
      <Section>
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <ServiceIconTile name={service.icon} />
            <h2 className="mt-5 text-3xl sm:text-4xl">
              When it&apos;s time for {service.shortTitle.toLowerCase()} support
            </h2>
            <p className="mt-3 text-lg font-medium text-accent-strong">
              {service.tagline}
            </p>
            <div className="mt-6 rounded-xl border border-border bg-surface p-5">
              <h3 className="text-sm font-semibold uppercase tracking-[0.1em] text-foreground/70">
                Who it&apos;s for
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-foreground/80">
                {service.forWho}
              </p>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <h3 className="text-sm font-semibold uppercase tracking-[0.1em] text-foreground/70">
              Sound familiar?
            </h3>
            <ul className="mt-4 space-y-3">
              {service.problems.map((p) => (
                <li key={p} className="flex items-start gap-3">
                  <AlertCircle className="mt-0.5 size-5 shrink-0 text-accent-strong" />
                  <span className="text-foreground/85">{p}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 leading-relaxed text-muted-foreground">
              {service.description}
            </p>
          </Reveal>
        </div>
      </Section>

      {/* What's included */}
      <Section tone="muted">
        <div className="grid gap-5 sm:grid-cols-2">
          <Card className="p-6 sm:col-span-2">
            <h2 className="text-2xl">What&apos;s included</h2>
            <ul className="mt-5 grid gap-2 sm:grid-cols-2">
              {service.responsibilities.map((r) => (
                <li key={r} className="flex items-start gap-2 text-sm">
                  <Check className="mt-0.5 size-4 shrink-0 text-accent-strong" />
                  <span className="text-foreground/80">{r}</span>
                </li>
              ))}
            </ul>
          </Card>

          <Card className="p-6">
            <h3 className="flex items-center gap-2 text-base font-medium">
              <Wrench className="size-4 text-accent-strong" />
              Common tools
            </h3>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {service.tools.map((t) => (
                <Badge key={t} variant="default" size="sm">
                  {t}
                </Badge>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="flex items-center gap-2 text-base font-medium">
              <TargetIcon className="size-4 text-accent-strong" />
              Expected outcomes
            </h3>
            <ul className="mt-4 space-y-2">
              {service.outcomes.map((o) => (
                <li key={o} className="flex items-start gap-2 text-sm">
                  <ArrowRight className="mt-0.5 size-4 shrink-0 text-accent-strong" />
                  <span className="text-foreground/80">{o}</span>
                </li>
              ))}
            </ul>
          </Card>

          <Card className="p-6 sm:col-span-2">
            <h3 className="text-base font-medium">Example tasks</h3>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {service.exampleTasks.map((t) => (
                <li key={t} className="flex items-start gap-2 text-sm">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-accent" />
                  <span className="text-foreground/80">{t}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </Section>

      {/* Related team */}
      {teamMembers.length > 0 && (
        <Section>
          <h2 className="text-2xl sm:text-3xl">Professionals in this area</h2>
          <p className="mt-2 text-muted-foreground">
            A few of the people who could support this work. You meet your
            recommended professional before anything begins.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {teamMembers.map((m) => (
              <Link
                key={m.slug}
                href={`/our-talent/${m.slug}`}
                className="group inline-flex items-center gap-3 rounded-full border border-border bg-surface py-1.5 pl-1.5 pr-4 transition-colors hover:border-accent/40"
              >
                <TalentAvatar member={m} className="size-9 rounded-full" sizes="36px" />
                <span className="text-sm">
                  <span className="font-medium">{m.name}</span>
                  <span className="block text-xs text-muted-foreground">
                    {m.role}
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </Section>
      )}

      {/* Service-specific FAQs (with FAQPage schema) */}
      {service.faqs.length > 0 && (
        <FaqSection
          items={service.faqs}
          tone="muted"
          eyebrow="Questions"
          title={`${service.shortTitle} — common questions`}
        />
      )}

      {/* Related services */}
      {related.length > 0 && (
        <Section>
          <h2 className="text-2xl sm:text-3xl">Related services</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {related.map((r) => (
              <Link
                key={r.pageSlug}
                href={`/services/${r.pageSlug}`}
                className="group flex items-start gap-4 rounded-xl border border-border bg-surface p-5 transition-colors hover:border-accent/40"
              >
                <ServiceIconTile name={r.icon} />
                <span>
                  <span className="block font-medium">{r.title}</span>
                  <span className="mt-1 block text-sm text-muted-foreground">
                    {r.tagline}
                  </span>
                  <span className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-accent-strong">
                    Learn more
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </span>
              </Link>
            ))}
          </div>
          <div className="mt-8">
            <Link
              href="/services"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-accent-strong hover:text-accent"
            >
              View all services
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </Section>
      )}

      <FinalCtaSection
        heading={`Ready for ${service.shortTitle.toLowerCase()} support?`}
        description="Book a free 30-minute consultation. Tell us what you need, and we'll help you find the right professional for the work."
      />
    </>
  );
}
