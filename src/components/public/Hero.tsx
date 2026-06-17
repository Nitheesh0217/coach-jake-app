"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Zap, Dumbbell, Target, Play } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "EXPLOSIVE POWER",
    desc: "Increase your vertical and first step quickness.",
  },
  {
    icon: Dumbbell,
    title: "STRENGTH & ATHLETICISM",
    desc: "Build lean muscle and move with control.",
  },
  {
    icon: Target,
    title: "GAME-READY RESULTS",
    desc: "Train with purpose. Perform with confidence.",
  },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen bg-[#050816] flex flex-col justify-center overflow-hidden pt-24 pb-16">
      {/* Ambient glow effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-1/2 -left-32 w-96 h-96 bg-emerald-500/20 rounded-full blur-[120px]" />
        <div className="absolute top-1/3 -right-32 w-80 h-80 bg-cyan-500/15 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Hero text and CTA */}
          <div className="space-y-8">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-4 py-2"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">
                Basketball Performance Coaching
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[1.1] tracking-tight"
            >
              <span className="bg-gradient-to-r from-emerald-400 via-emerald-300 to-cyan-400 bg-clip-text text-transparent">
                Explosive Basketball Performance
              </span>
              <br />
              <span className="text-white">for Serious Hoopers</span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-lg text-zinc-300 leading-relaxed max-w-lg"
            >
              Elite training programs designed to increase your vertical, build
              strength, and elevate your game on every level.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 pt-4"
            >
              <Link
                href="/signup"
                className="inline-flex items-center justify-center rounded-full bg-emerald-500 hover:bg-emerald-400 text-black font-black px-8 py-4 shadow-[0_0_30px_rgba(16,185,129,0.5)] hover:shadow-[0_0_50px_rgba(16,185,129,0.7)] transition-all duration-300 hover:-translate-y-1 text-base"
              >
                Start training free
              </Link>
              <button className="inline-flex items-center justify-center gap-3 rounded-full border border-zinc-600 hover:border-emerald-400/50 text-zinc-200 hover:text-white px-8 py-4 transition-all duration-300 text-base group">
                <Play className="w-4 h-4 fill-current" />
                <span>Watch 60s overview</span>
              </button>
            </motion.div>
          </div>

          {/* Right: Premium image panel with features */}
          <div className="flex flex-col gap-8">
            {/* Main image card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative w-full rounded-2xl overflow-hidden border border-white/10 bg-zinc-900/40 backdrop-blur-sm shadow-2xl group"
            >
              <div className="relative h-96 sm:h-[480px] overflow-hidden">
                <img
                  src="https://images.pexels.com/photos/3808517/pexels-photo-3808517.jpeg?auto=compress&cs=tinysrgb&w=1200"
                  alt="Basketball athlete in action"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              </div>

              {/* Glow border effect on hover */}
              <div className="absolute inset-0 rounded-2xl border border-emerald-500/0 group-hover:border-emerald-500/30 transition-colors duration-300" />
            </motion.div>

            {/* Feature list */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="space-y-3"
            >
              {features.map((f, i) => {
                const Icon = f.icon;
                return (
                  <motion.div
                    key={f.title}
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.5 + i * 0.08 }}
                    className="flex items-start gap-3 rounded-xl border border-white/8 bg-white/5 p-3.5 backdrop-blur-sm hover:border-emerald-500/30 hover:bg-emerald-500/10 transition-all duration-200 group/item"
                  >
                    <Icon className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs font-bold text-white uppercase tracking-wider">
                        {f.title}
                      </p>
                      <p className="text-xs text-zinc-400 mt-0.5">{f.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
