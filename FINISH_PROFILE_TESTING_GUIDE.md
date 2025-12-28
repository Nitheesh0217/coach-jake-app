# Finish Profile Flow - Testing Guide

## Quick Start

### 1. Start Development Server
```bash
npm run dev
```
Navigate to `http://localhost:3000`

## Test Scenarios

### Scenario A: New User Signup → Complete Profile
**Expected Flow**: Signup → `/finish-profile` → `/dashboard`

1. **Go to `/signup`**
   - You should see simplified form with: Email, Password, Role toggle
   - ✅ Confirm: No age/height/weight fields on signup

2. **Fill form:**
   - Role: Select "Athlete" (emerald highlight)
   - Email: `test@example.com`
   - Password: `password123` (6+ chars)
   - ❌ Don't fill full name (it's on next step)

3. **Click "Create account"**
   - Loading state shows "Creating account..."
   - If email confirmation required: Redirected to `/login?msg=confirm-email`
   - If instant session: Redirected to `/finish-profile`

4. **On `/finish-profile` page**
   - ✅ Page title: "Complete Your Profile"
   - ✅ Form has: Full Name (required), Age, Height, Weight, Role toggle
   - ✅ Role pre-filled with what you selected on signup
   - ✅ Mobile responsive: single column on mobile

5. **Fill profile form:**
   - Full Name: `John Athlete`
   - Age: `25`
   - Height: `180`
   - Weight: `75`
   - Role: Keep as "Athlete"

6. **Click "Complete Profile"**
   - Loading state shows "Saving..."
   - Success: Redirected to `/dashboard`
   - ✅ Confirm: Dashboard loads with athlete view
   - ✅ Confirm: Welcome greeting includes your name: "Welcome back, John Athlete! 👋"

---

### Scenario B: Login with Incomplete Profile
**Expected Flow**: Login → `/finish-profile` → `/dashboard`

