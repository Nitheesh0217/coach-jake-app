"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { supabaseBrowser } from "@/lib/supabaseClient";
import { getCurrentUserProfile } from "@/app/(app)/finish-profile/actions";
import { isProfileComplete } from "@/lib/profileUtils";

export default function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const supabase = supabaseBrowser();

  const next = params.get("next") ?? "/dashboard";
  const msg = params.get("msg");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setLoading(false);

      if (error.message.toLowerCase().includes("email not confirmed")) {
        setError(
          "Please confirm your email from your inbox, then log in again."
        );
      } else {
        setError(error.message);
      }

      return;
    }

    const user = data.user;
    if (user) {
      // Check if user's profile is complete
      try {
        const { profile } = await getCurrentUserProfile();
        
        // If profile is incomplete, redirect to finish-profile
        if (!isProfileComplete(profile)) {
          setLoading(false);
          router.push("/finish-profile");
          return;
        }
      } catch (err) {
        // If there's an error checking profile, still redirect to finish-profile to be safe
        setLoading(false);
        router.push("/finish-profile");
        return;
      }
    }

    setLoading(false);
    router.push(next);
  }

  return (
    <section className="min-h-screen py-16 sm:py-20 lg:py-24">
      <div className="max-w-5xl mx-auto px-4">
        {/* Confirm email banner */}
        {msg === "confirm-email" && (
          <div className="mb-8 rounded-2xl border border-blue-500/30 bg-blue-500/10 px-5 py-4 text-sm text-blue-200 backdrop-blur-sm">
            <p className="font-medium">Email confirmation required</p>
            <p className="mt-1">Check your email inbox and click the confirmation link before logging in.</p>
          </div>
        )}

        {/* Already registered banner */}
        {msg === "already-registered" && (
          <div className="mb-8 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-5 py-4 text-sm text-emerald-200 backdrop-blur-sm">
            <p className="font-medium">Welcome back! ✨</p>
            <p className="mt-1">It looks like you already have an account. Log in to complete your profile and get started.</p>
          </div>
        )}

        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left side: Brand context */}
          <div className="space-y-6 lg:pr-4">
            <div className="inline-flex items-center rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-300">
              Basketball performance coaching
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-semibold text-zinc-50 tracking-tight">
                Train like a serious hooper.
              </h2>
              <p className="text-sm sm:text-base text-zinc-300 max-w-md">
                Log in to your athlete dashboard to see your workouts, track progress, and stay accountable with Coach Jake.
              </p>
            </div>

            {/* Micro stats */}
            <div className="space-y-4 pt-4">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl sm:text-3xl font-semibold text-emerald-400">120+</span>
                <span className="text-sm text-zinc-400">athletes coached</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl sm:text-3xl font-semibold text-emerald-400">+3"</span>
                <span className="text-sm text-zinc-400">average vertical in 12 weeks</span>
              </div>
            </div>

            {/* Trust indicator */}
            <div className="pt-4 border-t border-zinc-800">
              <p className="text-xs text-zinc-400 uppercase tracking-wide font-semibold mb-3">Trusted by</p>
              <div className="flex flex-wrap gap-3">
                <div className="text-xs text-zinc-500 bg-zinc-900/40 border border-zinc-800 rounded-full px-3 py-1.5">
                  HS athletes
                </div>
                <div className="text-xs text-zinc-500 bg-zinc-900/40 border border-zinc-800 rounded-full px-3 py-1.5">
                  College players
                </div>
                <div className="text-xs text-zinc-500 bg-zinc-900/40 border border-zinc-800 rounded-full px-3 py-1.5">
                  Serious hoopers
                </div>
              </div>
            </div>
          </div>

          {/* Right side: Login card */}
          <div className="w-full">
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-6 sm:p-8 shadow-2xl shadow-black/40 backdrop-blur-sm">
              {/* Card header */}
              <div className="space-y-2 mb-8">
                <h1 className="text-xl sm:text-2xl font-semibold text-zinc-50 tracking-tight">
                  Log in to your account
                </h1>
                <p className="text-sm text-zinc-400">
                  Access your workouts, track progress, and stay accountable.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={onSubmit} className="space-y-5">
                {/* Email field */}
                <div className="space-y-2.5">
                  <label htmlFor="email" className="text-sm font-medium text-zinc-200">
                    Email address
                  </label>
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full rounded-xl border border-zinc-700 bg-zinc-950/50 px-4 py-3 text-sm text-zinc-50 placeholder:text-zinc-500 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
                  />
                </div>

                {/* Password field */}
                <div className="space-y-2.5">
                  <label htmlFor="password" className="text-sm font-medium text-zinc-200">
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    autoComplete="current-password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full rounded-xl border border-zinc-700 bg-zinc-950/50 px-4 py-3 text-sm text-zinc-50 placeholder:text-zinc-500 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
                  />
                </div>

                {/* Error message */}
                {error && (
                  <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200 backdrop-blur-sm">
                    <p className="font-medium">{error}</p>
                  </div>
                )}

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-black shadow-lg shadow-emerald-500/30 transition transform will-change-transform hover:bg-emerald-400 hover:-translate-y-0.5 hover:shadow-emerald-500/50 disabled:opacity-60 disabled:hover:bg-emerald-500 disabled:hover:-translate-y-0"
                >
                  {loading ? "Signing in..." : "Continue to dashboard"}
                </button>
              </form>

              {/* Divider */}
              <div className="my-6 flex items-center gap-3">
                <div className="flex-1 h-px bg-gradient-to-r from-zinc-800 to-transparent"></div>
                <span className="text-xs text-zinc-500 uppercase tracking-wide">New here?</span>
                <div className="flex-1 h-px bg-gradient-to-l from-zinc-800 to-transparent"></div>
              </div>

              {/* Signup link */}
              <p className="text-center text-sm text-zinc-300 mb-1">
                Create an athlete account to get started.
              </p>
              <Link
                href="/signup"
                className="block w-full rounded-full border border-emerald-500/40 bg-emerald-500/10 px-6 py-3 text-center text-sm font-medium text-emerald-300 transition hover:bg-emerald-500/20 hover:border-emerald-500/60 hover:text-emerald-200"
              >
                Sign up free
              </Link>

              {/* Help link */}
              <div className="mt-6 text-center">
                <a
                  href="mailto:support@coachjakedevelopment.com"
                  className="text-xs text-zinc-500 hover:text-zinc-300 transition"
                >
                  Having trouble logging in?
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
