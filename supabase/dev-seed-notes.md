# Development Seed Data Documentation

This file documents all records created by `supabase/seed.sql` for reference during local development and testing.

---

## Summary

- **Coach Accounts**: 1
- **Athlete Accounts**: 10
- **Workouts**: 12
- **Workout Logs**: 70+
- **Measurements**: 40+
- **Workout Assignments**: 10

---

## Coach Profile

### Jake Thompson (Coach)

```
User ID:              11111111-1111-1111-1111-111111111111
Email:                coach-jake@example.com
Full Name:            Jake Thompson
Age:                  38
Height:               188 cm
Weight:               82 kg
Role:                 coach
Training Context:     coaching
Goals:                Develop elite athletes
Weekly Sessions:      4
Session Length:       90 minutes
Sleep Target:         8-9 hours
Availability:         morning, afternoon
Profile Status:       Fully Scouted
Created:              ~180 days ago
```

**Purpose**: Coach dashboard, assignment flows, profile management testing

---

## Athlete Profiles

All athletes are seeded with realistic archetypes, development goals, and training contexts.

### 1. Marcus Williams (Point Guard, D1 Prospect)

```
User ID:              22222222-2222-2222-2222-222222222222
Email:                marcus.williams@example.com
Full Name:            Marcus Williams
Age:                  19
Height:               183 cm
Weight:               79 kg → 78.6 kg (trending down)
Role:                 athlete
Archetype:            Prospect (Point Guard)
Playstyle:            65 Team/35 ISO, 35 Shooter/65 Slasher, 50/50 Finesse-Power
Training Context:     in-season
Goals:                D1 Offer, Increase 3PT to 35%
Weekly Sessions:      5
Session Length:       75 minutes
Sleep Target:         7-8 hours
Availability:         afternoon, evening
Activity Level:       VERY ACTIVE (5+ logs this week, 4+ day streak)
```

**Use Case**: High performer for leaderboard, dashboard showcase, streak calculation

---

### 2. Jamal Davis (Shooting Guard, Volume Shooter)

```
User ID:              33333333-3333-3333-3333-333333333333
Email:                jamal.davis@example.com
Full Name:            Jamal Davis
Age:                  18
Height:               185 cm
Weight:               82.3 kg → 82.5 kg (slight bulk)
Role:                 athlete
Archetype:            Shooter
Playstyle:            25 Team/75 ISO, 80 Shooter/20 Slasher, 55/45 Finesse-Power
Training Context:     pre-season
Goals:                30% 3PT, 20 shot attempts per game
Weekly Sessions:      6
Session Length:       90 minutes
Sleep Target:         8 hours
Availability:         afternoon, evening
Activity Level:       MODERATE-LOW (8 logs, some gaps, 1 missed day)
```

**Use Case**: Inconsistent athlete for "at-risk" calculations, missed workout testing

---

### 3. DeShawn Morris (Small Forward, Explosive Finisher)

```
User ID:              44444444-4444-4444-4444-444444444444
Email:                deshawn.morris@example.com
Full Name:            DeShawn Morris
Age:                  20
Height:               196 cm
Weight:               89.2 kg → 89.5 kg (stable)
Role:                 athlete
Archetype:            Slasher
Playstyle:            35 Team/65 ISO, 25 Shooter/75 Slasher, 75 Power/25 Finesse
Training Context:     in-season
Goals:                NBA Scout Interest, Reduce turnovers <2 per game
Weekly Sessions:      5
Session Length:       75 minutes
Sleep Target:         7-8 hours
Availability:         morning, afternoon
Activity Level:       VERY ACTIVE (10 logs, 7-day streak)
```

**Use Case**: Top performer, streak leader, dashboard hero card

---

### 4. Tyler Brown (Center, Rim Runner)

