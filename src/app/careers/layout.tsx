import type { Metadata } from "next";
import { CareersHeader } from "@/components/careers/CareersHeader";
import { CareersFooter } from "@/components/careers/CareersFooter";
import { careersSeo } from "@/content/careers";
import { careersUrl } from "@/lib/careers-url";

/**
 * Chrome for the careers subdomain (careers.outsourcevaphilippines.com).
 * These routes live under /careers only so the App Router has somewhere to put
 * them; src/proxy.ts maps the subdomain onto this segment.
 */

export const metadata: Metadata = {
  metadataBase: new URL(careersUrl),
  title: {
    default: careersSeo.title,
    template: "%s | Careers — Outsource VA Philippines",
  },
  description: careersSeo.description,
  openGraph: {
    type: "website",
    siteName: "Outsource VA Philippines Careers",
    title: careersSeo.socialTitle,
    description: careersSeo.description,
    url: careersUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: careersSeo.socialTitle,
    description: careersSeo.description,
  },
};

export default function CareersLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <CareersHeader />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <CareersFooter />
    </>
  );
}
