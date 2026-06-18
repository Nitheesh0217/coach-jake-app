"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Dumbbell, Clock, Search, SlidersHorizontal, Calendar, Check } from "lucide-react";
import { getWorkoutImage } from "@/lib/imageUtils";

interface WorkoutSession {
  id: string; title: string; description: string | null; duration: number;
  focusArea: string; completed: boolean; date: string;
  exercises?: number; assignedByCoach?: boolean; dueDate?: string;
}

interface Props { workouts: WorkoutSession[]; }

export default function WorkoutsClient({ workouts }: Props) {
  const [filter, setFilter]   = useState<"all"|"assigned"|"completed">("all");
  const [search, setSearch]   = useState("");

  const assigned = workouts.filter(w => w.assignedByCoach && !w.completed);
  const library  = workouts.filter(w => {
    const matchesSearch = !search || w.title.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter==="completed" ? w.completed : filter==="assigned" ? w.assignedByCoach : true;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-transparent text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-8">
        {/* Header + tabs */}
        <motion.div initial={{ opacity:0, y:-14 }} animate={{ opacity:1, y:0 }} className="flex items-center justify-between gap-4 flex-wrap">
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">Workouts</h1>
          <div className="flex items-center gap-1.5">
            {(["all","assigned","completed"] as const).map(f => (
              <button key={f} onClick={() => setFilter(f)}
                className={`px-4 py-1.5 rounded-full text-sm font-bold capitalize transition-all ${
                  filter===f ? "bg-emerald-500 text-black shadow-[0_0_16px_rgba(16,185,129,0.4)]" : "text-zinc-500 hover:text-zinc-200"
                }`}>
                {f==="all" ? "All" : f==="assigned" ? "Assigned" : "Completed"}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Assigned workouts */}
        {assigned.length > 0 && (
          <motion.section initial={{ opacity:0, y:14 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.1 }}>
            <p className="text-[11px] uppercase tracking-widest text-zinc-600 font-bold mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" /> Assigned to you
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {assigned.map((w, i) => (
                <motion.div key={w.id} initial={{ opacity:0, y:18 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.1+i*0.08 }}
                  className="rounded-2xl border border-emerald-500/30 bg-gradient-to-br from-emerald-500/8 to-zinc-900/80 backdrop-blur-sm p-5 hover:border-emerald-500/50 transition-all duration-300">
                  <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400 bg-emerald-500/15 border border-emerald-500/30 px-2.5 py-0.5 rounded-full">
                    Assigned by Coach
                  </span>
                  <h3 className="text-lg font-black text-white mt-3 mb-1">{w.title}</h3>
                  <p className="text-sm text-zinc-400 mb-4 line-clamp-2">{w.description}</p>
                  <div className="flex items-center gap-4 text-[11px] text-zinc-600 mb-4">
                    {w.exercises && <span className="flex items-center gap-1.5"><Dumbbell className="w-3.5 h-3.5 text-emerald-400"/>{w.exercises} Drills</span>}
                    <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-emerald-400"/>{w.duration} min</span>
                    {w.dueDate && <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-emerald-400"/>Due {w.dueDate}</span>}
                  </div>
                  <button className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-black text-sm transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)]">
                    Start Workout
                  </button>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Workout Library */}
        <motion.section initial={{ opacity:0, y:14 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.2 }}>
          <div className="flex items-center justify-between mb-4 gap-3 flex-wrap">
            <p className="text-lg font-black text-white">Workout Library</p>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-600" />
                <input type="text" placeholder="Search workouts..." value={search} onChange={e => setSearch(e.target.value)}
                  className="pl-8 pr-4 py-2 rounded-xl bg-zinc-800/60 border border-zinc-700/60 text-sm text-zinc-200 placeholder-zinc-700 focus:border-emerald-500/40 focus:outline-none transition-all w-44" />
              </div>
              <button className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-zinc-800/60 border border-zinc-700/60 text-sm text-zinc-500 hover:text-zinc-200 hover:border-zinc-600 transition-all">
                <SlidersHorizontal className="w-3.5 h-3.5"/> Filter
              </button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {library.length > 0 ? (
              <motion.div key="grid" initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
                className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {library.map((w, i) => (
                  <motion.div key={w.id} initial={{ opacity:0, y:18 }} animate={{ opacity:1, y:0 }} transition={{ delay:i*0.05 }}
                    className="group rounded-2xl border border-zinc-800/80 bg-zinc-900/60 backdrop-blur-sm hover:border-emerald-500/30 transition-all duration-300 overflow-hidden relative">
                    {w.completed && (
                      <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 text-[10px] font-black text-emerald-400 bg-emerald-500/20 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                        <Check className="w-3 h-3"/> Done
                      </div>
                    )}
                    <div className="h-36 overflow-hidden relative">
                      <img src={getWorkoutImage(w.title, w.focusArea)} alt={w.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent" />
                    </div>
                    <div className="p-4 space-y-3">
                      <h3 className="font-black text-white">{w.title}</h3>
                      <div className="flex items-center gap-3 text-[11px] text-zinc-600">
                        {w.exercises && <span className="flex items-center gap-1"><Dumbbell className="w-3 h-3 text-zinc-500"/>{w.exercises} Drills</span>}
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3 text-zinc-500"/>{w.duration} min</span>
                      </div>
                      <button className={`w-full py-2.5 rounded-xl text-sm font-bold transition-all ${
                        w.completed
                          ? "bg-zinc-800 border border-zinc-700 text-zinc-400 hover:border-emerald-500/40 hover:text-emerald-400"
                          : "bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/25"
                      }`}>
                        Log This Workout
                      </button>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div key="empty" initial={{ opacity:0 }} animate={{ opacity:1 }}
                className="text-center py-16 rounded-2xl border border-zinc-800 bg-zinc-900/40">
                <Dumbbell className="w-12 h-12 text-zinc-700 mx-auto mb-3"/>
                <p className="text-zinc-500 font-semibold">No workouts found</p>
                <p className="text-zinc-700 text-sm mt-1">Try a different search or filter</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.section>
      </div>
    </div>
  );
}
