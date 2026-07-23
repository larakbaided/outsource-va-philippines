import * as React from "react";
import { cn } from "@/lib/utils";
import { Container } from "./container";
import { Reveal } from "./reveal";

type SectionProps = React.HTMLAttributes<HTMLElement> & {
  /** Alternating background treatment. */
  tone?: "default" | "muted" | "primary";
  containerClassName?: string;
};

/** A vertical page section with consistent rhythm and optional tone. */
export function Section({
  className,
  containerClassName,
  tone = "default",
  children,
  ...props
}: SectionProps) {
  const toneClass =
    tone === "muted"
      ? "bg-surface-muted"
      : tone === "primary"
        ? "bg-primary text-primary-foreground"
        : "bg-transparent";

  return (
    <section
      className={cn("py-16 sm:py-20 lg:py-24", toneClass, className)}
      {...props}
    >
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}

type SectionHeadingProps = {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
  as?: "h1" | "h2";
};

/** Standard eyebrow + heading + description block. */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
  as = "h2",
}: SectionHeadingProps) {
  const Heading = as;
  return (
    <Reveal
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && (
        <p className="mb-3 text-sm font-medium uppercase tracking-[0.14em] text-accent-strong">
          {eyebrow}
        </p>
      )}
      <Heading className="text-3xl sm:text-4xl lg:text-[2.75rem]">{title}</Heading>
      {description && (
        <p
          className={cn(
            "mt-4 text-lg leading-relaxed text-muted-foreground",
            align === "center" && "mx-auto",
          )}
        >
          {description}
        </p>
      )}
    </Reveal>
  );
}