```
User ID:              55555555-5555-5555-5555-555555555555
Email:                tyler.brown@example.com
Full Name:            Tyler Brown
Age:                  21
Height:               208 cm
Weight:               105.3 kg → 106.5 kg (strength building)
Role:                 athlete
Archetype:            Big Man
Playstyle:            20 Team/80 ISO, 15 Shooter/85 Slasher, 85 Power/15 Finesse
Training Context:     in-season
Goals:                300 lb squat, Elite conditioning
Weekly Sessions:      5
Session Length:       90 minutes
Sleep Target:         8-9 hours
Availability:         morning, afternoon
Activity Level:       LOW-MODERATE (6 logs with 1 miss, gaps)
```

**Use Case**: Big man archetype, weight gain tracking, strength focus

---

### 5. Keegan Turner (Point Guard, Unselfish)

```
User ID:              66666666-6666-6666-6666-666666666666
Email:                keegan.turner@example.com
Full Name:            Keegan Turner
Age:                  19
Height:               187 cm
Weight:               83.1 kg → 82.2 kg (trending down)
Role:                 athlete
Archetype:            Playmaker
Playstyle:            75 Team/25 ISO, 40 Shooter/60 Slasher, 45/55 Finesse-Power
Training Context:     pre-season
Goals:                6 APG average, <2 turnovers
Weekly Sessions:      5
Session Length:       75 minutes
Sleep Target:         7-8 hours
Availability:         afternoon, evening
Activity Level:       MODERATE (5 logs)
```

**Use Case**: Playmaker archetype, ball-handling focus, pre-season training

---

### 6. Brandon Lee (Shooting Guard, 3PT Specialist)

```
User ID:              77777777-7777-7777-7777-777777777777
Email:                brandon.lee@example.com
Full Name:            Brandon Lee
Age:                  18
Height:               191 cm
Weight:               86.5 kg → 87.3 kg (moderate gain)
Role:                 athlete
Archetype:            Shooter
Playstyle:            15 Team/85 ISO, 85 Shooter/15 Slasher, 50/50 Finesse-Power
Training Context:     off-season
Goals:                40% 3PT from three, Form consistency daily
Weekly Sessions:      4
Session Length:       75 minutes
Sleep Target:         8 hours
Availability:         afternoon
Activity Level:       VERY ACTIVE (5 logs, consecutive days)
```

**Use Case**: Pure shooter archetype, off-season focus, consistency tracking

---

### 7. Javon Harris (Center, Defensive Anchor)

```
User ID:              88888888-8888-8888-8888-888888888888
Email:               javon.harris@example.com
Full Name:            Javon Harris
Age:                  22
Height:               211 cm
Weight:               111.2 kg → 112.4 kg (monster gains)
Role:                 athlete
Archetype:            Big Man
Playstyle:            10 Team/90 ISO, 5 Shooter/95 Slasher, 90 Power/10 Finesse
Training Context:     in-season
Goals:                Elite defense, 2 blocks per game
Weekly Sessions:      5
Session Length:       90 minutes
Sleep Target:         8-9 hours
Availability:         morning, afternoon
Activity Level:       MODERATE (4 logs, consistent)
```

**Use Case**: Top-tier big man, elite athlete profile, strength metrics

---

### 8. Xavier Ross (Point Guard, Ball Handler)

```
User ID:              99999999-9999-9999-9999-999999999999
Email:                xavier.ross@example.com
Full Name:            Xavier Ross
Age:                  19
Height:               184 cm
Weight:               81.1 kg → 80.5 kg (trending down)
Role:                 athlete
Archetype:            Playmaker
Playstyle:            70 Team/30 ISO, 35 Shooter/65 Slasher, 55/45 Finesse-Power
Training Context:     pre-season
Goals:                Assist leader 5+ APG, Decision making IQ
Weekly Sessions:      5
Session Length:       75 minutes
Sleep Target:         7-8 hours
Availability:         afternoon, evening
Activity Level:       LOW (3 logs, newer to program)
```

**Use Case**: Newer athlete profile, incomplete activity, playmaker focus

---

### 9. Darius Walker (Small Forward, All-Around)

