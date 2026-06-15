"use client";

import { motion } from "framer-motion";
import { ArrowRight, Zap, Dumbbell, Target } from "lucide-react";
import Image from "next/image";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.09, delayChildren: 0.15 },
  },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

const BENEFITS = [
  {
    icon: Zap,
    color: "emerald",
    title: "EXPLOSIVE POWER",
    desc: "Increase your vertical and first step quickness.",
  },
  {
    icon: Dumbbell,
    color: "emerald",
    title: "STRENGTH & ATHLETICISM",
    desc: "Build lean muscle and move with control.",
  },
  {
    icon: Target,
    color: "emerald",
    title: "GAME-READY RESULTS",
    desc: "Train with purpose. Perform with confidence.",
  },
];

const STATS = [
  { value: "120+", label: "athletes trained" },
  { value: "+3\" avg", label: "vertical in 12 weeks" },
  { value: "5+ yrs", label: "coaching experience" },
];

export default function HeroSection() {
  return (
    <section className="grid lg:grid-cols-[1fr_480px] xl:grid-cols-[1fr_520px] gap-10 xl:gap-16 items-start min-h-[calc(100vh-64px)]">

      {/* ── LEFT COLUMN ── */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="flex flex-col justify-center space-y-7 pt-8 lg:pt-14"
      >
        {/* Badge */}
        <motion.div variants={item}>
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/35 bg-emerald-500/10 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-emerald-300">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(16,185,129,0.9)]" />
            Basketball Performance Coaching
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={item}
          className="font-black text-[clamp(2.6rem,6vw,5rem)] leading-[1.03] tracking-tight"
        >
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-cyan-200 to-emerald-400">
            Explosive
          </span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-cyan-200 to-emerald-400">
            Basketball
          </span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-emerald-300 to-cyan-400">
            Performance
          </span>
          <span className="block text-white">for Serious</span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-300">
            Hoopers
          </span>
        </motion.h1>

        {/* Sub text */}
        <motion.p variants={item} className="max-w-md text-base text-zinc-400 leading-relaxed">
          Elite training programs designed to increase your vertical, build strength,
          and elevate your game on every level.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div variants={item} className="flex flex-wrap gap-3">
          <motion.a
            href="/signup"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 rounded-full bg-emerald-400 px-7 py-3.5 text-sm font-black text-black shadow-[0_0_28px_rgba(16,185,129,0.6)] hover:bg-emerald-300 hover:shadow-[0_0_40px_rgba(16,185,129,0.8)] transition-all duration-200"
          >
            Start training free
            <ArrowRight className="w-4 h-4" />
          </motion.a>
          <motion.a
            href="#overview"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2.5 rounded-full border border-zinc-700 bg-zinc-900/50 px-6 py-3.5 text-sm font-semibold text-zinc-200 hover:border-emerald-500/50 hover:text-white hover:bg-zinc-800/60 transition-all duration-200"
          >
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-emerald-500/50 bg-emerald-500/10 text-[10px]">
              ▶
            </span>
            Watch 60s overview
          </motion.a>
        </motion.div>

        {/* Stats */}
        <motion.div variants={item} className="grid grid-cols-3 gap-3 pt-2">
          {STATS.map((s) => (
            <div
              key={s.label}
              className="rounded-2xl border border-zinc-800 bg-zinc-900/50 px-4 py-3.5 hover:border-emerald-500/30 hover:bg-zinc-900/70 transition-all duration-200"
            >
              <p className="text-xl font-black text-emerald-300 tabular-nums">{s.value}</p>
              <p className="mt-0.5 text-[11px] text-zinc-500 font-medium leading-snug">{s.label}</p>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* ── RIGHT COLUMN ── */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.75, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="relative pt-8 lg:pt-14"
      >
        {/* Outer glow ring */}
        <div className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-br from-emerald-500/25 via-transparent to-cyan-500/15 blur-2xl" />

        {/* Card shell */}
        <div className="relative rounded-[2rem] border border-emerald-500/25 bg-zinc-950 overflow-hidden shadow-[0_0_60px_rgba(16,185,129,0.18),inset_0_1px_0_rgba(255,255,255,0.04)]">

          {/* Hero image */}
          <div className="relative h-[340px] sm:h-[400px] lg:h-[460px] w-full overflow-hidden">
            {/* Fallback gradient bg shown while image loads */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-950 via-zinc-900 to-black" />

            {/* Actual athlete image — using a reliable free Unsplash basketball photo */}
            <img
              src="https://images.unsplash.com/photo-1546519638-68e109498ffc?w=900&q=85&auto=format&fit=crop"
              alt="Basketball player dunking"
              className="absolute inset-0 w-full h-full object-cover object-top"
            />

            {/* Gradient overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/10 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-l from-emerald-500/8 via-transparent to-transparent" />

            {/* Top-left live badge */}
            <div className="absolute top-4 left-4">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/40 bg-black/60 backdrop-blur-md px-3 py-1 text-[11px] font-bold text-emerald-300 uppercase tracking-wide">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Elite Training
              </span>
            </div>
          </div>

          {/* Benefits list */}
          <div className="bg-zinc-950/95 px-5 py-5 space-y-4">
            {BENEFITS.map((b, i) => (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.45 + i * 0.1 }}
                className="flex items-start gap-3 group"
              >
                <div className="flex-shrink-0 h-9 w-9 rounded-xl border border-emerald-500/25 bg-emerald-500/10 flex items-center justify-center group-hover:border-emerald-500/50 group-hover:bg-emerald-500/15 transition-all duration-200">
                  <b.icon className="h-4 w-4 text-emerald-400" />
                </div>
                <div>
                  <p className="text-[11px] font-black text-emerald-300 uppercase tracking-[0.1em]">
                    {b.title}
                  </p>
                  <p className="text-[12px] text-zinc-400 mt-0.5 leading-snug">{b.desc}</p>
                </div>
              </motion.div>
            ))}

            {/* Signature */}
            <div className="pt-3 border-t border-zinc-800/70 flex items-center justify-between">
              <div>
                <p className="text-xs font-black text-emerald-300 tracking-widest">Coach Jake</p>
                <p className="text-[10px] text-zinc-600 uppercase tracking-widest mt-0.5">Basketball Performance Coach</p>
              </div>
              <div className="h-8 w-8 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center">
                <span className="text-xs font-black text-emerald-300">CJ</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

    </section>
  );
}
