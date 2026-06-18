"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Dumbbell, Flame, Trophy, CheckCircle2 } from "lucide-react";

export default function InsideAppSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once:true, margin:"-80px" });

  const cards = [
    {
      icon: Dumbbell, label:"Today's Workout", color:"emerald",
      preview: (
        <div className="space-y-2.5 mt-3">
          {["Dynamic Warm-up · 10 min","Ball Handling Circuit · 20 min","Finishing Drills · 20 min","Conditioning Finisher · 10 min"].map((d,i) => (
            <div key={d} className="flex items-center gap-2.5">
              <CheckCircle2 className={`w-4 h-4 flex-shrink-0 ${i < 3 ? "text-emerald-400" : "text-zinc-700"}`} />
              <span className={`text-xs ${i < 3 ? "text-zinc-300" : "text-zinc-600"}`}>{d}</span>
            </div>
          ))}
          <div className="mt-3 h-1.5 rounded-full bg-zinc-800 overflow-hidden">
            <div className="h-full w-3/4 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400" />
          </div>
          <p className="text-[11px] text-zinc-600">PROGRESS <span className="text-emerald-400 font-black">75%</span></p>
        </div>
      ),
    },
    {
      icon: Flame, label:"Consistency Streak", color:"amber",
      preview: (
        <div className="flex flex-col items-center py-4">
          <div className="relative w-24 h-24 flex items-center justify-center">
            <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 96 96">
              <circle cx="48" cy="48" r="40" fill="none" stroke="#27272a" strokeWidth="6"/>
              <circle cx="48" cy="48" r="40" fill="none" stroke="url(#ambGrad)" strokeWidth="6" strokeLinecap="round" strokeDasharray="188 251"/>
              <defs><linearGradient id="ambGrad" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="#f59e0b"/><stop offset="100%" stopColor="#ef4444"/></linearGradient></defs>
            </svg>
            <div className="relative text-center">
              <p className="text-3xl font-black text-amber-400">14</p>
              <p className="text-[10px] text-amber-400 font-black uppercase">DAYS</p>
            </div>
          </div>
          <p className="text-xs text-zinc-500 mt-2">Unstoppable! Keep it rolling.</p>
        </div>
      ),
    },
    {
      icon: Trophy, label:"Leaderboard", color:"violet",
      preview: (
        <div className="space-y-2 mt-3">
          {[{r:1,n:"Mason C.",pts:7,c:"text-amber-400"},{r:2,n:"Liam J.",pts:5,c:"text-zinc-300"},{r:3,n:"You",pts:4,c:"text-emerald-400",isYou:true}].map(e=>(
            <div key={e.r} className={`flex items-center gap-2.5 p-2 rounded-lg ${(e as any).isYou?"bg-emerald-500/10 border border-emerald-500/20":""}`}>
              <span className={`text-sm font-black w-4 ${e.c}`}>{e.r}</span>
              <span className={`flex-1 text-xs font-semibold ${e.c}`}>{e.n}</span>
              <span className="text-xs font-black text-white">{e.pts} <span className="text-zinc-600 font-normal">sess</span></span>
            </div>
          ))}
        </div>
      ),
    },
  ];

  const colorMap: Record<string,string> = {
    emerald:"border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
    amber:  "border-amber-500/30   bg-amber-500/10   text-amber-400",
    violet: "border-violet-500/30  bg-violet-500/10  text-violet-400",
  };
  const glowMap: Record<string,string> = {
    emerald:"hover:border-emerald-500/30 hover:shadow-[0_0_30px_rgba(16,185,129,0.15)]",
    amber:  "hover:border-amber-500/30   hover:shadow-[0_0_30px_rgba(245,158,11,0.15)]",
    violet: "hover:border-violet-500/30  hover:shadow-[0_0_30px_rgba(139,92,246,0.15)]",
  };

  return (
    <section ref={ref} className="py-24 bg-[#050816] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-violet-500/4 blur-[150px] pointer-events-none" />

      <motion.div initial={{ opacity:0, y:30 }} animate={inView?{opacity:1,y:0}:{}} transition={{ duration:0.7 }} className="mb-14 text-center">
        <span className="text-cyan-400 text-xs font-black uppercase tracking-widest mb-3 block">App Preview</span>
        <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">Inside the App</h2>
        <p className="mt-3 text-zinc-500">Athletes get daily workouts, streak tracking, and leaderboards to stay accountable.</p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-5">
        {cards.map((c, i) => {
          const Icon = c.icon;
          return (
            <motion.div key={c.label}
              initial={{ opacity:0, y:40 }} animate={inView?{opacity:1,y:0}:{}} transition={{ duration:0.6, delay:i*0.12 }}
              whileHover={{ y:-8, transition:{ type:"spring", stiffness:300, damping:22 } }}
              className={`group rounded-2xl border border-zinc-800/80 bg-zinc-900/60 backdrop-blur-sm p-5 transition-all duration-300 overflow-hidden ${glowMap[c.color]}`}>
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-700 to-transparent group-hover:via-emerald-500/40 transition-all duration-500" />
              <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-black uppercase tracking-widest mb-1 ${colorMap[c.color]}`}>
                <Icon className="w-3.5 h-3.5" />{c.label}
              </div>
              {c.preview}
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
