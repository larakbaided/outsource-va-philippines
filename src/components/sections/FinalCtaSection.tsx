import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { ConsultationButton } from "@/components/ConsultationButton";
import { finalCta } from "@/content/home";

export function FinalCtaSection({
  heading = finalCta.heading,
  description = finalCta.description,
}: {
  heading?: string;
  description?: string;
}) {
  return (
    <section className="bg-primary text-primary-foreground">
      <Container className="py-16 sm:py-20 lg:py-24">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem]">{heading}</h2>
          <p className="mx-auto mt-4 text-lg leading-relaxed text-primary-foreground/80">
            {description}
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <ConsultationButton source="final-cta" size="lg">
              Book Your Free Consultation
            </ConsultationButton>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-primary-foreground/30 text-primary-foreground hover:border-primary-foreground/60 hover:bg-white/10"
            >
              <Link href="/contact#inquiry">Send an Inquiry</Link>
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
