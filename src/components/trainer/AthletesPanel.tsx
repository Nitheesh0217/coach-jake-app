"use client";

import { CheckCircle2, Circle, Clock, Plus } from "lucide-react";
import { useState } from "react";
import { assignWorkout } from "@/app/(app)/trainer-dashboard/actions";

type AthleteRow = {
  user_id: string;
  email: string;
  full_name: string | null;
  age: number | null;
  sessions_this_week: number;
  sessions_30d: number;
  last_workout_date: string | null;
};

type Workout = {
  id: string;
  title: string;
};

type Assignment = {
  id: string;
  athlete_id: string;
  workout_id: string;
};

interface AthletesPanelProps {
  athletes: AthleteRow[];
  workouts: Workout[];
  assignments: Assignment[];
}

export default function AthletesPanel({
  athletes,
  workouts,
  assignments,
}: AthletesPanelProps) {
  const sorted = [...athletes].sort(
    (a, b) => b.sessions_this_week - a.sessions_this_week,
  );

  const [expandedAthlete, setExpandedAthlete] = useState<string | null>(null);
  const [assigningWorkout, setAssigningWorkout] = useState<string | null>(null);
  const [assignmentStatus, setAssignmentStatus] = useState<
    Record<string, { success?: boolean; message: string }>
  >({});

  const getAssignedWorkouts = (athleteId: string): string[] => {
    return assignments
      .filter((a) => a.athlete_id === athleteId)
      .map((a) => a.workout_id);
  };

  // Calculate athlete status based on last workout date
  const getAthleteStatus = (
    lastWorkoutDate: string | null,
  ): { icon: string; label: string; color: string } => {
    if (!lastWorkoutDate) {
      return { icon: "🔴", label: "At Risk", color: "text-red-400" };
    }

    const lastDate = new Date(lastWorkoutDate);
    const today = new Date();
    const daysSince = Math.floor(
      (today.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24),
    );

    if (daysSince <= 7) {
      return { icon: "🟢", label: "Active", color: "text-emerald-400" };
    } else if (daysSince <= 14) {
      return { icon: "🟡", label: "Inactive", color: "text-amber-400" };
    } else {
      return { icon: "🔴", label: "At Risk", color: "text-red-400" };
    }
  };

  const handleAssignWorkout = async (
    athleteId: string,
    workoutId: string,
    workoutTitle: string,
  ) => {
    const result = await assignWorkout(athleteId, workoutId);
    const key = `${athleteId}-${workoutId}`;

    if (result.success) {
      setAssignmentStatus({
        ...assignmentStatus,
        [key]: { success: true, message: "✓ Assigned" },
      });
      setTimeout(() => {
        setExpandedAthlete(null);
        setAssignmentStatus((prev) => {
          const updated = { ...prev };
          delete updated[key];
          return updated;
        });
      }, 2000);
    } else {
      setAssignmentStatus({
        ...assignmentStatus,
        [key]: {
          success: false,
          message: result.error || "Failed to assign",
        },
      });
    }
  };

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-6">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-lg font-semibold text-zinc-50">Athlete Roster</h3>
        <span className="text-xs text-zinc-500">
          {athletes.length} athletes
        </span>
      </div>

      {athletes.length === 0 ? (
        <div className="py-8 text-center">
          <p className="text-zinc-500 text-sm">No athletes yet.</p>
          <p className="text-zinc-600 text-xs mt-1">
            Athletes will appear here once they sign up.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {sorted.map((athlete) => {
            const initials = (athlete.full_name ?? athlete.email)
              .split(" ")
              .map((w) => w[0])
              .slice(0, 2)
              .join("")
              .toUpperCase();
            const activeToday = athlete.sessions_this_week > 0;
            const lastDate = athlete.last_workout_date
              ? new Date(athlete.last_workout_date).toLocaleDateString(
                  "en-US",
                  {
                    month: "short",
                    day: "numeric",
                  },
                )
              : null;
            const status = getAthleteStatus(athlete.last_workout_date);

            const isExpanded = expandedAthlete === athlete.user_id;
            const assignedWorkoutIds = getAssignedWorkouts(athlete.user_id);

            return (
              <div key={athlete.user_id}>
                <div className="flex items-center justify-between p-4 rounded-xl border border-zinc-800 hover:border-zinc-700 transition">
                  <div className="flex items-center gap-3 flex-1">
                    <div className="w-9 h-9 rounded-full bg-zinc-700 flex items-center justify-center text-xs font-bold text-zinc-200">
                      {initials}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-zinc-100">
                        {athlete.full_name ?? athlete.email}
                      </p>
                      <p className="text-xs text-zinc-500">
                        {lastDate ? (
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" /> Last active {lastDate}
                          </span>
                        ) : (
                          "No activity yet"
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-sm font-semibold text-zinc-100">
                        {athlete.sessions_30d}
                      </p>
                      <p className="text-xs text-zinc-500">30d</p>
                    </div>
                    <div
                      className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${status.color}`}
                    >
                      <span>{status.icon}</span>
                      <span>{status.label}</span>
                    </div>
                    <button
                      onClick={() =>
                        setExpandedAthlete(isExpanded ? null : athlete.user_id)
                      }
                      className="ml-2 p-2 hover:bg-zinc-800 rounded-lg transition text-zinc-400 hover:text-zinc-200"
                      title="Assign workout"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Assignment Dropdown */}
                {isExpanded && (
                  <div className="mt-2 ml-4 p-4 rounded-xl border border-zinc-700 bg-zinc-800/50 space-y-2">
                    <p className="text-xs font-semibold text-zinc-400 mb-3">
                      Assign Workout
                    </p>
                    {workouts.length === 0 ? (
                      <p className="text-xs text-zinc-500">
                        No active workouts available
                      </p>
                    ) : (
                      <div className="space-y-2">
                        {workouts.map((workout) => {
                          const isAssigned = assignedWorkoutIds.includes(
                            workout.id,
                          );
                          const key = `${athlete.user_id}-${workout.id}`;
                          const status = assignmentStatus[key];

                          if (status?.success) {
                            return (
                              <div
                                key={workout.id}
                                className="flex items-center justify-between p-2 rounded text-xs text-emerald-400"
                              >
                                <span>{workout.title}</span>
                                <span>{status.message}</span>
                              </div>
                            );
                          }

                          return (
                            <button
                              key={workout.id}
                              onClick={() =>
                                handleAssignWorkout(
                                  athlete.user_id,
                                  workout.id,
                                  workout.title,
                                )
                              }
                              disabled={
                                isAssigned ||
                                assigningWorkout ===
                                  `${athlete.user_id}-${workout.id}`
                              }
                              className={`w-full text-left p-2 rounded text-xs transition ${
                                isAssigned
                                  ? "bg-zinc-700/50 text-zinc-400 cursor-not-allowed"
                                  : "hover:bg-emerald-500/20 text-zinc-300 hover:text-emerald-400"
                              }`}
                            >
                              {isAssigned && (
                                <span className="text-emerald-400">
                                  ✓ {workout.title}
                                </span>
                              )}
                              {!isAssigned && workout.title}
                              {status && !status.success && (
                                <div className="text-red-400 text-xs mt-1">
                                  {status.message}
                                </div>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
