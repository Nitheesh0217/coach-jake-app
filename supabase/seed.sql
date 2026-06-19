-- Coach Jake Seed Data
-- =====================
-- Local development and staging database reset
-- This file contains realistic data for testing all features:
-- - Coach dashboard, athlete dashboard, workouts, leaderboard, progress tracking
-- - Multiple athletes with varied activity levels for realistic metrics
-- - Workout logs with streaks, gaps, and varied completion rates
-- - Weight measurements for progress charts
-- - Workout assignments for active flows
--
-- WARNING: LOCAL/STAGING ONLY
-- Do not use this seed file in production.
--
-- HOW TO RUN:
-- 1. supabase db reset (clears and re-applies all migrations, then runs seed.sql)
-- 2. See supabase/README-seeding.md for full instructions

BEGIN;

-- ============================================================================
-- COACH PROFILE
-- ============================================================================
INSERT INTO public.profiles (
  user_id,
  email,
  full_name,
  age,
  height_cm,
  weight_kg,
  role,
  player_archetype,
  playstyle_team_vs_iso,
  playstyle_shooter_vs_slasher,
  playstyle_finesse_vs_power,
  training_context,
  goals,
  weekly_sessions_target,
  typical_session_length_minutes,
  sleep_hours_per_night,
  schedule_blocks,
  visibility,
  instagram_url,
  youtube_url,
  highlight_tagline,
  is_fully_scouted,
  created_at,
  updated_at
) VALUES (
  '11111111-1111-1111-1111-111111111111'::uuid,
  'coach-jake@example.com',
  'Jake Thompson',
  38,
  188,
  82,
  'coach',
  NULL,
  NULL,
  NULL,
  NULL,
  'coaching',
  '[{"title":"Develop elite athletes","target_value":"100%","target_date":"2026-12-31"}]'::jsonb,
  4,
  90,
  '8-9',
  '["morning", "afternoon"]'::jsonb,
  'community',
  '@jakecoachhoops',
  '@coachjakebball',
  'Elite Basketball Development Coach',
  true,
  now() - interval '180 days',
  now()
);

