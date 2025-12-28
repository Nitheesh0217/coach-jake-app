-- Coach Jake Supabase SQL Setup
-- Run these commands in your Supabase SQL editor to configure RLS policies
-- and seed initial data for testing.

-- ============================================================================
-- 1. RLS POLICIES FOR PROFILES TABLE (REQUIRED FOR SIGNUP/LOGIN)
-- ============================================================================

-- Create INSERT policy - users can only insert their own profile
CREATE POLICY "Users can insert their own profile"
ON public.profiles FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Create SELECT policy - users can read their own profile
CREATE POLICY "Users can read their own profile"
ON public.profiles FOR SELECT
USING (auth.uid() = user_id);

-- Create UPDATE policy - users can update their own profile
CREATE POLICY "Users can update their own profile"
ON public.profiles FOR UPDATE
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- ============================================================================
-- 2. RLS POLICIES FOR WORKOUT_LOGS TABLE
-- ============================================================================

-- Users can insert their own workout logs
CREATE POLICY "Users can insert their own workout logs"
ON public.workout_logs FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Users can read their own workout logs
CREATE POLICY "Users can read their own workout logs"
ON public.workout_logs FOR SELECT
USING (auth.uid() = user_id);

-- ============================================================================
-- 3. RLS POLICIES FOR MEASUREMENTS TABLE
-- ============================================================================

-- Users can insert their own measurements
CREATE POLICY "Users can insert their own measurements"
ON public.measurements FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Users can read their own measurements
CREATE POLICY "Users can read their own measurements"
ON public.measurements FOR SELECT
USING (auth.uid() = user_id);

-- ============================================================================
-- 4. SEED DATA FOR TESTING (WORKOUTS)
-- ============================================================================

-- Insert seed workouts (for both athlete and coach testing)
INSERT INTO public.workouts (title, description, is_active, created_at)
VALUES 
  (
    'Jump Training: Vertical Peak',
    'Plyometric series focused on explosive power. 5 sets of 10 box jumps, 8 tuck jumps, 6 depth jumps. Rest 2 min between sets.',
    true,
    NOW()
  ),
  (
    'Ball Handling Drills',
    'Street workout to improve dribbling and court awareness. 10 min warm-up, 30 min skill work, 10 min conditioning.',
    true,
    NOW()
  ),
  (
    'Strength Foundation: Lower Body',
    'Build stable base for explosive movements. Back squats 4x5, Romanian deadlifts 3x8, calf raises 3x12.',
    true,
    NOW()
  ),
  (
    'Conditioning: 3-Point Line Sprints',
    'Basketball-specific conditioning. Sprint from baseline to 3-point line and back 10x. 30 sec rest between reps.',
    true,
    NOW()
  ),
  (
    'Agility & Speed: T-Drill',
    'Lateral quickness development. T-Drill repeated 5x, 90 sec rest, then 5x in opposite direction.',
    true,
    NOW()
  );

-- ============================================================================
-- NOTE: Do NOT seed athlete profiles. Athletes must sign up themselves.
-- Each signup creates their own profile record via the app's server action.
-- ============================================================================

-- Example SQL to verify profiles table structure (RUN ONLY IF SETUP INCOMPLETE):
-- CREATE TABLE IF NOT EXISTS public.profiles (
--   user_id uuid PRIMARY KEY REFERENCES auth.users(id),
--   email varchar NOT NULL,
--   full_name varchar,
--   age integer,
--   height_cm integer,
--   weight_kg decimal,
--   role varchar NOT NULL CHECK (role IN ('athlete', 'coach')),
--   created_at timestamp DEFAULT NOW()
-- );

-- Example SQL to verify other tables exist (for reference):
-- CREATE TABLE IF NOT EXISTS public.workouts (
--   id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
--   title varchar NOT NULL,
--   description text,
--   is_active boolean DEFAULT true,
--   created_at timestamp DEFAULT NOW()
-- );
-- 
-- CREATE TABLE IF NOT EXISTS public.workout_logs (
--   id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
--   user_id uuid REFERENCES public.profiles(user_id),
--   workout_id uuid REFERENCES public.workouts(id),
--   date date,
--   completed boolean DEFAULT false,
--   notes text,
--   created_at timestamp DEFAULT NOW()
-- );
-- 
-- CREATE TABLE IF NOT EXISTS public.measurements (
--   id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
--   user_id uuid REFERENCES public.profiles(user_id),
--   date date,
--   weight_kg decimal,
--   created_at timestamp DEFAULT NOW()
-- );
--
-- CREATE TABLE IF NOT EXISTS public.contacts (
--   id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
--   name varchar,
--   email varchar,
--   message text,
--   created_at timestamp DEFAULT NOW()
-- );
