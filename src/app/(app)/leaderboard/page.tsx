import { cookies } from "next/headers";
import { supabaseServer } from "@/lib/supabaseClient";
import { Trophy, Medal, Zap } from "lucide-react";

export const dynamic = "force-dynamic";

interface LeaderboardEntry {
  user_id: string;
  user_name: string;
  total_workouts: number;
  rank: number;
}

async function getLeaderboardData(): Promise<{
  entries: LeaderboardEntry[];
  error: string | null;
}> {
  try {
    const cookieStore = await cookies();
    const supabase = supabaseServer({
      get: (name) => {
        const val = cookieStore.get(name);
        return val ? { value: val.value } : undefined;
      },
      set: (name, value, options) => {
        // Read-only in Server Components - no-op
      },
      remove: (name, options) => {
        // Read-only in Server Components - no-op
      },
    });

    // Get current user
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();
    if (authError || !user) {
      return { entries: [], error: "Unable to fetch leaderboard data" };
    }

    // Calculate date from 7 days ago
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const sevenDaysAgoISO = sevenDaysAgo.toISOString();

    // Query workout_logs for the last 7 days, grouped by user
    const { data: workoutLogs, error: logsError } = await supabase
      .from("workout_logs")
      .select("user_id")
      .gte("created_at", sevenDaysAgoISO)
      .order("created_at", { ascending: false });

    if (logsError) {
      return { entries: [], error: "Failed to fetch workout logs" };
    }

    // Get all user profiles
    const { data: profiles, error: profilesError } = await supabase
      .from("profiles")
      .select("id, full_name")
      .order("id");

    if (profilesError || !profiles) {
      return { entries: [], error: "Failed to fetch user profiles" };
    }

    // Create a map of user_id to full_name
    const userMap = new Map(profiles.map((p: any) => [p.id, p.full_name]));

    // Count workouts per user
    const workoutsByUser = new Map<string, number>();
    for (const log of workoutLogs) {
      const count = workoutsByUser.get(log.user_id) || 0;
      workoutsByUser.set(log.user_id, count + 1);
    }

    // Create leaderboard entries with rankings
    const entries: LeaderboardEntry[] = Array.from(workoutsByUser.entries())
      .map(([userId, count], index) => ({
        user_id: userId,
        user_name: userMap.get(userId) || "Unknown User",
        total_workouts: count,
        rank: index + 1,
      }))
      .sort((a, b) => b.total_workouts - a.total_workouts)
      .map((entry, index) => ({
        ...entry,
        rank: index + 1,
      }));

    return { entries, error: null };
  } catch (err) {
    console.error("Leaderboard error:", err);
    return {
      entries: [],
      error: "An error occurred while fetching leaderboard",
    };
  }
}

export default async function LeaderboardPage() {
  const { entries, error } = await getLeaderboardData();

  const getMedalIcon = (rank: number) => {
    if (rank === 1) return <Trophy className="w-5 h-5 text-amber-400" />;
    if (rank === 2) return <Medal className="w-5 h-5 text-slate-400" />;
    if (rank === 3) return <Medal className="w-5 h-5 text-orange-600" />;
    return null;
  };

  const getRankBadgeClass = (rank: number) => {
    if (rank === 1)
      return "bg-gradient-to-r from-amber-500 to-amber-600 text-black";
    if (rank === 2)
      return "bg-gradient-to-r from-slate-400 to-slate-500 text-black";
    if (rank === 3)
      return "bg-gradient-to-r from-orange-500 to-orange-600 text-white";
    return "bg-zinc-700/50 text-zinc-300 border border-zinc-600";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#050816] via-zinc-900 to-[#0b1220] px-4 py-12">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center justify-center gap-3 mb-4">
            <Trophy className="w-8 h-8 text-amber-400" />
            <h1 className="text-5xl font-black text-white">Leaderboard</h1>
            <Trophy className="w-8 h-8 text-amber-400" />
          </div>
          <p className="text-zinc-400 text-lg">
            Most workouts completed in the last 7 days
          </p>
        </div>

        {/* Error State */}
        {error && (
          <div className="mb-6 rounded-2xl border border-red-500/30 bg-red-500/10 px-6 py-4">
            <p className="text-red-200">{error}</p>
          </div>
        )}

        {/* Leaderboard */}
        {entries.length > 0 ? (
          <div className="space-y-3">
            {entries.map((entry) => (
              <div
                key={entry.user_id}
                className={`group rounded-2xl p-6 border transition-all duration-300 ${
                  entry.rank <= 3
                    ? "bg-gradient-to-r from-white/10 to-transparent border-white/20 shadow-lg shadow-white/10 hover:shadow-white/20"
                    : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20"
                }`}
              >
                <div className="flex items-center justify-between">
                  {/* Rank */}
                  <div className="flex items-center gap-4 flex-1">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg ${getRankBadgeClass(
                        entry.rank,
                      )}`}
                    >
                      {entry.rank <= 3 ? (
                        getMedalIcon(entry.rank)
                      ) : (
                        <span>#{entry.rank}</span>
                      )}
                    </div>

                    {/* User Name */}
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white">
                        {entry.user_name}
                      </h3>
                      <p className="text-sm text-zinc-400">
                        {entry.rank <= 3 ? "Top Performer" : "Athlete"}
                      </p>
                    </div>
                  </div>

                  {/* Workout Count */}
                  <div className="text-right">
                    <div className="flex items-center justify-end gap-2 mb-2">
                      <Zap className="w-5 h-5 text-emerald-400" />
                      <p className="text-3xl font-black text-emerald-400">
                        {entry.total_workouts}
                      </p>
                    </div>
                    <p className="text-xs text-zinc-500 font-medium uppercase tracking-wide">
                      Workouts
                    </p>
                  </div>
                </div>

                {/* Rank Badge */}
                {entry.rank <= 3 && (
                  <div className="mt-4 pt-4 border-t border-white/10">
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      🏆 Rank #{entry.rank}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-12 text-center">
            <p className="text-zinc-400 text-lg">
              No workout data available yet.
            </p>
            <p className="text-zinc-500 text-sm mt-2">
              Start logging workouts to appear on the leaderboard!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
