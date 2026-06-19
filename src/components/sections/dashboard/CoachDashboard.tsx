"use client";

import { useState } from "react";
import {
  Users,
  Zap,
  Star,
  TrendingUp,
  ChevronDown,
  Plus,
  Eye,
  CheckCircle2,
  Clock,
  AlertCircle,
  ArrowRight,
  Dumbbell,
  Target,
  Calendar,
  Search,
  X,
  Send,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { assignWorkout } from "@/app/(app)/trainer-dashboard/actions";
import { supabaseBrowser } from "@/lib/supabaseClient";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface AthleteRow {
  user_id: string;
  email: string;
  full_name: string | null;
  age: number | null;
  player_archetype?: string | null;
  sessions_this_week?: number;
  sessions_30d?: number;
  last_workout_date?: string | null;
  completion_percentage?: number;
  playstyle_team_vs_iso?: number | null;
  playstyle_shooter_vs_slasher?: number | null;
  playstyle_finesse_vs_power?: number | null;
}

interface SimpleWorkout {
  id: string;
  title: string;
}

interface ActivityItem {
  id: string;
  created_at: string;
  profiles: { full_name: string | null } | null;
  workouts: { title: string | null } | null;
}

interface Props {
  athletes: AthleteRow[];
  workouts?: SimpleWorkout[];
  avgCompletion: number;
  activeAthletesCount: number;
  totalSessions: number;
  coachName?: string;
  recentActivity?: ActivityItem[];
}

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] as any },
});

