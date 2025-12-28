"use client";

import { useEffect, useState } from "react";
import { supabaseBrowser } from "@/lib/supabaseClient";
import TrainerDashboardLayout from "@/components/layout/TrainerDashboardLayout";
import KPICards from "@/components/trainer/KPICards";
import AthletesPanel from "@/components/trainer/AthletesPanel";
import CalendarPanel from "@/components/trainer/CalendarPanel";
import CoachInsightsWidget from "@/components/trainer/CoachInsightsWidget";
import RecentActivityWidget from "@/components/trainer/RecentActivityWidget";

type Profile = {
  id: string;
  email: string;
  role: "athlete" | "coach";
  full_name: string | null;
};

export default function TrainerDashboardPage() {
  const supabase = supabaseBrowser();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const { data: auth } = await supabase.auth.getUser();
      const user = auth.user;

      if (!user) {
        setError("Not logged in.");
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("profiles")
        .select("id,email,role,full_name")
        .eq("id", user.id)
        .maybeSingle();

      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }

      if (!data) {
        setError("Profile not found.");
        setLoading(false);
        return;
      }

      // Check if user is a coach
      if (data.role !== "coach") {
        setError("This view is only for coaches. Contact support if you need access.");
        setLoading(false);
        return;
      }

      setProfile(data as Profile);
      setLoading(false);
    }

    load();
  }, [supabase]);

  if (loading) {
    return (
      <TrainerDashboardLayout coachName="Coach">
        <div className="flex items-center justify-center min-h-screen">
          <p className="text-zinc-400">Loading dashboard…</p>
        </div>
      </TrainerDashboardLayout>
    );
  }

  if (error) {
    return (
      <TrainerDashboardLayout coachName="Coach">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="rounded-2xl border border-red-500/30 bg-red-500/10 px-6 py-4 text-red-200">
            <p className="font-medium">{error}</p>
          </div>
        </div>
      </TrainerDashboardLayout>
    );
  }

  const coachName = profile?.full_name?.split(" ")[0] ?? "Coach";

  return (
    <TrainerDashboardLayout coachName={coachName}>
      <div className="max-w-7xl mx-auto px-4 py-6 lg:py-8 space-y-8">
        {/* Page title for SEO */}
        <h1 className="sr-only">Trainer Dashboard</h1>

        {/* KPI Cards */}
        <KPICards athletes={[]} />

        {/* Athletes & Calendar Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          <div className="lg:col-span-2">
            <AthletesPanel athletes={[]} />
          </div>
          <div className="lg:col-span-1">
            <CalendarPanel />
          </div>
        </div>

        {/* Insights & Activity Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          <div className="lg:col-span-2">
            <CoachInsightsWidget />
          </div>
          <div className="lg:col-span-1">
            <RecentActivityWidget />
          </div>
        </div>
      </div>
    </TrainerDashboardLayout>
  );
}