```
User ID:              aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa
Email:                darius.walker@example.com
Full Name:            Darius Walker
Age:                  20
Height:               198 cm
Weight:               92.4 kg → 91.5 kg (trending down)
Role:                 athlete
Archetype:            Prospect
Playstyle:            50 Team/50 ISO, 50 Shooter/50 Slasher, 60/40 Power-Finesse
Training Context:     in-season
Goals:                Versatile multi-skill player, 2-3 position flexibility
Weekly Sessions:      5
Session Length:       90 minutes
Sleep Target:         8 hours
Availability:         morning, afternoon
Activity Level:       MODERATE (4 logs)
```

**Use Case**: Versatile prospect, balanced archetype, multi-position development

---

### 10. Cameron White (Power Forward, Athletic Big)

```
User ID:              bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb
Email:                cameron.white@example.com
Full Name:            Cameron White
Age:                  19
Height:               205 cm
Weight:               100.2 kg → 101.5 kg (athletic development)
Role:                 athlete
Archetype:            Big Man
Playstyle:            25 Team/75 ISO, 20 Shooter/80 Slasher, 80 Power/20 Finesse
Training Context:     pre-season
Goals:                NBA Draft lottery watch, Advanced footwork
Weekly Sessions:      5
Session Length:       90 minutes
Sleep Target:         8-9 hours
Availability:         morning, afternoon
Activity Level:       MODERATE (3 logs, newer to program)
```

**Use Case**: Prospect big man, athletic development, pre-season ramp-up

---

## Workouts (12 Total)

All workouts are active (is_active = true) and have realistic descriptions for basketball training.

| ID       | Title                | Description                                                           | Duration Focus | Created  |
| -------- | -------------------- | --------------------------------------------------------------------- | -------------- | -------- |
| w...0001 | Court Conditioning   | High-intensity circuit, sprints, transitions, lane changes, game-pace | Conditioning   | -90 days |
| w...0002 | Game Speed Shooting  | Fatigue shooting, game-pace footwork, 100+ shot volume                | Shooting       | -85 days |
| w...0003 | Ball Handling Flow   | Two-ball control, crossovers, behind-back, rhythm                     | Ball Handling  | -80 days |
| w...0004 | Explosive First Step | Acceleration, burst drills, quick directional change                  | Agility        | -75 days |
| w...0005 | Recovery & Mobility  | Stretching, foam rolling, yoga, activation, flexibility               | Recovery       | -70 days |
| w...0006 | Lower Body Strength  | Squats, Bulgarian splits, plyometrics, explosive leg work             | Strength       | -65 days |
| w...0007 | Finishing Package    | Footwork at rim, pivot moves, high-percentage finishes                | Finishing      | -60 days |
| w...0008 | Defensive Footwork   | Slides, closeouts, on-ball intensity, positioning                     | Defense        | -55 days |
| w...0009 | Handle Into Shot     | Creation drills, pullup jumpers, shot-creation footwork               | Creation       | -50 days |
| w...0010 | Weekly Test Workout  | Benchmark for progress tracking, same each week                       | Testing        | -45 days |
| w...0011 | Off-Season Program   | Speed, agility, strength, flexibility total body                      | Off-Season     | -40 days |
| w...0012 | Pre-Game Warm-Up     | Dynamic stretching, activation, game simulation                       | Warm-Up        | -35 days |

**Usage**:

- Conditioning, Shooting, Ball Handling, Strength, Finishing, Defense = Primary focus
- Recovery, Agility, Testing = Secondary/support
- Off-Season, Pre-Game = Context-specific

---

## Workout Logs (70+ Entries)

Logs are distributed across all 10 athletes with varied patterns to test dashboard calculations.

### Activity Patterns

**Marcus Williams** (22222222...): 10 logs

- Pattern: VERY ACTIVE with one missed day
- Streak: 5 consecutive days
- Coverage: 0-21 days ago
- Completion: 90%

**Jamal Davis** (33333333...): 8 logs