-- ============================================================================
-- ATHLETE PROFILES (10 Athletes with varied archetypes and development levels)
-- ============================================================================
INSERT INTO public.profiles (
  user_id,
  email,
  full_name,
  age,
  height_cm,
  weight_kg,
  role,
  player_archetype,
  playstyle_team_vs_iso,
  playstyle_shooter_vs_slasher,
  playstyle_finesse_vs_power,
  training_context,
  goals,
  weekly_sessions_target,
  typical_session_length_minutes,
  sleep_hours_per_night,
  schedule_blocks,
  visibility,
  instagram_url,
  youtube_url,
  highlight_tagline,
  is_fully_scouted,
  created_at,
  updated_at
) VALUES
(
  '22222222-2222-2222-2222-222222222222'::uuid,
  'marcus.williams@example.com',
  'Marcus Williams',
  19,
  183,
  79,
  'athlete',
  'Prospect',
  65,
  35,
  50,
  'in-season',
  '[{"title":"D1 Offer","target_value":"2","target_date":"2026-11-30"},{"title":"Increase 3PT %","target_value":"35%","target_date":"2026-12-31"}]'::jsonb,
  5,
  75,
  '7-8',
  '["afternoon", "evening"]'::jsonb,
  'community',
  '@marcuswilliams23',
  '@marcusbball',
  'Point Guard | D1 Bound',
  true,
  now() - interval '150 days',
  now()
),
(
  '33333333-3333-3333-3333-333333333333'::uuid,
  'jamal.davis@example.com',
  'Jamal Davis',
  18,
  185,
  81,
  'athlete',
  'Shooter',
  25,
  80,
  55,
  'pre-season',
  '[{"title":"30% 3PT","target_value":"30%","target_date":"2026-12-15"},{"title":"Volume shooter","target_value":"20 attempts","target_date":"2026-12-31"}]'::jsonb,
  6,
  90,
  '8',
  '["afternoon", "evening"]'::jsonb,
  'community',
  '@jamalballer',
  '@jamalshots',
  'Sharpshooting SG | High Volume',
  true,
  now() - interval '140 days',
  now()
),
(
  '44444444-4444-4444-4444-444444444444'::uuid,
  'deshawn.morris@example.com',
  'DeShawn Morris',
  20,
  196,
  88,
  'athlete',
  'Slasher',
  35,
  25,
  75,
  'in-season',
  '[{"title":"NBA Scout Interest","target_value":"5","target_date":"2026-12-31"},{"title":"Reduce turnovers","target_value":"<2 per game","target_date":"2026-12-31"}]'::jsonb,
  5,
  75,
  '7-8',
  '["morning", "afternoon"]'::jsonb,
  'community',
  '@deshawnslash',
  '@deshawndunk',
  'SF | Explosive Finisher',
  true,
  now() - interval '130 days',
  now()
),
(
  '55555555-5555-5555-5555-555555555555'::uuid,
  'tyler.brown@example.com',
  'Tyler Brown',
  21,
  208,
  104,
  'athlete',
  'Big Man',
  20,
  15,
  85,
  'in-season',
  '[{"title":"Strength goal","target_value":"300 lb squat","target_date":"2026-12-31"},{"title":"Conditioning","target_value":"elite","target_date":"2026-12-31"}]'::jsonb,
  5,
  90,
  '8-9',
  '["morning", "afternoon"]'::jsonb,
  'community',
  '@tylerbigman',
  '@tylerpost',
  'PF | Rim Runner',
  true,
  now() - interval '125 days',
  now()
),
(
  '66666666-6666-6666-6666-666666666666'::uuid,
  'keegan.turner@example.com',
  'Keegan Turner',
  19,
  187,
  82,
  'athlete',
  'Playmaker',
  75,
  40,
  45,
  'pre-season',
  '[{"title":"6 APG Average","target_value":"6","target_date":"2026-12-15"},{"title":"Ball security","target_value":"<2 TOs","target_date":"2026-12-31"}]'::jsonb,
  5,
  75,
  '7-8',
  '["afternoon", "evening"]'::jsonb,
  'community',
  '@keeganhands',
  '@keegandime',
  'Lead Guard | Unselfish',
  true,
  now() - interval '120 days',
  now()
),
(
  '77777777-7777-7777-7777-777777777777'::uuid,
  'brandon.lee@example.com',
  'Brandon Lee',
  18,
  191,
  85,
  'athlete',
  'Shooter',
  15,
  85,
  50,
  'off-season',
  '[{"title":"Long Range Threat","target_value":"40% from three","target_date":"2026-12-31"},{"title":"Form consistency","target_value":"daily","target_date":"2026-12-31"}]'::jsonb,
  4,
  75,
  '8',
  '["afternoon"]'::jsonb,
  'community',
  '@brandonthrees',
  '@brandonfade',
  'Pure Scorer | 3PT Specialist',
  true,
  now() - interval '115 days',
  now()
),
(
  '88888888-8888-8888-8888-888888888888'::uuid,
  'javon.harris@example.com',
  'Javon Harris',
  22,
  211,
  110,
  'athlete',
  'Big Man',
  10,
  5,
  90,
  'in-season',
  '[{"title":"Defensive Player","target_value":"elite defense","target_date":"2026-12-31"},{"title":"Rim protection","target_value":"2 blocks per game","target_date":"2026-12-31"}]'::jsonb,
  5,
  90,
  '8-9',
  '["morning", "afternoon"]'::jsonb,
  'community',
  '@javonbig',
  '@javonblock',
  'Center | Defensive Anchor',
  true,
  now() - interval '110 days',
  now()
),
(
  '99999999-9999-9999-9999-999999999999'::uuid,
  'xavier.ross@example.com',
  'Xavier Ross',
  19,
  184,
  80,
  'athlete',
  'Playmaker',
  70,
  35,
  55,
  'pre-season',
  '[{"title":"Assist Leader","target_value":"5+ APG","target_date":"2026-12-31"},{"title":"Decision making","target_value":"improve IQ","target_date":"2026-12-31"}]'::jsonb,
  5,
  75,
  '7-8',
  '["afternoon", "evening"]'::jsonb,
  'community',
  '@xaviercontrol',
  '@xavierfeed',
  'PG | Ball Handler',
  true,
  now() - interval '105 days',
  now()
),
(
  'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa'::uuid,
  'darius.walker@example.com',
  'Darius Walker',
  20,
  198,
  91,
  'athlete',
  'Prospect',
  50,
  50,
  60,
  'in-season',
  '[{"title":"Versatile Player","target_value":"multiple skills","target_date":"2026-12-31"},{"title":"Position flexibility","target_value":"2-3 positions","target_date":"2026-12-31"}]'::jsonb,
  5,
  90,
  '8',
  '["morning", "afternoon"]'::jsonb,
  'community',
  '@dariuswalker',
  '@dariushighlight',
  'SF | All-Around Game',
  true,
  now() - interval '100 days',
  now()
),
(
  'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb'::uuid,
  'cameron.white@example.com',
  'Cameron White',
  19,
  205,
  99,
  'athlete',
  'Big Man',
  25,
  20,
  80,
  'pre-season',
  '[{"title":"NBA Draft Board","target_value":"lottery watch","target_date":"2027-06-30"},{"title":"Footwork development","target_value":"advanced","target_date":"2026-12-31"}]'::jsonb,
  5,
  90,
  '8-9',
  '["morning", "afternoon"]'::jsonb,
  'community',
  '@cameronathlete',
  '@camerondunk',
  'PF | Athletic Big',
  true,
  now() - interval '95 days',
  now()
);

