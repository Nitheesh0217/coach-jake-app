"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Zap, Dumbbell, Target } from "lucide-react";

const stats = [
  { value: "120+", label: "athletes trained" },
  { value: "Average +3\"", label: "vertical in 12 weeks" },
  { value: "5+ years", label: "coaching experience" },
];

const features = [
  { icon: Zap, title: "EXPLOSIVE POWER", desc: "Increase your vertical and first step quickness." },
  { icon: Dumbbell, title: "STRENGTH & ATHLETICISM", desc: "Build lean muscle and move with control." },
  { icon: Target, title: "GAME-READY RESULTS", desc: "Train with purpose. Perform with confidence." },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen bg-transparent flex flex-col justify-center overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/3808517/pexels-photo-3808517.jpeg?auto=compress&cs=tinysrgb&w=1920')",
        }}
        aria-hidden
      />
      {/* Strong dark overlay */}
      <div className="absolute inset-0 bg-black/70 z-0" aria-hidden />
      {/* Left green glow */}
      <div className="absolute left-0 top-1/3 w-[500px] h-[500px] rounded-full bg-emerald-500/15 blur-[140px] z-0" aria-hidden />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="grid lg:grid-cols-5 gap-12 items-center">
          {/* Left: Hero text */}
          <div className="lg:col-span-3 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-4 py-1.5"
            >
              <div className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-300">
                Basketball Performance Coaching
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight"
            >
              <span className="bg-gradient-to-r from-emerald-400 via-emerald-300 to-cyan-400 bg-clip-text text-transparent">
                Explosive Basketball Performance
              </span>{" "}
              <span className="text-white">for Serious Hoopers</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-zinc-300 text-lg leading-relaxed max-w-xl"
            >
              Elite training programs designed to increase your vertical, build strength, and elevate your game on every level.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link
                href="/signup"
                className="inline-flex items-center justify-center rounded-full bg-emerald-500 hover:bg-emerald-400 text-black font-black px-8 py-4 shadow-[0_0_30px_rgba(16,185,129,0.5)] hover:shadow-[0_0_50px_rgba(16,185,129,0.7)] transition-all duration-300 hover:-translate-y-0.5 text-base"
              >
                Start training free
              </Link>
              <a
                href="#overview"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-zinc-600 hover:border-zinc-400 text-zinc-200 hover:text-white px-8 py-4 transition-all duration-300 text-base"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
                Watch 60s overview
              </a>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="grid grid-cols-3 gap-4 pt-4"
            >
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm px-4 py-3 hover:border-emerald-500/30 transition-all duration-200"
                >
                  <p className="text-xl sm:text-2xl font-black text-emerald-400">{s.value}</p>
                  <p className="text-xs text-zinc-400 mt-1 leading-tight">{s.label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: Photo + feature pills */}
          <div className="lg:col-span-2 flex flex-col items-center gap-6">
            {/* Main photo card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="relative w-full rounded-2xl overflow-hidden border border-white/10 bg-zinc-900/40 backdrop-blur-sm shadow-2xl"
            >
              <img
                src="https://images.pexels.com/photos/3839969/pexels-photo-3839969.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Basketball performance"
                className="w-full h-64 sm:h-80 lg:h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

              {/* Signature */}
              <div className="absolute bottom-4 right-4 text-right">
                <p className="text-emerald-400 font-bold italic text-lg" style={{ fontFamily: "cursive" }}>Coach Jake</p>
                <p className="text-xs text-zinc-400 uppercase tracking-wider">Basketball Performance Coach</p>
              </div>
            </motion.div>

            {/* Feature pills */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="w-full space-y-3"
            >
              {features.map((f) => {
                const Icon = f.icon;
                return (
                  <div
                    key={f.title}
                    className="flex items-start gap-3 rounded-xl border border-white/8 bg-white/5 backdrop-blur-sm px-4 py-3 hover:border-emerald-500/30 transition-all duration-200"
                  >
                    <Icon className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-black text-white uppercase tracking-wider">{f.title}</p>
                      <p className="text-xs text-zinc-400 mt-0.5">{f.desc}</p>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
