import { supabaseServer } from "@/lib/supabaseClient";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import TrainerDashboardLayout from "@/components/layout/TrainerDashboardLayout";
import LogWorkoutModal from "@/components/workouts/LogWorkoutModal";
import { Dumbbell, Clock, CheckCircle2, ArrowRight } from "lucide-react";

type AssignedWorkout = {
  id: string;
  name: string;
  description: string | null;
};

type WorkoutLog = {
  id: string;
  date: string;
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
      .select("workout_id, workouts(id, title, description)")
      .eq("athlete_id", user.id);

    const assignedWorkouts: AssignedWorkout[] = (assignedWorkoutData || [])
      .map((item: any) => ({
        id: item.workout_id,
        name: item.workouts?.title || "Unknown",
        description: item.workouts?.description || null,
      }))
      .filter((w) => w.name !== "Unknown");

    // Fetch workout history (last 20)
    const { data: logsData, error: logsError } = await supabase
      .from("workout_logs")
      .select("id, date, notes, workout_id, workouts(title)")
      .eq("user_id", user.id)
      .order("date", { ascending: false })
      .limit(20);

    const workoutLogs: WorkoutLog[] = (logsData || []).map((log: any) => ({
      id: log.id,
      date: log.date,
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
      <div className="max-w-5xl mx-auto px-4 py-6 lg:py-8">
        {/* PAGE HEADER - Premium Typography */}
        <div className="mb-8 border-b border-zinc-800 pb-8">
          <h1 className="text-5xl sm:text-6xl font-black tracking-tight bg-gradient-to-br from-white via-white to-zinc-400 bg-clip-text text-transparent mb-2">
            Workout Library
          </h1>
          <p className="text-zinc-400 text-base">
            Browse programs and mark sessions complete to build your streak.
          </p>
        </div>

        {/* FILTER TABS */}
        <div className="mb-8 flex gap-2 overflow-x-auto pb-2">
          {["All", "Strength", "Conditioning", "Recovery"].map((category) => (
            <button
              key={category}
              className="px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 bg-emerald-500/15 border border-emerald-500/40 text-emerald-400"
            >
              {category}
            </button>
          ))}
        </div>

        {error && (
          <div
            className="mb-6 rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-red-200"
          >
            <p className="text-sm font-medium">{error}</p>
          </div>
        )}

        {/* SECTION 1 — Assigned Workouts */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-zinc-100 mb-4">
            Assigned Workouts
          </h2>
          {assignedWorkouts.length === 0 ? (
            <div
              className="rounded-2xl border border-zinc-800 bg-zinc-900/80 backdrop-blur-sm shadow-xl shadow-black/40 p-12 text-center"
            >
              <div className="flex justify-center mb-4">
                <Dumbbell className="w-12 h-12 text-zinc-700" />
              </div>
              <h3 className="text-lg font-semibold text-zinc-300 mb-2">
                Your program is being built
              </h3>
              <p className="text-sm text-zinc-500 mb-6">
                Your coach will assign workouts here. Check back soon.
              </p>
              <a
                href="/programs"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-green-400 hover:from-emerald-400 hover:to-green-300 text-black font-semibold rounded-full px-6 py-2.5 transition-all duration-200 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 hover:scale-[1.02] active:scale-[0.98]"
              >
                Browse Public Programs <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          ) : (
            <div className="space-y-3">
              {assignedWorkouts.map((workout: AssignedWorkout, idx: number) => (
                <div
                  key={workout.id}
                  className="rounded-2xl border-l-4 border-l-emerald-400 border border-l-4 border-zinc-800 bg-zinc-900/80 backdrop-blur-sm shadow-xl shadow-black/40 hover:border-zinc-700 hover:shadow-[0_0_30px_rgba(52,211,153,0.08)] transition-all duration-300 p-6"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="font-semibold text-white text-lg mb-2">
                        {workout.name}
                      </h3>
                      {workout.description && (
                        <p className="text-sm text-zinc-400 line-clamp-2">
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
          <h2 className="text-2xl font-bold text-zinc-100 mb-4 flex items-center gap-2">
            Session History
            {workoutLogs.length > 0 && (
              <span className="bg-zinc-800 text-zinc-400 text-xs px-2 py-0.5 rounded-full ml-2">
                {workoutLogs.length}
              </span>
            )}
          </h2>
          {workoutLogs.length === 0 ? (
            <div
              className="rounded-2xl border border-zinc-800 bg-zinc-900/80 backdrop-blur-sm shadow-xl shadow-black/40 p-8 text-center"
            >
              <p className="text-base text-zinc-500">
                No sessions logged yet. Log your first one above to start tracking.
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {workoutLogs.map((log: WorkoutLog, idx: number) => (
                <div
                  key={log.id}
                  className="flex items-start justify-between p-4 rounded-xl border border-zinc-800/50 hover:border-zinc-700 transition-colors"
                >
                  <div className="flex items-start gap-3 flex-1">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-zinc-100">
                        {log.workouts?.title || "Unknown Workout"}
                      </p>
                      {log.notes && (
                        <p className="text-xs text-zinc-500 mt-1">{log.notes}</p>
                      )}
                    </div>
                  </div>
                  <p className="text-xs text-zinc-500 whitespace-nowrap ml-4">
                    {formatDate(log.date)}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </TrainerDashboardLayout>
  );
}
