import { supabaseServer } from "@/lib/supabaseClient";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import TrainerDashboardLayout from "@/components/layout/TrainerDashboardLayout";
import LogWorkoutModal from "@/components/workouts/LogWorkoutModal";

type AssignedWorkout = {
  id: string;
  name: string;
  description: string | null;
};

type WorkoutLog = {
  id: string;
  logged_at: string;
  notes: string | null;
  workout_id: string;
  workouts: {
    title: string;
  } | null;
};

async function getWorkoutsData() {
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
      redirect("/login");
    }

    // Fetch user profile for name
    const { data: profile } = await supabase
      .from("profiles")
      .select("full_name")
      .eq("user_id", user.id)
      .single();

    // Fetch assigned workouts
    const { data: assignedWorkoutData, error: assignedError } = await supabase
      .from("workout_assignments")
      .select("workout_id, workouts(id, name, description)")
      .eq("athlete_id", user.id);

    const assignedWorkouts: AssignedWorkout[] = (assignedWorkoutData || [])
      .map((item: any) => ({
        id: item.workout_id,
        name: item.workouts?.name || "Unknown",
        description: item.workouts?.description || null,
      }))
      .filter((w) => w.name !== "Unknown");

    // Fetch workout history (last 20)
    const { data: logsData, error: logsError } = await supabase
      .from("workout_logs")
      .select("id, logged_at, notes, workout_id, workouts(title)")
      .eq("user_id", user.id)
      .order("logged_at", { ascending: false })
      .limit(20);

    const workoutLogs: WorkoutLog[] = (logsData || []).map((log: any) => ({
      id: log.id,
      logged_at: log.logged_at,
      notes: log.notes,
      workout_id: log.workout_id,
      workouts:
        log.workouts && log.workouts.length > 0 ? log.workouts[0] : null,
    }));

    return {
      assignedWorkouts,
      workoutLogs,
      userName: profile?.full_name?.split(" ")[0] || "Athlete",
      error: assignedError?.message || logsError?.message || null,
    };
  } catch (err) {
    return {
      assignedWorkouts: [],
      workoutLogs: [],
      userName: "Athlete",
      error: String(err),
    };
  }
}

export default async function WorkoutsPage() {
  const { assignedWorkouts, workoutLogs, userName, error } =
    await getWorkoutsData();

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  return (
    <TrainerDashboardLayout coachName={userName}>
      <div className="max-w-4xl mx-auto px-4 py-6 lg:py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent mb-2">
            Your Workouts
          </h1>
          <p className="text-base text-zinc-400">
            Log sessions and track your training history
          </p>
        </div>

        {error && (
          <div className="mb-6 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-red-200">
            <p className="text-sm font-medium">{error}</p>
          </div>
        )}

        {/* SECTION 1 — Assigned Workouts */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold text-white mb-4">
            Assigned Workouts
          </h2>
          {assignedWorkouts.length === 0 ? (
            <div className="rounded-lg border border-white/[0.08] bg-white/[0.03] p-8 text-center">
              <p className="text-base text-zinc-400">
                No workouts assigned yet. Your coach will add programs here.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {assignedWorkouts.map((workout: AssignedWorkout) => (
                <div
                  key={workout.id}
                  className="rounded-lg border border-white/[0.08] bg-white/[0.03] p-4 hover:border-emerald-500/30 hover:bg-emerald-500/[0.04] transition-all duration-200"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="font-semibold text-white mb-1">
                        {workout.name}
                      </h3>
                      {workout.description && (
                        <p className="text-sm text-zinc-400">
                          {workout.description}
                        </p>
                      )}
                    </div>
                    <LogWorkoutModal
                      workoutId={workout.id}
                      workoutName={workout.name}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* SECTION 2 — Your History */}
        <div>
          <h2 className="text-xl font-semibold text-white mb-4">
            Session History
          </h2>
          {workoutLogs.length === 0 ? (
            <div className="rounded-lg border border-white/[0.08] bg-white/[0.03] p-8 text-center">
              <p className="text-base text-zinc-400">
                No sessions logged yet. Log your first one above.
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {workoutLogs.map((log: WorkoutLog) => (
                <div
                  key={log.id}
                  className="rounded-lg border border-white/[0.08] bg-white/[0.03] p-4"
                >
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div className="flex-1">
                      <p className="font-semibold text-white">
                        {log.workouts?.title || "Unknown Workout"}
                      </p>
                      <p className="text-xs text-zinc-500">
                        {formatDate(log.logged_at)}
                      </p>
                    </div>
                    <span className="text-emerald-400 text-lg">✅</span>
                  </div>
                  {log.notes && (
                    <p className="text-sm text-zinc-400 pl-4 border-l border-zinc-700">
                      {log.notes}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </TrainerDashboardLayout>
  );
}
