// FILE: src/components/dashboard/StreakTracker.tsx
"use client";

import { motion } from "framer-motion";

interface StreakTrackerProps {
  currentStreak: number;
  longestStreak: number;
  weekDates: { date: string; hasLogged: boolean }[]; // 7 dates starting from Sunday
}

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function StreakTracker({
  currentStreak,
  longestStreak,
  weekDates,
}: StreakTrackerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
      className="rounded-2xl border border-zinc-800 bg-zinc-900/80 backdrop-blur-sm shadow-xl shadow-black/40 p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-semibold text-zinc-100">7-Day Streak</h3>
          <p className="text-sm text-zinc-500">Current: {currentStreak} days</p>
        </div>
        <div className="text-right">
          <p className="text-3xl font-mono font-bold text-emerald-400">
            {currentStreak}
          </p>
          <p className="text-xs text-zinc-500">Best: {longestStreak}</p>
        </div>
      </div>

      <div className="flex items-end gap-3 justify-center">
        {weekDates.map((day, idx) => (
          <motion.div
            key={idx}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: idx * 0.08 }}
            className="flex flex-col items-center gap-2"
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-all duration-300 ${
                day.hasLogged
                  ? "bg-emerald-500 shadow-[0_0_12px_rgba(52,211,153,0.5)] text-black"
                  : "bg-zinc-800 text-zinc-600"
              }`}
            >
              {day.hasLogged ? "✓" : ""}
            </div>
            <p className="text-xs text-zinc-600 w-6 text-center">{DAYS[idx]}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
