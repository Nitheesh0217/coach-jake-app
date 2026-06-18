"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabaseBrowser } from "@/lib/supabaseClient";
import type { Role } from "@/types";
import { motion } from "framer-motion";
import { Loader2, Zap, Eye, EyeOff, Mail, Lock, User } from "lucide-react";

export default function SignupPage() {
  const router   = useRouter();
  const supabase = supabaseBrowser();

  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [role,     setRole]     = useState<Role>("athlete");
  const [showPw,   setShowPw]   = useState(false);
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState<string|null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true); setError(null);

    const { data, error: authError } = await supabase.auth.signUp({ email, password });
    if (authError) {
      setLoading(false);
      setError(authError.message.toLowerCase().includes("already registered")
        ? "This email is already registered. Please log in instead."
        : authError.message);
      return;
    }

    setLoading(false);
    if (!data.session) { router.push("/login?msg=confirm-email"); }
    else { router.push("/finish-profile"); }
  }

  return (
    <div className="min-h-screen bg-transparent text-white flex overflow-hidden relative">
      {/* Court BG */}
      <div className="absolute inset-0 z-0"
        style={{ backgroundImage:"url('https://images.pexels.com/photos/1752757/pexels-photo-1752757.jpeg?auto=compress&cs=tinysrgb&w=1600')", backgroundSize:"cover", backgroundPosition:"center" }} />
      <div className="absolute inset-0 bg-[#050816]/75 z-0" />
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-emerald-500/12 blur-[140px] z-0" />

      {/* Left copy */}
      <motion.div initial={{ opacity:0, x:-40 }} animate={{ opacity:1, x:0 }} transition={{ duration:0.55, delay:0.1 }}
        className="hidden lg:flex flex-col justify-center px-16 flex-1 relative z-10">
        <h2 className="text-6xl xl:text-7xl font-black text-white leading-tight mb-4">Built Different.</h2>
        <p className="text-zinc-400 text-xl mb-10">Join 120+ athletes training with Coach Jake.</p>
        <div className="space-y-5">
          {["Personalized training programs","Coach-assigned workouts","Compete on the leaderboard"].map((b,i) => (
            <motion.div key={b} initial={{ opacity:0, x:-12 }} animate={{ opacity:1, x:0 }} transition={{ delay:0.3+i*0.1 }}
              className="flex items-center gap-4">
              <div className="w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center flex-shrink-0">
                <svg className="w-3 h-3 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                </svg>
              </div>
              <span className="text-zinc-200 text-lg font-medium">{b}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Right card */}
      <div className="flex items-center justify-center px-4 py-12 flex-1 relative z-10">
        <motion.div initial={{ opacity:0, y:32 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.5 }}
          className="w-full max-w-md">

          <div className="rounded-3xl border border-emerald-500/20 bg-zinc-900/90 backdrop-blur-2xl p-8 shadow-[0_0_80px_rgba(0,0,0,0.6)] relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent" />

            <motion.div initial={{ opacity:0, scale:0 }} animate={{ opacity:1, scale:1 }} transition={{ delay:0.1 }}
              className="absolute -top-5 left-1/2 -translate-x-1/2">
              <div className="w-10 h-10 rounded-full bg-zinc-900 border border-emerald-500/40 flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                <Zap className="w-5 h-5 text-emerald-400 fill-emerald-400" />
              </div>
            </motion.div>

            <div className="text-center mb-6 mt-3">
              <h2 className="text-3xl font-black bg-gradient-to-r from-emerald-300 to-cyan-300 bg-clip-text text-transparent mb-2">Coach Jake</h2>
              <p className="text-zinc-300 font-semibold">Create your account</p>
            </div>

            {/* Role selector */}
            <div className="flex gap-2 mb-6 p-1 rounded-xl bg-zinc-800/60 border border-zinc-700/60">
              {(["athlete","coach"] as Role[]).map(r => (
                <button key={r} type="button" onClick={() => setRole(r)}
                  className={`flex-1 py-2.5 rounded-lg text-sm font-bold capitalize transition-all ${
                    role===r ? "bg-emerald-500 text-black shadow-[0_0_12px_rgba(16,185,129,0.4)]" : "text-zinc-500 hover:text-zinc-300"
                  }`}>{r}</button>
              ))}
            </div>

            <form onSubmit={onSubmit} className="space-y-4">
              <div>
                <label className="text-[11px] font-black uppercase tracking-widest text-zinc-500 block mb-2">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
                  <input type="email" placeholder="your@email.com" value={email} onChange={e => setEmail(e.target.value)} required
                    className="w-full pl-10 pr-4 py-3.5 bg-zinc-800/60 border border-zinc-700/60 rounded-xl text-white placeholder-zinc-700 text-sm focus:border-emerald-500/60 focus:ring-[3px] focus:ring-emerald-500/20 focus:outline-none transition-all" />
                </div>
              </div>
              <div>
                <label className="text-[11px] font-black uppercase tracking-widest text-zinc-500 block mb-2">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
                  <input type={showPw?"text":"password"} placeholder="Min 8 characters" value={password} onChange={e => setPassword(e.target.value)} required
                    className="w-full pl-10 pr-10 py-3.5 bg-zinc-800/60 border border-zinc-700/60 rounded-xl text-white placeholder-zinc-700 text-sm focus:border-emerald-500/60 focus:ring-[3px] focus:ring-emerald-500/20 focus:outline-none transition-all" />
                  <button type="button" onClick={() => setShowPw(v=>!v)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-zinc-400 transition-colors">
                    {showPw ? <EyeOff className="w-4 h-4"/> : <Eye className="w-4 h-4"/>}
                  </button>
                </div>
              </div>

              {error && (
                <div className="rounded-xl bg-red-500/15 border border-red-500/40 px-4 py-3 text-sm text-red-300">{error}</div>
              )}

              <button type="submit" disabled={loading}
                className="w-full py-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-black text-sm disabled:opacity-50 flex items-center justify-center gap-2 shadow-[0_0_24px_rgba(16,185,129,0.4)] hover:shadow-[0_0_36px_rgba(16,185,129,0.6)] transition-all mt-2">
                {loading ? <><Loader2 className="w-4 h-4 animate-spin"/>Creating account...</> : "Create account →"}
              </button>
            </form>

            <div className="mt-7 flex items-center gap-3">
              <div className="flex-1 h-px bg-gradient-to-r from-zinc-800 to-transparent"/>
              <span className="text-[11px] text-zinc-700 uppercase tracking-wide font-semibold px-2">or</span>
              <div className="flex-1 h-px bg-gradient-to-l from-zinc-800 to-transparent"/>
            </div>

            <p className="text-center text-zinc-500 text-sm mt-7">
              Already have an account?{" "}
              <Link href="/login" className="font-bold text-emerald-400 hover:text-emerald-300 transition-colors">Sign in →</Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
