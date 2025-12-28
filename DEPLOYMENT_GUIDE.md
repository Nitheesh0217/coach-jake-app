# LAUNCH PREPARATION & DEPLOYMENT GUIDE

## ⚡ Pre-Launch Checklist (Complete Before Demo)

### 1. **Supabase Setup** (30 minutes)

#### Step 1A: Create RLS Policies
1. Open [Supabase Dashboard](https://app.supabase.com)
2. Navigate to **SQL Editor**
3. Click **+ New Query**
4. Copy the entire contents of `supabase-setup.sql` from this repo
5. Paste into the SQL editor
6. Click **Run** (you'll see success messages for each policy)
7. Verify no errors appear

#### Step 1B: Seed Workouts
- The SQL file automatically inserts 5 sample workouts
- These will appear in athlete workouts and coach rosters
- No manual action needed

#### Step 1C: Enable Email Verification (Optional for Dev)
- To skip email confirmation during testing:
  - Supabase Dashboard → Authentication → Providers → Email
  - Toggle off "Confirm email"
  - Remember to turn back ON before production

---

### 2. **Environment Variables** (5 minutes)

#### Local Development (.env.local)
```bash
# Copy example file
cp .env.example .env.local

# Edit .env.local and add your Supabase keys:
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Where to find these:**
- Supabase Dashboard → Project Settings → API → Project URL & anon key

#### Vercel Production (after pushing to GitHub)
- Vercel Dashboard → Your Project → Settings → Environment Variables
- Add the same 2 variables (copy from Supabase)
- Redeploy after adding

---

### 3. **Test Signup & Role Selection** (15 minutes)

#### Athlete Signup
```
1. Go to http://localhost:3000
2. Click "Start training free" (hero CTA)
3. Select "Athlete" toggle (should be emerald green)
4. Fill form:
   - Full Name: "Test Athlete"
   - Age: 20
   - Height: 180
   - Weight: 90
   - Email: athlete@test.com
   - Password: Test123456
5. Click "Start training free"
6. Confirm email (check inbox or skip if disabled in step 2C)
7. Login with athlete@test.com / Test123456
8. **VERIFY**: Dashboard shows emerald "Athlete" badge + "Welcome back, Test Athlete! 👋"
9. **VERIFY**: See "Today's Workout" card with seed workout
10. **VERIFY**: See progress metrics (all 0 initially)
```

#### Coach Account Setup
```
1. In Supabase Dashboard → Auth → Users
2. Click "Add user" → invite email "coach@test.com"
3. Note the user_id (copy it)
4. Go to SQL Editor → New Query
5. Paste & run:
   INSERT INTO profiles (user_id, email, full_name, role) 
   VALUES ('[PASTE_USER_ID_HERE]', 'coach@test.com', 'Coach Test', 'coach');
6. Go to app, logout
7. Navigate to /login
8. Enter coach@test.com / [temporary-password-from-email]
9. **VERIFY**: Dashboard shows blue "Coach" badge + "Welcome back, Coach Test! 👋"
10. **VERIFY**: See athlete roster table (should show "Test Athlete" from step 1)
11. **VERIFY**: See 3 KPI cards (Active Athletes, Avg Completion %, Sessions)
```

---

### 4. **Test Workout Completion** (10 minutes)

#### As Athlete
```
1. On Athlete Dashboard, click "View all workouts" or go to /workouts
2. See 5 seed workouts from supabase-setup.sql
3. Click "Mark Complete" on any workout
4. **VERIFY**: Workout status changes (success message appears)
5. Return to dashboard
6. **VERIFY**: "Sessions This Week" KPI incremented
7. Logout
```

#### As Coach
```
1. Login as coach (from step 3)
2. Go to Coach Dashboard (should default there)
3. Look at "Athletes" table → find "Test Athlete"
4. **VERIFY**: "This Week Sessions" column now shows 1 (from athlete's completion)
5. **VERIFY**: "Completion %" updated (higher than before)
```

---

### 5. **Test Weight Logging** (10 minutes)

#### As Athlete
```
1. Login as athlete
2. On Athlete Dashboard, scroll to "Measurements Widget"
3. Enter date (today) and weight (80 kg)
4. Click "Log Weight"
5. **VERIFY**: Success message appears
6. **VERIFY**: Entry appears in "Recent Measurements" list below
7. Log a second weight (tomorrow, 79.5 kg)
8. **VERIFY**: Trend indicator shows (↓ for weight loss)
9. **VERIFY**: Last measurement shows in coach dashboard (if applicable)
```

---

### 6. **Test Error Handling** (5 minutes)

```
[ ] Signup with existing email → see error message
[ ] Login with wrong password → see error message
[ ] Try accessing /dashboard without login → redirected to /login?next=/dashboard
[ ] Try accessing /coach/* as athlete → redirected to /dashboard
[ ] Try accessing /coach/* as coach → access granted
[ ] Submit contact form with missing fields → see validation error
[ ] Submit contact form successfully → see success message + auto-reset
```

---

### 7. **Mobile Responsiveness** (5 minutes)

```
[ ] Open http://localhost:3000 on phone or mobile DevTools
[ ] Sidebar collapses to hamburger icon
[ ] Click hamburger → drawer slides in
[ ] Signup form is readable and clickable
[ ] Dashboard cards stack vertically on mobile
[ ] Tables are scrollable (not cut off)
[ ] CTA buttons are large enough to tap
```

---

### 8. **Build & Deploy to Vercel** (30 minutes)

#### Local Build
```bash
npm run build
# Should complete with no errors
# You'll see "Route (app)" tree with all pages listed
```

#### GitHub Push
```bash
git add .
git commit -m "Launch ready: RLS policies, seed data, and docs"
git push origin main
```

#### Vercel Deploy
1. Go to [Vercel Dashboard](https://vercel.com)
2. Click "New Project"
3. Select your GitHub repo (coach-jake)
4. Framework: Next.js (auto-detected)
5. Root Directory: ./ (default)
6. Environment Variables:
   - Name: `NEXT_PUBLIC_SUPABASE_URL` → Value: [your Supabase URL]
   - Name: `NEXT_PUBLIC_SUPABASE_ANON_KEY` → Value: [your anon key]
7. Click "Deploy"
8. Wait for build to complete (~3-4 minutes)
9. Go to deployment URL
10. **VERIFY**: Home page loads
11. **VERIFY**: Signup flow works on deployed site
12. **VERIFY**: Can login and see dashboard

---

## 🎯 Client Demo Checklist (For Call)

### Demo Flow (15-20 minutes)

#### **Part 1: Marketing Site (2 min)**
- [ ] Show homepage: hero, programs, benefits, testimonials
- [ ] Click "Start training free" CTA → lands on signup
- Talking Points:
  - "Professional marketing site designed to convert visitors to athletes and coaches"
  - "Clean dark theme, mobile-responsive, fast loading"

#### **Part 2: Athlete Signup & Dashboard (5 min)**
- [ ] Go to signup, select **Athlete** role
- [ ] Fill form (show it's simple: name, age, height, weight, email, password)
- [ ] Submit → confirm email (or skip confirmation)
- [ ] Login → **Athlete Dashboard** loads
- [ ] Point out:
  - Role-based greeting: "Welcome back, [Name]! 👋"
  - Emerald "Athlete" badge (visual differentiation)
  - "Today's Workout" card (pulls real workout from database)
  - 3 progress metrics: Sessions This Week, Sessions Last 30 Days, Consistency %
  - Measurements widget (log weight, see trends with ↑/↓ indicators)
  - Next Steps guidance section
- Talking Points:
  - "Simple, uncluttered interface. Athletes focus on their training."
  - "Real-time data from Supabase (pulling active workouts, logging, tracking)"
  - "Personalized experience makes them feel supported"

#### **Part 3: Coach Dashboard (5 min)**
- [ ] Logout
- [ ] Login as coach account (you create this before demo)
- [ ] **Coach Dashboard** loads with different layout
- [ ] Point out:
  - Role-based greeting: "Welcome back, [Coach Name]! 👋"
  - Blue "Coach" badge (visual differentiation from athlete)
  - 3 KPI cards: Active Athletes, Avg Completion %, Sessions This Month
  - Athletes roster table: name, email, age, sessions this week, completion %, status badge
  - Coaching Insights section (contextual alerts: no athletes yet, low engagement, etc.)
- Talking Points:
  - "Coaches get a completely different dashboard tailored to management, not training"
  - "Real-time roster view. Coaches see all their athletes + completion rates."
  - "Intelligent insights flag at-risk athletes and celebrate high performers"

#### **Part 4: Athlete Interaction (3 min)**
- [ ] Logout, login as athlete
- [ ] Click "Mark Complete" on a workout
- [ ] **SHOW**: Success notification appears
- [ ] Refresh page
- [ ] **SHOW**: KPI updated (sessions increased)
- [ ] Logout, login as coach
- [ ] **SHOW**: Athlete's completion % increased in roster
- Talking Points:
  - "Real-time bidirectional sync between athlete actions and coach visibility"
  - "Coaches don't need to manually update data—it updates automatically"

#### **Part 5: Weight Tracking (2 min)**
- [ ] Login as athlete
- [ ] Scroll to Measurements Widget
- [ ] Log weight
- [ ] **SHOW**: Trend indicator appears
- Talking Points:
  - "Athletes can log body metrics. Coaches see trends to detect overtraining/recovery issues"

#### **Part 6: Security & Role-Based Access (1 min)**
- [ ] Logout
- [ ] Try accessing /coach/* without login → redirected to /login
- [ ] Try accessing /dashboard → same redirect
- Talking Points:
  - "All routes protected. Unauthenticated users can't access dashboards."
  - "Coaches can only access coach routes. Athletes can't see coach tools."

### Key Talking Points for Pricing Discussion

1. **Freemium Model**
   - Free: Unlimited workouts, basic tracking, community access
   - Athlete Pro ($29/mo): Coach feedback, custom programs, 1-on-1 calls (1x/month)
   - Coach ($99/mo): Unlimited athletes, advanced analytics, team messaging

2. **Unit Economics**
   - Athletes: High volume, low cost
   - Coaches: Lower volume, higher LTV (upsell custom programs, analytics, content)

3. **Feature Expansion Opportunities**
   - Gamification (badges, streaks, leaderboards) → increases retention
   - Video content library → sticky content, reduces churn
   - Discord community → free acquisition channel
   - Mobile app → expansion to casual athletes

4. **Competitive Advantage**
   - Role-based architecture (not all apps do this well)
   - Real-time sync (coaches see athlete progress instantly)
   - Dark theme (modern, professional, reduces eye strain)
   - Simple UX (no bloat, athletes focus on training)

---

## 🚀 Post-Demo Next Steps

### Immediate (This Week)
- [ ] Collect client feedback on pricing tiers
- [ ] Discuss launch timeline & marketing plan
- [ ] Confirm domain/custom email setup
- [ ] Decide on payment processor (Stripe vs Paddle vs others)

### Week 1-2 (Post-Launch)
- [ ] Deploy to production domain
- [ ] Setup Google Analytics
- [ ] Setup error tracking (Sentry, Datadog)
- [ ] Configure email notifications (signup confirmation, password reset)
- [ ] Seed production database with real coach account

### Week 2-4
- [ ] Leaderboard implementation
- [ ] Password reset flow
- [ ] Profile editing page
- [ ] Email notification system
- [ ] Begin marketing campaign

---

## 📱 Deployment URLs

- **Development**: http://localhost:3000
- **Production**: https://coach-jake.vercel.app (or your custom domain)
- **Supabase Dashboard**: https://app.supabase.com
- **Vercel Dashboard**: https://vercel.com

---

## 🆘 Troubleshooting

### "Profile not found" error on dashboard
**Cause**: RLS policies not created  
**Fix**: Run `supabase-setup.sql` in Supabase SQL Editor

### Email confirmation not working
**Cause**: Email sending not configured in Supabase  
**Fix**: Disable email confirmation for dev (Supabase → Auth → Email tab) or configure SMTP

### Athlete sees coach dashboard
**Cause**: Role not set in profile  
**Fix**: Check profiles table → user's role should be 'athlete' or 'coach'

### Coach can't see athlete data
**Cause**: Athlete hasn't signed up yet or email not confirmed  
**Fix**: Create test athlete account → confirm email → login as coach

### Deployment fails
**Cause**: Missing env variables in Vercel  
**Fix**: Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in Vercel Settings

---

**Generated**: December 27, 2025  
**Version**: 1.0  
**Status**: Ready for Launch
