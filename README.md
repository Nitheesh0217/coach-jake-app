# Levrl - Basketball Training Platform

A modern, role-based SaaS platform for basketball coaches and players to manage training programs, track progress, and build elite athletic performance.

## 🎯 Overview

**Levrl** is a web application that enables basketball coaches to create and assign training programs to players, while players complete workouts, track their progress, and receive personalized coaching insights. The platform features a premium "Player Card" onboarding experience, role-based dashboards, and real-time progress tracking.

**GitHub Repo**: https://github.com/Nitheesh0217/coach-jake-app  
**Deployed On**: Vercel  

---

## ✨ Core Features

### For Coaches
- **Athlete Management Dashboard**: View all assigned athletes, track their progress
- **Workout Assignment**: Create and assign workouts to individual players or teams
- **Performance Insights**: Monitor player consistency, goal completion, and training adherence
- **Coach Recommendations**: Provide personalized feedback and training modifications

### For Players
- **Premium Player Card Setup**: 4-step onboarding (Identity, Archetype, Goals, Visibility)
- **Personal Dashboard**: View assigned workouts, track daily progress
- **Workout Tracking**: Mark workouts complete with date/time logging
- **Progress Visualization**: Monitor consistency, goals, and training history
- **Profile Customization**: Set training context, visibility preferences, social links

### Public Pages
- **Marketing Site**: Hero section, features, testimonials, programs overview
- **About & Contact**: Team information and inquiry forms
- **Program Library**: Detailed breakdown of training programs

---

## 🛠️ Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| **Framework** | Next.js | 16.1.0 |
| **Runtime** | React | 19.2.3 |
| **Language** | TypeScript | 5.x |
| **Database** | Supabase (PostgreSQL) | - |
| **Authentication** | Supabase Auth | - |
| **Styling** | Tailwind CSS | 4.x |
| **Build Tool** | Turbopack | - |

---

## 📋 Prerequisites

