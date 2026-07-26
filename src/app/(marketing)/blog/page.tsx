import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/layout/PageHeader";
import { PostCard } from "@/components/blog/PostCard";
import { FinalCtaSection } from "@/components/sections/FinalCtaSection";
import { BreadcrumbSchema } from "@/components/seo/JsonLd";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = buildMetadata({
  path: "/blog",
  title: "Blog",
  description:
    "Insights on hiring and working with Filipino virtual assistants — GoHighLevel, executive support, digital marketing, social media, and building a dependable remote team.",
});

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
        ]}
      />
      <PageHeader
        eyebrow="Insights"
        title="Guides on building your virtual team."
        description="Practical advice on hiring, delegating to, and getting the most from experienced Filipino virtual professionals."
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Blog", href: "/blog" },
        ]}
      />

      <Section>
        {posts.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, i) => (
              <Reveal key={post.slug} delay={i * 60}>
                <PostCard post={post} priority={i < 3} />
              </Reveal>
            ))}
          </div>
        ) : (
          <Card className="mx-auto max-w-xl border-dashed p-10 text-center">
            <p className="text-lg font-medium">Articles are on the way.</p>
            <p className="mt-2 text-sm text-muted-foreground">
              We&apos;re preparing helpful guides on hiring and working with
              virtual professionals. Check back soon.
            </p>
          </Card>
        )}
      </Section>

      <FinalCtaSection
        heading="Ready to put these ideas into action?"
        description="Book a free consultation and we'll help you find the right virtual professional for your business."
      />
    </>
  );
}
