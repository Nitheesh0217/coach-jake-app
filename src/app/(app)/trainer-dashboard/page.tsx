import { supabaseServer } from "@/lib/supabaseClient";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import TrainerDashboardLayout from "@/components/layout/TrainerDashboardLayout";
import KPICards from "@/components/trainer/KPICards";
import AthletesPanel from "@/components/trainer/AthletesPanel";
import CalendarPanel from "@/components/trainer/CalendarPanel";
import CoachInsightsWidget from "@/components/trainer/CoachInsightsWidget";
import RecentActivityWidget from "@/components/trainer/RecentActivityWidget";

type AthleteRow = {
  user_id: string;
  email: string;
  full_name: string | null;
  age: number | null;
  sessions_this_week: number;
  sessions_30d: number;
  last_workout_date: string | null;
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

async function getCoachData(): Promise<{
  coachName: string;
  athletes: AthleteRow[];
  totalSessions7d: number;
  workouts: SimpleWorkout[];
  assignments: Assignment[];
  completionRate: number;
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
        coachName: "Coach",
        athletes: [],
        totalSessions7d: 0,
        workouts: [],
        assignments: [],
        completionRate: 0,
        error: "Not authenticated",
      };

    // ✅ Fix: use user_id not id
    const { data: coachProfile } = await supabase
      .from("profiles")
      .select("full_name, role")
      .eq("user_id", user.id)
      .maybeSingle();

    if (coachProfile?.role !== "coach") {
      return {
        coachName: "Coach",
        athletes: [],
        totalSessions7d: 0,
        workouts: [],
        assignments: [],
        completionRate: 0,
        error: "coach_only",
      };
    }

    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const [athletesRes, logs7dRes, logs30dRes, workoutsRes, assignmentsRes] =
      await Promise.all([
        supabase
          .from("profiles")
          .select("user_id, email, full_name, age")
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

    const athletes: AthleteRow[] = (athletesRes.data ?? []).map((a) => ({
      user_id: a.user_id,
      email: a.email,
      full_name: a.full_name,
      age: a.age,
      sessions_this_week: count7d[a.user_id] ?? 0,
      sessions_30d: count30d[a.user_id] ?? 0,
      last_workout_date: lastWorkout[a.user_id] ?? null,
    }));

    const totalSessions7d = (logs7dRes.data ?? []).length;

    // Calculate completion rate: (total logs / total assignments) * 100
    const totalAssignments = assignmentsRes.data?.length ?? 0;
    const totalLogs = (logs30dRes.data ?? []).length;
    const completionRate =
      totalAssignments > 0
        ? Math.round((totalLogs / totalAssignments) * 100)
        : 0;

    return {
      coachName: coachProfile?.full_name?.split(" ")[0] ?? "Coach",
      athletes,
      totalSessions7d,
      workouts: workoutsRes.data ?? [],
      assignments: assignmentsRes.data ?? [],
      completionRate,
      error: null,
    };
  } catch (err) {
    return {
      coachName: "Coach",
      athletes: [],
      totalSessions7d: 0,
      workouts: [],
      assignments: [],
      completionRate: 0,
      error: String(err),
    };
  }
}

export default async function TrainerDashboardPage() {
  const {
    coachName,
    athletes,
    totalSessions7d,
    workouts,
    assignments,
    completionRate,
    error,
  } = await getCoachData();

  if (error === "coach_only") redirect("/dashboard");

  return (
    <TrainerDashboardLayout coachName={coachName}>
      <div className="max-w-7xl mx-auto px-4 py-6 lg:py-8 space-y-8">
        <h1 className="sr-only">Trainer Dashboard</h1>

        {error && error !== "coach_only" && (
          <div className="rounded-2xl border border-red-500/30 bg-red-500/10 px-6 py-4 text-red-200">
            <p className="font-medium">{error}</p>
          </div>
        )}

        <KPICards
          athletes={athletes}
          totalSessions7d={totalSessions7d}
          activePrograms={workouts.length}
          completionRate={completionRate}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          <div className="lg:col-span-2">
            <AthletesPanel
              athletes={athletes}
              workouts={workouts}
              assignments={assignments}
            />
          </div>
          <div className="lg:col-span-1">
            <CalendarPanel />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          <div className="lg:col-span-2">
            <CoachInsightsWidget athletes={athletes} />
          </div>
          <div className="lg:col-span-1">
            <RecentActivityWidget athletes={athletes} />
          </div>
        </div>
      </div>
    </TrainerDashboardLayout>
  );
}
