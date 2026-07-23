import { z } from "zod";
import {
  serviceOptions,
  supportLevelOptions,
  teamSizeOptions,
  budgetOptions,
  referralOptions,
  timezoneOptions,
} from "@/content/contact";

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

const optionalText = (max: number) => z.string().trim().max(max).optional();

/**
 * Fields the visitor fills in. Shared by the client form (React Hook Form) and
 * the server route so validation is identical on both sides.
 */
export const contactFormSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, "First name is required")
    .max(80, "That name is too long"),
  lastName: z
    .string()
    .trim()
    .min(1, "Last name is required")
    .max(80, "That name is too long"),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .min(1, "Work email is required")
    .max(160, "That email is too long")
    .refine((v) => EMAIL_RE.test(v), "Please enter a valid email address"),
  phone: optionalText(40),
  companyName: optionalText(120),
  companyWebsite: optionalText(200),
  teamSize: z.enum(teamSizeOptions).optional().or(z.literal("")),
  serviceNeeded: z.enum(serviceOptions, {
    error: "Please select a service",
  }),
  supportLevel: z.enum(supportLevelOptions).optional().or(z.literal("")),
  desiredStartDate: optionalText(60),
  budgetRange: z.enum(budgetOptions).optional().or(z.literal("")),
  timezone: z.enum(timezoneOptions).optional().or(z.literal("")),
  referralSource: z.enum(referralOptions).optional().or(z.literal("")),
  message: z.string().trim().max(2000, "Please shorten your message").optional(),
  selectedTalent: optionalText(60),
  consent: z
    .boolean()
    .refine((v) => v === true, "Please agree before submitting"),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

/** Default empty values for the form. */
export const contactFormDefaults: ContactFormValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  companyName: "",
  companyWebsite: "",
  teamSize: "",
  serviceNeeded: undefined as unknown as ContactFormValues["serviceNeeded"],
  supportLevel: "",
  desiredStartDate: "",
  budgetRange: "",
  timezone: "",
  referralSource: "",
  message: "",
  selectedTalent: "",
  consent: false,
};

/**
 * Full payload accepted by the API route: the form fields plus hidden
 * anti-spam and attribution metadata added at submit time.
 */
export const contactSubmissionSchema = contactFormSchema.extend({
  /**
   * Honeypot — must stay empty. Accepted by the schema (so the trap isn't
   * revealed via a validation error) and handled silently in the API route.
   */
  botField: z.string().max(200).optional(),
  /** Cloudflare Turnstile token (validated server-side when configured). */
  turnstileToken: z.string().max(4000).optional(),
  /** Page the form was submitted from. */
  sourcePage: optionalText(200),
  utmSource: optionalText(120),
  utmMedium: optionalText(120),
  utmCampaign: optionalText(160),
  utmContent: optionalText(160),
  utmTerm: optionalText(160),
});

export type ContactSubmission = z.infer<typeof contactSubmissionSchema>;
