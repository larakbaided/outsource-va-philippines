import Link from "next/link";
import { Check } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { JobCard } from "@/components/careers/JobCard";
import { getOpenJobs } from "@/lib/jobs";
import {
  careersHero,
  workingWithUs,
  hiringSteps,
  careersFaqs,
  careersCta,
  noOpenRoles,
} from "@/content/careers";

export default function CareersHomePage() {
  const jobs = getOpenJobs();
  const preview = jobs.slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(50%_60%_at_85%_-10%,rgba(176,139,79,0.08),transparent)]"
        />
        <Container className="py-16 sm:py-20 lg:py-24">
          <Reveal className="max-w-3xl">
            <Badge variant="accent" size="md">
              {careersHero.badge}
            </Badge>
            <h1 className="mt-5 text-4xl sm:text-5xl lg:text-[3.25rem]">
              {careersHero.headline}
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              {careersHero.subheadline}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button asChild size="lg">
                <Link href="/jobs">
                  {jobs.length > 0
                    ? `View ${jobs.length} open role${jobs.length === 1 ? "" : "s"}`
                    : "View open roles"}
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="#how-hiring-works">How hiring works</Link>
              </Button>
            </div>
            <p className="mt-5 text-sm text-muted-foreground">
              {careersHero.reassurance}
            </p>
          </Reveal>
        </Container>
      </section>

      {/* Open roles preview */}
      <Section>
        <SectionHeading
          eyebrow="Open roles"
          title={jobs.length > 0 ? "Roles we're hiring for now." : noOpenRoles.heading}
          description={jobs.length > 0 ? undefined : noOpenRoles.body}
        />

        {preview.length > 0 ? (
          <>
            <div className="mt-10 grid gap-5 lg:grid-cols-3">
              {preview.map((job, i) => (
                <Reveal key={job.slug} delay={i * 70} className="h-full">
                  <JobCard job={job} />
                </Reveal>
              ))}
            </div>
            {jobs.length > preview.length && (
              <div className="mt-8">
                <Button asChild variant="outline">
                  <Link href="/jobs">See all {jobs.length} roles</Link>
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className="mt-8">
            <Button asChild variant="outline">
              <Link href="/jobs">Send us your résumé</Link>
            </Button>
          </div>
        )}
      </Section>

      {/* Working with us */}
      <Section tone="muted" id="working-with-us">
        <SectionHeading
          eyebrow="Working with us"
          title={workingWithUs.heading}
          description={workingWithUs.description}
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {workingWithUs.points.map((point, i) => (
            <Reveal key={point.title} delay={i * 50}>
              <Card className="flex h-full flex-col p-6">
                <h3 className="text-lg font-medium">{point.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {point.body}
                </p>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* How hiring works */}
      <Section id="how-hiring-works">
        <SectionHeading
          eyebrow="The process"
          title="How hiring works."
          description="Six steps, and we tell you where you stand at each one."
        />
        <ol className="mx-auto mt-10 max-w-3xl space-y-5">
          {hiringSteps.map((step, i) => (
            <Reveal as="li" key={step.number} delay={i * 50}>
              <Card className="flex gap-5 p-6 sm:p-7">
                <div className="flex flex-col items-center">
                  <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-primary font-serif text-lg text-primary-foreground">
                    {step.number}
                  </span>
                  {i < hiringSteps.length - 1 && (
                    <span
                      aria-hidden="true"
                      className="mt-2 w-px flex-1 bg-border"
                    />
                  )}
                </div>
                <div className="pb-1">
                  <h3 className="text-xl font-medium">{step.title}</h3>
                  <p className="mt-2 leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </Card>
            </Reveal>
          ))}
        </ol>
      </Section>

      {/* FAQs */}
      <Section tone="muted" id="faqs">
        <div className="mx-auto max-w-3xl">
          <SectionHeading
            eyebrow="Questions"
            title="Questions applicants ask."
            align="center"
          />
          <Reveal className="mt-8">
            <Accordion type="single" collapsible className="w-full">
              {careersFaqs.map((faq, i) => (
                <AccordionItem key={faq.question} value={`item-${i}`}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </Section>

      {/* Closing CTA */}
      <Section>
        <Card className="border-accent/30 p-8 text-center sm:p-10">
          <h2 className="text-2xl sm:text-3xl">{careersCta.heading}</h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            {careersCta.description}
          </p>
          <div className="mt-7 flex justify-center">
            <Button asChild size="lg">
              <Link href="/jobs">Browse open roles</Link>
            </Button>
          </div>
          <ul className="mx-auto mt-8 flex max-w-xl flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
            {["No application fee", "No placement fee", "We read every application"].map(
              (item) => (
                <li key={item} className="flex items-center gap-1.5">
                  <Check
                    className="size-4 shrink-0 text-accent-strong"
                    aria-hidden="true"
                  />
                  {item}
                </li>
              ),
            )}
          </ul>
        </Card>
      </Section>
    </>
  );
}
