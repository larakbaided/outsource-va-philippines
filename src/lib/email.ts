import "server-only";
import { Resend } from "resend";
import {
  agencyNotificationEmail,
  visitorConfirmationEmail,
} from "@/emails/templates";
import type { ContactSubmission } from "@/lib/schema";

type EmailResult = {
  agencySent: boolean;
  visitorSent: boolean;
  error?: string;
};

/**
 * Send the agency notification + visitor confirmation emails.
 *
 * Never throws — email is best-effort so a delivery failure does not lose a
 * stored inquiry. Returns which messages succeeded so the caller can log.
 * No-ops (returns all false) when RESEND_API_KEY is not configured.
 */
export async function sendContactEmails(
  data: ContactSubmission,
): Promise<EmailResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  const to = process.env.CONTACT_NOTIFICATION_EMAIL;

  if (!apiKey || !from || !to) {
    return { agencySent: false, visitorSent: false, error: "not_configured" };
  }

  const resend = new Resend(apiKey);
  const result: EmailResult = { agencySent: false, visitorSent: false };

  // Agency notification (reply-to the visitor for easy follow-up).
  try {
    const email = agencyNotificationEmail(data);
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: data.email,
      subject: email.subject,
      html: email.html,
      text: email.text,
    });
    result.agencySent = !error;
    if (error) result.error = `agency: ${error.message}`;
  } catch (e) {
    result.error = `agency: ${(e as Error).message}`;
  }

  // Visitor confirmation.
  try {
    const email = visitorConfirmationEmail(data);
    const { error } = await resend.emails.send({
      from,
      to: data.email,
      subject: email.subject,
      html: email.html,
      text: email.text,
    });
    result.visitorSent = !error;
    if (error)
      result.error = [result.error, `visitor: ${error.message}`]
        .filter(Boolean)
        .join("; ");
  } catch (e) {
    result.error = [result.error, `visitor: ${(e as Error).message}`]
      .filter(Boolean)
      .join("; ");
  }

  return result;
}
