import type { Metadata, Viewport } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";
import { site } from "@/content/site";
import { Analytics } from "@/components/analytics/Analytics";

/**
 * Root layout — shared shell only.
 *
 * Site chrome lives one level down so the two hosts can differ:
 *   src/app/(marketing)/layout.tsx  → outsourcevaphilippines.com
 *   src/app/careers/layout.tsx      → careers.outsourcevaphilippines.com
 * (the careers host is rewritten onto /careers by src/middleware.ts)
 */

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.seo.homeTitle,
    template: `%s | ${site.name}`,
  },
  description: site.seo.homeDescription,
  applicationName: site.name,
  authors: [{ name: site.name }],
  creator: site.name,
  // Static favicon set lives in /public (generated from the brand mark).
  // These emit stable, crawlable <link> tags that Google Search can index.
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    siteName: site.name,
    title: site.seo.socialTitle,
    description: site.seo.homeDescription,
    url: site.url,
  },
  twitter: {
    card: "summary_large_image",
    title: site.seo.socialTitle,
    description: site.seo.homeDescription,
  },
};

export const viewport: Viewport = {
  themeColor: "#1f3a2e",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en-US"
      className={`${playfair.variable} ${dmSans.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <a
          href="#main-content"
          className="sr-only z-50 rounded-md bg-primary px-4 py-2 text-primary-foreground focus:not-sr-only focus:absolute focus:left-4 focus:top-4"
        >
          Skip to content
        </a>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
