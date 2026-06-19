import { supabaseServer } from "@/lib/supabaseClient";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import TrainerDashboardLayout from "@/components/sections/layout/TrainerDashboardLayout";
import { ProgressCharts } from "@/components/sections/progress/ProgressCharts";
import { TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

export const dynamic = "force-dynamic";

async function getProgressData() {
  try {
    const cookieStore = await cookies();
    const supabase = supabaseServer({
      get: (name) => {
        const val = cookieStore.get(name);
        return val ? { value: val.value } : undefined;
      },
      set: () => {},
      remove: () => {},
    });

    const { data: auth } = await supabase.auth.getUser();
    const user = auth.user;

    if (!user) redirect("/login");

    const { data: profile } = await supabase
      .from("profiles")
      .select("*")
      .eq("user_id", user.id)
      .single();

    if (!profile) redirect("/finish-profile");

    // Fetch measurements for weight progress
    const { data: measurements } = await supabase
      .from("measurements")
      .select("*")
      .eq("user_id", user.id)
      .order("date", { ascending: true })
      .limit(30);

    // Fetch last 90 days of workout logs for consistency chart
    const ninetyDaysAgo = new Date();
    ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);

    const { data: logs } = await supabase
      .from("workout_logs")
      .select("date")
      .eq("user_id", user.id)
      .gte("date", ninetyDaysAgo.toISOString())
      .order("date", { ascending: true });

    // Group logs by week for consistency
    const weeklyData: Record<string, number> = {};
    logs?.forEach((log) => {
      const date = new Date(log.date);
      const weekStart = new Date(date);
      weekStart.setDate(date.getDate() - date.getDay());
      const weekKey = weekStart.toISOString().split("T")[0];
      weeklyData[weekKey] = (weeklyData[weekKey] || 0) + 1;
    });

    const consistencyData = Object.entries(weeklyData).map(([week, count]) => ({
      week,
      sessions: count,
    }));

    return {
      profile,
      measurements: measurements || [],
      consistencyData,
      error: null,
    };
  } catch (err) {
    return {
      profile: null,
      measurements: [],
      consistencyData: [],
      error: err instanceof Error ? err.message : "Unknown error",
    };
  }
}

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] as any },
});

export default async function ProgressPage() {
  const { profile, measurements, consistencyData, error } =
    await getProgressData();

  if (!profile) {
    return (
      <TrainerDashboardLayout coachName="Coach">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="rounded-2xl border border-red-500/30 bg-red-500/10 px-6 py-8">
            <h2 className="text-lg font-semibold text-red-200 mb-2">
              Error Loading Progress
            </h2>
            <p className="text-red-200">{error}</p>
          </div>
        </div>
      </TrainerDashboardLayout>
    );
  }

  return (
    <TrainerDashboardLayout
      coachName={profile.full_name?.split(" ")[0] ?? "Athlete"}
    >
      <div className="min-h-screen bg-transparent text-white pb-8">
        <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
          <div className="absolute top-[-10%] right-[10%] w-[600px] h-[600px] rounded-full bg-emerald-500/5 blur-[120px] animate-pulse" />
          <div className="absolute bottom-[20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-cyan-500/5 blur-[120px]" />
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-8 relative z-10">
          {/* Header */}
          <motion.div {...fade(0)} className="space-y-2">
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight flex items-center gap-3">
              <TrendingUp className="w-8 h-8 text-emerald-400" />
              Progress Tracking
            </h1>
            <p className="text-zinc-400">
              Monitor your training improvements over time
            </p>
          </motion.div>

          {/* Charts - rendered as client component */}
          <ProgressCharts
            measurements={measurements}
            consistencyData={consistencyData}
          />
        </div>
      </div>
    </TrainerDashboardLayout>
  );
}
