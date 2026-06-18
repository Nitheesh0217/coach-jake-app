"use client";

import React, { useState, useEffect, useRef, Suspense } from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";

const Spline = dynamic(() => import("@splinetool/react-spline"), {
  ssr: false,
  loading: () => <div className="w-full h-full flex items-center justify-center"><div className="w-12 h-12 rounded-full border-2 border-t-emerald-500 border-white/5 animate-spin" /></div>
});

// Robust Error Boundary to catch WebGL / Canvas creation context failures at runtime
class SplineErrorBoundary extends React.Component<
  { fallback: React.ReactNode; onError: () => void; children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    this.props.onError();
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

// A pure SVG/CSS fallback if Spline fails to load or WebGL fails
function FallbackBall() {
  return (
    <div className="w-full h-full rounded-full bg-gradient-to-br from-[#10b981] via-[#06b6d4] to-[#7B2FFF] p-1 shadow-[0_0_50px_rgba(16,185,129,0.4)] animate-pulse">
      <div className="w-full h-full rounded-full bg-zinc-950 flex items-center justify-center relative overflow-hidden">
        {/* Holographic grid lines inside the fallback ball */}
        <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:14px_24px]" />
        <span className="text-[10px] font-black tracking-widest text-emerald-400">ZERO-G</span>
      </div>
    </div>
  );
}

export default function FloatingBall() {
  const [mounted, setMounted] = useState(false);
  const [splineLoaded, setSplineLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll position
  const { scrollYProgress } = useScroll();
  
  // Transform scroll position into 3D rotation (1440 degrees over full page scroll)
  const rotateXRaw = useTransform(scrollYProgress, [0, 1], [0, 1440]);
  const rotateYRaw = useTransform(scrollYProgress, [0, 1], [0, 720]);
  const yOffsetRaw = useTransform(scrollYProgress, [0, 1], [0, 80]); // slide down slightly as page scrolls
  
  // Apply physics springs for smooth lag/inertia
  const rotateX = useSpring(rotateXRaw, { stiffness: 80, damping: 20 });
  const rotateY = useSpring(rotateYRaw, { stiffness: 80, damping: 20 });
  const yOffset = useSpring(yOffsetRaw, { stiffness: 80, damping: 20 });
  
  useEffect(() => {
    setMounted(true);
    
    // Safety timeout: if Spline takes > 4s, fallback to elegant placeholder
    const timer = setTimeout(() => {
      if (!splineLoaded) {
        setHasError(true);
      }
    }, 4500);
    return () => clearTimeout(timer);
  }, [splineLoaded]);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-10 flex items-center justify-center">
      {/* 3D Ball Container */}
      <motion.div
        ref={containerRef}
        className="w-72 h-72 pointer-events-auto cursor-pointer relative"
        style={{
          y: yOffset,
          perspective: 1000,
        }}
        // Entrance animation on mount
        initial={{ scale: 0, opacity: 0, y: -200 }}
        animate={{ 
          scale: [0, 1.15, 1], 
          opacity: 1, 
          y: 0 
        }}
        transition={{ 
          duration: 1.5, 
          ease: [0.16, 1, 0.3, 1],
          delay: 0.5
        }}
        // Interactive wobbling on hover
        whileHover={{ 
          scale: 1.08,
          rotate: [0, -4, 4, -2, 2, 0],
          transition: { duration: 0.6 }
        }}
        // Slam down click effect
        whileTap={{ 
          scale: 0.88, 
          y: 40,
          rotate: 15,
          transition: { type: "spring", stiffness: 300, damping: 12 }
        }}
      >
        {/* Glow behind the ball */}
        <div className="absolute -inset-4 rounded-full bg-radial-gradient from-emerald-500/15 to-transparent blur-2xl pointer-events-none -z-10 animate-pulse" />

        {/* 3D Spline Canvas or Fallback */}
        <div className="w-full h-full relative" style={{ transformStyle: "preserve-3d" }}>
          <motion.div
            style={{
              rotateX,
              rotateY,
              width: "100%",
              height: "100%",
              transformStyle: "preserve-3d"
            }}
          >
            {!hasError ? (
              <SplineErrorBoundary
                fallback={<FallbackBall />}
                onError={() => setHasError(true)}
              >
                <Suspense fallback={<FallbackBall />}>
                  <Spline
                    scene="https://prod.spline.design/kbKIxYhLg0wP268U/scene.splinecode"
                    onLoad={() => setSplineLoaded(true)}
                    onError={() => setHasError(true)}
                  />
                </Suspense>
              </SplineErrorBoundary>
            ) : (
              <FallbackBall />
            )}
          </motion.div>
        </div>

        {/* Ambient Ring Telemetry Overlay */}
        <div className="absolute inset-[-15px] rounded-full border border-emerald-500/20 pointer-events-none -z-20 animate-spin" style={{ animationDuration: "12s" }} />
        <div className="absolute inset-[-25px] rounded-full border border-cyan-500/10 border-dashed pointer-events-none -z-20 animate-spin" style={{ animationDuration: "20s", animationDirection: "reverse" }} />
      </motion.div>
    </div>
  );
}
