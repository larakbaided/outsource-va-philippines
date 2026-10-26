import type { Metadata } from "next";
import Link from "next/link";
import { Check, Minus } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/layout/PageHeader";
import { ConsultationButton } from "@/components/ConsultationButton";
import { FinalCtaSection } from "@/components/sections/FinalCtaSection";
import { RateCardTable } from "@/components/pricing/RateCardTable";
import { BreadcrumbSchema } from "@/components/seo/JsonLd";
import {
  rateFactors,
  engagementTerms,
  activationFee,
  paymentSchedule,
  includedInRate,
  notIncludedInRate,
  contractorPosition,
  monthHours,
  projectFloorUsd,
  usd,
} from "@/content/pricing";

export const metadata: Metadata = buildMetadata({
  path: "/pricing",
  title: "Pricing",
  description:
    "Our published rate card for Filipino virtual assistants — part-time and full-time monthly rates by role, project rates, payment terms, and what is and isn't included.",
});

export default function PricingPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Pricing", path: "/pricing" },
        ]}
      />
      <PageHeader
        eyebrow="Pricing"
        title="What it costs."
        description="Our rates are published. What you pay depends on the role, the experience it needs, the hours, and how you engage — so here is the card, and here is what moves you along it."
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Pricing", href: "/pricing" },
        ]}
      >
        <ConsultationButton source="pricing-header" />
      </PageHeader>

      {/* Rate card */}
      <Section>
        <SectionHeading
          eyebrow="Rate card"
          title="Monthly rates by role."
          description={`A part-time month is ${monthHours.partTime} hours. A full-time month is ${monthHours.fullTime} hours. All figures are US dollars.`}
        />

        <Reveal className="mt-10">
          <RateCardTable />
        </Reveal>

        <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
          Scoped projects — CRM builds,{" "}
          <Link
            href="/services/gohighlevel-onboarding"
            className="font-medium text-accent-strong hover:text-accent"
          >
            GoHighLevel onboarding
          </Link>
          , automation setup — are quoted per outcome, from {usd(projectFloorUsd)}.
        </p>
      </Section>

      {/* What decides the rate */}
      <Section tone="muted">
        <SectionHeading
          eyebrow="What decides the rate"
          title="Four things move the number."
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {rateFactors.map((factor, i) => (
            <Reveal key={factor.title} delay={i * 50}>
              <Card className="flex h-full flex-col p-6 sm:p-7">
                <h3 className="text-lg font-medium">{factor.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {factor.body}
                </p>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Engagement types */}
      <Section>
        <SectionHeading
          eyebrow="Ways to work together"
          title="Three engagement types."
        />
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {engagementTerms.map((option, i) => (
            <Reveal key={option.slug} delay={i * 70} className="h-full">
              <Card className="flex h-full flex-col p-6 sm:p-7">
                <h3 className="text-xl font-medium">{option.name}</h3>
                <p className="mt-1 text-accent-strong">{option.priceLine}</p>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {option.detail}
                </p>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Payment terms — activation fee first, refund condition immediately after */}
      <Section tone="muted">
        <SectionHeading
          eyebrow="Payment terms"
          title="When you pay, and what happens if we can't match you."
        />

        <Reveal className="mt-10">
          <Card className="border-accent/30 p-6 sm:p-7">
            <Badge variant="accent" size="md">
              {activationFee.label}
            </Badge>
            <p className="mt-4 leading-relaxed">{activationFee.terms}</p>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              {activationFee.refundCondition}
            </p>
          </Card>
        </Reveal>

        <Reveal delay={70} className="mt-5">
          <Card className="divide-y divide-border">
            <dl>
              {paymentSchedule.map((item) => (
                <div
                  key={item.label}
                  className="grid gap-1 border-b border-border p-6 last:border-0 sm:grid-cols-[14rem_1fr] sm:gap-5 sm:p-7"
                >
                  <dt className="font-medium">{item.label}</dt>
                  <dd className="leading-relaxed text-muted-foreground">
                    {item.terms}
                  </dd>
                </div>
              ))}
            </dl>
          </Card>
        </Reveal>
      </Section>

      {/* Included / not included, side by side */}
      <Section>
        <SectionHeading
          eyebrow="Scope"
          title="What the monthly rate covers."
        />
        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          <Reveal className="h-full">
            <Card className="h-full border-accent/30 p-6 sm:p-7">
              <h3 className="text-lg font-medium">Included</h3>
              <ul className="mt-4 space-y-2.5">
                {includedInRate.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm">
                    <Check
                      className="mt-0.5 size-4 shrink-0 text-accent-strong"
                      aria-hidden="true"
                    />
                    <span className="text-foreground/85">{item}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </Reveal>

          <Reveal delay={70} className="h-full">
            <Card className="h-full p-6 sm:p-7">
              <h3 className="text-lg font-medium">Not included</h3>
              <ul className="mt-4 space-y-2.5">
                {notIncludedInRate.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-sm text-muted-foreground"
                  >
                    <Minus
                      className="mt-0.5 size-4 shrink-0 opacity-60"
                      aria-hidden="true"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </Reveal>
        </div>
      </Section>

      {/* Independent-contractor position */}
      <Section tone="muted">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl sm:text-3xl">{contractorPosition.heading}</h2>
          <div className="mt-5 space-y-4">
            {contractorPosition.body.map((paragraph) => (
              <p key={paragraph} className="leading-relaxed text-muted-foreground">
                {paragraph}
              </p>
            ))}
          </div>
          <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
            Full terms are in our{" "}
            <Link
              href="/terms"
              className="font-medium text-accent-strong hover:text-accent"
            >
              Terms &amp; Conditions
            </Link>
            , and in the services agreement you sign before an engagement begins.
          </p>
        </div>
      </Section>

      <FinalCtaSection
        heading="Talk through which rate fits your role."
        description="Tell us what the work involves and we'll point you at the right line on the card. No pressure. Just a 30-minute conversation about your needs."
      />
    </>
  );
}
