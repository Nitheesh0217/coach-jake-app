"use client";

import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight, Zap, Dumbbell, Target } from "lucide-react";
import CursorGlow from "@/components/ui/CursorGlow";
import GradientText from "@/components/ui/GradientText";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 },
};

export default function HeroSection() {
  return (
    <>
      <CursorGlow />
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Left Column */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="space-y-8"
        >
          {/* Badge */}
          <motion.div
            variants={item}
            className="inline-flex items-center gap-2.5 bg-emerald-500/10 border border-emerald-500/30 rounded-full px-3.5 py-1.5 text-xs uppercase tracking-widest text-emerald-300 font-bold"
          >
            <div className="w-2 h-2 rounded-full bg-emerald-400" />
            Basketball Performance Coaching
          </motion.div>

          {/* Headline - Bright Emerald/Cyan */}
          <motion.h1
            variants={item}
            className="font-black text-5xl md:text-7xl tracking-tight leading-[1.05]"
          >
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-cyan-300 to-emerald-400 drop-shadow-[0_0_30px_rgba(16,185,129,0.4)]">
              Explosive Basketball
            </span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-emerald-300 to-cyan-400 drop-shadow-[0_0_30px_rgba(34,211,238,0.3)]">
              Performance for
            </span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-300 drop-shadow-[0_0_30px_rgba(16,185,129,0.4)]">
              Serious Hoopers
            </span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            variants={item}
            className="text-zinc-300 text-base max-w-xl leading-relaxed"
          >
            Elite training programs designed to increase your vertical, build
            strength, and elevate your game on every level.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={item}
            className="flex flex-col sm:flex-row gap-4 pt-4"
          >
            <motion.a
              href="/signup"
              className="btn-primary px-8 py-3.5 text-sm font-bold rounded-full inline-flex items-center justify-center gap-2"
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              Start training free
              <ArrowRight className="w-4 h-4" />
            </motion.a>
            <a
              href="#overview"
              className="rounded-full border border-emerald-500/50 text-emerald-300 hover:bg-emerald-500/10 px-8 py-3.5 text-sm font-semibold transition-all duration-300 inline-flex items-center justify-center gap-2"
            >
              <div className="w-5 h-5 rounded-full border border-emerald-400 flex items-center justify-center text-xs">
                ⏯
              </div>
              Watch 60s overview
            </a>
          </motion.div>

          {/* Stats Row */}
          <motion.div variants={item} className="grid grid-cols-3 gap-3 pt-4">
            {[
              { value: "120+", label: "athletes trained" },
              { value: "Average +3", label: "vertical in 12 weeks" },
              { value: "5+ years", label: "coaching experience" },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                variants={item}
                className="rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.04] hover:border-emerald-500/40 hover:bg-emerald-500/[0.08] px-4 py-3.5 transition-all duration-200"
              >
                <p className="text-lg font-bold text-emerald-300">
                  {stat.value}
                </p>
                <p className="text-xs text-zinc-400 mt-1 font-medium">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right Column - Image + Benefits Panel */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          {/* Main Image Panel */}
          <div className="rounded-3xl border border-emerald-500/30 bg-emerald-950/20 shadow-2xl backdrop-blur-sm overflow-hidden relative h-[500px] md:h-[600px] shadow-emerald-glow-sm">
            <img
              src="/images/basketball-hero.jpg"
              alt="Basketball player jumping"
              className="w-full h-full object-cover absolute inset-0"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/30" />
            <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-emerald-500/10 to-transparent" />
          </div>

          {/* Benefits Card Overlay - Right Side */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="absolute -right-6 bottom-8 w-72 rounded-2xl border border-emerald-500/30 bg-black/80 backdrop-blur-xl p-6 space-y-5 shadow-2xl shadow-emerald-glow-sm"
          >
            {[
              {
                icon: Zap,
                title: "EXPLOSIVE POWER",
                desc: "Increase your vertical and first-step quickness.",
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
            ].map((benefit, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.5 + idx * 0.08 }}
                className="flex gap-3"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
                  <benefit.icon className="w-5 h-5 text-emerald-400" />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-bold text-emerald-300 uppercase tracking-wide">
                    {benefit.title}
                  </p>
                  <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                    {benefit.desc}
                  </p>
                </div>
              </motion.div>
            ))}

            {/* Coach signature */}
            <div className="pt-4 border-t border-emerald-500/20">
              <p className="text-xs text-emerald-300 font-bold tracking-widest">
                Coach Jake
              </p>
              <p className="text-xs text-zinc-500 mt-0.5">
                BASKETBALL PERFORMANCE COACH
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
}
