# Coach Jake Codebase Comprehensive Inspection

**Generated:** 2026-06-18  
**Framework:** Next.js 16.1.0 + React 19.2.3 + Supabase + Tailwind CSS 4

---

## 1. DATABASE SCHEMA

### Tables Summary

The Supabase schema uses **Row-Level Security (RLS)** policies for all data tables. Key tables:

| Table                 | Purpose                                       | Key Fields                                                                     |
| --------------------- | --------------------------------------------- | ------------------------------------------------------------------------------ |
| `profiles`            | User accounts (athletes & coaches)            | `user_id` (PK), `email`, `full_name`, `role`, `age`, `height_cm`, `weight_kg`  |
| `workouts`            | Exercise programs (created by system/coaches) | `id` (PK), `title`, `description`, `is_active`, `created_at`                   |
| `workout_logs`        | Activity log (NOT `workout_sessions`)         | `id` (PK), `user_id`, `workout_id`, `date`, `completed`, `notes`, `created_at` |
| `measurements`        | Weight tracking history                       | `id` (PK), `user_id`, `date`, `weight_kg`, `created_at`                        |
| `workout_assignments` | Coach → Athlete assignments                   | `id` (PK), `athlete_id`, `workout_id`, `assigned_by`, `created_at`             |
| `contacts`            | Contact form submissions                      | `id` (PK), `name`, `email`, `message`, `created_at`                            |

### **Detailed Table Structures**

#### **profiles**

```sql
user_id uuid PRIMARY KEY REFERENCES auth.users(id)
email varchar NOT NULL
full_name varchar
age integer
height_cm integer
weight_kg decimal
role varchar CHECK (role IN ('athlete', 'coach'))
created_at timestamp DEFAULT NOW()

-- Player Card Fields (Extended)
player_archetype TEXT
playstyle_team_vs_iso INTEGER (0-100: Team-First to ISO Scorer)
playstyle_shooter_vs_slasher INTEGER (0-100: Shooter to Slasher)
playstyle_finesse_vs_power INTEGER (0-100: Finesse to Power)
training_context TEXT (off-season, pre-season, in-season, tryouts, showcases)
goals JSONB (Array of {title, target_value, target_date})
weekly_sessions_target INTEGER (1-7)
typical_session_length_minutes INTEGER (30, 45, 60, 75, 90)
sleep_hours_per_night TEXT (<6, 6-7, 7-8, >8)
schedule_blocks TEXT[] (morning, afternoon, evening, late_night)
visibility VARCHAR ('private', 'coach_only', 'community')
instagram_url TEXT
youtube_url TEXT
highlight_tagline TEXT
is_fully_scouted BOOLEAN DEFAULT FALSE
updated_at TIMESTAMP
```

#### **workouts**

```sql
id uuid PRIMARY KEY DEFAULT gen_random_uuid()
title varchar NOT NULL
description text
is_active boolean DEFAULT true
created_at timestamp DEFAULT NOW()
-- Note: database schema is minimal; type/difficulty in application layer
```

#### **workout_logs** (Activity/Session Log)

```sql
id uuid PRIMARY KEY DEFAULT gen_random_uuid()
user_id uuid REFERENCES profiles(user_id) ON DELETE CASCADE
workout_id uuid REFERENCES workouts(id) ON DELETE CASCADE
date date
completed boolean DEFAULT false
notes text
created_at timestamp DEFAULT NOW()
```

#### **measurements** (Weight Tracking)

```sql
id uuid PRIMARY KEY DEFAULT gen_random_uuid()
user_id uuid REFERENCES profiles(user_id) ON DELETE CASCADE
date date
weight_kg decimal
created_at timestamp DEFAULT NOW()
```

#### **workout_assignments** (Coach Assignments)

```sql
id uuid PRIMARY KEY DEFAULT gen_random_uuid()
athlete_id uuid REFERENCES profiles(user_id) ON DELETE CASCADE
workout_id uuid REFERENCES workouts(id) ON DELETE CASCADE
assigned_by uuid REFERENCES profiles(user_id)
created_at timestamp DEFAULT NOW()
CONSTRAINT unique_athlete_workout UNIQUE(athlete_id, workout_id)

-- Indexes:
idx_workout_assignments_athlete_id
idx_workout_assignments_workout_id
idx_workout_assignments_assigned_by
```

### Row-Level Security (RLS) Policies

