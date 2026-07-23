"use client";

import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Card } from "@/components/ui/card";
import { ServiceIconTile } from "@/components/services/ServiceIcon";
import type { Service } from "@/content/services";
import { trackEvent } from "@/lib/analytics";

export function ServiceCard({ service }: { service: Service }) {
  return (
    <Card className="group flex h-full flex-col p-6 transition-shadow duration-300 hover:shadow-[var(--shadow-lift)] sm:p-7">
      <ServiceIconTile name={service.icon} />
      <h3 className="mt-5 text-xl font-medium tracking-tight">{service.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        {service.description}
      </p>

      <ul className="mt-5 space-y-2">
        {service.keyTasks.map((task) => (
          <li key={task} className="flex items-start gap-2 text-sm">
            <Check className="mt-0.5 size-4 shrink-0 text-accent-strong" />
            <span className="text-foreground/80">{task}</span>
          </li>
        ))}
      </ul>

      <Link
        href={`/services#${service.slug}`}
        onClick={() =>
          trackEvent("service_card_clicked", { service: service.slug })
        }
        className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-accent-strong transition-colors hover:text-accent"
      >
        Explore this service
        <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
      </Link>
    </Card>
  );
}
