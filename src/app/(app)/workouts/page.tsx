import { supabaseServer } from "@/lib/supabaseClient";
import { cookies } from "next/headers";
import WorkoutCard from "@/components/dashboard/WorkoutCard";

type Workout = {
  id: string;
  title: string;
  description: string | null;
  is_active: boolean;
  created_at: string;
};

async function getAthleteWorkouts(): Promise<{
  workouts: Workout[];
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
        // Read-only in Server Components
      },
      remove: (name, options) => {
        // Read-only in Server Components
      },
    });

    const { data: auth } = await supabase.auth.getUser();
    const user = auth.user;

    if (!user) {
      return { workouts: [], error: "Not authenticated" };
    }

    // Fetch all active workouts
    const { data: workouts, error } = await supabase
      .from("workouts")
      .select("id,title,description,is_active,created_at")
      .eq("is_active", true)
      .order("created_at", { ascending: false });

    if (error) {
      return { workouts: [], error: error.message };
    }

    return { workouts: workouts || [], error: null };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return { workouts: [], error: message };
  }
}

export default async function WorkoutsPage() {
  const { workouts, error } = await getAthleteWorkouts();

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 lg:py-8">
      <h1 className="sr-only">Workouts</h1>

      <div className="mb-8">
        <h2 className="text-3xl font-bold text-zinc-50 mb-2">Available Workouts</h2>
        <p className="text-base text-zinc-400">
          Select a workout and mark exercises as complete to track your progress.
        </p>
      </div>

      {error && (
        <div className="mb-6 rounded-2xl border border-red-500/30 bg-red-500/10 px-6 py-4 text-red-200">
          <p className="font-medium">{error}</p>
        </div>
      )}

      {workouts.length === 0 ? (
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-12 text-center">
          <p className="text-zinc-400 mb-4">No active workouts available yet.</p>
          <p className="text-sm text-zinc-500">Check back soon for new training programs.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {workouts.map((workout) => (
            <WorkoutCard key={workout.id} workout={workout} />
          ))}
        </div>
      )}
    </div>
  );
}
