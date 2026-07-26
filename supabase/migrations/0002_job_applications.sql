-- =========================================================================
-- Outsource VA Philippines — job_applications (careers subdomain)
-- Run this in the Supabase SQL editor (or via the Supabase CLI).
--
-- Follows the same security posture as 0001_contact_submissions.sql:
-- RLS on, no policies for anon/authenticated, service role only.
-- =========================================================================

-- Status values for the recruiting pipeline.
do $$
begin
  if not exists (select 1 from pg_type where typname = 'application_status') then
    create type application_status as enum (
      'new',
      'screening',
      'assessment',
      'verification',
      'client_interview',
      'placed',
      'not_progressing'
    );
  end if;
end$$;

create table if not exists public.job_applications (
  id                  uuid primary key default gen_random_uuid(),
  full_name           text not null,
  email               text not null,
  phone               text not null,
  location            text,
  portfolio_url       text,
  years_experience    text not null,
  engagement_interest text,
  availability        text,
  tools               text,
  cover_note          text,
  -- Slug/title of the role applied for. Null means a general application.
  job_slug            text,
  job_title           text,
  -- Object path inside the private `applications` storage bucket.
  resume_path         text not null,
  resume_filename     text not null,
  resume_size_bytes   integer,
  source_page         text,
  consent_given       boolean not null default false,
  status              application_status not null default 'new',
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now()
);

create index if not exists job_applications_email_idx
  on public.job_applications (email);
create index if not exists job_applications_job_slug_idx
  on public.job_applications (job_slug);
create index if not exists job_applications_status_idx
  on public.job_applications (status);
create index if not exists job_applications_created_at_idx
  on public.job_applications (created_at desc);

-- Reuses public.set_updated_at() created in 0001.
drop trigger if exists set_job_applications_updated_at
  on public.job_applications;
create trigger set_job_applications_updated_at
  before update on public.job_applications
  for each row execute function public.set_updated_at();

-- =========================================================================
-- Row Level Security — default deny, service role only.
-- =========================================================================
alter table public.job_applications enable row level security;
alter table public.job_applications force row level security;

revoke all on public.job_applications from anon, authenticated;
grant all on public.job_applications to service_role;

-- =========================================================================
-- Résumé storage
-- -------------------------------------------------------------------------
-- PRIVATE bucket. Résumés are personal data and must never be publicly
-- readable — the server issues short-lived signed URLs instead.
-- =========================================================================
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'applications',
  'applications',
  false,
  5242880, -- 5MB, matches RESUME_RULES.maxBytes
  array[
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ]
)
on conflict (id) do update
  set public             = excluded.public,
      file_size_limit    = excluded.file_size_limit,
      allowed_mime_types = excluded.allowed_mime_types;

-- No storage policies are created for anon/authenticated, so only the service
-- role (which bypasses RLS) can read or write objects in this bucket.
