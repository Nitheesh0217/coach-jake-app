"use client";

import { useState } from "react";
import { X, Star } from "lucide-react";

interface MockWorkout {
  id: string;
  title: string;
  description: string;
  type: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  status: "active" | "completed" | "history";
  assignedDate: string;
  duration?: number;
  rating?: number;
  notes?: string;
}

interface CompleteWorkoutModalProps {
  workout: MockWorkout;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { duration: number; rating: number; notes: string }) => void;
}

export default function CompleteWorkoutModal({
  workout,
  isOpen,
  onClose,
  onSubmit,
}: CompleteWorkoutModalProps) {
  const [duration, setDuration] = useState<number>(workout.duration || 60);
  const [durationInput, setDurationInput] = useState<string>(String(duration));
  const [rating, setRating] = useState<number>(workout.rating || 0);
  const [notes, setNotes] = useState<string>(workout.notes || "");
  const [hoveredRating, setHoveredRating] = useState<number>(0);
  const [submitting, setSubmitting] = useState(false);

  const handleDurationChange = (value: string) => {
    setDurationInput(value);
    const num = parseInt(value) || 0;
    setDuration(Math.max(1, Math.min(999, num)));
  };

  const handleSubmit = async () => {
    if (rating === 0) {
      alert("Please provide a rating");
      return;
    }

    setSubmitting(true);
    try {
      onSubmit({
        duration: duration,
        rating: rating,
        notes: notes.trim(),
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div className="rounded-2xl border border-emerald-500/20 bg-gradient-to-b from-zinc-900 to-zinc-950 shadow-2xl max-w-md w-full backdrop-blur-xl">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-zinc-800">
            <div>
              <h2 className="text-2xl font-bold text-white">
                Complete Workout
              </h2>
              <p className="text-sm text-zinc-400 mt-1">{workout.title}</p>
            </div>
            <button
              onClick={onClose}
              className="text-zinc-400 hover:text-zinc-200 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Duration Input */}
            <div>
              <label className="block text-sm font-semibold text-white mb-3">
                Duration (minutes) <span className="text-red-400">*</span>
              </label>
              <input
                type="number"
                value={durationInput}
                onChange={(e) => handleDurationChange(e.target.value)}
                min="1"
                max="999"
                placeholder="60"
                className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50 transition-all"
              />
              <p className="text-xs text-zinc-500 mt-2">
                Actual duration: {duration} minutes
              </p>
            </div>

            {/* Rating */}
            <div>
              <label className="block text-sm font-semibold text-white mb-3">
                How would you rate this workout?{" "}
                <span className="text-red-400">*</span>
              </label>
              <div className="flex gap-3 justify-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(0)}
                    className="transition-transform hover:scale-110"
                  >
                    <Star
                      className={`w-8 h-8 transition-colors ${
                        star <= (hoveredRating || rating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-zinc-600"
                      }`}
                    />
                  </button>
                ))}
              </div>
              <p className="text-center text-sm text-zinc-400 mt-2">
                {rating > 0 ? `${rating} star${rating !== 1 ? "s" : ""}` : "Select a rating"}
              </p>
            </div>

            {/* Notes */}
            <div>
              <label htmlFor="notes" className="block text-sm font-semibold text-white mb-3">
                Notes <span className="text-zinc-500 text-xs">(Optional)</span>
              </label>
              <textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="How did the workout feel? Any observations or changes?"
                maxLength={500}
                rows={4}
                className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50 transition-all resize-none"
              />
              <p className="text-xs text-zinc-500 mt-2">
                {notes.length}/500 characters
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="flex gap-3 p-6 border-t border-zinc-800">
            <button
              onClick={onClose}
              disabled={submitting}
              className="flex-1 px-4 py-3 rounded-lg border border-zinc-700 text-zinc-300 hover:bg-zinc-800/50 font-semibold transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={submitting || rating === 0}
              className="flex-1 px-4 py-3 rounded-lg bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 disabled:from-emerald-500/50 disabled:to-emerald-600/50 text-black font-semibold transition-all shadow-lg shadow-emerald-500/30 disabled:shadow-none disabled:cursor-not-allowed"
            >
              {submitting ? "Saving..." : "✅ Complete Workout"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
