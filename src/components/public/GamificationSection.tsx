"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Trophy, Flame, Zap, Star, Crown, Shield } from "lucide-react";

const BADGES = [
  { icon:Shield, label:"Iron Core",     sub:"4 weeks completed",       unlocked:true,  color:"text-emerald-400", bg:"bg-emerald-500/15 border-emerald-500/40", glow:"shadow-[0_0_20px_rgba(16,185,129,0.4)]" },
  { icon:Flame,  label:"Clutch Time",   sub:"100% in-season lifts",   unlocked:true,  color:"text-amber-400",   bg:"bg-amber-500/15   border-amber-500/40",   glow:"shadow-[0_0_20px_rgba(245,158,11,0.4)]" },
  { icon:Star,   label:"Above the Rim", sub:'+3" vertical gained',    unlocked:false, color:"text-zinc-600",    bg:"bg-zinc-800/40    border-zinc-700/40",     glow:"" },
  { icon:Crown,  label:"Elite Status",  sub:"Top 10 leaderboard",     unlocked:false, color:"text-zinc-600",    bg:"bg-zinc-800/40    border-zinc-700/40",     glow:"" },
];

const LEADERBOARD = [
  { rank:1, name:"Marcus T.", pts:2840, badge:"🏆", color:"text-amber-400" },
  { rank:2, name:"Jordan W.", pts:2610, badge:"🥈", color:"text-zinc-300" },
  { rank:3, name:"Devon A.",  pts:2480, badge:"🥉", color:"text-amber-700" },
  { rank:4, name:"You",       pts:1950, badge:"",   color:"text-emerald-400", isYou:true },
];

export default function GamificationSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once:true, margin:"-80px" });

  return (
    <section ref={ref} className="py-24 bg-[#050816] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full bg-amber-500/4 blur-[150px]" />
      </div>

      <motion.div initial={{ opacity:0, y:30 }} animate={inView?{opacity:1,y:0}:{}} transition={{ duration:0.7 }} className="mb-14 text-center">
        <span className="text-amber-400 text-xs font-black uppercase tracking-widest mb-3 block">Compete & Earn</span>
        <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">Badges & Leaderboard</h2>
        <p className="mt-3 text-zinc-500">Train hard. Unlock badges. Climb the board.</p>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Badges */}
        <motion.div initial={{ opacity:0, x:-30 }} animate={inView?{opacity:1,x:0}:{}} transition={{ duration:0.7, delay:0.1 }}
          className="rounded-2xl border border-zinc-800/80 bg-zinc-900/60 backdrop-blur-sm p-6">
          <h3 className="text-lg font-black text-white mb-5 flex items-center gap-2"><Zap className="w-5 h-5 text-amber-400"/>Achievement Badges</h3>
          <div className="grid grid-cols-2 gap-3">
            {BADGES.map((b, i) => {
              const Icon = b.icon;
              return (
                <motion.div key={b.label}
                  initial={{ opacity:0, scale:0.8 }} animate={inView?{opacity:1,scale:1}:{}} transition={{ delay:0.2+i*0.1 }}
                  whileHover={b.unlocked ? { scale:1.04, y:-3 } : {}}
                  className={`relative rounded-xl border p-4 text-center transition-all duration-300 ${b.bg} ${b.unlocked ? b.glow : "opacity-40"}`}>
                  {b.unlocked && (
                    <motion.div animate={{ scale:[1,1.15,1] }} transition={{ duration:2, repeat:Infinity, delay:i*0.5 }}
                      className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border border-[#050816] flex items-center justify-center">
                      <span className="text-[8px] text-black font-black">✓</span>
                    </motion.div>
                  )}
                  <Icon className={`w-8 h-8 mx-auto mb-2 ${b.color}`} />
                  <p className={`text-xs font-black ${b.unlocked?"text-white":"text-zinc-600"}`}>{b.label}</p>
                  <p className="text-[10px] text-zinc-600 mt-0.5">{b.sub}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Mini leaderboard */}
        <motion.div initial={{ opacity:0, x:30 }} animate={inView?{opacity:1,x:0}:{}} transition={{ duration:0.7, delay:0.15 }}
          className="rounded-2xl border border-zinc-800/80 bg-zinc-900/60 backdrop-blur-sm p-6">
          <h3 className="text-lg font-black text-white mb-5 flex items-center gap-2"><Trophy className="w-5 h-5 text-amber-400"/>This Week's Leaders</h3>
          <div className="space-y-3">
            {LEADERBOARD.map((e, i) => (
              <motion.div key={e.rank}
                initial={{ opacity:0, x:20 }} animate={inView?{opacity:1,x:0}:{}} transition={{ delay:0.3+i*0.08 }}
                className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${
                  (e as any).isYou ? "border-emerald-500/40 bg-emerald-500/8" : "border-zinc-800/60 bg-zinc-800/30 hover:bg-zinc-800/60"
                }`}>
                <span className={`text-lg font-black w-6 text-center ${e.color}`}>{e.rank}</span>
                <div className="w-8 h-8 rounded-full bg-zinc-700 border border-zinc-600 flex items-center justify-center text-xs font-black text-zinc-300">
                  {e.name.split(" ").map(n=>n[0]).join("")}
                </div>
                <div className="flex-1">
                  <p className={`text-sm font-bold ${e.color}`}>{e.name} {(e as any).isYou && <span className="text-[10px] text-emerald-400 bg-emerald-500/20 border border-emerald-500/30 px-1.5 py-0.5 rounded ml-1">YOU</span>}</p>
                </div>
                <span className="text-sm font-black text-white">{e.pts.toLocaleString()} <span className="text-xs text-zinc-600 font-normal">pts</span></span>
                <span className="text-base">{e.badge}</span>
              </motion.div>
            ))}
          </div>
          <motion.a href="/leaderboard" whileHover={{ x:4 }}
            className="mt-4 flex items-center justify-center gap-2 w-full py-2.5 rounded-xl border border-zinc-700/60 text-sm text-zinc-400 hover:text-emerald-400 hover:border-emerald-500/30 transition-all font-semibold">
            View full leaderboard →
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
