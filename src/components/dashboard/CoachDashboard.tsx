"use client";

import { useState } from "react";
import { 
  Users, 
  Target, 
  Zap, 
  Calendar, 
  ArrowRight, 
  Bell, 
  Search,
  ChevronDown,
  User,
  Plus,
  Clock,
  Sparkles,
  Flame,
  CheckCircle2,
  Trash2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getAvatarImage } from "@/lib/imageUtils";
import { assignWorkout } from "@/app/(app)/trainer-dashboard/actions";
import { toast } from "sonner";

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

export default function CoachDashboard({ 
  athletes, 
  workouts = [], 
  avgCompletion, 
  activeAthletesCount, 
  totalSessions, 
  coachName = "Coach",
  recentActivity = []
}: Props) {
  const [activeTab, setActiveTab] = useState<"all" | "active" | "rest" | "at-risk">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAthlete, setSelectedAthlete] = useState("");
  const [selectedWorkout, setSelectedWorkout] = useState("");
  const [assignNotes, setAssignNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Status helper mapping
  const getAthleteStatus = (athlete: AthleteRow) => {
    if (!athlete.last_workout_date) return "at-risk";
    const lastDate = new Date(athlete.last_workout_date);
    const diffTime = Math.abs(Date.now() - lastDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays <= 3) return "active";
    if (diffDays <= 6) return "rest";
    return "at-risk";
  };

  // Filter athletes based on active tab and search query
  const filteredAthletes = athletes.filter((athlete) => {
    const status = getAthleteStatus(athlete);
    const matchesTab = 
      activeTab === "all" ||
      (activeTab === "active" && status === "active") ||
      (activeTab === "rest" && status === "rest") ||
      (activeTab === "at-risk" && status === "at-risk");

    const matchesSearch = 
      (athlete.full_name ?? "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      athlete.email.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesTab && matchesSearch;
  });

  const handleAssignWorkout = async () => {
    if (!selectedAthlete || !selectedWorkout) {
      toast.error("Please select both an athlete and a workout.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await assignWorkout(selectedAthlete, selectedWorkout, assignNotes || undefined);
      if (res.success) {
        toast.success("Workout assigned successfully!");
        setSelectedAthlete("");
        setSelectedWorkout("");
        setAssignNotes("");
      } else {
        toast.error(res.error || "Failed to assign workout.");
      }
    } catch (err) {
      toast.error("An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const kpis = [
    { label: "Total Athletes", value: athletes.length, icon: Users, color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/20" },
    { label: "Active This Week", value: activeAthletesCount, icon: Zap, color: "text-cyan-400", bg: "bg-cyan-500/10 border-cyan-500/20" },
    { label: "Avg Completion Rate", value: `${Math.round(avgCompletion)}%`, icon: Target, color: "text-violet-400", bg: "bg-violet-500/10 border-violet-500/20" },
    { label: "Total Logs (7d)", value: totalSessions, icon: Calendar, color: "text-amber-400", bg: "bg-amber-500/10 border-amber-500/20" },
  ];

  return (
    <div className="min-h-screen bg-[#050816] text-white">
      {/* Background ambient lighting */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-emerald-500/5 blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        
        {/* Header Title */}
        <div className="flex items-center justify-between pb-6 border-b border-white/5">
          <div>
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">Coach Dashboard</h1>
            <p className="text-zinc-500 text-sm mt-1 uppercase tracking-wider font-semibold">Welcome back, {coachName}</p>
          </div>
          <button className="relative p-3 rounded-2xl border border-white/10 bg-zinc-900/40 hover:bg-zinc-900/80 text-zinc-400 hover:text-zinc-200 transition-all">
            <Bell className="w-5 h-5" />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-emerald-500" />
          </button>
        </div>

        {/* KPI Cards Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {kpis.map(({ label, value, icon: Icon, color, bg }) => (
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
              <p className={`text-2xl sm:text-3xl font-black ${color}`}>{value}</p>
            </div>
          ))}
        </div>

        {/* Main Panel Grid */}
        <div className="grid lg:grid-cols-12 gap-8">
          
          {/* Left Column (8 Columns): Interactive Roster List */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Filter controls header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              
              {/* Horizontal Scrollable Tabs */}
              <div className="flex items-center gap-1 overflow-x-auto pb-2 sm:pb-0 scrollbar-none whitespace-nowrap">
                {[
                  { id: "all", label: "All Athletes" },
                  { id: "active", label: "Active" },
                  { id: "rest", label: "Rest Day" },
                  { id: "at-risk", label: "At Risk" }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`rounded-full px-4 py-2 text-xs font-black uppercase tracking-wider transition-all ${
                      activeTab === tab.id
                        ? "bg-emerald-500 text-black shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                        : "bg-zinc-900/60 border border-white/5 text-zinc-400 hover:text-white"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Roster Search Bar */}
              <div className="relative flex items-center bg-zinc-900/60 border border-white/5 rounded-full px-4 py-2 text-zinc-400 w-full sm:w-64 focus-within:border-emerald-500/30 transition-all duration-200">
                <Search className="w-4 h-4 mr-2 text-zinc-500 flex-shrink-0" />
                <input
                  type="text"
                  placeholder="Search athletes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent text-xs w-full text-zinc-300 placeholder-zinc-600 focus:outline-none"
                />
              </div>

            </div>

            {/* Roster card list with animations */}
            <div className="space-y-4">
              <AnimatePresence mode="popLayout">
                {filteredAthletes.length > 0 ? (
                  filteredAthletes.map((athlete) => {
                    const status = getAthleteStatus(athlete);
                    const isAtRisk = status === "at-risk";
                    const completionPct = athlete.completion_percentage ?? 40;
                    
                    const progressColor = completionPct > 70 ? "bg-emerald-400" : completionPct > 45 ? "bg-cyan-400" : "bg-amber-400";
                    const statusPillCls = 
                      status === "active" 
                        ? "text-emerald-400 bg-emerald-500/10 border-emerald-500/20"
                        : status === "rest"
                          ? "text-amber-400 bg-amber-500/10 border-amber-500/20"
                          : "text-red-400 bg-red-500/10 border-red-500/20 animate-pulse shadow-[0_0_15px_rgba(239,68,68,0.1)]";

                    return (
                      <motion.div
                        key={athlete.user_id}
                        layout
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.25 }}
                        className={`rounded-2xl border border-white/10 bg-zinc-900/40 backdrop-blur-sm p-5 hover:border-emerald-500/30 transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                          isAtRisk ? "shadow-[inset_0_0_15px_rgba(239,68,68,0.02)]" : ""
                        }`}
                      >
                        {/* Athlete profile info */}
                        <div className="flex items-center gap-4 min-w-0">
                          <div className="w-10 h-10 rounded-full border border-white/10 overflow-hidden flex-shrink-0">
                            <img
                              src={getAvatarImage(athlete.full_name ?? "Athlete")}
                              alt=""
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="min-w-0">
                            <h3 className="text-sm font-bold text-white truncate">{athlete.full_name ?? "Athlete"}</h3>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-[9px] font-black uppercase tracking-widest text-zinc-500">
                                {athlete.player_archetype ?? "Prospect"}
                              </span>
                              <span className="text-[10px] text-zinc-600">•</span>
                              <span className="text-[10px] text-zinc-500">Age: {athlete.age ?? "N/A"}</span>
                            </div>
                          </div>
                        </div>

                        {/* Completion rate bar */}
                        <div className="w-full md:w-36 flex-shrink-0">
                          <div className="flex items-center justify-between text-[10px] uppercase font-bold text-zinc-500 mb-1">
                            <span>Completion</span>
                            <span>{completionPct}%</span>
                          </div>
                          <div className="h-1.5 rounded-full bg-zinc-950 overflow-hidden w-full border border-white/5">
                            <div className={`h-full rounded-full ${progressColor}`} style={{ width: `${completionPct}%` }} />
                          </div>
                        </div>

                        {/* Status metadata */}
                        <div className="flex items-center gap-3 justify-between md:justify-end">
                          <span className={`text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full border ${statusPillCls}`}>
                            {status === "active" ? "Active" : status === "rest" ? "Rest Day" : "At Risk"}
                          </span>
                          
                          <button
                            onClick={() => {
                              setSelectedAthlete(athlete.user_id);
                              // Smooth scroll to Quick Assign panel on mobile
                              const el = document.getElementById("quick-assign-panel");
                              if (el) el.scrollIntoView({ behavior: "smooth" });
                            }}
                            className="inline-flex items-center gap-1 text-xs font-black text-emerald-400 hover:text-emerald-300 transition-colors uppercase tracking-widest"
                          >
                            <span>Assign</span>
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                      </motion.div>
                    );
                  })
                ) : (
                  <div className="text-center py-16 rounded-2xl border border-white/5 bg-zinc-900/20 backdrop-blur-sm">
                    <Users className="w-12 h-12 text-zinc-700 mx-auto mb-3" />
                    <p className="text-zinc-500 text-sm font-semibold">No athletes found matching the filters.</p>
                  </div>
                )}
              </AnimatePresence>
            </div>

          </div>

          {/* Right Column (4 Columns): Quick Assign & Activity Feed */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Quick Assign Widget */}
            <div 
              id="quick-assign-panel"
              className="rounded-3xl border border-white/10 bg-zinc-900/40 backdrop-blur-sm p-6 shadow-xl"
            >
              <div className="flex items-center gap-2 mb-6 border-b border-white/5 pb-4">
                <Zap className="w-4 h-4 text-emerald-400" />
                <h3 className="text-xs font-black text-white uppercase tracking-widest">Quick Workout Assign</h3>
              </div>

              <div className="space-y-4">
                {/* Select Athlete */}
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-2">Select Athlete</label>
                  <div className="relative">
                    <select
                      value={selectedAthlete}
                      onChange={(e) => setSelectedAthlete(e.target.value)}
                      className="w-full bg-zinc-950/50 border border-white/10 rounded-2xl px-4 py-3 text-xs text-zinc-300 focus:border-emerald-500/40 focus:outline-none transition-all appearance-none"
                    >
                      <option value="">Choose an athlete...</option>
                      {athletes.map((a) => (
                        <option key={a.user_id} value={a.user_id}>
                          {a.full_name ?? "Unknown Athlete"}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="w-4 h-4 text-zinc-500 absolute right-4 top-3.5 pointer-events-none" />
                  </div>
                </div>

                {/* Select Workout */}
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-2">Select Workout</label>
                  <div className="relative">
                    <select
                      value={selectedWorkout}
                      onChange={(e) => setSelectedWorkout(e.target.value)}
                      className="w-full bg-zinc-950/50 border border-white/10 rounded-2xl px-4 py-3 text-xs text-zinc-300 focus:border-emerald-500/40 focus:outline-none transition-all appearance-none"
                    >
                      <option value="">Choose a workout program...</option>
                      {workouts.map((w) => (
                        <option key={w.id} value={w.id}>
                          {w.title}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="w-4 h-4 text-zinc-500 absolute right-4 top-3.5 pointer-events-none" />
                  </div>
                </div>

                {/* Notes Input */}
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-2">Assignment Notes</label>
                  <input
                    type="text"
                    placeholder="E.g. Complete by Friday, target: box jumps"
                    value={assignNotes}
                    onChange={(e) => setAssignNotes(e.target.value)}
                    className="w-full bg-zinc-950/50 border border-white/10 rounded-2xl px-4 py-3 text-xs text-zinc-300 placeholder-zinc-700 focus:border-emerald-500/40 focus:outline-none transition-all"
                  />
                </div>

                <button
                  onClick={handleAssignWorkout}
                  disabled={isSubmitting}
                  className="w-full mt-4 flex items-center justify-center gap-2 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-black font-black text-xs py-4 transition-all duration-300 shadow-[0_0_20px_rgba(16,185,129,0.3)]"
                >
                  <Plus className="w-4 h-4 stroke-[3]" />
                  <span>{isSubmitting ? "ASSIGNING..." : "ASSIGN WORKOUT"}</span>
                </button>
              </div>
            </div>

            {/* Team Activity Feed */}
            <div className="rounded-3xl border border-white/10 bg-zinc-900/40 backdrop-blur-sm p-6 shadow-xl">
              <div className="flex items-center justify-between mb-6 border-b border-white/5 pb-4">
                <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Live Team Activity</span>
                <Clock className="w-4 h-4 text-cyan-400" />
              </div>

              <div className="space-y-4">
                {recentActivity.length > 0 ? (
                  recentActivity.map((log) => {
                    const timeAgoStr = new Date(log.created_at).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
                    return (
                      <div key={log.id} className="flex items-start gap-3">
                        <div className="w-7 h-7 rounded-full border border-white/10 overflow-hidden flex-shrink-0">
                          <img
                            src={getAvatarImage(log.profiles?.full_name ?? "Athlete")}
                            alt=""
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-zinc-400 leading-normal">
                            <span className="font-bold text-white">{log.profiles?.full_name ?? "Athlete"}</span> completed{" "}
                            <span className="font-bold text-emerald-400">{log.workouts?.title ?? "a session"}</span>
                          </p>
                          <span className="text-[9px] text-zinc-600 block mt-0.5">{timeAgoStr}</span>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="text-center py-6 text-zinc-600 text-xs font-semibold">
                    No activity logs recorded today.
                  </div>
                )}
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
