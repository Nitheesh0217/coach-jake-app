# Finish Profile Flow - Implementation Summary

## Overview
Implemented a two-step registration flow for Coach Jake that separates authentication (Step 1: email/password signup) from profile completion (Step 2: `/finish-profile` form).

## Changes Made

### 1. New Files Created

#### `src/app/(app)/finish-profile/page.tsx`
- Server component that displays the profile completion form
- Checks if user's profile exists and is complete
- If complete → redirects to `/dashboard`
- If incomplete → shows FinishProfileForm component
- Protected route (requires authentication via middleware)

#### `src/app/(app)/finish-profile/actions.ts`
- Server action: `getCurrentUserProfile()` - Fetches user's current profile from Supabase
- Server action: `finishProfile(data)` - Inserts or updates user profile with form data
- Interfaces:
  - `FinishProfileData` - Form data structure
  - `FinishProfileResult` - Server action response

#### `src/components/auth/FinishProfileForm.tsx`
- Client component for profile completion form
- Fields:
  - **Full Name** (required, text input)
  - **Age** (optional, number input)
  - **Height (cm)** (optional, number input)
  - **Weight (kg)** (optional, number input)
  - **Role** (athlete/coach, toggle buttons)
- Features:
  - Dark theme matching existing app
  - Emerald accent colors
  - Mobile-responsive design
  - Error handling and loading states
  - Form pre-fills with existing profile data if available

#### `src/lib/profileUtils.ts`
- Utility function: `isProfileComplete(profile)` - Checks if profile has required fields
- Shared between server actions and client components (not marked as "use server")

### 2. Modified Files

#### `src/app/(auth)/signup/page.tsx`
**Changes:**
- Removed profile fields from signup form (full_name, age, height_cm, weight_kg)
- Simplified form to collect only: email, password, role (toggle)
- Updated card header description: "Get started in minutes. Choose your role and sign up with email and password."
- Updated submit button text: "Create account" (was "Start training free")
- Changed redirect after signup:
  - If email confirmation required → `/login?msg=confirm-email`
  - If session exists → `/finish-profile` (NEW - was `/dashboard`)
- Added "already registered" error handling:
  - Catches Supabase "user already registered" error
  - Shows helpful message: "This email is already registered. Please log in instead to complete your profile."

#### `src/app/(auth)/login/login-form.tsx`
**Changes:**
- Imported `getCurrentUserProfile` and `isProfileComplete` from finish-profile actions/utils
- Added profile completeness check after successful login:
  - Fetches user's profile
  - If incomplete → redirects to `/finish-profile`
  - If complete → redirects to `?next` param or `/dashboard`
- Added "already-registered" banner:
  - Displays when `msg=already-registered` in query params
  - Message: "Welcome back! ✨ It looks like you already have an account. Log in to complete your profile and get started."

#### `src/proxy.ts` (Middleware)
**Changes:**
- Added `/finish-profile` to `PROTECTED_PREFIXES` array
- Updated `config.matcher` to include `/finish-profile/:path*`
- Effect: `/finish-profile` now requires authentication; unauthenticated users redirected to login

## Registration Flow

### New User Signup Path
```
1. User visits /signup
2. Fills form: email, password, role (athlete/coach)
3. Clicks "Create account"
   → Calls supabase.auth.signUp()
4. If email confirmation required:
   → Redirected to /login?msg=confirm-email
5. If instant session:
   → Redirected to /finish-profile
6. User completes profile form:
   → Full name (required)
   → Age, height, weight (optional)
   → Role (can be changed)
7. Clicks "Complete Profile"
   → Server action inserts/updates profile
   → Redirected to /dashboard
```

### Existing User Login Path
```
1. User visits /login
2. Fills form: email, password
3. Clicks "Continue to dashboard"
   → Calls supabase.auth.signInWithPassword()
4. If login succeeds:
   → Calls getCurrentUserProfile()
   → Checks isProfileComplete()
5. If profile incomplete:
   → Redirected to /finish-profile
6. If profile complete:
   → Redirected to /dashboard
```

