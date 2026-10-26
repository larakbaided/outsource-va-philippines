import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/brand/Logo";
import { ConsultationButton } from "@/components/ConsultationButton";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  YoutubeIcon,
} from "@/components/brand/SocialIcons";
import { site } from "@/content/site";
import { footerNav } from "@/content/navigation";

const socialLinks = [
  { key: "facebook", label: "Facebook", Icon: FacebookIcon },
  { key: "instagram", label: "Instagram", Icon: InstagramIcon },
  { key: "linkedin", label: "LinkedIn", Icon: LinkedinIcon },
  { key: "youtube", label: "YouTube", Icon: YoutubeIcon },
] as const;

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-border bg-surface-muted">
      <Container className="py-14 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          {/* Brand column */}
          <div className="max-w-sm">
            <Logo />
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {site.footerDescription}
            </p>
            <div className="mt-5">
              <ConsultationButton source="footer" size="sm">
                Book a Consultation
              </ConsultationButton>
            </div>
          </div>

          {/* Link columns */}
          {footerNav.map((col) => (
            <div key={col.title}>
              <h2 className="font-sans text-sm font-semibold uppercase tracking-[0.12em] text-foreground/70">
                {col.title}
              </h2>
              <ul className="mt-4 space-y-2.5">
                {col.items.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-accent-strong"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-6 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted-foreground">
            © {year} {site.name}. All rights reserved.{" "}
            <span className="opacity-70">
              {site.legal.companyName}
            </span>
          </p>

          {/* Social placeholders — links only render when a real URL is set. */}
          <div className="flex items-center gap-1">
            {socialLinks.map(({ key, label, Icon }) => {
              const url = site.social[key as keyof typeof site.social];
              if (!url) {
                return (
                  <span
                    key={key}
                    aria-hidden="true"
                    title={`${label} — add URL to enable`}
                    className="inline-flex size-9 items-center justify-center rounded-full text-muted-foreground/40"
                  >
                    <Icon className="size-4.5" />
                  </span>
                );
              }
              return (
                <a
                  key={key}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="inline-flex size-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-primary/[0.06] hover:text-accent-strong"
                >
                  <Icon className="size-4.5" />
                </a>
              );
            })}
          </div>
        </div>
      </Container>
    </footer>
  );
}
