"use client";

import { CheckCircle2, Circle, Zap, Loader2 } from "lucide-react";
import { useState } from "react";
import { markWorkoutComplete } from "@/app/(app)/dashboard/actions";

interface Drill {
  id: string;
  name: string;
  details: string;
}

interface TodaysWorkoutProps {
  workout?: {
    id: string;
    title: string;
    description: string | null;
    drills?: Drill[];
  } | null;
  selectedDate?: Date;
}

export default function TodaysWorkout({ workout, selectedDate = new Date() }: TodaysWorkoutProps) {
  const [completedDrills, setCompletedDrills] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const today = new Date();
  const isToday =
    selectedDate.getDate() === today.getDate() &&
    selectedDate.getMonth() === today.getMonth() &&
    selectedDate.getFullYear() === today.getFullYear();

  // Default drills if none provided
  const drills = workout?.drills || [
    { id: "1", name: "Warm-up: Dynamic stretching", details: "10 min" },
    { id: "2", name: "Barbell trap-bar deadlifts", details: "4x5, 90% effort" },
    { id: "3", name: "Bulgarian split squats", details: "3x8 each leg" },
    { id: "4", name: "Lateral quickness ladder", details: "6 rounds, 2 min rest" },
    { id: "5", name: "3PT shooting: Game spots", details: "30 makes, 60 total" },
    { id: "6", name: "Cool down + mobility", details: "5-10 min" },
  ];

  const toggleDrill = (id: string) => {
    setCompletedDrills((prev) =>
      prev.includes(id) ? prev.filter((d) => d !== id) : [...prev, id]
    );
  };

  const allCompleted = completedDrills.length === drills.length;
  const completionPercent = Math.round((completedDrills.length / drills.length) * 100);

  const handleMarkComplete = async () => {
    if (!workout?.id) {
      setError("Workout ID not found");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const result = await markWorkoutComplete({
        workoutId: workout.id,
        notes: completedDrills.length > 0 ? `Completed ${completedDrills.length}/${drills.length} drills` : undefined,
      });

      if (!result.success) {
        setError(result.error || "Failed to log workout");
        return;
      }

      // Success - reset form
      setCompletedDrills([]);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isToday) {
    return null;
  }

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-5 sm:p-6 shadow-lg shadow-black/40 backdrop-blur-sm">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="text-xl sm:text-2xl font-semibold text-zinc-50">
            {workout?.title || "Today's workout"}
          </h3>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            {workout?.description || "Knock out these drills to keep your streak alive."}
          </p>
        </div>
        <div className="inline-flex items-center rounded-full bg-emerald-500/20 border border-emerald-500/40 px-3 py-1.5 text-xs font-semibold text-emerald-300 uppercase tracking-wide">
          In-Season
        </div>
      </div>

      {/* Quick info */}
      <div className="grid grid-cols-3 gap-2 mb-6 pb-6 border-b border-zinc-800">
        <div>
          <p className="text-xs uppercase tracking-wide text-zinc-500 font-semibold">Duration</p>
          <p className="text-sm font-medium text-zinc-200 mt-1">~70 min</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide text-zinc-500 font-semibold">Difficulty</p>
          <p className="text-sm font-medium text-zinc-200 mt-1">Medium</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide text-zinc-500 font-semibold">Location</p>
          <p className="text-sm font-medium text-zinc-200 mt-1">Gym</p>
        </div>
      </div>

      {/* Drills list */}
      <div className="space-y-3 mb-6">
        {drills.map((drill) => (
          <div
            key={drill.id}
            onClick={() => toggleDrill(drill.id)}
            className="flex items-start gap-3 p-3 rounded-lg border border-zinc-800 bg-zinc-950/50 hover:border-zinc-700 transition cursor-pointer"
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleDrill(drill.id);
              }}
              className="flex-shrink-0 mt-1 text-emerald-400 hover:text-emerald-300 transition"
            >
              {completedDrills.includes(drill.id) ? (
                <CheckCircle2 className="w-5 h-5" />
              ) : (
                <Circle className="w-5 h-5 text-zinc-600" />
              )}
            </button>
            <div className="flex-1 min-w-0">
              <p
                className={`text-sm font-medium transition ${
                  completedDrills.includes(drill.id)
                    ? "text-zinc-400 line-through"
                    : "text-zinc-200"
                }`}
              >
                {drill.name}
              </p>
              <p className="text-xs text-zinc-500 mt-0.5">{drill.details}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Progress bar */}
      <div className="mb-6 pb-6 border-b border-zinc-800">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm font-medium text-zinc-300">Progress</p>
          <p className="text-xs text-zinc-500">{completionPercent}%</p>
        </div>
        <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 transition-all duration-300"
            style={{ width: `${completionPercent}%` }}
          ></div>
        </div>
      </div>

      {/* Error message */}
      {error && (
        <div className="mb-6 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
          <p className="font-medium">{error}</p>
        </div>
      )}

      {/* Action buttons */}
      <div className="flex gap-3">
        <button
          onClick={handleMarkComplete}
          disabled={isSubmitting || !allCompleted}
          className={`flex-1 rounded-full px-4 py-2.5 text-sm font-semibold transition transform flex items-center justify-center gap-2 ${
            allCompleted && !isSubmitting
              ? "bg-emerald-500 text-black shadow-lg shadow-emerald-500/30 hover:bg-emerald-400 hover:-translate-y-0.5 hover:shadow-emerald-500/50 disabled:opacity-60 disabled:hover:bg-emerald-500 disabled:hover:-translate-y-0"
              : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700 disabled:opacity-60"
          }`}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Logging...
            </>
          ) : allCompleted ? (
            <>
              <CheckCircle2 className="w-4 h-4" />
              Session Complete! ✓
            </>
          ) : (
            "Mark complete"
          )}
        </button>
        <button className="flex-1 rounded-full border border-zinc-700 bg-zinc-950/50 px-4 py-2.5 text-sm font-semibold text-zinc-300 hover:border-zinc-600 hover:bg-zinc-900 transition">
          Quick feedback
        </button>
      </div>
    </div>
  );
}
