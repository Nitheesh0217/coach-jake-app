"use client";

import dynamic from "next/dynamic";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useRef, useState, useEffect } from "react";

// Lazy load Spline — prevents SSR crash and splits the 3D bundle
const Spline = dynamic(() => import("@splinetool/react-spline"), {
  ssr: false,
  loading: () => <SplineLoader />,
});

// ── Loading Screen ──────────────────────────────────────────────
function SplineLoader() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-[#04030F] z-50">
      <div className="flex flex-col items-center gap-4">
        <motion.div
          className="w-16 h-16 rounded-full border-2 border-[#00C8FF] border-t-transparent"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
        <p className="text-[#00C8FF] text-sm tracking-widest uppercase font-mono mt-2 animate-pulse">
          Initializing Coach Jake...
        </p>
      </div>
    </div>
  );
}

// ── Floating Particle Orbs ──────────────────────────────────────
function FloatingOrbs() {
  const orbs = [
    { size: 300, x: "10%", y: "20%", color: "#00C8FF", delay: 0 },
    { size: 200, x: "80%", y: "60%", color: "#7B2FFF", delay: 1.5 },
    { size: 150, x: "60%", y: "15%", color: "#FF4D6D", delay: 0.8 },
  ];

  return (
    <>
      {orbs.map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full pointer-events-none z-0"
          style={{
            width: orb.size,
            height: orb.size,
            left: orb.x,
            top: orb.y,
            background: `radial-gradient(circle, ${orb.color}18 0%, transparent 70%)`,
            filter: "blur(40px)",
          }}
          animate={{
            y: [0, -30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: orb.delay,
          }}
        />
      ))}
    </>
  );
}

// ── Main Hero ───────────────────────────────────────────────────
export default function HeroSection() {
  const [splineLoaded, setSplineLoaded] = useState(false);
  const [useSpline, setUseSpline] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse parallax tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring-smoothed parallax values for text layer
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });
  const textX = useTransform(springX, [-1, 1], [-12, 12]);
  const textY = useTransform(springY, [-1, 1], [-8, 8]);

  // Fallback timeout: if Spline fails to load in 4.5s, fall back to procedural styling
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!splineLoaded) {
        setUseSpline(false);
      }
    }, 4500);
    return () => clearTimeout(timer);
  }, [splineLoaded]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      mouseX.set((e.clientX / innerWidth - 0.5) * 2);
      mouseY.set((e.clientY / innerHeight - 0.5) * 2);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // Stagger animation variants
  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15, delayChildren: 0.3 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40, filter: "blur(8px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-[#04030F]"
      style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
    >
      {/* ── Ambient Background Orbs ── */}
      <FloatingOrbs />

      {/* ── Spline 3D Scene (full-screen background layer) ── */}
      {useSpline && (
        <div
          className="absolute inset-0 z-0"
          style={{
            opacity: splineLoaded ? 1 : 0,
            transition: "opacity 1.2s ease",
          }}
        >
          <Spline
            scene="https://prod.spline.design/kbKIxYhLg0wP268U/scene.splinecode"
            onLoad={() => setSplineLoaded(true)}
            onError={() => setUseSpline(false)}
            style={{ width: "100%", height: "100%" }}
          />
        </div>
      )}

      {/* ── Cyber fallback grid if spline is bypassed/failed ── */}
      {(!splineLoaded || !useSpline) && (
        <div className="absolute inset-0 z-0 bg-[#04030F]">
          <div className="absolute inset-0 opacity-[0.06] cyber-grid pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-[#00C8FF]/20 to-[#7B2FFF]/10 blur-[100px] animate-pulse" />
        </div>
      )}

      {/* ── Dark gradient overlay so text stays readable over 3D ── */}
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#04030F] via-[#04030F]/70 to-transparent pointer-events-none" />

      {/* ── Hero Text Content (parallax layer) ── */}
      <motion.div
        className="absolute inset-0 z-20 flex flex-col justify-center px-8 md:px-20 lg:px-32 max-w-2xl"
        style={{ x: textX, y: textY }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Badge */}
        <motion.div variants={itemVariants} className="mb-6">
          <span
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs tracking-widest uppercase text-[#00C8FF]"
            style={{
              background: "rgba(0, 200, 255, 0.08)",
              border: "1px solid rgba(0, 200, 255, 0.2)",
              backdropFilter: "blur(12px)",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#00C8FF] animate-pulse" />
            AI-Powered Coaching
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={itemVariants}
          className="text-5xl md:text-7xl font-bold leading-none tracking-tight text-[#E8F0FF] mb-4"
        >
          Train Beyond
          <br />
          <span
            className="text-transparent bg-clip-text"
            style={{
              backgroundImage: "linear-gradient(135deg, #00C8FF, #7B2FFF)",
            }}
          >
            Gravity
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          variants={itemVariants}
          className="text-base md:text-lg text-[#E8F0FF]/60 leading-relaxed mb-10 max-w-md"
        >
          Coach Jake defies limits. Personalized programs, real-time AI
          feedback, and zero excuses — your transformation starts in zero-G.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div variants={itemVariants} className="flex items-center gap-4 flex-wrap">
          {/* Primary CTA */}
          <motion.button
            className="relative px-8 py-4 rounded-2xl text-sm font-semibold text-white tracking-wide overflow-hidden cursor-pointer"
            style={{
              background: "linear-gradient(135deg, #00C8FF, #7B2FFF)",
              boxShadow: "0 0 30px rgba(0, 200, 255, 0.3)",
            }}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 50px rgba(0, 200, 255, 0.5)",
            }}
            whileTap={{ scale: 0.97 }}
          >
            Start Training Free
          </motion.button>

          {/* Secondary CTA */}
          <motion.button
            className="px-8 py-4 rounded-2xl text-sm font-semibold text-[#E8F0FF] tracking-wide cursor-pointer"
            style={{
              background: "rgba(255, 255, 255, 0.04)",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              backdropFilter: "blur(12px)",
            }}
            whileHover={{
              scale: 1.03,
              background: "rgba(255, 255, 255, 0.08)",
            }}
            whileTap={{ scale: 0.97 }}
          >
            Watch Demo →
          </motion.button>
        </motion.div>

        {/* Social Proof */}
        <motion.div
          variants={itemVariants}
          className="mt-10 flex items-center gap-3"
        >
          <div className="flex -space-x-2">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="w-8 h-8 rounded-full border-2 border-[#04030F]"
                style={{
                  background: `hsl(${i * 60 + 200}, 70%, 60%)`,
                }}
              />
            ))}
          </div>
          <p className="text-sm text-[#E8F0FF]/50">
            <span className="text-[#E8F0FF] font-semibold">2,400+</span> athletes
            already training
          </p>
        </motion.div>
      </motion.div>

      {/* ── Scroll Indicator ── */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <p className="text-[10px] tracking-widest uppercase text-[#E8F0FF]/30">
          Scroll
        </p>
        <motion.div
          className="w-px h-10 bg-gradient-to-b from-[#00C8FF] to-transparent"
          animate={{ scaleY: [1, 0.3, 1], opacity: [1, 0.3, 1] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}
