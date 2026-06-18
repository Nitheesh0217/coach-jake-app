"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
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
  Play
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  Radar, 
  ResponsiveContainer 
} from "recharts";
import { Workout, Profile } from "@/types";
import WeightChart from "./WeightChart";
import MeasurementsWidget from "./MeasurementsWidget";
import { markWorkoutComplete } from "@/app/(app)/dashboard/actions";
import { toast } from "sonner";

// Dynamic import of 3D Tactical Playground to ensure SSR compatibility
const TacticalPlayground3D = dynamic(() => import("../3d/TacticalPlayground3D"), { ssr: false });

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
  recentSessions?: any[];
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
  const [dashboardTab, setDashboardTab] = useState<"stats" | "playbook">("stats");
  const [activePlay, setActivePlay] = useState(0);

  // Set up local checklist states for interactive preview
  const [checklist, setChecklist] = useState([
    { id: 1, text: "Explosive Warmup: 10 mins", done: false },
    { id: 2, text: "Active Plyos: Box jumps & bounds", done: false },
    { id: 3, text: "Strength Series: Squat to press", done: false }
  ]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleCheck = (id: number) => {
    setChecklist(
      checklist.map((item) =>
        item.id === id ? { ...item, done: !item.done } : item
      )
    );
  };

  const allCompleted = checklist.every((item) => item.done);

  const handleLogWorkout = async () => {
    if (!todayWorkout) return;
    setIsSubmitting(true);
    try {
      const res = await markWorkoutComplete({
        workoutId: todayWorkout.id,
        notes: notes || undefined
      });
      if (res.success) {
        toast.success("Workout logged successfully! Keep building your stats.");
        setAlreadyLogged(true);
      } else {
        toast.error(res.error || "Failed to log workout.");
      }
    } catch (err) {
      toast.error("An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Build Radar Chart data dynamically from profile playstyle metrics
  const playstyleTeam = profile?.playstyle_team_vs_iso ?? 50;
  const playstyleShooter = profile?.playstyle_shooter_vs_slasher ?? 50;
  const playstyleFinesse = profile?.playstyle_finesse_vs_power ?? 50;

  const radarData = [
    { subject: "Shooting", value: playstyleShooter, fullMark: 100 },
    { subject: "Athleticism", value: 80, fullMark: 100 },
    { subject: "Team Play", value: 100 - playstyleTeam, fullMark: 100 },
    { subject: "Finesse", value: playstyleFinesse, fullMark: 100 },
    { subject: "Playmaking", value: 75, fullMark: 100 },
  ];

  const archetype = profile?.player_archetype ?? "Prospect";
  const firstName = profile?.full_name?.split(" ")[0] ?? "Athlete";
  const dateStr = new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });
  const completion = last30DaysCount > 0 ? Math.min(Math.round((last30DaysCount / 12) * 100), 100) : 0;

  const kpis = [
    { label: "SESSIONS THIS WEEK", value: weekLogsCount, suffix: "", icon: Calendar, color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/20", trend: "Target: 4 sessions" },
    { label: "THIS MONTH", value: last30DaysCount, suffix: "", icon: TrendingUp, color: "text-cyan-400", bg: "bg-cyan-500/10 border-cyan-500/20", trend: "+25% vs last month" },
    { label: "COMPLETION RATE", value: completion, suffix: "%", icon: Target, color: "text-violet-400", bg: "bg-violet-500/10 border-violet-500/20", trend: "Based on assignments" },
    { label: "CURRENT STREAK", value: currentStreak, suffix: " Days", icon: Flame, color: "text-amber-400", bg: "bg-amber-500/10 border-amber-500/20", trend: "Days in a row" },
  ];

  return (
    <div className="min-h-screen bg-[#050816] text-white">
      {/* Background glow animations */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-[-10%] right-[10%] w-[600px] h-[600px] rounded-full bg-emerald-500/5 blur-[120px] animate-pulse" />
        <div className="absolute bottom-[20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-cyan-500/5 blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8 relative z-10">
        
        {/* Header Section */}
        <motion.div {...fade(0)} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight flex items-center gap-3">
              Let's get to work, {firstName} <span className="animate-bounce">🏀</span>
            </h1>
            <p className="text-zinc-500 text-sm mt-1 uppercase tracking-wider font-semibold">{dateStr}</p>
          </div>
          
          <div className="inline-flex items-center gap-3 bg-zinc-900/60 border border-white/10 rounded-2xl px-4 py-2 text-zinc-300">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-xs font-bold uppercase tracking-widest text-zinc-400">
              Archetype: {profile?.player_archetype || "Prospect"}
            </span>
          </div>
        </motion.div>

        {/* Dashboard Tab Selector */}
        <motion.div {...fade(0.05)} className="flex justify-center border-b border-white/5 pb-4 mb-6">
          <div className="inline-flex rounded-2xl bg-zinc-950 p-1.5 border border-white/5">
            <button
              onClick={() => setDashboardTab("stats")}
              className={`rounded-xl px-6 py-2.5 text-xs font-black uppercase tracking-widest transition-all ${
                dashboardTab === "stats"
                  ? "bg-emerald-500 text-black shadow-[0_0_20px_rgba(16,185,129,0.3)]"
                  : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              Player Cards
            </button>
            <button
              onClick={() => setDashboardTab("playbook")}
              className={`rounded-xl px-6 py-2.5 text-xs font-black uppercase tracking-widest transition-all ${
                dashboardTab === "playbook"
                  ? "bg-emerald-500 text-black shadow-[0_0_20px_rgba(16,185,129,0.3)]"
                  : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              Tactical Board
            </button>
          </div>
        </motion.div>

        {/* ── TAB CONTENT ── */}
        <AnimatePresence mode="wait">
          {dashboardTab === "stats" ? (
            <motion.div
              key="stats"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="space-y-8"
            >
              {/* KPI Grid Section */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {kpis.map(({ label, value, suffix, icon: Icon, color, bg, trend }, i) => (
                  <div 
                    key={label}
                    className="rounded-2xl border border-white/5 bg-zinc-900/40 backdrop-blur-sm p-5 hover:border-emerald-500/20 transition-all duration-300 flex flex-col justify-between"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[9px] uppercase tracking-widest text-zinc-500 font-black leading-tight">{label}</span>
                      <div className={`p-2 rounded-xl border ${bg}`}>
                        <Icon className={`w-4 h-4 ${color}`} />
                      </div>
                    </div>
                    <div>
                      <p className={`text-2xl sm:text-3xl font-black ${color}`}>{value}{suffix}</p>
                      <p className="text-[10px] text-zinc-600 mt-1.5 font-bold uppercase tracking-wide">
                        {trend}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Main 12-Column Layout Grid */}
              <div className="grid lg:grid-cols-12 gap-8">
                
                {/* Left Column (8 Columns): Today's workout & Weight trend */}
                <div className="lg:col-span-8 space-y-8">
                  
                  {/* Today's Workout card */}
                  <div className="rounded-3xl border border-white/10 bg-zinc-900/40 backdrop-blur-sm p-6 sm:p-8">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6 pb-6 border-b border-white/5">
                      <div>
                        <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-black block mb-1">Today's Assigned training</span>
                        <h2 className="text-xl sm:text-2xl font-black text-white">
                          {todayWorkout?.title ?? "Rest & Recovery"}
                        </h2>
                      </div>
                      {todayWorkout && (
                        <span className="inline-flex items-center gap-1.5 text-xs text-zinc-300 bg-zinc-800/80 border border-white/5 rounded-xl px-4 py-2">
                          <Clock className="w-4 h-4 text-emerald-400" />
                          {todayWorkout.duration ?? 30} MIN
                        </span>
                      )}
                    </div>

                    {todayWorkout ? (
                      <div className="space-y-6">
                        <p className="text-sm text-zinc-400 leading-relaxed">
                          {todayWorkout.description}
                        </p>

                        {/* Checklist wrapper */}
                        <div className="space-y-3">
                          <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Interactive Checklist</p>
                          
                          <div className="grid gap-3">
                            {checklist.map((item) => (
                              <button
                                key={item.id}
                                onClick={() => toggleCheck(item.id)}
                                className={`w-full flex items-center justify-between rounded-2xl p-4 border text-left transition-all duration-200 ${
                                  item.done
                                    ? "bg-emerald-500/10 border-emerald-500/30 text-white"
                                    : "bg-zinc-950/40 border-white/5 hover:border-white/10 text-zinc-300"
                                }`}
                              >
                                <span className="text-sm font-bold">{item.text}</span>
                                <div className={`w-5.5 h-5.5 rounded-full border flex items-center justify-center transition-all ${
                                  item.done ? "bg-emerald-500 border-emerald-500 text-black" : "border-zinc-700 bg-transparent"
                                }`}>
                                  {item.done && <Check className="w-3.5 h-3.5 stroke-[3.5]" />}
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Logging Panel */}
                        <div className="pt-6 border-t border-white/5 space-y-4">
                          {!alreadyLogged ? (
                            <>
                              <div className="flex items-center gap-2 rounded-2xl border border-white/5 bg-zinc-950/40 p-3">
                                <MessageSquare className="w-4 h-4 text-zinc-500 flex-shrink-0" />
                                <input
                                  type="text"
                                  placeholder="Add optional notes (e.g. felt strong, box height 24 inches)"
                                  value={notes}
                                  onChange={(e) => setNotes(e.target.value)}
                                  className="bg-transparent text-sm w-full text-zinc-300 placeholder-zinc-600 focus:outline-none"
                                />
                              </div>

                              {allCompleted ? (
                                <motion.div
                                  initial={{ scale: 0.98 }}
                                  animate={{ scale: 1 }}
                                  transition={{ type: "spring", stiffness: 300, damping: 10 }}
                                >
                                  <button
                                    onClick={handleLogWorkout}
                                    disabled={isSubmitting}
                                    className="w-full flex items-center justify-center gap-2 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-black font-black text-sm py-4 transition-all duration-300 shadow-[0_0_30px_rgba(16,185,129,0.4)]"
                                  >
                                    <CheckCircle2 className="w-4 h-4" /> 
                                    {isSubmitting ? "LOGGING..." : "LOG SESSION COMPLETE"}
                                  </button>
                                </motion.div>
                              ) : (
                                <button
                                  disabled
                                  className="w-full flex items-center justify-center gap-2 rounded-2xl bg-zinc-800 text-zinc-500 font-black text-sm py-4 cursor-not-allowed border border-white/5"
                                >
                                  Complete all checklist items to log
                                </button>
                              )}
                            </>
                          ) : (
                            <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-6 py-4 flex items-center gap-3 text-emerald-300">
                              <Check className="w-5 h-5 flex-shrink-0" />
                              <span className="text-sm font-bold">Good work! Today's session is successfully logged.</span>
                            </div>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <Dumbbell className="w-12 h-12 text-zinc-700 mx-auto mb-4" />
                        <p className="text-zinc-400 text-sm font-semibold">Today is a rest day. Focus on hydration & active recovery!</p>
                        <a href="/workouts" className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 font-bold text-xs uppercase tracking-widest mt-4">
                          Browse All Workouts <ArrowRight className="w-4 h-4" />
                        </a>
                      </div>
                    )}
                  </div>

                  {/* Weight / Measurement trend */}
                  <div className="rounded-3xl border border-white/10 bg-zinc-900/40 backdrop-blur-sm p-6 sm:p-8">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-xl bg-cyan-500/15 border border-cyan-500/30">
                          <BarChart2 className="w-4 h-4 text-cyan-400" />
                        </div>
                        <h3 className="text-lg font-black text-white">Weight & Telemetry</h3>
                      </div>
                      <span className="text-[10px] text-zinc-400 bg-zinc-800/80 border border-white/5 rounded-xl px-3 py-1.5 font-bold uppercase tracking-wider">
                        Weight (kg)
                      </span>
                    </div>
                    
                    {measurements.length >= 2 ? (
                      <div className="space-y-4">
                        <div className="h-[280px] w-full">
                          <WeightChart measurements={measurements} />
                        </div>
                      </div>
                    ) : (
                      <MeasurementsWidget initialMeasurements={measurements} />
                    )}
                  </div>

                </div>

                {/* Right Column (4 Columns): Streak, Radar, and logs */}
                <div className="lg:col-span-4 space-y-8">
                  
                  {/* Streak card */}
                  <div className="rounded-3xl border border-white/10 bg-zinc-900/40 backdrop-blur-sm p-6 flex flex-col items-center text-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-amber-500/5 to-transparent pointer-events-none" />

                    <div className="w-full flex items-center justify-between border-b border-white/5 pb-4 mb-6">
                      <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Streak Status</span>
                      <Flame className="w-5 h-5 text-amber-500" />
                    </div>

                    <div className="relative w-40 h-40 flex items-center justify-center">
                      <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 144 144">
                        <circle cx="72" cy="72" r="62" fill="none" stroke="#18181b" strokeWidth="8" />
                        <circle 
                          cx="72" 
                          cy="72" 
                          r="62" 
                          fill="none"
                          stroke="url(#streakGrad)" 
                          strokeWidth="8"
                          strokeLinecap="round"
                          strokeDasharray={`${Math.min(currentStreak / 15, 1) * 390} 390`} 
                        />
                        <defs>
                          <linearGradient id="streakGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#f59e0b" />
                            <stop offset="100%" stopColor="#ef4444" />
                          </linearGradient>
                        </defs>
                      </svg>
                      <div className="flex flex-col items-center">
                        <span className="text-5xl font-black text-amber-400 tracking-tight">{currentStreak}</span>
                        <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest mt-0.5">DAYS ACTIVE</span>
                      </div>
                    </div>

                    <p className="text-zinc-400 text-xs mt-6 leading-relaxed max-w-[200px]">
                      {currentStreak > 7 
                        ? "Unstoppable streak! Coach Jake is watching." 
                        : currentStreak > 0 
                          ? "Great momentum. Keep completing workouts!" 
                          : "No workout logged this week. Let's start a new streak!"}
                    </p>
                  </div>

                  {/* Recharts Radar chart card */}
                  <div className="rounded-3xl border border-white/10 bg-zinc-900/40 backdrop-blur-sm p-6">
                    <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-4">
                      <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Player Card Attributes</span>
                      <Sparkles className="w-4 h-4 text-emerald-400 animate-pulse" />
                    </div>

                    {mounted ? (
                      <div className="h-[220px] w-full flex items-center justify-center">
                        <ResponsiveContainer width="100%" height={220}>
                          <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarData}>
                            <PolarGrid stroke="#27272a" />
                            <PolarAngleAxis 
                              dataKey="subject" 
                              stroke="#71717a" 
                              tick={{ fontSize: 9, fontWeight: 700 }}
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
                              fillOpacity={0.25}
                            />
                          </RadarChart>
                        </ResponsiveContainer>
                      </div>
                    ) : (
                      <div className="h-[220px] flex items-center justify-center text-zinc-600 text-xs">Loading Radar Chart...</div>
                    )}

                    <div className="border-t border-white/5 pt-4 flex items-center justify-between text-xs mt-4">
                      <span className="font-bold text-zinc-500 uppercase tracking-widest">Archetype</span>
                      <span className="font-black text-emerald-400 uppercase tracking-wider">{archetype}</span>
                    </div>
                  </div>

                  {/* Recent Sessions list */}
                  <div className="rounded-3xl border border-white/10 bg-zinc-900/40 backdrop-blur-sm p-6">
                    <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-4">
                      <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Recent Sessions</span>
                      <span className="text-[10px] text-zinc-600 font-bold uppercase tracking-wider">Last 3</span>
                    </div>

                    <div className="space-y-3">
                      {recentSessions.length > 0 ? (
                        recentSessions.slice(0, 3).map((log: any, i: number) => (
                          <div 
                            key={log.id ?? i} 
                            className="flex items-center gap-3 p-3 rounded-xl bg-zinc-950/40 border border-white/5 hover:border-white/10 transition-colors"
                          >
                            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <Dumbbell className="w-4 h-4 text-emerald-400" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-bold text-white truncate">{log.workouts?.title ?? "Logged Workout"}</p>
                              <p className="text-[10px] text-zinc-500 mt-0.5">
                                {new Date(log.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                                {log.notes ? ` • "${log.notes}"` : ""}
                              </p>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-6">
                          <p className="text-xs text-zinc-600 font-medium">No sessions logged yet.</p>
                        </div>
                      )}
                    </div>
                  </div>

                </div>

              </div>
            </motion.div>
          ) : (
            <motion.div
              key="playbook"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="space-y-6"
            >
              {/* 3D Simulation Panel */}
              <div className="rounded-3xl border border-white/10 bg-zinc-900/40 backdrop-blur-sm p-5 sm:p-6 shadow-xl">
                <div className="h-[480px] w-full relative">
                  {mounted && (
                    <TacticalPlayground3D activeProgram={activePlay} />
                  )}
                </div>

                {/* Simulation Control Tabs */}
                <div className="flex justify-center border-t border-white/5 pt-6 mt-6">
                  <div className="inline-flex rounded-2xl bg-zinc-950 p-1.5 border border-white/5">
                    {[
                      { id: 0, label: "Plyometrics" },
                      { id: 1, label: "Pick & Roll" },
                      { id: 2, label: "Skills Drill" }
                    ].map((play) => (
                      <button
                        key={play.id}
                        onClick={() => setActivePlay(play.id)}
                        className={`rounded-xl px-5 py-3 text-xs font-black uppercase tracking-widest transition-all ${
                          activePlay === play.id
                            ? "bg-cyan-500 text-black shadow-[0_0_20px_rgba(6,182,212,0.4)] font-black"
                            : "text-zinc-500 hover:text-zinc-300"
                        }`}
                      >
                        {play.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
