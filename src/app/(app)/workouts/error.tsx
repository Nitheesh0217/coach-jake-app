"use client";

import { useEffect } from "react";
import { AlertCircle, RefreshCw } from "lucide-react";

export default function WorkoutsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Workouts error:", error);
  }, [error]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-zinc-950 to-zinc-900 px-4">
      <div className="max-w-md w-full">
        <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-8 text-center space-y-4">
          <div className="flex justify-center">
            <AlertCircle className="w-12 h-12 text-red-400" />
          </div>
          <h1 className="text-2xl font-black text-white">
            Something went wrong
          </h1>
          <p className="text-zinc-400 text-sm">
            We encountered an issue loading your workouts. Please try again.
          </p>
          <div className="bg-zinc-900/50 rounded-lg p-3 mt-4 border border-zinc-800">
            <p className="text-xs text-zinc-500 font-mono break-words">
              {error.message || "Unknown error"}
            </p>
          </div>
          <button
            onClick={() => reset()}
            className="w-full mt-6 flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-bold rounded-full px-6 py-3 transition-all shadow-lg shadow-emerald-500/30"
          >
            <RefreshCw className="w-4 h-4" />
            Try again
          </button>
        </div>
      </div>
    </div>
  );
}
