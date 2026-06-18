import { supabaseServer } from "@/lib/supabaseClient";
import { cookies } from "next/headers";
import { Trophy } from "lucide-react";
import TrainerDashboardLayout from "@/components/sections/layout/TrainerDashboardLayout";
import LeaderboardClient from "@/components/sections/leaderboard/LeaderboardClient";

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

    const computedUserName =
      currentProfile?.full_name?.split(" ")[0] ?? "Athlete";
    return {
      entries,
      currentUserId: user.id,
      userName: computedUserName,
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
        {/* PAGE HEADER - Premium Typography */}
        <div className="mb-8 border-b border-zinc-800 pb-8">
          <h1 className="text-5xl sm:text-6xl font-black tracking-tight bg-gradient-to-br from-white via-white to-zinc-400 bg-clip-text text-transparent mb-2 flex items-center gap-3">
            <Trophy className="w-12 h-12 text-amber-400 flex-shrink-0" />
            Leaderboard
          </h1>
          <p className="text-zinc-400 text-base">
            Top athletes ranked by sessions completed this week.
          </p>
        </div>

        {error && (
          <div className="mb-6 rounded-2xl border border-red-500/30 bg-red-500/10 px-6 py-4 text-red-200">
            <p className="font-medium">{error}</p>
          </div>
        )}

        <LeaderboardClient entries={entries} currentUserId={currentUserId} />
      </div>
    </TrainerDashboardLayout>
  );
}
