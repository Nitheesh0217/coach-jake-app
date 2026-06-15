// FILE: src/components/ui/StatCard.tsx
"use client";

import { useEffect, useRef } from "react";
import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

type AccentColor = "emerald" | "sky" | "violet" | "amber";

const accentMap: Record<
  AccentColor,
  { text: string; bg: string; icon: string }
> = {
  emerald: {
    text: "text-emerald-400",
    bg: "bg-emerald-500/10",
    icon: "text-emerald-400",
  },
  sky: { text: "text-sky-400", bg: "bg-sky-500/10", icon: "text-sky-400" },
  violet: {
    text: "text-violet-400",
    bg: "bg-violet-500/10",
    icon: "text-violet-400",
  },
  amber: {
    text: "text-amber-400",
    bg: "bg-amber-500/10",
    icon: "text-amber-400",
  },
};

interface StatCardProps {
  label: string;
  value: string | number;
  accent: AccentColor;
  icon: LucideIcon;
  trend?: string;
  loading?: boolean;
}

export default function StatCard({
  label,
  value,
  accent,
  icon: Icon,
  trend,
  loading = false,
}: StatCardProps) {
  const colors = accentMap[accent];
  const displayValue = useRef<number>(0);
  const currentValue = useRef<number>(0);

  useEffect(() => {
    if (loading || typeof value === "string") return;

    const target = typeof value === "number" ? value : 0;
    const increment = target / 60; // Animate over ~1 second at 60fps
    const interval = setInterval(() => {
      currentValue.current += increment;
      if (currentValue.current >= target) {
        currentValue.current = target;
        clearInterval(interval);
      }
      displayValue.current = Math.round(currentValue.current);
    }, 16);

    return () => clearInterval(interval);
  }, [value, loading]);

  if (loading) {
    return (
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 backdrop-blur-sm shadow-xl shadow-black/40 p-5 flex flex-col gap-4">
        <div className={`w-10 h-10 rounded-lg ${colors.bg} animate-pulse`} />
        <div className="space-y-2">
          <div className="h-8 w-24 rounded-lg bg-zinc-800 animate-pulse" />
          <div className="h-3 w-32 rounded-lg bg-zinc-800 animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="rounded-2xl border border-zinc-800 bg-zinc-900/80 backdrop-blur-sm shadow-xl shadow-black/40 hover:border-zinc-700 hover:shadow-[0_0_30px_rgba(52,211,153,0.08)] transition-all duration-300 p-5 flex flex-col gap-4"
    >
      <div
        className={`${colors.bg} w-10 h-10 rounded-lg flex items-center justify-center`}
      >
        <Icon className={`w-5 h-5 ${colors.icon}`} />
      </div>

      <div>
        <p className={`font-mono font-bold text-3xl ${colors.text}`}>
          {typeof value === "string" ? value : displayValue.current}
        </p>
        <p className="text-xs text-zinc-500 tracking-widest uppercase mt-1">
          {label}
        </p>
      </div>

      {trend && (
        <div className="bg-zinc-800/60 rounded-xl px-3 py-1.5 text-xs flex items-center gap-2">
          <span className={colors.text}>↑</span>
          <span className="text-zinc-400">{trend}</span>
        </div>
      )}
    </motion.div>
  );
}
