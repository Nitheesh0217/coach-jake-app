"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Dumbbell, Check, Clock, Zap, Calendar } from "lucide-react";
import { getWorkoutImage } from "@/lib/imageUtils";

interface WorkoutSession {
  id: string;
  title: string;
  description: string;
  duration: number;
  focusArea: string;
  completed: boolean;
  date: string;
  exercises?: number;
}

interface WorkoutsClientProps {
  workouts: WorkoutSession[];
}

export default function WorkoutsClient({ workouts }: WorkoutsClientProps) {
  const [filter, setFilter] = useState<"all" | "completed" | "pending">("all");

  const filteredWorkouts = workouts.filter((w) => {
    if (filter === "completed") return w.completed;
    if (filter === "pending") return !w.completed;
    return true;
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.2 } },
  };

  const filterTabs: {
    label: string;
    value: "all" | "completed" | "pending";
    count: number;
  }[] = [
    {
      label: "All Workouts",
      value: "all",
      count: workouts.length,
    },
    {
      label: "Completed",
      value: "completed",
      count: workouts.filter((w) => w.completed).length,
    },
    {
      label: "Pending",
      value: "pending",
      count: workouts.filter((w) => !w.completed).length,
    },
  ];

  return (
    <div className="relative min-h-screen bg-[#050816] text-white overflow-hidden">
      {/* Page header */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-5xl sm:text-6xl font-black tracking-tight bg-linear-to-br from-white via-white to-zinc-400 bg-clip-text text-transparent mb-3">
            Your Workouts
          </h1>
          <p className="text-zinc-400 text-lg">
            Complete workouts to build your streak and track progress
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex gap-3 mb-8 flex-wrap"
        >
          {filterTabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setFilter(tab.value)}
              className={`relative px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                filter === tab.value
                  ? "bg-emerald-500 text-black shadow-lg shadow-emerald-500/30"
                  : "bg-zinc-900/80 border border-zinc-800 text-zinc-300 hover:border-emerald-500/40"
              }`}
            >
              {tab.label}
              <span className="ml-2 text-sm font-normal opacity-75">
                ({tab.count})
              </span>
              {filter === tab.value && (
                <motion.div
                  layoutId="active-tab"
                  className="absolute inset-0 rounded-full border-2 border-emerald-300"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </button>
          ))}
        </motion.div>

        {/* Workouts Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="wait">
            {filteredWorkouts.length > 0 ? (
              filteredWorkouts.map((workout, idx) => (
                <motion.div
                  key={workout.id}
                  variants={itemVariants}
                  className={`rounded-2xl border border-zinc-800 bg-zinc-900/80 backdrop-blur-sm shadow-xl shadow-black/20 overflow-hidden hover:border-emerald-500/40 hover:shadow-emerald-glow-md transition-all duration-300 group cursor-pointer`}
                >
                  {/* Workout Image */}
                  <div className="relative w-full h-40 overflow-hidden bg-gradient-to-br from-emerald-500/20 to-cyan-500/20">
                    <motion.img
                      src={getWorkoutImage(workout.title, workout.focusArea)}
                      alt={workout.title}
                      className="w-full h-full object-cover"
                      initial={{ scale: 1.1, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.5 }}
                    />
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-all duration-300" />
                  </div>

                  {/* Card Header with Focus Area Badge */}
                  <div className="relative p-6 border-b border-zinc-800/50">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-white mb-1">
                          {workout.title}
                        </h3>
                        <span className="inline-block px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                          {workout.focusArea}
                        </span>
                      </div>
                      {workout.completed && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{
                            type: "spring",
                            stiffness: 500,
                            damping: 30,
                          }}
                          className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center shrink-0 ml-2"
                        >
                          <Check className="w-5 h-5 text-emerald-400" />
                        </motion.div>
                      )}
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6 space-y-4">
                    <p className="text-zinc-400 text-sm line-clamp-2">
                      {workout.description}
                    </p>

                    {/* Workout Stats */}
                    <div className="grid grid-cols-3 gap-3">
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="w-4 h-4 text-cyan-400" />
                        <span className="text-zinc-300">
                          {workout.duration}m
                        </span>
                      </div>
                      {workout.exercises && (
                        <div className="flex items-center gap-2 text-sm">
                          <Dumbbell className="w-4 h-4 text-amber-400" />
                          <span className="text-zinc-300">
                            {workout.exercises}
                          </span>
                        </div>
                      )}
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="w-4 h-4 text-violet-400" />
                        <span className="text-zinc-300">
                          {new Date(workout.date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Card Footer - CTA */}
                  <div className="px-6 py-4 border-t border-zinc-800/50 bg-zinc-900/40">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`w-full py-2.5 rounded-lg font-semibold transition-all duration-300 ${
                        workout.completed
                          ? "bg-emerald-500/10 border border-emerald-500/30 text-emerald-400"
                          : "bg-emerald-500 hover:bg-emerald-600 text-black border-0"
                      }`}
                    >
                      {workout.completed ? "Completed ✓" : "Start Workout"}
                    </motion.button>
                  </div>

                  {/* Loading state shimmer */}
                  {!workout.completed && (
                    <motion.div
                      className="absolute inset-0 bg-linear-to-r from-transparent via-white/5 to-transparent"
                      animate={{ x: ["0%", "100%"] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                  )}
                </motion.div>
              ))
            ) : (
              <motion.div
                variants={itemVariants}
                className="col-span-full text-center py-16"
              >
                <Dumbbell className="w-16 h-16 text-zinc-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">
                  No workouts found
                </h3>
                <p className="text-zinc-400">
                  Check back later or try a different filter
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Stats Footer */}
        {filteredWorkouts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-12 pt-8 border-t border-zinc-800"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-zinc-900/40 border border-zinc-800">
                <p className="text-xs uppercase text-zinc-500 font-semibold mb-1">
                  Total Workouts
                </p>
                <p className="text-2xl font-bold text-emerald-400">
                  {workouts.length}
                </p>
              </div>
              <div className="p-4 rounded-lg bg-zinc-900/40 border border-zinc-800">
                <p className="text-xs uppercase text-zinc-500 font-semibold mb-1">
                  Completed
                </p>
                <p className="text-2xl font-bold text-cyan-400">
                  {workouts.filter((w) => w.completed).length}
                </p>
              </div>
              <div className="p-4 rounded-lg bg-zinc-900/40 border border-zinc-800">
                <p className="text-xs uppercase text-zinc-500 font-semibold mb-1">
                  Completion Rate
                </p>
                <p className="text-2xl font-bold text-violet-400">
                  {workouts.length > 0
                    ? Math.round(
                        (workouts.filter((w) => w.completed).length /
                          workouts.length) *
                          100,
                      )
                    : 0}
                  %
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
