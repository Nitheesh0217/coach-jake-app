"use client";

import { useRouter } from "next/navigation";
import type { CompletePlayerCardData } from "@/app/(app)/finish-profile/actions";

interface PlayerCardSummaryProps {
  profile: CompletePlayerCardData;
  router: ReturnType<typeof useRouter>;
}

export default function PlayerCardSummary({
  profile,
  router,
}: PlayerCardSummaryProps) {
  const checklistItems = [
    { label: "Profile basics complete", done: !!profile.fullName && !!profile.age },
    { label: "Archetype selected", done: !!profile.playerArchetype },
    { label: "Goal set", done: profile.goals && profile.goals.length > 0 },
    { label: "Schedule added", done: !!profile.weekly_sessions_target },
  ];

  const allComplete = checklistItems.every((item) => item.done);

  const archetypeEmojis: Record<string, string> = {
    "3-d-wing": "🎯",
    "floor-general": "👑",
    "slashing-guard": "⚡",
    "stretch-big": "📍",
    "two-way-wing": "🔄",
    "rim-protector": "🛡️",
  };

  const archetypeNames: Record<string, string> = {
    "3-d-wing": "3 & D Wing",
    "floor-general": "Floor General",
    "slashing-guard": "Slashing Guard",
    "stretch-big": "Stretch Big",
    "two-way-wing": "Two-Way Wing",
    "rim-protector": "Rim Protector",
  };

  return (
    <div className="min-h-screen bg-[#050816] px-4 py-8 flex items-center justify-center">
      <div className="max-w-2xl w-full">
        {/* Celebration Header */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-4 animate-pulse">🎉</div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Your Player Card is Ready
          </h1>
          <p className="text-zinc-400">Welcome to Coach Jake's exclusive athlete network</p>
        </div>

        {/* Player Card Display */}
        <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-emerald-500/20 rounded-2xl p-6 sm:p-8 mb-8 shadow-2xl">
          {/* Card Header */}
          <div className="flex items-start gap-4 mb-6 pb-6 border-b border-zinc-800">
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center text-2xl font-bold text-white">
              {profile.fullName?.charAt(0) || "?"}
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-white">{profile.fullName}</h2>
              <p className="text-emerald-400 font-semibold">
                {archetypeEmojis[profile.playerArchetype || ""]} {archetypeNames[profile.playerArchetype || ""]}
              </p>
              {profile.highlight_tagline && (
                <p className="text-sm text-zinc-400 italic mt-1">"{profile.highlight_tagline}"</p>
              )}
            </div>
          </div>

          {/* Card Details */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            {/* Measurements */}
            {(profile.age || profile.heightCm || profile.weightKg) && (
              <div className="bg-zinc-800/50 rounded-lg p-3">
                <p className="text-xs text-zinc-500 uppercase tracking-wide mb-2">Measurements</p>
                <div className="space-y-1 text-sm">
                  {profile.age && <p className="text-white">{profile.age} yrs</p>}
                  {profile.heightCm && <p className="text-white">{profile.heightCm} cm</p>}
                  {profile.weightKg && <p className="text-white">{profile.weightKg} kg</p>}
                </div>
              </div>
            )}

            {/* Training Context */}
            <div className="bg-zinc-800/50 rounded-lg p-3">
              <p className="text-xs text-zinc-500 uppercase tracking-wide mb-2">Training Context</p>
              <p className="text-white font-semibold capitalize">{profile.training_context}</p>
            </div>

            {/* Sessions Per Week */}
            <div className="bg-zinc-800/50 rounded-lg p-3">
              <p className="text-xs text-zinc-500 uppercase tracking-wide mb-2">Sessions/Week</p>
              <p className="text-white font-semibold">{profile.weekly_sessions_target}x</p>
            </div>

            {/* Sleep */}
            <div className="bg-zinc-800/50 rounded-lg p-3">
              <p className="text-xs text-zinc-500 uppercase tracking-wide mb-2">Sleep/Night</p>
              <p className="text-white font-semibold">{profile.sleep_hours_per_night}</p>
            </div>
          </div>

          {/* Primary Goal */}
          {profile.goals && profile.goals.length > 0 && (
            <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4 mb-6">
              <p className="text-xs text-emerald-400 uppercase tracking-wide mb-2">Primary Goal</p>
              <p className="text-white font-semibold">{profile.goals[0].title}</p>
              <p className="text-sm text-zinc-400">
                Target: {profile.goals[0].target_value} by {profile.goals[0].target_date}
              </p>
            </div>
          )}

          {/* Social Links */}
          {(profile.instagram_url || profile.youtube_url) && (
            <div className="flex gap-3 pt-4 border-t border-zinc-800">
              {profile.instagram_url && (
                <a
                  href={profile.instagram_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2 px-3 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-center text-sm text-white transition"
                >
                  📸 Instagram
                </a>
              )}
              {profile.youtube_url && (
                <a
                  href={profile.youtube_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2 px-3 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-center text-sm text-white transition"
                >
                  📺 YouTube
                </a>
              )}
            </div>
          )}
        </div>

        {/* Completion Checklist */}
        <div className="bg-zinc-900/80 border border-zinc-800 rounded-xl p-6 mb-8">
          <p className="text-sm font-semibold text-white mb-4">Profile Completeness</p>
          <div className="space-y-3">
            {checklistItems.map((item, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center text-sm font-bold ${
                    item.done ? "bg-emerald-500 text-white" : "bg-zinc-800 text-zinc-600"
                  }`}
                >
                  {item.done ? "✓" : "○"}
                </div>
                <span className={item.done ? "text-white" : "text-zinc-500"}>{item.label}</span>
              </div>
            ))}
          </div>

          {allComplete && (
            <div className="mt-4 p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-lg">
              <p className="text-sm font-semibold text-emerald-400">✨ Fully Scouted Profile</p>
              <p className="text-xs text-emerald-300 mt-1">You've completed your entire Player Card!</p>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={() => router.push("/dashboard")}
            className="flex-1 py-4 px-6 bg-emerald-500 hover:bg-emerald-600 text-black font-semibold rounded-xl transition shadow-lg shadow-emerald-500/30"
          >
            Go to Dashboard
          </button>
          <button
            onClick={() => window.location.reload()}
            className="flex-1 py-4 px-6 border border-zinc-700 hover:bg-zinc-900 text-white font-semibold rounded-xl transition"
          >
            Edit Card
          </button>
        </div>
      </div>
    </div>
  );
}
