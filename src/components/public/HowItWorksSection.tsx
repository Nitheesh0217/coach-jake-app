"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { UserPlus, Clipboard, Zap } from "lucide-react";

const STEPS = [
  { num:"01", Icon:UserPlus, label:"Sign up", title:"Create your athlete profile", body:"Tell us your level, goals, and availability — it takes 60 seconds.", color:"emerald" },
  { num:"02", Icon:Clipboard, label:"Get your plan", title:"Receive a weekly plan", body:"A clear, prioritized plan with strength, drills, and recovery blocks.", color:"cyan" },
  { num:"03", Icon:Zap,       label:"Train & track", title:"Complete sessions and log progress", body:"Daily workouts, streaks, and short film cues to improve quickly.", color:"amber" },
];

const glowMap: Record<string,string> = {
  emerald:"border-emerald-500/30 bg-emerald-500/8 text-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.2)]",
  cyan:   "border-cyan-500/30    bg-cyan-500/8    text-cyan-400    shadow-[0_0_30px_rgba(6,182,212,0.2)]",
  amber:  "border-amber-500/30   bg-amber-500/8   text-amber-400   shadow-[0_0_30px_rgba(245,158,11,0.2)]",
};

export default function HowItWorksSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-24 bg-[#050816] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-0 w-[500px] h-[500px] rounded-full bg-emerald-500/4 blur-[150px] -translate-y-1/2" />
      </div>

      <motion.div initial={{ opacity:0, y:30 }} animate={inView?{opacity:1,y:0}:{}} transition={{ duration:0.7 }} className="mb-16 text-center">
        <span className="text-emerald-400 text-xs font-black uppercase tracking-widest mb-3 block">Simple Process</span>
        <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">How it works</h2>
        <p className="mt-3 text-zinc-500 max-w-md mx-auto">Sign up, get a focused plan, and follow short daily sessions to see measurable gains.</p>
      </motion.div>

      {/* Steps with connecting line */}
      <div className="relative grid md:grid-cols-3 gap-8">
        {/* Connector line */}
        <div className="hidden md:block absolute top-10 left-[20%] right-[20%] h-px bg-gradient-to-r from-emerald-500/30 via-cyan-500/30 to-amber-500/30" />

        {STEPS.map((s, i) => {
          const Icon = s.Icon;
          return (
            <motion.div key={s.num}
              initial={{ opacity:0, y:40 }} animate={inView?{opacity:1,y:0}:{}} transition={{ duration:0.6, delay:i*0.15 }}
              whileHover={{ y:-8, transition:{ type:"spring", stiffness:300, damping:22 } }}
              className="group relative flex flex-col items-center text-center">
              {/* Number bubble */}
              <motion.div
                whileHover={{ scale:1.1, rotate:5 }}
                className={`relative z-10 w-20 h-20 rounded-2xl border flex items-center justify-center mb-6 transition-all duration-300 ${glowMap[s.color]}`}>
                <Icon className="w-8 h-8" />
                <span className="absolute -top-2.5 -right-2.5 w-6 h-6 rounded-full bg-zinc-900 border border-zinc-700 flex items-center justify-center text-[10px] font-black text-zinc-400">{s.num}</span>
              </motion.div>

              <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/60 backdrop-blur-sm p-6 w-full hover:border-zinc-700 group-hover:bg-zinc-900/80 transition-all duration-300">
                <span className="text-[11px] font-black uppercase tracking-widest text-zinc-600 mb-2 block">{s.label}</span>
                <h3 className="text-base font-black text-white mb-2">{s.title}</h3>
                <p className="text-sm text-zinc-500 leading-relaxed">{s.body}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
