import { createBrowserClient, createServerClient } from "@supabase/ssr";
import type { CookieOptions } from "@supabase/ssr";
import type { NextRequest, NextResponse } from "next/server";
import { type SupabaseClient } from "@supabase/supabase-js";

/**
 * Creates a recursive proxy representing a dummy Supabase client
 * to prevent the app from hard-crashing when credentials are missing.
 */
function createDummyClient(): SupabaseClient {
  const dummy: any = new Proxy(
    function () {},
    {
      get(target, prop) {
        if (prop === "then") {
          return (resolve: any) => resolve({ data: null, error: null });
        }
        if (prop === "auth") {
          return {
            getUser: async () => ({ data: { user: null }, error: null }),
            signInWithPassword: async () => ({ data: null, error: new Error("Supabase is not configured.") }),
            signUp: async () => ({ data: null, error: new Error("Supabase is not configured.") }),
            signOut: async () => ({ error: null }),
            onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
          };
        }
        return createDummyClient();
      },
      apply(target, thisArg, argumentsList) {
        return createDummyClient();
      }
    }
  );
  return dummy as SupabaseClient;
}

/**
 * Client-side Supabase (use in Client Components).
 */
export function supabaseBrowser() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) {
    if (typeof window !== "undefined") {
      console.warn("Supabase credentials missing. Returning dummy client to prevent crash.");
    }
    return createDummyClient();
  }
  return createBrowserClient(url, key);
}

/**
 * Server-side Supabase (use in Server Components / Route Handlers).
 * Pass a cookie adapter so auth session persists.
 */
export function supabaseServer(cookies: {
  get: (name: string) => { value: string } | undefined;
  set: (name: string, value: string, options: CookieOptions) => void;
  remove: (name: string, options: CookieOptions) => void;
}) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) {
    return createDummyClient();
  }
  return createServerClient(
    url,
    key,
    {
      cookies: {
        get: (name: string) => cookies.get(name)?.value,
        set: (name: string, value: string, options: CookieOptions) =>
          cookies.set(name, value, options),
        remove: (name: string, options: CookieOptions) =>
          cookies.remove(name, options),
      },
    }
  );
}

/**
 * Middleware Supabase helper (Edge runtime)
 */
export function supabaseMiddleware(req: NextRequest, res: NextResponse) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) {
    return createDummyClient();
  }
  return createServerClient(
    url,
    key,
    {
      cookies: {
        get(name: string) {
          return req.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          res.cookies.set({ name, value, ...options });
        },
        remove(name: string, options: CookieOptions) {
          res.cookies.set({ name, value: "", ...options, maxAge: 0 });
        },
      },
    }
  );
}
