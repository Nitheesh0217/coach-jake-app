"use client";

import { useState, useEffect } from "react";
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
  Trash2,
  X,
  TrendingUp,
  Dumbbell
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
  Tooltip
} from "recharts";
import { getAvatarImage } from "@/lib/imageUtils";
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

export default function CoachDashboard({ 
  athletes, 
  workouts = [], 
  avgCompletion, 
  activeAthletesCount, 
  totalSessions, 
  coachName = "Coach",
  recentActivity = []
}: Props) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"all" | "active" | "rest" | "at-risk">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAthlete, setSelectedAthlete] = useState("");
  const [selectedWorkout, setSelectedWorkout] = useState("");
  const [assignNotes, setAssignNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Telemetry Profiler Modal states
  const [profilerAthlete, setProfilerAthlete] = useState<AthleteRow | null>(null);
  const [weightData, setWeightData] = useState<{ date: string; weight: number }[]>([]);
  const [loadingWeight, setLoadingWeight] = useState(false);

  const supabase = supabaseBrowser();

  useEffect(() => {
    if (!profilerAthlete) {
      setWeightData([]);
      return;
    }
    const athleteId = profilerAthlete.user_id;
    async function loadWeightData() {
      setLoadingWeight(true);
      try {
        const { data, error } = await supabase
          .from("measurements")
          .select("date, weight_kg")
          .eq("user_id", athleteId)
          .order("date", { ascending: true });
        if (!error && data) {
          const formatted = data.map((d: any) => ({
            date: new Date(d.date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
            weight: Number(d.weight_kg),
          }));
          setWeightData(formatted);
        }
      } catch (err) {
      } finally {
        setLoadingWeight(false);
      }
    }
    loadWeightData();
  }, [profilerAthlete]);

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
    <div className="min-h-screen bg-transparent text-white">
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
          <button 
            onClick={() => router.replace("?notifications=true")}
            className="relative p-3 rounded-2xl border border-white/10 bg-zinc-900/40 hover:bg-zinc-900/80 text-zinc-400 hover:text-zinc-200 transition-all"
          >
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
                        onClick={() => setProfilerAthlete(athlete)}
                        className={`rounded-2xl border border-white/10 bg-zinc-900/40 backdrop-blur-sm p-5 hover:border-emerald-500/30 cursor-pointer transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-4 ${
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
                            onClick={(e) => {
                              e.stopPropagation();
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

      {/* Athlete Telemetry Profiler Modal */}
      <AnimatePresence>
        {profilerAthlete && (
          <>
            <div 
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40" 
              onClick={() => setProfilerAthlete(null)} 
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl rounded-3xl border border-white/10 bg-zinc-950/95 backdrop-blur-2xl p-6 sm:p-8 shadow-2xl z-50 max-h-[90vh] overflow-y-auto"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full border border-emerald-500/30 overflow-hidden flex-shrink-0">
                    <img
                      src={getAvatarImage(profilerAthlete.full_name ?? "Athlete")}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-white">{profilerAthlete.full_name ?? "Athlete"}</h3>
                    <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">
                      {profilerAthlete.player_archetype ?? "Prospect"} • {profilerAthlete.email}
                    </p>
                  </div>
                </div>
                
                <button
                  onClick={() => setProfilerAthlete(null)}
                  className="p-1.5 rounded-xl border border-white/5 bg-zinc-900/50 text-zinc-500 hover:text-white transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Grid Content */}
              <div className="grid md:grid-cols-2 gap-8">
                {/* Left Side: Attributes Radar Chart */}
                <div className="rounded-2xl border border-white/5 bg-zinc-900/20 p-5 space-y-4">
                  <div className="flex items-center justify-between border-b border-white/5 pb-3">
                    <span className="text-xs font-black uppercase tracking-wider text-emerald-400">Playstyle Attributes</span>
                    <Sparkles className="w-4 h-4 text-emerald-400 animate-pulse" />
                  </div>
                  
                  <div className="h-[250px] w-full flex items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={[
                        { subject: "Shooting", value: profilerAthlete.playstyle_shooter_vs_slasher ?? 50, fullMark: 100 },
                        { subject: "Athleticism", value: 80, fullMark: 100 },
                        { subject: "Team Play", value: 100 - (profilerAthlete.playstyle_team_vs_iso ?? 50), fullMark: 100 },
                        { subject: "Finesse", value: profilerAthlete.playstyle_finesse_vs_power ?? 50, fullMark: 100 },
                        { subject: "Playmaking", value: 75, fullMark: 100 },
                      ]}>
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
                          fillOpacity={0.25}
                        />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="grid grid-cols-3 gap-2 pt-2 text-center">
                    <div className="p-2.5 rounded-xl bg-zinc-950/40 border border-white/5">
                      <span className="block text-[8px] uppercase font-bold text-zinc-500">ISO vs Team</span>
                      <span className="block text-xs font-black text-white mt-1">
                        {profilerAthlete.playstyle_team_vs_iso ?? 50}% Team
                      </span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-zinc-950/40 border border-white/5">
                      <span className="block text-[8px] uppercase font-bold text-zinc-500">Shooter/Slasher</span>
                      <span className="block text-xs font-black text-white mt-1">
                        {profilerAthlete.playstyle_shooter_vs_slasher ?? 50}% Slasher
                      </span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-zinc-950/40 border border-white/5">
                      <span className="block text-[8px] uppercase font-bold text-zinc-500">Finesse/Power</span>
                      <span className="block text-xs font-black text-white mt-1">
                        {profilerAthlete.playstyle_finesse_vs_power ?? 50}% Power
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right Side: Weight & Training Logs */}
                <div className="space-y-6">
                  {/* Weight Trend Line Chart */}
                  <div className="rounded-2xl border border-white/5 bg-zinc-900/20 p-5">
                    <div className="flex items-center justify-between border-b border-white/5 pb-3 mb-4">
                      <span className="text-xs font-black uppercase tracking-wider text-cyan-400">Weight Tracking Trend</span>
                      <TrendingUp className="w-4 h-4 text-cyan-400" />
                    </div>

                    {loadingWeight ? (
                      <div className="h-[180px] flex items-center justify-center text-zinc-500 text-xs">
                        Loading weight records...
                      </div>
                    ) : weightData.length >= 2 ? (
                      <div className="h-[180px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={weightData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                            <XAxis dataKey="date" stroke="#71717a" style={{ fontSize: "10px" }} tickLine={false} />
                            <YAxis stroke="#71717a" style={{ fontSize: "10px" }} tickLine={false} domain={["auto", "auto"]} />
                            <Tooltip
                              contentStyle={{ backgroundColor: "#090d16", border: "1px solid #27272a", borderRadius: "8px" }}
                              labelStyle={{ color: "#71717a", fontSize: "10px" }}
                              itemStyle={{ color: "#06b6d4", fontSize: "11px", fontWeight: "bold" }}
                            />
                            <Line
                              type="monotone"
                              dataKey="weight"
                              stroke="#06b6d4"
                              strokeWidth={2}
                              dot={{ fill: "#06b6d4", r: 3 }}
                              activeDot={{ r: 5 }}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    ) : (
                      <div className="h-[180px] flex flex-col items-center justify-center text-center p-4">
                        <Dumbbell className="w-8 h-8 text-zinc-700 mb-2" />
                        <p className="text-zinc-500 text-xs font-semibold">No telemetry measurements recorded yet.</p>
                      </div>
                    )}
                  </div>

                  {/* Summary Telemetry KPI Stats */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-2xl border border-white/5 bg-zinc-900/20 p-4">
                      <span className="text-[9px] uppercase tracking-wider text-zinc-500 font-bold block mb-1">Last Workout</span>
                      <span className="text-xs font-black text-white">
                        {profilerAthlete.last_workout_date
                          ? new Date(profilerAthlete.last_workout_date).toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
                          : "None recorded"}
                      </span>
                    </div>
                    <div className="rounded-2xl border border-white/5 bg-zinc-900/20 p-4">
                      <span className="text-[9px] uppercase tracking-wider text-zinc-500 font-bold block mb-1">Completion (30d)</span>
                      <span className="text-xs font-black text-white">
                        {profilerAthlete.completion_percentage ?? 0}% rate ({profilerAthlete.sessions_30d ?? 0} sessions)
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-6 border-t border-white/5 flex items-center justify-end mt-6">
                <button
                  onClick={() => setProfilerAthlete(null)}
                  className="px-6 py-3 rounded-2xl bg-zinc-900 hover:bg-zinc-800 text-xs font-black uppercase tracking-widest text-zinc-300 transition-all border border-white/5"
                >
                  Close Profile
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
