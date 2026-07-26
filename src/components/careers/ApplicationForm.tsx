"use client";

import * as React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2, AlertCircle, Paperclip } from "lucide-react";
import {
  applicationFormSchema,
  applicationFormDefaults,
  experienceOptions,
  availabilityOptions,
  engagementInterestOptions,
  RESUME_RULES,
  type ApplicationFormValues,
} from "@/lib/application-schema";
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
import { trackEvent } from "@/lib/analytics";
import { site } from "@/content/site";

const turnstileEnabled = Boolean(process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY);

const MAX_MB = RESUME_RULES.maxBytes / (1024 * 1024);
const ACCEPT = RESUME_RULES.extensions.join(",");

/** A labelled field row with error message. Mirrors ContactForm's Field. */
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
      {hint && !error && <p className="text-xs text-muted-foreground">{hint}</p>}
      {error && (
        <p className="flex items-center gap-1 text-xs text-destructive" role="alert">
          <AlertCircle className="size-3.5" />
          {error}
        </p>
      )}
    </div>
  );
}

export function ApplicationForm({
  jobSlug,
  jobTitle,
}: {
  jobSlug: string;
  jobTitle: string;
}) {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ApplicationFormValues>({
    resolver: zodResolver(applicationFormSchema),
    defaultValues: { ...applicationFormDefaults, jobSlug, jobTitle },
    mode: "onBlur",
  });

  const [submitted, setSubmitted] = React.useState(false);
  const [serverError, setServerError] = React.useState<string | null>(null);
  const [resumeError, setResumeError] = React.useState<string | null>(null);
  const [resumeName, setResumeName] = React.useState<string>("");
  const [turnstileToken, setTurnstileToken] = React.useState<string>("");
  const fileRef = React.useRef<HTMLInputElement>(null);
  const startedRef = React.useRef(false);

  const markStarted = () => {
    if (!startedRef.current) {
      startedRef.current = true;
      trackEvent("application_started", { job: jobSlug });
    }
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setResumeError(null);
    const file = e.target.files?.[0];
    if (!file) {
      setResumeName("");
      return;
    }
    if (file.size > RESUME_RULES.maxBytes) {
      setResumeName("");
      e.target.value = "";
      setResumeError(`That file is over ${MAX_MB}MB. Please attach a smaller one.`);
      return;
    }
    setResumeName(file.name);
    markStarted();
  };

  const onSubmit = async (values: ApplicationFormValues) => {
    setServerError(null);
    setResumeError(null);

    const file = fileRef.current?.files?.[0];
    if (!file) {
      setResumeError("Please attach your résumé.");
      return;
    }
    if (turnstileEnabled && !turnstileToken) {
      setServerError("Please complete the verification below.");
      return;
    }

    const body = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      body.append(key, typeof value === "boolean" ? String(value) : String(value ?? ""));
    });
    body.append("resume", file);
    body.append("botField", "");
    body.append("turnstileToken", turnstileToken);
    body.append("sourcePage", window.location.pathname);

    try {
      const res = await fetch("/api/apply", { method: "POST", body });
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

      trackEvent("application_submitted", { job: jobSlug });
      setSubmitted(true);
      reset({ ...applicationFormDefaults, jobSlug, jobTitle });
      setResumeName("");
      if (fileRef.current) fileRef.current.value = "";
    } catch {
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
        <h3 className="mt-4 text-2xl font-medium">Application received.</h3>
        <p className="mx-auto mt-3 max-w-md text-muted-foreground">
          Thanks for applying{jobTitle ? ` for ${jobTitle}` : ""}. We&apos;ve
          sent a confirmation to your email. We read every application and will
          let you know either way.
        </p>
        <div className="mt-6 flex justify-center">
          <Button variant="outline" onClick={() => setSubmitted(false)}>
            Submit another application
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form
      // Bind at event time, not render time: onSubmit reads the file input ref.
      onSubmit={(event) => void handleSubmit(onSubmit)(event)}
      onChange={markStarted}
      className="space-y-5"
      noValidate
    >
      {/* Honeypot — hidden from people, tempting to bots. */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="botField">Leave this field empty</label>
        <input id="botField" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <input type="hidden" {...register("jobSlug")} />
      <input type="hidden" {...register("jobTitle")} />

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label="Full name"
          htmlFor="fullName"
          required
          error={errors.fullName?.message}
        >
          <Input id="fullName" autoComplete="name" {...register("fullName")} />
        </Field>
        <Field label="Email" htmlFor="email" required error={errors.email?.message}>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            {...register("email")}
          />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Phone" htmlFor="phone" required error={errors.phone?.message}>
          <Input id="phone" type="tel" autoComplete="tel" {...register("phone")} />
        </Field>
        <Field
          label="Where you're based"
          htmlFor="location"
          error={errors.location?.message}
          hint="City or province"
        >
          <Input id="location" autoComplete="address-level2" {...register("location")} />
        </Field>
      </div>

      <Field
        label="Portfolio or LinkedIn"
        htmlFor="portfolioUrl"
        error={errors.portfolioUrl?.message}
        hint="Optional, but it helps"
      >
        <Input
          id="portfolioUrl"
          type="url"
          placeholder="https://"
          {...register("portfolioUrl")}
        />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Controller
          name="yearsExperience"
          control={control}
          render={({ field }) => (
            <Field
              label="Years of relevant experience"
              required
              error={errors.yearsExperience?.message}
            >
              <Select value={field.value ?? ""} onValueChange={field.onChange}>
                <SelectTrigger aria-label="Years of relevant experience">
                  <SelectValue placeholder="Select experience" />
                </SelectTrigger>
                <SelectContent>
                  {experienceOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
          )}
        />
        <Controller
          name="availability"
          control={control}
          render={({ field }) => (
            <Field label="When could you start?" error={errors.availability?.message}>
              <Select value={field.value ?? ""} onValueChange={field.onChange}>
                <SelectTrigger aria-label="When could you start?">
                  <SelectValue placeholder="Select availability" />
                </SelectTrigger>
                <SelectContent>
                  {availabilityOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
          )}
        />
      </div>

      <Controller
        name="engagementInterest"
        control={control}
        render={({ field }) => (
          <Field
            label="What are you looking for?"
            error={errors.engagementInterest?.message}
          >
            <Select value={field.value ?? ""} onValueChange={field.onChange}>
              <SelectTrigger aria-label="What are you looking for?">
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
              <SelectContent>
                {engagementInterestOptions.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
        )}
      />

      <Field
        label="Tools you know well"
        htmlFor="tools"
        error={errors.tools?.message}
        hint="e.g. GoHighLevel, Google Workspace, Canva"
      >
        <Input id="tools" {...register("tools")} />
      </Field>

      {/* Résumé upload */}
      <Field
        label="Résumé"
        htmlFor="resume"
        required
        error={resumeError ?? undefined}
        hint={`PDF or Word document, up to ${MAX_MB}MB`}
      >
        <div className="flex flex-wrap items-center gap-3">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => fileRef.current?.click()}
          >
            <Paperclip className="size-4" />
            Choose file
          </Button>
          <span
            className={cn(
              "text-sm",
              resumeName ? "text-foreground" : "text-muted-foreground",
            )}
          >
            {resumeName || "No file chosen"}
          </span>
        </div>
        <input
          ref={fileRef}
          id="resume"
          name="resume"
          type="file"
          accept={ACCEPT}
          onChange={onFileChange}
          className="sr-only"
          aria-describedby="resume-hint"
        />
      </Field>

      <Field
        label="Why this role?"
        htmlFor="coverNote"
        error={errors.coverNote?.message}
        hint="A short note is plenty. A few sentences is fine."
      >
        <Textarea id="coverNote" rows={5} {...register("coverNote")} />
      </Field>

      {turnstileEnabled && (
        <Turnstile onVerify={setTurnstileToken} />
      )}

      <Controller
        name="consent"
        control={control}
        render={({ field }) => (
          <div className="flex flex-col gap-1.5">
            <div className="flex items-start gap-3">
              <Checkbox
                id="consent"
                checked={field.value}
                onCheckedChange={(checked) => field.onChange(checked === true)}
              />
              <Label htmlFor="consent" className="text-sm font-normal leading-relaxed">
                I agree that {site.name} may store my application and résumé to
                consider me for this and future roles, as described in the{" "}
                <a
                  href={`${site.url}/privacy-policy`}
                  className="font-medium text-accent-strong hover:text-accent"
                >
                  privacy policy
                </a>
                .
              </Label>
            </div>
            {errors.consent && (
              <p className="flex items-center gap-1 text-xs text-destructive" role="alert">
                <AlertCircle className="size-3.5" />
                {errors.consent.message}
              </p>
            )}
          </div>
        )}
      />

      {serverError && (
        <p
          className="flex items-start gap-2 rounded-xl border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive"
          role="alert"
        >
          <AlertCircle className="mt-0.5 size-4 shrink-0" />
          {serverError}
        </p>
      )}

      <Button type="submit" size="lg" disabled={isSubmitting} className="w-full sm:w-auto">
        {isSubmitting && <Loader2 className="size-4 animate-spin" />}
        {isSubmitting ? "Sending…" : "Submit application"}
      </Button>

      <p className="text-xs text-muted-foreground">
        There is never a fee to apply or to be placed. We are paid by the client
        business, never by you.
      </p>
    </form>
  );
}
