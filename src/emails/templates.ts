import { escapeHtml } from "@/lib/sanitize";
import { site } from "@/content/site";
import type { ContactSubmission } from "@/lib/schema";

type Email = { subject: string; html: string; text: string };

const BRAND = site.name;
const ACCENT = "#b08b4f";
const INK = "#1f3a2e";
const MUTED = "#5c6b63";
const BG = "#fbf9f4";

/** Shared responsive shell for both emails. */
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
<span style="font-size:11px;letter-spacing:2px;text-transform:uppercase;color:${ACCENT};display:block;margin-top:2px;">Philippines</span>
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

/** Notification sent to the agency for each new inquiry. */
export function agencyNotificationEmail(data: ContactSubmission): Email {
  const fullName = `${data.firstName} ${data.lastName}`.trim();
  const subject = `New Website Inquiry: ${fullName} — ${data.serviceNeeded}`;

  const detailRows = [
    row("Name", fullName),
    row("Email", data.email),
    row("Phone", data.phone || ""),
    row("Company", data.companyName || ""),
    row("Website", data.companyWebsite || ""),
    row("Team size", data.teamSize || ""),
    row("Service needed", data.serviceNeeded),
    row("Support level", data.supportLevel || ""),
    row("Budget range", data.budgetRange || ""),
    row("Desired start", data.desiredStartDate || ""),
    row("Timezone", data.timezone || ""),
    row("Asked about", data.selectedTalent || ""),
    row("Heard via", data.referralSource || ""),
    row("Source page", data.sourcePage || ""),
    row(
      "UTM",
      [data.utmSource, data.utmMedium, data.utmCampaign]
        .filter(Boolean)
        .join(" / "),
    ),
  ].join("");

  const messageBlock = data.message
    ? `<div style="margin-top:20px;padding:16px;background:${BG};border-radius:10px;">
<p style="margin:0 0 6px;font-size:13px;color:${MUTED};">Message</p>
<p style="margin:0;font-size:14px;color:${INK};line-height:1.6;white-space:pre-wrap;">${escapeHtml(
        data.message,
      )}</p>
</div>`
    : "";

  const html = shell(
    subject,
    `<h1 style="margin:0 0 4px;font-size:22px;color:${INK};">New inquiry received</h1>
<p style="margin:0 0 20px;font-size:14px;color:${MUTED};">A visitor submitted the contact form.</p>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">${detailRows}</table>
${messageBlock}
<p style="margin:24px 0 0;font-size:12px;color:${MUTED};">Reply directly to this email to reach ${escapeHtml(
      fullName,
    )}.</p>`,
  );

  const text = [
    `New Website Inquiry`,
    `Name: ${fullName}`,
    `Email: ${data.email}`,
    data.phone ? `Phone: ${data.phone}` : "",
    data.companyName ? `Company: ${data.companyName}` : "",
    data.companyWebsite ? `Website: ${data.companyWebsite}` : "",
    data.teamSize ? `Team size: ${data.teamSize}` : "",
    `Service: ${data.serviceNeeded}`,
    data.supportLevel ? `Support level: ${data.supportLevel}` : "",
    data.budgetRange ? `Budget: ${data.budgetRange}` : "",
    data.desiredStartDate ? `Desired start: ${data.desiredStartDate}` : "",
    data.timezone ? `Timezone: ${data.timezone}` : "",
    data.selectedTalent ? `Asked about: ${data.selectedTalent}` : "",
    data.referralSource ? `Heard via: ${data.referralSource}` : "",
    data.sourcePage ? `Source page: ${data.sourcePage}` : "",
    data.message ? `\nMessage:\n${data.message}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  return { subject, html, text };
}

/** Confirmation sent to the person who submitted the form. */
export function visitorConfirmationEmail(data: ContactSubmission): Email {
  const subject = `We received your inquiry — ${BRAND}`;
  const first = data.firstName;

  const html = shell(
    subject,
    `<h1 style="margin:0 0 16px;font-size:22px;color:${INK};">Thank you, ${escapeHtml(
      first,
    )}.</h1>
<p style="margin:0 0 14px;font-size:15px;color:${INK};line-height:1.6;">Thank you for contacting ${escapeHtml(
      BRAND,
    )}. We have received your inquiry and will review the information you provided.</p>
<p style="margin:0 0 14px;font-size:15px;color:${INK};line-height:1.6;">Our next step is to better understand your business, priorities, current systems, and the type of virtual professional who would best support your goals.</p>
<p style="margin:0 0 24px;font-size:15px;color:${INK};line-height:1.6;">You may book a complimentary 30-minute consultation here:</p>
<table role="presentation" cellpadding="0" cellspacing="0"><tr><td style="border-radius:999px;background:${ACCENT};">
<a href="${site.calendlyUrl}" style="display:inline-block;padding:12px 28px;font-size:15px;font-weight:600;color:#ffffff;text-decoration:none;border-radius:999px;">Book Your Consultation</a>
</td></tr></table>
<p style="margin:28px 0 4px;font-size:15px;color:${INK};line-height:1.6;">We look forward to learning more about your business.</p>
<p style="margin:0;font-size:15px;color:${INK};line-height:1.6;">Warmly,<br/><strong>Lara</strong><br/><span style="color:${MUTED};">Founder, ${escapeHtml(
      BRAND,
    )}</span></p>`,
  );

  const text = `Hi ${first},

Thank you for contacting ${BRAND}. We have received your inquiry and will review the information you provided.

Our next step is to better understand your business, priorities, current systems, and the type of virtual professional who would best support your goals.

You may book a complimentary 30-minute consultation here:
${site.calendlyUrl}

We look forward to learning more about your business.

Warmly,
Lara
Founder, ${BRAND}`;

  return { subject, html, text };
}
