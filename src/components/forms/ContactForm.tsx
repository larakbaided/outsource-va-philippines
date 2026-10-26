"use client";

import * as React from "react";
import Link from "next/link";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2, AlertCircle } from "lucide-react";
import {
  contactFormSchema,
  contactFormDefaults,
  type ContactFormValues,
} from "@/lib/schema";
import { cn } from "@/lib/utils";
import { Input, Textarea } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Turnstile } from "@/components/forms/Turnstile";
import { ConsultationButton } from "@/components/ConsultationButton";
import { trackEvent } from "@/lib/analytics";
import {
  serviceOptions,
  supportLevelOptions,
  teamSizeOptions,
  budgetOptions,
  referralOptions,
  timezoneOptions,
} from "@/content/contact";
import { team } from "@/content/team";

type Meta = {
  sourcePage: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  utmTerm?: string;
};

const turnstileEnabled = Boolean(process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY);

/** A labelled field row with error message. */
function Field({
  label,
  htmlFor,
  required,
  error,
  hint,
  children,
  className,
}: {
  label: string;
  htmlFor?: string;
  required?: boolean;
  error?: string;
  hint?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <Label htmlFor={htmlFor} required={required}>
        {label}
      </Label>
      {children}
      {hint && !error && (
        <p className="text-xs text-muted-foreground">{hint}</p>
      )}
      {error && (
        <p className="flex items-center gap-1 text-xs text-destructive" role="alert">
          <AlertCircle className="size-3.5" />
          {error}
        </p>
      )}
    </div>
  );
}

