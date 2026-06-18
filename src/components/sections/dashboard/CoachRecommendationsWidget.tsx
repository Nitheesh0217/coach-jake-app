import { Lightbulb } from "lucide-react";

export default function CoachRecommendationsWidget() {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-5 sm:p-6 shadow-lg shadow-black/40 backdrop-blur-sm">
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-lg sm:text-xl font-semibold text-zinc-50">Coach insight</h3>
        <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-orange-500/20 border border-orange-500/40 flex items-center justify-center">
          <Lightbulb className="w-5 h-5 text-orange-400" />
        </div>
      </div>

      {/* Recommendation card */}
      <div className="rounded-lg border border-orange-500/30 bg-orange-500/10 p-4 space-y-3">
        <div className="space-y-2">
          <p className="text-sm font-medium text-zinc-100">
            Lateral quickness drill missing
          </p>
          <p className="text-xs text-zinc-400">
            You haven't done lateral quickness work in 5 days. This is key for your defensive game.
          </p>
        </div>

        {/* Recommendation */}
        <div className="rounded-lg border border-orange-500/50 bg-orange-500/20 p-3 text-xs text-orange-100">
          <p className="font-medium mb-1">Recommended:</p>
          <p>Lane Slides & Closeouts in your next session</p>
        </div>

        {/* Action */}
        <button className="w-full rounded-lg bg-orange-500/20 border border-orange-500/40 px-3 py-2 text-xs font-medium text-orange-300 hover:bg-orange-500/30 transition">
          Got it, add to next plan
        </button>
      </div>

      {/* Additional tips */}
      <div className="mt-5 pt-5 border-t border-zinc-800 space-y-2">
        <p className="text-xs uppercase tracking-wide font-semibold text-zinc-500">Pro tip</p>
        <p className="text-xs text-zinc-400">
          Consistency trumps intensity. Focus on showing up and nailing your fundamentals.
        </p>
      </div>
    </div>
  );
}
