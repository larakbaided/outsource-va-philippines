import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { OrganizationSchema, WebSiteSchema } from "@/components/seo/JsonLd";

/**
 * Chrome for the main marketing site (outsourcevaphilippines.com).
 * The careers subdomain has its own chrome in src/app/careers/layout.tsx.
 */
export default function MarketingLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <OrganizationSchema />
      <WebSiteSchema />
      <AnnouncementBar />
      <Header />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <Footer />
    </>
  );
}
