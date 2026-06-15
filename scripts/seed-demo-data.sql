-- Demo seed data for Texas Sports Academy presentation
-- Run once in Supabase SQL editor before the demo
-- Safe to re-run (uses INSERT ... ON CONFLICT DO NOTHING)

-- ============================================================================
-- INSERT 5 DEMO ATHLETES
-- ============================================================================

INSERT INTO public.profiles (
  user_id,
  email,
  full_name,
  role,
  player_archetype,
  goals,
  visibility,
  is_fully_scouted
) VALUES
(
  gen_random_uuid(),
  'marcus.johnson.tx@gmail.com',
  'Marcus Johnson',
  'athlete',
  'Playmaker',
  '[{"title": "Improve court vision", "target_value": "8 APG", "target_date": "2026-06-01"}]'::jsonb,
  'public',
  true
),
(
  gen_random_uuid(),
  'darius.williams.tx@gmail.com',
  'Darius Williams',
  'athlete',
  'Scorer',
  '[{"title": "Increase 3P shooting", "target_value": "40% from three", "target_date": "2026-06-01"}]'::jsonb,
  'public',
  true
),
(
  gen_random_uuid(),
  'tyler.okonkwo.tx@gmail.com',
  'Tyler Okonkwo',
  'athlete',
  'Two-Way Wing',
  '[{"title": "Develop defensive versatility", "target_value": "1.5 SPG", "target_date": "2026-06-01"}]'::jsonb,
  'public',
  true
),
(
  gen_random_uuid(),
  'jordan.cruz.tx@gmail.com',
  'Jordan Cruz',
  'athlete',
  'Interior Anchor',
  '[{"title": "Improve rebounding", "target_value": "10 RPG", "target_date": "2026-06-01"}]'::jsonb,
  'public',
  true
),
(
  gen_random_uuid(),
  'caleb.thornton.tx@gmail.com',
  'Caleb Thornton',
  'athlete',
  'Rim Protector',
  '[{"title": "Block shots effectively", "target_value": "2.5 BPG", "target_date": "2026-06-01"}]'::jsonb,
  'public',
  true
)
ON CONFLICT (email) DO NOTHING;

-- ============================================================================
-- ASSIGN WORKOUTS TO ATHLETES
-- ============================================================================

-- Get the athlete IDs we just inserted (or already exist)
WITH demo_athletes AS (
  SELECT user_id FROM public.profiles
  WHERE email IN (
    'marcus.johnson.tx@gmail.com',
    'darius.williams.tx@gmail.com',
    'tyler.okonkwo.tx@gmail.com',
    'jordan.cruz.tx@gmail.com',
    'caleb.thornton.tx@gmail.com'
  )
),
demo_workouts AS (
  SELECT id FROM public.workouts
  WHERE is_active = true
  LIMIT 2
),
coach_user AS (
  SELECT user_id FROM public.profiles
  WHERE email = 'nitheeshdonepudi.17@gmail.com'
  AND role = 'coach'
)
INSERT INTO public.workout_assignments (
  athlete_id,
  workout_id,
  assigned_by
)
SELECT 
  a.user_id as athlete_id,
  w.id as workout_id,
  c.user_id as assigned_by
FROM demo_athletes a
CROSS JOIN demo_workouts w
CROSS JOIN coach_user c
ON CONFLICT (athlete_id, workout_id) DO NOTHING;

-- ============================================================================
-- LOG WORKOUT SESSIONS FOR EACH ATHLETE (3 per athlete)
-- ============================================================================

WITH demo_athletes AS (
  SELECT user_id FROM public.profiles
  WHERE email IN (
    'marcus.johnson.tx@gmail.com',
    'darius.williams.tx@gmail.com',
    'tyler.okonkwo.tx@gmail.com',
    'jordan.cruz.tx@gmail.com',
    'caleb.thornton.tx@gmail.com'
  )
),
demo_workouts AS (
  SELECT id FROM public.workouts
  WHERE is_active = true
  LIMIT 1
)
INSERT INTO public.workout_logs (
  user_id,
  workout_id,
  date,
  completed,
  notes
)
SELECT 
  a.user_id,
  w.id,
  CURRENT_DATE - interval '1 day',
  true,
  'Great session - felt strong today'
FROM demo_athletes a
CROSS JOIN demo_workouts w

UNION ALL

SELECT 
  a.user_id,
  w.id,
  CURRENT_DATE - interval '5 days',
  true,
  'Solid effort, working on technique'
FROM demo_athletes a
CROSS JOIN demo_workouts w

UNION ALL

SELECT 
  a.user_id,
  w.id,
  CURRENT_DATE - interval '10 days',
  true,
  'Heavy session - good conditioning'
FROM demo_athletes a
CROSS JOIN demo_workouts w

ON CONFLICT DO NOTHING;
