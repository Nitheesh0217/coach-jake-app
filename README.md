<![CDATA[<div align="center">

<img src="public/logo.png" alt="Coach Jake Logo" width="80" height="80" />

# 🏀 Coach Jake

**AI-Powered Basketball Fitness Coaching Platform**

*Train smarter. Track everything. Level up.*

[![Next.js](https://img.shields.io/badge/Next.js_16-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_v4-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Vercel](https://img.shields.io/badge/Vercel-black?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](LICENSE)
[![Deploy Status](https://img.shields.io/badge/Deploy-Live_on_Vercel-brightgreen?style=flat-square)](https://coach-jake-app.vercel.app)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-blue.svg?style=flat-square)](CONTRIBUTING.md)

[🚀 Live Demo](https://coach-jake-app.vercel.app) · [📋 Report Bug](https://github.com/Nitheesh0217/coach-jake-app/issues) · [✨ Request Feature](https://github.com/Nitheesh0217/coach-jake-app/issues)

---

</div>

## 📖 About

**Coach Jake** (internally *Levrl*) is a full-stack basketball fitness coaching SaaS platform connecting athletes and coaches in one intelligent workspace. Athletes get personalized daily workouts, progress tracking, and a ranked leaderboard. Coaches get a full roster view with completion analytics and workout assignment tools.

Built as a solo full-stack project — from database schema to deployed UI — in **Next.js 16 App Router**, **Supabase**, and **TypeScript**.

---

## ✨ Features

### For Athletes 🏃
- **Smart Onboarding** — 4-step Player Card Wizard captures your archetype, playstyle sliders, goals, and schedule
- **Daily Workout Feed** — Auto-assigned workout surfaced every day on the dashboard
- **Session Tracking** — Log completions with one tap; 7-day and 30-day streak counters
- **Body Measurements** — Weight history with date-stamped entries
- **Player Card Profile** — Public-facing scouting card with highlight tagline, Instagram & YouTube links

### For Coaches 🎯
- **Athlete Roster** — Full roster view with completion %, sessions this week, last workout date
- **Workout Assignment** — Assign specific workouts to individual athletes *(coming soon)*
- **Trainer Dashboard** — Dedicated analytics view separate from athlete flow

### Platform
- **Role-based Auth** — Supabase Auth with athlete / coach routing at middleware level
- **Row Level Security** — Every table scoped to `auth.uid()` — zero data bleed between users
- **Leaderboard** — Ranked by total session count across all athletes *(coming soon)*
- **Mobile-first UI** — Tailwind CSS v4 with dark-themed basketball aesthetic

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript (strict mode) |
| Styling | Tailwind CSS v4 |
| Database | Supabase (PostgreSQL) |
| Auth | Supabase Auth |
| Hosting | Vercel |
| Dev Tools | ESLint, VS Code |

---

## 🗂️ Project Structure

```
coach-jake-app/
├── src/
│   ├── app/
│   │   ├── (auth)/             # /login  /signup
│   │   ├── (app)/              # Protected routes
│   │   │   ├── dashboard/      # Role-based dashboard hub
│   │   │   ├── workouts/       # Browse & log workouts
│   │   │   ├── leaderboard/    # Ranked session board
│   │   │   ├── finish-profile/ # 4-step Player Card Wizard
│   │   │   └── trainer-dashboard/
│   │   └── (public)/           # Hero, About, Programs, Contact
│   ├── components/
│   │   ├── auth/               # Auth forms + Player Card Wizard
│   │   ├── dashboard/          # AthleteDashboard, CoachDashboard
│   │   ├── layout/             # Nav, TrainerDashboardLayout
│   │   └── trainer/            # Coach-side components
│   ├── lib/
│   │   ├── supabaseClient.ts
│   │   └── profileUtils.ts
│   ├── types/
│   │   └── index.ts            # Role, Profile, Workout, Measurement, AthleteProfile
│   └── proxy.ts                # Auth + role-based middleware
├── supabase-setup.sql
├── supabase-migrations-player-card.sql
├── supabase-migrations-workout-assignments.sql
└── vercel.json
```

---

## 🗄️ Database Schema

<details>
<summary>Click to expand full schema</summary>

```sql
-- profiles
user_id         UUID  PK  FK → auth.users
email           TEXT
full_name       TEXT
age             INT
height_cm       FLOAT
weight_kg       FLOAT
role            TEXT  ("athlete" | "coach")
player_archetype TEXT
playstyle_team_vs_iso          INT  (0–100)
playstyle_shooter_vs_slasher   INT  (0–100)
playstyle_finesse_vs_power     INT  (0–100)
training_context TEXT
goals           JSONB
weekly_sessions_target         INT
typical_session_length_minutes INT
sleep_hours_per_night          FLOAT
schedule_blocks TEXT[]
visibility      TEXT
instagram_url   TEXT
youtube_url     TEXT
highlight_tagline TEXT
is_fully_scouted  BOOLEAN

-- workouts
id          UUID  PK
title       TEXT
description TEXT
is_active   BOOLEAN
created_at  TIMESTAMPTZ

-- workout_logs
id          UUID  PK
user_id     FK → profiles
workout_id  FK → workouts
completed   BOOLEAN
created_at  TIMESTAMPTZ

-- measurements
id          UUID  PK
user_id     FK → profiles
date        DATE
weight_kg   FLOAT
created_at  TIMESTAMPTZ
```

> ✅ Row Level Security (RLS) enabled on all tables — scoped to `auth.uid() = user_id`

</details>

---

## 🚀 Getting Started

### Prerequisites
- Node.js 20+
- A [Supabase](https://supabase.com) project
- A [Vercel](https://vercel.com) account (for deployment)

### Local Setup

```bash
# 1. Clone the repo
git clone https://github.com/Nitheesh0217/coach-jake-app.git
cd coach-jake-app

# 2. Install dependencies
npm install

# 3. Configure environment variables
cp .env.example .env.local
# Fill in your Supabase URL and anon key

# 4. Run database migrations (in order)
# Execute in Supabase SQL editor:
# → supabase-setup.sql
# → supabase-migrations-player-card.sql
# → supabase-migrations-workout-assignments.sql

# 5. Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — you're live.

### Environment Variables

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

---

## 🗺️ Roadmap

### ✅ v1.0 — Shipped
- [x] Supabase Auth (signup / login / logout)
- [x] Role-based middleware (athlete vs. coach routing)
- [x] 4-step Player Card Wizard onboarding
- [x] Athlete Dashboard (today's workout, 7-day streak, 30-day count, measurements)
- [x] Coach Dashboard (athlete roster, completion %, sessions this week)
- [x] Server actions for measurements
- [x] 5 active seed workouts

### 🔄 v1.1 — In Progress
- [ ] Wire `logWorkout()` + Mark Complete button on Athlete Dashboard
- [ ] `/workouts` page — browse & log any workout
- [ ] `/leaderboard` page — ranked by session count
- [ ] `/trainer-dashboard` — coach assigns workouts to athletes

### 🔮 v2.0 — Planned
- [ ] Progress charts (weight trend, session frequency)
- [ ] AI workout recommendations based on Player Card archetype
- [ ] Push notifications for daily workout reminders
- [ ] Public player profiles & social scouting feed
- [ ] Mobile PWA

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

```bash
# Fork → Branch → Commit → PR
git checkout -b feature/your-feature-name
git commit -m "feat: add your feature"
git push origin feature/your-feature-name
```

---

## 👤 Author

**Nitheesh Donepudi**
- GitHub: [@Nitheesh0217](https://github.com/Nitheesh0217)
- Location: Miramar, FL

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

<div align="center">

Built with 🏀 by Nitheesh Donepudi

*Coach Jake — Where Athletes Level Up*

</div>
]]>