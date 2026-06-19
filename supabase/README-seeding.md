# Supabase Seeding Guide

## Overview

This directory contains the seed data configuration for Coach Jake local development and staging environments. The seed process populates the database with realistic basketball coaching SaaS data to support testing all dashboards, analytics, and assignment flows.

**⚠️ WARNING: Local/Staging Only**
These seed files are designed for local development and staging environments only. Do NOT run these seeds in production.

---

## File Structure

```
supabase/
├── seed.sql                  # Main seed data (profiles, workouts, logs, measurements, assignments)
├── README-seeding.md         # This file
├── dev-seed-notes.md         # Detailed notes on seeded data
└── migrations/               # Schema migrations (separate from seed data)
```

---

## What Gets Seeded

### Profiles

- **1 Coach Account**: Jake Thompson (coach@example.com)
- **10 Athlete Accounts**: Varying skill levels, archetypes, and activity patterns
  - Point guards, shooters, slashers, big men, and prospect archetypes
  - Pre-season, in-season, and off-season training contexts
  - Realistic goals, target metrics, and player attributes

### Workouts

- **12 Workout Templates**: Court conditioning, shooting, ball handling, footwork, strength, recovery, finishing, defense, etc.
- Each workout includes realistic title, description, and active status
- Created with timestamps to support filtering and sorting

### Workout Logs

- **70+ Log Entries**: Completion history across all athletes
- Dates span 6+ weeks with realistic patterns:
  - Daily/multi-day streaks (for streak calculation)
  - Gaps and missed days (for consistency metrics)
  - Mix of completed and incomplete attempts
  - Same-day, weekly, and older entries

### Measurements

- **40+ Weight Entries**: Progress tracking for each athlete
- 6+ weeks of historical data per athlete
- Realistic weight trends:
  - Some athletes trending down (muscle gain focus)
  - Some trending up (strength building)
  - Some stable (maintenance phase)

### Workout Assignments

- **10 Assignments**: Coach → Athlete assignments
- Mix of recent and older assignments
- Includes coaching notes and real-world assignment context

---

## How to Run Locally

### Prerequisites

- Local Supabase instance running: `supabase start`
- Your local Supabase project is initialized: `supabase init`
- You have access to the local Supabase dashboard

### Reset and Seed the Database

```bash
# From the project root directory

# 1. Reset your local database (clears all data and runs all migrations, then runs seed.sql)
supabase db reset

# This command:
# - Runs all migration files in supabase/migrations/
# - Clears any existing data
# - Runs supabase/seed.sql to insert demo data
# - Returns confirmation in the terminal
```

### Verify the Seed Completed

After running `supabase db reset`, check the Supabase dashboard:

```bash
# Open the local dashboard
supabase start
# Then navigate to: http://localhost:54323 (or the URL shown in terminal)
# Log in with your local credentials
# Check the following tables in the SQL Editor:
# - profiles (should have 11 rows: 1 coach + 10 athletes)
# - workouts (should have 12 rows)
# - workout_logs (should have 70+ rows)
# - measurements (should have 40+ rows)
# - workout_assignments (should have 10 rows)
```

Or use SQL to verify:

```sql
-- Check profiles
SELECT user_id, full_name, role, player_archetype FROM public.profiles;

-- Check workouts
SELECT id, title, is_active FROM public.workouts;

-- Check recent logs (for dashboard)
SELECT COUNT(*) as total_logs FROM public.workout_logs
WHERE created_at > now() - interval '7 days';

-- Check measurements
SELECT user_id, date, weight_kg FROM public.measurements
ORDER BY user_id, date DESC;

-- Check assignments
SELECT coach_id, athlete_id, workout_id, assigned_at FROM public.workout_assignments;
```

---

## Testing Local Auth Users

### Option 1: Using Supabase UI (Recommended for Local Dev)

1. Open the Supabase dashboard: `http://localhost:54323`
2. Go to **Authentication > Users**
3. Create test users manually with these emails:
   - `coach-jake@example.com` (password: any)
   - `marcus.williams@example.com` (password: any)
   - `jamal.davis@example.com` (password: any)
   - etc. (see `dev-seed-notes.md` for full list)

4. Match the email to the profile in the seed data (same email in profiles table)

### Option 2: Manual SQL Inserts (Advanced)

If you need to seed auth users directly, Supabase provides a special local-only approach:

```sql
-- LOCAL DEVELOPMENT ONLY - This is safe only in local Docker instances
-- Do NOT attempt this in staging or production

-- Insert into auth.users
INSERT INTO auth.users (
  id,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  raw_app_meta_data,
  raw_user_meta_data,
  is_super_admin,
  role,
  aud
) VALUES (
  '11111111-1111-1111-1111-111111111111'::uuid,
  'coach-jake@example.com',
  crypt('password123', gen_salt('bf')),
  now(),
  now(),
  now(),
  '{"provider":"email","providers":["email"]}'::jsonb,
  '{}'::jsonb,
  false,
  'authenticated',
  'authenticated'
);

-- Insert into auth.identities
INSERT INTO auth.identities (
  id,
  user_id,
  identity_data,
  provider,
  last_sign_in_at,
  created_at,
  updated_at
) VALUES (
  '11111111-1111-1111-1111-111111111111'::uuid,
  '11111111-1111-1111-1111-111111111111'::uuid,
  format('{"sub":"%s","email":"coach-jake@example.com"}', '11111111-1111-1111-1111-111111111111'::uuid)::jsonb,
  'email',
  now(),
  now(),
  now()
);
```

**NOTE**: This approach requires the `pgcrypto` extension enabled locally. Use the UI method above instead.

---

## Dashboards to Test After Seeding

After running the seed, test these flows to verify data integrity:

### Athlete Dashboard

- [ ] Athlete can see their profile with measurements
- [ ] Weight chart shows 6+ weeks of progress
- [ ] Recent workouts display correctly
- [ ] Streak counter shows current activity level
- [ ] Weekly workout count is accurate

### Coach Dashboard

- [ ] Total athletes count shows 10
- [ ] Active this week metric updates correctly
- [ ] Average completion % displays
- [ ] Athlete roster shows all 10 athletes with status badges
- [ ] Search filters athletes by name/email
- [ ] Status badges (Active/Rest/At-Risk) color-code correctly
- [ ] Assign Workout modal opens and lists all 12 workouts

### Workouts Page

- [ ] All 12 workouts display
- [ ] Workouts can be filtered/sorted
- [ ] Descriptions are readable and realistic

### Leaderboard

- [ ] Athletes rank by weekly completions
- [ ] Streaks display correctly
- [ ] Top performers are highlighted

### Progress Charts

- [ ] Weight progress shows realistic trends
- [ ] Charts display 6+ weeks of data
- [ ] Trendlines are accurate

---

## Resetting Between Test Runs

To clear all data and re-seed fresh:

```bash
# Clears all data and runs migrations + seed again
supabase db reset

# If you only want to clear the seed (not migrations):
supabase db clean --dry-run  # Preview what will be cleared
supabase db clean            # Clear tables
# Then manually re-run seed.sql via the dashboard or:
# cat supabase/seed.sql | supabase sql
```

---

## Data Consistency and RLS

All seeded data respects Supabase Row-Level Security (RLS) policies:

- Athletes can only see their own profiles, logs, and measurements
- Coaches can see all assigned athletes
- Auth user IDs must match profile user_ids for queries to work

If RLS is preventing access after seeding, verify:

1. Auth user ID matches the profile user_id
2. The auth user has the correct role
3. RLS policies are enabled in the Supabase dashboard

---

## Staging and Preview Deployments

To use the same seed data in staging:

1. **Export the seed file** (already included: `supabase/seed.sql`)
2. **Run migrations** in staging: `supabase db push --linked --dry-run` (preview), then push
3. **Apply seed**: Connect to staging Supabase and run `seed.sql` or `supabase db reset` if supported
4. **Verify in staging dashboard** like you did locally

For CI/CD pipelines:

- Migrations run automatically during deploy
- Seed runs only in non-production environments (configure in your deploy script)
- Use environment variables to skip seed in production: `if [ "$ENVIRONMENT" != "production" ]; then run_seed.sh; fi`

---

## Production Safety Notes

🚫 **DO NOT USE THESE SEEDS IN PRODUCTION**

- Demo user IDs and emails are hardcoded and not secure
- Seed file assumes no existing data
- Auth user passwords are simple and not encrypted in the seed
- Seed is designed for development speed, not security

For production data management:

- Use manual SQL migrations for schema changes
- Use your application's admin dashboard to add real users
- Never run arbitrary seed files in production
- Use proper database backup and restore procedures

---

## Troubleshooting

### Issue: "relation does not exist" error

**Cause**: Migrations haven't been applied yet
**Solution**: Run `supabase db push` first, then `supabase db reset`

### Issue: Duplicate key error

**Cause**: Seed was run twice without clearing
**Solution**: Run `supabase db reset` to clear and re-seed

### Issue: Auth users don't match profiles

**Cause**: Auth user IDs don't match profile user_ids
**Solution**: Use the UI method to create auth users with matching emails, then verify user_id in profiles table

### Issue: RLS blocking access

**Cause**: Auth user doesn't have permission to see data
**Solution**: Verify RLS policies in Supabase dashboard > Authentication > Policies

---

## Questions or Issues?

Refer to:

- `dev-seed-notes.md` for detailed data documentation
- Supabase docs: https://supabase.com/docs/guides/cli/seeding-your-database
- Coach Jake docs in README.md
