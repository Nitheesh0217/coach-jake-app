"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { CheckCircle2, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { supabaseBrowser } from "@/lib/supabaseClient";
import { getCurrentUserProfile } from "@/app/(app)/finish-profile/actions";
import { isProfileComplete } from "@/lib/profileUtils";
import GradientText from "@/components/ui/GradientText";

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
          "Please confirm your email from your inbox, then log in again.",
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
    <div className="min-h-screen bg-[#050816] text-zinc-50 flex items-center justify-center px-4 relative overflow-hidden">
      {/* Ambient Glow Background */}
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-0">
        <div className="w-[800px] h-[800px] rounded-full bg-emerald-500/12 blur-[150px] animate-ambient-pulse" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl">
        {msg === "confirm-email" && (
          <div className="mb-8 rounded-2xl border border-blue-500/30 bg-blue-500/10 px-5 py-4 text-sm text-blue-200 backdrop-blur-sm">
            <p className="font-medium">Email confirmation required</p>
            <p className="mt-1">
              Check your email inbox and click the confirmation link before
              logging in.
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          {/* Left Column - Hidden on mobile */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="hidden md:flex flex-col space-y-8"
          >
            <div className="space-y-4">
              <h2 className="text-7xl font-black text-zinc-50 leading-tight">
                Welcome back.
              </h2>
              <p className="text-zinc-400 text-lg leading-relaxed">
                Your squad is training right now. Let's get to work.
              </p>
            </div>

            <div className="space-y-5">
              {[
                "Track every session",
                "Stay on the leaderboard",
                "Never miss a workout",
              ].map((bullet, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 + idx * 0.1 }}
                  className="flex gap-4 items-start"
                >
                  <CheckCircle2 className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-1" />
                  <span className="text-zinc-300 text-base font-medium">
                    {bullet}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Column */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-full"
          >
            <div className="glass-card border-emerald-500/20 shadow-emerald-glow-md p-8 md:p-10">
              {/* Card header */}
              <div className="mb-8">
                <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/40 mb-5">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-sm font-bold text-emerald-300 tracking-wide">
                    Coach Jake
                  </span>
                </div>
                <h2 className="text-3xl font-black text-zinc-50 mb-2">
                  Sign in to your account
                </h2>
                <p className="text-zinc-500 text-sm">
                  Access your personalized coaching program
                </p>
              </div>

              {/* Form */}
              <form onSubmit={onSubmit} className="space-y-6">
                {/* Email field */}
                <div className="space-y-2.5">
                  <label
                    htmlFor="email"
                    className="text-xs uppercase text-zinc-400 tracking-widest font-bold block"
                  >
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full bg-zinc-800/60 border border-zinc-700 rounded-xl px-4 py-3.5 text-zinc-50 placeholder-zinc-600 text-sm focus:border-emerald-500 focus:outline-none focus:ring-[3px] focus:ring-emerald-500/25 focus:shadow-emerald-glow-sm transition-all duration-300"
                  />
                </div>

                {/* Password field */}
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="text-xs uppercase text-zinc-400 tracking-widest font-bold block"
                    >
                      Password
                    </label>
                    <a
                      href="#"
                      className="text-xs text-emerald-400 hover:text-emerald-300 transition-colors"
                    >
                      Forgot?
                    </a>
                  </div>
                  <input
                    id="password"
                    type="password"
                    autoComplete="current-password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full bg-zinc-800/60 border border-zinc-700 rounded-xl px-4 py-3.5 text-zinc-50 placeholder-zinc-600 text-sm focus:border-emerald-500 focus:outline-none focus:ring-[3px] focus:ring-emerald-500/25 focus:shadow-emerald-glow-sm transition-all duration-300"
                  />
                </div>

                {/* Error message */}
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-xl bg-red-500/15 border border-red-500/40 px-4 py-3.5 text-sm text-red-300"
                  >
                    {error}
                  </motion.div>
                )}

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full mt-6 py-3.5 font-bold uppercase tracking-wide text-sm disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2.5 transition-all duration-300 hover:shadow-emerald-glow-md"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Signing in...</span>
                    </>
                  ) : (
                    <>
                      <span>Sign in</span>
                      <span className="text-base">→</span>
                    </>
                  )}
                </button>
              </form>

              {/* Divider */}
              <div className="mt-8 flex items-center gap-3">
                <div className="flex-1 h-px bg-gradient-to-r from-zinc-700 to-transparent" />
                <span className="text-xs text-zinc-600 uppercase tracking-wide font-semibold px-2">
                  or
                </span>
                <div className="flex-1 h-px bg-gradient-to-l from-zinc-700 to-transparent" />
              </div>

              {/* Signup link */}
              <p className="text-center text-zinc-400 text-sm mt-8">
                Don't have an account?{" "}
                <Link
                  href="/signup"
                  className="font-bold text-emerald-400 hover:text-emerald-300 transition-colors"
                >
                  Create one →
                </Link>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
