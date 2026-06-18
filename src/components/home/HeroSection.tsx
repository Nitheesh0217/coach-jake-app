"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowRight } from "lucide-react";
import dynamic from "next/dynamic";

// ── DYNAMIC 3D IMPORTS (Prevents SSR execution errors) ──

const PlayerCard3D = dynamic(() => import("@/components/3d/PlayerCard3D"), {
  ssr: false,
  loading: () => <div className="w-full h-[450px] bg-zinc-950/60 rounded-3xl animate-pulse border border-white/5" />,
});

const TacticalPlayground3D = dynamic(() => import("@/components/3d/TacticalPlayground3D"), {
  ssr: false,
  loading: () => <div className="w-full h-[450px] bg-zinc-950/60 rounded-3xl animate-pulse border border-white/5" />,
});

const STATS = [
  { value: "120+", label: "athletes trained",     color: "text-emerald-400" },
  { value: '+3"',  label: "vertical in 12 weeks", color: "text-cyan-400"    },
  { value: "5+",   label: "years coaching",        color: "text-amber-400"   },
];

export default function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const [activeConsole, setActiveConsole] = useState<"card" | "court">("card");
  const [activePlay, setActivePlay] = useState<number>(0);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const rawY   = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const rawOp  = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const y      = useSpring(rawY, { stiffness: 80, damping: 20 });

  // Cursor tracker for Z-index 40 interactive lighting overlay
  useEffect(() => {
    const updateMousePos = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", updateMousePos);
    return () => window.removeEventListener("mousemove", updateMousePos);
  }, []);

  return (
    <section
      ref={ref}
      className="relative w-full bg-[#050816] overflow-hidden"
      style={{ minHeight: "100svh" }}
    >
      {/* ── LAYER 1 (Z-index: 10): 3D Canvas World — Mounted Globally at Root Layout ── */}

      {/* ── LAYER 2 (Z-index: 20): Interface Grid Overlay & Scanlines ── */}
      <div className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-b from-[#050816]/40 via-[#050816]/10 to-[#050816]" />
      <div className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-r from-[#050816]/75 via-transparent to-transparent" />
      <div className="absolute inset-0 z-20 pointer-events-none opacity-[0.035] cyber-grid" />
      <div className="absolute inset-0 z-20 pointer-events-none cyber-scanlines opacity-[0.25]" />

      {/* ── LAYER 3 (Z-index: 30): Content HUD Layer ── */}
      <motion.div
        style={{ y, opacity: rawOp }}
        className="relative z-30 flex items-center min-h-[100svh] w-full"
      >
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* ── LEFT: Copy / Stats ── */}
            <div className="space-y-8">
              {/* Badge */}
              <motion.span
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="inline-flex items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-500/10 backdrop-blur-sm px-4 py-2 text-[11px] font-black uppercase tracking-widest text-emerald-300"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#10b981]" />
                Basketball Performance Coaching
              </motion.span>

              {/* Headline */}
              <div className="space-y-0">
                {["Explosive", "Basketball", "Performance"].map((word, i) => (
                  <motion.div
                    key={word}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.1 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <span className="block text-[clamp(2.8rem,7vw,5rem)] font-black leading-[1.05] tracking-tight bg-gradient-to-r from-emerald-300 via-cyan-200 to-emerald-400 bg-clip-text text-transparent">
                      {word}
                    </span>
                  </motion.div>
                ))}
                <motion.span
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.46, ease: [0.22, 1, 0.36, 1] }}
                  className="block text-[clamp(2.8rem,7vw,5rem)] font-black leading-[1.05] tracking-tight text-white"
                >
                  for Serious Hoopers
                </motion.span>
              </div>

              {/* Sub */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.58 }}
                className="text-zinc-400 text-lg leading-relaxed max-w-lg"
              >
                Elite training programs designed to increase your vertical, build strength, and elevate your game on every level.
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.68 }}
                className="flex flex-wrap gap-4"
              >
                <motion.a
                  href="/signup"
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="group inline-flex items-center gap-2 rounded-full bg-emerald-500 px-8 py-4 text-sm font-black text-black shadow-[0_0_30px_rgba(16,185,129,0.55)] hover:bg-emerald-400 hover:shadow-[0_0_50px_rgba(16,185,129,0.85)] transition-all duration-300"
                >
                  Start training free
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </motion.a>
                <motion.a
                  href="#programs"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-3 rounded-full border border-zinc-700/80 bg-zinc-900/50 backdrop-blur-sm px-7 py-4 text-sm font-semibold text-zinc-200 hover:border-emerald-500/50 hover:text-white transition-all duration-300"
                >
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-emerald-500/40 bg-emerald-500/10 text-[10px]">▶</span>
                  Watch 60s overview
                </motion.a>
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.78 }}
                className="grid grid-cols-3 gap-3"
              >
                {STATS.map((s) => (
                  <motion.div
                    key={s.label}
                    whileHover={{ y: -4, scale: 1.03 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="rounded-2xl border border-zinc-800/80 bg-zinc-900/70 backdrop-blur-sm px-3 py-3.5 hover:border-emerald-500/30 transition-colors cursor-default"
                  >
                    <p className={`text-2xl font-black tabular-nums ${s.color}`}>{s.value}</p>
                    <p className="text-[11px] text-zinc-500 mt-0.5 leading-tight">{s.label}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* ── RIGHT: Futuristic Console HUD ── */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="hidden lg:block relative w-full max-w-[440px] ml-auto"
            >
              <div className="absolute -inset-6 rounded-[3rem] bg-gradient-to-br from-emerald-500/10 via-transparent to-cyan-500/8 blur-3xl pointer-events-none" />

              {/* HUD Selector Tabs */}
              <div className="flex gap-2.5 p-1 rounded-xl bg-zinc-950/60 border border-white/5 backdrop-blur-md mb-4 shadow-lg">
                <button
                  onClick={() => setActiveConsole("card")}
                  className={`flex-1 py-2 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all duration-300 ${
                    activeConsole === "card"
                      ? "bg-emerald-500 text-black shadow-[0_0_15px_rgba(16,185,129,0.35)]"
                      : "text-zinc-500 hover:text-zinc-300"
                  }`}
                >
                  Player Cards
                </button>
                <button
                  onClick={() => setActiveConsole("court")}
                  className={`flex-1 py-2 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all duration-300 ${
                    activeConsole === "court"
                      ? "bg-cyan-500 text-black shadow-[0_0_15px_rgba(6,182,212,0.35)]"
                      : "text-zinc-500 hover:text-zinc-300"
                  }`}
                >
                  Tactical Board
                </button>
              </div>

              {/* active panel */}
              <div className="relative min-h-[460px] flex flex-col justify-between">
                {activeConsole === "card" ? (
                  <PlayerCard3D />
                ) : (
                  <div className="w-full flex flex-col gap-4">
                    <div className="h-[370px]">
                      <TacticalPlayground3D activeProgram={activePlay} />
                    </div>

                    <div className="flex gap-2 p-1 rounded-xl bg-zinc-950/70 border border-white/5">
                      {["PLYOMETRICS", "PICK & ROLL", "SKILLS DRILL"].map((name, i) => (
                        <button
                          key={name}
                          onClick={() => setActivePlay(i)}
                          className={`flex-1 py-2 rounded-lg text-[9px] font-black tracking-widest transition-all duration-200 ${
                            activePlay === i
                              ? "bg-zinc-800 text-cyan-400 border border-cyan-500/20 shadow-[0_0_10px_rgba(6,182,212,0.1)]"
                              : "text-zinc-600 hover:text-zinc-400"
                          }`}
                        >
                          {name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>

          </div>
        </div>
      </motion.div>

      {/* ── LAYER 4 (Z-index: 40): Cursor Glow / Lighting Overlay ── */}
      <div
        className="pointer-events-none fixed inset-0 z-40 transition-opacity duration-300 hidden md:block"
        style={{
          background: `radial-gradient(550px circle at ${mousePos.x}px ${mousePos.y}px, rgba(16, 185, 129, 0.05), transparent 75%)`,
        }}
      />

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] text-zinc-600 uppercase tracking-widest font-semibold">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-5 h-8 rounded-full border border-zinc-700 flex items-start justify-center pt-1.5"
        >
          <div className="w-1 h-2 rounded-full bg-emerald-400" />
        </motion.div>
      </motion.div>
    </section>
  );
}


