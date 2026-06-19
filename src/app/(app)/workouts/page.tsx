import { supabaseServer } from "@/lib/supabaseClient";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import TrainerDashboardLayout from "@/components/sections/layout/TrainerDashboardLayout";
import WorkoutsClient from "@/components/sections/workouts/WorkoutsClient";
import { Dumbbell, Clock, CheckCircle2, ArrowRight } from "lucide-react";

export const dynamic = "force-dynamic";

type AssignedWorkout = {
  id: string;
  title: string;
  description: string | null;
  duration: number;
  focusArea: string;
  completed: boolean;
  completedToday: boolean;
  lastLogDate?: string;
  date: string;
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

interface WorkoutDataRow {
  id: string;
  title: string;
  description: string | null;
  duration: number | null;
  focus_area: string | null;
}

interface LogDataRow {
  workout_id: string;
  date: string;
  user_id: string;
}

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

    // Fetch all workouts (limit to 200 for pagination support)
    const { data: workoutsData } = await supabase
      .from("workouts")
      .select("id, title, description, duration, focus_area")
      .limit(200);

    // Fetch workout logs to determine completion
    const { data: logsData } = await supabase
      .from("workout_logs")
      .select("workout_id, date, user_id")
      .eq("user_id", user.id)
      .order("date", { ascending: false });

    // Combine into unified workout list
    const today = new Date().toISOString().split("T")[0];
    const workoutsList = (
      (workoutsData as unknown as WorkoutDataRow[]) || []
    ).map((w) => {
      const allLogs =
        (logsData as unknown as LogDataRow[])?.filter(
          (l) => l.workout_id === w.id,
        ) || [];
      const latestLog = allLogs[0]; // Already ordered by date descending
      const todayLog = allLogs.find((l) => l.date === today);

      return {
        id: w.id,
        title: w.title,
        description: w.description,
        duration: w.duration || 45,
        focusArea: w.focus_area || "Strength",
        completed: allLogs.length > 0,
        completedToday: !!todayLog,
        lastLogDate: latestLog?.date,
        date: latestLog?.date || today,
      };
    });

    return {
      workouts: workoutsList,
      userName: profile?.full_name?.split(" ")[0] || "Athlete",
      error: null,
    };
  } catch (err) {
    return {
      workouts: [],
      userName: "Athlete",
      error: String(err),
    };
  }
}

export default async function WorkoutsPage() {
  const { workouts, userName, error } = await getWorkoutsData();

  return (
    <TrainerDashboardLayout coachName={userName}>
      <WorkoutsClient workouts={workouts} />
    </TrainerDashboardLayout>
  );
}
