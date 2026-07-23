import {
  ShieldCheck,
  Target,
  MessageCircle,
  Handshake,
  Infinity as InfinityIcon,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { trustIndicators, type TrustIndicator } from "@/content/home";

const iconMap: Record<TrustIndicator["icon"], LucideIcon> = {
  shieldCheck: ShieldCheck,
  target: Target,
  messageCircle: MessageCircle,
  handshake: Handshake,
  infinity: InfinityIcon,
};

export function TrustStrip() {
  return (
    <section className="border-y border-border bg-surface-muted/60">
      <Container className="py-8">
        <ul className="grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-3 lg:grid-cols-5">
          {trustIndicators.map((item, i) => {
            const Icon = iconMap[item.icon];
            return (
              <Reveal
                as="li"
                key={item.label}
                delay={i * 60}
                className="flex flex-col items-center gap-2 text-center"
              >
                <Icon className="size-6 text-accent-strong" aria-hidden="true" />
                <span className="text-[0.8rem] font-medium leading-tight text-foreground/80">
                  {item.label}
                </span>
              </Reveal>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
