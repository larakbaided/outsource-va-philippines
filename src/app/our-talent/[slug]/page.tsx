import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, Wrench, Building2, Briefcase, ArrowLeft } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { Section } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { PageHeader } from "@/components/layout/PageHeader";
import { TalentAvatar } from "@/components/talent/TalentAvatar";
import { ConsultationButton } from "@/components/ConsultationButton";
import { FinalCtaSection } from "@/components/sections/FinalCtaSection";
import { BreadcrumbSchema, PersonSchema } from "@/components/seo/JsonLd";
import { team, getTeamMember } from "@/content/team";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return team.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const member = getTeamMember(slug);
  if (!member) return buildMetadata({ path: `/our-talent/${slug}` });

  return buildMetadata({
    path: `/our-talent/${member.slug}`,
    title: `${member.name} — ${member.role}`,
    description: member.shortBio,
    ogImage: member.imageIsPlaceholder ? undefined : member.image,
  });
}

export default async function TalentProfilePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const member = getTeamMember(slug);
  if (!member) notFound();

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Our Talent", path: "/our-talent" },
          { name: member.name, path: `/our-talent/${member.slug}` },
        ]}
      />
      <PersonSchema
        name={member.name}
        jobTitle={member.role}
        path={`/our-talent/${member.slug}`}
        description={member.shortBio}
        skills={member.skills}
        image={member.imageIsPlaceholder ? undefined : member.image}
      />

      <PageHeader
        eyebrow={member.specialty}
        title={member.name}
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Our Talent", href: "/our-talent" },
          { name: member.name, href: `/our-talent/${member.slug}` },
        ]}
      >
        <p className="-mt-2 text-lg font-medium text-accent-strong">
          {member.role}
        </p>
      </PageHeader>

      <Section>
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          {/* Left: avatar + quick facts + CTAs */}
          <Reveal>
            <div className="lg:sticky lg:top-24">
              <TalentAvatar
                member={member}
                priority
                className="aspect-[4/5] w-full rounded-2xl shadow-[var(--shadow-lift)]"
                sizes="(max-width: 1024px) 92vw, 520px"
              />
              <Badge variant="sage" className="mt-4">
                {member.experience}
              </Badge>

              {member.imageIsPlaceholder && (
                <p className="mt-3 text-xs italic text-muted-foreground">
                  Temporary profile visual. An approved photo will be added here.
                </p>
              )}

              <div className="mt-5 flex flex-col gap-2.5">
                <ConsultationButton source={`profile-${member.slug}`} className="w-full">
                  Book a Consultation
                </ConsultationButton>
                <Button asChild variant="outline" className="w-full">
                  <Link href={`/contact?talent=${member.slug}#inquiry`}>
                    Ask About {member.name}
                  </Link>
                </Button>
              </div>

              <div className="mt-5 space-y-1.5 rounded-xl border border-border bg-surface p-4 text-sm">
                <p className="flex justify-between gap-3">
                  <span className="text-muted-foreground">Availability</span>
                  <span className="text-right font-medium">
                    Confirmed on consultation
                  </span>
                </p>
                <p className="flex justify-between gap-3">
                  <span className="text-muted-foreground">Work arrangement</span>
                  <span className="text-right font-medium">
                    Discussed on consultation
                  </span>
                </p>
              </div>
            </div>
          </Reveal>

          {/* Right: details */}
          <Reveal delay={80} className="space-y-8">
            <div>
              <h2 className="text-2xl">Professional summary</h2>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                {member.summary}
              </p>
            </div>

            <div>
              <h2 className="text-2xl">Core strengths</h2>
              <ul className="mt-4 grid gap-2.5 sm:grid-cols-1">
                {member.strengths.map((s) => (
                  <li key={s} className="flex items-start gap-2.5">
                    <Check className="mt-0.5 size-5 shrink-0 text-accent-strong" />
                    <span className="text-foreground/85">{s}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <Card className="p-6">
                <h3 className="text-base font-medium">Skills</h3>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {member.skills.map((skill) => (
                    <Badge key={skill} variant="default" size="sm">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="flex items-center gap-2 text-base font-medium">
                  <Wrench className="size-4 text-accent-strong" />
                  Tools
                </h3>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {member.tools.map((tool) => (
                    <Badge key={tool} variant="outline" size="sm">
                      {tool}
                    </Badge>
                  ))}
                </div>
              </Card>
            </div>

            <div>
              <h2 className="flex items-center gap-2 text-2xl">
                <Briefcase className="size-5 text-accent-strong" />
                Example responsibilities
              </h2>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {member.responsibilities.map((r) => (
                  <li key={r} className="flex items-start gap-2 text-sm">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-accent" />
                    <span className="text-foreground/80">{r}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="flex items-center gap-2 text-2xl">
                <Building2 className="size-5 text-accent-strong" />
                Industries supported
              </h2>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {member.industries.map((ind) => (
                  <Badge key={ind} variant="sage" size="md">
                    {ind}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Honest note about unavailable details */}
            <p className="rounded-xl border border-dashed border-border bg-surface-muted/50 p-4 text-xs text-muted-foreground">
              Additional details such as certifications, education, and specific
              client history are shared, where relevant, during the consultation
              and matching process.
            </p>
          </Reveal>
        </div>

        <div className="mt-12">
          <Button asChild variant="link">
            <Link href="/our-talent">
              <ArrowLeft className="size-4" />
              Back to all talent
            </Link>
          </Button>
        </div>
      </Section>

      <FinalCtaSection
        heading={`Interested in working with ${member.name}?`}
        description="Book a consultation to discuss your needs. We'll confirm availability and make sure the match is right for your business."
      />
    </>
  );
}