1. **Complete Scenario A** (create account and DON'T finish profile)
   - In your database, update the profile record to have `full_name = NULL`
   - Or manually access `/finish-profile` during signup flow and exit

2. **Go to `/login`**
   - Fill with email/password from Scenario A
   - Click "Continue to dashboard"

3. **After login**
   - ✅ System checks if profile is complete
   - ✅ Since `full_name` is NULL, redirects to `/finish-profile`
   - Form should show partial data pre-filled (role, age, height, weight if set)

4. **Complete profile and submit**
   - ✅ Redirects to `/dashboard`
   - ✅ Profile is now marked as complete

---

### Scenario C: Login with Complete Profile
**Expected Flow**: Login → `/dashboard` (direct)

1. **Use account from Scenario A (after completion)**

2. **Go to `/login`**
   - Fill with email/password

3. **After login**
   - ✅ System checks profile completeness
   - ✅ Profile is complete, redirects directly to `/dashboard`
   - No stop at `/finish-profile`

---

### Scenario D: "Already Registered" Error
**Expected Flow**: Signup with existing email → Error → Login → `/finish-profile` or `/dashboard`

1. **Go to `/signup`**
   - Use email from Scenario A: `test@example.com`
   - Fill password, select role
   - Click "Create account"

2. **Error message appears**
   - ✅ Error shows: "This email is already registered. Please log in instead to complete your profile."
   - ✅ No red error banner with generic Supabase error

3. **Click login link or navigate to `/login`**
   - Login form loads
   - ✅ Banner: "Already registered" message appears if `?msg=already-registered` in URL

4. **Login and see appropriate redirect**
   - If profile incomplete → `/finish-profile`
   - If profile complete → `/dashboard`

---

### Scenario E: Protected Route `/finish-profile` without Auth
**Expected Behavior**: Redirect to login

1. **Clear browser cookies** (log out)

2. **Try to access `/finish-profile` directly**
   - ✅ Middleware redirects to `/login?next=/finish-profile`
   - ✅ Cannot access page without authentication

---

### Scenario F: Minimal Profile (Optional Fields Empty)
**Expected Flow**: Can submit form with only required fields

1. **Go through Scenario A** but on `/finish-profile`:
   - Full Name: `Jane Smith`
   - Age: (leave empty)
   - Height: (leave empty)
   - Weight: (leave empty)
   - Role: `Coach`

2. **Click "Complete Profile"**
   - ✅ Submission succeeds
   - ✅ Profile created with NULL values for optional fields
   - ✅ Redirects to `/dashboard`

3. **Check database**
   - `full_name = 'Jane Smith'`
   - `age = NULL`
   - `height_cm = NULL`
   - `weight_kg = NULL`
   - `role = 'coach'`

---

## Mobile Testing

### iOS/Android (or Chrome DevTools)

1. **Signup form on mobile**
   - ✅ Full width input fields
   - ✅ Role buttons side-by-side or stacked
   - ✅ Proper keyboard appears (text, number, decimal)
   - ✅ Touch targets ≥48px

2. **Finish profile form on mobile**
   - ✅ Fields stack vertically
   - ✅ No horizontal scroll
   - ✅ "Complete Profile" button full width, tappable
   - ✅ Error messages visible without scroll

3. **Responsive breakpoints**
   - Small (320px): Should work
   - Medium (768px): Should work
   - Large (1024px+): Should work

---

## Database Checks

### After Completing Scenario A

```sql
-- Check profile exists
SELECT user_id, full_name, age, height_cm, weight_kg, role
FROM profiles
WHERE email = 'test@example.com';

-- Should return:
-- user_id: <auth user id>
-- full_name: 'John Athlete'
-- age: 25
-- height_cm: 180
-- weight_kg: 75
-- role: 'athlete'
```

### After Completing Scenario F

```sql
-- Check optional fields are NULL
SELECT user_id, full_name, age, height_cm, weight_kg, role
FROM profiles
WHERE email = 'jane@example.com';

-- Should return:
-- user_id: <auth user id>
-- full_name: 'Jane Smith'
-- age: NULL
-- height_cm: NULL
-- weight_kg: NULL
-- role: 'coach'
```

---

## Common Issues & Fixes

### Issue: Form submits but stays on page
- **Check**: Browser console for JavaScript errors
- **Check**: Network tab - server action request succeeds?
- **Fix**: Ensure `finishProfile` server action has `"use server"` at top

### Issue: Profile not pre-filled on login
- **Check**: `getCurrentUserProfile()` is being called in login form
- **Check**: Server action is returning profile data correctly
- **Fix**: Verify Supabase cookies are being set correctly in login response

### Issue: Can access `/finish-profile` without logging in
- **Check**: Middleware in `src/proxy.ts` includes `/finish-profile`
- **Check**: `config.matcher` includes `/finish-profile/:path*`
- **Fix**: Restart dev server after middleware changes

### Issue: Redirect loop between `/finish-profile` and `/login`
- **Check**: Profile completion check in login form
- **Check**: `/finish-profile` page redirects to dashboard if complete
- **Fix**: Ensure `isProfileComplete()` logic is correct (must have both `full_name` AND `role`)

---

## Success Criteria

✅ All 6 scenarios work as described  
✅ Mobile responsive on all breakpoints  
✅ Zero console errors  
✅ Form validation prevents submission without required fields  
✅ Error messages clear and helpful  
✅ Database records created/updated correctly  
✅ Auth flow prevents unauthorized access  
✅ Performance: Page loads < 2 seconds  

---

## Rollback Plan

If issues arise, revert these commits:
1. Delete new files: `/finish-profile/page.tsx`, `/finish-profile/actions.ts`, `FinishProfileForm.tsx`, `profileUtils.ts`
2. Restore original signup/login files from git history
3. Restore original `proxy.ts`
4. Remove `FINISH_PROFILE_IMPLEMENTATION.md` and this guide

This returns the app to the previous single-step signup flow.