**Profiles Table:**

- INSERT: `auth.uid() = user_id`
- SELECT: `auth.uid() = user_id`
- UPDATE: `auth.uid() = user_id`

**Workout Logs:**

- INSERT: `auth.uid() = user_id`
- SELECT: `auth.uid() = user_id`

**Measurements:**

- INSERT: `auth.uid() = user_id`
- SELECT: `auth.uid() = user_id`

**Workout Assignments:**

- SELECT (Athletes): `auth.uid() = athlete_id`
- SELECT (Coaches): `auth.uid() = assigned_by`
- INSERT (Coaches): `auth.uid() = assigned_by`
- DELETE (Coaches): `auth.uid() = assigned_by`

### Seed Data

5 pre-loaded workouts (defined in [supabase-setup.sql](supabase-setup.sql)):

1. Jump Training: Vertical Peak (plyometrics)
2. Ball Handling Drills (basketball-specific)
3. Strength Foundation: Lower Body (squats, deadlifts, calf raises)
4. Conditioning: 3-Point Line Sprints
5. Agility & Speed: T-Drill

---

## 2. SERVER AUTHENTICATION

### Supabase Client Configuration

**Location:** [src/lib/supabaseClient.ts](src/lib/supabaseClient.ts)

```typescript
// Browser Client (Client Components)
export function supabaseBrowser() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  // Returns dummy client if credentials missing (graceful fallback)
}

// Server Client (Server Components, Route Handlers)
export function supabaseServer(cookies: CookieAdapter) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  // Uses SSR adapter with cookie persistence
}
```

### Authenticated User Retrieval Pattern

**Standard Pattern in Server Components:**

```typescript
const cookieStore = await cookies();
const supabase = supabaseServer({
  get: (name) => cookieStore.get(name)?.value,
  set: (name, value, options) => cookieStore.set(name, value, options),
  remove: (name, options) => cookieStore.delete(name),
});

const { data: auth } = await supabase.auth.getUser();
const user = auth.user; // null if not authenticated
```

### Server Actions Pattern

**Location:** [src/app/(app)/dashboard/actions.ts](<src/app/(app)/dashboard/actions.ts>) (example)

```typescript
"use server"; // Must declare at top

import { supabaseServer } from "@/lib/supabaseClient";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export async function markWorkoutComplete(data: {
  workoutId: string;
  notes?: string;
}): Promise<{ success: boolean; error?: string }> {
  const cookieStore = await cookies();
  const supabase = supabaseServer({
    get: (name) => cookieStore.get(name)?.value,
    set: (name, value, options) => cookieStore.set(name, value, options),
    remove: (name, options) => cookieStore.delete(name),
  });

  const { data: auth } = await supabase.auth.getUser();
  if (!auth.user) return { success: false, error: "Not authenticated" };

  // Perform DB operation
  const { error } = await supabase.from("workout_logs").insert({
    user_id: auth.user.id,
    workout_id: data.workoutId,
    date: todayStr,
    completed: true,
    notes: data.notes || null,
  });

  if (error) return { success: false, error: error.message };

  revalidatePath("/dashboard");
  return { success: true };
}
```

### Authentication Helper Functions

**Signup/Create Profile Pattern:** [src/app/(auth)/signup/actions.ts](<src/app/(auth)/signup/actions.ts>)

- Uses `supabase.auth.signUp()` (client-side)
- Creates profile record with `createProfileAfterSignup()` (server action)
- Redirects to `/finish-profile` for onboarding

**Route Protection:**

- `/dashboard`, `/workouts`, `/leaderboard`, `/settings` require authentication
- Non-auth users redirected to `/login` via `redirect()` in Server Components
- Coach users redirected to `/trainer-dashboard`

---

## 3. ATHLETE DASHBOARD

### Component Location & Structure

**Path:** [src/app/(app)/dashboard/page.tsx](<src/app/(app)/dashboard/page.tsx>) (Server Component)

**Client Component:** [src/components/sections/dashboard/AthleteDashboard.tsx](src/components/sections/dashboard/AthleteDashboard.tsx)

### Current Display

The dashboard uses two-role rendering:

- **Athletes** → `AthleteDashboard` component
- **Coaches** → `CoachDashboard` component (redirects to `/trainer-dashboard`)

### Athlete Dashboard KPIs & Sections

