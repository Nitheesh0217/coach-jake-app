import { supabaseServer } from "@/lib/supabaseClient";
import { cookies } from "next/headers";
import TrainerDashboardLayout from "@/components/sections/layout/TrainerDashboardLayout";
import LeaderboardClient from "@/components/sections/leaderboard/LeaderboardClient";

export const dynamic = "force-dynamic";

type LeaderboardEntry = {
  user_id: string;
  full_name: string;
  archetype?: string;
  sessions_7d: number;
  sessions_30d: number;
  sessions_all_time: number;
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

    // Fetch profiles with archetype and all log data (limit to 100 for pagination support)
    const [profileRes, logs7dRes, logs30dRes, logsAllTimeRes] =
      await Promise.all([
        supabase
          .from("profiles")
          .select("user_id,full_name,player_archetype")
          .eq("role", "athlete")
          .limit(100),
        supabase
          .from("workout_logs")
          .select("user_id")
          .gte("created_at", sevenDaysAgo.toISOString()),
        supabase
          .from("workout_logs")
          .select("user_id")
          .gte("created_at", thirtyDaysAgo.toISOString()),
        supabase.from("workout_logs").select("user_id"),
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
    const countAllTime = (logsAllTimeRes.data ?? []).reduce<
      Record<string, number>
    >((acc, l) => {
      acc[l.user_id] = (acc[l.user_id] ?? 0) + 1;
      return acc;
    }, {});

    const entries: LeaderboardEntry[] = (profileRes.data ?? [])
      .map((p: any) => ({
        user_id: p.user_id,
        full_name: p.full_name ?? "Anonymous",
        archetype: p.player_archetype ?? undefined,
        sessions_7d: count7d[p.user_id] ?? 0,
        sessions_30d: count30d[p.user_id] ?? 0,
        sessions_all_time: countAllTime[p.user_id] ?? 0,
        rank: 0,
      }))
      .sort(
        (a, b) =>
          b.sessions_7d - a.sessions_7d ||
          b.sessions_30d - a.sessions_30d ||
          b.sessions_all_time - a.sessions_all_time,
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