export default function CoachDashboard({
  athletes,
  workouts = [],
  avgCompletion,
  activeAthletesCount,
  totalSessions,
  coachName = "Coach",
  recentActivity = [],
}: Props) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<
    "all" | "active" | "rest" | "at-risk"
  >("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAthlete, setSelectedAthlete] = useState("");
  const [selectedWorkout, setSelectedWorkout] = useState("");
  const [assignNotes, setAssignNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [profilerAthlete, setProfilerAthlete] = useState<AthleteRow | null>(
    null,
  );
  const [measurements, setMeasurements] = useState<any[]>([]);
  const [showAssignModal, setShowAssignModal] = useState(false);

  const today = new Date();
  const threeWeeksAgo = new Date(today.getTime() - 3 * 7 * 24 * 60 * 60 * 1000);
  const sixWeeksAgo = new Date(today.getTime() - 6 * 7 * 24 * 60 * 60 * 1000);

  const getAthleteStatus = (lastWorkoutDate: string | null | undefined) => {
    if (!lastWorkoutDate) return "at-risk";
    const lastDate = new Date(lastWorkoutDate);
    if (lastDate > threeWeeksAgo) return "active";
    if (lastDate > sixWeeksAgo) return "rest";
    return "at-risk";
  };

  const filteredAthletes = athletes.filter((a) => {
    if (activeTab !== "all") {
      if (getAthleteStatus(a.last_workout_date) !== activeTab) return false;
    }
    return (
      a.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const handleAssignWorkout = async () => {
    if (!selectedAthlete || !selectedWorkout) {
      toast.error("Please select both athlete and workout");
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await assignWorkout(
        selectedAthlete,
        selectedWorkout,
        assignNotes || undefined,
      );

      if (result.success) {
        toast.success("Workout assigned successfully!");
        setSelectedAthlete("");
        setSelectedWorkout("");
        setAssignNotes("");
        setShowAssignModal(false);
      } else {
        toast.error(result.error || "Failed to assign workout");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const profilerData =
    measurements.length > 0
      ? measurements.map((m) => ({
          date: new Date(m.date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          }),
          weight: parseFloat(m.weight_kg || 0),
        }))
      : [];

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
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight flex items-center gap-2">
                Team Management
                <span className="text-2xl">⚡</span>
              </h1>
              <p className="text-zinc-400 text-sm mt-2">
                Coach Dashboard •{" "}
                {new Date().toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowAssignModal(true)}
              className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-black text-sm px-6 py-3 rounded-2xl transition-all shadow-[0_0_30px_rgba(16,185,129,0.3)]"
            >
              <Plus className="w-4 h-4" />
              Assign Workout
            </motion.button>
          </div>
        </motion.div>

        {/* KPI CARDS */}
        <motion.div
          {...fade(0.1)}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {[
            {
              label: "Total Athletes",
              value: athletes.length,
              icon: Users,
              color: "text-emerald-400",
              bg: "from-emerald-500/10 to-emerald-500/5",
              border: "border-emerald-500/20",
            },
            {
              label: "Active This Week",
              value: activeAthletesCount,
              icon: Zap,
              color: "text-cyan-400",
              bg: "from-cyan-500/10 to-cyan-500/5",
              border: "border-cyan-500/20",
            },
            {
              label: "Avg Completion",
              value: Math.round(avgCompletion),
              suffix: "%",
              icon: Target,
              color: "text-violet-400",
              bg: "from-violet-500/10 to-violet-500/5",
              border: "border-violet-500/20",
            },
            {
              label: "Total Sessions (7d)",
              value: totalSessions,
              icon: Calendar,
              color: "text-amber-400",
              bg: "from-amber-500/10 to-amber-500/5",
              border: "border-amber-500/20",
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
                    {(kpi as any).suffix && (
                      <span className="text-sm ml-1">
                        {(kpi as any).suffix}
                      </span>
                    )}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* ATHLETE ROSTER SECTION */}
        <motion.div {...fade(0.15)} className="space-y-6">
          <div className="rounded-3xl border border-white/10 bg-zinc-900/40 backdrop-blur-sm p-6 sm:p-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-6 pb-6 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30">
                  <Users className="w-5 h-5 text-emerald-400" />
                </div>
                <h3 className="text-lg font-black text-white">
                  Athletes Roster
                </h3>
              </div>
              <span className="text-[11px] text-zinc-500 font-bold uppercase tracking-wider">
                {filteredAthletes.length} of {athletes.length}
              </span>
            </div>

            {/* Search & Filter */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6 pb-6 border-b border-white/10">
              <div className="flex-1 flex items-center gap-3 rounded-2xl border border-white/10 bg-zinc-950/50 px-4 py-3">
                <Search className="w-4 h-4 text-zinc-500 flex-shrink-0" />
                <input
                  type="text"
                  placeholder="Search by name or email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent text-sm w-full text-zinc-300 placeholder-zinc-600 focus:outline-none"
                />
              </div>

              <div className="flex gap-2">
                {[
                  { id: "all", label: "All" },
                  { id: "active", label: "Active" },
                  { id: "rest", label: "Rest" },
                  { id: "at-risk", label: "At-Risk" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                      activeTab === tab.id
                        ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                        : "text-zinc-400 hover:text-zinc-300 border border-white/10"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Athletes Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredAthletes.length > 0 ? (
                filteredAthletes.map((athlete, idx) => {
                  const status = getAthleteStatus(athlete.last_workout_date);
                  const statusConfig = {
                    active: {
                      color: "text-emerald-400",
                      bg: "bg-emerald-500/15",
                      border: "border-emerald-500/30",
                      label: "Active",
                    },
                    rest: {
                      color: "text-amber-400",
                      bg: "bg-amber-500/15",
                      border: "border-amber-500/30",
                      label: "Resting",
                    },
                    "at-risk": {
                      color: "text-red-400",
                      bg: "bg-red-500/15",
                      border: "border-red-500/30",
                      label: "At Risk",
                    },
                  };
                  const config =
                    statusConfig[status as keyof typeof statusConfig];

                  return (
                    <motion.div
                      key={athlete.user_id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.06 }}
                      className="rounded-2xl border border-white/10 bg-zinc-950/50 hover:bg-zinc-950/70 hover:border-white/20 transition-all p-4 group"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
                            <span className="text-xs font-black text-black">
                              {(athlete.full_name || athlete.email)
                                .charAt(0)
                                .toUpperCase()}
                            </span>
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-bold text-white truncate">
                              {athlete.full_name || "Unknown"}
                            </p>
                            <p className="text-xs text-zinc-500 truncate">
                              {athlete.email}
                            </p>
                          </div>
                        </div>
                        <div
                          className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${config.bg} ${config.border} ${config.color} border`}
                        >
                          {config.label}
                        </div>
                      </div>

                      {/* Progress Ring & Stats */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="relative w-12 h-12 flex-shrink-0">
                          <svg
                            className="absolute inset-0 w-full h-full -rotate-90"
                            viewBox="0 0 48 48"
                          >
                            <circle
                              cx="24"
                              cy="24"
                              r="20"
                              fill="none"
                              stroke="#27272a"
                              strokeWidth="3"
                            />
                            <circle
                              cx="24"
                              cy="24"
                              r="20"
                              fill="none"
                              stroke="#10b981"
                              strokeWidth="3"
                              strokeLinecap="round"
                              strokeDasharray={`${Math.min((athlete.completion_percentage || 0) / 100, 1) * 126} 126`}
                            />
                          </svg>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-xs font-black text-emerald-400">
                              {Math.round(athlete.completion_percentage || 0)}%
                            </span>
                          </div>
                        </div>
                        <div className="flex-1 ml-3">
                          <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-black mb-1">
                            This Week
                          </p>
                          <p className="text-lg font-black text-white">
                            {athlete.sessions_this_week || 0}
                          </p>
                          <p className="text-[10px] text-zinc-600">sessions</p>
                        </div>
                      </div>

                      {/* Archetype */}
                      <div className="pt-3 border-t border-white/5">
                        <p className="text-[10px] text-zinc-600 uppercase tracking-widest font-black mb-1">
                          Archetype
                        </p>
                        <p className="text-xs font-bold text-emerald-400">
                          {athlete.player_archetype || "Prospect"}
                        </p>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2 mt-4 pt-4 border-t border-white/5">
                        <button
                          onClick={() => {
                            setSelectedAthlete(athlete.user_id);
                            setShowAssignModal(true);
                          }}
                          className="flex-1 flex items-center justify-center gap-1 text-xs font-bold text-emerald-400 hover:text-emerald-300 py-2 rounded-lg hover:bg-zinc-900/50 transition-all"
                        >
                          <Dumbbell className="w-3 h-3" />
                          Assign
                        </button>
                      </div>
                    </motion.div>
                  );
                })
              ) : (
                <div className="col-span-full text-center py-12">
                  <Users className="w-12 h-12 text-zinc-700 mx-auto mb-4" />
                  <p className="text-zinc-500 text-sm">No athletes found</p>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* ASSIGN WORKOUT MODAL */}
        <AnimatePresence>
          {showAssignModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
              onClick={() => setShowAssignModal(false)}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-zinc-900 border border-white/10 rounded-3xl p-8 w-full max-w-md"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-black text-white">
                    Assign Workout
                  </h2>
                  <button
                    onClick={() => setShowAssignModal(false)}
                    className="p-2 hover:bg-zinc-800 rounded-lg transition-all"
                  >
                    <X className="w-5 h-5 text-zinc-400" />
                  </button>
                </div>

                <div className="space-y-4">
                  {/* Athlete Select */}
                  <div>
                    <label className="text-xs font-black uppercase tracking-widest text-zinc-400 block mb-2">
                      Select Athlete
                    </label>
                    <select
                      value={selectedAthlete}
                      onChange={(e) => setSelectedAthlete(e.target.value)}
                      className="w-full bg-zinc-950/50 border border-white/10 rounded-xl px-4 py-3 text-white font-bold focus:outline-none focus:border-emerald-500/50"
                    >
                      <option value="">Choose athlete...</option>
                      {athletes.map((a) => (
                        <option key={a.user_id} value={a.user_id}>
                          {a.full_name || a.email}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Workout Select */}
                  <div>
                    <label className="text-xs font-black uppercase tracking-widest text-zinc-400 block mb-2">
                      Select Workout
                    </label>
                    <select
                      value={selectedWorkout}
                      onChange={(e) => setSelectedWorkout(e.target.value)}
                      className="w-full bg-zinc-950/50 border border-white/10 rounded-xl px-4 py-3 text-white font-bold focus:outline-none focus:border-emerald-500/50"
                    >
                      <option value="">Choose workout...</option>
                      {workouts.map((w) => (
                        <option key={w.id} value={w.id}>
                          {w.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Notes */}
                  <div>
                    <label className="text-xs font-black uppercase tracking-widest text-zinc-400 block mb-2">
                      Notes (Optional)
                    </label>
                    <textarea
                      value={assignNotes}
                      onChange={(e) => setAssignNotes(e.target.value)}
                      placeholder="Add instructions or notes..."
                      className="w-full bg-zinc-950/50 border border-white/10 rounded-xl px-4 py-3 text-white font-bold focus:outline-none focus:border-emerald-500/50 text-sm resize-none h-20"
                    />
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 pt-4">
                    <button
                      onClick={() => setShowAssignModal(false)}
                      className="flex-1 px-6 py-3 rounded-xl bg-zinc-800 text-white font-bold text-sm uppercase tracking-wider hover:bg-zinc-700 transition-all"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleAssignWorkout}
                      disabled={isSubmitting}
                      className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-black text-sm uppercase tracking-wider transition-all disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                          Assigning...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          Assign
                        </>
                      )}
                    </button>
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
