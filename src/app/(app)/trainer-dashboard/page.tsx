import { supabaseServer } from "@/lib/supabaseClient";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import TrainerDashboardLayout from "@/components/sections/layout/TrainerDashboardLayout";
import CoachDashboard from "@/components/sections/dashboard/CoachDashboard";

export const dynamic = "force-dynamic";

type AthleteRow = {
  user_id: string;
  email: string;
  full_name: string | null;
  age: number | null;
  player_archetype?: string | null;
  sessions_this_week: number;
  sessions_30d: number;
  last_workout_date: string | null;
  completion_percentage?: number;
  playstyle_team_vs_iso?: number | null;
  playstyle_shooter_vs_slasher?: number | null;
  playstyle_finesse_vs_power?: number | null;
};

type SimpleWorkout = {
  id: string;
  title: string;
};

type Assignment = {
  id: string;
  athlete_id: string;
  workout_id: string;
};

type ActivityItem = {
  id: string;
  created_at: string;
  profiles: { full_name: string | null } | null;
  workouts: { title: string | null } | null;
};

async function getCoachData(): Promise<{
  coachName: string;
  athletes: AthleteRow[];
  workouts: SimpleWorkout[];
  assignments: Assignment[];
  avgCompletion: number;
  activeAthletesCount: number;
  totalSessions7d: number;
  recentActivity: ActivityItem[];
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
    if (!user) {
      return {
        coachName: "Coach",
        athletes: [],
        workouts: [],
        assignments: [],
        avgCompletion: 0,
        activeAthletesCount: 0,
        totalSessions7d: 0,
        recentActivity: [],
        error: "Not authenticated",
      };
    }

    const { data: coachProfile } = await supabase
      .from("profiles")
      .select("full_name, role")
      .eq("user_id", user.id)
      .maybeSingle();

    if (coachProfile?.role !== "coach") {
      return {
        coachName: "Coach",
        athletes: [],
        workouts: [],
        assignments: [],
        avgCompletion: 0,
        activeAthletesCount: 0,
        totalSessions7d: 0,
        recentActivity: [],
        error: "coach_only",
      };
    }

    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const [athletesRes, logs7dRes, logs30dRes, workoutsRes, assignmentsRes, activityRes] =
      await Promise.all([
        supabase
          .from("profiles")
          .select("user_id, email, full_name, age, player_archetype, playstyle_team_vs_iso, playstyle_shooter_vs_slasher, playstyle_finesse_vs_power")
          .eq("role", "athlete"),
        supabase
          .from("workout_logs")
          .select("user_id, created_at")
          .gte("created_at", sevenDaysAgo.toISOString()),
        supabase
          .from("workout_logs")
          .select("user_id, created_at")
          .gte("created_at", thirtyDaysAgo.toISOString()),
        supabase.from("workouts").select("id, title").eq("is_active", true),
        supabase
          .from("workout_assignments")
          .select("id, athlete_id, workout_id"),
        supabase
          .from("workout_logs")
          .select("id, created_at, profiles(full_name), workouts(title)")
          .order("created_at", { ascending: false })
          .limit(6),
      ]);

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

    const lastWorkout = (logs7dRes.data ?? []).reduce<Record<string, string>>(
      (acc, l) => {
        if (!acc[l.user_id] || l.created_at > acc[l.user_id])
          acc[l.user_id] = l.created_at;
        return acc;
      },
      {},
    );

    const athletes: AthleteRow[] = (athletesRes.data ?? []).map((a) => {
      const athleteLogs = (logs30dRes.data ?? []).filter((l) => l.user_id === a.user_id);
      const totalLogs = athleteLogs.length;
      const expectedWorkouts = workoutsRes.data?.length ?? 1;
      // Calculate completion based on logs relative to expected workouts over 30 days
      const completionPercent = Math.min(
        Math.round((totalLogs / (expectedWorkouts * 4)) * 100),
        100
      );

      return {
        user_id: a.user_id,
        email: a.email,
        full_name: a.full_name,
        age: a.age,
        player_archetype: a.player_archetype,
        sessions_this_week: count7d[a.user_id] ?? 0,
        sessions_30d: count30d[a.user_id] ?? 0,
        last_workout_date: lastWorkout[a.user_id] ?? null,
        completion_percentage: completionPercent,
        playstyle_team_vs_iso: a.playstyle_team_vs_iso,
        playstyle_shooter_vs_slasher: a.playstyle_shooter_vs_slasher,
        playstyle_finesse_vs_power: a.playstyle_finesse_vs_power,
      };
    });

    const totalSessions7d = (logs7dRes.data ?? []).length;
    const activeAthletesCount = athletes.filter((a) => a.sessions_this_week > 0).length;

    const avgCompletion =
      athletes.length > 0
        ? athletes.reduce((sum, a) => sum + (a.completion_percentage ?? 0), 0) / athletes.length
        : 0;

    return {
      coachName: coachProfile?.full_name?.split(" ")[0] ?? "Coach",
      athletes,
      workouts: workoutsRes.data ?? [],
      assignments: assignmentsRes.data ?? [],
      avgCompletion,
      activeAthletesCount,
      totalSessions7d,
      recentActivity: (activityRes.data as unknown as ActivityItem[]) ?? [],
      error: null,
    };
  } catch (err) {
    return {
      coachName: "Coach",
      athletes: [],
      workouts: [],
      assignments: [],
      avgCompletion: 0,
      activeAthletesCount: 0,
      totalSessions7d: 0,
      recentActivity: [],
      error: String(err),
    };
  }
}

export default async function TrainerDashboardPage() {
  const {
    coachName,
    athletes,
    workouts,
    assignments,
    avgCompletion,
    activeAthletesCount,
    totalSessions7d,
    recentActivity,
    error,
  } = await getCoachData();

  if (error === "coach_only") redirect("/dashboard");

  return (
    <TrainerDashboardLayout coachName={coachName}>
      <div className="max-w-7xl mx-auto px-4 py-6 lg:py-8 space-y-8">
        <h1 className="sr-only">Trainer Dashboard</h1>

        {error && (
          <div className="rounded-2xl border border-red-500/30 bg-red-500/10 px-6 py-4 text-red-200">
            <p className="font-medium">{error}</p>
          </div>
        )}

        <CoachDashboard
          athletes={athletes}
          workouts={workouts}
          avgCompletion={avgCompletion}
          activeAthletesCount={activeAthletesCount}
          totalSessions={totalSessions7d}
          coachName={coachName}
          recentActivity={recentActivity}
        />
      </div>
    </TrainerDashboardLayout>
  );
}
