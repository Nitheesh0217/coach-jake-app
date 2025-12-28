"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabaseBrowser } from "@/lib/supabaseClient";
import type { Role } from "@/types";

export default function SignupPage() {
  const router = useRouter();
  const supabase = supabaseBrowser();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<Role>("athlete");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Step 1: Sign up with auth
    const { data, error: authError } = await supabase.auth.signUp({ email, password });
    if (authError) {
      setLoading(false);
      // Check if "user already registered" error
      if (authError.message.toLowerCase().includes("already registered")) {
        setError("This email is already registered. Please log in instead to complete your profile.");
      } else {
        setError(authError.message);
      }
      return;
    }

    // Check if email confirmation is required
    const requiresEmailConfirm = !data.session;
    const userId = data.user?.id;

    if (!userId) {
      setLoading(false);
      setError("Failed to create user account. Please try again.");
      return;
    }

    setLoading(false);

    if (requiresEmailConfirm) {
      // Ask them to confirm email first, on the login page
      router.push("/login?msg=confirm-email");
    } else {
      // Redirect to finish profile page to complete setup
      router.push("/finish-profile");
    }
  }

  return (
    <section className="min-h-screen py-16 sm:py-20 lg:py-24">
      <div className="max-w-5xl mx-auto px-4">
        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left side: Brand context */}
          <div className="space-y-6 lg:pr-4">
            <div className="inline-flex items-center rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-300">
              Basketball performance coaching
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-semibold text-zinc-50 tracking-tight">
                Start your path to explosive performance.
              </h2>
              <p className="text-sm sm:text-base text-zinc-300 max-w-md">
                Join hundreds of serious basketball athletes getting stronger, quicker, and game-ready with Coach Jake's science-backed programs.
              </p>
            </div>

            {/* Program highlights */}
            <div className="space-y-3 pt-4">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mt-0.5">
                  <svg className="w-3 h-3 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-zinc-200">Mobile-first training</p>
                  <p className="text-xs text-zinc-400">Train anywhere, anytime</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mt-0.5">
                  <svg className="w-3 h-3 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-zinc-200">Live progress tracking</p>
                  <p className="text-xs text-zinc-400">See real results week to week</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mt-0.5">
                  <svg className="w-3 h-3 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-zinc-200">Coach accountability</p>
                  <p className="text-xs text-zinc-400">Direct feedback from Coach Jake</p>
                </div>
              </div>
            </div>

            {/* Trust badge */}
            <div className="pt-4 border-t border-zinc-800">
              <p className="text-xs text-zinc-400 uppercase tracking-wide font-semibold mb-3">First month free</p>
              <p className="text-sm text-zinc-300">Try any program for free. Cancel anytime if it's not for you.</p>
            </div>
          </div>

          {/* Right side: Signup card */}
          <div className="w-full">
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-6 sm:p-8 shadow-2xl shadow-black/40 backdrop-blur-sm">
              {/* Card header */}
              <div className="space-y-2 mb-8">
                <h1 className="text-xl sm:text-2xl font-semibold text-zinc-50 tracking-tight">
                  Create your account
                </h1>
                <p className="text-sm text-zinc-400">
                  Get started in minutes. Choose your role and sign up with email and password.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={onSubmit} className="space-y-5">
                {/* Role selector - Who is this account for? */}
                <div className="space-y-3 pb-4 border-b border-zinc-800">
                  <label className="text-sm font-medium text-zinc-200">
                    Who is this account for?
                  </label>
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setRole("athlete")}
                      className={`flex-1 rounded-xl px-4 py-3 text-sm font-medium transition ${
                        role === "athlete"
                          ? "border border-emerald-500 bg-emerald-500/20 text-emerald-200 shadow-lg shadow-emerald-500/10"
                          : "border border-zinc-700 bg-zinc-950/50 text-zinc-300 hover:border-zinc-600 hover:bg-zinc-900"
                      }`}
                    >
                      Athlete
                    </button>
                    <button
                      type="button"
                      onClick={() => setRole("coach")}
                      className={`flex-1 rounded-xl px-4 py-3 text-sm font-medium transition ${
                        role === "coach"
                          ? "border border-emerald-500 bg-emerald-500/20 text-emerald-200 shadow-lg shadow-emerald-500/10"
                          : "border border-zinc-700 bg-zinc-950/50 text-zinc-300 hover:border-zinc-600 hover:bg-zinc-900"
                      }`}
                    >
                      Coach
                    </button>
                  </div>
                  <p className="text-xs text-zinc-500">
                    {role === "athlete"
                      ? "Training for yourself to improve your skills"
                      : "Managing athletes and building your roster"}
                  </p>
                </div>

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
                    autoComplete="new-password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                    className="w-full rounded-xl border border-zinc-700 bg-zinc-950/50 px-4 py-3 text-sm text-zinc-50 placeholder:text-zinc-500 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
                  />
                  <p className="text-xs text-zinc-400">Minimum 6 characters</p>
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
                  {loading ? "Creating account..." : "Create account"}
                </button>
              </form>

              {/* Divider */}
              <div className="my-6 flex items-center gap-3">
                <div className="flex-1 h-px bg-gradient-to-r from-zinc-800 to-transparent"></div>
                <span className="text-xs text-zinc-500 uppercase tracking-wide">Already here?</span>
                <div className="flex-1 h-px bg-gradient-to-l from-zinc-800 to-transparent"></div>
              </div>

              {/* Login link */}
              <p className="text-center text-sm text-zinc-300 mb-1">
                Already have an account?
              </p>
              <Link
                href="/login"
                className="block w-full rounded-full border border-zinc-700 bg-zinc-950/50 px-6 py-3 text-center text-sm font-medium text-zinc-200 transition hover:border-zinc-600 hover:bg-zinc-900 hover:text-zinc-50"
              >
                Log in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
