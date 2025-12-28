"use server";

import { supabaseServer } from "@/lib/supabaseClient";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export interface AddMeasurementData {
  date: string;
  weight_kg: number;
}

export interface AddMeasurementResult {
  success: boolean;
  error?: string;
}

/**
 * Server action to add a weight measurement.
 * Inserts a row into the measurements table.
 */
export async function addMeasurement(
  data: AddMeasurementData
): Promise<AddMeasurementResult> {
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

    // Insert measurement
    const { error } = await supabase.from("measurements").insert({
      user_id: user.id,
      date: data.date,
      weight_kg: data.weight_kg,
    });

    if (error) {
      console.error("Measurement insertion error:", error);
      return {
        success: false,
        error: `Failed to log measurement: ${error.message}`,
      };
    }

    // Revalidate dashboard to refresh measurements list
    revalidatePath("/dashboard");

    return { success: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("Measurement exception:", message);
    return {
      success: false,
      error: `Measurement failed: ${message}`,
    };
  }
}

export interface GetMeasurementsResult {
  measurements: Array<{
    id: string;
    date: string;
    weight_kg: number;
  }>;
  error?: string;
}

/**
 * Server function to fetch recent measurements for the current user.
 */
export async function getMeasurements(): Promise<GetMeasurementsResult> {
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
      return { measurements: [], error: "Not authenticated" };
    }

    const { data: measurements, error } = await supabase
      .from("measurements")
      .select("id,date,weight_kg")
      .eq("user_id", user.id)
      .order("date", { ascending: false })
      .limit(5);

    if (error) {
      return { measurements: [], error: error.message };
    }

    return { measurements: measurements || [] };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return { measurements: [], error: message };
  }
}
