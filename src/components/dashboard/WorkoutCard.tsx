"use client";

import { useState } from "react";
import {
  Play,
  CheckCircle2,
  Eye,
  ChevronDown,
  ChevronUp,
  Calendar,
} from "lucide-react";
import type { Workout } from "@/types";

// Simplified workout type for list display
type WorkoutListItem = {
  id: string;
  title: string;
  description: string | null;
  is_active: boolean;
  created_at: string;
  // Optional fields from full Workout type
  type?: "strength" | "skill" | "conditioning";
  difficulty?: "beginner" | "intermediate" | "advanced";
  status?: "active" | "completed" | "history";
  assignedDate?: string;
  completionDate?: string;
  duration?: number;
  rating?: number;
  notes?: string;
};

const DIFFICULTY_CONFIG = {
  beginner: {
    emoji: "🟢",
    label: "Beginner",
    badgeBg: "bg-emerald-500/20",
    badgeText: "text-emerald-400",
    borderColor: "border-emerald-500/30",
  },
  intermediate: {
    emoji: "🟡",
    label: "Intermediate",
    badgeBg: "bg-amber-500/20",
    badgeText: "text-amber-400",
    borderColor: "border-amber-500/30",
  },
  advanced: {
    emoji: "🔴",
    label: "Advanced",
    badgeBg: "bg-rose-500/20",
    badgeText: "text-rose-400",
    borderColor: "border-rose-500/30",
  },
};

const STATUS_CONFIG = {
  active: {
    emoji: "⚡",
    label: "Active",
    badgeBg: "bg-emerald-500/20",
    badgeText: "text-emerald-400",
  },
  completed: {
    emoji: "✅",
    label: "Completed",
    badgeBg: "bg-blue-500/20",
    badgeText: "text-blue-400",
  },
  history: {
    emoji: "📅",
    label: "History",
    badgeBg: "bg-zinc-500/20",
    badgeText: "text-zinc-400",
  },
};

interface WorkoutCardProps {
  workout: WorkoutListItem | Workout;
  onMarkComplete?: () => void;
  alreadyCompletedToday?: boolean;
}

