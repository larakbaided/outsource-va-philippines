import type { Metadata } from "next";
import { Mail, CalendarCheck, Clock, ShieldCheck } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { PageHeader } from "@/components/layout/PageHeader";
import { ContactForm } from "@/components/forms/ContactForm";
import { CalendlyEmbed } from "@/components/CalendlyEmbed";
import { BreadcrumbSchema } from "@/components/seo/JsonLd";

export const metadata: Metadata = buildMetadata({
  path: "/contact",
  title: "Contact",
  description:
    "Book a free 30-minute consultation or send an inquiry to Outsource VA Philippines. Tell us about your business and the virtual support you're looking for.",
});

export default function ContactPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ]}
      />
      <PageHeader
        eyebrow="Contact"
        title="Let's talk about the support your business needs."
        description="Choose whichever is easiest — book a free consultation directly, or send us an inquiry and we'll get back to you."
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Contact", href: "/contact" },
        ]}
      />

      <Section>
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
          {/* Path 1: Book a consultation */}
          <Reveal>
            <div className="flex items-center gap-2 text-accent-strong">
              <CalendarCheck className="size-5" />
              <span className="text-sm font-semibold uppercase tracking-[0.12em]">
                Book a consultation
              </span>
            </div>
            <h2 className="mt-3 text-3xl">Schedule a free 30-minute call.</h2>
            <p className="mt-3 text-muted-foreground">
              Pick a time that works for you. No pressure — just a conversation
              about your business and how we can help.
            </p>

            <ul className="mt-6 space-y-3">
              {[
                { icon: Clock, text: "30 minutes, at a time that suits you" },
                { icon: ShieldCheck, text: "No obligation and no commitment" },
                {
                  icon: CalendarCheck,
                  text: "Leave with clear, recommended next steps",
                },
              ].map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-center gap-3 text-sm">
                  <Icon className="size-4.5 shrink-0 text-accent-strong" />
                  <span className="text-foreground/80">{text}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <CalendlyEmbed />
            </div>
          </Reveal>

          {/* Path 2: Send an inquiry */}
          <Reveal delay={80} id="inquiry" className="scroll-mt-24">
            <div className="flex items-center gap-2 text-accent-strong">
              <Mail className="size-5" />
              <span className="text-sm font-semibold uppercase tracking-[0.12em]">
                Send an inquiry
              </span>
            </div>
            <h2 className="mt-3 text-3xl">Tell us about your needs.</h2>
            <p className="mt-3 text-muted-foreground">
              Share a few details and we&apos;ll review your inquiry, then follow
              up with recommended next steps.
            </p>

            <div className="mt-8 rounded-2xl border border-border bg-surface p-6 sm:p-8">
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </Section>

      <Container className="pb-16">
        <p className="rounded-xl border border-dashed border-border bg-surface-muted/50 p-4 text-xs text-muted-foreground">
          Prefer email? A direct business email address will be added here once
          finalized. In the meantime, the inquiry form and consultation booking
          are the fastest ways to reach us.
        </p>
      </Container>
    </>
  );
}
