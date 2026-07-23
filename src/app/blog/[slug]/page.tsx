import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, Calendar } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Markdown } from "@/components/blog/Markdown";
import { PostCard } from "@/components/blog/PostCard";
import { ConsultationButton } from "@/components/ConsultationButton";
import { BreadcrumbSchema, ArticleSchema } from "@/components/seo/JsonLd";
import {
  getAllSlugs,
  getPostBySlug,
  getRelatedPosts,
  formatDate,
} from "@/lib/blog";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return buildMetadata({ path: `/blog/${slug}` });

  return {
    ...buildMetadata({
      path: `/blog/${post.meta.slug}`,
      title: post.meta.title,
      description: post.meta.description || post.meta.excerpt,
      ogImage: post.meta.coverImage,
    }),
    keywords: post.meta.keywords.length ? post.meta.keywords : undefined,
    authors: [{ name: post.meta.author }],
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const { meta, content } = post;
  const related = getRelatedPosts(slug);

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
          { name: meta.title, path: `/blog/${meta.slug}` },
        ]}
      />
      <ArticleSchema
        title={meta.title}
        description={meta.description || meta.excerpt}
        path={`/blog/${meta.slug}`}
        datePublished={meta.date}
        dateModified={meta.updated}
        author={meta.author}
        image={meta.coverImage}
      />

      <article>
        {/* Header */}
        <Container className="pt-12 lg:pt-16">
          <nav aria-label="Breadcrumb" className="mb-6">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-accent-strong"
            >
              <ArrowLeft className="size-4" />
              All articles
            </Link>
          </nav>

          <div className="mx-auto max-w-3xl">
            {meta.tags[0] && (
              <Badge variant="accent" size="md">
                {meta.tags[0]}
              </Badge>
            )}
            <h1 className="mt-4 text-4xl leading-[1.1] sm:text-5xl">
              {meta.title}
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              {meta.excerpt}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 border-y border-border py-4 text-sm text-muted-foreground">
              <span className="font-medium text-foreground">
                {meta.author}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="size-4" />
                {formatDate(meta.date)}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="size-4" />
                {meta.readingMinutes} min read
              </span>
            </div>
          </div>
        </Container>

        {/* Cover image */}
        {meta.coverImage && (
          <Container className="mt-8">
            <div className="relative mx-auto aspect-[16/9] max-w-4xl overflow-hidden rounded-2xl bg-surface-muted shadow-[var(--shadow-soft)]">
              <Image
                src={meta.coverImage}
                alt={meta.title}
                fill
                sizes="(max-width: 1024px) 100vw, 900px"
                className="object-cover"
                priority
              />
            </div>
          </Container>
        )}

        {/* Body */}
        <Container className="py-12">
          <div className="mx-auto max-w-3xl">
            <Markdown content={content} />

            {meta.tags.length > 0 && (
              <div className="mt-10 flex flex-wrap gap-2 border-t border-border pt-6">
                {meta.tags.map((tag) => (
                  <Badge key={tag} variant="default" size="md">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}

            {/* Inline CTA */}
            <div className="mt-10 rounded-2xl border border-accent/30 bg-accent/[0.06] p-6 text-center sm:p-8">
              <h2 className="text-2xl">Need this kind of support in your business?</h2>
              <p className="mx-auto mt-2 max-w-md text-muted-foreground">
                Book a free 30-minute consultation and we&apos;ll match you with
                an experienced virtual professional.
              </p>
              <div className="mt-5">
                <ConsultationButton source={`blog-${meta.slug}`} />
              </div>
            </div>
          </div>
        </Container>
      </article>

      {/* Related posts */}
      {related.length > 0 && (
        <Section tone="muted">
          <h2 className="text-2xl sm:text-3xl">Keep reading</h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <PostCard key={p.slug} post={p} />
            ))}
          </div>
          <div className="mt-8">
            <Button asChild variant="outline">
              <Link href="/blog">View all articles</Link>
            </Button>
          </div>
        </Section>
      )}
    </>
  );
}
