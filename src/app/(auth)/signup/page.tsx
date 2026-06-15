"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CheckCircle2, Loader2, Lock, Mail, UserRound, Zap } from "lucide-react";
import { motion } from "framer-motion";
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

    const { data, error: authError } = await supabase.auth.signUp({ email, password });
    if (authError) {
      setLoading(false);
      if (authError.message.toLowerCase().includes("already registered")) {
        setError("This email is already registered. Please log in instead to complete your profile.");
      } else {
        setError(authError.message);
      }
      return;
    }

    const requiresEmailConfirm = !data.session;
    const userId = data.user?.id;

    if (!userId) {
      setLoading(false);
      setError("Failed to create user account. Please try again.");
      return;
    }

    setLoading(false);

    if (requiresEmailConfirm) {
      router.push("/login?msg=confirm-email");
    } else {
      router.push("/finish-profile");
    }
  }

  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-8 md:py-12">
      <div className="w-full max-w-[1280px] grid grid-cols-1 lg:grid-cols-[1.02fr_0.98fr] gap-10 lg:gap-20 items-center">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="hidden lg:block"
        >
          <h1 className="text-[64px] leading-[0.95] font-black tracking-[-0.02em] text-white">
            Build your account.
          </h1>
          <p className="mt-5 text-4xl italic text-zinc-300/85">Your next leap starts here.</p>

          <div className="mt-14 space-y-7">
            {["Join as athlete or coach", "Track progress every week", "Unlock your full profile"].map((item) => (
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
          <div className="rounded-[30px] border border-zinc-600/70 bg-[#061023]/70 p-6 sm:p-8 md:p-10 backdrop-blur-md shadow-[0_24px_80px_rgba(0,0,0,0.6)]">
            <div className="flex flex-col items-center text-center">
              <Zap className="h-11 w-11 text-emerald-400 fill-emerald-400" />
              <h1 className="mt-4 text-4xl md:text-5xl font-black bg-gradient-to-r from-emerald-300 to-cyan-300 bg-clip-text text-transparent">
                Coach Jake
              </h1>
              <p className="mt-3 text-3xl md:text-4xl font-semibold text-zinc-100">Create your account</p>
            </div>

            <form onSubmit={onSubmit} className="mt-8 space-y-6">
              <div>
                <label className="text-sm font-semibold uppercase tracking-[0.18em] text-zinc-300">Role</label>
                <div className="mt-3 grid grid-cols-2 gap-3">
                  {(["athlete", "coach"] as const).map((candidate) => (
                    <button
                      key={candidate}
                      type="button"
                      onClick={() => setRole(candidate)}
                      className={`flex items-center justify-center gap-2 rounded-xl border px-4 py-3 text-base font-semibold transition ${
                        role === candidate
                          ? "border-emerald-400 bg-emerald-500/15 text-emerald-200 shadow-[0_0_16px_rgba(16,185,129,0.28)]"
                          : "border-zinc-600/70 bg-[#031126] text-zinc-300 hover:border-zinc-500"
                      }`}
                    >
                      <UserRound className="h-4 w-4" />
                      {candidate === "athlete" ? "Athlete" : "Coach"}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label htmlFor="email" className="text-sm font-semibold uppercase tracking-[0.18em] text-zinc-300">
                  Email
                </label>
                <div className="mt-3 flex items-center rounded-xl border border-zinc-600/70 bg-[#031126] px-4 py-3.5 focus-within:border-emerald-300 focus-within:shadow-[0_0_0_4px_rgba(16,185,129,0.2)]">
                  <Mail className="h-5 w-5 text-zinc-500" />
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="ml-3 w-full bg-transparent text-lg text-zinc-100 placeholder:text-zinc-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="text-sm font-semibold uppercase tracking-[0.18em] text-zinc-300">
                  Password
                </label>
                <div className="mt-3 flex items-center rounded-xl border border-zinc-600/70 bg-[#031126] px-4 py-3.5 focus-within:border-emerald-300 focus-within:shadow-[0_0_0_4px_rgba(16,185,129,0.2)]">
                  <Lock className="h-5 w-5 text-zinc-500" />
                  <input
                    id="password"
                    type="password"
                    autoComplete="new-password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                    className="ml-3 w-full bg-transparent text-lg text-zinc-100 placeholder:text-zinc-500 focus:outline-none"
                  />
                </div>
                <p className="mt-2 text-xs text-zinc-400">Minimum 6 characters</p>
              </div>

              {error && <div className="rounded-xl border border-red-500/45 bg-red-500/15 px-4 py-3 text-sm text-red-200">{error}</div>}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-emerald-400 px-6 py-4 text-xl font-black text-black shadow-[0_0_24px_rgba(16,185,129,0.5)] transition hover:bg-emerald-300 disabled:opacity-70"
              >
                {loading ? (
                  <span className="inline-flex items-center gap-2">
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Creating account...
                  </span>
                ) : (
                  "Create account"
                )}
              </button>
            </form>

            <div className="mt-7 flex items-center gap-4 text-zinc-400">
              <div className="h-px flex-1 bg-zinc-700/70" />
              <span className="text-sm uppercase tracking-wide">or</span>
              <div className="h-px flex-1 bg-zinc-700/70" />
            </div>

            <p className="mt-6 text-center text-base text-zinc-200">
              Already have an account?{" "}
              <Link href="/login" className="font-semibold text-emerald-400 hover:text-emerald-300">
                Log in →
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
