"use server";

import { supabaseServer } from "@/lib/supabaseClient";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

type CookieStore = Awaited<ReturnType<typeof cookies>>;

function createSupabaseClient(cookieStore: CookieStore) {
  return supabaseServer({
    get: (name) => {
      const val = cookieStore.get(name);
      return val ? { value: val.value } : undefined;
    },
    set: () => {},
    remove: () => {},
  });
}

export async function updateProfile(data: {
  full_name?: string;
  age?: number;
  height_cm?: number;
  weight_kg?: number;
  instagram_url?: string;
  youtube_url?: string;
  highlight_tagline?: string;
}) {
  try {
    const cookieStore = await cookies();
    const supabase = createSupabaseClient(cookieStore);

    const { data: auth } = await supabase.auth.getUser();
    if (!auth.user) throw new Error("Not authenticated");

    const { error } = await supabase
      .from("profiles")
      .update({
        full_name: data.full_name,
        age: data.age,
        height_cm: data.height_cm,
        weight_kg: data.weight_kg,
        instagram_url: data.instagram_url,
        youtube_url: data.youtube_url,
        highlight_tagline: data.highlight_tagline,
        updated_at: new Date().toISOString(),
      })
      .eq("user_id", auth.user.id);

    if (error) throw error;

    revalidatePath("/dashboard");
    revalidatePath("/settings");
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to update profile",
    };
  }
}

export async function updatePlayerCard(data: {
  player_archetype?: string;
  playstyle_team_vs_iso?: number;
  playstyle_shooter_vs_slasher?: number;
  playstyle_finesse_vs_power?: number;
}) {
  try {
    const cookieStore = await cookies();
    const supabase = createSupabaseClient(cookieStore);

    const { data: auth } = await supabase.auth.getUser();
    if (!auth.user) throw new Error("Not authenticated");

    const { error } = await supabase
      .from("profiles")
      .update({
        player_archetype: data.player_archetype,
        playstyle_team_vs_iso: data.playstyle_team_vs_iso,
        playstyle_shooter_vs_slasher: data.playstyle_shooter_vs_slasher,
        playstyle_finesse_vs_power: data.playstyle_finesse_vs_power,
        updated_at: new Date().toISOString(),
      })
      .eq("user_id", auth.user.id);

    if (error) throw error;

    revalidatePath("/dashboard");
    revalidatePath("/settings");
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to update player card",
    };
  }
}

export async function updatePassword(data: {
  currentPassword: string;
  newPassword: string;
}) {
  try {
    const cookieStore = await cookies();
    const supabase = createSupabaseClient(cookieStore);

    const { data: auth } = await supabase.auth.getUser();
    if (!auth.user) throw new Error("Not authenticated");

    // Supabase doesn't allow verifying current password directly
    // Instead, attempt to update the password
    // If user needs to verify current password, they should re-authenticate
    const { error } = await supabase.auth.updateUser({
      password: data.newPassword,
    });

    if (error) throw error;

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to update password",
    };
  }
}

export async function updateGoals(data: {
  goals?: string;
  weekly_sessions_target?: number;
  typical_session_length_minutes?: number;
  sleep_hours_per_night?: number;
}) {
  try {
    const cookieStore = await cookies();
    const supabase = createSupabaseClient(cookieStore);

    const { data: auth } = await supabase.auth.getUser();
    if (!auth.user) throw new Error("Not authenticated");

    const { error } = await supabase
      .from("profiles")
      .update({
        goals: data.goals,
        weekly_sessions_target: data.weekly_sessions_target,
        typical_session_length_minutes: data.typical_session_length_minutes,
        sleep_hours_per_night: data.sleep_hours_per_night,
        updated_at: new Date().toISOString(),
      })
      .eq("user_id", auth.user.id);

    if (error) throw error;

    revalidatePath("/dashboard");
    revalidatePath("/settings");
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to update goals",
    };
  }
}

export async function updateSchedule(data: {
  schedule_blocks?: Record<string, any>;
}) {
  try {
    const cookieStore = await cookies();
    const supabase = createSupabaseClient(cookieStore);

    const { data: auth } = await supabase.auth.getUser();
    if (!auth.user) throw new Error("Not authenticated");

    const { error } = await supabase
      .from("profiles")
      .update({
        schedule_blocks: data.schedule_blocks,
        updated_at: new Date().toISOString(),
      })
      .eq("user_id", auth.user.id);

    if (error) throw error;

    revalidatePath("/dashboard");
    revalidatePath("/settings");
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to update schedule",
    };
  }
}

export async function signOut() {
  try {
    const cookieStore = await cookies();
    const supabase = createSupabaseClient(cookieStore);
    await supabase.auth.signOut();
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to sign out",
    };
  }
}
