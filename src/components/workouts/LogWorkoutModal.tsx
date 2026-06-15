"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Loader2, CheckCircle2 } from "lucide-react";
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
  const [isSuccess, setIsSuccess] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
    setError(null);
    setNotes("");
    setDate(new Date().toISOString().split("T")[0]);
    setIsSuccess(false);
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
        // Check for 23505 unique constraint violation
        if (insertError.code === "23505") {
          setError("You've already logged a session for this date");
        } else {
          setError(insertError.message);
        }
        setIsLoading(false);
        return;
      }

      // Show success state
      setIsSuccess(true);
      setTimeout(() => {
        handleClose();
        onSuccess?.();
      }, 1500);
    } catch (err) {
      setError(String(err));
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Button */}
      <button
        onClick={handleOpen}
        className="bg-gradient-to-r from-emerald-500 to-green-400 hover:from-emerald-400 hover:to-green-300 text-black font-semibold rounded-full px-6 py-2 transition-all duration-200 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 hover:scale-[1.02] active:scale-[0.98]"
      >
        Log This Session
      </button>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/70 backdrop-blur-md"
              onClick={handleClose}
            />

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative bg-zinc-900 border border-zinc-800 rounded-3xl p-8 w-full max-w-md mx-4 shadow-2xl shadow-black/60"
            >
              {/* Success State */}
              {isSuccess ? (
                <div className="flex flex-col items-center justify-center text-center">
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <CheckCircle2 className="w-16 h-16 text-emerald-400 mx-auto mb-4" />
                  </motion.div>
                  <h3 className="text-lg font-semibold text-white">
                    Session logged!
                  </h3>
                  <p className="text-sm text-zinc-400 mt-2">
                    Keep the streak going
                  </p>
                </div>
              ) : (
                <>
                  {/* Header */}
                  <div className="flex items-start justify-between mb-6">
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
                      className="text-zinc-500 hover:text-zinc-300 transition-colors"
                    >
                      <X className="w-5 h-5" />
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
                        className="w-full rounded-xl bg-zinc-800 border border-zinc-700 text-white px-4 py-3 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all"
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
                        placeholder="How did it feel? Any PRs today?"
                        rows={4}
                        className="w-full rounded-xl bg-zinc-800 border border-zinc-700 text-white px-4 py-3 placeholder-zinc-500 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all resize-none"
                      />
                    </div>

                    {/* Error */}
                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="rounded-lg bg-red-500/10 border border-red-500/30 p-3 text-sm text-red-200"
                      >
                        {error}
                      </motion.div>
                    )}

                    {/* Buttons */}
                    <div className="flex gap-3 pt-2">
                      <button
                        type="button"
                        onClick={handleClose}
                        className="flex-1 px-4 py-3 rounded-full border border-zinc-700 bg-zinc-800/50 hover:bg-zinc-700/60 text-zinc-300 hover:text-white transition-all duration-200 font-medium"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="flex-1 px-4 py-3 rounded-full bg-gradient-to-r from-emerald-500 to-green-400 hover:from-emerald-400 hover:to-green-300 disabled:opacity-50 disabled:cursor-not-allowed text-black font-semibold transition-all duration-200 flex items-center justify-center gap-2"
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Logging...
                          </>
                        ) : (
                          "Log Session"
                        )}
                      </button>
                    </div>
                  </form>
                </>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
