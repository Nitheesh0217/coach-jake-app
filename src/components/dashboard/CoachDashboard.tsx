import { TrendingUp, TrendingDown, Users, Target, Zap, AlertCircle } from "lucide-react";
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
      <div>
        <h1 className="text-5xl sm:text-6xl font-black tracking-tight bg-gradient-to-br from-white via-white to-zinc-400 bg-clip-text text-transparent mb-2">
          Welcome back, {coachName}
        </h1>
        <p className="text-zinc-400 text-base">
          Monitor athlete progress, track engagement, and optimize your coaching program
        </p>
      </div>

      {/* KPI CARDS - Premium Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Active Athletes */}
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-4 sm:p-6 shadow-lg shadow-black/40 backdrop-blur-sm hover:border-zinc-700 transition-all duration-300">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <p className="text-xs uppercase tracking-wide text-zinc-500 font-semibold mb-1">
                Active Athletes
              </p>
              <p className="text-3xl sm:text-4xl font-bold text-emerald-400">
                {activeAthletesCount}
              </p>
            </div>
            <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
              <Users className="w-5 h-5 text-emerald-400" />
            </div>
          </div>
          <div className="border-t border-zinc-800 pt-3">
            <p className="text-xs text-zinc-400">Training this month</p>
          </div>
        </div>

        {/* Average Completion */}
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-4 sm:p-6 shadow-lg shadow-black/40 backdrop-blur-sm hover:border-zinc-700 transition-all duration-300">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <p className="text-xs uppercase tracking-wide text-zinc-500 font-semibold mb-1">
                Avg Completion
              </p>
              <p className="text-3xl sm:text-4xl font-bold text-sky-400">
                {Math.round(avgCompletion)}%
              </p>
            </div>
            <div className="p-2.5 rounded-xl bg-sky-500/10 border border-sky-500/20">
              <Target className="w-5 h-5 text-sky-400" />
            </div>
          </div>
          <div className="border-t border-zinc-800 pt-3">
            <p className="text-xs text-zinc-400">Across all athletes</p>
          </div>
        </div>

        {/* Total Sessions */}
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-4 sm:p-6 shadow-lg shadow-black/40 backdrop-blur-sm hover:border-zinc-700 transition-all duration-300 col-span-2 lg:col-span-1">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <p className="text-xs uppercase tracking-wide text-zinc-500 font-semibold mb-1">
                Sessions This Month
              </p>
              <p className="text-3xl sm:text-4xl font-bold text-violet-400">
                {totalSessions}
              </p>
            </div>
            <div className="p-2.5 rounded-xl bg-violet-500/10 border border-violet-500/20">
              <Zap className="w-5 h-5 text-violet-400" />
            </div>
          </div>
          <div className="border-t border-zinc-800 pt-3">
            <p className="text-xs text-zinc-400">Combined workouts</p>
          </div>
        </div>
      </div>

      {/* ATHLETES ROSTER - Card Grid */}
      {athletes && athletes.length > 0 ? (
        <div>
          <h2 className="text-2xl font-bold text-zinc-100 mb-4">Your Athletes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {athletes.map((athlete) => {
              const completion = athlete.completion_percentage || 0;
              const sessionsThisWeek = athlete.sessions_this_week || 0;
              const initials = athlete.full_name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()
                .slice(0, 2);

              let completionColor = "zinc";
              let completionBg = "bg-zinc-900/40";
              if (completion >= 80) {
                completionColor = "emerald";
                completionBg = "bg-emerald-500/10";
              } else if (completion >= 40) {
                completionColor = "amber";
                completionBg = "bg-amber-500/10";
              }

              return (
                <div
                  key={athlete.user_id}
                  className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-5 shadow-lg shadow-black/40 backdrop-blur-sm hover:border-zinc-700 transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3 flex-1">
                      <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-semibold text-emerald-400">
                          {initials}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-white capitalize truncate">
                          {athlete.full_name}
                        </p>
                        <p className="text-xs text-zinc-400">
                          Athlete
                        </p>
                      </div>
                    </div>
                    <button className="px-3 py-1.5 rounded-full text-xs font-medium bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/20 transition-colors flex-shrink-0">
                      Assign
                    </button>
                  </div>

                  <div className="space-y-3 border-t border-zinc-800 pt-3">
                    {/* Completion Badge */}
                    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium ${completionBg} border border-${completionColor}-500/30`}>
                      <span className={`text-${completionColor}-300`}>
                        {Math.round(completion)}%
                      </span>
                      {completion >= 80 ? (
                        <TrendingUp className="w-3 h-3 text-emerald-400" />
                      ) : completion >= 40 ? (
                        <TrendingDown className="w-3 h-3 text-amber-400" />
                      ) : (
                        <TrendingDown className="w-3 h-3 text-zinc-400" />
                      )}
                    </div>

                    {/* Sessions This Week */}
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-zinc-400">Sessions this week</span>
                      <span className="font-semibold text-white">{sessionsThisWeek}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-12 text-center shadow-lg shadow-black/40 backdrop-blur-sm">
          <p className="text-zinc-400">No athletes yet</p>
          <p className="text-xs text-zinc-500 mt-1">
            Athletes will appear here once they sign up
          </p>
        </div>
      )}

      {/* COACHING INSIGHTS - 3 Alert Cards with Accent Borders */}
      <div>
        <h2 className="text-2xl font-bold text-zinc-100 mb-4">Coaching Insights</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Alert 1 - Onboarding */}
          <div className="rounded-2xl border-l-4 border-l-sky-400 border border-l-4 border-zinc-800 bg-zinc-900/80 p-5 shadow-lg shadow-black/40 backdrop-blur-sm">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-sky-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold text-sky-300 text-sm">
                  {activeAthletesCount === 0
                    ? "Ready to onboard athletes"
                    : "Program optimization"}
                </p>
                <p className="text-xs text-zinc-400 mt-1.5">
                  {activeAthletesCount === 0
                    ? "Share your signup link to start building your roster"
                    : "Review athlete archetypes to tailor workouts"}
                </p>
              </div>
            </div>
          </div>

          {/* Alert 2 - Completion Status */}
          <div
            className={`rounded-2xl border-l-4 ${
              avgCompletion < 60
                ? "border-l-amber-400 border border-l-4 border-zinc-800 bg-zinc-900/80"
                : "border-l-emerald-400 border border-l-4 border-zinc-800 bg-zinc-900/80"
            } p-5 shadow-lg shadow-black/40 backdrop-blur-sm`}
          >
            <div className="flex items-start gap-3">
              {avgCompletion < 60 ? (
                <AlertCircle className="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0" />
              ) : (
                <Zap className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
              )}
              <div>
                <p
                  className={`font-semibold text-sm ${
                    avgCompletion < 60
                      ? "text-amber-300"
                      : "text-emerald-300"
                  }`}
                >
                  {avgCompletion < 60
                    ? "Completion below target"
                    : "Great engagement!"}
                </p>
                <p className="text-xs text-zinc-400 mt-1.5">
                  {avgCompletion < 60
                    ? "Reach out to athletes with personalized check-ins"
                    : "Athletes are staying consistent — maintain momentum"}
                </p>
              </div>
            </div>
          </div>

          {/* Alert 3 - Pro Tip */}
          <div className="rounded-2xl border-l-4 border-l-violet-400 border border-l-4 border-zinc-800 bg-zinc-900/80 p-5 shadow-lg shadow-black/40 backdrop-blur-sm">
            <div className="flex items-start gap-3">
              <Target className="w-5 h-5 text-violet-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold text-violet-300 text-sm">Pro tip</p>
                <p className="text-xs text-zinc-400 mt-1.5">
                  Align workouts with athlete goals for better program adherence
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
