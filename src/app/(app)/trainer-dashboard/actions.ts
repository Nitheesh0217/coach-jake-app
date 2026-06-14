"use server";

import { supabaseServer } from "@/lib/supabaseClient";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

/**
 * Assign a workout to an athlete
 */
export async function assignWorkout(
  athleteId: string,
  workoutId: string,
  notes?: string,
): Promise<{ success: boolean; error?: string }> {
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
    const coachId = auth.user?.id;

    if (!coachId) {
      return { success: false, error: "Not authenticated" };
    }

    // Insert the assignment
    const { error } = await supabase.from("workout_assignments").insert({
      coach_id: coachId,
      athlete_id: athleteId,
      workout_id: workoutId,
      notes: notes || null,
    });

    if (error) {
      // Check if it's the unique constraint error
      if (error.code === "23505") {
        return { success: false, error: "Already assigned" };
      }
      return { success: false, error: error.message };
    }

    revalidatePath("/trainer-dashboard");
    return { success: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return { success: false, error: message };
  }
}

/**
 * Remove a workout assignment
 */
export async function removeAssignment(
  assignmentId: string,
): Promise<{ success: boolean; error?: string }> {
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
    const coachId = auth.user?.id;

    if (!coachId) {
      return { success: false, error: "Not authenticated" };
    }

    // Delete with RLS check (coach_id = auth.uid())
    const { error } = await supabase
      .from("workout_assignments")
      .delete()
      .eq("id", assignmentId)
      .eq("coach_id", coachId);

    if (error) {
      return { success: false, error: error.message };
    }

    revalidatePath("/trainer-dashboard");
    return { success: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return { success: false, error: message };
  }
}
