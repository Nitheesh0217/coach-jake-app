import { supabaseServer } from "@/lib/supabaseClient";
import { cookies } from "next/headers";
import WorkoutCard from "@/components/dashboard/WorkoutCard";
import TrainerDashboardLayout from "@/components/layout/TrainerDashboardLayout";

type Workout = {
  id: string;
  title: string;
  description: string | null;
  is_active: boolean;
  created_at: string;
};

async function getWorkoutsWithStatus(): Promise<{
  workouts: Workout[];
  completedTodayIds: Set<string>;
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
        workouts: [],
        completedTodayIds: new Set(),
        userName: "Athlete",
        error: "Not authenticated",
      };

    const [workoutsRes, profileRes, logsRes] = await Promise.all([
      supabase
        .from("workouts")
        .select("id,title,description,is_active,created_at")
        .eq("is_active", true)
        .order("created_at", { ascending: false }),
      supabase
        .from("profiles")
        .select("full_name")
        .eq("user_id", user.id)
        .maybeSingle(),
      supabase
        .from("workout_logs")
        .select("workout_id")
        .eq("user_id", user.id)
        .gte("created_at", new Date().toISOString().split("T")[0]),
    ]);

    const completedTodayIds = new Set<string>(
      (logsRes.data ?? []).map((l: { workout_id: string }) => l.workout_id),
    );

    return {
      workouts: workoutsRes.data ?? [],
      completedTodayIds,
      userName: profileRes.data?.full_name?.split(" ")[0] ?? "Athlete",
      error: workoutsRes.error?.message ?? null,
    };
  } catch (err) {
    return {
      workouts: [],
      completedTodayIds: new Set(),
      userName: "Athlete",
      error: String(err),
    };
  }
}

export default async function WorkoutsPage() {
  const { workouts, completedTodayIds, userName, error } =
    await getWorkoutsWithStatus();

  return (
    <TrainerDashboardLayout coachName={userName}>
      <div className="max-w-6xl mx-auto px-4 py-6 lg:py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-zinc-50 mb-2">
            Workout Library
          </h2>
          <p className="text-base text-zinc-400">
            Browse programs and mark sessions complete to build your streak.
          </p>
        </div>

        {error && (
          <div className="mb-6 rounded-2xl border border-red-500/30 bg-red-500/10 px-6 py-4 text-red-200">
            <p className="font-medium">{error}</p>
          </div>
        )}

        {workouts.length === 0 ? (
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-12 text-center">
            <p className="text-zinc-400 mb-4">
              No active workouts available yet.
            </p>
            <p className="text-sm text-zinc-500">
              Check back soon — your coach will assign programs here.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {workouts.map((workout) => (
              <WorkoutCard
                key={workout.id}
                workout={workout}
                alreadyCompletedToday={completedTodayIds.has(workout.id)}
              />
            ))}
          </div>
        )}
      </div>
    </TrainerDashboardLayout>
  );
}