### "Already Registered" Case
```
1. New user tries to signup with existing email
2. Signup shows error:
   → "This email is already registered. Please log in instead to complete your profile."
3. User can click login link
4. User logs in
5. Login checks profile completeness
6. If incomplete → /finish-profile
7. If complete → /dashboard
```

## Database Operations

### Profile Insert (New User)
```sql
INSERT INTO profiles (user_id, email, full_name, age, height_cm, weight_kg, role, created_at)
VALUES (
  auth.uid(),
  'user@example.com',
  'John Doe',       -- required
  25,               -- optional (null if not provided)
  180,              -- optional (null if not provided)
  75,               -- optional (null if not provided)
  'athlete',        -- required
  now()
)
```

### Profile Update (Returning User)
```sql
UPDATE profiles
SET full_name = 'John Doe', age = 25, height_cm = 180, weight_kg = 75, role = 'athlete'
WHERE user_id = auth.uid()
```

### Profile Fetch (For Completion Check)
```sql
SELECT user_id, email, full_name, age, height_cm, weight_kg, role, created_at
FROM profiles
WHERE user_id = auth.uid()
```

## UI/UX Details

### Dark Theme Consistency
- Background: `bg-[#050816]` (zinc-950)
- Card: `border border-zinc-800 bg-zinc-900/80`
- Inputs: `bg-zinc-900 border border-zinc-800 rounded-xl`
- Focus: `border-emerald-500 ring-1 ring-emerald-500/50`
- Buttons: `bg-emerald-500 hover:bg-emerald-600`

### Responsive Design
- Mobile-first: Full width with padding
- Desktop: Proper spacing and grid layouts
- Input fields: Full width on mobile, grid layout on finish-profile
- Buttons: Large touch targets (48px minimum)

### Accessibility
- Proper `<label>` elements with `htmlFor` attributes
- Required fields marked with red asterisk `*`
- Optional fields marked with gray "(Optional)" text
- Error messages in accessible red with good contrast
- Loading states disable form interactions

## Error Handling

### Signup Errors
- "User already registered" → Custom helpful message + login suggestion
- Other auth errors → Display error message, allow retry
- Profile insert errors → Caught and displayed to user

### Login Errors
- "Email not confirmed" → Custom message directing to confirmation
- Other auth errors → Display error message
- Profile fetch errors → Safely redirect to finish-profile

### Finish Profile Errors
- Profile fetch errors → Show error banner with retry
- Profile insert/update errors → Display in form error section
- Missing auth → Caught by middleware, redirect to login

## Testing Checklist

- [ ] Create new account with email/password/role → redirects to `/finish-profile`
- [ ] Complete profile form (all fields) → inserts to database → redirects to `/dashboard`
- [ ] Complete profile form (required only) → inserts with nulls → redirects to `/dashboard`
- [ ] Login with complete profile → goes straight to `/dashboard`
- [ ] Login with incomplete profile → redirects to `/finish-profile`
- [ ] Try signup with existing email → shows "already registered" message
- [ ] Try accessing `/finish-profile` without auth → redirects to login
- [ ] Close browser and reopen → profile completeness checked on login
- [ ] Mobile responsive layout works correctly
- [ ] Form validation and error states work

## Files Changed Summary

| File | Change Type | Lines Changed |
|------|-------------|----------------|
| `src/app/(app)/finish-profile/page.tsx` | **Created** | 43 |
| `src/app/(app)/finish-profile/actions.ts` | **Created** | 121 |
| `src/components/auth/FinishProfileForm.tsx` | **Created** | 177 |
| `src/lib/profileUtils.ts` | **Created** | 8 |
| `src/app/(auth)/signup/page.tsx` | Modified | -57 |
| `src/app/(auth)/login/login-form.tsx` | Modified | +28 |
| `src/proxy.ts` | Modified | +2 |

**Build Status**: ✅ **SUCCESS** - Zero errors, all routes compiled
