"use client";

"use client";

import {
  Flame,
  Dumbbell,
  Calendar,
  TrendingUp,
  MessageCircle,
  Target,
  Zap,
  CheckCircle2,
  ChevronRight,
  ArrowRight,
} from "lucide-react";
import { motion } from "framer-motion";
import { Workout } from "@/types";
import TodaysWorkout from "./TodaysWorkout";
import UpcomingScheduleWidget from "./UpcomingScheduleWidget";
import ConsistencyWidget from "./ConsistencyWidget";
import MeasurementsWidget from "./MeasurementsWidget";
import FocusBreakdownWidget from "./FocusBreakdownWidget";
import NotesHighlightsWidget from "./NotesHighlightsWidget";
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
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="min-h-screen bg-[#050816] text-slate-100"
    >
      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 py-6 lg:py-8 space-y-8">
        {/* HERO GREETING SECTION - Premium Typography */}
        <div className="border-b border-zinc-800 pb-8">
          <h1 className="text-5xl sm:text-6xl font-black tracking-tight bg-gradient-to-br from-white via-white to-zinc-400 bg-clip-text text-transparent mb-3">
            Let's get after it, {firstName}.
          </h1>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="text-emerald-400 font-medium capitalize">
                Athlete
              </span>
            </span>
          </div>
        </div>

        {/* TODAY'S FOCUS BLOCK - Premium Design */}
        {hasLoggedToday ? (
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="rounded-2xl border-l-4 border-l-emerald-400 border border-l-4 border-zinc-800 bg-zinc-900/80 backdrop-blur-sm shadow-xl shadow-black/40 p-6 flex items-center justify-between"
          >
            <div>
              <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                Session logged
              </h2>
              <p className="text-sm text-zinc-400 mt-1">
                Keep the streak going — stay strong!
              </p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="rounded-2xl border-l-4 border-l-amber-400 border border-l-4 border-zinc-800 bg-zinc-900/80 backdrop-blur-sm shadow-xl shadow-black/40 p-6 flex items-center justify-between"
          >
            <div>
              <h2 className="text-lg font-semibold text-white">
                No session logged yet today
              </h2>
              <p className="text-sm text-zinc-400 mt-1">
                Ready to get to work?
              </p>
            </div>
            <a
              href="/workouts"
              className="bg-gradient-to-r from-emerald-500 to-green-400 hover:from-emerald-400 hover:to-green-300 text-black font-semibold rounded-full px-6 py-2.5 transition-all duration-200 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap"
            >
              Go to Workouts →
            </a>
          </motion.div>
        )}

        {/* Responsive 2-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* LEFT COLUMN (spans 2 columns on desktop) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Today's Workout Card */}
            {todayWorkout ? (
              <div className="rounded-2xl border border-emerald-500/20 bg-[#0f1623] p-6 shadow-lg shadow-emerald-500/10 hover:border-emerald-400/40 hover:translate-y-[1px] transition-all duration-300 backdrop-blur-sm">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-lg sm:text-xl font-semibold text-zinc-50">
                    Today's Workout
                  </h3>
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center">
                    <Dumbbell className="w-5 h-5 text-emerald-400" />
                  </div>
                </div>
                <TodaysWorkout workout={todayWorkout} />
              </div>
            ) : (
              <div className="rounded-2xl border border-emerald-500/20 bg-[#0f1623] p-6 shadow-lg shadow-emerald-500/10 hover:border-emerald-400/40 hover:translate-y-[1px] transition-all duration-300 backdrop-blur-sm">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-lg sm:text-xl font-semibold text-zinc-50">
                    Today's Workout
                  </h3>
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center">
                    <Dumbbell className="w-5 h-5 text-emerald-400" />
                  </div>
                </div>
                <p className="text-zinc-400 py-12 text-center">
                  No workout assigned for today. Check back later or visit the
                  Workouts section.
                </p>
              </div>
            )}

            {/* Upcoming Schedule Widget */}
            <div className="rounded-2xl border border-emerald-500/20 bg-[#0f1623] p-6 shadow-lg shadow-emerald-500/10 hover:border-emerald-400/40 hover:translate-y-[1px] transition-all duration-300 backdrop-blur-sm">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-lg sm:text-xl font-semibold text-zinc-50">
                  Upcoming Sessions
                </h3>
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-emerald-400" />
                </div>
              </div>
              <UpcomingScheduleWidget />
            </div>

            {/* Empty State for New Athletes */}
            {weekLogsCount === 0 && last30DaysCount === 0 && (
              <div className="rounded-2xl bg-zinc-900/80 border border-zinc-800 p-8 shadow-lg">
                <div className="flex flex-col items-center justify-center text-center">
                  <h2 className="text-2xl font-bold text-white mb-2">
                    Your dashboard is empty
                  </h2>
                  <p className="text-zinc-400 mb-6">
                    Complete your first workout to start tracking progress.
                  </p>
                  <a
                    href="/workouts"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 text-white font-semibold hover:bg-emerald-600 transition-colors duration-300"
                  >
                    Browse Workouts →
                  </a>
                </div>
              </div>
            )}

            {/* Progress Stats Card */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {/* This Week */}
              <div className="rounded-xl border border-emerald-500/20 bg-[#0f1623] p-4 shadow-lg shadow-emerald-500/10 hover:border-emerald-400/40 hover:translate-y-[1px] transition-all duration-300 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs uppercase tracking-wide text-zinc-500 font-semibold">
                    This Week
                  </p>
                  <Flame className="w-4 h-4 text-emerald-400" />
                </div>
                <p className="text-2xl sm:text-3xl font-bold text-emerald-400">
                  {weekLogsCount}
                </p>
                <p className="text-xs text-zinc-400 mt-1">sessions completed</p>
              </div>

              {/* Last 30 Days */}
              <div className="rounded-xl border border-emerald-500/20 bg-[#0f1623] p-4 shadow-lg shadow-emerald-500/10 hover:border-emerald-400/40 hover:translate-y-[1px] transition-all duration-300 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs uppercase tracking-wide text-zinc-500 font-semibold">
                    Last 30 Days
                  </p>
                  <TrendingUp className="w-4 h-4 text-blue-400" />
                </div>
                <p className="text-2xl sm:text-3xl font-bold text-blue-400">
                  {last30DaysCount}
                </p>
                <p className="text-xs text-zinc-400 mt-1">total workouts</p>
              </div>

              {/* Consistency Rate */}
              <div className="rounded-xl border border-emerald-500/20 bg-[#0f1623] p-4 shadow-lg shadow-emerald-500/10 hover:border-emerald-400/40 hover:translate-y-[1px] transition-all duration-300 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs uppercase tracking-wide text-zinc-500 font-semibold">
                    Consistency
                  </p>
                  <Target className="w-4 h-4 text-purple-400" />
                </div>
                <p className="text-2xl sm:text-3xl font-bold text-purple-400">
                  {last30DaysCount > 0
                    ? Math.min(Math.round((last30DaysCount / 30) * 100), 100)
                    : 0}
                  %
                </p>
                <p className="text-xs text-zinc-400 mt-1">avg per day</p>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN (hidden on mobile, visible on desktop) */}
          <div className="space-y-6">
            {/* Streak Widget - Only show if athlete has data */}
            {(weekLogsCount > 0 || last30DaysCount > 0) && (
              <div className="rounded-2xl border border-amber-500/20 bg-[#0f1623] shadow-lg shadow-amber-500/10 hover:border-amber-400/40 hover:translate-y-[1px] transition-all duration-300 backdrop-blur-sm p-6">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-lg font-semibold text-zinc-50">Streak</h3>
                  <Zap className="w-5 h-5 text-amber-400" />
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-xs uppercase tracking-wide text-zinc-500 font-semibold mb-2">
                      Current Streak
                    </p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-bold text-amber-400">
                        {currentStreak}
                      </span>
                      <span className="text-base text-amber-400">🔥</span>
                    </div>
                    <p className="text-xs text-zinc-400 mt-1">
                      {currentStreak === 0
                        ? "Start your streak today!"
                        : currentStreak === 1
                          ? "day streak"
                          : "day streak"}
                    </p>
                  </div>
                  <div className="border-t border-zinc-800 pt-4">
                    <p className="text-xs uppercase tracking-wide text-zinc-500 font-semibold mb-2">
                      Personal Best
                    </p>
                    <p className="text-2xl font-bold text-amber-300">
                      {longestStreak}
                    </p>
                    <p className="text-xs text-zinc-400 mt-1">longest streak</p>
                  </div>
                </div>
              </div>
            )}

            {/* Recent Sessions Widget */}
            {recentSessions && recentSessions.length > 0 ? (
              <div className="rounded-2xl border border-emerald-500/20 bg-[#0f1623] shadow-lg shadow-emerald-500/10 hover:border-emerald-400/40 hover:translate-y-[1px] transition-all duration-300 backdrop-blur-sm p-6">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-lg font-semibold text-zinc-50">
                    Recent Sessions
                  </h3>
                  <Dumbbell className="w-5 h-5 text-emerald-400" />
                </div>
                <div className="space-y-3">
                  {recentSessions.map((log: any) => (
                    <div
                      key={log.id}
                      className="flex items-start justify-between gap-2 pb-3 border-b border-zinc-800 last:border-b-0 last:pb-0"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white truncate">
                          {log.workouts?.title || "Unknown"}
                        </p>
                        <p className="text-xs text-zinc-500">
                          {new Date(log.date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          })}
                        </p>
                      </div>
                      <span className="text-emerald-400 text-lg flex-shrink-0">
                        ✅
                      </span>
                    </div>
                  ))}
                </div>
                <a
                  href="/workouts"
                  className="text-xs text-emerald-400 hover:text-emerald-300 mt-3 inline-block"
                >
                  View all sessions →
                </a>
              </div>
            ) : (
              <div className="rounded-2xl border border-emerald-500/20 bg-[#0f1623] shadow-lg shadow-emerald-500/10 hover:border-emerald-400/40 hover:translate-y-[1px] transition-all duration-300 backdrop-blur-sm p-6">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-lg font-semibold text-zinc-50">
                    Recent Sessions
                  </h3>
                  <Dumbbell className="w-5 h-5 text-zinc-600" />
                </div>
                <p className="text-sm text-zinc-400">No sessions logged yet.</p>
                <a
                  href="/workouts"
                  className="text-xs text-emerald-400 hover:text-emerald-300 mt-3 inline-block"
                >
                  Go to Workouts →
                </a>
              </div>
            )}

            <div className="rounded-2xl border border-emerald-500/20 bg-[#0f1623] shadow-lg shadow-emerald-500/10 hover:border-emerald-400/40 hover:translate-y-[1px] transition-all duration-300 backdrop-blur-sm overflow-hidden">
              <ConsistencyWidget />
            </div>

            {/* Measurements Widget */}
            <div className="rounded-2xl border border-emerald-500/20 bg-[#0f1623] shadow-lg shadow-emerald-500/10 hover:border-emerald-400/40 hover:translate-y-[1px] transition-all duration-300 backdrop-blur-sm overflow-hidden">
              <MeasurementsWidget initialMeasurements={measurements} />
            </div>

            {/* Weight Progress Chart */}
            {measurements.length >= 2 && (
              <div className="rounded-2xl border border-emerald-500/20 bg-[#0f1623] shadow-lg shadow-emerald-500/10 hover:border-emerald-400/40 hover:translate-y-[1px] transition-all duration-300 backdrop-blur-sm p-6">
                <h4 className="text-lg font-semibold text-zinc-50 mb-4">
                  Weight Trend
                </h4>
                <WeightChart measurements={measurements} />
              </div>
            )}

            {/* Focus Breakdown Widget */}
            <div className="rounded-2xl border border-emerald-500/20 bg-[#0f1623] shadow-lg shadow-emerald-500/10 hover:border-emerald-400/40 hover:translate-y-[1px] transition-all duration-300 backdrop-blur-sm overflow-hidden">
              <FocusBreakdownWidget />
            </div>

            {/* Notes & Highlights Widget */}
            <div className="rounded-2xl border border-emerald-500/20 bg-[#0f1623] shadow-lg shadow-emerald-500/10 hover:border-emerald-400/40 hover:translate-y-[1px] transition-all duration-300 backdrop-blur-sm overflow-hidden">
              <NotesHighlightsWidget />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
