"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

// ── 1. STAT COUNTER WITH GREEN BLUR TRAIL ──
interface StatCounterProps {
  value: string;
  duration?: number;
}

export function StatCounter({ value, duration = 1.8 }: StatCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [displayValue, setDisplayValue] = useState("0");
  const [blurAmount, setBlurAmount] = useState(0);

  useEffect(() => {
    if (!inView) return;

    const cleanValue = value.replace(/,/g, "");
    const match = cleanValue.match(/[\d.]+/);
    if (!match) {
      setDisplayValue(value);
      return;
    }
    const targetNum = parseFloat(match[0]);
    const suffix = cleanValue.replace(match[0], "");

    const isFloat = match[0].includes(".");
    const decimals = isFloat ? match[0].split(".")[1].length : 0;

    let startTime: number | null = null;
    setBlurAmount(8);

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      const currentVal = progress * targetNum;
      
      let formattedVal = currentVal.toFixed(decimals);
      if (!isFloat) {
        formattedVal = Math.floor(currentVal).toLocaleString("en-US");
      }
      
      setDisplayValue(formattedVal + suffix);
      setBlurAmount(Math.max(8 * (1 - progress), 0));

      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setDisplayValue(value);
        setBlurAmount(0);
      }
    };

    window.requestAnimationFrame(step);
  }, [inView, value, duration]);

  return (
    <motion.span
      ref={ref}
      animate={{ filter: `blur(${blurAmount}px)` }}
      className="text-emerald-400 font-black transition-all"
    >
      {displayValue}
    </motion.span>
  );
}

// ── 2. HERO TEXT CHARACTER REVEAL ──
interface HeroTextRevealProps {
  text: string;
  className?: string;
}

export function HeroTextReveal({ text, className = "" }: HeroTextRevealProps) {
  const letters = Array.from(text);
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.02, delayChildren: 0.05 },
    },
  };
  
  const letterVariants = {
    hidden: {
      opacity: 0,
      x: 15,
      filter: "blur(5px)",
      letterSpacing: "0.15em",
    },
    visible: {
      opacity: 1,
      x: 0,
      filter: "blur(0px)",
      letterSpacing: "0.0em",
      transition: {
        type: "spring" as any,
        damping: 14,
        stiffness: 90,
      },
    },
  };

  return (
    <motion.span
      className={`inline-block ${className}`}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
    >
      {letters.map((char, index) => (
        <motion.span key={index} variants={letterVariants} className="inline-block">
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.span>
  );
}

// ── 3. 3D ROTATION SLIDE REVEAL ──
interface Slide3DRevealProps {
  children: React.ReactNode;
  direction?: "left" | "right";
  delay?: number;
  className?: string;
}

export function Slide3DReveal({ 
  children, 
  direction = "left", 
  delay = 0,
  className = ""
}: Slide3DRevealProps) {
  const startX = direction === "left" ? -80 : 80;
  const startRotateY = direction === "left" ? 12 : -12;

  return (
    <motion.div
      initial={{ opacity: 0, x: startX, rotateY: startRotateY }}
      whileInView={{ 
        opacity: 1, 
        x: 0, 
        rotateY: 0,
        transition: { 
          duration: 0.9, 
          delay,
          ease: [0.16, 1, 0.3, 1] 
        } 
      }}
      viewport={{ once: true, margin: "-85px" }}
      style={{ perspective: 1200, transformStyle: "preserve-3d" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ── 4. GENERAL FADE-IN WRAPPER ──
interface FadeRevealProps {
  children: React.ReactNode;
  delay?: number;
  yOffset?: number;
  className?: string;
}

export function FadeReveal({ 
  children, 
  delay = 0, 
  yOffset = 25,
  className = ""
}: FadeRevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset }}
      whileInView={{ 
        opacity: 1, 
        y: 0,
        transition: { 
          duration: 0.8, 
          delay, 
          ease: [0.22, 1, 0.36, 1] 
        } 
      }}
      viewport={{ once: true, margin: "-60px" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
