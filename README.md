# Outsource VA Philippines — Website

A premium marketing website for **Outsource VA Philippines**, a virtual assistant
outsourcing agency connecting international businesses with experienced Filipino
virtual professionals.

Built with **Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 ·
Radix UI · React Hook Form · Zod · Supabase · Resend · Cloudflare Turnstile**.

---

## Quick start

```bash
npm install
cp .env.example .env.local   # fill in values (all optional for local dev)
npm run dev                  # http://localhost:3000
```

The site **runs without any environment variables** — the contact form validates
and returns success, but submissions won't be stored or emailed until Supabase
and Resend are configured (see below).

### Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the dev server |
| `npm run build` | Production build |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint |
| `npx tsc --noEmit` | Type-check |

---

## Project structure

```
src/
├─ app/                     # Routes (App Router)
│  ├─ page.tsx              # Home
│  ├─ services/  about/  how-it-works/
│  ├─ our-talent/  our-talent/[slug]/   # directory + profiles
│  ├─ contact/  book/       # conversion pages
│  ├─ privacy-policy/  terms/
│  ├─ api/contact/route.ts  # server-side form endpoint
│  ├─ sitemap.ts  robots.ts  opengraph-image.tsx  not-found.tsx
│  └─ layout.tsx            # fonts, metadata, header/footer, schema, analytics
├─ components/
│  ├─ ui/                   # design-system primitives (button, card, select…)
│  ├─ layout/               # Header, Footer, AnnouncementBar, PageHeader
│  ├─ sections/             # homepage + reusable page sections
│  ├─ cards/  talent/  forms/  services/  legal/  seo/  analytics/  brand/
│  ├─ ConsultationButton.tsx  CalendlyEmbed.tsx
├─ content/                 # ← ALL editable copy/data (see "Editing content")
├─ lib/                     # schema, supabase, email, seo, analytics, utils…
├─ emails/                  # HTML + text email templates
supabase/migrations/        # SQL migration for contact_submissions
public/team/                # (temporary) profile images — see that README
```

---

## Environment variables

Copy `.env.example` → `.env.local`. **Never commit `.env.local`.** Variables
prefixed `NEXT_PUBLIC_` are exposed to the browser — keep secrets out of them.

| Variable | Required for | Notes |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | SEO / canonical / sitemap | Production URL, no trailing slash |
| `NEXT_PUBLIC_CALENDLY_URL` | Booking | Defaults to the configured Calendly link |
| `NEXT_PUBLIC_SUPABASE_URL` | Storing inquiries | From Supabase project settings |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | (reserved) | Public anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | Storing inquiries | **Server only — secret** |
| `RESEND_API_KEY` | Emails | **Server only — secret** |
| `CONTACT_NOTIFICATION_EMAIL` | Emails | Where agency notifications go |
| `CONTACT_FROM_EMAIL` | Emails | Verified Resend sender |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Spam protection | Cloudflare Turnstile |
| `TURNSTILE_SECRET_KEY` | Spam protection | **Server only — secret** |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Analytics | Optional |
| `NEXT_PUBLIC_GTM_ID` | Analytics | Optional |
| `NEXT_PUBLIC_META_PIXEL_ID` | Analytics | Optional |
| `NEXT_PUBLIC_LINKEDIN_PARTNER_ID` | Analytics | Optional |

Features degrade gracefully: if Supabase/Resend/Turnstile aren't configured,
the form still works (validation runs, verification is skipped, and the friendly
success screen appears) — it just won't persist or email until keys are added.

---

## Supabase setup