- Pattern: INCONSISTENT with gaps
- Streak: 1 day (broken patterns)
- Coverage: 0-30 days ago
- Completion: 87.5%

**DeShawn Morris** (44444444...): 10 logs

- Pattern: ELITE CONSISTENT with 7-day streak
- Streak: 7 consecutive days
- Coverage: 0-21 days ago
- Completion: 100%

**Tyler Brown** (55555555...): 6 logs

- Pattern: MODERATE with 1 missed day
- Streak: 2-3 days
- Coverage: 1-21 days ago
- Completion: 83%

**Keegan Turner** (66666666...): 5 logs

- Pattern: MODERATE CONSISTENT
- Streak: 2 consecutive days
- Coverage: 0-14 days ago
- Completion: 100%

**Brandon Lee** (77777777...): 5 logs

- Pattern: VERY ACTIVE, short consecutive dates
- Streak: 4 consecutive days
- Coverage: 0-5 days ago
- Completion: 100%

**Javon Harris** (88888888...): 4 logs

- Pattern: CONSISTENT MODERATE
- Streak: 3 consecutive days
- Coverage: 0-3 days ago
- Completion: 100%

**Xavier Ross** (99999999...): 3 logs

- Pattern: NEWER TO PROGRAM, one miss
- Streak: 1 consecutive day
- Coverage: 1-5 days ago
- Completion: 66%

**Darius Walker** (aaaaaaaa...): 4 logs

- Pattern: ACTIVE MODERATE
- Streak: 3 consecutive days
- Coverage: 0-10 days ago
- Completion: 100%

**Cameron White** (bbbbbbbb...): 3 logs

- Pattern: NEWER, moderate
- Streak: 2 consecutive days
- Coverage: 1-4 days ago
- Completion: 100%

### Log Distribution for Dashboard Testing

- **Today's Date** (now()): 3 athletes
- **This Week** (past 7 days): 7+ athletes with varied counts
- **Last Week** (7-14 days): 5+ athletes
- **Older** (15+ days): 4+ athletes (for historical analysis)

**Use Case**: Tests weekly completion metrics, streak calculations, recent activity filtering

---

## Measurements (40+ Entries)

Weight progression data for all 10 athletes over 6 weeks.

### Measurement Patterns

**Marcus Williams**: 7 measurements

- Trend: ↓ 80.5 → 78.6 kg (athletic development, muscle focus)
- Cadence: Every 7 days, very consistent
- Use: Weight loss/recomposition demo

**Jamal Davis**: 7 measurements

- Trend: ↑ 82.3 → 82.5 kg (bulk phase, slight gain)
- Cadence: Every 7 days
- Use: Weight gain tracking

**DeShawn Morris**: 7 measurements

- Trend: Stable 89.2 → 89.5 kg (maintenance)
- Cadence: Every 7 days
- Use: Stable weight reference

**Tyler Brown**: 4 measurements

- Trend: ↑ 105.3 → 106.5 kg (strength building, big gains)
- Cadence: Every 14 days
- Use: Strength phase, big man development

**Keegan Turner**: 4 measurements

- Trend: ↓ 83.1 → 82.2 kg (lean out phase)
- Cadence: Every 14 days
- Use: Pre-season lean down

**Brandon Lee**: 4 measurements

- Trend: ↑ 86.5 → 87.3 kg (off-season bulking)
- Cadence: Every 14 days
- Use: Off-season strength gain

**Javon Harris**: 4 measurements

- Trend: ↑ 111.2 → 112.4 kg (monster gains, elite athlete)
- Cadence: Every 14 days
- Use: Big man strength progression

**Xavier Ross**: 3 measurements

- Trend: ↓ 81.1 → 80.5 kg (newer, shorter history)
- Cadence: Every 14 days
- Use: Newer athlete with minimal history

**Darius Walker**: 4 measurements

- Trend: ↓ 92.4 → 91.5 kg (trending lean)
- Cadence: Every 14 days
- Use: Recomposition tracking

**Cameron White**: 4 measurements

