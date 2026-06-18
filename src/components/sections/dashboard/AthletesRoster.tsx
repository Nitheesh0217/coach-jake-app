"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

interface Athlete {
  id: string;
  name: string;
  completionRate: number;
  sessionsThisWeek: number;
  streak: number;
}

interface AthletesRosterProps {
  athletes: Athlete[];
}

export default function AthletesRoster({ athletes }: AthletesRosterProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.06, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-3"
    >
      {athletes.map((athlete) => {
        const radius = 40;
        const circumference = 2 * Math.PI * radius;
        const offset =
          circumference - (athlete.completionRate / 100) * circumference;

        return (
          <motion.div
            key={athlete.id}
            variants={itemVariants}
            className="rounded-xl border border-zinc-800 bg-zinc-900/40 hover:bg-zinc-900/80 hover:border-emerald-500/40 p-4 flex items-center justify-between transition-all duration-300 group"
          >
            {/* Athlete Info */}
            <div className="flex items-center gap-4 flex-1">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center shrink-0 text-white font-bold text-sm">
                {athlete.name.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-white">{athlete.name}</p>
                <p className="text-xs text-zinc-500">
                  {athlete.sessionsThisWeek} sessions this week
                </p>
              </div>
            </div>

            {/* Completion Ring */}
            <div className="flex items-center gap-4">
              <div className="relative w-16 h-16 flex-shrink-0">
                <svg
                  className="w-full h-full transform -rotate-90"
                  viewBox="0 0 100 100"
                >
                  {/* Background circle */}
                  <circle
                    cx="50"
                    cy="50"
                    r={radius}
                    fill="none"
                    stroke="rgba(113, 113, 122, 0.2)"
                    strokeWidth="6"
                  />
                  {/* Progress circle */}
                  <motion.circle
                    cx="50"
                    cy="50"
                    r={radius}
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="6"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    initial={{ strokeDashoffset: circumference }}
                    animate={{ strokeDashoffset: offset }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-sm font-bold text-emerald-400">
                    {Math.round(athlete.completionRate)}%
                  </span>
                </div>
              </div>

              {/* Streak Badge */}
              <div className="flex items-center gap-2 shrink-0">
                <div className="text-right">
                  <p className="font-bold text-amber-400 text-sm">
                    {athlete.streak}
                  </p>
                  <p className="text-xs text-zinc-500">day streak</p>
                </div>
                {athlete.streak >= 5 && (
                  <motion.div
                    className="w-8 h-8 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Check className="w-4 h-4 text-amber-400" />
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