-- ============================================================================
-- WORKOUTS (12 Workouts covering all skill and training focuses)
-- ============================================================================
INSERT INTO public.workouts (
  id,
  title,
  description,
  is_active,
  created_at
) VALUES
('w0000001-0001-0001-0001-000000000001'::uuid, 'Court Conditioning', 'High-intensity basketball conditioning circuit: sprints, transitions, lane changes, and court-to-court movement at game pace.', true, now() - interval '90 days'),
('w0000001-0001-0001-0001-000000000002'::uuid, 'Game Speed Shooting', 'Shooting under fatigue with movement and pressure. High volume, game-pace shooting drills from NBA range with game-speed footwork.', true, now() - interval '85 days'),
('w0000001-0001-0001-0001-000000000003'::uuid, 'Ball Handling Flow', 'Two-ball control and change-of-pace series. Crossovers, behind-the-back moves, high-low combos, and rhythm development.', true, now() - interval '80 days'),
('w0000001-0001-0001-0001-000000000004'::uuid, 'Explosive First Step', 'Acceleration and burst drills for immediate advantage. Get-a-step games, explosive starts, and quick directional changes.', true, now() - interval '75 days'),
('w0000001-0001-0001-0001-000000000005'::uuid, 'Recovery & Mobility', 'Active recovery and flexibility work: stretching, foam rolling, yoga-based movement, and muscle activation protocols.', true, now() - interval '70 days'),
('w0000001-0001-0001-0001-000000000006'::uuid, 'Lower Body Strength', 'Power and strength development: squats, Bulgarian split squats, plyometrics, leg press, calf raises, and explosive leg work.', true, now() - interval '65 days'),
('w0000001-0001-0001-0001-000000000007'::uuid, 'Finishing Package', 'Rim finishing through contact. Pro-level footwork around the basket, pivot moves, and high-percentage finishes.', true, now() - interval '60 days'),
('w0000001-0001-0001-0001-000000000008'::uuid, 'Defensive Footwork', 'Slides, closeouts, and positioning angles. On-ball and help defense drills with emphasis on staying in front and blocking lanes.', true, now() - interval '55 days'),
('w0000001-0001-0001-0001-000000000009'::uuid, 'Handle Into Shot', 'Creation off the dribble. Pullup jumpers and shot creation from various angles with game-speed footwork patterns.', true, now() - interval '50 days'),
('w0000001-0001-0001-0001-000000000010'::uuid, 'Weekly Test Workout', 'Benchmark workout for comparison and progress tracking. Same drill each week to measure improvement and consistency.', true, now() - interval '45 days'),
('w0000001-0001-0001-0001-000000000011'::uuid, 'Off-Season Program', 'Comprehensive athlete development: speed work, agility ladder, strength, flexibility combination for total body conditioning.', true, now() - interval '40 days'),
('w0000001-0001-0001-0001-000000000012'::uuid, 'Pre-Game Warm-Up', 'Game-day preparation protocol: dynamic stretching, activation drills, game simulation, and mental preparation.', true, now() - interval '35 days');

