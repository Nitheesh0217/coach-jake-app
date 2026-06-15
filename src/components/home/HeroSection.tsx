"use client";

import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight } from "lucide-react";
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
            className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-3 py-1 text-xs uppercase tracking-widest text-emerald-300"
          >
            <span>⚡</span>
            Basketball Performance Coaching
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={item}
            className="font-black text-5xl md:text-7xl tracking-tight leading-[1.05] text-zinc-50"
          >
            Explosive Basketball Performance for{" "}
            <GradientText as="span" from="emerald-400" to="cyan-400">
              Serious Hoopers
            </GradientText>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            variants={item}
            className="text-zinc-300 text-base max-w-xl leading-relaxed"
          >
            Mobile-first strength, conditioning, and on-court skill work to get
            you stronger, quicker, and game-ready — in the gym or at home.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={item}
            className="flex flex-col sm:flex-row gap-3 pt-4"
          >
            <motion.a
              href="/signup"
              className="btn-primary px-8 py-3 text-sm font-bold"
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              Get Started
              <ArrowRight className="w-4 h-4" />
            </motion.a>
            <a
              href="#overview"
              className="rounded-full border border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/10 px-8 py-3 text-sm font-semibold transition-all duration-300"
            >
              Learn More
            </a>
          </motion.div>

          {/* Stats Row */}
          <motion.div
            variants={item}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4"
          >
            {[
              { value: "500+", label: "Athletes Trained" },
              { value: "92%", label: "Report Improvement" },
              { value: "3", label: "Texas High Schools" },
              { value: "10,000+", label: "Workouts Logged" },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                variants={item}
                className="rounded-2xl border border-white/[0.08] bg-white/[0.03] hover:border-emerald-500/30 hover:bg-emerald-500/[0.04] px-4 py-3 transition-all duration-200"
              >
                <p className="text-2xl font-bold text-emerald-400">
                  {stat.value}
                </p>
                <p className="text-xs text-zinc-300 mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right Column */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-3xl border border-white/[0.08] bg-white/[0.03] shadow-xl backdrop-blur-sm overflow-hidden relative h-[500px] md:h-[600px]"
        >
          <img
            src="/images/hero-panel.jpg"
            alt="Basketball coaching"
            className="w-full h-full object-cover absolute inset-0"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />
          <div className="absolute left-0 top-0 h-full w-1/3 bg-gradient-to-r from-emerald-500/6 to-transparent" />
        </motion.div>
      </div>
    </>
  );
}
