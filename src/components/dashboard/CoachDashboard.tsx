"use client";

import { Users, Target, Zap, Calendar, ArrowRight, Bell } from "lucide-react";
import { motion } from "framer-motion";
import type { AthleteProfile } from "@/types";
import { getAvatarImage } from "@/lib/imageUtils";

interface Props {
  athletes: AthleteProfile[];
  avgCompletion: number;
  activeAthletesCount: number;
  totalSessions: number;
  coachName?: string;
}

export default function CoachDashboard({ athletes, avgCompletion, activeAthletesCount, totalSessions, coachName = "Coach" }: Props) {
  const kpis = [
    { label: "Total Athletes",   value: athletes.length,            icon: Users,    color: "text-emerald-400", bg: "bg-emerald-500/15 border-emerald-500/30", trend: "↑ 0 vs last week"  },
    { label: "Active This Week", value: activeAthletesCount,        icon: Zap,      color: "text-cyan-400",    bg: "bg-cyan-500/15 border-cyan-500/30",       trend: "↑ 2 vs last week"  },
    { label: "Avg Completion",   value: `${Math.round(avgCompletion)}%`, icon: Target, color: "text-violet-400", bg: "bg-violet-500/15 border-violet-500/30", trend: "↑ 8% vs last week"  },
    { label: "Sessions Logged",  value: totalSessions,              icon: Calendar, color: "text-amber-400",   bg: "bg-amber-500/15 border-amber-500/30",     trend: "↑ 11 vs last week" },
  ];

  const fakeActivity = [
    { name: "Mason Carter",  action: "completed Finishing Fundamentals",                     time: "2h ago" },
    { name: "Liam Johnson",  action: "logged a new personal best in 3-Point Sharpshooter",  time: "4h ago" },
    { name: "Darius Brown",  action: "completed Defensive Stopper",                          time: "6h ago" },
    { name: "Noah Williams", action: "started Speed & Agility",                               time: "8h ago" },
  ];

  const statuses = ["active","active","active","rest day","inactive","active","active","active"];

  return (
    <div className="min-h-screen bg-[#050816] text-white">
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-emerald-500/4 blur-[150px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-8">
        {/* Header */}
        <motion.div initial={{ opacity:0, y:-12 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.45 }}
          className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">Coach Overview</h1>
            <p className="text-zinc-500 text-sm mt-1">Managing {athletes.length} athletes</p>
          </div>
          <button className="p-2.5 rounded-xl border border-zinc-800 bg-zinc-900/60 text-zinc-500 hover:text-zinc-200 hover:border-zinc-700 transition-all">
            <Bell className="w-5 h-5" />
          </button>
        </motion.div>

        {/* KPI cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {kpis.map(({ label, value, icon: Icon, color, bg, trend }, i) => (
            <motion.div key={label} initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay: i*0.07 }}
              className="rounded-2xl border border-zinc-800/80 bg-zinc-900/60 backdrop-blur-sm p-4 sm:p-5 hover:border-zinc-700 transition-all">
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2 rounded-xl border ${bg}`}><Icon className={`w-4 h-4 ${color}`} /></div>
              </div>
              <p className="text-[11px] uppercase tracking-widest text-zinc-500 font-semibold mb-1">{label}</p>
              <p className={`text-3xl font-black ${color}`}>{value}</p>
              <p className="text-[11px] text-zinc-600 mt-1.5">{trend}</p>
            </motion.div>
          ))}
        </div>

        {/* Roster + right panel */}
        <div className="grid lg:grid-cols-5 gap-6">
          {/* Roster table */}
          <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.3 }}
            className="lg:col-span-3 rounded-2xl border border-zinc-800/80 bg-zinc-900/60 backdrop-blur-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-zinc-800/60">
              <h2 className="text-base font-bold text-white">Athlete Roster</h2>
            </div>
            <div className="px-5 py-2.5 grid grid-cols-[2fr_1fr_1fr_1fr_80px] gap-3 text-[10px] uppercase tracking-widest text-zinc-600 font-semibold border-b border-zinc-800/40">
              <span>Avatar + Name</span><span>Completion %</span><span className="text-center">Sessions</span><span>Status</span><span>Action</span>
            </div>
            <div className="divide-y divide-zinc-800/40">
              {athletes.length > 0 ? athletes.slice(0,8).map((athlete, i) => {
                const pct     = Math.floor(40 + Math.random() * 55);
                const sess    = Math.floor(2 + Math.random() * 6);
                const status  = statuses[i] ?? "active";
                const barColor = pct > 70 ? "bg-emerald-400" : pct > 50 ? "bg-amber-400" : "bg-red-400";
                const statusCls = status === "active" ? "text-emerald-400 bg-emerald-500/15 border-emerald-500/30"
                                : status === "rest day" ? "text-amber-400 bg-amber-500/15 border-amber-500/30"
                                : "text-red-400 bg-red-500/15 border-red-500/30";
                return (
                  <motion.div key={athlete.user_id} initial={{ opacity:0, x:-8 }} animate={{ opacity:1, x:0 }} transition={{ delay:0.4 + i*0.05 }}
                    className="px-5 py-3 grid grid-cols-[2fr_1fr_1fr_1fr_80px] gap-3 items-center hover:bg-zinc-800/30 transition-colors">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <img src={getAvatarImage(athlete.full_name ?? "Athlete")} alt="" className="w-8 h-8 rounded-full object-cover border border-zinc-700 flex-shrink-0" />
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-white truncate">{athlete.full_name ?? "Athlete"}</p>
                        <p className="text-[11px] text-zinc-600">May 22, 2025</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-zinc-300 mb-1">{pct}%</p>
                      <div className="h-1.5 rounded-full bg-zinc-800 overflow-hidden w-full">
                        <div className={`h-full rounded-full ${barColor}`} style={{ width:`${pct}%` }} />
                      </div>
                    </div>
                    <p className="text-sm font-bold text-zinc-300 text-center">{sess}</p>
                    <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full border capitalize inline-block ${statusCls}`}>{status}</span>
                    <button className="text-xs text-zinc-500 hover:text-emerald-400 transition-colors flex items-center gap-0.5 font-semibold">
                      Assign <ArrowRight className="w-3 h-3" />
                    </button>
                  </motion.div>
                );
              }) : (
                <div className="text-center py-12">
                  <Users className="w-10 h-10 text-zinc-700 mx-auto mb-3" />
                  <p className="text-zinc-500 text-sm">No athletes yet</p>
                </div>
              )}
            </div>
          </motion.div>

          {/* Right: Quick Assign + Activity Feed */}
          <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.4 }}
            className="lg:col-span-2 space-y-5">
            {/* Quick Assign */}
            <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/60 backdrop-blur-sm p-5">
              <div className="flex items-center gap-2 mb-4">
                <Zap className="w-4 h-4 text-amber-400" />
                <h3 className="text-sm font-black text-white uppercase tracking-wide">Quick Assign</h3>
              </div>
              <div className="space-y-3">
                {[["Select Athlete","Select an athlete",...athletes.slice(0,8).map(a=>a.full_name??"Athlete")],
                  ["Select Workout","Select a workout","Finishing Fundamentals","3-Point Sharpshooter","Defensive Stopper","Elite Handles"]
                ].map(([label, placeholder, ...opts], idx) => (
                  <div key={idx}>
                    <p className="text-[11px] text-zinc-500 mb-1.5 font-semibold">{label}</p>
                    <select className="w-full bg-zinc-800/60 border border-zinc-700/60 rounded-xl px-3 py-2.5 text-sm text-zinc-300 focus:border-emerald-500/40 focus:outline-none transition-all appearance-none">
                      <option value="">{placeholder}</option>
                      {opts.map(o => <option key={o}>{o}</option>)}
                    </select>
                  </div>
                ))}
                <div>
                  <p className="text-[11px] text-zinc-500 mb-1.5 font-semibold">Due Date</p>
                  <input type="date" className="w-full bg-zinc-800/60 border border-zinc-700/60 rounded-xl px-3 py-2.5 text-sm text-zinc-300 focus:border-emerald-500/40 focus:outline-none transition-all" />
                </div>
                <button className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-black text-sm transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] flex items-center justify-center gap-2">
                  Assign →
                </button>
              </div>
            </div>

            {/* Activity Feed */}
            <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/60 backdrop-blur-sm p-5">
              <h3 className="text-sm font-black text-white uppercase tracking-wide mb-4">Team Activity Feed</h3>
              <div className="space-y-4">
                {fakeActivity.map((item, i) => (
                  <motion.div key={i} initial={{ opacity:0, x:8 }} animate={{ opacity:1, x:0 }} transition={{ delay:0.5+i*0.06 }}
                    className="flex items-start gap-3">
                    <img src={getAvatarImage(item.name)} alt="" className="w-8 h-8 rounded-full object-cover border border-zinc-700 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-zinc-400 leading-relaxed">
                        <span className="font-bold text-white">{item.name}</span> {item.action}
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