1. Create a project at [supabase.com](https://supabase.com).
2. Open **SQL Editor** and run `supabase/migrations/0001_contact_submissions.sql`.
   This creates the `contact_submissions` table, indexes, the `updated_at`
   trigger, and enables **Row Level Security with default-deny** (the public
   anon key can neither read nor write — only the server-side service role can).
3. From **Project Settings → API**, copy:
   - Project URL → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon` public key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` secret key → `SUPABASE_SERVICE_ROLE_KEY` (keep secret!)
4. View submissions in **Table Editor → contact_submissions**.

> Security: submissions are inserted server-side with the service-role key,
> which bypasses RLS. Because RLS is enabled with no permissive policies, the
> table is not readable by anonymous visitors.

---

## Resend (email) setup

1. Create an account at [resend.com](https://resend.com) and **verify your
   sending domain** (Domains → Add Domain, then add the DNS records).
2. Create an API key → `RESEND_API_KEY`.
3. Set:
   - `CONTACT_FROM_EMAIL` — a sender on your verified domain, e.g.
     `Outsource VA Philippines <no-reply@your-domain.com>`
   - `CONTACT_NOTIFICATION_EMAIL` — the inbox that should receive inquiries.
4. On submit, two emails send: an **agency notification** (reply-to the visitor)
   and a **visitor confirmation**. Email is best-effort — a delivery failure is
   logged and never discards the stored inquiry.

---

## Cloudflare Turnstile (spam protection) setup

1. In the Cloudflare dashboard → **Turnstile**, create a widget for your domain.
2. Set `NEXT_PUBLIC_TURNSTILE_SITE_KEY` and `TURNSTILE_SECRET_KEY`.
3. The widget appears on the contact form automatically, and the server verifies
   the token. If unset, verification is skipped (dev-friendly).

Additional protections already active: a hidden honeypot field and best-effort
in-memory rate limiting (5 requests/min/IP).

---

## Editing content (no code required)

All copy and data live in `src/content/` as plain TypeScript files:

| File | Controls |
|---|---|
| `site.ts` | Brand name, tagline, **legal placeholders**, Calendly URL, SEO defaults, social links |
| `navigation.ts` | Header/footer nav, announcement bar |
| `services.ts` | Service cards + full service page content |
| `team.ts` | The 5 professionals (bios, skills, tools, image flags) |
| `home.ts` | Trust strip, problem section, comparison, hero labels |
| `about.ts` | Story, mission, vision, values, commitments |
| `process.ts` `industries.ts` `engagement.ts` `faqs.ts` | Homepage/section data |
| `contact.ts` | Form dropdown options + **budget ranges (placeholder)** |
| `testimonials.ts` | Testimonials (empty by design — add real ones here) |
| `legal.ts` | Privacy Policy & Terms sections |

### Replacing team photos
See `public/team/README.md`. In short: add `*-profile.webp` files, then set
`imageIsPlaceholder: false` in `team.ts`. Until then, tasteful initials avatars
render automatically.

### Changing the brand look
All colors are CSS variables in `src/app/globals.css` (`:root`). Change them
there to rebrand the entire site. Fonts (Playfair Display + DM Sans) are set in
`src/app/layout.tsx`.

---

## Placeholders to finalize before launch

- Legal company name, registered address, business email, phone, governing law
  (in `content/site.ts`) — currently shown as bracketed placeholders.
- `NEXT_PUBLIC_SITE_URL` production domain.
- Budget ranges in `content/contact.ts` (approve real figures).
- Real, client-approved testimonials (`content/testimonials.ts`).
- Real team photos (`public/team/`).
- Legal review of the Privacy Policy and Terms.
- (Optional) a designed favicon and `/public/og-image.png`.

---

## Deployment (Vercel recommended)

1. Push the repo to GitHub.
2. Import it into [Vercel](https://vercel.com/new).
3. Add all environment variables from `.env.example` in **Project Settings →
   Environment Variables** (production values).
4. Deploy. Set your custom domain and update `NEXT_PUBLIC_SITE_URL` to match.

The app also runs anywhere Node 18+ is available: `npm run build && npm start`.

---

## Accessibility & performance

- Semantic HTML, keyboard-accessible nav/menu/accordions/dialogs, visible focus
  states, labelled form fields with accessible error messages, skip-to-content
  link, `prefers-reduced-motion` respected.
- `next/font` self-hosted fonts, `next/image` optimization, lazy-loaded Calendly
  embed, minimal client JS, no heavy animation libraries.
