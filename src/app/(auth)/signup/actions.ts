"use server";

import { supabaseServer } from "@/lib/supabaseClient";
import { cookies } from "next/headers";
import type { Role } from "@/types";

export interface SignupProfileData {
  userId: string;
  email: string;
  fullName: string | null;
  age: number | null;
  heightCm: number | null;
  weightKg: number | null;
  role: Role;
}

export interface SignupResult {
  success: boolean;
  error?: string;
}

/**
 * Server action to create a profile after successful signup.
 * Inserts a row into the profiles table with the new schema.
 */
export async function createProfileAfterSignup(
  data: SignupProfileData
): Promise<SignupResult> {
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

    // Insert into profiles table
    const { error } = await supabase.from("profiles").insert({
      user_id: data.userId,
      email: data.email,
      full_name: data.fullName,
      age: data.age,
      height_cm: data.heightCm,
      weight_kg: data.weightKg,
      role: data.role,
    });

    if (error) {
      console.error("Profile insertion error:", error);
      return {
        success: false,
        error: `Failed to create profile: ${error.message}`,
      };
    }

    return { success: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("Profile creation exception:", message);
    return {
      success: false,
      error: `Profile creation failed: ${message}`,
    };
  }
}