- **Node.js** 18.17+ (check with `node -v`)
- **npm** or **yarn** package manager
- **Git** for version control
- **Supabase Account** (free tier available at https://supabase.com)

---

## 🚀 Quick Start

### 1. Clone & Install

```bash
git clone https://github.com/Nitheesh0217/coach-jake-app.git
cd coach-jake-app
npm install
```

### 2. Environment Setup

Create a `.env.local` file in the project root:

```dotenv
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

**How to get these values:**
1. Go to https://app.supabase.com
2. Select your project
3. Click **Settings** → **API**
4. Copy the **Project URL** and **anon public** key

### 3. Database Setup

Run the SQL migrations to set up the database schema and RLS policies:

```bash
# Copy the contents of supabase-setup.sql
# Go to Supabase Dashboard → SQL Editor → New Query
# Paste and execute the SQL file

# Then run player card migrations:
# Paste and execute contents of supabase-migrations-player-card.sql
```

**What gets created:**
- `profiles` table (users, roles, names, etc.)
- `player_card` fields (archetype, playstyle, goals, schedule_blocks)
- Row-Level Security (RLS) policies for data protection
- Sample coach and athlete seed data

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

**Test Credentials** (after running migrations):
- Coach: `coach@example.com` / `password123`
- Player: `player@example.com` / `password123`

---

## 📁 Project Structure

```
coach-jake-app/
├── src/
│   ├── app/
│   │   ├── (auth)/           # Authentication pages (login, signup)
│   │   ├── (app)/            # Protected routes (dashboard, workouts)
│   │   ├── (public)/         # Public pages (hero, about, programs)
│   │   ├── layout.tsx        # Root layout
│   │   └── globals.css       # Global styles
│   ├── components/
│   │   ├── auth/             # Auth-related components (forms, wizard)
│   │   ├── dashboard/        # Dashboard widgets and cards
│   │   ├── layout/           # Navigation, headers, footers
│   │   ├── public/           # Public site components
│   │   └── trainer/          # Coach dashboard components
│   ├── lib/
│   │   ├── supabaseClient.ts # Supabase client setup
│   │   └── profileUtils.ts   # Utility functions
│   ├── types/
│   │   └── index.ts          # TypeScript type definitions
│   └── proxy.ts              # Middleware for auth protection
├── public/                   # Static assets (images, logos)
├── supabase-setup.sql        # Database schema & RLS
├── supabase-migrations-player-card.sql  # Player card fields
├── package.json              # Dependencies
├── tsconfig.json             # TypeScript config
└── next.config.ts            # Next.js config
```

---

## 🔐 Authentication Flow

### Sign Up (New Users)
1. User enters **email**, **password**, and **role** (Coach or Player)
2. Supabase creates auth account
3. User redirected to `/finish-profile` for premium onboarding
4. 4-step Player Card wizard collects profile data
5. User account marked as complete, redirected to dashboard

### Login
1. User enters email and password
2. System checks if profile is complete
3. If incomplete → redirect to `/finish-profile`
4. If complete → redirect to dashboard based on role

### Protected Routes
All routes under `/dashboard`, `/workouts`, `/leaderboard`, `/coach`, `/finish-profile` are protected by middleware (`src/proxy.ts`). Unauthenticated users are redirected to login.

---

## 🎨 Design System

### Colors
- **Primary**: Emerald (emerald-500, emerald-600)
- **Background**: Dark blue-gray (`#050816`)
- **Text**: Light gray/white for contrast
- **Accents**: Gold/amber for CTAs

### Components
- **Cards**: Rounded (12px), subtle shadows, dark backgrounds
- **Buttons**: Gradient fills, smooth transitions, loading states
- **Forms**: Input validation, error messages, success states
- **Animations**: Smooth transitions, fade-in effects, hover states

---

## 🔧 Development Commands

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting (ESLint)
npm run lint

# Type check
npx tsc --noEmit
```

---

## 📊 Database Schema (Key Tables)

### `public.profiles`
- `user_id` (UUID) - Foreign key to auth.users
- `role` (ENUM: 'coach' | 'athlete')
- `full_name` (VARCHAR)
- `age` (INT)
- `height_cm` (INT)
- `weight_kg` (INT)
- `player_archetype` (VARCHAR)
- `playstyle_driving` (INT 0-100)
- `playstyle_shooting` (INT 0-100)
- `playstyle_defense` (INT 0-100)
- `training_context` (VARCHAR)
- `goals` (JSONB array)
- `schedule_blocks` (JSONB)
- `instagram_url` (VARCHAR)
- `youtube_url` (VARCHAR)
- `highlight_tagline` (TEXT)
- `visibility` (ENUM: 'private' | 'coach_only' | 'community')
- `is_fully_scouted` (BOOLEAN)
- `created_at` (TIMESTAMP)

---

## 🚢 Deployment (Vercel)

### Step 1: Push to GitHub
```bash
git push origin main
```

### Step 2: Connect to Vercel
1. Go to https://vercel.com
2. Click "New Project"
3. Import your GitHub repo (`coach-jake-app`)
4. Select root directory (default: `.`)
5. Click "Deploy"

### Step 3: Add Environment Variables
In **Vercel Dashboard** → **Settings** → **Environment Variables**, add:

| Key | Value |
|-----|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://your-project.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your anon key |

### Step 4: Redeploy
Click "Redeploy" to apply environment variables. Your app will be live!

---

## 🐛 Troubleshooting

### "Environment variable not found"
- ✅ Ensure `.env.local` exists locally
- ✅ Check Vercel has environment variables set
- ✅ Restart dev server after adding to `.env.local`

### "Authentication failed"
- ✅ Verify Supabase URL and key are correct
- ✅ Check RLS policies in Supabase (should allow auth users)

### "Profile not found after signup"
- ✅ Ensure database migrations ran successfully
- ✅ Check user_id matches between auth.users and profiles table

---

## 🔒 Security Best Practices

✅ **Implemented:**
- Row-Level Security (RLS) on all tables
- Auth-based access control via middleware
- Environment variables for sensitive data
- `.env.local` excluded from git
- Password hashing via Supabase Auth

⚠️ **Before Production:**
- [ ] Enable HTTPS only
- [ ] Configure CORS in Supabase
- [ ] Review RLS policies
- [ ] Set up email verification
- [ ] Monitor logs for suspicious activity

---

## 📞 Support & Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

---

**Built with ❤️ by Nitheesh | Deployed on Vercel | Powered by Supabase**

Last Updated: December 28, 2025
