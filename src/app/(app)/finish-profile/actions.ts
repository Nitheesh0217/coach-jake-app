"use server";

import { supabaseServer } from "@/lib/supabaseClient";
import { cookies } from "next/headers";
import type { Role, Profile, PlayerGoal } from "@/types";

export interface ProfileStep1Data {
  fullName: string;
  age: number | null;
  heightCm: number | null;
  weightKg: number | null;
}

export interface ProfileStep2Data {
  playerArchetype: string;
  playstyle_team_vs_iso: number;
  playstyle_shooter_vs_slasher: number;
  playstyle_finesse_vs_power: number;
}

export interface ProfileStep3Data {
  training_context: string;
  goals: PlayerGoal[];
  weekly_sessions_target: number;
  typical_session_length_minutes: number;
  sleep_hours_per_night: string;
  schedule_blocks: string[];
}

export interface ProfileStep4Data {
  visibility: string;
  instagram_url: string | null;
  youtube_url: string | null;
  highlight_tagline: string;
}

export interface CompletePlayerCardData extends ProfileStep1Data, ProfileStep2Data, ProfileStep3Data, ProfileStep4Data {
  role: Role;
}

export interface PlayerCardResult {
  success: boolean;
  error?: string;
  profile?: Profile;
}

/**
 * Get the current user's profile without requiring auth wrapper
 */
export async function getCurrentUserProfile(): Promise<{
  profile: Profile | null;
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
        // Read-only in Server Components - no-op
      },
      remove: (name, options) => {
        // Read-only in Server Components - no-op
      },
    });

    const { data: auth } = await supabase.auth.getUser();
    const user = auth.user;

    if (!user) {
      return { profile: null, error: "Not authenticated" };
    }

    const { data: profileData, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("user_id", user.id)
      .maybeSingle();

    if (profileError) {
      return { profile: null, error: profileError.message };
    }

    return {
      profile: profileData as Profile | null,
      error: null,
    };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return { profile: null, error: message };
  }
}

/**
 * Complete entire Player Card in one call (all 4 steps)
 */
export async function completePlayerCard(
  data: CompletePlayerCardData
): Promise<PlayerCardResult> {
  try {
    const cookieStore = await cookies();
    const supabase = supabaseServer({
      get: (name) => {
        const val = cookieStore.get(name);
        return val ? { value: val.value } : undefined;
      },
      set: (name, value, options) => {
        // Read-only in Server Components - no-op
      },
      remove: (name, options) => {
        // Read-only in Server Components - no-op
      },
    });

    const { data: auth } = await supabase.auth.getUser();
    const user = auth.user;

    if (!user) {
      return {
        success: false,
        error: "Not authenticated",
      };
    }

    // Check if profile exists
    const { data: existingProfile } = await supabase
      .from("profiles")
      .select("user_id")
      .eq("user_id", user.id)
      .maybeSingle();

    // Determine if all required fields are filled (for is_fully_scouted)
    const is_fully_scouted =
      !!data.fullName &&
      !!data.role &&
      !!data.playerArchetype &&
      !!data.training_context &&
      data.goals &&
      data.goals.length > 0;

    const profileUpdate = {
      full_name: data.fullName,
      age: data.age,
      height_cm: data.heightCm,
      weight_kg: data.weightKg,
      role: data.role,
      player_archetype: data.playerArchetype,
      playstyle_team_vs_iso: data.playstyle_team_vs_iso,
      playstyle_shooter_vs_slasher: data.playstyle_shooter_vs_slasher,
      playstyle_finesse_vs_power: data.playstyle_finesse_vs_power,
      training_context: data.training_context,
      goals: data.goals,
      weekly_sessions_target: data.weekly_sessions_target,
      typical_session_length_minutes: data.typical_session_length_minutes,
      sleep_hours_per_night: data.sleep_hours_per_night,
      schedule_blocks: data.schedule_blocks,
      visibility: data.visibility,
      instagram_url: data.instagram_url || null,
      youtube_url: data.youtube_url || null,
      highlight_tagline: data.highlight_tagline,
      is_fully_scouted,
    };

    if (existingProfile) {
      // Update existing profile
      const { data: updatedProfile, error } = await supabase
        .from("profiles")
        .update(profileUpdate)
        .eq("user_id", user.id)
        .select()
        .single();

      if (error) {
        console.error("Profile update error:", error);
        return {
          success: false,
          error: `Failed to update profile: ${error.message}`,
        };
      }

      return {
        success: true,
        profile: updatedProfile as Profile,
      };
    } else {
      // Insert new profile
      const { data: newProfile, error } = await supabase
        .from("profiles")
        .insert({
          user_id: user.id,
          email: user.email || "",
          ...profileUpdate,
        })
        .select()
        .single();

      if (error) {
        console.error("Profile insertion error:", error);
        return {
          success: false,
          error: `Failed to create profile: ${error.message}`,
        };
      }

      return {
        success: true,
        profile: newProfile as Profile,
      };
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("Profile completion exception:", message);
    return {
      success: false,
      error: `Profile operation failed: ${message}`,
    };
  }
}

