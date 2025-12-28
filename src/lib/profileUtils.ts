import type { Profile } from "@/types";

/**
 * Check if profile is complete (has full_name and role)
 */
export function isProfileComplete(profile: Profile | null): boolean {
  if (!profile) return false;
  return !!profile.full_name && !!profile.role;
}

/**
 * Check if profile is fully scouted (all Player Card fields complete)
 */
export function isFullyScouted(profile: Profile | null): boolean {
  if (!profile) return false;
  return Boolean(
    profile.full_name &&
    profile.role &&
    profile.player_archetype &&
    profile.training_context &&
    profile.goals &&
    profile.goals.length > 0 &&
    profile.is_fully_scouted === true
  );
}

