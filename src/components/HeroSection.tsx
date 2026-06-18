"use client";

import Image from "next/image";
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { StatCounter } from "@/components/public/SectionReveal";

// ── Stagger animation variants ────────────────────────────────
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14, delayChildren: 0.25 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 44, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as const },
  },
};

// ── Floating Orbs (ambient colour bleed) ─────────────────────
function AmbientOrbs() {
  return (
    <>
      <motion.div
        className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(16,185,129,0.18) 0%, transparent 70%)", filter: "blur(60px)" }}
        animate={{ scale: [1, 1.12, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(0,200,255,0.12) 0%, transparent 70%)", filter: "blur(80px)" }}
        animate={{ scale: [1, 1.08, 1], opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
    </>
  );
}

// ── Scan-line overlay (cinematic HUD feel) ────────────────────
function ScanLines() {
  return (
    <div
      className="absolute inset-0 z-[1] pointer-events-none"
      style={{
        backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.08) 2px, rgba(0,0,0,0.08) 4px)",
      }}
    />
  );
}

// ── The Floating Athlete Image with 3-D tilt ─────────────────
function AthleteCard({ mouseX, mouseY }: { mouseX: any; mouseY: any }) {
  const rotateX = useTransform(mouseY, [-1, 1], [12, -12]);
  const rotateY = useTransform(mouseX, [-1, 1], [-15, 15]);

  const springRotX = useSpring(rotateX, { stiffness: 60, damping: 18 });
  const springRotY = useSpring(rotateY, { stiffness: 60, damping: 18 });

  return (
    <motion.div
      className="relative w-full max-w-[520px] mx-auto"
      style={{ perspective: 900 }}
      /* Floating bob animation */
      animate={{ y: [0, -22, 0] }}
      transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
    >
      {/* 3-D tilt wrapper */}
      <motion.div
        style={{
          rotateX: springRotX,
          rotateY: springRotY,
          transformStyle: "preserve-3d",
        }}
        className="relative"
      >
        {/* Glow behind image */}
        <motion.div
          className="absolute -inset-6 rounded-3xl pointer-events-none"
          style={{ background: "radial-gradient(ellipse, rgba(16,185,129,0.35) 0%, transparent 70%)", filter: "blur(30px)" }}
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Image frame */}
        <div className="relative rounded-2xl overflow-hidden border border-emerald-500/20 shadow-[0_0_60px_rgba(16,185,129,0.3)]">
          <Image
            src="/hero-dunk.png"
            alt="Athlete mid-dunk with neon green court lighting"
            width={520}
            height={680}
            className="w-full object-cover"
            priority
          />

          {/* Top-edge HUD line */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-400/80 to-transparent" />
          {/* Bottom-edge HUD line */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-400/60 to-transparent" />

          {/* Floating stat chip — top-left */}
          <motion.div
            className="absolute top-4 left-4 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest text-emerald-400"
            style={{ background: "rgba(16,185,129,0.12)", border: "1px solid rgba(16,185,129,0.3)", backdropFilter: "blur(10px)" }}
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          >
            ● LIVE SESSION
          </motion.div>

          {/* Floating stat chip — bottom-right */}
          <motion.div
            className="absolute bottom-4 right-4 px-3 py-2 rounded-xl text-right"
            style={{ background: "rgba(4,3,15,0.7)", border: "1px solid rgba(255,255,255,0.08)", backdropFilter: "blur(12px)" }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.6 }}
          >
            <p className="text-[10px] text-zinc-500 uppercase tracking-widest">VERTICAL</p>
            <p className="text-lg font-black text-white">+<span className="text-emerald-400">3"</span></p>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ── Court HUD background with mouse parallax ─────────────────
function HUDBackground({ mouseX, mouseY }: { mouseX: any; mouseY: any }) {
  const bgX = useTransform(mouseX, [-1, 1], [-18, 18]);
  const bgY = useTransform(mouseY, [-1, 1], [-10, 10]);
  const springX = useSpring(bgX, { stiffness: 30, damping: 20 });
  const springY = useSpring(bgY, { stiffness: 30, damping: 20 });

  return (
    <motion.div
      className="absolute inset-[-4%] z-0"
      style={{ x: springX, y: springY }}
    >
      <Image
        src="/hero-court-hud.png"
        alt="Futuristic HUD basketball court background"
        fill
        className="object-cover"
        priority
        quality={90}
      />
      {/* Dark overlay so text stays legible */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#04030F]/95 via-[#04030F]/75 to-[#04030F]/40" />
      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#04030F] to-transparent" />
    </motion.div>
  );
}

// ── Main Hero ─────────────────────────────────────────────────
export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const rawMouseX = useMotionValue(0);
  const rawMouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      rawMouseX.set((e.clientX / innerWidth - 0.5) * 2);
      rawMouseY.set((e.clientY / innerHeight - 0.5) * 2);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [rawMouseX, rawMouseY]);

  // Smoothed parallax for text
  const textSpringX = useSpring(rawMouseX, { stiffness: 40, damping: 20 });
  const textSpringY = useSpring(rawMouseY, { stiffness: 40, damping: 20 });
  const textX = useTransform(textSpringX, [-1, 1], [-10, 10]);
  const textY = useTransform(textSpringY, [-1, 1], [-6, 6]);

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen overflow-hidden bg-[#04030F]"
      style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
    >
      {/* ── HUD Court Background ── */}
      <HUDBackground mouseX={rawMouseX} mouseY={rawMouseY} />

      {/* ── Scan lines ── */}
      <ScanLines />

      {/* ── Ambient colour orbs ── */}
      <AmbientOrbs />

      {/* ── Main layout grid ── */}
      <div className="relative z-20 min-h-screen flex items-center px-6 md:px-16 lg:px-24 py-24">
        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">

          {/* ── LEFT: Text content ── */}
          <motion.div
            style={{ x: textX, y: textY }}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col"
          >
            {/* Live badge */}
            <motion.div variants={itemVariants} className="mb-6">
              <span
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] tracking-[0.2em] uppercase text-emerald-400 font-bold"
                style={{
                  background: "rgba(16, 185, 129, 0.08)",
                  border: "1px solid rgba(16, 185, 129, 0.25)",
                  backdropFilter: "blur(12px)",
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                AI-Powered Basketball Coaching
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={itemVariants}
              className="text-6xl md:text-7xl xl:text-8xl font-black leading-[0.9] tracking-tight text-white mb-5"
            >
              Train
              <br />
              <span
                className="text-transparent bg-clip-text"
                style={{ backgroundImage: "linear-gradient(135deg, #10b981, #00C8FF 60%, #7B2FFF)" }}
              >
                Beyond
              </span>
              <br />
              <span className="text-white">Gravity.</span>
            </motion.h1>

            {/* Sub */}
            <motion.p
              variants={itemVariants}
              className="text-base md:text-lg text-zinc-400 leading-relaxed mb-10 max-w-[440px]"
            >
              Coach Jake defies limits. Personalised programs, real-time AI
              feedback, and zero excuses — your transformation starts in zero-G.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={itemVariants} className="flex items-center gap-4 flex-wrap mb-12">
              <motion.a
                href="/login"
                className="relative px-8 py-4 rounded-2xl text-sm font-black text-black tracking-wide overflow-hidden cursor-pointer"
                style={{
                  background: "linear-gradient(135deg, #10b981, #00C8FF)",
                  boxShadow: "0 0 40px rgba(16,185,129,0.4)",
                }}
                whileHover={{ scale: 1.06, boxShadow: "0 0 60px rgba(16,185,129,0.6)" }}
                whileTap={{ scale: 0.96 }}
              >
                Start Training Free →
              </motion.a>

              <motion.a
                href="#programs"
                className="px-8 py-4 rounded-2xl text-sm font-bold text-white tracking-wide cursor-pointer"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  backdropFilter: "blur(12px)",
                }}
                whileHover={{ scale: 1.04, background: "rgba(255,255,255,0.08)" }}
                whileTap={{ scale: 0.97 }}
              >
                View Programs
              </motion.a>
            </motion.div>

            {/* Social proof + stats row */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-6">
              {/* Avatars */}
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  {[200, 260, 320, 380].map((hue, i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full border-2 border-[#04030F]"
                      style={{ background: `hsl(${hue},60%,55%)` }}
                    />
                  ))}
                </div>
                <p className="text-sm text-zinc-400 font-bold">
                  <StatCounter value="2,400+" /> athletes training
                </p>
              </div>

              {/* Divider */}
              <div className="w-px h-8 bg-zinc-700 hidden sm:block" />

              {/* Stats */}
              {[
                { value: "94%", label: "Completion Rate" },
                { value: "3.2×", label: "Faster Gains" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-xl font-black text-emerald-400">
                    <StatCounter value={stat.value} />
                  </p>
                  <p className="text-[10px] text-zinc-500 uppercase tracking-widest">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* ── RIGHT: 3-D floating athlete card ── */}
          <motion.div
            initial={{ opacity: 0, x: 60, scale: 0.92 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 1.1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="hidden lg:flex justify-center items-center"
          >
            <AthleteCard mouseX={rawMouseX} mouseY={rawMouseY} />
          </motion.div>

        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
      >
        <p className="text-[9px] tracking-[0.3em] uppercase text-zinc-600">Scroll</p>
        <motion.div
          className="w-px h-10 bg-gradient-to-b from-emerald-400 to-transparent"
          animate={{ scaleY: [1, 0.3, 1], opacity: [1, 0.3, 1] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}
