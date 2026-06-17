"use client";

import { Flame, Dumbbell, Calendar, TrendingUp, Target, CheckCircle2, ArrowRight, BarChart2 } from "lucide-react";
import { motion } from "framer-motion";
import { Workout } from "@/types";
import TodaysWorkout from "./TodaysWorkout";
import MeasurementsWidget from "./MeasurementsWidget";
import WeightChart from "./WeightChart";

interface Measurement { id: string; date: string; weight_kg: number; }

interface Props {
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

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] as any },
});

export default function AthleteDashboard({
  todayWorkout, weekLogsCount, last30DaysCount, measurements,
  currentStreak, longestStreak, userName = "Athlete", recentSessions = [], hasLoggedToday = false,
}: Props) {
  const firstName = userName.split(" ")[0];
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";
  const dateStr = new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });
  const completion = last30DaysCount > 0 ? Math.min(Math.round((last30DaysCount / 30) * 100), 100) : 0;

  const kpis = [
    { label: "SESSIONS THIS WEEK", value: weekLogsCount,    suffix: "",  icon: Calendar,    color: "text-emerald-400", bg: "bg-emerald-500/15 border-emerald-500/30", trend: "+50% vs last week" },
    { label: "THIS MONTH",         value: last30DaysCount,  suffix: "",  icon: TrendingUp,  color: "text-cyan-400",    bg: "bg-cyan-500/15 border-cyan-500/30",       trend: "+33% vs last month" },
    { label: "COMPLETION %",       value: completion,       suffix: "%", icon: Target,      color: "text-violet-400",  bg: "bg-violet-500/15 border-violet-500/30",   trend: "+12% vs last month" },
    { label: "STREAK",             value: currentStreak,    suffix: "",  icon: Flame,       color: "text-amber-400",   bg: "bg-amber-500/15 border-amber-500/30",     trend: "Days in a row" },
  ];

  return (
    <div className="min-h-screen bg-[#050816] text-white">
      {/* Ambient */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] rounded-full bg-emerald-500/4 blur-[150px]" />
        <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] rounded-full bg-cyan-500/3 blur-[150px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* Header */}
        <motion.div {...fade(0)}>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            {greeting}, {firstName} 👋
          </h1>
          <p className="text-zinc-500 text-sm mt-1">{dateStr}</p>
        </motion.div>

        {/* KPI row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {kpis.map(({ label, value, suffix, icon: Icon, color, bg, trend }, i) => (
            <motion.div key={label} {...fade(i * 0.07)}
              className="rounded-2xl border border-zinc-800/80 bg-zinc-900/60 backdrop-blur-sm p-4 sm:p-5 hover:border-zinc-700 transition-all duration-300">
              <div className="flex items-center justify-between mb-3">
                <p className="text-[10px] sm:text-[11px] uppercase tracking-widest text-zinc-500 font-semibold leading-tight">{label}</p>
                <div className={`p-1.5 rounded-lg border ${bg}`}>
                  <Icon className={`w-3.5 h-3.5 ${color}`} />
                </div>
              </div>
              <p className={`text-3xl sm:text-4xl font-black ${color}`}>{value}{suffix}</p>
              <p className="text-[11px] text-zinc-600 mt-1.5 flex items-center gap-1">
                <span className="text-emerald-400">↑</span> {trend}
              </p>
            </motion.div>
          ))}
        </div>

        {/* 3-col content */}
        <div className="grid lg:grid-cols-5 gap-6">
          {/* TODAY'S WORKOUT + WEIGHT (left 3 cols) */}
          <motion.div {...fade(0.28)} className="lg:col-span-3 space-y-6">
            {/* Today's Workout */}
            <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/60 backdrop-blur-sm p-5 sm:p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-xs text-zinc-500 uppercase tracking-widest font-semibold mb-1">Today's Workout</p>
                  <h2 className="text-xl font-black text-white">
                    {todayWorkout?.title ?? "No workout assigned"}
                  </h2>
                </div>
                {todayWorkout?.duration && (
                  <span className="flex items-center gap-1.5 text-xs text-zinc-400 bg-zinc-800/60 border border-zinc-700/50 rounded-lg px-3 py-1.5 flex-shrink-0">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2" strokeLinecap="round"/></svg>
                    {todayWorkout.duration} MIN
                  </span>
                )}
              </div>

              {todayWorkout ? (
                <>
                  <TodaysWorkout workout={todayWorkout} />
                  <div className="mt-5 pt-4 border-t border-zinc-800">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] uppercase tracking-widest text-zinc-500 font-semibold">PROGRESS</span>
                      <span className="text-sm font-black text-emerald-400">75%</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-zinc-800 overflow-hidden">
                      <div className="h-full w-3/4 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400" />
                    </div>
                    <button className="mt-4 w-full flex items-center justify-center gap-2 rounded-xl border border-emerald-500/40 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 font-bold text-sm py-3 transition-all">
                      <CheckCircle2 className="w-4 h-4" /> Mark Session Complete
                    </button>
                  </div>
                </>
              ) : (
                <div className="text-center py-10">
                  <Dumbbell className="w-10 h-10 text-zinc-700 mx-auto mb-3" />
                  <p className="text-zinc-500 text-sm">No workout assigned for today.</p>
                  <a href="/workouts" className="inline-flex items-center gap-1.5 text-emerald-400 text-sm mt-3 hover:text-emerald-300 transition-colors font-semibold">
                    Browse workouts <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              )}
            </div>

            {/* Weight Chart */}
            <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/60 backdrop-blur-sm p-5 sm:p-6">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 rounded-lg bg-emerald-500/15 border border-emerald-500/30">
                    <BarChart2 className="w-4 h-4 text-emerald-400" />
                  </div>
                  <h3 className="text-base font-bold text-white">Weight / Measurements</h3>
                </div>
                <span className="text-[11px] text-zinc-400 bg-zinc-800/60 border border-zinc-700/50 rounded-lg px-3 py-1.5">Weight (lbs) ▾</span>
              </div>
              {measurements.length >= 2 ? (
                <>
                  <WeightChart measurements={measurements} />
                  <div className="mt-4 pt-4 border-t border-zinc-800 flex items-center justify-between">
                    <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">↓ Tracking progress</span>
                    <button className="flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-300 transition-colors">
                      <BarChart2 className="w-3.5 h-3.5" /> View Full Progress
                    </button>
                  </div>
                </>
              ) : (
                <MeasurementsWidget initialMeasurements={measurements} />
              )}
            </div>
          </motion.div>

          {/* STREAK + RECENT SESSIONS (right 2 cols) */}
          <motion.div {...fade(0.38)} className="lg:col-span-2 space-y-6">
            {/* Streak Badge */}
            <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/60 backdrop-blur-sm p-5 sm:p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-bold text-white">Streak Badge</h3>
                <Flame className="w-5 h-5 text-amber-400" />
              </div>
              <div className="flex flex-col items-center py-3">
                {/* Ring */}
                <div className="relative w-36 h-36 flex items-center justify-center">
                  <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 144 144">
                    <circle cx="72" cy="72" r="62" fill="none" stroke="#27272a" strokeWidth="8" />
                    <circle cx="72" cy="72" r="62" fill="none"
                      stroke="url(#streakGrad)" strokeWidth="8"
                      strokeLinecap="round"
                      strokeDasharray={`${Math.min(currentStreak / 30, 1) * 390} 390`} />
                    <defs>
                      <linearGradient id="streakGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#f59e0b" />
                        <stop offset="100%" stopColor="#ef4444" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="relative flex flex-col items-center">
                    <span className="text-5xl font-black text-amber-400">{currentStreak}</span>
                    <span className="text-[11px] font-black text-amber-400 uppercase tracking-widest">DAYS</span>
                    <Flame className="w-5 h-5 text-amber-400 fill-amber-400 mt-0.5" />
                  </div>
                </div>
                <p className="text-zinc-500 text-sm mt-4 text-center">
                  {currentStreak > 7 ? "Unstoppable! Keep it rolling." : currentStreak > 0 ? "Great momentum, keep going!" : "Start your streak today!"}
                </p>
              </div>
            </div>

            {/* Recent Sessions */}
            <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/60 backdrop-blur-sm p-5 sm:p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-bold text-white">Recent Sessions</h3>
                <a href="/workouts" className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold transition-colors">View All →</a>
              </div>
              <div className="space-y-2.5">
                {recentSessions.length > 0 ? recentSessions.slice(0, 4).map((log: any, i: number) => (
                  <motion.div key={log.id ?? i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 + i * 0.06 }}
                    className="flex items-center gap-3 p-3 rounded-xl bg-zinc-800/40 hover:bg-zinc-800/70 transition-colors border border-zinc-800/60">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center flex-shrink-0">
                      <Dumbbell className="w-3.5 h-3.5 text-emerald-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-white truncate">{log.workouts?.title ?? "Workout Session"}</p>
                      <p className="text-xs text-zinc-500">
                        {new Date(log.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                        {log.duration ? ` • ${log.duration} min` : ""}
                      </p>
                    </div>
                    <span className="text-[10px] font-black text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 rounded-md px-2 py-0.5 uppercase tracking-wide flex-shrink-0">
                      COMPLETED ✓
                    </span>
                  </motion.div>
                )) : (
                  <div className="text-center py-8">
                    <Dumbbell className="w-8 h-8 text-zinc-700 mx-auto mb-2" />
                    <p className="text-zinc-600 text-sm">No sessions logged yet.</p>
                    <a href="/workouts" className="text-emerald-400 text-xs mt-2 inline-block hover:text-emerald-300 transition-colors">Go to Workouts →</a>
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