```typescript
interface AthleteDashboardProps {
  profile: Profile;
  todayWorkout: Workout | null; // First active workout
  weekLogsCount: number; // Sessions last 7 days
  last30DaysCount: number; // Sessions last 30 days
  measurements: Measurement[]; // Weight history
  currentStreak: number; // Consecutive days
  longestStreak: number; // Historical max
  recentSessions?: RecentSession[]; // Last 3 logged workouts
  hasLoggedToday?: boolean; // Quick-log indicator
}
```

### Display Sections

1. **Today's Workout** (TodaysWorkout component)
   - Single active workout display
   - "Log Workout" CTA button
   - Uses `markWorkoutComplete()` server action

2. **Streak Tracker** (StreakTracker component)
   - Current streak (consecutive days)
   - Longest streak (historical)
   - Visual flame icon indicator

3. **Workout Stats KPIs** (StatCard components)
   - Week sessions (7-day count)
   - Month sessions (30-day count)
   - Completion rate
   - Trend indicators (up/down arrows)

4. **Weight Progress Chart** (WeightChart component)
   - Line chart from recharts
   - Displays measurements array data
   - X-axis: dates, Y-axis: weight_kg

5. **Recent Sessions** (Hardcoded in dashboard.tsx)
   - Table of last 3 logged workouts
   - Columns: Workout title, Date, Notes

6. **Tactical Playground 3D** (3D component)
   - Basketball court visualization
   - Lazy-loaded with `next/dynamic`

### Data Fetching Pattern

```typescript
// Server Component fetches:
- User profile (profiles table, by auth.uid())
- Today's workout (first from workouts WHERE is_active=true)
- Logs 7d, 30d, 60d (from workout_logs, date ranges)
- Measurements (from measurements table)
- Streak calculation (custom function on logs data)
- Recent sessions (last 3 workout_logs with workout title join)
```

---

## 4. EXISTING ROUTES

### Protected Routes Structure

**Base Path:** `src/app/(app)/` (requires authentication)

#### Athlete Routes

| Route          | File                                             | Status    | Description                                       |
| -------------- | ------------------------------------------------ | --------- | ------------------------------------------------- |
| `/dashboard`   | [page.tsx](<src/app/(app)/dashboard/page.tsx>)   | ✅ Active | Athlete home, KPIs, today's workout, weight chart |
| `/workouts`    | [page.tsx](<src/app/(app)/workouts/page.tsx>)    | ✅ Active | Workout list, completion status, logging          |
| `/leaderboard` | [page.tsx](<src/app/(app)/leaderboard/page.tsx>) | ✅ Active | 7-day & 30-day workout session rankings           |
| `/progress`    | [page.tsx](<src/app/(app)/progress/page.tsx>)    | ✅ Active | (structure exists)                                |
| `/settings`    | [page.tsx](<src/app/(app)/settings/page.tsx>)    | ✅ Active | Profile edit, password, goals, visibility         |

#### Coach Routes

| Route                | File                                                   | Status    | Description                      |
| -------------------- | ------------------------------------------------------ | --------- | -------------------------------- |
| `/trainer-dashboard` | [page.tsx](<src/app/(app)/trainer-dashboard/page.tsx>) | ✅ Active | Coach home, athlete roster, KPIs |

### Public Routes

| Route       | File                                                                       | Status    | Description      |
| ----------- | -------------------------------------------------------------------------- | --------- | ---------------- |
| `/`         | [src/app/(public)/page.tsx](<src/app/(public)/page.tsx>)                   | ✅ Active | Landing page     |
| `/about`    | [src/app/(public)/about/page.tsx](<src/app/(public)/about/page.tsx>)       | ✅ Active | About page       |
| `/contact`  | [src/app/(public)/contact/page.tsx](<src/app/(public)/contact/page.tsx>)   | ✅ Active | Contact form     |
| `/programs` | [src/app/(public)/programs/page.tsx](<src/app/(public)/programs/page.tsx>) | ✅ Active | Programs listing |

### Auth Routes

| Route             | File                                                                             | Status    | Description                                  |
| ----------------- | -------------------------------------------------------------------------------- | --------- | -------------------------------------------- |
| `/login`          | [src/app/(auth)/login/page.tsx](<src/app/(auth)/login/page.tsx>)                 | ✅ Active | Email/password login                         |
| `/signup`         | [src/app/(auth)/signup/page.tsx](<src/app/(auth)/signup/page.tsx>)               | ✅ Active | Create account + role selection              |
| `/finish-profile` | [src/app/(app)/finish-profile/page.tsx](<src/app/(app)/finish-profile/page.tsx>) | ✅ Active | Onboarding: Player Card wizard, measurements |

