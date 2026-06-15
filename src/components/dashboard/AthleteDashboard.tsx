"use client";

import {
  Flame,
  Dumbbell,
  Calendar,
  TrendingUp,
  Target,
  Zap,
  CheckCircle2,
  ArrowRight,
  BarChart2,
} from "lucide-react";
import { motion } from "framer-motion";
import { Workout } from "@/types";
import TodaysWorkout from "./TodaysWorkout";
import MeasurementsWidget from "./MeasurementsWidget";
import WeightChart from "./WeightChart";

interface Measurement {
  id: string;
  date: string;
  weight_kg: number;
}

interface AthleteDashboardProps {
  todayWorkout: Workout | null;
  weekLogsCount: number;
  last30DaysCount: number;
  measurements: Measurement[];
  currentStreak: number;
  longestStreak: number;
  userName?: string;
  recentSessions?: any[];
  hasLoggedToday?: boolean;
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function AthleteDashboard({
  todayWorkout,
  weekLogsCount,
  last30DaysCount,
  measurements,
  currentStreak,
  longestStreak,
  userName = "Athlete",
  recentSessions = [],
  hasLoggedToday = false,
}: AthleteDashboardProps) {
  const firstName = userName.split(" ")[0];

  const getGreeting = () => {
    const h = new Date().getHours();
    if (h < 12) return "Good morning";
    if (h < 18) return "Good afternoon";
    return "Good evening";
  };

  const today = new Date();
  const dateStr = today.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });

  const completionRate = last30DaysCount > 0 ? Math.min(Math.round((last30DaysCount / 30) * 100), 100) : 0;

  const kpiCards = [
    {
      label: "SESSIONS THIS WEEK",
      value: weekLogsCount,
      suffix: "",
      trendLabel: "+50% vs last week",
      trendUp: true,
      icon: Calendar,
      iconColor: "text-emerald-400",
      iconBg: "bg-emerald-500/15 border-emerald-500/30",
      valueColor: "text-emerald-400",
    },
    {
      label: "THIS MONTH",
      value: last30DaysCount,
      suffix: "",
      trendLabel: "+33% vs last month",
      trendUp: true,
      icon: TrendingUp,
      iconColor: "text-cyan-400",
      iconBg: "bg-cyan-500/15 border-cyan-500/30",
      valueColor: "text-cyan-400",
    },
    {
      label: "COMPLETION %",
      value: completionRate,
      suffix: "%",
      trendLabel: "+12% vs last month",
      trendUp: true,
      icon: Target,
      iconColor: "text-violet-400",
      iconBg: "bg-violet-500/15 border-violet-500/30",
      valueColor: "text-violet-400",
    },
    {
      label: "STREAK",
      value: currentStreak,
      suffix: "",
      trendLabel: "Days in a row",
      trendUp: currentStreak > 0,
      icon: Flame,
      iconColor: "text-amber-400",
      iconBg: "bg-amber-500/15 border-amber-500/30",
      valueColor: "text-amber-400",
      isStreak: true,
    },
  ];

  return (
    <div className="min-h-screen bg-[#050816] text-slate-100 pb-20 md:pb-8">
      {/* Ambient glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] rounded-full bg-emerald-500/4 blur-[150px]" />
        <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] rounded-full bg-cyan-500/3 blur-[150px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        {/* Header */}
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-2"
        >
          <div>
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              {getGreeting()}, {firstName} 👋
            </h1>
            <p className="text-zinc-400 text-sm mt-1">{dateStr}</p>
          </div>
        </motion.div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {kpiCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.label}
                custom={idx * 0.07}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="rounded-2xl border border-zinc-800/80 bg-zinc-900/60 backdrop-blur-sm p-4 sm:p-5 hover:border-zinc-700 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-3">
                  <p className="text-[10px] sm:text-xs uppercase tracking-widest text-zinc-500 font-semibold">{card.label}</p>
                  <div className={`p-1.5 rounded-lg border ${card.iconBg}`}>
                    <Icon className={`w-3.5 h-3.5 ${card.iconColor}`} />
                  </div>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className={`text-3xl sm:text-4xl font-black ${card.valueColor}`}>
                    {card.value}{card.suffix}
                  </span>
                </div>
                <div className="mt-2 flex items-center gap-1.5">
                  {card.trendUp && (
                    <svg className="w-3 h-3 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                    </svg>
                  )}
                  <span className="text-xs text-zinc-500">{card.trendLabel}</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Main 2-col layout */}
        <div className="grid lg:grid-cols-5 gap-6">
          {/* Left — Today's Workout */}
          <motion.div
            custom={0.3}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="lg:col-span-3 space-y-6"
          >
            {/* Today's Workout Card */}
            <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/60 backdrop-blur-sm p-5 sm:p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-xs text-zinc-500 uppercase tracking-wide font-semibold mb-1">Today&apos;s Workout</p>
                  <h2 className="text-xl font-bold text-white">
                    {todayWorkout?.title || "No workout assigned"}
                  </h2>
                </div>
                <div className="flex items-center gap-2 text-xs text-zinc-400 bg-zinc-800/60 rounded-lg px-3 py-1.5 border border-zinc-700/50">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <circle cx="12" cy="12" r="10" strokeWidth="2" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6l4 2" />
                  </svg>
                  {todayWorkout?.duration ? `${todayWorkout.duration} MIN` : "—"}
                </div>
              </div>
              {todayWorkout ? (
                <TodaysWorkout workout={todayWorkout} />
              ) : (
                <div className="text-center py-10">
                  <Dumbbell className="w-10 h-10 text-zinc-700 mx-auto mb-3" />
                  <p className="text-zinc-400 text-sm">No workout assigned for today.</p>
                  <a href="/workouts" className="inline-flex items-center gap-1.5 text-emerald-400 text-sm mt-3 hover:text-emerald-300 transition-colors font-medium">
                    Browse workouts <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              )}
              {todayWorkout && (
                <div className="mt-5 pt-4 border-t border-zinc-800">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs uppercase tracking-wide text-zinc-500 font-semibold">PROGRESS</span>
                    <span className="text-sm font-bold text-emerald-400">75%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-zinc-800 overflow-hidden">
                    <div className="h-full w-3/4 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400" />
                  </div>
                  <a
                    href="/workouts"
                    className="mt-4 w-full flex items-center justify-center gap-2 rounded-xl border border-emerald-500/40 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 font-semibold text-sm py-3 transition-all duration-200"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    Mark Session Complete
                  </a>
                </div>
              )}
            </div>

            {/* Weight / Measurements */}
            <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/60 backdrop-blur-sm p-5 sm:p-6">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-emerald-500/15 border border-emerald-500/30">
                    <BarChart2 className="w-4 h-4 text-emerald-400" />
                  </div>
                  <h3 className="text-lg font-bold text-white">Weight / Measurements</h3>
                </div>
                <span className="text-xs text-zinc-400 bg-zinc-800/60 border border-zinc-700/50 rounded-lg px-3 py-1.5">Weight (lbs)</span>
              </div>
              {measurements.length >= 2 ? (
                <>
                  <WeightChart measurements={measurements} />
                  {measurements.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-zinc-800 flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-emerald-400 text-sm">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                        <span className="font-semibold">
                          {measurements.length > 1
                            ? `${(measurements[measurements.length - 1].weight_kg - measurements[0].weight_kg).toFixed(1)} lbs in ${Math.round((new Date(measurements[measurements.length - 1].date).getTime() - new Date(measurements[0].date).getTime()) / (1000 * 60 * 60 * 24 * 7))} weeks`
                            : "Track your progress"}
                        </span>
                      </div>
                      <button className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-zinc-300 transition-colors">
                        <BarChart2 className="w-3.5 h-3.5" />
                        View Full Progress
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <MeasurementsWidget initialMeasurements={measurements} />
              )}
            </div>
          </motion.div>

          {/* Right — Streak + Recent Sessions */}
          <motion.div
            custom={0.4}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="lg:col-span-2 space-y-6"
          >
            {/* Streak Badge */}
            <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/60 backdrop-blur-sm p-5 sm:p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-white">Streak Badge</h3>
                <Flame className="w-5 h-5 text-amber-400" />
              </div>
              <div className="flex flex-col items-center py-4">
                {/* Glowing ring */}
                <div className="relative w-40 h-40 flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full border-4 border-amber-500/20" />
                  <div
                    className="absolute inset-0 rounded-full border-4 border-amber-400"
                    style={{
                      clipPath: "polygon(50% 0%, 100% 0%, 100% 100%, 50% 100%)",
                    }}
                  />
                  <div className="absolute inset-2 rounded-full bg-[#050816] flex flex-col items-center justify-center">
                    <span className="text-5xl font-black text-amber-400">{currentStreak}</span>
                    <span className="text-xs font-bold text-amber-400 uppercase tracking-wider mt-1">DAYS</span>
                    <Flame className="w-5 h-5 text-amber-400 mt-1 fill-amber-400" />
                  </div>
                </div>
                <p className="text-zinc-400 text-sm mt-4 text-center">
                  {currentStreak > 7
                    ? "Unstoppable! Keep it rolling."
                    : currentStreak > 0
                    ? "Great momentum, don't stop!"
                    : "Start your streak today!"}
                </p>
              </div>
            </div>

            {/* Recent Sessions */}
            <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/60 backdrop-blur-sm p-5 sm:p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-white">Recent Sessions</h3>
                <a href="/workouts" className="text-xs text-emerald-400 hover:text-emerald-300 transition-colors font-medium">
                  View All →
                </a>
              </div>
              <div className="space-y-3">
                {recentSessions.length > 0 ? (
                  recentSessions.slice(0, 4).map((log: any, idx: number) => (
                    <motion.div
                      key={log.id || idx}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + idx * 0.06 }}
                      className="flex items-center gap-3 p-3 rounded-xl bg-zinc-800/40 hover:bg-zinc-800/70 transition-colors border border-zinc-800/60"
                    >
                      <div className="w-8 h-8 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center flex-shrink-0">
                        <Dumbbell className="w-3.5 h-3.5 text-emerald-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-white truncate">
                          {log.workouts?.title || "Workout Session"}
                        </p>
                        <p className="text-xs text-zinc-500">
                          {new Date(log.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                          {log.duration ? ` • ${log.duration} min` : ""}
                        </p>
                      </div>
                      <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 rounded-md px-2 py-0.5 uppercase tracking-wide flex-shrink-0">
                        Done ✓
                      </span>
                    </motion.div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <Dumbbell className="w-8 h-8 text-zinc-700 mx-auto mb-2" />
                    <p className="text-zinc-500 text-sm">No sessions logged yet.</p>
                    <a href="/workouts" className="text-emerald-400 text-xs mt-2 inline-block hover:text-emerald-300 transition-colors">
                      Go to Workouts →
                    </a>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
