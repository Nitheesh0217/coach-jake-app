"use client";

import { CheckCircle2, Circle, Loader2 } from "lucide-react";
import { useState } from "react";
import { markWorkoutComplete } from "@/app/(app)/dashboard/actions";

interface Workout {
  id: string;
  title: string;
  description: string | null;
  is_active: boolean;
  created_at: string;
}

interface WorkoutCardProps {
  workout: Workout;
}

export default function WorkoutCard({ workout }: WorkoutCardProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);

  const handleMarkComplete = async () => {
    setIsSubmitting(true);
    setError(null);

    try {
      const result = await markWorkoutComplete({
        workoutId: workout.id,
        notes: `Completed workout: ${workout.title}`,
      });

      if (!result.success) {
        setError(result.error || "Failed to log workout");
        return;
      }

      setIsCompleted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formattedDate = new Date(workout.created_at).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-6 shadow-lg shadow-black/40 backdrop-blur-sm hover:border-zinc-700 transition">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-zinc-50">{workout.title}</h3>
          <p className="text-sm text-zinc-400 mt-1">Added {formattedDate}</p>
        </div>
        {isCompleted && (
          <div className="flex-shrink-0 ml-4">
            <div className="rounded-full bg-emerald-500/20 border border-emerald-500/40 p-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            </div>
          </div>
        )}
      </div>

      {/* Description */}
      {workout.description && (
        <p className="text-base text-zinc-300 leading-relaxed mb-6">
          {workout.description}
        </p>
      )}

      {/* Error message */}
      {error && (
        <div className="mb-4 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
          <p className="font-medium">{error}</p>
        </div>
      )}

      {/* Action button */}
      <button
        onClick={handleMarkComplete}
        disabled={isSubmitting || isCompleted}
        className={`w-full rounded-full px-6 py-3 text-sm font-semibold transition transform flex items-center justify-center gap-2 ${
          isCompleted
            ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 cursor-default"
            : "bg-emerald-500 text-black shadow-lg shadow-emerald-500/30 hover:bg-emerald-400 hover:-translate-y-0.5 hover:shadow-emerald-500/50 disabled:opacity-60 disabled:hover:bg-emerald-500 disabled:hover:-translate-y-0"
        }`}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Logging...
          </>
        ) : isCompleted ? (
          <>
            <CheckCircle2 className="w-4 h-4" />
            Completed
          </>
        ) : (
          <>
            <Circle className="w-4 h-4" />
            Mark Complete
          </>
        )}
      </button>
    </div>
  );
}
