import { TrendingUp, TrendingDown, Users, Target, Zap } from "lucide-react";
import type { AthleteProfile } from "@/types";

interface CoachDashboardProps {
  athletes: AthleteProfile[];
  avgCompletion: number;
  activeAthletesCount: number;
  totalSessions: number;
  coachName?: string;
}

export default function CoachDashboard({
  athletes,
  avgCompletion,
  activeAthletesCount,
  totalSessions,
  coachName = "Coach",
}: CoachDashboardProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-6 lg:py-8 space-y-8">
      {/* Header with role badge */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-zinc-50">
            Welcome back, {coachName}! 👋
          </h1>
          <p className="text-sm text-zinc-400 mt-2">Monitor athlete progress, track engagement, manage your program</p>
        </div>
        <div className="px-4 py-2 rounded-full bg-blue-500/20 border border-blue-500/40 flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-blue-400"></div>
          <span className="text-sm font-semibold text-blue-300">Coach</span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Active Athletes */}
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-5 sm:p-6 shadow-lg shadow-black/40 backdrop-blur-sm hover:border-zinc-700 transition-colors">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-wide text-zinc-500 font-semibold">
                Active Athletes
              </p>
              <p className="text-4xl font-bold text-emerald-400">
                {activeAthletesCount}
              </p>
              <p className="text-xs text-zinc-400 mt-3">
                Athletes training this month
              </p>
            </div>
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
              <Users className="w-6 h-6 text-emerald-400" />
            </div>
          </div>
        </div>

        {/* Average Completion */}
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-5 sm:p-6 shadow-lg shadow-black/40 backdrop-blur-sm hover:border-zinc-700 transition-colors">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-wide text-zinc-500 font-semibold">
                Avg Completion
              </p>
              <p className="text-4xl font-bold text-blue-400">
                {Math.round(avgCompletion)}%
              </p>
              <p className="text-xs text-zinc-400 mt-3">
                Across all athletes
              </p>
            </div>
            <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20">
              <Target className="w-6 h-6 text-blue-400" />
            </div>
          </div>
        </div>

        {/* Total Sessions */}
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-5 sm:p-6 shadow-lg shadow-black/40 backdrop-blur-sm hover:border-zinc-700 transition-colors">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-wide text-zinc-500 font-semibold">
                Sessions This Month
              </p>
              <p className="text-4xl font-bold text-purple-400">
                {totalSessions}
              </p>
              <p className="text-xs text-zinc-400 mt-3">
                Combined workouts completed
              </p>
            </div>
            <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20">
              <Zap className="w-6 h-6 text-purple-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Athletes Table */}
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 shadow-lg shadow-black/40 backdrop-blur-sm overflow-hidden">
        <div className="p-5 sm:p-6 border-b border-zinc-800">
          <h2 className="text-lg font-semibold text-zinc-50">Your Athletes</h2>
          <p className="text-sm text-zinc-400 mt-1">
            Track progress and engagement across your roster
          </p>
        </div>

        {athletes && athletes.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-zinc-800 bg-zinc-950/40">
                  <th className="px-5 sm:px-6 py-3 text-left font-semibold text-zinc-300">
                    Athlete
                  </th>
                  <th className="px-5 sm:px-6 py-3 text-left font-semibold text-zinc-300">
                    Email
                  </th>
                  <th className="px-5 sm:px-6 py-3 text-center font-semibold text-zinc-300">
                    Age
                  </th>
                  <th className="px-5 sm:px-6 py-3 text-center font-semibold text-zinc-300">
                    This Week
                  </th>
                  <th className="px-5 sm:px-6 py-3 text-center font-semibold text-zinc-300">
                    Completion
                  </th>
                  <th className="px-5 sm:px-6 py-3 text-right font-semibold text-zinc-300">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {athletes.map((athlete) => {
                  const completion = athlete.completion_percentage || 0;
                  const sessionsThisWeek = athlete.sessions_this_week || 0;
                  const isActive = sessionsThisWeek > 0;

                  return (
                    <tr
                      key={athlete.user_id}
                      className="border-b border-zinc-800 hover:bg-zinc-800/50 transition-colors"
                    >
                      <td className="px-5 sm:px-6 py-4">
                        <div>
                          <p className="font-medium text-zinc-100">
                            {athlete.full_name}
                          </p>
                          <p className="text-xs text-zinc-400 mt-0.5">
                            ID: {athlete.user_id.slice(0, 8)}
                          </p>
                        </div>
                      </td>
                      <td className="px-5 sm:px-6 py-4 text-zinc-300">
                        {athlete.email}
                      </td>
                      <td className="px-5 sm:px-6 py-4 text-center text-zinc-300">
                        {athlete.age ? `${athlete.age} yo` : "—"}
                      </td>
                      <td className="px-5 sm:px-6 py-4 text-center">
                        <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-300 text-xs font-semibold">
                          {sessionsThisWeek}
                        </span>
                      </td>
                      <td className="px-5 sm:px-6 py-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <span className="font-semibold text-zinc-100">
                            {Math.round(completion)}%
                          </span>
                          {completion >= 80 ? (
                            <TrendingUp className="w-4 h-4 text-emerald-400" />
                          ) : completion >= 50 ? (
                            <TrendingDown className="w-4 h-4 text-yellow-400" />
                          ) : (
                            <TrendingDown className="w-4 h-4 text-red-400" />
                          )}
                        </div>
                      </td>
                      <td className="px-5 sm:px-6 py-4 text-right">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold inline-block ${
                            isActive
                              ? "bg-emerald-500/10 text-emerald-300"
                              : "bg-zinc-800 text-zinc-400"
                          }`}
                        >
                          {isActive ? "Active" : "Inactive"}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="px-5 sm:px-6 py-12 text-center">
            <p className="text-zinc-400">No athletes yet</p>
            <p className="text-xs text-zinc-500 mt-1">
              Athletes will appear here once they sign up
            </p>
          </div>
        )}
      </div>

      {/* Insights Section */}
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-6 shadow-lg shadow-black/40 backdrop-blur-sm">
        <h3 className="text-lg font-semibold text-zinc-50 mb-4">Coaching Insights</h3>
        <div className="space-y-3">
          {activeAthletesCount === 0 && (
            <div className="flex items-start gap-3 p-4 rounded-lg bg-blue-950/30 border border-blue-900/50">
              <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-blue-300">
                  Ready to onboard athletes
                </p>
                <p className="text-xs text-blue-200/70 mt-1">
                  Share your signup link to start building your roster
                </p>
              </div>
            </div>
          )}

          {activeAthletesCount > 0 && avgCompletion < 60 && (
            <div className="flex items-start gap-3 p-4 rounded-lg bg-yellow-950/30 border border-yellow-900/50">
              <div className="w-2 h-2 rounded-full bg-yellow-400 mt-2 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-yellow-300">
                  Completion is below target
                </p>
                <p className="text-xs text-yellow-200/70 mt-1">
                  Consider reaching out to athletes with engagement tips
                </p>
              </div>
            </div>
          )}

          {activeAthletesCount > 0 && avgCompletion >= 80 && (
            <div className="flex items-start gap-3 p-4 rounded-lg bg-emerald-950/30 border border-emerald-900/50">
              <div className="w-2 h-2 rounded-full bg-emerald-400 mt-2 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-emerald-300">
                  Your athletes are crushing it!
                </p>
                <p className="text-xs text-emerald-200/70 mt-1">
                  High engagement rate—keep the momentum going
                </p>
              </div>
            </div>
          )}

          <div className="flex items-start gap-3 p-4 rounded-lg bg-zinc-950/50 border border-zinc-800">
            <div className="w-2 h-2 rounded-full bg-purple-400 mt-2 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-zinc-200">Pro tip</p>
              <p className="text-xs text-zinc-400 mt-1">
                Sync workouts to athlete goals for better program adherence
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
