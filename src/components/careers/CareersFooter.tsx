import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/brand/Logo";
import { site } from "@/content/site";
import { careersNav } from "@/content/careers";

/**
 * Footer for the careers subdomain. Mirrors the main site's Footer structure
 * and tokens, with careers links and a route back to the marketing site.
 */
export function CareersFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-border bg-surface-muted">
      <Container className="py-14 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.6fr_1fr_1fr]">
          <div className="max-w-sm">
            <Logo />
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              We match experienced Filipino professionals with US businesses,
              then support the placement over time. No placement fees — we are
              paid by the client.
            </p>
          </div>

          <div>
            <h2 className="font-sans text-sm font-semibold uppercase tracking-[0.12em] text-foreground/70">
              Careers
            </h2>
            <ul className="mt-4 space-y-2.5">
              {careersNav.map((item) => (
                <li key={item.href}>
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

          <div>
            <h2 className="font-sans text-sm font-semibold uppercase tracking-[0.12em] text-foreground/70">
              Company
            </h2>
            <ul className="mt-4 space-y-2.5">
              <li>
                <a
                  href={site.url}
                  className="text-sm text-muted-foreground transition-colors hover:text-accent-strong"
                >
                  Main website
                </a>
              </li>
              <li>
                <a
                  href={`${site.url}/about`}
                  className="text-sm text-muted-foreground transition-colors hover:text-accent-strong"
                >
                  About us
                </a>
              </li>
              <li>
                <a
                  href={`${site.url}/our-talent`}
                  className="text-sm text-muted-foreground transition-colors hover:text-accent-strong"
                >
                  Meet the team
                </a>
              </li>
              <li>
                <a
                  href={`${site.url}/privacy-policy`}
                  className="text-sm text-muted-foreground transition-colors hover:text-accent-strong"
                >
                  Privacy policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-8">
          <p className="text-xs text-muted-foreground">
            © {year} {site.name}. All rights reserved.{" "}
            <span className="opacity-70">{site.legal.companyName}</span>
          </p>
        </div>
      </Container>
    </footer>
  );
}
