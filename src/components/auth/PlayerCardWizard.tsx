"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import type { Profile, Role } from "@/types";
import type { CompletePlayerCardData } from "@/app/(app)/finish-profile/actions";
import { completePlayerCard } from "@/app/(app)/finish-profile/actions";
import PlayerCardStep1 from "./steps/PlayerCardStep1";
import PlayerCardStep2 from "./steps/PlayerCardStep2";
import PlayerCardStep3 from "./steps/PlayerCardStep3";
import PlayerCardStep4 from "./steps/PlayerCardStep4";
import PlayerCardSummary from "./summary/PlayerCardSummary";

interface PlayerCardWizardProps {
  currentProfile: Profile | null;
  userRole: Role;
}

export default function PlayerCardWizard({
  currentProfile,
  userRole,
}: PlayerCardWizardProps) {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [completed, setCompleted] = useState(false);

  // Form state for all steps
  const [formData, setFormData] = useState<Partial<CompletePlayerCardData>>({
    fullName: currentProfile?.full_name || "",
    age: currentProfile?.age || null,
    heightCm: currentProfile?.height_cm || null,
    weightKg: currentProfile?.weight_kg || null,
    role: userRole,
    playerArchetype: currentProfile?.player_archetype || "",
    playstyle_team_vs_iso: currentProfile?.playstyle_team_vs_iso ?? 50,
    playstyle_shooter_vs_slasher: currentProfile?.playstyle_shooter_vs_slasher ?? 50,
    playstyle_finesse_vs_power: currentProfile?.playstyle_finesse_vs_power ?? 50,
    training_context: currentProfile?.training_context || "general",
    goals: currentProfile?.goals || [],
    weekly_sessions_target: currentProfile?.weekly_sessions_target || 3,
    typical_session_length_minutes: currentProfile?.typical_session_length_minutes || 60,
    sleep_hours_per_night: currentProfile?.sleep_hours_per_night || "7-8",
    schedule_blocks: currentProfile?.schedule_blocks || ["afternoon", "evening"],
    visibility: currentProfile?.visibility || "coach_only",
    instagram_url: currentProfile?.instagram_url || null,
    youtube_url: currentProfile?.youtube_url || null,
    highlight_tagline: currentProfile?.highlight_tagline || "",
  });

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
      setError(null);
    }
  };

  const handlePrev = () => {
    if (step > 1) {
      setStep(step - 1);
      setError(null);
    }
  };

  const handleSkip = () => {
    setCompleted(true);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Validate required fields
      if (!formData.fullName?.trim()) {
        setError("Full name is required");
        setLoading(false);
        return;
      }

      if (!formData.playerArchetype) {
        setError("Please select an archetype");
        setLoading(false);
        return;
      }

      if (!formData.training_context) {
        setError("Please select a training context");
        setLoading(false);
        return;
      }

      if (!formData.goals || formData.goals.length === 0) {
        setError("Please add at least one goal");
        setLoading(false);
        return;
      }

      const result = await completePlayerCard(formData as CompletePlayerCardData);

      if (!result.success) {
        setError(result.error || "Failed to save Player Card");
        setLoading(false);
        return;
      }

      // Show success summary
      setCompleted(true);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error";
      setError(`Error: ${message}`);
      setLoading(false);
    }
  };

  const steps = [
    { number: 1, title: "Identity", description: "Your name, age, height & weight" },
    { number: 2, title: "Archetype", description: "Your role & playstyle on court" },
    { number: 3, title: "Goals", description: "Training context & personal goals" },
    { number: 4, title: "Visibility", description: "Social links & profile visibility" },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8 sm:py-16">
      <div className="w-full max-w-2xl">
        {/* Completion screen */}
        {completed && (
          <PlayerCardSummary
            profile={formData as CompletePlayerCardData}
            router={router}
          />
        )}

        {/* Wizard form */}
        {!completed && (
          <div className="rounded-2xl border border-emerald-500/20 bg-gradient-to-b from-zinc-900/80 to-zinc-950/80 backdrop-blur-xl p-8 shadow-2xl shadow-emerald-500/10 relative overflow-hidden">
            {/* Premium glow background */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-500/0 via-emerald-500/5 to-emerald-500/0 pointer-events-none"></div>

            {/* Content */}
            <div className="relative z-10">
              {/* Steps indicator - Premium version */}
              <div className="mb-8">
                <div className="flex justify-between mb-6">
                  {steps.map((s) => (
                    <button
                      key={s.number}
                      onClick={() => {
                        if (s.number < step) setStep(s.number);
                      }}
                      className={`flex flex-col items-center ${
                        s.number <= step ? "cursor-pointer" : "cursor-not-allowed opacity-50"
                      }`}
                    >
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 font-semibold transition-all relative ${
                          s.number === step
                            ? "bg-gradient-to-br from-emerald-400 to-emerald-600 text-black ring-2 ring-emerald-300 shadow-lg shadow-emerald-500/50"
                            : s.number < step
                            ? "bg-emerald-500/20 border border-emerald-500 text-emerald-300"
                            : "bg-zinc-800 border border-zinc-700 text-zinc-500"
                        }`}
                      >
                        {s.number < step ? "✓" : s.number}
                      </div>
                      <span className={`text-xs font-semibold transition-colors ${
                        s.number === step ? "text-emerald-400" : s.number < step ? "text-emerald-300" : "text-zinc-500"
                      }`}>
                        {s.title}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Premium progress bar with glow */}
                <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden relative">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-600 transition-all duration-500 shadow-lg shadow-emerald-500/50"
                    style={{ width: `${(step / 4) * 100}%` }}
                  />
                </div>
              </div>

              {/* Step Header - Premium */}
              <div className="text-center mb-8">
                <div className="inline-block">
                  <span className="text-xs font-bold tracking-widest text-emerald-400 uppercase">
                    Step {step} of 4
                  </span>
                </div>
                <h1 className="text-3xl sm:text-4xl font-bold text-white mt-2 mb-2">
                  {steps[step - 1].title}
                </h1>
                <p className="text-zinc-400">{steps[step - 1].description}</p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Step 1: Identity */}
                {step === 1 && (
                  <PlayerCardStep1 formData={formData} setFormData={setFormData} />
                )}

                {/* Step 2: Archetype */}
                {step === 2 && (
                  <PlayerCardStep2 formData={formData} setFormData={setFormData} />
                )}

                {/* Step 3: Goals & Schedule */}
                {step === 3 && (
                  <PlayerCardStep3 formData={formData} setFormData={setFormData} />
                )}

                {/* Step 4: Visibility & Social */}
                {step === 4 && (
                  <PlayerCardStep4 formData={formData} setFormData={setFormData} />
                )}

                {/* Error Message - Premium */}
                {error && (
                  <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl backdrop-blur-sm">
                    <p className="text-red-400 text-sm font-medium">⚠️ {error}</p>
                  </div>
                )}

                {/* Buttons - Premium */}
                <div className="flex gap-3 pt-4">
                  {step > 1 && (
                    <button
                      type="button"
                      onClick={handlePrev}
                      disabled={loading}
                      className="flex-1 py-3 px-4 border border-zinc-700 hover:border-zinc-600 rounded-xl text-zinc-300 hover:bg-zinc-900/50 disabled:opacity-50 font-semibold transition backdrop-blur-sm"
                    >
                      ← Back
                    </button>
                  )}

                  {step < 4 ? (
                    <button
                      type="button"
                      onClick={handleNext}
                      className="flex-1 py-3 px-4 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-black rounded-xl font-semibold transition shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50"
                    >
                      Next →
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex-1 py-3 px-4 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 disabled:from-emerald-500/50 disabled:to-emerald-600/50 text-black rounded-xl font-semibold transition shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 disabled:cursor-not-allowed"
                    >
                      {loading ? "Saving your Player Card..." : "🚀 Complete Player Card"}
                    </button>
                  )}
                </div>

                {/* Skip option - Premium */}
                <div className="text-center pt-2">
                  <button
                    type="button"
                    onClick={handleSkip}
                    className="text-zinc-500 hover:text-emerald-400 text-sm font-medium transition duration-200 underline-offset-2 hover:underline"
                  >
                    Skip for now →
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Decorative elements inside card */}
        <div className="mt-6 flex justify-center gap-4 text-2xl opacity-40">
          <span>🏀</span>
          <span>💪</span>
          <span>🔥</span>
          <span>⚡</span>
        </div>
      </div>
    </div>
  );
}
