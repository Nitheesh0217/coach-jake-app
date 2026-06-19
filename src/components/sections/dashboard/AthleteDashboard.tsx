"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import {
  Flame,
  Dumbbell,
  Calendar,
  TrendingUp,
  Target,
  CheckCircle2,
  ArrowRight,
  BarChart2,
  Clock,
  Sparkles,
  MessageSquare,
  Check,
  Plus,
  Play,
  Trophy,
  Activity,
  Heart,
  Zap,
  AlertCircle,
  ChevronRight,
  Shield,
  Download,
  TrendingDown,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as ChartTooltip,
} from "recharts";
import { Workout, Profile, RecentSession } from "@/types";
import WeightChart from "@/components/charts/WeightChart";
import MeasurementsWidget from "./MeasurementsWidget";
import { markWorkoutComplete } from "@/app/(app)/dashboard/actions";
import { toast } from "sonner";

const TacticalPlayground3D = dynamic(
  () => import("@/components/3d/TacticalPlayground3D"),
  { ssr: false },
);

interface Measurement {
  id: string;
  date: string;
  weight_kg: number;
}

interface Props {
  profile: Profile;
  todayWorkout: Workout | null;
  weekLogsCount: number;
  last30DaysCount: number;
  measurements: Measurement[];
  currentStreak: number;
  longestStreak: number;
  recentSessions?: RecentSession[];
  hasLoggedToday?: boolean;
}

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] as any },
});

