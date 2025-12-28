import { Flame, TrendingUp, Target } from "lucide-react";

interface DashboardHeaderProps {
  firstName: string;
}

export default function DashboardHeader({ firstName }: DashboardHeaderProps) {
  return (
    <div className="space-y-6">
      {/* Welcome section */}
      <div className="space-y-2">
        <h2 className="text-2xl sm:text-3xl font-semibold text-zinc-50 tracking-tight">
          Welcome back, {firstName}
        </h2>
        <p className="text-sm sm:text-base text-zinc-400 max-w-2xl">
          Here's your basketball training at a glance – today's session, your streak, and what's coming next.
        </p>
      </div>

      {/* Quick stats row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Sessions completed */}
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4 backdrop-blur-sm hover:border-zinc-700 transition">
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <p className="text-xs uppercase tracking-wide text-zinc-500 font-semibold mb-1">
                This week
              </p>
              <p className="text-xl sm:text-2xl font-semibold text-zinc-50">
                3<span className="text-sm text-zinc-400 font-normal">/4</span>
              </p>
              <p className="text-xs text-zinc-400 mt-1">sessions completed</p>
            </div>
            <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-emerald-400" />
            </div>
          </div>
        </div>

        {/* Current streak */}
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4 backdrop-blur-sm hover:border-zinc-700 transition">
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <p className="text-xs uppercase tracking-wide text-zinc-500 font-semibold mb-1">
                Current streak
              </p>
              <p className="text-xl sm:text-2xl font-semibold text-zinc-50">
                5<span className="text-sm text-zinc-400 font-normal"> days</span>
              </p>
              <p className="text-xs text-zinc-400 mt-1">keep it alive!</p>
            </div>
            <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-orange-500/20 border border-orange-500/40 flex items-center justify-center">
              <Flame className="w-5 h-5 text-orange-400" />
            </div>
          </div>
        </div>

        {/* Vertical goal */}
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4 backdrop-blur-sm hover:border-zinc-700 transition">
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <p className="text-xs uppercase tracking-wide text-zinc-500 font-semibold mb-1">
                Vertical goal
              </p>
              <p className="text-xl sm:text-2xl font-semibold text-zinc-50">
                +3<span className="text-sm text-zinc-400 font-normal">"</span>
              </p>
              <p className="text-xs text-zinc-400 mt-1">in 10 weeks</p>
            </div>
            <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center">
              <Target className="w-5 h-5 text-emerald-400" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