export default function WorkoutCard({
  workout,
  onMarkComplete,
  alreadyCompletedToday = false,
}: WorkoutCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Default values for optional fields
  const difficulty = ((workout as any).difficulty || "intermediate") as
    | "beginner"
    | "intermediate"
    | "advanced";
  const status = ((workout as any).status || "active") as
    | "active"
    | "completed"
    | "history";
  const type = ((workout as any).type || "skill") as
    | "strength"
    | "skill"
    | "conditioning";
  const assignedDate = (workout as any).assignedDate || workout.created_at;

  const diffConfig = DIFFICULTY_CONFIG[difficulty];
  const statusConfig = STATUS_CONFIG[status];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return "Today";
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    } else {
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
    }
  };

  return (
    <div
      className={`rounded-2xl border bg-gradient-to-br from-[#0b1220] to-[#050816] p-6 transition-all duration-300 shadow-xl shadow-black/40 ${
        alreadyCompletedToday
          ? "border-blue-500/30 hover:border-blue-500/50 hover:shadow-blue-500/10"
          : "border-emerald-500/20 hover:border-emerald-500/40 hover:shadow-emerald-500/10"
      }`}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-white mb-2">{workout.title}</h3>
          <div className="flex gap-2 flex-wrap items-center">
            {/* Difficulty Badge */}
            <span
              className={`px-3 py-1.5 rounded-full text-xs font-semibold ${diffConfig.badgeBg} ${diffConfig.badgeText} flex items-center gap-1.5 border ${diffConfig.borderColor}`}
            >
              {diffConfig.emoji} {diffConfig.label}
            </span>

            {/* Completed Today Badge */}
            {alreadyCompletedToday && (
              <span className="px-3 py-1.5 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 flex items-center gap-1.5 border border-blue-500/30">
                ✓ Completed today
              </span>
            )}

            {/* Status Badge - only show if not completed today */}
            {!alreadyCompletedToday && (
              <span
                className={`px-3 py-1.5 rounded-full text-xs font-semibold ${statusConfig.badgeBg} ${statusConfig.badgeText} flex items-center gap-1.5 border border-white/10`}
              >
                {statusConfig.emoji} {statusConfig.label}
              </span>
            )}

            {/* Type Label */}
            <span className="px-3 py-1.5 rounded-lg text-xs font-semibold text-zinc-300 bg-white/5 border border-white/10 capitalize hover:bg-white/10 transition-colors">
              {type}
            </span>
          </div>
        </div>
        <div className="text-right text-xs text-zinc-500 flex items-center gap-1 ml-4">
          <Calendar className="w-4 h-4" />
          {formatDate(assignedDate)}
        </div>
      </div>

      {/* Description Section */}
      <div className="mb-4 py-4 border-y border-white/10">
        <p
          className={`text-zinc-300 text-sm leading-relaxed transition-all ${
            isExpanded ? "" : "line-clamp-2"
          }`}
        >
          {workout.description}
        </p>
        {workout.description && workout.description.length > 100 && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-2 flex items-center gap-1 text-emerald-400 hover:text-emerald-300 text-xs font-medium transition-colors"
          >
            {isExpanded ? (
              <>
                Show less <ChevronUp className="w-3 h-3" />
              </>
            ) : (
              <>
                Show more <ChevronDown className="w-3 h-3" />
              </>
            )}
          </button>
        )}
      </div>

      {/* Completion Info - Only show if completed */}
      {status === "completed" && (workout as any).completionDate && (
        <div className="mb-4 grid grid-cols-3 gap-3 bg-white/5 p-4 rounded-xl border border-white/10">
          <div>
            <p className="text-xs text-zinc-500 font-semibold uppercase tracking-wide">
              Duration
            </p>
            <p className="text-lg font-bold text-emerald-400">
              {(workout as any).duration}m
            </p>
          </div>
          <div>
            <p className="text-xs text-zinc-500 font-semibold uppercase tracking-wide">
              Rating
            </p>
            <div className="flex items-center gap-1 mt-1">
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className={`text-lg ${
                    i < ((workout as any).rating || 0)
                      ? "text-amber-400"
                      : "text-zinc-700"
                  }`}
                >
                  ★
                </span>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs text-zinc-500 font-semibold uppercase tracking-wide">
              Completed
            </p>
            <p className="text-sm font-medium text-zinc-300 mt-1">
              {formatDate((workout as any).completionDate)}
            </p>
          </div>
        </div>
      )}

      {/* Notes Section */}
      {(workout as any).notes && (
        <div className="mb-4 p-4 rounded-xl bg-white/5 border border-white/10">
          <p className="text-xs text-zinc-500 font-semibold uppercase tracking-wide mb-2">
            Notes
          </p>
          <p className="text-sm text-zinc-300 italic">
            {(workout as any).notes}
          </p>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-3 pt-4 border-t border-white/10">
        {alreadyCompletedToday ? (
          <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-blue-500/20 border border-blue-500/30 text-blue-300 font-bold rounded-xl hover:bg-blue-500/30 transition-all duration-200">
            <CheckCircle2 className="w-5 h-5" />
            Completed Today
          </button>
        ) : (
          <>
            <button
              onClick={onMarkComplete}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-black font-bold rounded-xl transition-all duration-200 shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 hover:scale-105"
            >
              <CheckCircle2 className="w-5 h-5" />
              Mark Complete
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 border border-white/20 text-white font-bold rounded-xl hover:bg-white/5 hover:border-white/30 transition-all duration-200">
              <Play className="w-5 h-5" />
              Start
            </button>
          </>
        )}
      </div>
    </div>
  );
}