export default function AthleteDashboard({
  profile,
  todayWorkout,
  weekLogsCount,
  last30DaysCount,
  measurements,
  currentStreak,
  longestStreak,
  recentSessions = [],
  hasLoggedToday = false,
}: Props) {
  const [mounted, setMounted] = useState(false);
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [alreadyLogged, setAlreadyLogged] = useState(hasLoggedToday);
  const [dashboardTab, setDashboardTab] = useState<
    "overview" | "workouts" | "progress"
  >("overview");
  const [activePlay, setActivePlay] = useState(0);

  const [checklist, setChecklist] = useState([
    { id: 1, text: "Dynamic Warmup: 5-10 mins", done: false },
    { id: 2, text: "Strength Foundation: Core work", done: false },
    { id: 3, text: "Main Workout: Skill building", done: false },
    { id: 4, text: "Cooldown & Recovery: 5 mins", done: false },
  ]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleCheck = (id: number) => {
    setChecklist(
      checklist.map((item) =>
        item.id === id ? { ...item, done: !item.done } : item,
      ),
    );
  };

  const allCompleted = checklist.every((item) => item.done);

  const handleLogWorkout = async () => {
    if (!todayWorkout) return;
    setIsSubmitting(true);
    try {
      const res = await markWorkoutComplete({
        workoutId: todayWorkout.id,
        notes: notes || undefined,
      });
      if (res.success) {
        toast.success("Excellent! Session logged. 🔥");
        setAlreadyLogged(true);
      } else {
        toast.error(res.error || "Failed to log workout");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const completion =
    last30DaysCount > 0
      ? Math.min(Math.round((last30DaysCount / 12) * 100), 100)
      : 0;

  return (
    <div className="min-h-screen bg-transparent text-white pb-24 md:pb-8">
      {/* Background glow animations */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-[-10%] right-[10%] w-[600px] h-[600px] rounded-full bg-emerald-500/5 blur-[120px] animate-pulse" />
        <div className="absolute bottom-[20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-cyan-500/5 blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-8 relative z-10">
        {/* HEADER SECTION */}
        <motion.div {...fade(0)} className="space-y-6">
          {/* Greeting & Status */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight flex items-center gap-2">
                Welcome back, {profile?.full_name?.split(" ")[0] ?? "Athlete"}
                <span className="text-2xl">🏀</span>
              </h1>
              <p className="text-zinc-400 text-sm mt-2">
                {new Date().toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>

            <div className="inline-flex items-center gap-3 bg-zinc-900/60 border border-white/10 rounded-2xl px-4 py-3 backdrop-blur-sm">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-widest text-zinc-300">
                {profile?.player_archetype || "Prospect"}
              </span>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="hidden sm:flex gap-2 border-b border-white/5 pb-4">
            {[
              { id: "overview", label: "Overview", icon: BarChart2 },
              { id: "workouts", label: "Workouts", icon: Dumbbell },
              { id: "progress", label: "Progress", icon: TrendingUp },
            ].map((tab) => {
              const Icon = tab.icon as any;
              return (
                <button
                  key={tab.id}
                  onClick={() => setDashboardTab(tab.id as any)}
                  className={`flex items-center gap-2 px-4 py-3 text-sm font-bold uppercase tracking-wider rounded-lg transition-all duration-200 ${
                    dashboardTab === tab.id
                      ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                      : "text-zinc-400 hover:text-zinc-300"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* KPI CARDS GRID */}
        <motion.div
          {...fade(0.1)}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {[
            {
              label: "This Week",
              value: weekLogsCount,
              suffix: "Sessions",
              icon: Calendar,
              color: "text-emerald-400",
              bg: "from-emerald-500/10 to-emerald-500/5",
              border: "border-emerald-500/20",
              trend:
                weekLogsCount >= 4 ? "On track!" : `${4 - weekLogsCount} to go`,
            },
            {
              label: "This Month",
              value: last30DaysCount,
              suffix: "Total",
              icon: TrendingUp,
              color: "text-cyan-400",
              bg: "from-cyan-500/10 to-cyan-500/5",
              border: "border-cyan-500/20",
              trend: "+15% consistency",
            },
            {
              label: "Completion",
              value: completion,
              suffix: "%",
              icon: Target,
              color: "text-violet-400",
              bg: "from-violet-500/10 to-violet-500/5",
              border: "border-violet-500/20",
              trend: "30-day avg",
            },
            {
              label: "Current Streak",
              value: currentStreak,
              suffix: "Days",
              icon: Flame,
              color: "text-amber-400",
              bg: "from-amber-500/10 to-amber-500/5",
              border: "border-amber-500/20",
              trend: currentStreak > 0 ? "Keep going!" : "Start today",
            },
          ].map((kpi, idx) => {
            const Icon = kpi.icon;
            return (
              <motion.div
                key={kpi.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.12 + idx * 0.06 }}
                className={`rounded-2xl border ${kpi.border} bg-gradient-to-br ${kpi.bg} backdrop-blur-sm p-5 hover:border-opacity-100 transition-all duration-300 flex flex-col justify-between h-full`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] uppercase tracking-widest text-zinc-400 font-black">
                    {kpi.label}
                  </span>
                  <Icon className={`w-4 h-4 ${kpi.color}`} />
                </div>
                <div>
                  <p className={`text-3xl sm:text-4xl font-black ${kpi.color}`}>
                    {kpi.value}
                    <span className="text-sm ml-1">{kpi.suffix}</span>
                  </p>
                  <p className="text-[10px] text-zinc-500 mt-2 font-bold uppercase tracking-wide">
                    {kpi.trend}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* TAB CONTENT */}
        <AnimatePresence mode="wait">
          {dashboardTab === "overview" && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              {/* TODAY'S WORKOUT SECTION */}
              <div className="lg:grid lg:grid-cols-3 gap-8">
                {/* Main workout card - 2 columns */}
                <motion.div
                  {...fade(0.15)}
                  className="lg:col-span-2 rounded-3xl border border-white/10 bg-zinc-900/40 backdrop-blur-sm p-6 sm:p-8"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6 pb-6 border-b border-white/5">
                    <div>
                      <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-black block mb-2">
                        Today's Training
                      </span>
                      <h2 className="text-2xl sm:text-3xl font-black text-white">
                        {todayWorkout?.title ?? "Rest & Recovery"}
                      </h2>
                      <p className="text-sm text-zinc-400 mt-2">
                        {todayWorkout?.description ??
                          "Focus on hydration and active recovery"}
                      </p>
                    </div>
                    {todayWorkout && (
                      <div className="flex items-center gap-3 bg-zinc-800/60 border border-white/10 rounded-xl px-4 py-3 flex-shrink-0">
                        <Clock className="w-4 h-4 text-emerald-400" />
                        <span className="font-bold text-sm">
                          {todayWorkout.duration ?? 30} MIN
                        </span>
                      </div>
                    )}
                  </div>

                  {todayWorkout ? (
                    <div className="space-y-6">
                      {/* Checklist */}
                      <div className="space-y-4">
                        <p className="text-[11px] font-black uppercase tracking-widest text-zinc-500">
                          Workout Checklist
                        </p>
                        <div className="grid gap-3">
                          {checklist.map((item) => (
                            <motion.button
                              key={item.id}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => toggleCheck(item.id)}
                              className={`w-full flex items-center justify-between rounded-2xl p-4 border text-left transition-all duration-200 ${
                                item.done
                                  ? "bg-emerald-500/15 border-emerald-500/40 text-emerald-100"
                                  : "bg-zinc-950/50 border-white/10 hover:border-white/20 text-zinc-300 hover:text-white"
                              }`}
                            >
                              <span className="text-sm font-bold">
                                {item.text}
                              </span>
                              <div
                                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                                  item.done
                                    ? "bg-emerald-500 border-emerald-500"
                                    : "border-zinc-500 bg-transparent"
                                }`}
                              >
                                {item.done && (
                                  <Check className="w-3 h-3 text-black stroke-[3.5]" />
                                )}
                              </div>
                            </motion.button>
                          ))}
                        </div>
                      </div>

                      {/* Logging Section */}
                      <div className="pt-6 border-t border-white/10 space-y-4">
                        {!alreadyLogged ? (
                          <>
                            <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-zinc-950/50 px-4 py-3">
                              <MessageSquare className="w-4 h-4 text-zinc-500 flex-shrink-0" />
                              <input
                                type="text"
                                placeholder="Add optional notes (e.g., felt strong, form was good)"
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                className="bg-transparent text-sm w-full text-zinc-300 placeholder-zinc-600 focus:outline-none"
                              />
                            </div>

                            {allCompleted ? (
                              <motion.button
                                initial={{ scale: 0.95 }}
                                animate={{ scale: 1 }}
                                onClick={handleLogWorkout}
                                disabled={isSubmitting}
                                className="w-full flex items-center justify-center gap-2 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-black font-black text-sm py-4 transition-all duration-300 shadow-[0_0_30px_rgba(16,185,129,0.3)] disabled:opacity-50"
                              >
                                <CheckCircle2 className="w-5 h-5" />
                                {isSubmitting
                                  ? "LOGGING..."
                                  : "LOG WORKOUT COMPLETE"}
                              </motion.button>
                            ) : (
                              <button
                                disabled
                                className="w-full flex items-center justify-center gap-2 rounded-2xl bg-zinc-800/50 text-zinc-500 font-bold text-sm py-4 cursor-not-allowed border border-white/5"
                              >
                                <AlertCircle className="w-4 h-4" />
                                Complete all items to log
                              </button>
                            )}
                          </>
                        ) : (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="rounded-2xl border border-emerald-500/40 bg-emerald-500/15 px-6 py-4 flex items-center gap-3 text-emerald-300"
                          >
                            <Check className="w-5 h-5 flex-shrink-0" />
                            <div>
                              <p className="text-sm font-bold">Great job!</p>
                              <p className="text-xs text-emerald-200 mt-0.5">
                                Today's session is logged. Keep the momentum!
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <Dumbbell className="w-12 h-12 text-zinc-700 mx-auto mb-4" />
                      <p className="text-zinc-400 text-sm font-semibold">
                        Rest day today
                      </p>
                      <p className="text-zinc-500 text-xs mt-2">
                        Focus on recovery, mobility & nutrition
                      </p>
                      <Link
                        href="/workouts"
                        className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 font-bold text-xs uppercase tracking-widest mt-4"
                      >
                        Browse Workouts <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  )}
                </motion.div>

                {/* Streak Card - 1 column */}
                <motion.div
                  {...fade(0.2)}
                  className="rounded-3xl border border-white/10 bg-zinc-900/40 backdrop-blur-sm p-6 sm:p-8 flex flex-col items-center text-center relative overflow-hidden h-fit"
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-amber-500/5 to-transparent pointer-events-none" />

                  <div className="w-full flex items-center justify-center gap-2 mb-6">
                    <Flame className="w-5 h-5 text-amber-500" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">
                      Streak Status
                    </span>
                  </div>

                  <div className="relative w-48 h-48 flex items-center justify-center mb-6">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-amber-500/10 to-red-500/5 blur-2xl" />

                    <svg
                      className="absolute inset-0 w-full h-full -rotate-90"
                      viewBox="0 0 200 200"
                    >
                      <defs>
                        <linearGradient
                          id="streakGrad"
                          x1="0%"
                          y1="0%"
                          x2="100%"
                          y2="0%"
                        >
                          <stop offset="0%" stopColor="#f59e0b" />
                          <stop offset="100%" stopColor="#ef4444" />
                        </linearGradient>
                      </defs>
                      <circle
                        cx="100"
                        cy="100"
                        r="90"
                        fill="none"
                        stroke="#18181b"
                        strokeWidth="12"
                      />
                      <circle
                        cx="100"
                        cy="100"
                        r="90"
                        fill="none"
                        stroke="url(#streakGrad)"
                        strokeWidth="12"
                        strokeLinecap="round"
                        strokeDasharray={`${Math.min(currentStreak / 20, 1) * 565} 565`}
                        className="transition-all duration-1000"
                      />
                    </svg>

                    <div className="flex flex-col items-center relative z-10">
                      <span className="text-6xl font-black text-amber-400 tracking-tight">
                        {currentStreak}
                      </span>
                      <span className="text-[11px] font-black text-zinc-500 uppercase tracking-widest mt-1">
                        Days Active
                      </span>
                    </div>
                  </div>

                  <p className="text-zinc-400 text-xs leading-relaxed">
                    {currentStreak > 14
                      ? "🔥 Unstoppable! Coach Jake is impressed."
                      : currentStreak > 7
                        ? "💪 Great momentum! Keep it going!"
                        : currentStreak > 0
                          ? "Good start! Build on this!"
                          : "Start your streak today!"}
                  </p>

                  <div className="w-full mt-6 pt-6 border-t border-white/10 text-center">
                    <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-black mb-2">
                      Personal Best
                    </p>
                    <p className="text-2xl font-black text-emerald-400">
                      {longestStreak}
                    </p>
                    <p className="text-[10px] text-zinc-600 mt-1">days</p>
                  </div>
                </motion.div>
              </div>

              {/* Weight & Telemetry Section */}
              <motion.div
                {...fade(0.25)}
                className="rounded-3xl border border-white/10 bg-zinc-900/40 backdrop-blur-sm p-6 sm:p-8"
              >
                <div className="flex items-center justify-between mb-6 pb-6 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-xl bg-cyan-500/15 border border-cyan-500/30">
                      <BarChart2 className="w-5 h-5 text-cyan-400" />
                    </div>
                    <h3 className="text-lg font-black text-white">
                      Weight & Performance Tracking
                    </h3>
                  </div>
                  <span className="text-[11px] text-zinc-400 bg-zinc-800/60 border border-white/10 rounded-xl px-3 py-2 font-bold uppercase tracking-wider">
                    Last 30 Days
                  </span>
                </div>

                {measurements.length >= 2 ? (
                  <div className="h-80 w-full">
                    <WeightChart measurements={measurements} />
                  </div>
                ) : (
                  <MeasurementsWidget initialMeasurements={measurements} />
                )}
              </motion.div>
            </motion.div>
          )}

          {dashboardTab === "workouts" && (
            <motion.div
              key="workouts"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              {/* Recent Sessions */}
              <motion.div
                {...fade(0.15)}
                className="rounded-3xl border border-white/10 bg-zinc-900/40 backdrop-blur-sm p-6 sm:p-8"
              >
                <div className="flex items-center justify-between mb-6 pb-6 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30">
                      <Trophy className="w-5 h-5 text-emerald-400" />
                    </div>
                    <h3 className="text-lg font-black text-white">
                      Recent Sessions
                    </h3>
                  </div>
                  <span className="text-[11px] text-zinc-500 font-bold uppercase tracking-wider">
                    Latest 5
                  </span>
                </div>

                <div className="space-y-3">
                  {recentSessions.length > 0 ? (
                    recentSessions
                      .slice(0, 5)
                      .map((log: RecentSession, i: number) => (
                        <motion.div
                          key={log.id ?? i}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.08 }}
                          className="flex items-center justify-between p-4 rounded-2xl bg-zinc-950/50 border border-white/10 hover:border-emerald-500/30 hover:bg-zinc-950/70 transition-all group cursor-pointer"
                        >
                          <div className="flex items-center gap-4 flex-1 min-w-0">
                            <div className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex-shrink-0">
                              <Dumbbell className="w-4 h-4 text-emerald-400" />
                            </div>
                            <div className="min-w-0">
                              <p className="text-sm font-bold text-white truncate">
                                {log.workouts?.title ?? "Logged Workout"}
                              </p>
                              <p className="text-xs text-zinc-500 mt-1">
                                {new Date(log.date).toLocaleDateString(
                                  "en-US",
                                  {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric",
                                  },
                                )}
                                {log.notes ? ` • ${log.notes}` : ""}
                              </p>
                            </div>
                          </div>
                          <ChevronRight className="w-4 h-4 text-zinc-600 group-hover:text-emerald-400 transition-colors flex-shrink-0" />
                        </motion.div>
                      ))
                  ) : (
                    <div className="text-center py-12">
                      <Activity className="w-12 h-12 text-zinc-700 mx-auto mb-4" />
                      <p className="text-zinc-500 text-sm">
                        No sessions logged yet
                      </p>
                      <p className="text-zinc-600 text-xs mt-2">
                        Complete your first workout to see it here
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}

          {dashboardTab === "progress" && (
            <motion.div
              key="progress"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              {/* Player Card Attributes - Radar */}
              <motion.div
                {...fade(0.15)}
                className="rounded-3xl border border-white/10 bg-zinc-900/40 backdrop-blur-sm p-6 sm:p-8"
              >
                <div className="flex items-center justify-between mb-6 pb-6 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30">
                      <Sparkles className="w-5 h-5 text-emerald-400" />
                    </div>
                    <h3 className="text-lg font-black text-white">
                      Player Card Attributes
                    </h3>
                  </div>
                  <span className="text-[11px] text-zinc-500 font-bold uppercase tracking-wider">
                    Playstyle
                  </span>
                </div>

                {mounted ? (
                  <div className="h-80 w-full flex items-center justify-center">
                    <ResponsiveContainer width="100%" height={320}>
                      <RadarChart
                        cx="50%"
                        cy="50%"
                        outerRadius="80%"
                        data={[
                          {
                            subject: "Shooting",
                            value: profile?.playstyle_shooter_vs_slasher ?? 50,
                            fullMark: 100,
                          },
                          { subject: "Athleticism", value: 80, fullMark: 100 },
                          {
                            subject: "Team Play",
                            value: 100 - (profile?.playstyle_team_vs_iso ?? 50),
                            fullMark: 100,
                          },
                          {
                            subject: "Finesse",
                            value: profile?.playstyle_finesse_vs_power ?? 50,
                            fullMark: 100,
                          },
                          { subject: "Playmaking", value: 75, fullMark: 100 },
                        ]}
                      >
                        <PolarGrid stroke="#27272a" />
                        <PolarAngleAxis
                          dataKey="subject"
                          stroke="#71717a"
                          tick={{ fontSize: 10, fontWeight: 700 }}
                        />
                        <PolarRadiusAxis
                          angle={30}
                          domain={[0, 100]}
                          tick={false}
                          axisLine={false}
                        />
                        <Radar
                          name="Athlete"
                          dataKey="value"
                          stroke="#10b981"
                          fill="#10b981"
                          fillOpacity={0.3}
                        />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                ) : (
                  <div className="h-80 flex items-center justify-center text-zinc-600 text-sm">
                    Loading...
                  </div>
                )}

                <div className="border-t border-white/10 pt-6 mt-6 grid grid-cols-2 gap-4">
                  <div className="text-center p-4 rounded-xl bg-zinc-950/50 border border-white/5">
                    <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-black mb-2">
                      Archetype
                    </p>
                    <p className="text-lg font-black text-emerald-400">
                      {profile?.player_archetype || "Prospect"}
                    </p>
                  </div>
                  <div className="text-center p-4 rounded-xl bg-zinc-950/50 border border-white/5">
                    <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-black mb-2">
                      Best Streak
                    </p>
                    <p className="text-lg font-black text-amber-400">
                      {longestStreak}d
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
