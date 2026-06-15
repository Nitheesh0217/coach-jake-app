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
      {/* Ambient Glow */}
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-0">
        <div className="w-[600px] h-[600px] rounded-full bg-emerald-500/8 blur-[120px] animate-ambient-pulse" />
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left Column - Hidden on mobile */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="hidden md:flex flex-col space-y-8"
          >
            <div className="space-y-2">
              <h2 className="text-6xl font-black text-zinc-50">
                Welcome back.
              </h2>
              <p className="text-zinc-400 text-lg">
                Your squad is training right now.
              </p>
            </div>

            <div className="space-y-4">
              {[
                "Track every session",
                "Stay on the leaderboard",
                "Never miss a workout",
              ].map((bullet, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.15 + idx * 0.08 }}
                  className="flex gap-3 items-start"
                >
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span className="text-zinc-300 text-sm">{bullet}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Column */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 backdrop-blur-xl p-8 shadow-2xl shadow-black/60">
              {/* Card header */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span className="text-sm font-semibold text-emerald-400">
                    Coach Jake
                  </span>
                </div>
                <h2 className="text-zinc-50 font-semibold text-2xl">
                  Sign in to your account
                </h2>
              </div>

              {/* Form */}
              <form onSubmit={onSubmit} className="space-y-5">
                {/* Email field */}
                <div>
                  <label
                    htmlFor="email"
                    className="text-xs uppercase text-zinc-400 tracking-wide font-semibold block mb-1.5"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full bg-zinc-800/60 border border-zinc-700 rounded-xl px-4 py-3 text-zinc-50 placeholder-zinc-500 text-sm focus:border-emerald-500 focus:outline-none focus:ring-[3px] focus:ring-emerald-500/20 transition-all duration-200"
                  />
                </div>

                {/* Password field */}
                <div>
                  <label
                    htmlFor="password"
                    className="text-xs uppercase text-zinc-400 tracking-wide font-semibold block mb-1.5"
                  >
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
                    className="w-full bg-zinc-800/60 border border-zinc-700 rounded-xl px-4 py-3 text-zinc-50 placeholder-zinc-500 text-sm focus:border-emerald-500 focus:outline-none focus:ring-[3px] focus:ring-emerald-500/20 transition-all duration-200"
                  />
                  <a
                    href="#"
                    className="text-right text-xs text-emerald-400 hover:text-emerald-300 mt-1 inline-block"
                  >
                    Forgot password?
                  </a>
                </div>

                {/* Error message */}
                {error && (
                  <div className="rounded-xl bg-red-500/10 border border-red-500/30 px-4 py-3 text-sm text-red-300">
                    {error}
                  </div>
                )}

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full mt-4 disabled:opacity-60"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    "Sign in"
                  )}
                </button>
              </form>

              {/* Divider */}
              <div className="mt-6 flex items-center gap-3">
                <hr className="flex-1 border-zinc-800" />
                <span className="text-xs text-zinc-500">or</span>
                <hr className="flex-1 border-zinc-800" />
              </div>

              {/* Signup link */}
              <p className="text-center text-zinc-400 text-sm mt-4">
                Don't have an account?{" "}
                <Link
                  href="/signup"
                  className="text-emerald-400 hover:text-emerald-300"
                >
                  Sign up →
                </Link>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
