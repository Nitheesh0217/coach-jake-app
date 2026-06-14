"use server";

import { supabaseServer } from "@/lib/supabaseClient";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export interface MarkWorkoutCompleteData {
  workoutId: string;
  notes?: string;
}

export interface MarkWorkoutCompleteResult {
  success: boolean;
  error?: string;
}

/**
 * Server action to mark a workout as complete.
 * Inserts a row into the workout_logs table.
 * Revalidates the dashboard to refresh KPIs.
 */
export async function markWorkoutComplete(
  data: MarkWorkoutCompleteData
): Promise<MarkWorkoutCompleteResult> {
  try {
    const cookieStore = await cookies();
    const supabase = supabaseServer({
      get: (name) => {
        const val = cookieStore.get(name);
        return val ? { value: val.value } : undefined;
      },
      set: (name, value, options) => {
        cookieStore.set(name, value, options);
      },
      remove: (name, options) => {
        cookieStore.delete(name);
      },
    });

    // Get current user
    const { data: auth } = await supabase.auth.getUser();
    const user = auth.user;

    if (!user) {
      return { success: false, error: "Not authenticated" };
    }

    // Check if a workout log already exists for this workout today
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setUTCDate(tomorrow.getUTCDate() + 1);

    const { data: existingLog, error: checkError } = await supabase
      .from("workout_logs")
      .select("id", { count: "exact" })
      .eq("user_id", user.id)
      .eq("workout_id", data.workoutId)
      .gte("created_at", today.toISOString())
      .lt("created_at", tomorrow.toISOString())
      .maybeSingle();

    if (checkError) {
      console.error("Error checking for existing log:", checkError);
      return {
        success: false,
        error: `Failed to check workout logs: ${checkError.message}`,
      };
    }

    if (existingLog) {
      return { success: false, error: "Already logged today" };
    }

    // Insert workout log
    const todayStr = today.toISOString().split("T")[0];

    const { error } = await supabase.from("workout_logs").insert({
      user_id: user.id,
      workout_id: data.workoutId,
      date: todayStr,
      completed: true,
      notes: data.notes || null,
    });

    if (error) {
      console.error("Workout log insertion error:", error);
      return {
        success: false,
        error: `Failed to log workout: ${error.message}`,
      };
    }

    // Revalidate dashboard to refresh KPIs
    revalidatePath("/dashboard");
    revalidatePath("/workouts");

    return { success: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("Workout completion exception:", message);
    return {
      success: false,
      error: `Workout logging failed: ${message}`,
    };
  }
}
