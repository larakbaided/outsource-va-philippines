import Link from "next/link";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { ServiceCard } from "@/components/cards/ServiceCard";
import { ToolsMarquee } from "@/components/sections/ToolsMarquee";
import { services, featuredServiceSlugs } from "@/content/services";

export function ServicesPreview() {
  const featured = featuredServiceSlugs
    .map((slug) => services.find((s) => s.slug === slug))
    .filter((s): s is (typeof services)[number] => Boolean(s));

  /*
    This section deliberately does not use <Section>, which wraps everything in
    a Container. The tools ribbon has to sit outside that container to run the
    full width of the viewport, so the container is applied per-block instead.
    Padding below mirrors <Section> with tone="default" exactly.
  */
  return (
    <section id="services" className="bg-transparent py-16 sm:py-20 lg:py-24">
      <Container>
        <SectionHeading
          eyebrow="What we do"
          title="Specialized support across the areas that move your business."
          description="Every professional we match brings focused, real-world experience — not general help, but genuine capability in the work you need done."
        />
      </Container>

      <ToolsMarquee />

      <Container>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-2">
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
      </Container>
    </section>
  );
}
