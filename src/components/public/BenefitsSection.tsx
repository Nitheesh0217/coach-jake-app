"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Film, Dumbbell, Brain, ShieldCheck, Zap, Trophy } from "lucide-react";

const FEATURES = [
  { icon:Zap,         title:"Drills & Skill Work",   body:"Daily curated drills focused on ball-handling, finishing, and decision-making.",           color:"emerald" },
  { icon:Film,        title:"Film Breakdown",         body:"Short, actionable clips showing how to apply drills to game situations.",                   color:"cyan" },
  { icon:Dumbbell,    title:"Strength Plans",         body:"Periodized strength blocks with clear progressions and recovery cues.",                     color:"amber" },
  { icon:ShieldCheck, title:"Accountability",         body:"Coach check-ins, workout completion tracking, and reminders to keep you consistent.",       color:"violet" },
  { icon:Brain,       title:"Game IQ Development",   body:"Film sessions and scenario drills that sharpen your read of defenses and on-ball decisions.", color:"blue" },
  { icon:Trophy,      title:"Performance Tracking",  body:"Data-driven dashboards track every rep, every session, every personal best over time.",     color:"rose" },
];

const colorMap: Record<string,string> = {
  emerald:"border-emerald-500/30 bg-emerald-500/8 text-emerald-400 group-hover:shadow-[0_0_20px_rgba(16,185,129,0.25)]",
  cyan:   "border-cyan-500/30    bg-cyan-500/8    text-cyan-400    group-hover:shadow-[0_0_20px_rgba(6,182,212,0.25)]",
  amber:  "border-amber-500/30   bg-amber-500/8   text-amber-400   group-hover:shadow-[0_0_20px_rgba(245,158,11,0.25)]",
  violet: "border-violet-500/30  bg-violet-500/8  text-violet-400  group-hover:shadow-[0_0_20px_rgba(139,92,246,0.25)]",
  blue:   "border-blue-500/30    bg-blue-500/8    text-blue-400    group-hover:shadow-[0_0_20px_rgba(59,130,246,0.25)]",
  rose:   "border-rose-500/30    bg-rose-500/8    text-rose-400    group-hover:shadow-[0_0_20px_rgba(244,63,94,0.25)]",
};

export default function BenefitsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once:true, margin:"-80px" });

  return (
    <section ref={ref} className="py-24 bg-[#050816] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full bg-cyan-500/4 blur-[150px]" />
      </div>

      <motion.div initial={{ opacity:0, y:30 }} animate={inView?{opacity:1,y:0}:{}} transition={{ duration:0.7 }} className="mb-14 text-center">
        <span className="text-cyan-400 text-xs font-black uppercase tracking-widest mb-3 block">Everything Included</span>
        <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">What you get</h2>
        <p className="mt-3 text-zinc-500 max-w-xl mx-auto">A complete athlete workflow: skill work, strength, film, and coach-driven accountability.</p>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {FEATURES.map((f, i) => {
          const Icon = f.icon;
          const cls  = colorMap[f.color];
          return (
            <motion.div key={f.title}
              initial={{ opacity:0, y:30 }} animate={inView?{opacity:1,y:0}:{}} transition={{ duration:0.5, delay:i*0.08 }}
              whileHover={{ y:-6, transition:{ type:"spring", stiffness:300, damping:20 } }}
              className={`group relative rounded-2xl border border-zinc-800/80 bg-zinc-900/50 backdrop-blur-sm p-5 hover:border-zinc-700 transition-all duration-300 overflow-hidden`}>
              {/* top line glow */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-700 to-transparent group-hover:via-emerald-500/40 transition-all duration-500" />

              <div className={`w-11 h-11 rounded-xl border flex items-center justify-center mb-4 transition-all duration-300 ${cls}`}>
                <Icon className="w-5 h-5" />
              </div>
              <h3 className="font-black text-white mb-1.5 group-hover:text-emerald-50 transition-colors">{f.title}</h3>
              <p className="text-sm text-zinc-500 leading-relaxed">{f.body}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
