"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Clock, BarChart2, Zap, Dumbbell, Target } from "lucide-react";

const PROGRAMS = [
  {
    badge:"MOST POPULAR", badgeColor:"text-emerald-300 border-emerald-500/50 bg-emerald-500/15",
    borderGlow:"hover:shadow-[0_0_40px_rgba(16,185,129,0.2)] border-emerald-500/30 bg-gradient-to-br from-emerald-500/8 to-zinc-950",
    Icon:Zap, iconColor:"text-emerald-400",
    title:"Vertical Jump Transformation",
    desc:"12-week program to add serious bounce and explode off the floor. Science-backed plyometrics.",
    duration:"12 Weeks", level:"Intermediate",
    image:"/images/program-vertical.jpg",
    accent:"emerald",
  },
  {
    badge:"STRENGTH", badgeColor:"text-cyan-300 border-cyan-500/50 bg-cyan-500/15",
    borderGlow:"hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] border-zinc-700/50 bg-zinc-900/40 hover:border-cyan-500/30",
    Icon:Dumbbell, iconColor:"text-cyan-400",
    title:"Strength & Power Builder",
    desc:"Build foundational strength, explosiveness, and on-court power in 10 focused weeks.",
    duration:"10 Weeks", level:"All Levels",
    image:"/images/program-strength.jpg",
    accent:"cyan",
  },
  {
    badge:"SKILLS", badgeColor:"text-violet-300 border-violet-500/50 bg-violet-500/15",
    borderGlow:"hover:shadow-[0_0_30px_rgba(139,92,246,0.15)] border-zinc-700/50 bg-zinc-900/40 hover:border-violet-500/30",
    Icon:Target, iconColor:"text-violet-400",
    title:"Hoop IQ & Skills Development",
    desc:"Sharpen your handle, decision-making, and court vision. 8 weeks to a smarter game.",
    duration:"8 Weeks", level:"All Levels",
    image:"/images/program-handles.jpg",
    accent:"violet",
  },
];

export default function ProgramsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once:true, margin:"-100px" });

  return (
    <section ref={ref} className="py-24 bg-transparent relative overflow-hidden">
      {/* bg decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-emerald-500/4 blur-[120px] pointer-events-none" />

      <div className="relative z-10">
        <motion.div initial={{ opacity:0, y:30 }} animate={inView ? { opacity:1, y:0 } : {}} transition={{ duration:0.7 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-14">
          <div>
            <span className="text-emerald-400 text-xs font-black uppercase tracking-widest mb-3 block">Training Programs</span>
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">Programs</h2>
            <p className="mt-2 text-zinc-500">Structured. Proven. Built for Results.</p>
          </div>
          <motion.a href="/programs" whileHover={{ x:4 }} className="inline-flex items-center gap-1.5 text-sm font-bold text-emerald-400 hover:text-emerald-300 transition-colors whitespace-nowrap">
            View all programs <ArrowRight className="w-4 h-4" />
          </motion.a>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5">
          {PROGRAMS.map((p, i) => (
            <motion.div key={p.title}
              initial={{ opacity:0, y:40 }} animate={inView ? { opacity:1, y:0 } : {}} transition={{ duration:0.6, delay:i*0.12 }}
              whileHover={{ y:-8, transition:{ type:"spring", stiffness:300, damping:25 } }}
              className={`group flex flex-col rounded-2xl border overflow-hidden transition-all duration-400 cursor-pointer ${p.borderGlow}`}>
              {/* Image */}
              <div className="relative h-48 overflow-hidden bg-zinc-900">
                <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-115 group-hover:rotate-1 group-hover:translate-y-[-2px] transition-all duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-950/20 to-transparent" />
                {/* Shimmer on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
                <div className="absolute top-3 left-3">
                  <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-black uppercase tracking-wider ${p.badgeColor}`}>
                    <p.Icon className={`w-3 h-3 ${p.iconColor}`} />{p.badge}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-col flex-1 p-5 space-y-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-black text-white leading-tight group-hover:text-emerald-100 transition-colors">{p.title}</h3>
                  <p className="text-sm text-zinc-500 leading-relaxed">{p.desc}</p>
                </div>
                <div className="mt-auto pt-4 border-t border-zinc-800/60 flex items-center justify-between">
                  <div className="flex gap-4 text-xs text-zinc-600">
                    <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5"/><span className="font-semibold text-zinc-400">{p.duration}</span></span>
                    <span className="flex items-center gap-1.5"><BarChart2 className="w-3.5 h-3.5"/><span className="font-semibold text-zinc-400">{p.level}</span></span>
                  </div>
                  <motion.a href="/programs" whileHover={{ x:3 }} className="text-emerald-400 hover:text-emerald-300 font-bold text-xs flex items-center gap-1 transition-colors">
                    View details <ArrowRight className="w-3.5 h-3.5"/>
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