export function ContactForm() {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: contactFormDefaults,
    mode: "onBlur",
  });

  const [submitted, setSubmitted] = React.useState(false);
  const [serverError, setServerError] = React.useState<string | null>(null);
  const [turnstileToken, setTurnstileToken] = React.useState<string>("");
  const [meta, setMeta] = React.useState<Meta>({ sourcePage: "/contact" });
  const [selectedTalentName, setSelectedTalentName] = React.useState<string>("");
  const startedRef = React.useRef(false);

  // Capture attribution + preselected talent from the URL on mount.
  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const talentSlug = params.get("talent");
    const member = talentSlug
      ? team.find((m) => m.slug === talentSlug)
      : undefined;
    // Initialize attribution + preselected talent from the URL on mount.
    // These are browser-only reads, so they cannot be SSR-safe initial state.
    /* eslint-disable react-hooks/set-state-in-effect */
    if (member) setSelectedTalentName(member.name);

    setMeta({
      sourcePage: window.location.pathname || "/contact",
      utmSource: params.get("utm_source") || undefined,
      utmMedium: params.get("utm_medium") || undefined,
      utmCampaign: params.get("utm_campaign") || undefined,
      utmContent: params.get("utm_content") || undefined,
      utmTerm: params.get("utm_term") || undefined,
    });
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  const markStarted = () => {
    if (!startedRef.current) {
      startedRef.current = true;
      trackEvent("contact_form_started", { source: meta.sourcePage });
    }
  };

  const onSubmit = async (values: ContactFormValues) => {
    setServerError(null);

    if (turnstileEnabled && !turnstileToken) {
      setServerError("Please complete the verification below.");
      return;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          selectedTalent: selectedTalentName || values.selectedTalent || "",
          botField: "",
          turnstileToken,
          ...meta,
        }),
      });

      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
      };

      if (!res.ok || !data.ok) {
        setServerError(
          data.error || "Something went wrong. Please try again in a moment.",
        );
        return;
      }

      trackEvent("contact_form_submitted", {
        source: meta.sourcePage,
        service: values.serviceNeeded,
      });
      setSubmitted(true);
      reset(contactFormDefaults);
    } catch {
      // Network error — keep the entered values so nothing is lost.
      setServerError(
        "We couldn't reach the server. Please check your connection and try again.",
      );
    }
  };

  if (submitted) {
    return (
      <div
        className="rounded-2xl border border-border bg-surface p-8 text-center sm:p-10"
        role="status"
      >
        <CheckCircle2 className="mx-auto size-12 text-success" />
        <h3 className="mt-4 text-2xl font-medium">Thank you for reaching out.</h3>
        <p className="mx-auto mt-3 max-w-md text-muted-foreground">
          We have received your inquiry and will review your needs shortly. You
          can also book a consultation now if you would like to speak with us
          directly.
        </p>
        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <ConsultationButton source="contact-success">
            Book a Consultation
          </ConsultationButton>
          <Button variant="outline" onClick={() => setSubmitted(false)}>
            Send another inquiry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      onChange={markStarted}
      noValidate
      className="space-y-5"
    >
      {selectedTalentName && (
        <div className="rounded-xl border border-accent/30 bg-accent/[0.06] px-4 py-3 text-sm">
          You&apos;re asking about{" "}
          <strong className="text-accent-strong">{selectedTalentName}</strong>.
          We&apos;ll include this in your inquiry.
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="First name" htmlFor="firstName" required error={errors.firstName?.message}>
          <Input id="firstName" autoComplete="given-name" aria-invalid={!!errors.firstName} {...register("firstName")} />
        </Field>
        <Field label="Last name" htmlFor="lastName" required error={errors.lastName?.message}>
          <Input id="lastName" autoComplete="family-name" aria-invalid={!!errors.lastName} {...register("lastName")} />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Work email" htmlFor="email" required error={errors.email?.message}>
          <Input id="email" type="email" autoComplete="email" aria-invalid={!!errors.email} {...register("email")} />
        </Field>
        <Field label="Phone number" htmlFor="phone" error={errors.phone?.message}>
          <Input id="phone" type="tel" autoComplete="tel" {...register("phone")} />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Company name" htmlFor="companyName" error={errors.companyName?.message}>
          <Input id="companyName" autoComplete="organization" {...register("companyName")} />
        </Field>
        <Field label="Company website" htmlFor="companyWebsite" error={errors.companyWebsite?.message}>
          <Input id="companyWebsite" placeholder="https://" {...register("companyWebsite")} />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <SelectField
          name="teamSize"
          control={control}
          label="Current team size"
          placeholder="Select team size"
          options={teamSizeOptions}
        />
        <SelectField
          name="serviceNeeded"
          control={control}
          label="Service needed"
          placeholder="Select a service"
          options={serviceOptions}
          required
          error={errors.serviceNeeded?.message as string | undefined}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <SelectField
          name="supportLevel"
          control={control}
          label="Preferred support level"
          placeholder="Select support level"
          options={supportLevelOptions}
        />
        <Field label="Desired start date" htmlFor="desiredStartDate" error={errors.desiredStartDate?.message}>
          <Input id="desiredStartDate" type="date" {...register("desiredStartDate")} />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <SelectField
          name="budgetRange"
          control={control}
          label="Estimated monthly budget"
          placeholder="Select a range"
          options={budgetOptions}
        />
        <SelectField
          name="timezone"
          control={control}
          label="Preferred working hours / timezone"
          placeholder="Select a timezone"
          options={timezoneOptions}
        />
      </div>

      <SelectField
        name="referralSource"
        control={control}
        label="How did you hear about us?"
        placeholder="Select an option"
        options={referralOptions}
      />

      <Field label="Message" htmlFor="message" error={errors.message?.message} hint="Tell us a little about what you need help with.">
        <Textarea id="message" rows={5} {...register("message")} />
      </Field>

      {/* Honeypot — visually hidden, not announced to screen readers. */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="botField">Leave this field empty</label>
        <input id="botField" type="text" tabIndex={-1} autoComplete="off" name="botField_display" />
      </div>

      {/* Consent */}
      <Controller
        control={control}
        name="consent"
        render={({ field }) => (
          <div className="flex items-start gap-3">
            <Checkbox
              id="consent"
              checked={field.value}
              onCheckedChange={(v) => field.onChange(v === true)}
              aria-invalid={!!errors.consent}
              className="mt-0.5"
            />
            <label htmlFor="consent" className="text-sm leading-relaxed text-foreground/85">
              I agree that Outsource VA Philippines may contact me regarding my
              inquiry. I understand that submitting this form does not create a
              contractual or employment relationship.{" "}
              <Link href="/privacy-policy" className="text-accent-strong underline underline-offset-2">
                Privacy Policy
              </Link>{" "}
              &middot;{" "}
              <Link href="/terms" className="text-accent-strong underline underline-offset-2">
                Terms
              </Link>
            </label>
          </div>
        )}
      />
      {errors.consent && (
        <p className="flex items-center gap-1 text-xs text-destructive" role="alert">
          <AlertCircle className="size-3.5" />
          {errors.consent.message}
        </p>
      )}

      {turnstileEnabled && (
        <Turnstile onVerify={setTurnstileToken} onExpire={() => setTurnstileToken("")} />
      )}

      {serverError && (
        <div className="flex items-start gap-2 rounded-xl border border-destructive/30 bg-destructive/[0.06] px-4 py-3 text-sm text-destructive" role="alert">
          <AlertCircle className="mt-0.5 size-4 shrink-0" />
          <span>{serverError}</span>
        </div>
      )}

      <Button type="submit" size="lg" disabled={isSubmitting} className="w-full sm:w-auto">
        {isSubmitting ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            Sending…
          </>
        ) : (
          "Send Inquiry"
        )}
      </Button>
      <p className="text-xs text-muted-foreground">
        We&apos;ll never share your information. Fields marked{" "}
        <span className="text-destructive">*</span> are required.
      </p>
    </form>
  );
}

/* ------------------------------------------------------------------------- */

function SelectField<T extends readonly string[]>({
  name,
  control,
  label,
  placeholder,
  options,
  required,
  error,
}: {
  name: keyof ContactFormValues;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: any;
  label: string;
  placeholder: string;
  options: T;
  required?: boolean;
  error?: string;
}) {
  return (
    <Field label={label} required={required} error={error}>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <Select
            value={(field.value as string) || undefined}
            onValueChange={field.onChange}
          >
            <SelectTrigger aria-invalid={!!error} onBlur={field.onBlur}>
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              {options.map((opt) => (
                <SelectItem key={opt} value={opt}>
                  {opt}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />
    </Field>
  );
}
