-- =========================================================================
-- Outsource VA Philippines — contact_submissions
-- Run this in the Supabase SQL editor (or via the Supabase CLI).
-- =========================================================================

-- Status values for the sales pipeline.
do $$
begin
  if not exists (select 1 from pg_type where typname = 'contact_status') then
    create type contact_status as enum (
      'new',
      'contacted',
      'consultation_booked',
      'qualified',
      'not_qualified',
      'closed'
    );
  end if;
end$$;

create table if not exists public.contact_submissions (
  id                uuid primary key default gen_random_uuid(),
  first_name        text not null,
  last_name         text not null,
  email             text not null,
  phone             text,
  company_name      text,
  company_website   text,
  team_size         text,
  service_needed    text not null,
  support_level     text,
  desired_start_date text,
  budget_range      text,
  timezone          text,
  referral_source   text,
  message           text,
  selected_talent   text,
  source_page       text,
  utm_source        text,
  utm_medium        text,
  utm_campaign      text,
  utm_content       text,
  utm_term          text,
  consent_given     boolean not null default false,
  status            contact_status not null default 'new',
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);

-- Indexes for common lookups.
create index if not exists contact_submissions_email_idx
  on public.contact_submissions (email);
create index if not exists contact_submissions_status_idx
  on public.contact_submissions (status);
create index if not exists contact_submissions_created_at_idx
  on public.contact_submissions (created_at desc);

-- Keep updated_at current on every update.
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_contact_submissions_updated_at
  on public.contact_submissions;
create trigger set_contact_submissions_updated_at
  before update on public.contact_submissions
  for each row execute function public.set_updated_at();

-- =========================================================================
-- Row Level Security
-- -------------------------------------------------------------------------
-- RLS is ENABLED with NO permissive policies for anon/authenticated roles.
-- That means the public anon key can neither read, insert, update, nor delete.
-- The server inserts using the SERVICE ROLE key, which bypasses RLS entirely.
-- This keeps every submission private and prevents public data harvesting.
-- =========================================================================
alter table public.contact_submissions enable row level security;
alter table public.contact_submissions force row level security;

-- (Intentionally no CREATE POLICY statements: default-deny for all roles
--  except the service role used server-side.)

-- Optional: revoke any table grants from anon/authenticated for defense in depth.
revoke all on public.contact_submissions from anon, authenticated;

-- Grant table privileges to the server-side service role. The service role has
-- BYPASSRLS, so with these grants it can insert/read while anon/authenticated
-- remain fully locked out. (Without this, inserts fail with "permission denied".)
grant all on public.contact_submissions to service_role;
