import { escapeHtml } from "@/lib/sanitize";
import { site } from "@/content/site";
import type { ApplicationSubmission } from "@/lib/application-schema";
import type { ResumeRef } from "@/lib/application-email";

type Email = { subject: string; html: string; text: string };

const BRAND = site.name;
const ACCENT = "#b08b4f";
const INK = "#1f3a2e";
const MUTED = "#5c6b63";
const BG = "#fbf9f4";

/** Shared shell, matching src/emails/templates.ts with a Careers label. */
function shell(title: string, bodyHtml: string): string {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="color-scheme" content="light" />
<title>${escapeHtml(title)}</title>
</head>
<body style="margin:0;padding:0;background:${BG};font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${BG};padding:24px 0;">
<tr><td align="center">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border:1px solid #e7e1d3;border-radius:16px;overflow:hidden;">
<tr><td style="padding:24px 32px;border-bottom:1px solid #e7e1d3;">
<span style="font-size:18px;font-weight:600;color:${INK};">Outsource VA</span>
<span style="font-size:11px;letter-spacing:2px;text-transform:uppercase;color:${ACCENT};display:block;margin-top:2px;">Philippines &middot; Careers</span>
</td></tr>
<tr><td style="padding:32px;">
${bodyHtml}
</td></tr>
<tr><td style="padding:20px 32px;border-top:1px solid #e7e1d3;background:${BG};">
<p style="margin:0;font-size:12px;color:${MUTED};line-height:1.5;">${escapeHtml(BRAND)} &middot; ${escapeHtml(site.legal.companyName)}</p>
</td></tr>
</table>
</td></tr>
</table>
</body>
</html>`;
}

function row(label: string, value: string): string {
  if (!value) return "";
  return `<tr>
<td style="padding:8px 0;font-size:13px;color:${MUTED};width:42%;vertical-align:top;">${escapeHtml(label)}</td>
<td style="padding:8px 0;font-size:14px;color:${INK};font-weight:500;">${escapeHtml(value)}</td>
</tr>`;
}

/** Sent to the recruiter for each new application. */
export function recruiterNotificationEmail(
  data: ApplicationSubmission,
  resume: ResumeRef,
  resumeUrl: string | null,
): Email {
  const role = data.jobTitle || "General application";
  const subject = `New application: ${data.fullName} — ${role}`;

  const detailRows = [
    row("Name", data.fullName),
    row("Email", data.email),
    row("Phone", data.phone),
    row("Location", data.location || ""),
    row("Portfolio / LinkedIn", data.portfolioUrl || ""),
    row("Experience", data.yearsExperience),
    row("Looking for", data.engagementInterest || ""),
    row("Available", data.availability || ""),
    row("Tools", data.tools || ""),
    row("Applied for", role),
    row("Résumé file", resume.resumeFilename),
  ].join("");

  const noteHtml = data.coverNote
    ? `<h2 style="margin:28px 0 8px;font-size:14px;color:${MUTED};font-weight:600;text-transform:uppercase;letter-spacing:1px;">Their note</h2>
<p style="margin:0;font-size:15px;line-height:1.6;color:${INK};white-space:pre-wrap;">${escapeHtml(data.coverNote)}</p>`
    : "";

  const resumeHtml = resumeUrl
    ? `<p style="margin:24px 0 0;">
<a href="${escapeHtml(resumeUrl)}" style="display:inline-block;background:${INK};color:#ffffff;text-decoration:none;padding:12px 22px;border-radius:999px;font-size:14px;font-weight:600;">Download résumé</a>
</p>
<p style="margin:10px 0 0;font-size:12px;color:${MUTED};">This link expires in 7 days. The file stays in the private applications bucket.</p>`
    : `<p style="margin:24px 0 0;font-size:13px;color:${MUTED};">Résumé stored at <code>${escapeHtml(resume.resumePath)}</code> — open it from the Supabase dashboard.</p>`;

  const html = shell(
    subject,
    `<h1 style="margin:0 0 6px;font-size:20px;color:${INK};">New application</h1>
<p style="margin:0 0 20px;font-size:15px;color:${MUTED};">${escapeHtml(role)}</p>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0">${detailRows}</table>
${noteHtml}
${resumeHtml}`,
  );

  const text = [
    `New application — ${role}`,
    "",
    `Name: ${data.fullName}`,
    `Email: ${data.email}`,
    `Phone: ${data.phone}`,
    data.location ? `Location: ${data.location}` : "",
    data.portfolioUrl ? `Portfolio: ${data.portfolioUrl}` : "",
    `Experience: ${data.yearsExperience}`,
    data.engagementInterest ? `Looking for: ${data.engagementInterest}` : "",
    data.availability ? `Available: ${data.availability}` : "",
    data.tools ? `Tools: ${data.tools}` : "",
    "",
    data.coverNote ? `Note:\n${data.coverNote}` : "",
    "",
    resumeUrl
      ? `Résumé (link expires in 7 days): ${resumeUrl}`
      : `Résumé stored at: ${resume.resumePath}`,
  ]
    .filter(Boolean)
    .join("\n");

  return { subject, html, text };
}

/** Confirmation sent to the applicant. */
export function applicantConfirmationEmail(
  data: ApplicationSubmission,
): Email {
  const role = data.jobTitle || "your application";
  const subject = `We received your application — ${BRAND}`;

  const firstName = data.fullName.split(/\s+/)[0] || "there";

  const html = shell(
    subject,
    `<h1 style="margin:0 0 12px;font-size:20px;color:${INK};">Thanks, ${escapeHtml(firstName)}.</h1>
<p style="margin:0 0 16px;font-size:15px;line-height:1.6;color:${INK};">We've received your application for ${escapeHtml(role)} and your résumé came through fine.</p>
<p style="margin:0 0 16px;font-size:15px;line-height:1.6;color:${INK};">Here's what happens next. We read every application and review it against the role. If your experience fits, we'll be in touch to arrange a written and spoken English assessment, then verify your experience and references before putting you forward to the client.</p>
<p style="margin:0 0 16px;font-size:15px;line-height:1.6;color:${INK};">Timelines vary depending on the role. We'll let you know either way.</p>
<p style="margin:0;font-size:15px;line-height:1.6;color:${MUTED};">There is never a fee to apply or to be placed. If anyone asks you to pay for a role with us, it isn't us.</p>`,
  );

  const text = [
    `Thanks, ${firstName}.`,
    "",
    `We've received your application for ${role} and your résumé came through fine.`,
    "",
    "We read every application and review it against the role. If your experience fits, we'll be in touch to arrange a written and spoken English assessment, then verify your experience and references before putting you forward to the client.",
    "",
    "Timelines vary depending on the role. We'll let you know either way.",
    "",
    "There is never a fee to apply or to be placed. If anyone asks you to pay for a role with us, it isn't us.",
    "",
    `— ${BRAND}`,
  ].join("\n");

  return { subject, html, text };
}
