import "server-only";
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

/**
 * Markdown-powered job board. Roles live as .md files in src/content/jobs/.
 * Each file's frontmatter defines its metadata; the body is Markdown.
 *
 * TO POST A ROLE: create a new `.md` file in src/content/jobs/ (see
 * src/content/jobs/README.md for the template), commit, and push — Vercel
 * redeploys automatically. The filename (minus .md) becomes the URL slug.
 *
 * TO CLOSE A ROLE: delete the file, or rename it with a leading underscore to
 * keep it around as a draft. Roles past their `closing` date drop off the list
 * automatically.
 */

const JOBS_DIR = path.join(process.cwd(), "src", "content", "jobs");

export type JobMeta = {
  slug: string;
  title: string;
  /** Grouping shown as a filter, e.g. "GoHighLevel & CRM". */
  department: string;
  /** Engagement type, e.g. "Full-time", "Part-time", "Project-based". */
  type: string;
  /** e.g. "Remote — Philippines". */
  location: string;
  /** Working hours expectation, e.g. "US Eastern business hours". */
  hours?: string;
  /** ISO date the role was posted, e.g. "2026-07-26". */
  posted: string;
  /** Optional ISO date after which the role stops being listed. */
  closing?: string;
  /** One-or-two-sentence summary shown on the listing card. */
  summary: string;
  /** Headline skills shown as badges. */
  skills: string[];
  /** Tools the role uses day to day. */
  tools: string[];
  /**
   * Optional pay line. Left blank unless you have an approved figure — do not
   * invent one, and do not reuse the client rate card here (that is what
   * clients pay us, not what a contractor earns).
   */
  compensation?: string;
  /** Pin to the top of the listing. */
  featured: boolean;
};

export type Job = {
  meta: JobMeta;
  content: string;
};

/**
 * A file counts as a live role only if it's a .md file that isn't the README
 * guide and isn't a draft (drafts are prefixed with an underscore).
 */
function isJobFile(fileName: string): boolean {
  return (
    fileName.endsWith(".md") &&
    fileName.toLowerCase() !== "readme.md" &&
    !fileName.startsWith("_")
  );
}

/** A role is closed once its closing date has passed (UTC, date-only). */
function isClosed(meta: JobMeta, now: Date): boolean {
  if (!meta.closing) return false;
  return new Date(`${meta.closing}T23:59:59Z`).getTime() < now.getTime();
}

function readJobFile(fileName: string): Job | null {
  const slug = fileName.replace(/\.md$/, "");
  const raw = fs.readFileSync(path.join(JOBS_DIR, fileName), "utf8");
  const { data, content } = matter(raw);

  if (!data.title || !data.posted) return null; // skip malformed drafts

  return {
    meta: {
      slug,
      title: String(data.title),
      department: String(data.department ?? "General"),
      type: String(data.type ?? "Full-time"),
      location: String(data.location ?? "Remote — Philippines"),
      hours: data.hours ? String(data.hours) : undefined,
      posted: String(data.posted),
      closing: data.closing ? String(data.closing) : undefined,
      summary: String(data.summary ?? ""),
      skills: Array.isArray(data.skills) ? data.skills.map(String) : [],
      tools: Array.isArray(data.tools) ? data.tools.map(String) : [],
      compensation: data.compensation ? String(data.compensation) : undefined,
      featured: Boolean(data.featured),
    },
    content,
  };
}

function readAll(): Job[] {
  if (!fs.existsSync(JOBS_DIR)) return [];
  return fs
    .readdirSync(JOBS_DIR)
    .filter(isJobFile)
    .map(readJobFile)
    .filter((j): j is Job => Boolean(j));
}

/** Open roles: featured first, then newest posted first. */
export function getOpenJobs(now: Date = new Date()): JobMeta[] {
  return readAll()
    .map((j) => j.meta)
    .filter((m) => !isClosed(m, now))
    .sort((a, b) => {
      if (a.featured !== b.featured) return a.featured ? -1 : 1;
      return a.posted < b.posted ? 1 : -1;
    });
}

/** Every slug that should be prerendered, including recently closed roles. */
export function getAllJobSlugs(): string[] {
  if (!fs.existsSync(JOBS_DIR)) return [];
  return fs
    .readdirSync(JOBS_DIR)
    .filter(isJobFile)
    .map((f) => f.replace(/\.md$/, ""));
}

export function getJobBySlug(slug: string): Job | null {
  const fileName = `${slug}.md`;
  // Guard the slug itself: without this, a draft (_foo) or the README could be
  // fetched by typing its URL even though it never appears in a listing.
  if (!isJobFile(fileName)) return null;
  if (slug.includes("/") || slug.includes("\\") || slug.includes("..")) return null;
  if (!fs.existsSync(path.join(JOBS_DIR, fileName))) return null;
  return readJobFile(fileName);
}

/** Whether a given role is still accepting applications. */
export function isJobOpen(meta: JobMeta, now: Date = new Date()): boolean {
  return !isClosed(meta, now);
}

/** Departments present across open roles, for the listing filter. */
export function getDepartments(now: Date = new Date()): string[] {
  return [...new Set(getOpenJobs(now).map((j) => j.department))].sort();
}

/** Other open roles, excluding the current slug. */
export function getOtherJobs(slug: string, limit = 3): JobMeta[] {
  return getOpenJobs()
    .filter((j) => j.slug !== slug)
    .slice(0, limit);
}

/** Format an ISO date as a readable string (UTC to avoid hydration drift). */
export function formatJobDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
