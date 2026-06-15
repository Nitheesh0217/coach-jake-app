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
  Users,
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
import StatCard from "@/components/ui/StatCard";
import AmbientGlow from "@/components/ui/AmbientGlow";

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

  // Get time-based greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  // Calculate consistency percentage
  const consistencyRate =
    last30DaysCount > 0
      ? Math.min(Math.round((last30DaysCount / 30) * 100), 100)
      : 0;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="relative min-h-screen bg-[#050816] text-slate-100 overflow-hidden"
    >
      {/* Ambient Glows */}
      <AmbientGlow
        color="emerald"
        position="top-right"
        size={500}
        opacity={0.03}
      />
      <AmbientGlow
        color="cyan"
        position="bottom-left"
        size={400}
        opacity={0.02}
      />

      {/* Main content */}
      <div className="relative max-w-7xl mx-auto px-4 py-6 lg:py-8 space-y-8">
        {/* HERO GREETING SECTION - Premium Typography */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="border-b border-zinc-800 pb-8"
        >
          <h1 className="text-5xl sm:text-6xl font-black tracking-tight bg-linear-to-br from-white via-white to-zinc-400 bg-clip-text text-transparent mb-3">
            {getGreeting()}, {firstName}.
          </h1>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="text-emerald-400 font-medium capitalize">
                Ready to train
              </span>
            </span>
          </div>
        </motion.div>

        {/* TODAY'S FOCUS BLOCK - Premium Design */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="rounded-2xl border-l-4 border-l-emerald-400 border border-zinc-800 bg-zinc-900/80 backdrop-blur-sm shadow-xl shadow-black/40 p-6 flex items-center justify-between"
        >
          <div>
            {hasLoggedToday ? (
              <>
                <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  Session logged
                </h2>
                <p className="text-sm text-zinc-400 mt-1">
                  Keep the streak going — stay strong!
                </p>
              </>
            ) : (
              <>
                <h2 className="text-lg font-semibold text-white">
                  No session logged yet today
                </h2>
                <p className="text-sm text-zinc-400 mt-1">
                  Ready to get to work?
                </p>
              </>
            )}
          </div>
          {!hasLoggedToday && (
            <a
              href="/workouts"
              className="bg-linear-to-r from-emerald-500 to-green-400 hover:from-emerald-400 hover:to-green-300 text-black font-semibold rounded-full px-6 py-2.5 transition-all duration-200 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap"
            >
              Go to Workouts →
            </a>
          )}
        </motion.div>

        {/* KPI Cards Grid - 4 cards with stagger animation */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          <motion.div variants={itemVariants}>
            <StatCard
              label="This Week"
              value={weekLogsCount}
              icon={Flame}
              iconColor="emerald"
              delay={0}
              countUp={true}
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <StatCard
              label="Last 30 Days"
              value={last30DaysCount}
              icon={TrendingUp}
              iconColor="sky"
              delay={0.08}
              countUp={true}
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <StatCard
              label="Consistency"
              value={`${consistencyRate}%`}
              icon={Target}
              iconColor="violet"
              delay={0.16}
              countUp={false}
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <StatCard
              label="Current Streak"
              value={currentStreak}
              icon={Zap}
              iconColor="amber"
              trend={{
                direction: currentStreak > 0 ? "up" : "neutral",
                label: currentStreak > 0 ? "days" : "Start today",
              }}
              delay={0.24}
              countUp={true}
            />
          </motion.div>
        </motion.div>

        {/* Responsive 2-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* LEFT COLUMN (spans 2 columns on desktop) */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-2 space-y-6"
          >
            {/* Today's Workout Card */}
            <motion.div
              variants={itemVariants}
              className="rounded-2xl border border-zinc-800 bg-zinc-900/80 backdrop-blur-sm shadow-xl shadow-black/20 p-6 hover:border-emerald-500/40 hover:shadow-emerald-glow-md transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-lg sm:text-xl font-semibold text-zinc-50">
                  Today's Workout
                </h3>
                <div className="shrink-0 w-10 h-10 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center">
                  <Dumbbell className="w-5 h-5 text-emerald-400" />
                </div>
              </div>
              {todayWorkout ? (
                <TodaysWorkout workout={todayWorkout} />
              ) : (
                <p className="text-zinc-400 py-12 text-center">
                  No workout assigned for today. Check back later or visit the
                  Workouts section.
                </p>
              )}
            </motion.div>

            {/* Upcoming Schedule Widget */}
            <motion.div
              variants={itemVariants}
              className="rounded-2xl border border-zinc-800 bg-zinc-900/80 backdrop-blur-sm shadow-xl shadow-black/20 p-6 hover:border-emerald-500/40 hover:shadow-emerald-glow-md transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-lg sm:text-xl font-semibold text-zinc-50">
                  Upcoming Sessions
                </h3>
                <div className="shrink-0 w-10 h-10 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-emerald-400" />
                </div>
              </div>
              <UpcomingScheduleWidget />
            </motion.div>

            {/* Empty State for New Athletes */}
            {weekLogsCount === 0 && last30DaysCount === 0 && (
              <motion.div
                variants={itemVariants}
                className="rounded-2xl bg-zinc-900/80 border border-zinc-800 p-8 shadow-lg hover:border-emerald-500/40 transition-all duration-300"
              >
                <div className="flex flex-col items-center justify-center text-center">
                  <h2 className="text-2xl font-bold text-white mb-2">
                    Your dashboard is empty
                  </h2>
                  <p className="text-zinc-400 mb-6">
                    Complete your first workout to start tracking progress.
                  </p>
                  <a
                    href="/workouts"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                  >
                    Browse Workouts →
                  </a>
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* RIGHT COLUMN (hidden on mobile, visible on desktop) */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            {/* Streak Widget - Only show if athlete has data */}
            {(weekLogsCount > 0 || last30DaysCount > 0) && (
              <motion.div
                variants={itemVariants}
                className="rounded-2xl border border-zinc-800 bg-zinc-900/80 backdrop-blur-sm shadow-xl shadow-black/20 p-6 hover:border-amber-500/40 hover:shadow-amber-glow-sm transition-all duration-300"
              >
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
                      <span className="text-sm text-amber-400">days</span>
                    </div>
                    <p className="text-xs text-zinc-400 mt-1">
                      {currentStreak === 0
                        ? "Start your streak today!"
                        : "Keep going!"}
                    </p>
                  </div>

                  {/* 7-Day Streak Dots */}
                  <div className="grid grid-cols-7 gap-1.5 pt-3 border-t border-zinc-800">
                    {[...Array(7)].map((_, i) => {
                      const isActive = i < currentStreak;
                      return (
                        <motion.div
                          key={i}
                          className={`h-1.5 rounded-full transition-all duration-300 ${
                            isActive ? "bg-amber-400" : "bg-zinc-700"
                          }`}
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{ delay: 0.2 + i * 0.05 }}
                        />
                      );
                    })}
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
              </motion.div>
            )}

            {/* Recent Sessions Widget */}
            <motion.div
              variants={itemVariants}
              className="rounded-2xl border border-zinc-800 bg-zinc-900/80 backdrop-blur-sm shadow-xl shadow-black/20 p-6 hover:border-emerald-500/40 hover:shadow-emerald-glow-md transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-lg font-semibold text-zinc-50">
                  Recent Sessions
                </h3>
                <Dumbbell className="w-5 h-5 text-emerald-400" />
              </div>

              {recentSessions && recentSessions.length > 0 ? (
                <>
                  <div className="space-y-3">
                    {recentSessions.slice(0, 5).map((log: any, idx: number) => (
                      <motion.div
                        key={log.id}
                        className="flex items-start justify-between gap-2 pb-3 border-b border-zinc-800 last:border-b-0 last:pb-0"
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.06 }}
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
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-1" />
                      </motion.div>
                    ))}
                  </div>
                  <a
                    href="/workouts"
                    className="text-xs text-emerald-400 hover:text-emerald-300 mt-3 inline-block transition-colors"
                  >
                    View all sessions →
                  </a>
                </>
              ) : (
                <>
                  <p className="text-sm text-zinc-400">
                    No sessions logged yet.
                  </p>
                  <a
                    href="/workouts"
                    className="text-xs text-emerald-400 hover:text-emerald-300 mt-3 inline-block transition-colors"
                  >
                    Go to Workouts →
                  </a>
                </>
              )}
            </motion.div>

            {/* Consistency Widget */}
            <motion.div
              variants={itemVariants}
              className="rounded-2xl border border-zinc-800 bg-zinc-900/80 backdrop-blur-sm shadow-xl shadow-black/20 overflow-hidden hover:border-emerald-500/40 hover:shadow-emerald-glow-md transition-all duration-300"
            >
              <ConsistencyWidget />
            </motion.div>

            {/* Measurements Widget */}
            <motion.div
              variants={itemVariants}
              className="rounded-2xl border border-zinc-800 bg-zinc-900/80 backdrop-blur-sm shadow-xl shadow-black/20 overflow-hidden hover:border-emerald-500/40 hover:shadow-emerald-glow-md transition-all duration-300"
            >
              <MeasurementsWidget initialMeasurements={measurements} />
            </motion.div>

            {/* Weight Progress Chart */}
            {measurements.length >= 2 && (
              <motion.div
                variants={itemVariants}
                className="rounded-2xl border border-zinc-800 bg-zinc-900/80 backdrop-blur-sm shadow-xl shadow-black/20 p-6 hover:border-emerald-500/40 hover:shadow-emerald-glow-md transition-all duration-300"
              >
                <h4 className="text-lg font-semibold text-zinc-50 mb-4">
                  Weight Trend
                </h4>
                <WeightChart measurements={measurements} />
              </motion.div>
            )}

            {/* Focus Breakdown Widget */}
            <motion.div
              variants={itemVariants}
              className="rounded-2xl border border-zinc-800 bg-zinc-900/80 backdrop-blur-sm shadow-xl shadow-black/20 overflow-hidden hover:border-emerald-500/40 hover:shadow-emerald-glow-md transition-all duration-300"
            >
              <FocusBreakdownWidget />
            </motion.div>

            {/* Notes & Highlights Widget */}
            <motion.div
              variants={itemVariants}
              className="rounded-2xl border border-zinc-800 bg-zinc-900/80 backdrop-blur-sm shadow-xl shadow-black/20 overflow-hidden hover:border-emerald-500/40 hover:shadow-emerald-glow-md transition-all duration-300"
            >
              <NotesHighlightsWidget />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