### Route Protection Pattern

**Protected Routes:**

```typescript
// In Server Components
export const dynamic = "force-dynamic";

const { data: auth } = await supabase.auth.getUser();
if (!user) redirect("/login");
```

**Role-Based Redirects:**

```typescript
if (profile.role === "coach") redirect("/trainer-dashboard");
if (profile.is_fully_scouted === false && role === "athlete") {
  redirect("/finish-profile");
}
```

---

## 5. DESIGN SYSTEM

### Color Palette (Tailwind Theme)

**Location:** [tailwind.config.ts](tailwind.config.ts) + [src/app/globals.css](src/app/globals.css)

| Color       | Purpose                     | Values                                                      |
| ----------- | --------------------------- | ----------------------------------------------------------- |
| **Emerald** | Primary accent, CTAs        | `#10b981`, `emerald-400` (light), `emerald-500/20` (tinted) |
| **Amber**   | Secondary accent, warnings  | `#f59e0b`, `amber-400` (light)                              |
| **Cyan**    | Tertiary accent, highlights | `#06b6d4`, `cyan-400` (light)                               |
| **Space**   | Dark theme background       | `space-900: #050816`, `space-800: #0a0f1e`                  |

**CSS Variables (Single Source of Truth):**

```css
--bg-primary: #050816 /* Dark navy */ --bg-secondary: #0a0f1e
  /* Slightly lighter */ --bg-card: rgba(15, 23, 42, 0.6)
  /* Translucent for glass effect */ --border-default: rgba(39, 39, 42, 0.8)
  --border-hover: rgba(16, 185, 129, 0.4) /* Emerald on hover */
  --accent-emerald: #10b981 --accent-emerald-glow: rgba(16, 185, 129, 0.25)
  --accent-amber: #f59e0b --accent-amber-glow: rgba(245, 158, 11, 0.25)
  --text-primary: #f9fafb /* Almost white */ --text-secondary: #a1a1aa
  /* Gray */ --text-muted: #52525b /* Darker gray */;
```

### Design Patterns

#### **Glass Card Component**

**Location:** [src/components/ui/GlassCard.tsx](src/components/ui/GlassCard.tsx)

```typescript
// Usage:
<GlassCard glow="emerald" hover={true}>
  {children}
</GlassCard>

// Styles:
.glass-card {
  backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid rgba(39,39,42,0.8);
  background: rgba(15,23,42,0.6);
  box-shadow: 0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.04);
  border-radius: 1rem;
  transition: all 300ms cubic-bezier(0.22, 1, 0.36, 1);
}
.glass-card:hover {
  border-color: rgba(16,185,129,0.4);
  box-shadow: 0 16px 48px rgba(0,0,0,0.5), 0 0 24px rgba(16,185,129,0.08);
  transform: translateY(-2px);
}
```

#### **Stat Card Component**

**Location:** [src/components/ui/StatCard.tsx](src/components/ui/StatCard.tsx)

Props:

```typescript
interface StatCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  iconColor?: "emerald" | "sky" | "violet" | "amber";
  trend?: { direction: "up" | "down" | "neutral"; label: string };
  countUp?: boolean; // Animate number counter
  delay?: number; // Stagger animation
  loading?: boolean; // Skeleton state
}
```

#### **Primary Button**

**Location:** Defined in globals.css

```css
.btn-primary {
  background: var(--accent-emerald);
  color: #000;
  font-weight: 700;
  border-radius: 9999px;
  padding: 0.75rem 2rem;
  box-shadow: 0 0 20px rgba(16, 185, 129, 0.35);
  transition: all 300ms cubic-bezier(0.22, 1, 0.36, 1);
}
.btn-primary:hover {
  background: #34d399;
  box-shadow: 0 0 32px rgba(16, 185, 129, 0.55);
  transform: translateY(-1px);
}
```

### Gradient & Text Styles

```css
/* Gradient Text (Logo, Headers) */
.gradient-text {
  background: linear-gradient(135deg, #10b981 0%, #06b6d4 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* Tabular Numbers for KPI Values */
.stat-value {
  font-variant-numeric: tabular-nums;
}
```