-- ============================================================================
-- WORKOUT LOGS (Varied dates, streaks, gaps, and completion rates)
-- ============================================================================
-- Marcus Williams - ACTIVE athlete with strong streak
INSERT INTO public.workout_logs (id, user_id, workout_id, completed, created_at) VALUES
(gen_random_uuid(), '22222222-2222-2222-2222-222222222222'::uuid, 'w0000001-0001-0001-0001-000000000001'::uuid, true, now() - interval '0 days'),
(gen_random_uuid(), '22222222-2222-2222-2222-222222222222'::uuid, 'w0000001-0001-0001-0001-000000000002'::uuid, true, now() - interval '1 day'),
(gen_random_uuid(), '22222222-2222-2222-2222-222222222222'::uuid, 'w0000001-0001-0001-0001-000000000003'::uuid, true, now() - interval '2 days'),
(gen_random_uuid(), '22222222-2222-2222-2222-222222222222'::uuid, 'w0000001-0001-0001-0001-000000000004'::uuid, true, now() - interval '3 days'),
(gen_random_uuid(), '22222222-2222-2222-2222-222222222222'::uuid, 'w0000001-0001-0001-0001-000000000005'::uuid, true, now() - interval '4 days'),
(gen_random_uuid(), '22222222-2222-2222-2222-222222222222'::uuid, 'w0000001-0001-0001-0001-000000000006'::uuid, false, now() - interval '5 days'),
(gen_random_uuid(), '22222222-2222-2222-2222-222222222222'::uuid, 'w0000001-0001-0001-0001-000000000001'::uuid, true, now() - interval '7 days'),
(gen_random_uuid(), '22222222-2222-2222-2222-222222222222'::uuid, 'w0000001-0001-0001-0001-000000000002'::uuid, true, now() - interval '8 days'),
(gen_random_uuid(), '22222222-2222-2222-2222-222222222222'::uuid, 'w0000001-0001-0001-0001-000000000010'::uuid, true, now() - interval '14 days'),
(gen_random_uuid(), '22222222-2222-2222-2222-222222222222'::uuid, 'w0000001-0001-0001-0001-000000000007'::uuid, true, now() - interval '21 days');

-- Jamal Davis - INCONSISTENT athlete with gaps
INSERT INTO public.workout_logs (id, user_id, workout_id, completed, created_at) VALUES
(gen_random_uuid(), '33333333-3333-3333-3333-333333333333'::uuid, 'w0000001-0001-0001-0001-000000000002'::uuid, true, now() - interval '0 days'),
(gen_random_uuid(), '33333333-3333-3333-3333-333333333333'::uuid, 'w0000001-0001-0001-0001-000000000002'::uuid, true, now() - interval '2 days'),
(gen_random_uuid(), '33333333-3333-3333-3333-333333333333'::uuid, 'w0000001-0001-0001-0001-000000000001'::uuid, false, now() - interval '4 days'),
(gen_random_uuid(), '33333333-3333-3333-3333-333333333333'::uuid, 'w0000001-0001-0001-0001-000000000009'::uuid, true, now() - interval '6 days'),
(gen_random_uuid(), '33333333-3333-3333-3333-333333333333'::uuid, 'w0000001-0001-0001-0001-000000000002'::uuid, true, now() - interval '10 days'),
(gen_random_uuid(), '33333333-3333-3333-3333-333333333333'::uuid, 'w0000001-0001-0001-0001-000000000007'::uuid, true, now() - interval '14 days'),
(gen_random_uuid(), '33333333-3333-3333-3333-333333333333'::uuid, 'w0000001-0001-0001-0001-000000000010'::uuid, true, now() - interval '21 days'),
(gen_random_uuid(), '33333333-3333-3333-3333-333333333333'::uuid, 'w0000001-0001-0001-0001-000000000001'::uuid, true, now() - interval '30 days');

-- DeShawn Morris - VERY ACTIVE with long streak
INSERT INTO public.workout_logs (id, user_id, workout_id, completed, created_at) VALUES
(gen_random_uuid(), '44444444-4444-4444-4444-444444444444'::uuid, 'w0000001-0001-0001-0001-000000000007'::uuid, true, now() - interval '0 days'),
(gen_random_uuid(), '44444444-4444-4444-4444-444444444444'::uuid, 'w0000001-0001-0001-0001-000000000001'::uuid, true, now() - interval '1 day'),
(gen_random_uuid(), '44444444-4444-4444-4444-444444444444'::uuid, 'w0000001-0001-0001-0001-000000000006'::uuid, true, now() - interval '2 days'),
(gen_random_uuid(), '44444444-4444-4444-4444-444444444444'::uuid, 'w0000001-0001-0001-0001-000000000007'::uuid, true, now() - interval '3 days'),
(gen_random_uuid(), '44444444-4444-4444-4444-444444444444'::uuid, 'w0000001-0001-0001-0001-000000000008'::uuid, true, now() - interval '4 days'),
(gen_random_uuid(), '44444444-4444-4444-4444-444444444444'::uuid, 'w0000001-0001-0001-0001-000000000009'::uuid, true, now() - interval '5 days'),
(gen_random_uuid(), '44444444-4444-4444-4444-444444444444'::uuid, 'w0000001-0001-0001-0001-000000000001'::uuid, true, now() - interval '6 days'),
(gen_random_uuid(), '44444444-4444-4444-4444-444444444444'::uuid, 'w0000001-0001-0001-0001-000000000007'::uuid, true, now() - interval '7 days'),
(gen_random_uuid(), '44444444-4444-4444-4444-444444444444'::uuid, 'w0000001-0001-0001-0001-000000000010'::uuid, true, now() - interval '14 days'),
(gen_random_uuid(), '44444444-4444-4444-4444-444444444444'::uuid, 'w0000001-0001-0001-0001-000000000002'::uuid, true, now() - interval '21 days');

