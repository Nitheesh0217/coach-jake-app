/**
 * User role type - shared across the application
 */
export type Role = "athlete" | "coach";

/**
 * Player Goal - part of goals JSONB array on Profile
 */
export interface PlayerGoal {
  title: string;
  target_value: string;
  target_date: string;
}

/**
 * Profile type from Supabase profiles table
 */
export interface Profile {
  user_id: string;
  email: string;
  full_name: string | null;
  age: number | null;
  height_cm: number | null;
  weight_kg: number | null;
  role: Role;
  created_at?: string;
  
  // Player Card Fields
  player_archetype?: string | null;
  playstyle_team_vs_iso?: number | null; // 0-100: Team-First to ISO Scorer
  playstyle_shooter_vs_slasher?: number | null; // 0-100: Shooter to Slasher
  playstyle_finesse_vs_power?: number | null; // 0-100: Finesse to Power
  training_context?: string | null; // off-season, pre-season, in-season, tryouts, showcases, general
  goals?: PlayerGoal[] | null; // JSONB array of goals
  weekly_sessions_target?: number | null; // 1-7
  typical_session_length_minutes?: number | null; // 30, 45, 60, 75, 90
  sleep_hours_per_night?: string | null; // <6, 6-7, 7-8, >8
  schedule_blocks?: string[] | null; // morning, afternoon, evening, late_night
  visibility?: string | null; // private, coach_only, community
  instagram_url?: string | null;
  youtube_url?: string | null;
  highlight_tagline?: string | null;
  is_fully_scouted?: boolean; // true when all key fields complete
}

/**
 * Athlete profile with computed metrics - for Coach Dashboard
 * Requires full_name to be non-null for display purposes
 */
export interface AthleteProfile {
  user_id: string;
  email: string;
  full_name: string;
  age: number | null;
  height_cm: number | null;
  weight_kg: number | null;
  role: Role;
  completion_percentage?: number;
  sessions_this_week?: number;
  last_workout_date?: string;
}

/**
 * Workout from the workouts table
 */
export interface Workout {
  id: string;
  title: string;
  description: string | null;
  is_active: boolean;
  created_at: string;
}

/**
 * Measurement (weight tracking)
 */
export interface Measurement {
  id: string;
  date: string;
  weight_kg: number;
  created_at?: string;
}
