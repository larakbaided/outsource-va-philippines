import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { FaqSchema } from "@/components/seo/JsonLd";
import { faqs as defaultFaqs, type Faq } from "@/content/faqs";

export function FaqSection({
  items = defaultFaqs,
  tone = "default",
  includeSchema = true,
  title = "Frequently asked questions.",
  eyebrow = "Questions",
}: {
  items?: Faq[];
  tone?: "default" | "muted";
  includeSchema?: boolean;
  title?: string;
  eyebrow?: string;
}) {
  return (
    <Section tone={tone} id="faq">
      {includeSchema && <FaqSchema items={items} />}
      <div className="mx-auto max-w-3xl">
        <SectionHeading eyebrow={eyebrow} title={title} align="center" />
        <Reveal className="mt-8">
          <Accordion type="single" collapsible className="w-full">
            {items.map((faq, i) => (
              <AccordionItem key={faq.question} value={`item-${i}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </Section>
  );
}
