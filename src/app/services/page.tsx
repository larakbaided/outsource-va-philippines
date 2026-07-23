import type { Metadata } from "next";
import Link from "next/link";
import { Check, ArrowRight, Wrench, Target as TargetIcon } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/layout/PageHeader";
import { ServiceIconTile } from "@/components/services/ServiceIcon";
import { TalentAvatar } from "@/components/talent/TalentAvatar";
import { ConsultationButton } from "@/components/ConsultationButton";
import { FinalCtaSection } from "@/components/sections/FinalCtaSection";
import { BreadcrumbSchema } from "@/components/seo/JsonLd";
import { services } from "@/content/services";
import { getTeamMember } from "@/content/team";

export const metadata: Metadata = buildMetadata({
  path: "/services",
  title: "Services",
  description:
    "Explore virtual assistant services from Outsource VA Philippines — GoHighLevel & CRM, executive support, digital marketing, social media, administrative, and project support.",
});

export default function ServicesPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
        ]}
      />
      <PageHeader
        eyebrow="Services"
        title="Specialized virtual support, matched to your business."
        description="We connect you with experienced professionals in the areas that most affect your operations, marketing, and growth — not generalists, but genuine specialists."
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Services", href: "/services" },
        ]}
      >
        <ConsultationButton source="services-header" />
      </PageHeader>

      {/* Quick jump nav */}
      <div className="border-b border-border bg-surface-muted/50">
        <Container className="flex flex-wrap gap-2 py-4">
          {services.map((s) => (
            <Link
              key={s.slug}
              href={`#${s.slug}`}
              className="rounded-full border border-border bg-surface px-3.5 py-1.5 text-sm text-foreground/75 transition-colors hover:border-accent/40 hover:text-accent-strong"
            >
              {s.shortTitle}
            </Link>
          ))}
        </Container>
      </div>

      {services.map((service, index) => {
        const teamMembers = service.relatedTeam
          .map(getTeamMember)
          .filter((m): m is NonNullable<typeof m> => Boolean(m));

        return (
          <Section
            key={service.slug}
            id={service.slug}
            tone={index % 2 === 1 ? "muted" : "default"}
            className="scroll-mt-24"
          >
            <div className="grid gap-10 lg:grid-cols-[1fr_1.15fr]">
              {/* Left: intro */}
              <Reveal>
                <ServiceIconTile name={service.icon} />
                <h2 className="mt-5 text-3xl sm:text-4xl">{service.title}</h2>
                <p className="mt-3 text-lg font-medium text-accent-strong">
                  {service.tagline}
                </p>
                <p className="mt-4 leading-relaxed text-muted-foreground">
                  {service.description}
                </p>

                <div className="mt-6 rounded-xl border border-border bg-surface p-5">
                  <h3 className="text-sm font-semibold uppercase tracking-[0.1em] text-foreground/70">
                    Who it&apos;s for
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/80">
                    {service.forWho}
                  </p>
                </div>

                {/* Related team */}
                {teamMembers.length > 0 && (
                  <div className="mt-6">
                    <h3 className="text-sm font-semibold uppercase tracking-[0.1em] text-foreground/70">
                      Professionals in this area
                    </h3>
                    <div className="mt-3 flex flex-wrap gap-3">
                      {teamMembers.map((m) => (
                        <Link
                          key={m.slug}
                          href={`/our-talent/${m.slug}`}
                          className="group inline-flex items-center gap-3 rounded-full border border-border bg-surface py-1.5 pl-1.5 pr-4 transition-colors hover:border-accent/40"
                        >
                          <TalentAvatar
                            member={m}
                            className="size-9 rounded-full"
                            sizes="36px"
                          />
                          <span className="text-sm">
                            <span className="font-medium">{m.name}</span>
                            <span className="block text-xs text-muted-foreground">
                              {m.role}
                            </span>
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-7">
                  <ConsultationButton source={`service-${service.slug}`}>
                    Discuss This Service
                  </ConsultationButton>
                </div>
              </Reveal>

              {/* Right: details */}
              <Reveal delay={80} className="grid gap-5 sm:grid-cols-2">
                <Card className="p-6">
                  <h3 className="text-base font-medium">Typical responsibilities</h3>
                  <ul className="mt-4 space-y-2">
                    {service.responsibilities.map((r) => (
                      <li key={r} className="flex items-start gap-2 text-sm">
                        <Check className="mt-0.5 size-4 shrink-0 text-accent-strong" />
                        <span className="text-foreground/80">{r}</span>
                      </li>
                    ))}
                  </ul>
                </Card>

                <div className="flex flex-col gap-5">
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
                </div>

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
              </Reveal>
            </div>
          </Section>
        );
      })}

      <FinalCtaSection
        heading="Not sure which service fits?"
        description="Tell us what's on your plate and where you need support. We'll help you find the right professional for the job."
      />
    </>
  );
}