- Trend: ↑ 100.2 → 101.5 kg (athletic development, pre-season)
- Cadence: Every 14 days
- Use: Young big man development

### Chart Testing

- **6-week history**: Marcus, Jamal, DeShawn (great for line chart)
- **4-week history**: Most others (baseline)
- **3-week history**: Xavier Ross (newer athlete)
- **Various trends**: Down (lean), up (bulk), stable (maintenance)

**Use Case**: Weight progress charts, trend analysis, recomposition tracking

---

## Workout Assignments (10 Total)

Coach (11111111...) assigned workouts to each athlete. Assignments span recent dates to show active work.

| Coach  | Athlete   | Workout                        | Assigned  | Notes                    |
| ------ | --------- | ------------------------------ | --------- | ------------------------ |
| Jake T | Marcus W  | Court Conditioning (w...0001)  | -2 days   | Focus on pace            |
| Jake T | Jamal D   | Game Speed Shooting (w...0002) | -1 day    | Push volume 100+ shots   |
| Jake T | DeShawn M | Finishing Package (w...0007)   | -6 hours  | Footwork & contact       |
| Jake T | Tyler B   | Lower Body Strength (w...0006) | -8 hours  | Heavy compounds          |
| Jake T | Keegan T  | Ball Handling Flow (w...0003)  | -12 hours | Consistency              |
| Jake T | Brandon L | Game Speed Shooting (w...0002) | -1 day    | Game pace focus          |
| Jake T | Javon H   | Defensive Footwork (w...0008)  | -3 days   | Intensity & slides       |
| Jake T | Xavier R  | Handle Into Shot (w...0009)    | -4 days   | Creation drills          |
| Jake T | Darius W  | Weekly Test Workout (w...0010) | -5 days   | Benchmark                |
| Jake T | Cameron W | Recovery & Mobility (w...0005) | -7 days   | Flexibility & activation |

**Pattern**:

- All athletes have at least one active assignment
- Assignments are recent (within last week)
- Notes reflect coaching feedback
- Each assignment aligns with athlete archetype/goals

**Use Case**:

- Coach dashboard assignment list
- Athlete dashboard assigned workout view
- Assignment history tracking

---

## Key Assumptions & Notes

### Auth Setup

- The profiles are seeded with hardcoded UUIDs for consistency
- Corresponding auth.users records must be created manually via Supabase UI or auth API
- Seed does NOT create auth records (separate concern)
- Email in profile must match auth user email for queries to work

### Timezone

- All timestamps use `now()` for database server time
- Dates are relative (now() - interval 'X days')
- Adjust seed.sql if server timezone differs from local

### RLS Policies

- Seed data respects all existing RLS policies
- Athletes can only see their own data
- Coaches can see assigned athletes
- Verify RLS is not blocking after seeding

### Data Volume

- 70+ logs is enough for dashboard metrics but not production scale
- For stress testing, duplicate seed.sql and adjust UUIDs/timestamps
- For performance testing, seed 1000+ logs per athlete

### Realistic Patterns

- Streaks calculated from consecutive days in logs
- Weekly count = 7 days lookback
- Completion % = completed / total logs
- At-risk = no logs in past 3 weeks
- Active = logs in past 3 weeks
- Rest = no logs past 3-6 weeks

---

## Updating Seeds

To add or modify seed data:

1. **Edit `supabase/seed.sql`** directly with new INSERT statements
2. **Run `supabase db reset`** to clear and re-seed
3. **Verify in dashboard** with SQL checks
4. **Document changes** in this file (dev-seed-notes.md)

Example: Add a new athlete:

```sql
INSERT INTO public.profiles (user_id, email, full_name, age, height_cm, weight_kg, role, ...)
VALUES ('ccccccc...'::uuid, 'new.athlete@example.com', 'New Athlete', 20, 190, 85, 'athlete', ...);
```

---

## Questions?

Refer to:

- README-seeding.md for setup instructions
- seed.sql for actual data
- Supabase docs for schema: https://supabase.com/docs
