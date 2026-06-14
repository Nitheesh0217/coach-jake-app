import { supabaseServer } from "@/lib/supabaseClient";
import { cookies } from "next/headers";
import TrainerDashboardLayout from "@/components/layout/TrainerDashboardLayout";

export const dynamic = "force-dynamic";

type LeaderboardEntry = {
  user_id: string;
  full_name: string;
  sessions_7d: number;
  sessions_30d: number;
  rank: number;
};

async function getLeaderboard(): Promise<{
  entries: LeaderboardEntry[];
  currentUserId: string | null;
  userName: string;
  error: string | null;
}> {
  try {
    const cookieStore = await cookies();
    const supabase = supabaseServer({
      get: (name) => {
        const val = cookieStore.get(name);
        return val ? { value: val.value } : undefined;
      },
      set: () => {},
      remove: () => {},
    });

    const { data: auth } = await supabase.auth.getUser();
    const user = auth.user;
    if (!user)
      return {
        entries: [],
        currentUserId: null,
        userName: "Athlete",
        error: "Not authenticated",
      };

    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const [profileRes, logs7dRes, logs30dRes] = await Promise.all([
      supabase
        .from("profiles")
        .select("user_id,full_name")
        .eq("role", "athlete"),
      supabase
        .from("workout_logs")
        .select("user_id")
        .gte("created_at", sevenDaysAgo.toISOString()),
      supabase
        .from("workout_logs")
        .select("user_id")
        .gte("created_at", thirtyDaysAgo.toISOString()),
    ]);

    const currentProfile = (profileRes.data ?? []).find(
      (p) => p.user_id === user.id,
    );

    const count7d = (logs7dRes.data ?? []).reduce<Record<string, number>>(
      (acc, l) => {
        acc[l.user_id] = (acc[l.user_id] ?? 0) + 1;
        return acc;
      },
      {},
    );
    const count30d = (logs30dRes.data ?? []).reduce<Record<string, number>>(
      (acc, l) => {
        acc[l.user_id] = (acc[l.user_id] ?? 0) + 1;
        return acc;
      },
      {},
    );

    const entries: LeaderboardEntry[] = (profileRes.data ?? [])
      .map((p) => ({
        user_id: p.user_id,
        full_name: p.full_name ?? "Anonymous",
        sessions_7d: count7d[p.user_id] ?? 0,
        sessions_30d: count30d[p.user_id] ?? 0,
        rank: 0,
      }))
      .sort(
        (a, b) =>
          b.sessions_7d - a.sessions_7d || b.sessions_30d - a.sessions_30d,
      )
      .map((e, i) => ({ ...e, rank: i + 1 }));

    return {
      entries,
      currentUserId: user.id,
      userName: currentProfile?.full_name?.split(" ")[0] ?? "Athlete",
      error: null,
    };
  } catch (err) {
    return {
      entries: [],
      currentUserId: null,
      userName: "Athlete",
      error: String(err),
    };
  }
}

export default async function LeaderboardPage() {
  const { entries, currentUserId, userName, error } = await getLeaderboard();

  return (
    <TrainerDashboardLayout coachName={userName}>
      <div className="max-w-4xl mx-auto px-4 py-6 lg:py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-zinc-50 mb-2">
            🏆 Leaderboard
          </h2>
          <p className="text-base text-zinc-400">
            Top athletes ranked by sessions completed this week.
          </p>
        </div>

        {error && (
          <div className="mb-6 rounded-2xl border border-red-500/30 bg-red-500/10 px-6 py-4 text-red-200">
            <p className="font-medium">{error}</p>
          </div>
        )}

        {entries.length === 0 ? (
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-12 text-center">
            <p className="text-zinc-400">
              No athletes ranked yet. Complete workouts to appear here.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {entries.map((entry) => {
              const isMe = entry.user_id === currentUserId;
              const medals: Record<number, string> = {
                1: "🥇",
                2: "🥈",
                3: "🥉",
              };
              return (
                <div
                  key={entry.user_id}
                  className={`rounded-2xl border p-5 flex items-center justify-between transition ${
                    isMe
                      ? "border-emerald-500/50 bg-emerald-500/10 shadow-lg shadow-emerald-500/10"
                      : "border-zinc-800 bg-zinc-900/80"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span className="text-2xl w-8 text-center">
                      {medals[entry.rank] ?? (
                        <span className="text-zinc-500 text-lg font-bold">
                          #{entry.rank}
                        </span>
                      )}
                    </span>
                    {!medals[entry.rank] && (
                      <span className="text-zinc-500 text-lg font-bold w-8 text-center">
                        #{entry.rank}
                      </span>
                    )}
                    <div>
                      <p
                        className={`font-semibold ${isMe ? "text-emerald-300" : "text-zinc-100"}`}
                      >
                        {entry.full_name}{" "}
                        {isMe && (
                          <span className="text-xs font-normal text-emerald-400 ml-1">
                            (You)
                          </span>
                        )}
                      </p>
                      <p className="text-xs text-zinc-500 mt-0.5">
                        {entry.sessions_30d} sessions last 30 days
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-emerald-400">
                      {entry.sessions_7d}
                    </p>
                    <p className="text-xs text-zinc-500">this week</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </TrainerDashboardLayout>
  );
}
