import Link from "next/link";
import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { ServiceCard } from "@/components/cards/ServiceCard";
import { services, featuredServiceSlugs } from "@/content/services";

export function ServicesPreview() {
  const featured = featuredServiceSlugs
    .map((slug) => services.find((s) => s.slug === slug))
    .filter((s): s is (typeof services)[number] => Boolean(s));

  return (
    <Section id="services">
      <SectionHeading
        eyebrow="What we do"
        title="Specialized support across the areas that move your business."
        description="Every professional we match brings focused, real-world experience — not general help, but genuine capability in the work you need done."
      />

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-2">
        {featured.map((service, i) => (
          <Reveal key={service.slug} delay={i * 60}>
            <ServiceCard service={service} />
          </Reveal>
        ))}
      </div>

      <div className="mt-8">
        <Button asChild variant="outline">
          <Link href="/services">View all services</Link>
        </Button>
      </div>
    </Section>
  );
}
