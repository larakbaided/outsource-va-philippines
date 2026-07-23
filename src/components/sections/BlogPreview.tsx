import Link from "next/link";
import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { PostCard } from "@/components/blog/PostCard";
import { getAllPosts } from "@/lib/blog";

/**
 * Homepage "Latest from the blog" section. Shows the most recent posts and
 * links to the full blog. Renders nothing if there are no posts yet.
 */
export function BlogPreview({
  tone = "muted",
  limit = 3,
}: {
  tone?: "default" | "muted";
  limit?: number;
}) {
  const posts = getAllPosts().slice(0, limit);
  if (posts.length === 0) return null;

  return (
    <Section tone={tone}>
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <SectionHeading
          eyebrow="Insights"
          title="Latest from the blog."
          description="Practical guides on hiring, delegating, and building a dependable virtual team."
          className="max-w-2xl"
        />
        <Button asChild variant="outline" className="hidden shrink-0 sm:inline-flex">
          <Link href="/blog">View all articles</Link>
        </Button>
      </div>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post, i) => (
          <Reveal key={post.slug} delay={i * 60}>
            <PostCard post={post} />
          </Reveal>
        ))}
      </div>

      <div className="mt-8 sm:hidden">
        <Button asChild variant="outline" className="w-full">
          <Link href="/blog">View all articles</Link>
        </Button>
      </div>
    </Section>
  );
}