### Animation Classes

**Location:** [src/app/globals.css](src/app/globals.css)

| Animation       | Purpose                     | Duration | Easing                      |
| --------------- | --------------------------- | -------- | --------------------------- |
| `court-reveal`  | Fade-in + slide up on mount | 500ms    | cubic-bezier(0.22,1,0.36,1) |
| `shimmer-sweep` | Horizontal shimmer effect   | 2.5s     | linear, infinite            |
| `ambient-pulse` | Subtle glow breathing       | 4s       | ease-in-out, infinite       |
| `streak-ring`   | Expanding ring animation    | 1.5s     | ease-out, infinite          |

### Shadow Presets

```typescript
boxShadow: {
  "emerald-glow-sm": "0 0 20px rgba(16,185,129,0.35)",
  "emerald-glow-md": "0 0 32px rgba(16,185,129,0.55)",
  "amber-glow-sm":   "0 0 20px rgba(245,158,11,0.35)",
  "card-default":    "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.04)",
  "card-hover":      "0 16px 48px rgba(0,0,0,0.5), 0 0 24px rgba(16,185,129,0.08)",
}
```

### Component Library

**Location:** [src/components/ui/](src/components/ui/)

| Component        | File             | Purpose                                          |
| ---------------- | ---------------- | ------------------------------------------------ |
| **GlassCard**    | GlassCard.tsx    | Translucent container with glow effect           |
| **StatCard**     | StatCard.tsx     | KPI display with icon, trend, count-up animation |
| **GradientText** | GradientText.tsx | Emerald-to-cyan gradient heading text            |
| **BrandLogo**    | BrandLogo.tsx    | Coach Jake logo (green basketball + text)        |
| **AmbientGlow**  | AmbientGlow.tsx  | Decorative background glow overlay               |
| **CursorGlow**   | CursorGlow.tsx   | Mouse-tracking glow effect                       |
| **TechCorners**  | TechCorners.tsx  | Decorative corner bracket elements               |

### Typography

**Font Stack:** Space Grotesk (custom loaded font)
**Sizes:**

- Headings: `text-6xl`, `text-5xl`, `text-3xl` (bold/black)
- Body: `text-base`, `text-sm` (medium)
- Labels: `text-xs`, `text-[10px]` (small caps, uppercase)

---

## 6. SERVER ACTIONS PATTERNS

### Example 1: Mark Workout Complete

**Location:** [src/app/(app)/dashboard/actions.ts](<src/app/(app)/dashboard/actions.ts>)

```typescript
"use server";

export async function markWorkoutComplete(data: {
  workoutId: string;
  notes?: string;
}): Promise<{ success: boolean; error?: string }> {
  // 1. Setup: Get cookies & create Supabase client
  const cookieStore = await cookies();
  const supabase = supabaseServer({...});

  // 2. Auth check: Get current user
  const { data: auth } = await supabase.auth.getUser();
  if (!auth.user) return { success: false, error: "Not authenticated" };

  // 3. Prevent duplicate: Check if already logged today
  const { data: existingLog } = await supabase
    .from("workout_logs")
    .select("id", { count: "exact" })
    .eq("user_id", auth.user.id)
    .eq("workout_id", data.workoutId)
    .gte("created_at", today.toISOString())
    .lt("created_at", tomorrow.toISOString())
    .maybeSingle();

  if (existingLog) return { success: false, error: "Already logged today" };

  // 4. Insert: Create workout log
  const { error } = await supabase.from("workout_logs").insert({
    user_id: auth.user.id,
    workout_id: data.workoutId,
    date: todayStr,
    completed: true,
    notes: data.notes || null,
  });

  if (error) return { success: false, error: error.message };

  // 5. Revalidate: Update cached pages
  revalidatePath("/dashboard");
  revalidatePath("/workouts");

  return { success: true };
}
```

### Example 2: Update Profile

**Location:** [src/app/(app)/settings/actions.ts](<src/app/(app)/settings/actions.ts>)

```typescript
"use server";

export async function updateProfile(data: {
  full_name?: string;
  age?: number;
  height_cm?: number;
  weight_kg?: number;
  instagram_url?: string;
  youtube_url?: string;
  highlight_tagline?: string;
}): Promise<{ success: boolean; error?: string }> {
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
}
```

### Example 3: Create Profile After Signup

