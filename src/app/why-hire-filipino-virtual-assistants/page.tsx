import type { Metadata } from "next";
import Link from "next/link";
import {
  Languages,
  Clock,
  PiggyBank,
  Laptop,
  Sparkles,
  HeartHandshake,
  Check,
} from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/layout/PageHeader";
import { ConsultationButton } from "@/components/ConsultationButton";
import { FaqSection } from "@/components/sections/FaqSection";
import { FinalCtaSection } from "@/components/sections/FinalCtaSection";
import { BreadcrumbSchema } from "@/components/seo/JsonLd";
import { whyWorkWithUs } from "@/content/home";

export const metadata: Metadata = buildMetadata({
  path: "/why-hire-filipino-virtual-assistants",
  title: "Why Hire Filipino Virtual Assistants",
  description:
    "Why US businesses hire Filipino virtual assistants: strong English proficiency, time-zone flexibility, cost efficiency, an established remote-work culture, and specialized digital skills.",
});

const reasons = [
  {
    icon: Languages,
    title: "Strong English proficiency",
    body: "The Philippines is one of the largest English-speaking countries in the world, and business is widely conducted in English. That means clear written and verbal communication with your team and clients.",
  },
  {
    icon: Clock,
    title: "Time-zone flexibility",
    body: "Many Filipino professionals are experienced working US business hours and are comfortable adjusting their schedule for meaningful overlap with your team. Specific hours are agreed up front.",
  },
  {
    icon: PiggyBank,
    title: "Cost efficiency",
    body: "Hiring in the Philippines is generally more cost-effective than hiring locally in the US — without sacrificing skill or reliability — so you can add capacity sustainably as you grow.",
  },
  {
    icon: Laptop,
    title: "An established remote-work culture",
    body: "The Philippines has a large, mature remote-work and outsourcing workforce. Working with international clients remotely is the norm, not the exception.",
  },
  {
    icon: Sparkles,
    title: "Specialized digital skills",
    body: "Our professionals bring real, hands-on experience with tools like GoHighLevel, CRMs, and modern marketing and productivity platforms — not just general assistance.",
  },
  {
    icon: HeartHandshake,
    title: "A long-term partnership mindset",
    body: "We match for fit and support the relationship over time, so you gain a dependable team member rather than a series of one-off contractors.",
  },
];

export default function WhyHirePage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          {
            name: "Why Hire Filipino Virtual Assistants",
            path: "/why-hire-filipino-virtual-assistants",
          },
        ]}
      />
      <PageHeader
        eyebrow="Why the Philippines"
        title="Why hire Filipino virtual assistants?"
        description="US businesses increasingly build their remote teams in the Philippines — and for good reason. Here's what makes Filipino virtual professionals a dependable fit for growing companies."
        breadcrumbs={[
          { name: "Home", href: "/" },
          {
            name: "Why Filipino VAs",
            href: "/why-hire-filipino-virtual-assistants",
          },
        ]}
      >
        <ConsultationButton source="why-hire-header" />
      </PageHeader>

      <Section>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((r, i) => (
            <Reveal key={r.title} delay={i * 50}>
              <Card className="flex h-full flex-col p-6">
                <div className="flex size-11 items-center justify-center rounded-xl bg-accent/10 text-accent-strong">
                  <r.icon className="size-5" aria-hidden="true" />
                </div>
                <h2 className="mt-4 text-lg font-medium">{r.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {r.body}
                </p>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Managed partnership vs independent hiring */}
      <Section tone="muted">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl sm:text-3xl">{whyWorkWithUs.heading}</h2>
          <p className="mt-3 text-muted-foreground">{whyWorkWithUs.description}</p>
        </div>
        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          <Card className="p-6 sm:p-7">
            <h3 className="text-lg font-medium">{whyWorkWithUs.independent.title}</h3>
            <ul className="mt-4 space-y-2">
              {whyWorkWithUs.independent.points.map((p) => (
                <li key={p} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-muted-foreground/40" />
                  {p}
                </li>
              ))}
            </ul>
          </Card>
          <Card className="border-accent/30 p-6 sm:p-7">
            <h3 className="text-lg font-medium">{whyWorkWithUs.agency.title}</h3>
            <ul className="mt-4 space-y-2">
              {whyWorkWithUs.agency.points.map((p) => (
                <li key={p} className="flex items-start gap-2 text-sm">
                  <Check className="mt-0.5 size-4 shrink-0 text-accent-strong" />
                  <span className="text-foreground/85">{p}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-center text-xs text-muted-foreground">
          {whyWorkWithUs.disclaimer}
        </p>
      </Section>

      <Section>
        <Card className="p-6 text-center sm:p-8">
          <p className="text-muted-foreground">
            Ready to see who could support your business? Meet a few of our{" "}
            <Link href="/our-talent" className="font-medium text-accent-strong hover:text-accent">
              Filipino virtual professionals
            </Link>{" "}
            or learn{" "}
            <Link href="/how-it-works" className="font-medium text-accent-strong hover:text-accent">
              how the matching process works
            </Link>
            .
          </p>
        </Card>
      </Section>

      {/* Schema disabled here — the same general FAQ set already carries
          FAQPage schema on the homepage; we don't duplicate it across URLs. */}
      <FaqSection
        includeSchema={false}
        eyebrow="Questions"
        title="Hiring a Filipino virtual assistant — common questions"
      />

      <FinalCtaSection
        heading="Build your remote team with confidence."
        description="Book a free 30-minute consultation to talk through your needs and see whether a Filipino virtual assistant is the right fit."
      />
    </>
  );
}
