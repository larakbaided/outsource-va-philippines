import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/blog";
import type { BlogPostMeta } from "@/lib/blog";

export function PostCard({
  post,
  priority = false,
}: {
  post: BlogPostMeta;
  priority?: boolean;
}) {
  return (
    <Card className="group flex h-full flex-col overflow-hidden transition-shadow duration-300 hover:shadow-[var(--shadow-lift)]">
      <Link href={`/blog/${post.slug}`} className="flex h-full flex-col">
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-surface-muted">
          {post.coverImage ? (
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              sizes="(max-width: 640px) 95vw, (max-width: 1024px) 47vw, 380px"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              priority={priority}
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-gradient-to-br from-[#1f3a2e] to-[#3d7a55]">
              <span className="font-serif text-2xl text-white/90">
                Outsource VA
              </span>
            </div>
          )}
        </div>

        <div className="flex flex-1 flex-col p-6">
          {post.tags[0] && (
            <Badge variant="sage" size="sm" className="w-fit">
              {post.tags[0]}
            </Badge>
          )}
          <h3 className="mt-3 text-xl font-medium leading-snug tracking-tight">
            {post.title}
          </h3>
          <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-muted-foreground">
            {post.excerpt}
          </p>

          <div className="mt-4 flex items-center gap-3 text-xs text-muted-foreground">
            <span>{formatDate(post.date)}</span>
            <span aria-hidden="true">·</span>
            <span className="inline-flex items-center gap-1">
              <Clock className="size-3.5" />
              {post.readingMinutes} min read
            </span>
          </div>

          <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-accent-strong">
            Read article
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </span>
        </div>
      </Link>
    </Card>
  );
}
