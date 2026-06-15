# Coach Jake — Basketball Performance Platform

> Role-based strength & conditioning platform built for serious hoopers and the coaches who develop them.

**Live Demo:** https://coach-jake-app.vercel.app

## What It Does

Coach Jake is a full-stack web application that connects coaches and athletes around structured training programs.

**For Coaches:**

- Manage a full athlete roster with position, archetype, and school info
- Assign custom workout programs to individual athletes
- Track session completion rates and athlete activity in real time
- Identify at-risk athletes (7+ days without a logged session)

**For Athletes:**

- View assigned workouts from your coach
- Log sessions with notes and dates
- Track streaks, weekly volume, and personal history
- Get daily focus prompts based on today's training status

## Tech Stack

| Layer      | Technology                   |
| ---------- | ---------------------------- |
| Framework  | Next.js 14 (App Router)      |
| Language   | TypeScript                   |
| Auth & DB  | Supabase (PostgreSQL + Auth) |
| Styling    | Tailwind CSS                 |
| Deployment | Vercel                       |

## Key Features

- ✅ Role-based auth (Coach vs Athlete) with middleware protection
- ✅ Real-time workout assignment and session logging
- ✅ Athlete roster with activity status tracking
- ✅ Streak counter and weekly session volume
- ✅ Today's Focus block with smart CTA
- ✅ Mobile-responsive dark UI

## Getting Started

```bash
git clone https://github.com/Nitheesh0217/coach-jake-app
cd coach-jake-app
npm install
cp .env.example .env.local   # add your Supabase keys
npm run dev
```

## Demo Accounts

| Role           | Email                         | Password         |
| -------------- | ----------------------------- | ---------------- |
| Coach          | nitheeshdonepudi.17@gmail.com | Jupiter@0592     |
| Athlete (demo) | marcus.johnson.tx@gmail.com   | DemoAthlete2026! |

> Demo data includes 5 Texas high school basketball players with assigned workouts and session logs.

## Project Structure

```
src/
├── app/
│   ├── (app)/          # Authenticated routes
│   │   ├── dashboard/  # Athlete dashboard
│   │   ├── workouts/   # Workout assignment + logging
│   │   └── trainer-dashboard/ # Coach view (roster + stats)
│   ├── (auth)/         # Auth routes (login, signup)
│   ├── (public)/       # Public routes (homepage, about)
│   └── page.tsx        # Marketing homepage
├── components/         # Reusable UI components
│   ├── auth/          # Auth-specific components
│   ├── dashboard/     # Athlete dashboard widgets
│   ├── trainer/       # Coach dashboard components
│   ├── public/        # Marketing site components
│   └── layout/        # Navigation and layout
├── lib/               # Supabase client helpers
├── middleware.ts      # Auth protection middleware
└── types/             # TypeScript type definitions
```

## Running the Seed Script

To populate the demo database with test athletes and workouts:

1. Go to your Supabase project SQL editor
2. Paste the contents of `scripts/seed-demo-data.sql`
3. Run the script

This creates 5 demo athletes, assigns 2 workouts per athlete, and logs 3 sessions per athlete.

---

Built by Nitheesh Donepudi · [GitHub](https://github.com/Nitheesh0217)
