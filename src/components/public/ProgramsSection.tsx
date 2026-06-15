"use client";

import { motion } from "framer-motion";
import { ArrowRight, Clock, BarChart2, Zap, Dumbbell, Target } from "lucide-react";

const PROGRAMS = [
  {
    badge: "MOST POPULAR",
    badgeClass: "border-emerald-500/50 bg-emerald-500/15 text-emerald-300",
    cardClass: "border-emerald-500/35 bg-gradient-to-br from-emerald-500/[0.07] to-zinc-950 shadow-[0_0_40px_rgba(16,185,129,0.12)]",
    Icon: Zap,
    iconClass: "text-emerald-400",
    title: "Vertical Jump Transformation",
    desc: "12-week program to add serious bounce and explode off the floor. Science-backed plyometrics and strength work.",
    duration: "12 Weeks",
    level: "Intermediate",
    image: "https://images.unsplash.com/photo-1574623452334-1e0ac2b3ccb4?w=600&q=80&auto=format&fit=crop",
  },
  {
    badge: "STRENGTH",
    badgeClass: "border-cyan-500/50 bg-cyan-500/15 text-cyan-300",
    cardClass: "border-zinc-700/50 bg-zinc-900/40 hover:border-zinc-600/70 hover:bg-zinc-900/60",
    Icon: Dumbbell,
    iconClass: "text-cyan-400",
    title: "Strength & Power Builder",
    desc: "Build foundational strength, explosiveness, and on-court power in 10 focused weeks.",
    duration: "10 Weeks",
    level: "All Levels",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&q=80&auto=format&fit=crop",
  },
  {
    badge: "SKILLS",
    badgeClass: "border-violet-500/50 bg-violet-500/15 text-violet-300",
    cardClass: "border-zinc-700/50 bg-zinc-900/40 hover:border-zinc-600/70 hover:bg-zinc-900/60",
    Icon: Target,
    iconClass: "text-violet-400",
    title: "Hoop IQ & Skills Development",
    desc: "Sharpen your handle, decision-making, and court vision. 8 weeks to a smarter game.",
    duration: "8 Weeks",
    level: "All Levels",
    image: "https://images.unsplash.com/photo-1608245449230-4ac19066d2d0?w=600&q=80&auto=format&fit=crop",
  },
];

export default function ProgramsSection() {
  return (
    <section className="py-20">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
        <div>
          <h2 className="text-4xl md:text-5xl font-black text-white">Programs</h2>
          <p className="mt-2 text-zinc-400 text-base">Structured. Proven. Built for Results.</p>
        </div>
        <a
          href="/programs"
          className="inline-flex items-center gap-1.5 text-sm font-bold text-emerald-400 hover:text-emerald-300 transition-colors whitespace-nowrap"
        >
          View all programs <ArrowRight className="w-4 h-4" />
        </a>
      </div>

      {/* Cards — horizontal list matching screenshot */}
      <div className="grid md:grid-cols-3 gap-5">
        {PROGRAMS.map((p, idx) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className={`group flex flex-col rounded-2xl border overflow-hidden transition-all duration-300 ${p.cardClass}`}
          >
            {/* Image */}
            <div className="relative h-44 overflow-hidden bg-zinc-900">
              <img
                src={p.image}
                alt={p.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent" />
              {/* Badge over image */}
              <div className="absolute top-3 left-3">
                <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-black uppercase tracking-wider ${p.badgeClass}`}>
                  <p.Icon className={`w-3 h-3 ${p.iconClass}`} />
                  {p.badge}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="flex flex-col flex-1 p-5 space-y-4">
              <div className="space-y-2">
                <h3 className="text-lg font-black text-white leading-tight">{p.title}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">{p.desc}</p>
              </div>

              <div className="mt-auto pt-4 border-t border-zinc-800/60 flex items-center justify-between">
                <div className="flex gap-4 text-xs text-zinc-500">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    <span className="font-semibold text-zinc-300">{p.duration}</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <BarChart2 className="w-3.5 h-3.5" />
                    <span className="font-semibold text-zinc-300">{p.level}</span>
                  </span>
                </div>
                <a
                  href="/programs"
                  className="text-emerald-400 hover:text-emerald-300 font-bold text-xs flex items-center gap-1 transition-colors"
                >
                  View details <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
