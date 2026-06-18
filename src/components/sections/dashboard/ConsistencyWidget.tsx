import { Flame } from "lucide-react";

export default function ConsistencyWidget() {
  const completionPercent = 78;
  const currentStreak = 5;
  const bestStreak = 12;

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-5 sm:p-6 shadow-lg shadow-black/40 backdrop-blur-sm">
      <div className="flex items-start justify-between mb-5">
        <h3 className="text-lg sm:text-xl font-semibold text-zinc-50">Consistency</h3>
        <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center">
          <Flame className="w-5 h-5 text-emerald-400" />
        </div>
      </div>

      {/* Main metric */}
      <div className="mb-6 pb-6 border-b border-zinc-800">
        <p className="text-xs uppercase tracking-wide text-zinc-500 font-semibold mb-2">
          This month
        </p>
        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-3xl font-semibold text-zinc-50">{completionPercent}%</span>
          <span className="text-sm text-zinc-400">of planned workouts</span>
        </div>

        {/* Progress bar */}
        <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400"
            style={{ width: `${completionPercent}%` }}
          ></div>
        </div>
      </div>

      {/* Streak info */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-wide text-zinc-500 font-semibold mb-1">
              Current streak
            </p>
            <p className="text-lg font-semibold text-zinc-50">
              {currentStreak}<span className="text-sm text-zinc-400 font-normal"> days</span>
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs uppercase tracking-wide text-zinc-500 font-semibold mb-1">
              Best streak
            </p>
            <p className="text-lg font-semibold text-zinc-50">
              {bestStreak}<span className="text-sm text-zinc-400 font-normal"> days</span>
            </p>
          </div>
        </div>

        {/* Motivational text */}
        <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-2.5 text-xs text-emerald-200">
          Keep grinding! Just {bestStreak - currentStreak} more days to match your best.
        </div>
      </div>
    </div>
  );
}
