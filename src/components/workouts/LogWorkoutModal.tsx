"use client";

import { useState } from "react";
import { supabaseBrowser } from "@/lib/supabaseClient";

type LogWorkoutModalProps = {
  workoutId: string;
  workoutName: string;
  onClose?: () => void;
  onSuccess?: () => void;
};

export default function LogWorkoutModal({
  workoutId,
  workoutName,
  onClose,
  onSuccess,
}: LogWorkoutModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [notes, setNotes] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const handleOpen = () => {
    setIsOpen(true);
    setError(null);
    setNotes("");
    setDate(new Date().toISOString().split("T")[0]);
  };

  const handleClose = () => {
    setIsOpen(false);
    onClose?.();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const supabase = supabaseBrowser();
      const { data: auth } = await supabase.auth.getUser();
      const user = auth.user;

      if (!user) {
        setError("Not authenticated");
        setIsLoading(false);
        return;
      }

      const { error: insertError } = await supabase
        .from("workout_logs")
        .insert({
          user_id: user.id,
          workout_id: workoutId,
          date: date,
          notes: notes || null,
          completed: true,
        });

      if (insertError) {
        setError(insertError.message);
        setIsLoading(false);
        return;
      }

      // Show toast
      setToast("✅ Session logged");
      setTimeout(() => setToast(null), 2000);

      // Close modal
      handleClose();
      onSuccess?.();
    } catch (err) {
      setError(String(err));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Button */}
      <button
        onClick={handleOpen}
        className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black text-sm font-semibold transition-colors whitespace-nowrap"
      >
        Log Session
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          {/* Backdrop */}
          <div className="absolute inset-0" onClick={handleClose} />

          {/* Modal Content */}
          <div className="relative bg-zinc-900 border border-white/[0.08] rounded-lg p-6 w-full max-w-md mx-4 shadow-2xl">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-xl font-semibold text-white">
                  Log {workoutName}
                </h2>
                <p className="text-sm text-zinc-400 mt-1">
                  Record when you completed this session
                </p>
              </div>
              <button
                onClick={handleClose}
                className="text-zinc-400 hover:text-zinc-200 text-2xl leading-none"
              >
                ×
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Date Input */}
              <div>
                <label className="block text-sm font-medium text-zinc-200 mb-2">
                  Date
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full rounded-lg bg-zinc-800/50 border border-white/[0.08] text-white px-3 py-2 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/30"
                />
              </div>

              {/* Notes Input */}
              <div>
                <label className="block text-sm font-medium text-zinc-200 mb-2">
                  Notes (optional)
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g., Felt strong, good form..."
                  rows={3}
                  className="w-full rounded-lg bg-zinc-800/50 border border-white/[0.08] text-white px-3 py-2 placeholder-zinc-500 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/30 resize-none"
                />
              </div>

              {/* Error */}
              {error && (
                <div className="rounded-lg bg-red-500/10 border border-red-500/30 p-3 text-sm text-red-200">
                  {error}
                </div>
              )}

              {/* Toast */}
              {toast && (
                <div className="rounded-lg bg-emerald-500/10 border border-emerald-500/30 p-3 text-sm text-emerald-200">
                  {toast}
                </div>
              )}

              {/* Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={handleClose}
                  className="flex-1 px-4 py-2 rounded-lg border border-white/[0.08] text-white hover:bg-white/[0.05] transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 disabled:cursor-not-allowed text-black font-semibold transition-colors"
                >
                  {isLoading ? "Saving..." : "Log Session"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
