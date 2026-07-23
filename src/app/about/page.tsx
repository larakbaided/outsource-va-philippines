import type { Metadata } from "next";
import { Compass, Eye, Check, Heart, Users } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { Section, SectionHeading } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { Reveal } from "@/components/ui/reveal";
import { PageHeader } from "@/components/layout/PageHeader";
import { TalentAvatar } from "@/components/talent/TalentAvatar";
import { ConsultationButton } from "@/components/ConsultationButton";
import { FinalCtaSection } from "@/components/sections/FinalCtaSection";
import { BreadcrumbSchema } from "@/components/seo/JsonLd";
import { about } from "@/content/about";
import { getTeamMember } from "@/content/team";
import { site } from "@/content/site";

export const metadata: Metadata = buildMetadata({
  path: "/about",
  title: "About Us",
  description:
    "Outsource VA Philippines was founded by Lara to help businesses access experienced Filipino virtual talent through thoughtful matching, clear communication, and ongoing support.",
});

export default function AboutPage() {
  const lara = getTeamMember("lara");

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ]}
      />
      <PageHeader
        eyebrow="About us"
        title="Outsourcing built on experience, systems, and respect."
        description="We help entrepreneurs, agencies, coaches, consultants, healthcare providers, and service-based companies build dependable remote teams."
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "About", href: "/about" },
        ]}
      />

      {/* Story */}
      <Section>
        <div className="mx-auto max-w-3xl">
          <SectionHeading eyebrow="Our story" title="Why we started." />
          <div className="prose-measure mt-6 space-y-5 text-lg leading-relaxed text-muted-foreground">
            {about.story.map((para) => (
              <Reveal as="div" key={para.slice(0, 24)}>
                <p>{para}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* Founder */}
      {lara && (
        <Section tone="muted">
          <div className="grid items-center gap-10 lg:grid-cols-[0.7fr_1.3fr]">
            <Reveal>
              <TalentAvatar
                member={lara}
                className="mx-auto aspect-[4/5] w-full max-w-xs rounded-2xl shadow-[var(--shadow-lift)]"
                sizes="(max-width: 1024px) 70vw, 380px"
              />
            </Reveal>
            <Reveal delay={80}>
              <p className="text-sm font-medium uppercase tracking-[0.14em] text-accent-strong">
                Founder
              </p>
              <h2 className="mt-3 text-3xl sm:text-4xl">{lara.name}</h2>
              <p className="mt-1 text-lg font-medium text-accent-strong">
                {site.founder.title}
              </p>
              <p className="mt-5 leading-relaxed text-muted-foreground">
                {lara.summary}
              </p>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                Having worked on both sides of remote work — as a virtual
                professional and as someone who builds systems for businesses —
                Lara founded Outsource VA Philippines to make outsourcing more
                organized, reliable, and human.
              </p>
              <div className="mt-6">
                <ConsultationButton source="about-founder">
                  Talk With Our Team
                </ConsultationButton>
              </div>
            </Reveal>
          </div>
        </Section>
      )}

      {/* Mission & Vision */}
      <Section>
        <div className="grid gap-5 lg:grid-cols-2">
          <Reveal>
            <Card className="h-full p-8">
              <span className="inline-flex size-12 items-center justify-center rounded-xl bg-sage-soft text-primary">
                <Compass className="size-6" />
              </span>
              <h2 className="mt-5 text-2xl">Our mission</h2>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                {about.mission}
              </p>
            </Card>
          </Reveal>
          <Reveal delay={80}>
            <Card className="h-full p-8">
              <span className="inline-flex size-12 items-center justify-center rounded-xl bg-accent/10 text-accent-strong">
                <Eye className="size-6" />
              </span>
              <h2 className="mt-5 text-2xl">Our vision</h2>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                {about.vision}
              </p>
            </Card>
          </Reveal>
        </div>
      </Section>

      {/* Values */}
      <Section tone="muted">
        <SectionHeading
          eyebrow="What we value"
          title="The principles behind every match."
          align="center"
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {about.values.map((value, i) => (
            <Reveal key={value.title} delay={i * 50} className="h-full">
              <Card className="h-full p-6">
                <h3 className="text-lg font-medium">{value.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {value.description}
                </p>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Approach */}
      <Section>
        <div className="mx-auto max-w-3xl">
          <SectionHeading
            eyebrow="Our approach"
            title="How we work with you."
            align="center"
          />
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {about.approach.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 rounded-xl border border-border bg-surface p-4"
              >
                <Check className="mt-0.5 size-5 shrink-0 text-accent-strong" />
                <span className="text-sm leading-relaxed text-foreground/85">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* Commitments */}
      <Section tone="muted">
        <div className="grid gap-5 lg:grid-cols-2">
          <Reveal>
            <Card className="h-full p-8">
              <span className="inline-flex size-11 items-center justify-center rounded-xl bg-accent/10 text-accent-strong">
                <Heart className="size-5" />
              </span>
              <h2 className="mt-4 text-2xl">Our commitment to clients</h2>
              <ul className="mt-5 space-y-2.5">
                {about.commitmentToClients.map((c) => (
                  <li key={c} className="flex items-start gap-2.5">
                    <Check className="mt-0.5 size-4 shrink-0 text-accent-strong" />
                    <span className="text-sm text-foreground/85">{c}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </Reveal>
          <Reveal delay={80}>
            <Card className="h-full p-8">
              <span className="inline-flex size-11 items-center justify-center rounded-xl bg-sage-soft text-primary">
                <Users className="size-5" />
              </span>
              <h2 className="mt-4 text-2xl">
                Our commitment to virtual professionals
              </h2>
              <ul className="mt-5 space-y-2.5">
                {about.commitmentToProfessionals.map((c) => (
                  <li key={c} className="flex items-start gap-2.5">
                    <Check className="mt-0.5 size-4 shrink-0 text-accent-strong" />
                    <span className="text-sm text-foreground/85">{c}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </Reveal>
        </div>
      </Section>

      <FinalCtaSection />
    </>
  );
}
