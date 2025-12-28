import { supabaseServer } from "@/lib/supabaseClient";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import TrainerDashboardLayout from "@/components/layout/TrainerDashboardLayout";
import AthleteDashboard from "@/components/dashboard/AthleteDashboard";
import CoachDashboard from "@/components/dashboard/CoachDashboard";
import { getMeasurements } from "./measurements-actions";
import { isFullyScouted } from "@/lib/profileUtils";
import type { Profile, Workout, Measurement, AthleteProfile } from "@/types";

type DashboardResponse = {
  profile: Profile | null;
  error: string | null;
  athleteData?: {
    todayWorkout: Workout | null;
    weekLogsCount: number;
    last30DaysCount: number;
    measurements: Measurement[];
  };
  coachData?: {
    athletes: (AthleteProfile & { is_fully_scouted?: boolean })[];
    avgCompletion: number;
    activeAthletesCount: number;
    totalSessions: number;
  };
};

async function getDashboardData(): Promise<DashboardResponse> {
  try {
    const cookieStore = await cookies();
    const supabase = supabaseServer({
      get: (name) => {
        const val = cookieStore.get(name);
        return val ? { value: val.value } : undefined;
      },
      set: (name, value, options) => {
        // Read-only in Server Components - no-op
      },
      remove: (name, options) => {
        // Read-only in Server Components - no-op
      },
    });

    const { data: auth } = await supabase.auth.getUser();
    const user = auth.user;

    if (!user) {
      return { profile: null, error: "Not logged in." };
    }

    // Fetch full profile including Player Card fields
    const { data: profileData, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("user_id", user.id)
      .maybeSingle();

    if (profileError) {
      return { profile: null, error: profileError.message };
    }

    if (!profileData) {
      return { profile: null, error: "Profile not found." };
    }

    const profile = profileData as Profile;

    // Check if profile is fully scouted (has all Player Card fields)
    // If not, redirect to finish-profile
    if (!isFullyScouted(profile) && profile.role === "athlete") {
      redirect("/finish-profile");
    }

    if (profile.role === "athlete") {
      // Fetch active workouts
      const { data: workouts } = await supabase
        .from("workouts")
        .select("id,title,description,is_active,created_at")
        .eq("is_active", true)
        .limit(1);

      const todayWorkout = workouts && workouts.length > 0 ? workouts[0] : null;

      // Fetch workout logs for last 7 days
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

      const { data: logs7d } = await supabase
        .from("workout_logs")
        .select("id")
        .eq("user_id", user.id)
        .gte("created_at", sevenDaysAgo.toISOString());

      // Fetch workout logs for last 30 days
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      const { data: logs30d } = await supabase
        .from("workout_logs")
        .select("id")
        .eq("user_id", user.id)
        .gte("created_at", thirtyDaysAgo.toISOString());

      // Fetch recent measurements
      const measurementsResult = await getMeasurements();

      return {
        profile,
        error: null,
        athleteData: {
          todayWorkout: todayWorkout as Workout | null,
          weekLogsCount: logs7d?.length ?? 0,
          last30DaysCount: logs30d?.length ?? 0,
          measurements: measurementsResult.measurements ?? [],
        },
      };
    } else if (profile.role === "coach") {
      // Fetch all athlete profiles with Player Card fields
      const { data: athletes } = await supabase
        .from("profiles")
        .select("*")
        .eq("role", "athlete");

      if (!athletes || athletes.length === 0) {
        return {
          profile,
          error: null,
          coachData: {
            athletes: [],
            avgCompletion: 0,
            activeAthletesCount: 0,
            totalSessions: 0,
          },
        };
      }

      // Get this month's date range
      const thisMonth = new Date();
      thisMonth.setDate(1);
      const nextMonth = new Date(thisMonth);
      nextMonth.setMonth(nextMonth.getMonth() + 1);

      // Compute completion % and sessions for each athlete
      const athletesWithData = await Promise.all(
        athletes.map(async (athlete) => {
          // Get all workout logs for this athlete (for completion %)
          const { data: allLogs } = await supabase
            .from("workout_logs")
            .select("created_at")
            .eq("user_id", athlete.user_id);

          // Get logs for this week
          const sevenDaysAgo = new Date();
          sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

          const { data: thisWeekLogs } = await supabase
            .from("workout_logs")
            .select("created_at")
            .eq("user_id", athlete.user_id)
            .gte("created_at", sevenDaysAgo.toISOString());

          // Get all active workouts
          const { data: activeWorkouts } = await supabase
            .from("workouts")
            .select("id")
            .eq("is_active", true);

          const totalLogs = allLogs?.length ?? 0;
          const expectedWorkouts = activeWorkouts?.length ?? 1;
          const completionPercent = Math.round(
            (totalLogs / (expectedWorkouts * 4)) * 100
          );

          const lastLog = allLogs && allLogs.length > 0 
            ? allLogs[allLogs.length - 1].created_at 
            : null;

          return {
            user_id: athlete.user_id,
            full_name: athlete.full_name || "Unknown",
            email: athlete.email,
            age: athlete.age,
            height_cm: athlete.height_cm,
            weight_kg: athlete.weight_kg,
            role: athlete.role,
            completion_percentage: Math.min(completionPercent, 100),
            sessions_this_week: thisWeekLogs?.length ?? 0,
            last_workout_date: lastLog,
            is_fully_scouted: athlete.is_fully_scouted ?? false,
          };
        })
      );

      // Calculate averages
      const avgCompletion = athletesWithData.length > 0
        ? athletesWithData.reduce((sum, a) => sum + (a.completion_percentage || 0), 0) / athletesWithData.length
        : 0;

      const activeAthletesCount = athletesWithData.filter(
        (a) => (a.sessions_this_week ?? 0) > 0
      ).length;

      const totalSessions = athletesWithData.reduce(
        (sum, a) => sum + (a.sessions_this_week ?? 0),
        0
      );

      return {
        profile,
        error: null,
        coachData: {
          athletes: athletesWithData,
          avgCompletion,
          activeAthletesCount,
          totalSessions,
        },
      };
    }

    return { profile, error: null };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return { profile: null, error: `Dashboard error: ${message}` };
  }
}

export default async function DashboardPage() {
  const dashboardData = await getDashboardData();
  const { profile, error, athleteData, coachData } = dashboardData;

  // If profile doesn't exist, redirect to finish-profile
  if (!profile) {
    if (error === "Profile not found.") {
      redirect("/finish-profile");
    }
    // For other errors, still show error state
    return (
      <TrainerDashboardLayout coachName="Coach">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="rounded-2xl border border-red-500/30 bg-red-500/10 px-6 py-8">
            <h2 className="text-lg font-semibold text-red-200 mb-2">Dashboard Error</h2>
            <p className="text-red-200">{error}</p>
            <p className="text-red-300 text-sm mt-4">Please try refreshing the page or logging out and back in.</p>
          </div>
        </div>
      </TrainerDashboardLayout>
    );
  }

  const coachName = profile.full_name?.split(" ")[0] ?? "Coach";

  // ATHLETE DASHBOARD
  if (profile.role === "athlete") {
    if (!athleteData) {
      return (
        <TrainerDashboardLayout coachName={coachName}>
          <div className="max-w-6xl mx-auto px-4 py-8">
            <div className="rounded-2xl border border-red-500/30 bg-red-500/10 px-6 py-8">
              <h2 className="text-lg font-semibold text-red-200 mb-2">Failed to Load Athlete Data</h2>
              <p className="text-red-200">Unable to fetch your workouts and measurements. Please try refreshing the page.</p>
            </div>
          </div>
        </TrainerDashboardLayout>
      );
    }

    return (
      <TrainerDashboardLayout coachName={coachName}>
        <AthleteDashboard
          todayWorkout={athleteData.todayWorkout}
          weekLogsCount={athleteData.weekLogsCount}
          last30DaysCount={athleteData.last30DaysCount}
          measurements={athleteData.measurements}
          userName={profile.full_name || "Athlete"}
        />
      </TrainerDashboardLayout>
    );
  }

  // COACH DASHBOARD
  if (profile.role === "coach") {
    if (!coachData) {
      return (
        <TrainerDashboardLayout coachName={coachName}>
          <div className="max-w-6xl mx-auto px-4 py-8">
            <div className="rounded-2xl border border-red-500/30 bg-red-500/10 px-6 py-8">
              <h2 className="text-lg font-semibold text-red-200 mb-2">Failed to Load Coach Data</h2>
              <p className="text-red-200">Unable to fetch athlete data. Please try refreshing the page.</p>
            </div>
          </div>
        </TrainerDashboardLayout>
      );
    }

    return (
      <TrainerDashboardLayout coachName={coachName}>
        <CoachDashboard
          athletes={coachData.athletes}
          avgCompletion={coachData.avgCompletion}
          activeAthletesCount={coachData.activeAthletesCount}
          totalSessions={coachData.totalSessions}
          coachName={profile.full_name || "Coach"}
        />
      </TrainerDashboardLayout>
    );
  }

  // Unknown role
  return (
    <TrainerDashboardLayout coachName={coachName}>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="rounded-2xl border border-red-500/30 bg-red-500/10 px-6 py-8">
          <h2 className="text-lg font-semibold text-red-200 mb-2">Unknown User Role</h2>
          <p className="text-red-200">Your account role is not recognized. Please contact support.</p>
        </div>
      </div>
    </TrainerDashboardLayout>
  );
}
