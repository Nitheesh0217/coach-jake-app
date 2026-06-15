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
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setLoading(false);

      if (error.message.toLowerCase().includes("email not confirmed")) {
        setError("Please confirm your email from your inbox, then log in again.");
      } else {
        setError(error.message);
      }

      return;
    }

    const user = data.user;
    if (user) {
      try {
        const { profile } = await getCurrentUserProfile();

        if (!isProfileComplete(profile)) {
          setLoading(false);
          router.push("/finish-profile");
          return;
        }
      } catch {
        setLoading(false);
        router.push("/finish-profile");
        return;
      }
    }

    setLoading(false);
    router.push(next);
  }

  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-8 md:py-12">
      <div className="w-full max-w-[1280px] grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-20 items-center">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="hidden lg:block"
        >
          <h1 className="text-[72px] leading-[0.95] font-black tracking-[-0.02em] text-white">
            Welcome back.
          </h1>
          <p className="mt-5 text-4xl italic text-zinc-300/85">Your squad is training right now.</p>

          <div className="mt-14 space-y-7">
            {["Track every session", "Stay on the leaderboard", "Never miss a workout"].map((item) => (
              <div key={item} className="flex items-center gap-4">
                <CheckCircle2 className="h-8 w-8 text-emerald-400" />
                <span className="text-4xl text-zinc-200/95">{item}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="w-full"
        >
          {msg === "confirm-email" && (
            <div className="mb-5 rounded-xl border border-cyan-500/40 bg-cyan-500/15 px-4 py-3 text-sm text-cyan-100">
              Confirm your email in your inbox, then sign in.
            </div>
          )}

          <div className="rounded-[30px] border border-zinc-600/70 bg-[#061023]/70 p-6 sm:p-8 md:p-10 backdrop-blur-md shadow-[0_24px_80px_rgba(0,0,0,0.6)]">
            <div className="flex flex-col items-center text-center">
              <Zap className="h-12 w-12 text-emerald-400 fill-emerald-400" />
              <h2 className="mt-4 text-5xl md:text-6xl font-black bg-gradient-to-r from-emerald-300 to-cyan-300 bg-clip-text text-transparent">
                Coach Jake
              </h2>
              <p className="mt-3 text-4xl md:text-[40px] leading-tight font-semibold text-zinc-100">Sign in to your account</p>
            </div>

            <form onSubmit={onSubmit} className="mt-9 space-y-7">
              <div>
                <label htmlFor="email" className="text-base font-semibold uppercase tracking-[0.2em] text-zinc-300">
                  Email
                </label>
                <div className="mt-3 flex items-center rounded-2xl border border-emerald-400/80 bg-[#031126] px-5 py-4 shadow-[0_0_0_0_rgba(16,185,129,0)] transition focus-within:border-emerald-300 focus-within:shadow-[0_0_0_4px_rgba(16,185,129,0.24),0_0_28px_rgba(16,185,129,0.3)]">
                  <Mail className="h-6 w-6 text-zinc-500" />
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    placeholder="jake@hooplab.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="ml-4 w-full bg-transparent text-[24px] text-zinc-100 placeholder:text-zinc-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="text-base font-semibold uppercase tracking-[0.2em] text-zinc-300">
                  Password
                </label>
                <div className="mt-3 flex items-center rounded-2xl border border-zinc-600/70 bg-[#031126] px-5 py-4">
                  <Lock className="h-6 w-6 text-zinc-500" />
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="ml-4 w-full bg-transparent text-[24px] text-zinc-100 placeholder:text-zinc-500 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="text-zinc-500 hover:text-zinc-300 transition"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    <Eye className="h-6 w-6" />
                  </button>
                </div>
                <div className="mt-3 text-right">
                  <a href="#" className="text-xl font-semibold text-emerald-400 hover:text-emerald-300">
                    Forgot password?
                  </a>
                </div>
              </div>

              {error && <div className="rounded-xl border border-red-500/45 bg-red-500/15 px-4 py-3 text-base text-red-200">{error}</div>}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-2xl bg-emerald-400 px-6 py-4 text-[40px] font-black text-black shadow-[0_0_24px_rgba(16,185,129,0.5)] transition hover:bg-emerald-300 disabled:opacity-70 disabled:hover:bg-emerald-400"
              >
                {loading ? (
                  <span className="inline-flex items-center gap-2">
                    <Loader2 className="h-6 w-6 animate-spin" />
                    Signing in...
                  </span>
                ) : (
                  "Sign in"
                )}
              </button>
            </form>

            <div className="mt-8 flex items-center gap-4 text-zinc-400">
              <div className="h-px flex-1 bg-zinc-700/70" />
              <span className="text-xl">or</span>
              <div className="h-px flex-1 bg-zinc-700/70" />
            </div>

            <p className="mt-7 text-center text-[28px] text-zinc-200">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="font-bold text-emerald-400 hover:text-emerald-300">
                Sign up →
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
