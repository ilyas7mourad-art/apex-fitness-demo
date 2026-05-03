import { createClient } from "@supabase/supabase-js";
import { createBrowserClient as ssrBrowserClient } from "@supabase/ssr";
import { createServerClient as ssrServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import type { Database } from "./types";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

/**
 * Browser (client-side) Supabase client.
 * Uses the anon key and is safe to call from Client Components.
 */
export function createBrowserClient() {
  return ssrBrowserClient<Database>(supabaseUrl, supabaseAnonKey);
}

/**
 * Server-side Supabase client.
 * Reads cookies from the incoming request for session management.
 * Must be called inside a Server Component, Route Handler, or Server Action.
 */
export async function createServerClient() {
  const cookieStore = await cookies();

  return ssrServerClient<Database>(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        } catch {
          // setAll is called in a Server Component where cookies are read-only.
          // This is safe to ignore — the middleware handles session refresh.
        }
      },
    },
  });
}

/**
 * Admin Supabase client using the service_role key.
 * Bypasses RLS. Never expose this client to the browser.
 * Throws if SUPABASE_SERVICE_ROLE_KEY is not set.
 */
export function createAdminClient() {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceRoleKey) {
    throw new Error(
      "SUPABASE_SERVICE_ROLE_KEY is not set. Admin client cannot be created.",
    );
  }

  return createClient<Database>(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