-- Tyler Brown - LOWER ACTIVITY but consistent
INSERT INTO public.workout_logs (id, user_id, workout_id, completed, created_at) VALUES
(gen_random_uuid(), '55555555-5555-5555-5555-555555555555'::uuid, 'w0000001-0001-0001-0001-000000000006'::uuid, true, now() - interval '1 day'),
(gen_random_uuid(), '55555555-5555-5555-5555-555555555555'::uuid, 'w0000001-0001-0001-0001-000000000005'::uuid, true, now() - interval '3 days'),
(gen_random_uuid(), '55555555-5555-5555-5555-555555555555'::uuid, 'w0000001-0001-0001-0001-000000000006'::uuid, true, now() - interval '5 days'),
(gen_random_uuid(), '55555555-5555-5555-5555-555555555555'::uuid, 'w0000001-0001-0001-0001-000000000001'::uuid, false, now() - interval '8 days'),
(gen_random_uuid(), '55555555-5555-5555-5555-555555555555'::uuid, 'w0000001-0001-0001-0001-000000000006'::uuid, true, now() - interval '14 days'),
(gen_random_uuid(), '55555555-5555-5555-5555-555555555555'::uuid, 'w0000001-0001-0001-0001-000000000010'::uuid, true, now() - interval '21 days');

-- Keegan Turner - MODERATE ACTIVITY
INSERT INTO public.workout_logs (id, user_id, workout_id, completed, created_at) VALUES
(gen_random_uuid(), '66666666-6666-6666-6666-666666666666'::uuid, 'w0000001-0001-0001-0001-000000000003'::uuid, true, now() - interval '0 days'),
(gen_random_uuid(), '66666666-6666-6666-6666-666666666666'::uuid, 'w0000001-0001-0001-0001-000000000009'::uuid, true, now() - interval '2 days'),
(gen_random_uuid(), '66666666-6666-6666-6666-666666666666'::uuid, 'w0000001-0001-0001-0001-000000000001'::uuid, true, now() - interval '4 days'),
(gen_random_uuid(), '66666666-6666-6666-6666-666666666666'::uuid, 'w0000001-0001-0001-0001-000000000003'::uuid, true, now() - interval '6 days'),
(gen_random_uuid(), '66666666-6666-6666-6666-666666666666'::uuid, 'w0000001-0001-0001-0001-000000000010'::uuid, true, now() - interval '14 days');

-- Brandon Lee - VERY ACTIVE
INSERT INTO public.workout_logs (id, user_id, workout_id, completed, created_at) VALUES
(gen_random_uuid(), '77777777-7777-7777-7777-777777777777'::uuid, 'w0000001-0001-0001-0001-000000000002'::uuid, true, now() - interval '0 days'),
(gen_random_uuid(), '77777777-7777-7777-7777-777777777777'::uuid, 'w0000001-0001-0001-0001-000000000002'::uuid, true, now() - interval '1 day'),
(gen_random_uuid(), '77777777-7777-7777-7777-777777777777'::uuid, 'w0000001-0001-0001-0001-000000000009'::uuid, true, now() - interval '2 days'),
(gen_random_uuid(), '77777777-7777-7777-7777-777777777777'::uuid, 'w0000001-0001-0001-0001-000000000002'::uuid, true, now() - interval '3 days'),
(gen_random_uuid(), '77777777-7777-7777-7777-777777777777'::uuid, 'w0000001-0001-0001-0001-000000000001'::uuid, true, now() - interval '5 days');

-- Javon Harris - CONSISTENT
INSERT INTO public.workout_logs (id, user_id, workout_id, completed, created_at) VALUES
(gen_random_uuid(), '88888888-8888-8888-8888-888888888888'::uuid, 'w0000001-0001-0001-0001-000000000008'::uuid, true, now() - interval '0 days'),
(gen_random_uuid(), '88888888-8888-8888-8888-888888888888'::uuid, 'w0000001-0001-0001-0001-000000000006'::uuid, true, now() - interval '1 day'),
(gen_random_uuid(), '88888888-8888-8888-8888-888888888888'::uuid, 'w0000001-0001-0001-0001-000000000008'::uuid, true, now() - interval '2 days'),
(gen_random_uuid(), '88888888-8888-8888-8888-888888888888'::uuid, 'w0000001-0001-0001-0001-000000000001'::uuid, true, now() - interval '3 days');

