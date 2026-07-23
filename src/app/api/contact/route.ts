import { NextResponse } from "next/server";
import { contactSubmissionSchema } from "@/lib/schema";
import { sanitizeText } from "@/lib/sanitize";
import { rateLimit } from "@/lib/rate-limit";
import { verifyTurnstile } from "@/lib/turnstile";
import { getSupabaseAdmin, CONTACT_TABLE } from "@/lib/supabase";
import { sendContactEmails } from "@/lib/email";

export const runtime = "nodejs";

function getClientIp(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return req.headers.get("x-real-ip") || "unknown";
}

export async function POST(req: Request) {
  const ip = getClientIp(req);

  // 1) Rate limit (best-effort per-instance).
  const limit = rateLimit(`contact:${ip}`, { limit: 5, windowMs: 60_000 });
  if (!limit.ok) {
    return NextResponse.json(
      { ok: false, error: "Too many requests. Please try again shortly." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfterSec) } },
    );
  }

  // 2) Parse + validate.
  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request." },
      { status: 400 },
    );
  }

  const parsed = contactSubmissionSchema.safeParse(json);
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
  const humanVerified = await verifyTurnstile(data.turnstileToken, ip);
  if (!humanVerified) {
    return NextResponse.json(
      { ok: false, error: "Verification failed. Please try again." },
      { status: 400 },
    );
  }

  // 5) Sanitize all free-text fields before storing / emailing.
  const clean = {
    ...data,
    firstName: sanitizeText(data.firstName, 80),
    lastName: sanitizeText(data.lastName, 80),
    email: sanitizeText(data.email, 160),
    phone: sanitizeText(data.phone, 40),
    companyName: sanitizeText(data.companyName, 120),
    companyWebsite: sanitizeText(data.companyWebsite, 200),
    desiredStartDate: sanitizeText(data.desiredStartDate, 60),
    message: sanitizeText(data.message, 2000),
    selectedTalent: sanitizeText(data.selectedTalent, 60),
    sourcePage: sanitizeText(data.sourcePage, 200),
  };

  // 6) Persist to Supabase (if configured). A DB failure is a hard error;
  //    an unconfigured DB degrades gracefully (still emails / returns ok).
  const supabase = getSupabaseAdmin();
  let stored = false;
  if (supabase) {
    const { error } = await supabase.from(CONTACT_TABLE).insert({
      first_name: clean.firstName,
      last_name: clean.lastName,
      email: clean.email,
      phone: clean.phone || null,
      company_name: clean.companyName || null,
      company_website: clean.companyWebsite || null,
      team_size: clean.teamSize || null,
      service_needed: clean.serviceNeeded,
      support_level: clean.supportLevel || null,
      desired_start_date: clean.desiredStartDate || null,
      budget_range: clean.budgetRange || null,
      timezone: clean.timezone || null,
      referral_source: clean.referralSource || null,
      message: clean.message || null,
      selected_talent: clean.selectedTalent || null,
      source_page: clean.sourcePage || null,
      utm_source: clean.utmSource || null,
      utm_medium: clean.utmMedium || null,
      utm_campaign: clean.utmCampaign || null,
      utm_content: clean.utmContent || null,
      utm_term: clean.utmTerm || null,
      consent_given: clean.consent,
      status: "new",
    });

    if (error) {
      console.error("[contact] Supabase insert failed:", error.message);
      return NextResponse.json(
        {
          ok: false,
          error: "We couldn't submit your inquiry. Please try again.",
        },
        { status: 500 },
      );
    }
    stored = true;
  } else {
    console.warn("[contact] Supabase not configured — inquiry not persisted.");
  }

  // 7) Send emails — best-effort. Failures are logged, never lose the record.
  const emailResult = await sendContactEmails(clean);
  if (emailResult.error && emailResult.error !== "not_configured") {
    console.error("[contact] Email delivery issue:", emailResult.error);
  }

  return NextResponse.json({ ok: true, stored });
}
