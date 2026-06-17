"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  CheckCircle2,
  Loader2,
  Zap,
  Eye,
  EyeOff,
  Mail,
  Lock,
} from "lucide-react";
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
  const [showPw, setShowPw] = useState(false);
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
      setError(
        error.message.toLowerCase().includes("email not confirmed")
          ? "Please confirm your email first, then log in again."
          : error.message,
      );
      setLoading(false);
      return;
    }

    if (data.user) {
      try {
        const { profile } = await getCurrentUserProfile();
        if (!isProfileComplete(profile)) {
          router.push("/finish-profile");
          return;
        }
      } catch {
        router.push("/finish-profile");
        return;
      }
    }

    router.push(next);
  }

  return (
    <div className="min-h-screen bg-[#050816] text-white flex overflow-hidden relative">
      {/* Background court image */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/1752757/pexels-photo-1752757.jpeg?auto=compress&cs=tinysrgb&w=1600')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="absolute inset-0 bg-[#050816]/75 z-0" />
      {/* Left green glow */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-emerald-500/12 blur-[140px] z-0" />

      {/* Left copy — hidden on mobile */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.55, delay: 0.1 }}
        className="hidden lg:flex flex-col justify-center px-16 flex-1 relative z-10"
      >
        <h2 className="text-6xl xl:text-7xl font-black text-white leading-tight mb-4">
          Welcome back.
        </h2>
        <p className="text-zinc-400 text-xl mb-10 italic">
          Your squad is training right now.
        </p>
        <div className="space-y-5">
          {[
            "Track every session",
            "Stay on the leaderboard",
            "Never miss a workout",
          ].map((b, i) => (
            <motion.div
              key={b}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="flex items-center gap-4"
            >
              <CheckCircle2 className="w-6 h-6 text-emerald-400 flex-shrink-0" />
              <span className="text-zinc-200 text-lg font-medium">{b}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Right card */}
      <div className="flex items-center justify-center px-4 py-12 flex-1 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          {msg === "confirm-email" && (
            <div className="mb-6 rounded-2xl border border-blue-500/30 bg-blue-500/10 px-5 py-4 text-sm text-blue-200">
              <p className="font-semibold">Email confirmation required</p>
              <p className="mt-1 text-blue-300">
                Check your inbox and click the confirmation link.
              </p>
            </div>
          )}

          <div className="rounded-3xl border border-emerald-500/20 bg-zinc-900/90 backdrop-blur-2xl p-8 shadow-[0_0_80px_rgba(0,0,0,0.6)] relative overflow-hidden">
            {/* Subtle top glow */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent" />

            {/* Lightning icon */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="absolute -top-5 left-1/2 -translate-x-1/2"
            >
              <div className="w-10 h-10 rounded-full bg-zinc-900 border border-emerald-500/40 flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                <Zap className="w-5 h-5 text-emerald-400 fill-emerald-400" />
              </div>
            </motion.div>

            <div className="text-center mb-8 mt-3">
              <h2 className="text-3xl font-black bg-gradient-to-r from-emerald-300 to-cyan-300 bg-clip-text text-transparent mb-2">
                Coach Jake
              </h2>
              <p className="text-zinc-300 font-semibold">
                Sign in to your account
              </p>
            </div>

            <form onSubmit={onSubmit} className="space-y-5">
              {/* Email */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
              >
                <label className="text-[11px] font-black uppercase tracking-widest text-zinc-500 block mb-2">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
                  <input
                    type="email"
                    autoComplete="email"
                    placeholder="jake@hooplab.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full pl-10 pr-4 py-3.5 bg-zinc-800/60 border border-zinc-700/60 rounded-xl text-white placeholder-zinc-700 text-sm focus:border-emerald-500/60 focus:ring-[3px] focus:ring-emerald-500/20 focus:outline-none transition-all"
                  />
                </div>
              </motion.div>

              {/* Password */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <label className="text-[11px] font-black uppercase tracking-widest text-zinc-500">
                    Password
                  </label>
                  <a
                    href="#"
                    className="text-xs text-emerald-400 hover:text-emerald-300 transition-colors font-semibold"
                  >
                    Forgot password?
                  </a>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
                  <input
                    type={showPw ? "text" : "password"}
                    autoComplete="current-password"
                    placeholder="••••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full pl-10 pr-10 py-3.5 bg-zinc-800/60 border border-zinc-700/60 rounded-xl text-white placeholder-zinc-700 text-sm focus:border-emerald-500/60 focus:ring-[3px] focus:ring-emerald-500/20 focus:outline-none transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPw((v) => !v)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-zinc-400 transition-colors"
                  >
                    {showPw ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
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
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35 }}
                type="submit"
                disabled={loading}
                className="w-full mt-6 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-black font-black text-sm rounded-xl transition-all duration-300 shadow-[0_0_28px_rgba(16,185,129,0.6)] hover:shadow-[0_0_40px_rgba(16,185,129,0.8)] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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
            </form>

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
              transition={{ delay: 0.4 }}
              className="text-center text-zinc-400 text-sm mt-7"
            >
              Don't have an account?{" "}
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
  );
}