-- Xavier Ross - NEWER TO PROGRAM
INSERT INTO public.workout_logs (id, user_id, workout_id, completed, created_at) VALUES
(gen_random_uuid(), '99999999-9999-9999-9999-999999999999'::uuid, 'w0000001-0001-0001-0001-000000000003'::uuid, true, now() - interval '1 day'),
(gen_random_uuid(), '99999999-9999-9999-9999-999999999999'::uuid, 'w0000001-0001-0001-0001-000000000009'::uuid, true, now() - interval '3 days'),
(gen_random_uuid(), '99999999-9999-9999-9999-999999999999'::uuid, 'w0000001-0001-0001-0001-000000000002'::uuid, false, now() - interval '5 days');

-- Darius Walker - ACTIVE
INSERT INTO public.workout_logs (id, user_id, workout_id, completed, created_at) VALUES
(gen_random_uuid(), 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa'::uuid, 'w0000001-0001-0001-0001-000000000001'::uuid, true, now() - interval '0 days'),
(gen_random_uuid(), 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa'::uuid, 'w0000001-0001-0001-0001-000000000006'::uuid, true, now() - interval '1 day'),
(gen_random_uuid(), 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa'::uuid, 'w0000001-0001-0001-0001-000000000008'::uuid, true, now() - interval '2 days'),
(gen_random_uuid(), 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa'::uuid, 'w0000001-0001-0001-0001-000000000010'::uuid, true, now() - interval '10 days');

-- Cameron White - MODERATE ACTIVITY
INSERT INTO public.workout_logs (id, user_id, workout_id, completed, created_at) VALUES
(gen_random_uuid(), 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb'::uuid, 'w0000001-0001-0001-0001-000000000006'::uuid, true, now() - interval '1 day'),
(gen_random_uuid(), 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb'::uuid, 'w0000001-0001-0001-0001-000000000007'::uuid, true, now() - interval '2 days'),
(gen_random_uuid(), 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb'::uuid, 'w0000001-0001-0001-0001-000000000001'::uuid, true, now() - interval '4 days');

-- ============================================================================
-- MEASUREMENTS (Weight tracking over 6 weeks for progress charts)
-- ============================================================================
-- Marcus Williams (183cm, trending down - athletic development)
INSERT INTO public.measurements (id, user_id, date, weight_kg, created_at) VALUES
(gen_random_uuid(), '22222222-2222-2222-2222-222222222222'::uuid, current_date - 42, 80.5, now() - interval '42 days'),
(gen_random_uuid(), '22222222-2222-2222-2222-222222222222'::uuid, current_date - 35, 80.1, now() - interval '35 days'),
(gen_random_uuid(), '22222222-2222-2222-2222-222222222222'::uuid, current_date - 28, 79.8, now() - interval '28 days'),
(gen_random_uuid(), '22222222-2222-2222-2222-222222222222'::uuid, current_date - 21, 79.5, now() - interval '21 days'),
(gen_random_uuid(), '22222222-2222-2222-2222-222222222222'::uuid, current_date - 14, 79.2, now() - interval '14 days'),
(gen_random_uuid(), '22222222-2222-2222-2222-222222222222'::uuid, current_date - 7, 78.9, now() - interval '7 days'),
(gen_random_uuid(), '22222222-2222-2222-2222-222222222222'::uuid, current_date, 78.6, now());

-- Jamal Davis (185cm, trending up - bulking phase)
INSERT INTO public.measurements (id, user_id, date, weight_kg, created_at) VALUES
(gen_random_uuid(), '33333333-3333-3333-3333-333333333333'::uuid, current_date - 42, 82.3, now() - interval '42 days'),
(gen_random_uuid(), '33333333-3333-3333-3333-333333333333'::uuid, current_date - 35, 82.5, now() - interval '35 days'),
(gen_random_uuid(), '33333333-3333-3333-3333-333333333333'::uuid, current_date - 28, 82.8, now() - interval '28 days'),
(gen_random_uuid(), '33333333-3333-3333-3333-333333333333'::uuid, current_date - 21, 83.1, now() - interval '21 days'),
(gen_random_uuid(), '33333333-3333-3333-3333-333333333333'::uuid, current_date - 14, 82.9, now() - interval '14 days'),
(gen_random_uuid(), '33333333-3333-3333-3333-333333333333'::uuid, current_date - 7, 82.7, now() - interval '7 days'),
(gen_random_uuid(), '33333333-3333-3333-3333-333333333333'::uuid, current_date, 82.5, now());

-- DeShawn Morris (196cm SF, stable weight)
INSERT INTO public.measurements (id, user_id, date, weight_kg, created_at) VALUES
(gen_random_uuid(), '44444444-4444-4444-4444-444444444444'::uuid, current_date - 42, 89.2, now() - interval '42 days'),
(gen_random_uuid(), '44444444-4444-4444-4444-444444444444'::uuid, current_date - 35, 89.5, now() - interval '35 days'),
(gen_random_uuid(), '44444444-4444-4444-4444-444444444444'::uuid, current_date - 28, 89.8, now() - interval '28 days'),
(gen_random_uuid(), '44444444-4444-4444-4444-444444444444'::uuid, current_date - 21, 90.1, now() - interval '21 days'),
(gen_random_uuid(), '44444444-4444-4444-4444-444444444444'::uuid, current_date - 14, 89.9, now() - interval '14 days'),
(gen_random_uuid(), '44444444-4444-4444-4444-444444444444'::uuid, current_date - 7, 89.7, now() - interval '7 days'),
(gen_random_uuid(), '44444444-4444-4444-4444-444444444444'::uuid, current_date, 89.5, now());

-- Tyler Brown (208cm C, trending up - strength building)
INSERT INTO public.measurements (id, user_id, date, weight_kg, created_at) VALUES
(gen_random_uuid(), '55555555-5555-5555-5555-555555555555'::uuid, current_date - 42, 105.3, now() - interval '42 days'),
(gen_random_uuid(), '55555555-5555-5555-5555-555555555555'::uuid, current_date - 28, 105.8, now() - interval '28 days'),
(gen_random_uuid(), '55555555-5555-5555-5555-555555555555'::uuid, current_date - 14, 106.2, now() - interval '14 days'),
(gen_random_uuid(), '55555555-5555-5555-5555-555555555555'::uuid, current_date, 106.5, now());

-- Keegan Turner (187cm PG, stable)
INSERT INTO public.measurements (id, user_id, date, weight_kg, created_at) VALUES
(gen_random_uuid(), '66666666-6666-6666-6666-666666666666'::uuid, current_date - 42, 83.1, now() - interval '42 days'),
(gen_random_uuid(), '66666666-6666-6666-6666-666666666666'::uuid, current_date - 28, 82.8, now() - interval '28 days'),
(gen_random_uuid(), '66666666-6666-6666-6666-666666666666'::uuid, current_date - 14, 82.5, now() - interval '14 days'),
(gen_random_uuid(), '66666666-6666-6666-6666-666666666666'::uuid, current_date, 82.2, now());

-- Brandon Lee (191cm SG, trending up)
INSERT INTO public.measurements (id, user_id, date, weight_kg, created_at) VALUES
(gen_random_uuid(), '77777777-7777-7777-7777-777777777777'::uuid, current_date - 42, 86.5, now() - interval '42 days'),
(gen_random_uuid(), '77777777-7777-7777-7777-777777777777'::uuid, current_date - 28, 86.8, now() - interval '28 days'),
(gen_random_uuid(), '77777777-7777-7777-7777-777777777777'::uuid, current_date - 14, 87.1, now() - interval '14 days'),
(gen_random_uuid(), '77777777-7777-7777-7777-777777777777'::uuid, current_date, 87.3, now());

-- Javon Harris (211cm C, trending up - monster gains)
INSERT INTO public.measurements (id, user_id, date, weight_kg, created_at) VALUES
(gen_random_uuid(), '88888888-8888-8888-8888-888888888888'::uuid, current_date - 42, 111.2, now() - interval '42 days'),
(gen_random_uuid(), '88888888-8888-8888-8888-888888888888'::uuid, current_date - 28, 111.8, now() - interval '28 days'),
(gen_random_uuid(), '88888888-8888-8888-8888-888888888888'::uuid, current_date - 14, 112.1, now() - interval '14 days'),
(gen_random_uuid(), '88888888-8888-8888-8888-888888888888'::uuid, current_date, 112.4, now());

-- Xavier Ross (184cm PG, newer)
INSERT INTO public.measurements (id, user_id, date, weight_kg, created_at) VALUES
(gen_random_uuid(), '99999999-9999-9999-9999-999999999999'::uuid, current_date - 28, 81.1, now() - interval '28 days'),
(gen_random_uuid(), '99999999-9999-9999-9999-999999999999'::uuid, current_date - 14, 80.8, now() - interval '14 days'),
(gen_random_uuid(), '99999999-9999-9999-9999-999999999999'::uuid, current_date, 80.5, now());

-- Darius Walker (198cm SF, trending down)
INSERT INTO public.measurements (id, user_id, date, weight_kg, created_at) VALUES
(gen_random_uuid(), 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa'::uuid, current_date - 42, 92.4, now() - interval '42 days'),
(gen_random_uuid(), 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa'::uuid, current_date - 28, 92.1, now() - interval '28 days'),
(gen_random_uuid(), 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa'::uuid, current_date - 14, 91.8, now() - interval '14 days'),
(gen_random_uuid(), 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa'::uuid, current_date, 91.5, now());

-- Cameron White (205cm PF, trending up - athletic development)
INSERT INTO public.measurements (id, user_id, date, weight_kg, created_at) VALUES
(gen_random_uuid(), 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb'::uuid, current_date - 42, 100.2, now() - interval '42 days'),
(gen_random_uuid(), 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb'::uuid, current_date - 28, 100.7, now() - interval '28 days'),
(gen_random_uuid(), 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb'::uuid, current_date - 14, 101.1, now() - interval '14 days'),
(gen_random_uuid(), 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb'::uuid, current_date, 101.5, now());

-- ============================================================================
-- WORKOUT ASSIGNMENTS (Recent assignments from coach to athletes)
-- ============================================================================
INSERT INTO public.workout_assignments (
  id,
  coach_id,
  athlete_id,
  workout_id,
  assigned_at,
  notes
) VALUES
(gen_random_uuid(), '11111111-1111-1111-1111-111111111111'::uuid, '22222222-2222-2222-2222-222222222222'::uuid, 'w0000001-0001-0001-0001-000000000001'::uuid, now() - interval '2 days', 'Focus on conditioning and pace. Push the tempo hard today.'),
(gen_random_uuid(), '11111111-1111-1111-1111-111111111111'::uuid, '33333333-3333-3333-3333-333333333333'::uuid, 'w0000001-0001-0001-0001-000000000002'::uuid, now() - interval '1 day', 'Push shooting volume. Game-speed reps only. 100+ shots.'),
(gen_random_uuid(), '11111111-1111-1111-1111-111111111111'::uuid, '44444444-4444-4444-4444-444444444444'::uuid, 'w0000001-0001-0001-0001-000000000007'::uuid, now() - interval '6 hours', 'Finishing package. Emphasize footwork and finishing through contact.'),
(gen_random_uuid(), '11111111-1111-1111-1111-111111111111'::uuid, '55555555-5555-5555-5555-555555555555'::uuid, 'w0000001-0001-0001-0001-000000000006'::uuid, now() - interval '8 hours', 'Strength focus. Heavy lower body. Target 8 reps on main compounds.'),
(gen_random_uuid(), '11111111-1111-1111-1111-111111111111'::uuid, '66666666-6666-6666-6666-666666666666'::uuid, 'w0000001-0001-0001-0001-000000000003'::uuid, now() - interval '12 hours', 'Ball handling flow. Build consistency and soft touch on all moves.'),
(gen_random_uuid(), '11111111-1111-1111-1111-111111111111'::uuid, '77777777-7777-7777-7777-777777777777'::uuid, 'w0000001-0001-0001-0001-000000000002'::uuid, now() - interval '1 day', 'Game-speed shooting. High volume, game pace. Focus on balance.'),
(gen_random_uuid(), '11111111-1111-1111-1111-111111111111'::uuid, '88888888-8888-8888-8888-888888888888'::uuid, 'w0000001-0001-0001-0001-000000000008'::uuid, now() - interval '3 days', 'Defensive footwork. On-ball intensity and lateral slide work.'),
(gen_random_uuid(), '11111111-1111-1111-1111-111111111111'::uuid, '99999999-9999-9999-9999-999999999999'::uuid, 'w0000001-0001-0001-0001-000000000009'::uuid, now() - interval '4 days', 'Handle into shot. Creation drills and pullup jumpers.'),
(gen_random_uuid(), '11111111-1111-1111-1111-111111111111'::uuid, 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa'::uuid, 'w0000001-0001-0001-0001-000000000010'::uuid, now() - interval '5 days', 'Weekly test workout. Benchmark and measure progress this week.'),
(gen_random_uuid(), '11111111-1111-1111-1111-111111111111'::uuid, 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb'::uuid, 'w0000001-0001-0001-0001-000000000005'::uuid, now() - interval '7 days', 'Recovery and mobility. Active rest day protocol. Focus on flexibility.');

COMMIT;
