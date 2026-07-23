import "server-only";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Server-only Supabase client using the SERVICE ROLE key. This bypasses RLS
 * and must NEVER be imported into client components. The `server-only` import
 * above turns any accidental client import into a build error.
 *
 * Returns null when Supabase env vars are not configured, so the contact route
 * can degrade gracefully instead of crashing.
 */
export function getSupabaseAdmin(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) return null;

  return createClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export const CONTACT_TABLE = "contact_submissions";
