"use client";

import { useRouter } from "next/navigation";
import OnboardingWizard, { WizardData } from "./OnboardingWizard";
import { completePlayerCard } from "@/app/(app)/finish-profile/actions";
import { useState } from "react";
import type { PlayerGoal } from "@/types";

export default function OnboardingWizardWrapper() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleComplete = async (data: WizardData) => {
    setIsSubmitting(true);
    setError(null);

    try {
      // Map wizard data to profile update
      const position = data.position || "guard";

      // Map goal IDs to PlayerGoal objects
      const goalLabels: Record<string, string> = {
        vertical: "Increase Vertical",
        strength: "Build Strength",
        conditioning: "Improve Conditioning",
        handles: "Sharpen Handles",
        "court-iq": "Improve Court IQ",
        recruited: "Get Recruited",
      };

      const playerGoals: PlayerGoal[] = data.goals.map((goalId) => ({
        title: goalLabels[goalId] || goalId,
        target_value: "100",
        target_date: new Date(Date.now() + 12 * 30 * 24 * 60 * 60 * 1000)
          .toISOString()
          .split("T")[0],
      }));

      // Map training times to schedule blocks
      const timeLabels: Record<string, string> = {
        morning: "morning",
        afternoon: "afternoon",
        evening: "evening",
        weekend: "weekend",
      };

      const result = await completePlayerCard({
        fullName: data.fullName,
        age: parseInt(data.age) || null,
        heightCm: parseInt(data.height) || null,
        weightKg: parseInt(data.weight) || null,
        role: "athlete",
        playerArchetype: position,
        playstyle_team_vs_iso: data.teamPlay,
        playstyle_shooter_vs_slasher: data.shooter,
        playstyle_finesse_vs_power: data.finesse,
        training_context: "training",
        goals: playerGoals,
        weekly_sessions_target: data.sessionsPerWeek,
        typical_session_length_minutes: data.sessionLength,
        sleep_hours_per_night: data.sleepHours.toString(),
        schedule_blocks: data.trainingTimes.map((t) => timeLabels[t]),
        visibility: "public",
        instagram_url: data.instagramUrl,
        youtube_url: data.youtubeUrl,
        highlight_tagline: data.highlightTagline,
      });

      if (result.success) {
        // Redirect to dashboard after success
        router.push("/dashboard");
      } else {
        setError(result.error || "Failed to complete profile");
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An error occurred. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return <OnboardingWizard onComplete={handleComplete} />;
}
