import "server-only";
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

/**
 * Markdown-powered blog. Posts live as .md files in src/content/blog/.
 * Each file's frontmatter defines its metadata; the body is Markdown.
 *
 * TO ADD A POST: create a new `.md` file in src/content/blog/ (see
 * src/content/blog/README.md for the template), commit, and push — Vercel
 * redeploys automatically. The filename (minus .md) becomes the URL slug.
 */

const BLOG_DIR = path.join(process.cwd(), "src", "content", "blog");

export type BlogPostMeta = {
  slug: string;
  title: string;
  description: string;
  /** ISO date string, e.g. "2026-07-20". */
  date: string;
  /** Optional last-updated date. */
  updated?: string;
  author: string;
  /** Short summary shown on cards and used as a fallback description. */
  excerpt: string;
  /** Optional cover image path under /public, e.g. "/blog/foo.webp". */
  coverImage?: string;
  /** Topic tags shown on the post. */
  tags: string[];
  /** Target keywords (used in meta keywords + guides content strategy). */
  keywords: string[];
  /** Estimated reading time in minutes. */
  readingMinutes: number;
};

export type BlogPost = {
  meta: BlogPostMeta;
  content: string;
};

/**
 * A file counts as a publishable post only if it's a .md file that isn't the
 * README guide and isn't a draft (drafts are prefixed with an underscore).
 */
function isPostFile(fileName: string): boolean {
  return (
    fileName.endsWith(".md") &&
    fileName.toLowerCase() !== "readme.md" &&
    !fileName.startsWith("_")
  );
}

function estimateReadingMinutes(markdown: string): number {
  const words = markdown.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

function readPostFile(fileName: string): BlogPost | null {
  const slug = fileName.replace(/\.md$/, "");
  const fullPath = path.join(BLOG_DIR, fileName);
  const raw = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(raw);

  if (!data.title || !data.date) return null; // skip malformed drafts

  return {
    meta: {
      slug,
      title: String(data.title),
      description: String(data.description ?? data.excerpt ?? ""),
      date: String(data.date),
      updated: data.updated ? String(data.updated) : undefined,
      author: String(data.author ?? "Lara"),
      excerpt: String(data.excerpt ?? data.description ?? ""),
      coverImage: data.coverImage ? String(data.coverImage) : undefined,
      tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
      keywords: Array.isArray(data.keywords) ? data.keywords.map(String) : [],
      readingMinutes: estimateReadingMinutes(content),
    },
    content,
  };
}

/** All published posts, newest first. */
export function getAllPosts(): BlogPostMeta[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter(isPostFile)
    .map(readPostFile)
    .filter((p): p is BlogPost => Boolean(p))
    .map((p) => p.meta)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getAllSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter(isPostFile)
    .map((f) => f.replace(/\.md$/, ""));
}

export function getPostBySlug(slug: string): BlogPost | null {
  const fullPath = path.join(BLOG_DIR, `${slug}.md`);
  if (!fs.existsSync(fullPath)) return null;
  return readPostFile(`${slug}.md`);
}

/** Related posts (shares a tag), excluding the current slug. */
export function getRelatedPosts(slug: string, limit = 3): BlogPostMeta[] {
  const current = getPostBySlug(slug);
  if (!current) return [];
  const currentTags = new Set(current.meta.tags);
  return getAllPosts()
    .filter((p) => p.slug !== slug)
    .map((p) => ({
      post: p,
      score: p.tags.filter((t) => currentTags.has(t)).length,
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((x) => x.post);
}

/** Format an ISO date as a readable string (UTC to avoid hydration drift). */
export function formatDate(iso: string): string {
  const d = new Date(`${iso}T00:00:00Z`);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
