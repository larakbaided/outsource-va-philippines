import { NextResponse } from "next/server";
import {
  applicationSubmissionSchema,
  RESUME_RULES,
} from "@/lib/application-schema";
import { sanitizeText } from "@/lib/sanitize";
import { rateLimit } from "@/lib/rate-limit";
import { verifyTurnstile } from "@/lib/turnstile";
import {
  getSupabaseAdmin,
  APPLICATIONS_TABLE,
  RESUME_BUCKET,
} from "@/lib/supabase";
import { sendApplicationEmails } from "@/lib/application-email";

export const runtime = "nodejs";

function getClientIp(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return req.headers.get("x-real-ip") || "unknown";
}

/** Strip anything path-like or unusual out of an uploaded filename. */
function safeFileName(name: string): string {
  return (
    name
      .replace(/[\\/]/g, "-")
      .replace(/[^a-zA-Z0-9._-]/g, "_")
      .replace(/_{2,}/g, "_")
      .slice(-120) || "resume"
  );
}

function extensionOf(name: string): string {
  const dot = name.lastIndexOf(".");
  return dot === -1 ? "" : name.slice(dot).toLowerCase();
}

export async function POST(req: Request) {
  const ip = getClientIp(req);

  // 1) Rate limit — tighter than the contact form because uploads cost more.
  const limit = rateLimit(`apply:${ip}`, { limit: 3, windowMs: 60_000 });
  if (!limit.ok) {
    return NextResponse.json(
      { ok: false, error: "Too many requests. Please try again shortly." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfterSec) } },
    );
  }

  // 2) Parse multipart body.
  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request." },
      { status: 400 },
    );
  }

  const payload = {
    fullName: String(form.get("fullName") ?? ""),
    email: String(form.get("email") ?? ""),
    phone: String(form.get("phone") ?? ""),
    location: String(form.get("location") ?? ""),
    portfolioUrl: String(form.get("portfolioUrl") ?? ""),
    yearsExperience: String(form.get("yearsExperience") ?? ""),
    engagementInterest: String(form.get("engagementInterest") ?? ""),
    availability: String(form.get("availability") ?? ""),
    tools: String(form.get("tools") ?? ""),
    coverNote: String(form.get("coverNote") ?? ""),
    jobSlug: String(form.get("jobSlug") ?? ""),
    jobTitle: String(form.get("jobTitle") ?? ""),
    consent: form.get("consent") === "true",
    botField: String(form.get("botField") ?? ""),
    turnstileToken: String(form.get("turnstileToken") ?? ""),
    sourcePage: String(form.get("sourcePage") ?? ""),
  };

  const parsed = applicationSubmissionSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        error: "Please check the form and try again.",
        fieldErrors: parsed.error.flatten().fieldErrors,
      },
      { status: 400 },
    );
  }
  const data = parsed.data;

  // 3) Honeypot — silently accept so bots don't learn they were caught.
  if (data.botField && data.botField.length > 0) {
    return NextResponse.json({ ok: true });
  }

  // 4) Spam protection (skipped if Turnstile not configured).
  if (!(await verifyTurnstile(data.turnstileToken, ip))) {
    return NextResponse.json(
      { ok: false, error: "Verification failed. Please try again." },
      { status: 400 },
    );
  }

  // 5) Validate the résumé before anything is stored.
  const file = form.get("resume");
  if (!(file instanceof File) || file.size === 0) {
    return NextResponse.json(
      { ok: false, error: "Please attach your résumé." },
      { status: 400 },
    );
  }
  if (file.size > RESUME_RULES.maxBytes) {
    return NextResponse.json(
      { ok: false, error: "That file is over 5MB. Please attach a smaller one." },
      { status: 400 },
    );
  }
  const ext = extensionOf(file.name);
  const extOk = (RESUME_RULES.extensions as readonly string[]).includes(ext);
  const mimeOk = (RESUME_RULES.mimeTypes as readonly string[]).includes(file.type);
  if (!extOk || !mimeOk) {
    return NextResponse.json(
      { ok: false, error: "Please attach a PDF or Word document." },
      { status: 400 },
    );
  }

  // 6) Sanitize free text before storing / emailing.
  const clean = {
    ...data,
    fullName: sanitizeText(data.fullName, 120),
    email: sanitizeText(data.email, 160),
    phone: sanitizeText(data.phone, 40),
    location: sanitizeText(data.location, 120),
    portfolioUrl: sanitizeText(data.portfolioUrl, 200),
    tools: sanitizeText(data.tools, 300),
    coverNote: sanitizeText(data.coverNote, 2000),
    jobSlug: sanitizeText(data.jobSlug, 120),
    jobTitle: sanitizeText(data.jobTitle, 200),
    sourcePage: sanitizeText(data.sourcePage, 200),
  };

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    // Without storage we cannot keep the résumé, and an application without one
    // is not much use — fail loudly rather than silently dropping the file.
    console.error("[apply] Supabase not configured — application rejected.");
    return NextResponse.json(
      { ok: false, error: "We couldn't submit your application. Please try again." },
      { status: 500 },
    );
  }

  // 7) Upload the résumé to a PRIVATE bucket.
  const objectPath = `${clean.jobSlug || "general"}/${crypto.randomUUID()}-${safeFileName(file.name)}`;
  const { error: uploadError } = await supabase.storage
    .from(RESUME_BUCKET)
    .upload(objectPath, file, {
      contentType: file.type,
      upsert: false,
    });

  if (uploadError) {
    console.error("[apply] Résumé upload failed:", uploadError.message);
    return NextResponse.json(
      { ok: false, error: "We couldn't upload your résumé. Please try again." },
      { status: 500 },
    );
  }

  // 8) Persist the application.
  const { error: insertError } = await supabase
    .from(APPLICATIONS_TABLE)
    .insert({
      full_name: clean.fullName,
      email: clean.email,
      phone: clean.phone,
      location: clean.location || null,
      portfolio_url: clean.portfolioUrl || null,
      years_experience: clean.yearsExperience,
      engagement_interest: clean.engagementInterest || null,
      availability: clean.availability || null,
      tools: clean.tools || null,
      cover_note: clean.coverNote || null,
      job_slug: clean.jobSlug || null,
      job_title: clean.jobTitle || null,
      resume_path: objectPath,
      resume_filename: safeFileName(file.name),
      resume_size_bytes: file.size,
      source_page: clean.sourcePage || null,
      consent_given: clean.consent,
      status: "new",
    });

  if (insertError) {
    console.error("[apply] Supabase insert failed:", insertError.message);
    // Don't leave an orphaned file behind.
    await supabase.storage.from(RESUME_BUCKET).remove([objectPath]);
    return NextResponse.json(
      { ok: false, error: "We couldn't submit your application. Please try again." },
      { status: 500 },
    );
  }

  // 9) Emails — best-effort. A delivery failure must not lose the application.
  const emailResult = await sendApplicationEmails(clean, {
    resumeFilename: safeFileName(file.name),
    resumePath: objectPath,
  });
  if (emailResult.error && emailResult.error !== "not_configured") {
    console.error("[apply] Email delivery issue:", emailResult.error);
  }

  return NextResponse.json({ ok: true });
}
