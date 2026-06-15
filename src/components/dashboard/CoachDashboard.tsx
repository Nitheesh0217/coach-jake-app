"use client";

import {
  Users,
  Target,
  Zap,
  Calendar,
  ArrowRight,
  TrendingUp,
  TrendingDown,
  Bell,
  ChevronRight,
} from "lucide-react";
import { motion } from "framer-motion";
import type { AthleteProfile } from "@/types";
import { getAvatarImage } from "@/lib/imageUtils";

interface CoachDashboardProps {
  athletes: AthleteProfile[];
  avgCompletion: number;
  activeAthletesCount: number;
  totalSessions: number;
  coachName?: string;
}

const statusColors: Record<string, string> = {
  active: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  "rest day": "bg-amber-500/20 text-amber-400 border-amber-500/30",
  inactive: "bg-red-500/20 text-red-400 border-red-500/30",
};

export default function CoachDashboard({
  athletes,
  avgCompletion,
  activeAthletesCount,
  totalSessions,
  coachName = "Coach",
}: CoachDashboardProps) {
  const kpis = [
    {
      label: "Total Athletes",
      value: athletes.length,
      icon: Users,
      iconColor: "text-emerald-400",
      iconBg: "bg-emerald-500/15 border-emerald-500/30",
      valueColor: "text-emerald-400",
      trend: "↑ 0 vs last week",
    },
    {
      label: "Active This Week",
      value: activeAthletesCount,
      icon: Zap,
      iconColor: "text-cyan-400",
      iconBg: "bg-cyan-500/15 border-cyan-500/30",
      valueColor: "text-cyan-400",
      trend: "↑ 2 vs last week",
    },
    {
      label: "Avg Completion",
      value: `${Math.round(avgCompletion)}%`,
      icon: Target,
      iconColor: "text-violet-400",
      iconBg: "bg-violet-500/15 border-violet-500/30",
      valueColor: "text-violet-400",
      trend: "↑ 8% vs last week",
    },
    {
      label: "Sessions Logged",
      value: totalSessions,
      icon: Calendar,
      iconColor: "text-amber-400",
      iconBg: "bg-amber-500/15 border-amber-500/30",
      valueColor: "text-amber-400",
      trend: "↑ 11 vs last week",
    },
  ];

  return (
    <div className="min-h-screen bg-[#050816] text-white pb-20 md:pb-8">
      {/* Ambient glows */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-emerald-500/4 blur-[150px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6 space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="flex items-start justify-between"
        >
          <div>
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Coach Overview
            </h1>
            <p className="text-zinc-500 text-sm mt-1">Managing {athletes.length} athletes</p>
          </div>
          <button className="p-2 rounded-xl border border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700 transition-all">
            <Bell className="w-5 h-5" />
          </button>
        </motion.div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {kpis.map((kpi, idx) => {
            const Icon = kpi.icon;
            return (
              <motion.div
                key={kpi.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.07 }}
                className="rounded-2xl border border-zinc-800/80 bg-zinc-900/60 backdrop-blur-sm p-4 sm:p-5 hover:border-zinc-700 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className={`p-2 rounded-xl border ${kpi.iconBg}`}>
                    <Icon className={`w-4 h-4 ${kpi.iconColor}`} />
                  </div>
                </div>
                <p className="text-xs uppercase tracking-widest text-zinc-500 font-semibold mb-1">{kpi.label}</p>
                <p className={`text-3xl font-black ${kpi.valueColor}`}>{kpi.value}</p>
                <p className="text-xs text-zinc-600 mt-1.5">{kpi.trend}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Main content: Athlete Roster + Right panel */}
        <div className="grid lg:grid-cols-5 gap-6">
          {/* Athlete Roster */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-3 rounded-2xl border border-zinc-800/80 bg-zinc-900/60 backdrop-blur-sm overflow-hidden"
          >
            <div className="p-5 border-b border-zinc-800/60">
              <h2 className="text-lg font-bold text-white">Athlete Roster</h2>
            </div>

            {/* Table header */}
            <div className="px-5 py-3 grid grid-cols-[auto_1fr_100px_80px_80px_80px] gap-3 text-[10px] uppercase tracking-widest text-zinc-600 font-semibold border-b border-zinc-800/40">
              <span>Avatar + Name</span>
              <span></span>
              <span>Completion %</span>
              <span className="text-center">Sessions</span>
              <span>Status</span>
              <span>Action</span>
            </div>

            <div className="divide-y divide-zinc-800/40">
              {athletes.length > 0 ? (
                athletes.slice(0, 8).map((athlete, idx) => {
                  const completion = (athlete as any).completion_pct ?? Math.floor(40 + Math.random() * 50);
                  const sessions = (athlete as any).sessions_count ?? Math.floor(2 + Math.random() * 6);
                  const status = (athlete as any).status ?? (idx % 4 === 3 ? "inactive" : idx % 4 === 2 ? "rest day" : "active");
                  const lastWorkout = (athlete as any).last_workout ?? "Jun 20, 2025";

                  return (
                    <motion.div
                      key={athlete.user_id}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + idx * 0.05 }}
                      className="px-5 py-3.5 grid grid-cols-[auto_1fr_100px_80px_80px_80px] gap-3 items-center hover:bg-zinc-800/30 transition-colors"
                    >
                      {/* Avatar + Name */}
                      <img
                        src={getAvatarImage(athlete.full_name || "Athlete")}
                        alt={athlete.full_name || "Athlete"}
                        className="w-8 h-8 rounded-full object-cover border border-zinc-700 flex-shrink-0"
                      />
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-white truncate">{athlete.full_name || "Athlete"}</p>
                        <p className="text-xs text-zinc-600 truncate">{lastWorkout}</p>
                      </div>

                      {/* Completion bar */}
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-bold text-zinc-300">{completion}%</span>
                        </div>
                        <div className="h-1.5 rounded-full bg-zinc-800 overflow-hidden">
                          <div
                            className={`h-full rounded-full ${completion > 70 ? "bg-emerald-400" : completion > 50 ? "bg-amber-400" : "bg-red-400"}`}
                            style={{ width: `${completion}%` }}
                          />
                        </div>
                      </div>

                      {/* Sessions */}
                      <span className="text-sm font-bold text-zinc-300 text-center">{sessions}</span>

                      {/* Status */}
                      <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full border capitalize ${statusColors[status] || statusColors.active}`}>
                        {status}
                      </span>

                      {/* Action */}
                      <button className="text-xs text-zinc-400 hover:text-emerald-400 transition-colors flex items-center gap-0.5 font-medium">
                        Assign <ArrowRight className="w-3 h-3" />
                      </button>
                    </motion.div>
                  );
                })
              ) : (
                <div className="text-center py-12">
                  <Users className="w-10 h-10 text-zinc-700 mx-auto mb-3" />
                  <p className="text-zinc-500">No athletes yet</p>
                </div>
              )}
            </div>
          </motion.div>

          {/* Right: Quick Assign + Activity Feed */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2 space-y-5"
          >
            {/* Quick Assign */}
            <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/60 backdrop-blur-sm p-5">
              <div className="flex items-center gap-2 mb-4">
                <Zap className="w-4 h-4 text-amber-400" />
                <h3 className="text-sm font-bold text-white uppercase tracking-wide">Quick Assign</h3>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-zinc-500 mb-1.5 font-medium">Select Athlete</p>
                  <select className="w-full bg-zinc-800/60 border border-zinc-700/60 rounded-xl px-3 py-2.5 text-sm text-zinc-300 focus:border-emerald-500/40 focus:outline-none transition-all appearance-none">
                    <option value="">Select an athlete</option>
                    {athletes.slice(0, 8).map((a) => (
                      <option key={a.user_id} value={a.user_id}>
                        {a.full_name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <p className="text-xs text-zinc-500 mb-1.5 font-medium">Select Workout</p>
                  <select className="w-full bg-zinc-800/60 border border-zinc-700/60 rounded-xl px-3 py-2.5 text-sm text-zinc-300 focus:border-emerald-500/40 focus:outline-none transition-all appearance-none">
                    <option value="">Select a workout</option>
                    <option>Finishing Fundamentals</option>
                    <option>3-Point Sharpshooter</option>
                    <option>Defensive Stopper</option>
                    <option>Elite Handles</option>
                  </select>
                </div>
                <div>
                  <p className="text-xs text-zinc-500 mb-1.5 font-medium">Due Date</p>
                  <input
                    type="date"
                    className="w-full bg-zinc-800/60 border border-zinc-700/60 rounded-xl px-3 py-2.5 text-sm text-zinc-300 focus:border-emerald-500/40 focus:outline-none transition-all"
                  />
                </div>
                <button className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-sm transition-all duration-200 shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] flex items-center justify-center gap-2">
                  Assign →
                </button>
              </div>
            </div>

            {/* Team Activity Feed */}
            <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/60 backdrop-blur-sm p-5">
              <h3 className="text-sm font-bold text-white uppercase tracking-wide mb-4">Team Activity Feed</h3>
              <div className="space-y-4">
                {[
                  { name: "Mason Carter", action: "completed Finishing Fundamentals", time: "2h ago" },
                  { name: "Liam Johnson", action: "logged a new personal best in 3-Point Sharpshooter", time: "4h ago" },
                  { name: "Darius Brown", action: "completed Defensive Stopper", time: "6h ago" },
                  { name: "Noah Williams", action: "started Speed & Agility", time: "8h ago" },
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: 8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + idx * 0.06 }}
                    className="flex items-start gap-3"
                  >
                    <div className="w-8 h-8 rounded-full bg-zinc-800 border border-zinc-700 flex-shrink-0 overflow-hidden">
                      <img
                        src={getAvatarImage(item.name)}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-zinc-300 leading-relaxed">
                        <span className="font-semibold text-white">{item.name}</span>{" "}
                        {item.action}
                      </p>
                      <p className="text-[10px] text-zinc-600 mt-0.5">{item.time}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
