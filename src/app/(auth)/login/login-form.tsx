"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { CheckCircle2, Eye, Loader2, Lock, Mail, Zap } from "lucide-react";
import { motion } from "framer-motion";
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
      } catch {
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
    <div className="min-h-screen text-zinc-50 flex items-center justify-center px-4 sm:px-6 lg:px-10 py-10 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_68%_45%,rgba(16,185,129,0.22),transparent_44%)]" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#030614]/80 via-[#040915]/45 to-[#030614]/75" />

      {/* Ambient Glow Background */}
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-0">
        <div className="w-[820px] h-[820px] rounded-full bg-emerald-500/15 blur-[150px] animate-ambient-pulse" />
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Hidden on mobile */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="hidden lg:flex flex-col space-y-8 lg:pr-10"
          >
            <div className="space-y-4">
              <h2 className="text-6xl xl:text-7xl font-black text-zinc-50 leading-[0.95]">
                Welcome back.
              </h2>
              <p className="text-zinc-300/90 text-2xl italic font-medium leading-relaxed">
                Your squad is training right now.
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
                  <span className="text-zinc-200/95 text-xl font-medium">
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
            transition={{ duration: 0.5, delay: 0 }}
            className="w-full"
          >
            <div className="glass-card border-zinc-300/30 shadow-[0_20px_60px_rgba(0,0,0,0.55),0_0_36px_rgba(16,185,129,0.12)] p-6 sm:p-8 md:p-10 relative rounded-[2rem] max-w-xl lg:ml-auto">

              {/* Card header */}
              <div className="mb-8 text-center space-y-3">
                <motion.h2
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.15 }}
                  className="inline-flex items-center justify-center w-12 h-12 mx-auto rounded-full bg-emerald-500/15 border border-emerald-400/45"
                >
                  <Zap className="w-6 h-6 text-emerald-300 fill-emerald-300" />
                </motion.h2>
                <motion.h3
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  className="text-5xl sm:text-6xl font-black bg-gradient-to-r from-emerald-300 to-cyan-300 bg-clip-text text-transparent"
                >
                  Coach Jake
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.25 }}
                  className="text-3xl font-bold text-zinc-50"
                >
                  Sign in to your account
                </motion.p>
              </div>

              {/* Form */}
              <motion.form
                onSubmit={onSubmit}
                initial="hidden"
                animate="show"
                variants={{
                  hidden: {},
                  show: { transition: { staggerChildren: 0.2 } },
                }}
                className="space-y-5"
              >
                {/* Email field */}
                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 12 },
                    show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
                  }}
                  className="space-y-2.5"
                >
                  <label
                    htmlFor="email"
                    className="text-xs uppercase text-zinc-400 tracking-widest font-bold block"
                  >
                    Email
                  </label>
                  <div className="group relative">
                    <div className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400">
                      <Mail className="h-5 w-5" />
                    </div>
                    <input
                      id="email"
                      type="email"
                      autoComplete="email"
                      placeholder="jake@hooplab.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full bg-zinc-900/65 border border-emerald-500/35 rounded-2xl pl-12 pr-4 py-3.5 text-zinc-50 placeholder-zinc-500 text-sm focus:border-emerald-300 focus:outline-none transition-all duration-300"
                    />
                    <span className="pointer-events-none absolute inset-0 rounded-2xl border border-emerald-300/0 shadow-[0_0_0_0_rgba(16,185,129,0)] transition-all duration-300 group-focus-within:border-emerald-300/70 group-focus-within:shadow-[0_0_0_4px_rgba(16,185,129,0.2),0_0_28px_rgba(16,185,129,0.3)] group-focus-within:scale-[1.01]" />
                  </div>
                </motion.div>

                {/* Password field */}
                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 12 },
                    show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
                  }}
                  className="space-y-2.5"
                >
                  <label
                    htmlFor="password"
                    className="text-xs uppercase text-zinc-400 tracking-widest font-bold block"
                  >
                    Password
                  </label>
                  <div className="group relative">
                    <div className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400">
                      <Lock className="h-5 w-5" />
                    </div>
                    <input
                      id="password"
                      type="password"
                      autoComplete="current-password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="w-full bg-zinc-900/65 border border-zinc-600/70 rounded-2xl pl-12 pr-11 py-3.5 text-zinc-50 placeholder-zinc-500 text-sm focus:border-emerald-300 focus:outline-none transition-all duration-300"
                    />
                    <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400">
                      <Eye className="h-5 w-5" />
                    </span>
                    <span className="pointer-events-none absolute inset-0 rounded-2xl border border-emerald-300/0 shadow-[0_0_0_0_rgba(16,185,129,0)] transition-all duration-300 group-focus-within:border-emerald-300/70 group-focus-within:shadow-[0_0_0_4px_rgba(16,185,129,0.2),0_0_24px_rgba(16,185,129,0.25)] group-focus-within:scale-[1.01]" />
                  </div>
                  <div className="text-right">
                    <a
                      href="#"
                      className="text-xs text-emerald-400 hover:text-emerald-300 transition-colors font-medium"
                    >
                      Forgot password?
                    </a>
                  </div>
                </motion.div>

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
                <motion.button
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
                  }}
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full mt-6 py-3.5 font-bold text-sm disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-all duration-300 hover:shadow-emerald-glow-md rounded-2xl"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Signing in...</span>
                    </>
                  ) : (
                    <span>Sign in</span>
                  )}
                </motion.button>
              </motion.form>

              {/* Divider */}
              <div className="mt-7 flex items-center gap-3">
                <div className="flex-1 h-px bg-gradient-to-r from-zinc-700 to-transparent" />
                <span className="text-xs text-zinc-600 uppercase tracking-wide font-semibold px-2">
                  or
                </span>
                <div className="flex-1 h-px bg-gradient-to-l from-zinc-700 to-transparent" />
              </div>

              {/* Signup link */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.4 }}
                className="text-center text-zinc-300 text-sm mt-7"
              >
                Don&apos;t have an account?{" "}
                <Link
                  href="/signup"
                  className="font-bold text-emerald-400 hover:text-emerald-300 transition-colors"
                >
                  Sign up →
                </Link>
              </motion.p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
