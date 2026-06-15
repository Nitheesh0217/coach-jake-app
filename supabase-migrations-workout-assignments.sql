-- Create workout_assignments table for coach-to-athlete workout assignments
-- Run this in your Supabase SQL Editor

CREATE TABLE IF NOT EXISTS public.workout_assignments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  athlete_id UUID NOT NULL REFERENCES public.profiles(user_id) ON DELETE CASCADE,
  workout_id UUID NOT NULL REFERENCES public.workouts(id) ON DELETE CASCADE,
  assigned_by UUID NOT NULL REFERENCES public.profiles(user_id),
  created_at TIMESTAMP DEFAULT NOW(),
  CONSTRAINT unique_athlete_workout UNIQUE(athlete_id, workout_id)
);

-- Add RLS policies for workout_assignments
ALTER TABLE public.workout_assignments ENABLE ROW LEVEL SECURITY;

-- Athletes can view their own assignments
CREATE POLICY "Athletes can view their own assignments"
ON public.workout_assignments FOR SELECT
USING (auth.uid() = athlete_id);

-- Coaches can view assignments they've made
CREATE POLICY "Coaches can view their own assignments"
ON public.workout_assignments FOR SELECT
USING (auth.uid() = assigned_by);

-- Coaches can create assignments
CREATE POLICY "Coaches can create assignments"
ON public.workout_assignments FOR INSERT
WITH CHECK (auth.uid() = assigned_by);

-- Coaches can delete their own assignments
CREATE POLICY "Coaches can delete their own assignments"
ON public.workout_assignments FOR DELETE
USING (auth.uid() = assigned_by);

-- Add indexes for common queries
CREATE INDEX idx_workout_assignments_athlete_id ON public.workout_assignments(athlete_id);
CREATE INDEX idx_workout_assignments_workout_id ON public.workout_assignments(workout_id);
CREATE INDEX idx_workout_assignments_assigned_by ON public.workout_assignments(assigned_by);
