import { z } from "zod";

/**
 * Validation for job applications. Shared by the client form (React Hook Form)
 * and the API route so both sides agree.
 *
 * The résumé is uploaded as a separate multipart field, not through this
 * schema — see RESUME_RULES below and src/app/api/apply/route.ts.
 */

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

const optionalText = (max: number) => z.string().trim().max(max).optional();

export const experienceOptions = [
  "Less than 1 year",
  "1–2 years",
  "3–5 years",
  "6–9 years",
  "10+ years",
] as const;

export const availabilityOptions = [
  "Immediately",
  "Within 2 weeks",
  "Within a month",
  "More than a month",
] as const;

export const engagementInterestOptions = [
  "Full-time",
  "Part-time",
  "Project-based",
  "Open to any",
] as const;

/** Résumé upload constraints, enforced server-side. */
export const RESUME_RULES = {
  maxBytes: 5 * 1024 * 1024, // 5MB
  extensions: [".pdf", ".doc", ".docx"],
  mimeTypes: [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ],
} as const;

export const applicationFormSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(1, "Your name is required")
    .max(120, "That name is too long"),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .min(1, "Email is required")
    .max(160, "That email is too long")
    .refine((v) => EMAIL_RE.test(v), "Please enter a valid email address"),
  phone: z
    .string()
    .trim()
    .min(1, "Phone number is required")
    .max(40, "That number is too long"),
  location: optionalText(120),
  portfolioUrl: optionalText(200),
  yearsExperience: z.enum(experienceOptions, {
    error: "Please select your experience level",
  }),
  engagementInterest: z
    .enum(engagementInterestOptions)
    .optional()
    .or(z.literal("")),
  availability: z.enum(availabilityOptions).optional().or(z.literal("")),
  tools: optionalText(300),
  coverNote: z
    .string()
    .trim()
    .max(2000, "Please shorten your note")
    .optional(),
  /** Slug of the role applied for; empty means a general application. */
  jobSlug: optionalText(120),
  jobTitle: optionalText(200),
  consent: z
    .boolean()
    .refine((v) => v === true, "Please agree before submitting"),
});

export type ApplicationFormValues = z.infer<typeof applicationFormSchema>;

export const applicationFormDefaults: ApplicationFormValues = {
  fullName: "",
  email: "",
  phone: "",
  location: "",
  portfolioUrl: "",
  yearsExperience: undefined as unknown as ApplicationFormValues["yearsExperience"],
  engagementInterest: "",
  availability: "",
  tools: "",
  coverNote: "",
  jobSlug: "",
  jobTitle: "",
  consent: false,
};

/** Fields the API accepts on top of the form: anti-spam and attribution. */
export const applicationSubmissionSchema = applicationFormSchema.extend({
  /** Honeypot — must stay empty. */
  botField: z.string().max(200).optional(),
  turnstileToken: z.string().max(4000).optional(),
  sourcePage: optionalText(200),
});

export type ApplicationSubmission = z.infer<typeof applicationSubmissionSchema>;
