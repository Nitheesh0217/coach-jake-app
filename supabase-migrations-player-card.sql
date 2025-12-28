-- Add Player Card fields to profiles table
-- Run this in your Supabase SQL Editor

-- Add new columns (these are safe - nullable so no data loss)
ALTER TABLE profiles
ADD COLUMN player_archetype TEXT,
ADD COLUMN playstyle_team_vs_iso INTEGER DEFAULT NULL,
ADD COLUMN playstyle_shooter_vs_slasher INTEGER DEFAULT NULL,
ADD COLUMN playstyle_finesse_vs_power INTEGER DEFAULT NULL,
ADD COLUMN training_context TEXT,
ADD COLUMN goals JSONB DEFAULT NULL,
ADD COLUMN weekly_sessions_target INTEGER,
ADD COLUMN typical_session_length_minutes INTEGER,
ADD COLUMN sleep_hours_per_night TEXT,
ADD COLUMN schedule_blocks TEXT[] DEFAULT NULL,
ADD COLUMN visibility TEXT DEFAULT 'private',
ADD COLUMN instagram_url TEXT,
ADD COLUMN youtube_url TEXT,
ADD COLUMN highlight_tagline TEXT,
ADD COLUMN is_fully_scouted BOOLEAN DEFAULT FALSE;

-- Add comment for goals column
COMMENT ON COLUMN profiles.goals IS 'JSONB array of {title, target_value, target_date} objects';
COMMENT ON COLUMN profiles.schedule_blocks IS 'Array of schedule blocks: morning, afternoon, evening, late_night';

-- Create index for faster lookups of scouted profiles
CREATE INDEX idx_profiles_is_fully_scouted ON profiles(is_fully_scouted) WHERE is_fully_scouted = TRUE;

-- Create index for archetype filtering (useful for coaching)
CREATE INDEX idx_profiles_player_archetype ON profiles(player_archetype) WHERE player_archetype IS NOT NULL;
