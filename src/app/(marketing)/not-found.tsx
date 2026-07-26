import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { ConsultationButton } from "@/components/ConsultationButton";
import { mainNav } from "@/content/navigation";

export const metadata: Metadata = {
  title: "Page Not Found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <p className="text-sm font-medium uppercase tracking-[0.16em] text-accent-strong">
        Error 404
      </p>
      <h1 className="mt-4 text-4xl sm:text-5xl">This page could not be found.</h1>
      <p className="mt-4 max-w-md text-lg text-muted-foreground">
        The page you are looking for may have moved or no longer exists. Let&apos;s
        get you back on track.
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button asChild>
          <Link href="/">Return Home</Link>
        </Button>
        <ConsultationButton source="404" variant="outline" />
      </div>

      <nav className="mt-12" aria-label="Helpful links">
        <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
          {mainNav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="text-muted-foreground transition-colors hover:text-accent-strong"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </Container>
  );
}
