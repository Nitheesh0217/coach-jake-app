"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";

/* ── Particle cloud ── */
function Particles() {
  const [dots] = useState(() =>
    Array.from({ length: 80 }, (_, i) => ({
      id: i,
      top:  `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: 1 + Math.random() * 2,
      delay: Math.random() * 6,
      dur:   3 + Math.random() * 5,
      color: i % 5 === 0 ? "#f59e0b" : i % 4 === 0 ? "#06b6d4" : "#10b981",
    }))
  );
  return (
    <>
      {dots.map((d) => (
        <motion.div
          key={d.id}
          className="absolute rounded-full pointer-events-none"
          style={{ top: d.top, left: d.left, width: d.size, height: d.size, background: d.color }}
          animate={{ opacity: [0, 0.7, 0], y: [0, -40, -80], scale: [0.5, 1, 0.3] }}
          transition={{ duration: d.dur, repeat: Infinity, delay: d.delay, ease: "easeOut" }}
        />
      ))}
    </>
  );
}

export default function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const [activeConsole, setActiveConsole] = useState<"card" | "court">("card");
  const [activePlay, setActivePlay] = useState<number>(0);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const rawY  = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const rawOp = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const y     = useSpring(rawY, { stiffness: 60, damping: 18 });

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
      className="relative w-full overflow-hidden bg-[#050816]"
      style={{ minHeight: "100svh" }}
    >
      {/* ════════════════════════════════════
          BACKGROUND — pure CSS, no Three.js
         ════════════════════════════════════ */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">

        {/* Fine grid */}
        <div className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.025) 1px,transparent 1px)," +
              "linear-gradient(90deg,rgba(255,255,255,0.025) 1px,transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />

        {/* ── BASKETBALL GLOW CORE ── */}
        {/* Outer ambient — huge orange haze */}
        <motion.div
          animate={{ scale: [1, 1.06, 1], opacity: [0.55, 0.75, 0.55] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute rounded-full"
          style={{
            top: "50%", left: "58%",
            width: 900, height: 900,
            transform: "translate(-50%,-52%)",
            background: "radial-gradient(circle, rgba(234,88,12,0.28) 0%, rgba(245,158,11,0.12) 35%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
        {/* Mid glow — bright amber */}
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.65, 0.9, 0.65] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute rounded-full"
          style={{
            top: "50%", left: "58%",
            width: 500, height: 500,
            transform: "translate(-50%,-52%)",
            background: "radial-gradient(circle, rgba(251,146,60,0.55) 0%, rgba(234,88,12,0.3) 45%, transparent 75%)",
            filter: "blur(30px)",
          }}
        />
        {/* Core — hot white-orange center */}
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.75, 1, 0.75] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute rounded-full"
          style={{
            top: "50%", left: "58%",
            width: 200, height: 200,
            transform: "translate(-50%,-52%)",
            background: "radial-gradient(circle, rgba(255,255,220,0.9) 0%, rgba(251,191,36,0.7) 30%, rgba(234,88,12,0.4) 65%, transparent 100%)",
            filter: "blur(8px)",
          }}
        />

        {/* ── LENS FLARES ── */}
        {/* Horizontal streak */}
        <motion.div
          animate={{ opacity: [0.18, 0.38, 0.18], scaleX: [0.8, 1.1, 0.8] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute"
          style={{
            top: "calc(50% - 52%/2 - 1px)",
            left: 0, right: 0,
            height: 2,
            background: "linear-gradient(90deg, transparent 0%, rgba(251,191,36,0.6) 40%, rgba(255,255,255,0.9) 58%, rgba(251,191,36,0.6) 70%, transparent 100%)",
          }}
        />
        {/* Vertical streak */}
        <motion.div
          animate={{ opacity: [0.12, 0.28, 0.12], scaleY: [0.8, 1.1, 0.8] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="absolute"
          style={{
            left: "58%",
            top: 0, bottom: 0,
            width: 2,
            background: "linear-gradient(180deg, transparent 0%, rgba(251,191,36,0.4) 35%, rgba(255,255,255,0.8) 50%, rgba(251,191,36,0.4) 65%, transparent 100%)",
          }}
        />
        {/* Diagonal flare 1 */}
        <motion.div
          animate={{ opacity: [0, 0.22, 0], rotate: [45, 45, 45] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute"
          style={{
            top: "50%", left: "58%",
            width: 600, height: 1,
            transform: "translate(-50%,-50%) rotate(45deg)",
            background: "linear-gradient(90deg, transparent, rgba(251,191,36,0.5) 50%, transparent)",
          }}
        />
        {/* Diagonal flare 2 */}
        <motion.div
          animate={{ opacity: [0, 0.18, 0], rotate: [-45, -45, -45] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
          className="absolute"
          style={{
            top: "50%", left: "58%",
            width: 500, height: 1,
            transform: "translate(-50%,-50%) rotate(-45deg)",
            background: "linear-gradient(90deg, transparent, rgba(255,200,100,0.5) 50%, transparent)",
          }}
        />

        {/* ── BASKETBALL SPHERE ── */}
        {/* Shadow/reflection on floor */}
        <div
          className="absolute"
          style={{
            bottom: "15%", left: "58%",
            width: 260, height: 40,
            transform: "translateX(-50%)",
            background: "radial-gradient(ellipse, rgba(234,88,12,0.35) 0%, transparent 70%)",
            filter: "blur(14px)",
          }}
        />
        {/* Hardwood floor reflection — subtle gradient */}
        <div
          className="absolute bottom-0 left-0 right-0"
          style={{
            height: "35%",
            background: "linear-gradient(180deg, transparent 0%, rgba(180,100,20,0.04) 60%, rgba(120,60,10,0.08) 100%)",
          }}
        />
        {/* Floor lines (hardwood) */}
        {[20, 40, 60, 80].map((pct) => (
          <div key={pct} className="absolute bottom-0 left-0 right-0"
            style={{
              height: 1,
              bottom: `${pct * 0.35}%`,
              background: "rgba(160,100,40,0.06)",
            }}
          />
        ))}

        {/* Basketball image */}
        <motion.div
          animate={{ y: [-8, 8, -8], rotate: [-3, 3, -3] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute"
          style={{ top: "50%", left: "58%", transform: "translate(-50%,-55%)" }}
        >
          {/* Ball body */}
          <div
            className="relative"
            style={{ width: 280, height: 280 }}
          >
            {/* Base sphere */}
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: "radial-gradient(circle at 35% 35%, #f97316 0%, #ea580c 40%, #c2410c 70%, #7c2d12 100%)",
                boxShadow:
                  "0 0 80px 30px rgba(234,88,12,0.6), 0 0 160px 60px rgba(234,88,12,0.3), inset -20px -20px 40px rgba(0,0,0,0.5), inset 10px 10px 30px rgba(255,160,80,0.4)",
              }}
            />
            {/* Specular highlight */}
            <div
              className="absolute rounded-full"
              style={{
                top: "12%", left: "18%",
                width: "35%", height: "28%",
                background: "radial-gradient(ellipse, rgba(255,255,255,0.45) 0%, transparent 70%)",
                filter: "blur(4px)",
              }}
            />
            {/* Ball seam lines */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 280 280" fill="none">
              {/* Vertical seam */}
              <path d="M 140 5 Q 165 70 165 140 Q 165 210 140 275" stroke="rgba(100,30,0,0.6)" strokeWidth="2.5" fill="none" />
              <path d="M 140 5 Q 115 70 115 140 Q 115 210 140 275" stroke="rgba(100,30,0,0.6)" strokeWidth="2.5" fill="none" />
              {/* Horizontal seam */}
              <path d="M 5 140 Q 70 115 140 115 Q 210 115 275 140" stroke="rgba(100,30,0,0.6)" strokeWidth="2.5" fill="none" />
              <path d="M 5 140 Q 70 165 140 165 Q 210 165 275 140" stroke="rgba(100,30,0,0.6)" strokeWidth="2.5" fill="none" />
            </svg>
          </div>
        </motion.div>

        {/* ── ACCENT GLOWS ── */}
        {/* Cyan/teal left accent */}
        <div
          className="absolute"
          style={{
            top: "30%", left: "5%",
            width: 350, height: 350,
            background: "radial-gradient(circle, rgba(6,182,212,0.09) 0%, transparent 70%)",
            filter: "blur(50px)",
          }}
        />
        {/* Emerald bottom accent */}
        <div
          className="absolute"
          style={{
            bottom: "-5%", left: "30%",
            width: 400, height: 300,
            background: "radial-gradient(circle, rgba(16,185,129,0.08) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />

        {/* ── CONCENTRIC RINGS around ball ── */}
        {[350, 500, 680].map((size, i) => (
          <motion.div
            key={size}
            animate={{ opacity: [0.06, 0.14, 0.06], scale: [0.97, 1.03, 0.97] }}
            transition={{ duration: 3 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.8 }}
            className="absolute rounded-full"
            style={{
              top: "50%", left: "58%",
              width: size, height: size,
              transform: "translate(-50%,-52%)",
              border: `1px solid rgba(251,146,60,${0.12 - i * 0.03})`,
            }}
          />
        ))}

        {/* Particles */}
        <Particles />
      </div>

      {/* ════════════════════════════════════
          CINEMATIC TYPOGRAPHY — MAIN CONTENT
         ════════════════════════════════════ */}
      <motion.div
        style={{ y, opacity: rawOp }}
        className="relative z-10 flex items-center min-h-[100svh]"
      >
        <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-28 pb-24">
          <div className="max-w-3xl">

            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="mb-8"
            >
              <span className="inline-flex items-center gap-2.5 text-[11px] font-black uppercase tracking-[0.25em] text-zinc-400">
                <span
                  className="inline-block w-8 h-px"
                  style={{ background: "linear-gradient(90deg,#f59e0b,transparent)" }}
                />
                Coach Jake · AI-Powered Basketball Platform
                <span
                  className="inline-block w-8 h-px"
                  style={{ background: "linear-gradient(90deg,transparent,#f59e0b)" }}
                />
              </span>
            </motion.div>

            {/* ── STACKED HEADLINE ── */}
            <div className="space-y-1 mb-8">
              {/* LINE 1 — TRAIN SMARTER */}
              <motion.div
                initial={{ opacity: 0, x: -60 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.75, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                <h1
                  className="font-black text-white leading-none tracking-tight uppercase"
                  style={{
                    fontSize: "clamp(3.5rem, 10vw, 8rem)",
                    textShadow: "0 0 80px rgba(255,255,255,0.08)",
                  }}
                >
                  Train Smarter
                </h1>
              </motion.div>

              {/* LINE 2 — TRACK EVERYTHING */}
              <motion.div
                initial={{ opacity: 0, x: -60 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.75, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
              >
                <h1
                  className="font-black text-white leading-none tracking-tight uppercase"
                  style={{
                    fontSize: "clamp(3.5rem, 10vw, 8rem)",
                    textShadow: "0 0 80px rgba(255,255,255,0.08)",
                  }}
                >
                  Track Everything
                </h1>
              </motion.div>

              {/* LINE 3 — LEVEL UP (orange) */}
              <motion.div
                initial={{ opacity: 0, x: -60 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.75, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
              >
                <h1
                  className="font-black leading-none tracking-tight uppercase"
                  style={{
                    fontSize: "clamp(3.5rem, 10vw, 8rem)",
                    color: "#f97316",
                    textShadow: "0 0 60px rgba(249,115,22,0.7), 0 0 120px rgba(234,88,12,0.4)",
                  }}
                >
                  Level Up
                </h1>
              </motion.div>
            </div>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.44 }}
              className="text-zinc-400 mb-10 leading-relaxed"
              style={{ fontSize: "clamp(1rem, 2vw, 1.2rem)", maxWidth: "38rem" }}
            >
              Coach Jake — AI-Powered Basketball Fitness Platform. Personalized
              workouts, real-time tracking, and coach-assigned programs that
              actually move the needle.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.54 }}
              className="flex flex-wrap gap-4 mb-16"
            >
              <motion.a
                href="/signup"
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="group inline-flex items-center gap-2 rounded-none font-black uppercase tracking-widest text-sm text-black px-10 py-4 transition-all duration-300"
                style={{
                  background: "linear-gradient(135deg,#f97316,#ea580c)",
                  boxShadow: "0 0 30px rgba(249,115,22,0.5), 0 0 60px rgba(234,88,12,0.2)",
                  clipPath: "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))",
                }}
              >
                Start Training Free
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.a>

              <motion.a
                href="/login"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 font-semibold text-sm text-zinc-300 hover:text-white transition-colors px-8 py-4 border border-zinc-700 hover:border-zinc-500"
                style={{
                  clipPath: "polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))",
                }}
              >
                Sign In
              </motion.a>
            </motion.div>

            {/* Stats strip */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.64 }}
              className="flex items-center gap-8 flex-wrap"
            >
              {[
                { val: "120+", lbl: "Athletes Trained" },
                { val: '+3"',  lbl: "Avg Vertical Gain" },
                { val: "98%",  lbl: "Completion Rate"   },
                { val: "5+",   lbl: "Years Coaching"    },
              ].map((s, i) => (
                <div key={s.lbl} className="flex items-center gap-3">
                  {i > 0 && <div className="w-px h-8 bg-zinc-800" />}
                  <div>
                    <p className="font-black text-white tabular-nums" style={{ fontSize: "clamp(1.3rem,2.5vw,1.75rem)", color: i === 0 ? "#f97316" : "white" }}>{s.val}</p>
                    <p className="text-[11px] text-zinc-600 uppercase tracking-widest font-semibold">{s.lbl}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity }}
        >
          <ChevronDown className="w-5 h-5 text-zinc-600" />
        </motion.div>
      </motion.div>
    </section>
  );
}


