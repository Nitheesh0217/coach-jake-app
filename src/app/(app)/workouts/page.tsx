import { supabaseServer } from "@/lib/supabaseClient";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import TrainerDashboardLayout from "@/components/sections/layout/TrainerDashboardLayout";
import WorkoutsClient from "@/components/sections/workouts/WorkoutsClient";
import { Dumbbell, Clock, CheckCircle2, ArrowRight } from "lucide-react";

type AssignedWorkout = {
  id: string;
  title: string;
  description: string | null;
  duration: number;
  focusArea: string;
  completed: boolean;
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

    // Fetch all workouts
    const { data: workoutsData } = await supabase
      .from("workouts")
      .select("id, title, description, duration, focus_area");

    // Fetch workout logs to determine completion
    const { data: logsData } = await supabase
      .from("workout_logs")
      .select("workout_id, date, user_id")
      .eq("user_id", user.id)
      .order("date", { ascending: false });

    // Combine into unified workout list
    const workoutsList = (workoutsData || []).map((w: any) => {
      const log = logsData?.find((l: any) => l.workout_id === w.id);
      return {
        id: w.id,
        title: w.title,
        description: w.description,
        duration: w.duration || 45,
        focusArea: w.focus_area || "Strength",
        completed: !!log,
        date: log?.date || new Date().toISOString().split("T")[0],
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
