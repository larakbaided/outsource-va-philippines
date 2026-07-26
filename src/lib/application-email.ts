import "server-only";
import { Resend } from "resend";
import {
  applicantConfirmationEmail,
  recruiterNotificationEmail,
} from "@/emails/application-templates";
import { getSupabaseAdmin, RESUME_BUCKET } from "@/lib/supabase";
import type { ApplicationSubmission } from "@/lib/application-schema";

type EmailResult = {
  recruiterSent: boolean;
  applicantSent: boolean;
  error?: string;
};

export type ResumeRef = {
  resumeFilename: string;
  resumePath: string;
};

/** How long the résumé link in the notification email stays valid. */
const SIGNED_URL_TTL_SECONDS = 60 * 60 * 24 * 7; // 7 days

/**
 * Notify the recruiter and confirm to the applicant.
 *
 * Never throws — email is best-effort so a delivery failure does not lose a
 * stored application. The résumé is shared as a short-lived signed URL rather
 * than an attachment, so the file itself never leaves the private bucket.
 */
export async function sendApplicationEmails(
  data: ApplicationSubmission,
  resume: ResumeRef,
): Promise<EmailResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  const to =
    process.env.CAREERS_NOTIFICATION_EMAIL ||
    process.env.CONTACT_NOTIFICATION_EMAIL;

  if (!apiKey || !from || !to) {
    return { recruiterSent: false, applicantSent: false, error: "not_configured" };
  }

  const resumeUrl = await createSignedResumeUrl(resume.resumePath);

  const resend = new Resend(apiKey);
  const result: EmailResult = { recruiterSent: false, applicantSent: false };

  // Recruiter notification (reply-to the applicant for easy follow-up).
  try {
    const email = recruiterNotificationEmail(data, resume, resumeUrl);
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: data.email,
      subject: email.subject,
      html: email.html,
      text: email.text,
    });
    result.recruiterSent = !error;
    if (error) result.error = `recruiter: ${error.message}`;
  } catch (e) {
    result.error = `recruiter: ${(e as Error).message}`;
  }

  // Applicant confirmation.
  try {
    const email = applicantConfirmationEmail(data);
    const { error } = await resend.emails.send({
      from,
      to: data.email,
      subject: email.subject,
      html: email.html,
      text: email.text,
    });
    result.applicantSent = !error;
    if (error)
      result.error = [result.error, `applicant: ${error.message}`]
        .filter(Boolean)
        .join("; ");
  } catch (e) {
    result.error = [result.error, `applicant: ${(e as Error).message}`]
      .filter(Boolean)
      .join("; ");
  }

  return result;
}

/** Signed, expiring link to the résumé. Null if it can't be generated. */
async function createSignedResumeUrl(path: string): Promise<string | null> {
  const supabase = getSupabaseAdmin();
  if (!supabase) return null;
  try {
    const { data, error } = await supabase.storage
      .from(RESUME_BUCKET)
      .createSignedUrl(path, SIGNED_URL_TTL_SECONDS);
    if (error) return null;
    return data?.signedUrl ?? null;
  } catch {
    return null;
  }
}
