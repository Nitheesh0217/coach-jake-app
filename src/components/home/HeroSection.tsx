"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowRight, Zap, Dumbbell, Target } from "lucide-react";
import dynamic from "next/dynamic";

const BasketballOrb = dynamic(() => import("@/components/3d/BasketballOrb"), { ssr: false });

const STATS = [
  { value: "120+", label: "athletes trained",      color: "text-emerald-400" },
  { value: '+3"',  label: "vertical in 12 weeks",  color: "text-cyan-400" },
  { value: "5+",   label: "years coaching",         color: "text-amber-400" },
];

const BENEFITS = [
  { icon: Zap,      title: "EXPLOSIVE POWER",         desc: "Increase your vertical and first step quickness." },
  { icon: Dumbbell, title: "STRENGTH & ATHLETICISM",  desc: "Build lean muscle and move with control." },
  { icon: Target,   title: "GAME-READY RESULTS",      desc: "Train with purpose. Perform with confidence." },
];

const WORDS = ["Explosive", "Basketball", "Performance"];

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const y       = useTransform(scrollYProgress, [0,1], [0, -120]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const scale   = useTransform(scrollYProgress, [0, 0.5], [1, 0.92]);
  const springY = useSpring(y, { stiffness: 80, damping: 20 });

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center overflow-hidden bg-[#050816]">
      {/* 3D background — full bleed */}
      <div className="absolute inset-0 z-0">
        <BasketballOrb className="opacity-70" />
      </div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#050816]/30 via-transparent to-[#050816]" />
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-[#050816]/80 via-[#050816]/20 to-transparent" />

      {/* Animated grid */}
      <div className="absolute inset-0 z-0 opacity-[0.035]"
        style={{ backgroundImage:"linear-gradient(rgba(16,185,129,1) 1px,transparent 1px),linear-gradient(90deg,rgba(16,185,129,1) 1px,transparent 1px)", backgroundSize:"80px 80px" }} />

      {/* Content */}
      <motion.div style={{ y: springY, opacity, scale }} className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* LEFT */}
          <div className="space-y-8">
            {/* Badge */}
            <motion.div initial={{ opacity:0, x:-30 }} animate={{ opacity:1, x:0 }} transition={{ duration:0.6, ease:[0.22,1,0.36,1] }}>
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-500/10 backdrop-blur-sm px-4 py-2 text-[11px] font-black uppercase tracking-widest text-emerald-300">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#10b981]" />
                Basketball Performance Coaching
              </span>
            </motion.div>

            {/* Headline — word by word */}
            <div className="space-y-1">
              {WORDS.map((word, wi) => (
                <motion.div key={word}
                  initial={{ opacity:0, y:40 }} animate={{ opacity:1, y:0 }}
                  transition={{ duration:0.7, delay:0.1+wi*0.12, ease:[0.22,1,0.36,1] }}>
                  <span className="block text-[clamp(3rem,8vw,5.5rem)] font-black leading-[1.0] tracking-tight bg-gradient-to-r from-emerald-300 via-cyan-200 to-emerald-400 bg-clip-text text-transparent">
                    {word}
                  </span>
                </motion.div>
              ))}
              <motion.span initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.7, delay:0.46, ease:[0.22,1,0.36,1] }}
                className="block text-[clamp(3rem,8vw,5.5rem)] font-black leading-[1.0] tracking-tight text-white">
                for Serious Hoopers
              </motion.span>
            </div>

            {/* Sub */}
            <motion.p initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.6, delay:0.55 }}
              className="text-zinc-400 text-lg leading-relaxed max-w-lg">
              Elite training programs designed to increase your vertical, build strength, and elevate your game on every level.
            </motion.p>

            {/* CTAs */}
            <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.6, delay:0.65 }}
              className="flex flex-wrap gap-4">
              <motion.a href="/signup" whileHover={{ scale:1.04, y:-2 }} whileTap={{ scale:0.97 }}
                className="group inline-flex items-center gap-2 rounded-full bg-emerald-500 px-8 py-4 text-sm font-black text-black shadow-[0_0_30px_rgba(16,185,129,0.6)] hover:bg-emerald-400 hover:shadow-[0_0_50px_rgba(16,185,129,0.9)] transition-all duration-300">
                Start training free
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.a>
              <motion.a href="#overview" whileHover={{ scale:1.02 }} whileTap={{ scale:0.97 }}
                className="inline-flex items-center gap-3 rounded-full border border-zinc-700/80 bg-zinc-900/50 backdrop-blur-sm px-7 py-4 text-sm font-semibold text-zinc-200 hover:border-emerald-500/50 hover:text-white transition-all duration-300">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-emerald-500/40 bg-emerald-500/10 text-[10px]">▶</span>
                Watch 60s overview
              </motion.a>
            </motion.div>

            {/* Stats row */}
            <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.6, delay:0.75 }}
              className="grid grid-cols-3 gap-3">
              {STATS.map((s, i) => (
                <motion.div key={s.label} whileHover={{ y:-4, scale:1.03 }} transition={{ type:"spring", stiffness:300, damping:20 }}
                  className="rounded-2xl border border-zinc-800/80 bg-zinc-900/60 backdrop-blur-sm px-4 py-3.5 hover:border-emerald-500/30 transition-colors cursor-default">
                  <p className={`text-2xl font-black tabular-nums ${s.color}`}>{s.value}</p>
                  <p className="text-[11px] text-zinc-500 mt-0.5 leading-tight">{s.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* RIGHT — glass card with image + benefits */}
          <motion.div initial={{ opacity:0, x:60 }} animate={{ opacity:1, x:0 }} transition={{ duration:0.8, delay:0.2, ease:[0.22,1,0.36,1] }}
            className="relative hidden lg:block">
            {/* Outer glow */}
            <div className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-br from-emerald-500/20 via-transparent to-cyan-500/10 blur-2xl pointer-events-none" />

            <motion.div whileHover={{ y:-8, rotateY:-3 }} transition={{ type:"spring", stiffness:200, damping:25 }}
              className="relative rounded-[2rem] border border-emerald-500/20 bg-zinc-950/90 backdrop-blur-xl overflow-hidden shadow-[0_0_80px_rgba(16,185,129,0.15),inset_0_1px_0_rgba(255,255,255,0.05)]">
              {/* Hero image */}
              <div className="relative h-[380px] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-950 via-zinc-900 to-black" />
                <img src="https://images.unsplash.com/photo-1546519638-68e109498ffc?w=900&q=85&auto=format&fit=crop"
                  alt="Basketball player" className="absolute inset-0 w-full h-full object-cover object-top" />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
                <div className="absolute top-4 left-4">
                  <motion.span animate={{ opacity:[0.7,1,0.7] }} transition={{ duration:2, repeat:Infinity }}
                    className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/40 bg-black/60 backdrop-blur-md px-3 py-1 text-[11px] font-bold text-emerald-300 uppercase tracking-wide">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" /> Elite Training
                  </motion.span>
                </div>
              </div>

              {/* Benefits */}
              <div className="bg-zinc-950/95 px-5 py-5 space-y-3.5">
                {BENEFITS.map((b, i) => (
                  <motion.div key={b.title} initial={{ opacity:0, x:-16 }} animate={{ opacity:1, x:0 }} transition={{ delay:0.5+i*0.1 }}
                    className="flex items-start gap-3 group">
                    <div className="flex-shrink-0 h-9 w-9 rounded-xl border border-emerald-500/25 bg-emerald-500/10 flex items-center justify-center group-hover:border-emerald-500/50 group-hover:bg-emerald-500/20 group-hover:shadow-[0_0_12px_rgba(16,185,129,0.3)] transition-all duration-300">
                      <b.icon className="h-4 w-4 text-emerald-400" />
                    </div>
                    <div>
                      <p className="text-[11px] font-black text-emerald-300 uppercase tracking-widest">{b.title}</p>
                      <p className="text-[12px] text-zinc-400 mt-0.5">{b.desc}</p>
                    </div>
                  </motion.div>
                ))}
                <div className="pt-3 border-t border-zinc-800/60 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-black text-emerald-300 tracking-widest">Coach Jake</p>
                    <p className="text-[10px] text-zinc-600 uppercase tracking-widest mt-0.5">Basketball Performance Coach</p>
                  </div>
                  <div className="h-8 w-8 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center">
                    <span className="text-xs font-black text-emerald-300">CJ</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <span className="text-[10px] text-zinc-600 uppercase tracking-widest">Scroll</span>
        <motion.div animate={{ y:[0,8,0] }} transition={{ duration:1.5, repeat:Infinity }}
          className="w-5 h-8 rounded-full border border-zinc-700 flex items-start justify-center pt-1.5">
          <div className="w-1 h-2 rounded-full bg-emerald-400" />
        </motion.div>
      </motion.div>
    </section>
  );
}