**Location:** [src/app/(auth)/signup/actions.ts](<src/app/(auth)/signup/actions.ts>)

```typescript
"use server";

export async function createProfileAfterSignup(data: {
  userId: string;
  email: string;
  fullName: string | null;
  role: "athlete" | "coach";
}): Promise<{ success: boolean; error?: string }> {
  const supabase = supabaseServer({...});

  const { error } = await supabase.from("profiles").insert({
    user_id: data.userId,
    email: data.email,
    full_name: data.fullName,
    role: data.role,
  });

  if (error) {
    return { success: false, error: `Failed to create profile: ${error.message}` };
  }

  return { success: true };
}
```

### Server Actions Best Practices (Used Throughout)

1. **Always "use server"** at the top
2. **Import supabaseServer** for auth & DB access
3. **Get cookies** and create client with proper adapter
4. **Check auth**: `await supabase.auth.getUser()`
5. **Use typed interfaces** for input/output
6. **Try-catch error handling** with meaningful messages
7. **Revalidate paths** after mutations: `revalidatePath("/path")`
8. **Return object with `{ success, error? }`** for client feedback

---

## 7. ADDITIONAL NOTES

### Environment Variables Required

```
NEXT_PUBLIC_SUPABASE_URL=https://[project].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[public-anon-key]
```

### Key Dependencies

- **@supabase/ssr** (v0.8.0): SSR-safe Supabase client with cookie persistence
- **@supabase/supabase-js** (v2.89.0): Core Supabase client
- **next** (v16.1.0): Framework
- **react** (v19.2.3): UI library
- **tailwindcss** (v4): Styling
- **framer-motion** (v12.40.0): Animations
- **recharts** (v3.8.1): Charts (weight, analytics)
- **lucide-react** (v0.562.0): Icons
- **sonner** (v2.0.7): Toast notifications
- **three** (v0.184.0): 3D graphics
- **@react-three/fiber** (v9.6.1): React renderer for Three.js

### Developer Tools

- **eslint** (v9): Code linting
- **typescript** (v5): Type checking
- **playwright** (v1.60.0): QA automation
- **@tailwindcss/postcss** (v4): Tailwind processor

### Configuration Files

| File                                     | Purpose              |
| ---------------------------------------- | -------------------- |
| [next.config.ts](next.config.ts)         | Next.js build config |
| [tsconfig.json](tsconfig.json)           | TypeScript config    |
| [tailwind.config.ts](tailwind.config.ts) | Tailwind theme       |
| [postcss.config.mjs](postcss.config.mjs) | PostCSS/Tailwind     |
| [eslint.config.mjs](eslint.config.mjs)   | Linting rules        |

### Design System Files

- [src/app/globals.css](src/app/globals.css) - CSS variables, keyframes, utilities
- [src/components/ui/](src/components/ui/) - Reusable UI components
- [design-system/coach-jake/MASTER.md](design-system/coach-jake/MASTER.md) - Design specs

### Key Utility Functions

- [src/lib/supabaseClient.ts](src/lib/supabaseClient.ts) - Supabase client factory
- [src/lib/imageUtils.ts](src/lib/imageUtils.ts) - Image optimization
- [src/lib/profileUtils.ts](src/lib/profileUtils.ts) - Profile helpers
- [src/types/index.ts](src/types/index.ts) - TypeScript types (Profile, Workout, etc.)

---

## Summary: What's Ready vs. What's Missing

### ✅ Fully Implemented

- Authentication (signup, login, password reset)
- Role-based routing (athlete vs. coach)
- Athlete dashboard with KPIs and weight tracking
- Workout logging system (workout_logs table)
- Leaderboard (7-day & 30-day rankings)
- Profile management & onboarding wizard (Player Card)
- Dark theme with emerald/amber/cyan accents
- Server actions pattern for mutations
- RLS policies for data security
- Responsive layout (mobile-first Tailwind)

### ⚠️ Partial/Needs Enhancement

- Workout assignments (table exists, limited UI)
- Coach dashboard (basic roster view exists)
- Measurements/weight tracking (data stored, limited visualizations)
- 3D visualizations (Tactical Playground exists, not fully integrated)

### ❌ Not Yet Implemented

- Real-time notifications/messaging
- Advanced analytics dashboards
- Workout streaming/video tutorials
- Mobile app (web-only currently)
- Payment processing/subscriptions
