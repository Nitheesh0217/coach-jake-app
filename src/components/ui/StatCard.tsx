"use client";

import { useEffect, useRef, useState } from "react";
import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown } from "lucide-react";

type AccentColor = "emerald" | "sky" | "violet" | "amber";

const accentMap: Record<
  AccentColor,
  { text: string; bg: string; border: string }
> = {
  emerald: {
    text: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
  },
  sky: {
    text: "text-sky-400",
    bg: "bg-sky-500/10",
    border: "border-sky-500/20",
  },
  violet: {
    text: "text-violet-400",
    bg: "bg-violet-500/10",
    border: "border-violet-500/20",
  },
  amber: {
    text: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
  },
};

interface Trend {
  direction: "up" | "down" | "neutral";
  label: string;
}

interface StatCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  iconColor?: AccentColor;
  trend?: Trend;
  countUp?: boolean;
  delay?: number;
  loading?: boolean;
}

export default function StatCard({
  label,
  value,
  icon: Icon,
  iconColor = "emerald",
  trend,
  countUp = true,
  delay = 0,
  loading = false,
}: StatCardProps) {
  const colors = accentMap[iconColor];
  const [displayValue, setDisplayValue] = useState<number>(0);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    if (loading || typeof value === "string" || !countUp) {
      return;
    }

    const startTime = Date.now();
    const duration = 1200; // 1.2 seconds
    const target = Number(value);
    const startValue = 0;

    const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutExpo(progress);
      const current = Math.floor(startValue + (target - startValue) * eased);
      setDisplayValue(current);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [value, countUp, loading]);

  const displayValueToRender = (typeof value === "string" || !countUp) ? value : displayValue;

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="glass-card p-5"
      >
        <div className="space-y-3">
          <div
            className={`w-10 h-10 rounded-xl ${colors.bg} ${colors.border} border animate-pulse`}
          />
          <div className="space-y-2">
            <div className="h-8 w-16 rounded-lg bg-zinc-800 animate-pulse" />
            <div className="h-3 w-20 rounded-lg bg-zinc-800 animate-pulse" />
          </div>
        </div>
      </motion.div>
    );
  }

  const trendColor =
    trend?.direction === "up"
      ? "text-emerald-400"
      : trend?.direction === "down"
        ? "text-red-400"
        : "text-zinc-400";
  const TrendIcon =
    trend?.direction === "up"
      ? TrendingUp
      : trend?.direction === "down"
        ? TrendingDown
        : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="glass-card p-5"
    >
      <div className="flex items-start justify-between mb-3">
        <p className="text-xs uppercase tracking-widest text-zinc-400 font-semibold">
          {label}
        </p>
        <div
          className={`p-2.5 rounded-xl ${colors.bg} border ${colors.border}`}
        >
          <Icon className={`w-4 h-4 ${colors.text}`} />
        </div>
      </div>

      <div className="mb-3 border-t border-zinc-800 pt-3">
        <p className="stat-value font-black text-3xl bg-gradient-to-r from-emerald-400 to-emerald-300 bg-clip-text text-transparent">
          {displayValueToRender}
        </p>
      </div>

      {trend && (
        <div className="flex items-center gap-1.5 text-xs">
          {TrendIcon && <TrendIcon className={`w-3 h-3 ${trendColor}`} />}
          <span className={trendColor}>{trend.label}</span>
        </div>
      )}
    </motion.div>
  );
}
