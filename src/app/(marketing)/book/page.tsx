import type { Metadata } from "next";
import { Check, Clock, ShieldCheck, Sparkles } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { Section } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { Reveal } from "@/components/ui/reveal";
import { PageHeader } from "@/components/layout/PageHeader";
import { CalendlyEmbed } from "@/components/CalendlyEmbed";
import { FaqSection } from "@/components/sections/FaqSection";
import { BreadcrumbSchema } from "@/components/seo/JsonLd";
import { bookingFaqs } from "@/content/faqs";

export const metadata: Metadata = buildMetadata({
  path: "/book",
  title: "Book a Consultation",
  description:
    "Book a complimentary 30-minute consultation with Outsource VA Philippines to discuss your business, the tasks you'd like to delegate, and the right virtual support.",
});

const discussionTopics = [
  "Current business challenges",
  "Tasks you'd like to delegate",
  "Required skills and experience",
  "Preferred working schedule",
  "Tools and systems you currently use",
  "A recommended support arrangement",
  "Suitable next steps",
];

const prepareItems = [
  "A rough list of tasks you'd like to hand off",
  "The tools and systems you use day to day",
  "Your preferred working hours or timezone",
  "Any priorities or deadlines on your mind",
];

export default function BookPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Book a Consultation", path: "/book" },
        ]}
      />
      <PageHeader
        eyebrow="Book a consultation"
        title="A free 30-minute conversation about your business."
        description="This is a relaxed, no-pressure call to understand your needs and explore whether we're a good fit. There's nothing to prepare — but a few notes help us make the most of it."
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Book a Consultation", href: "/book" },
        ]}
      />

      <Section>
        <div className="grid items-start gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          {/* Left: context */}
          <Reveal className="space-y-8">
            <div>
              <h2 className="flex items-center gap-2 text-2xl">
                <Sparkles className="size-5 text-accent-strong" />
                What we&apos;ll discuss
              </h2>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {discussionTopics.map((topic) => (
                  <li key={topic} className="flex items-start gap-2 text-sm">
                    <Check className="mt-0.5 size-4 shrink-0 text-accent-strong" />
                    <span className="text-foreground/80">{topic}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Card className="p-6">
                <Clock className="size-6 text-accent-strong" />
                <h3 className="mt-3 text-base font-medium">Who it&apos;s for</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Business owners exploring virtual support who want to talk
                  through priorities, systems, and the right kind of help.
                </p>
              </Card>
              <Card className="p-6">
                <ShieldCheck className="size-6 text-accent-strong" />
                <h3 className="mt-3 text-base font-medium">Your privacy</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Anything you share stays confidential. Booking a call does not
                  create any contractual or employment relationship.
                </p>
              </Card>
            </div>

            <div>
              <h2 className="text-2xl">What to prepare</h2>
              <ul className="mt-4 space-y-2">
                {prepareItems.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-accent" />
                    <span className="text-foreground/80">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs italic text-muted-foreground">
                This consultation is informational and does not guarantee
                placement of a professional.
              </p>
            </div>
          </Reveal>

          {/* Right: embed */}
          <Reveal delay={80} className="lg:sticky lg:top-24">
            <CalendlyEmbed />
          </Reveal>
        </div>
      </Section>

      <FaqSection
        items={bookingFaqs}
        tone="muted"
        eyebrow="Scheduling"
        title="Scheduling questions."
        includeSchema={false}
      />
    </>
  );
}
