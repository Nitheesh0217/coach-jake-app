"use client";

import type { CompletePlayerCardData } from "@/app/(app)/finish-profile/actions";

interface PlayerCardStep4Props {
  formData: Partial<CompletePlayerCardData>;
  setFormData: (data: Partial<CompletePlayerCardData>) => void;
}

const VISIBILITY_OPTIONS = [
  { id: "private", name: "Private", emoji: "🔒", desc: "Only you can see" },
  { id: "coach_only", name: "Coach Only", emoji: "👨‍🏫", desc: "Visible to your coach" },
  { id: "community", name: "Community", emoji: "🌍", desc: "Visible to all" },
];

const SESSION_LENGTHS = [
  { value: 30, label: "30 min" },
  { value: 45, label: "45 min" },
  { value: 60, label: "60 min" },
  { value: 75, label: "75 min" },
  { value: 90, label: "90 min" },
];

const SLEEP_HOURS = [
  { value: "<6", label: "Less than 6h" },
  { value: "6-7", label: "6-7 hours" },
  { value: "7-8", label: "7-8 hours" },
  { value: ">8", label: "More than 8h" },
];

const SCHEDULE_BLOCKS = [
  { id: "morning", label: "🌅 Morning", emoji: "🌅" },
  { id: "afternoon", label: "☀️ Afternoon", emoji: "☀️" },
  { id: "evening", label: "🌆 Evening", emoji: "🌆" },
  { id: "late_night", label: "🌙 Late Night", emoji: "🌙" },
];

export default function PlayerCardStep4({
  formData,
  setFormData,
}: PlayerCardStep4Props) {
  const toggleScheduleBlock = (blockId: string) => {
    const current = formData.schedule_blocks || [];
    const updated = current.includes(blockId)
      ? current.filter((b) => b !== blockId)
      : [...current, blockId];
    setFormData({ ...formData, schedule_blocks: updated });
  };

  return (
    <div className="space-y-6">
      <p className="text-zinc-400 text-sm">Your schedule, preferences, and visibility</p>

      {/* Weekly Sessions Slider */}
      <div>
        <label className="block text-sm font-medium text-white mb-3">
          Weekly Sessions Target <span className="text-red-400">*</span>
        </label>
        <div className="flex items-center gap-4">
          <input
            type="range"
            min="1"
            max="7"
            value={formData.weekly_sessions_target || 3}
            onChange={(e) => setFormData({ ...formData, weekly_sessions_target: Number(e.target.value) })}
            className="flex-1 h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer slider"
          />
          <div className="text-center min-w-fit">
            <span className="text-2xl font-bold text-emerald-400">{formData.weekly_sessions_target || 3}</span>
            <span className="text-xs text-zinc-400 block">sessions/week</span>
          </div>
        </div>
      </div>

      {/* Typical Session Length */}
      <div className="pt-4 border-t border-zinc-800">
        <label className="block text-sm font-medium text-white mb-3">
          Typical Session Length <span className="text-red-400">*</span>
        </label>
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
          {SESSION_LENGTHS.map((session) => (
            <button
              key={session.value}
              type="button"
              onClick={() =>
                setFormData({ ...formData, typical_session_length_minutes: session.value })
              }
              className={`p-3 rounded-lg border-2 text-center text-sm font-medium transition-all ${
                formData.typical_session_length_minutes === session.value
                  ? "border-emerald-500 bg-emerald-500/10 text-emerald-400"
                  : "border-zinc-700 bg-zinc-900 text-white hover:border-zinc-600"
              }`}
            >
              {session.label}
            </button>
          ))}
        </div>
      </div>

      {/* Sleep Hours */}
      <div className="pt-4 border-t border-zinc-800">
        <label className="block text-sm font-medium text-white mb-3">
          Sleep Per Night <span className="text-red-400">*</span>
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {SLEEP_HOURS.map((sleep) => (
            <button
              key={sleep.value}
              type="button"
              onClick={() =>
                setFormData({ ...formData, sleep_hours_per_night: sleep.value })
              }
              className={`p-3 rounded-lg border-2 text-center text-sm font-medium transition-all ${
                formData.sleep_hours_per_night === sleep.value
                  ? "border-emerald-500 bg-emerald-500/10 text-emerald-400"
                  : "border-zinc-700 bg-zinc-900 text-white hover:border-zinc-600"
              }`}
            >
              {sleep.label}
            </button>
          ))}
        </div>
      </div>

      {/* Available Training Blocks */}
      <div className="pt-4 border-t border-zinc-800">
        <label className="block text-sm font-medium text-white mb-3">
          Available Training Times <span className="text-red-400">*</span>
        </label>
        <div className="grid grid-cols-2 gap-2">
          {SCHEDULE_BLOCKS.map((block) => (
            <button
              key={block.id}
              type="button"
              onClick={() => toggleScheduleBlock(block.id)}
              className={`p-3 rounded-lg border-2 text-center transition-all ${
                (formData.schedule_blocks || []).includes(block.id)
                  ? "border-emerald-500 bg-emerald-500/10 text-emerald-400"
                  : "border-zinc-700 bg-zinc-900 text-white hover:border-zinc-600"
              }`}
            >
              <div className="text-xl mb-1">{block.emoji}</div>
              <div className="text-xs font-medium">{block.id === "late_night" ? "Late Night" : block.id.charAt(0).toUpperCase() + block.id.slice(1)}</div>
            </button>
          ))}
        </div>
        {(!formData.schedule_blocks || formData.schedule_blocks.length === 0) && (
          <p className="text-xs text-amber-400 mt-2">⚠️ Select at least one available training time</p>
        )}
      </div>

      {/* Profile Visibility */}
      <div className="pt-4 border-t border-zinc-800">
        <label className="block text-sm font-medium text-white mb-3">
          Profile Visibility <span className="text-red-400">*</span>
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {VISIBILITY_OPTIONS.map((vis) => (
            <button
              key={vis.id}
              type="button"
              onClick={() => setFormData({ ...formData, visibility: vis.id })}
              className={`p-4 rounded-xl border-2 transition-all text-center ${
                formData.visibility === vis.id
                  ? "border-emerald-500 bg-emerald-500/10"
                  : "border-zinc-700 bg-zinc-900 hover:border-zinc-600"
              }`}
            >
              <div className="text-2xl mb-2">{vis.emoji}</div>
              <p className="font-semibold text-white text-sm">{vis.name}</p>
              <p className="text-xs text-zinc-400 mt-1">{vis.desc}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Highlight Tagline */}
      <div className="pt-4 border-t border-zinc-800">
        <label htmlFor="tagline" className="block text-sm font-medium text-white mb-2">
          Highlight Tagline <span className="text-red-400">*</span>
        </label>
        <p className="text-xs text-zinc-400 mb-3">
          {"A short phrase that describes your game (e.g., \"Explosive PG with court vision\")"}
        </p>
        <input
          id="tagline"
          type="text"
          maxLength={80}
          value={formData.highlight_tagline || ""}
          onChange={(e) => setFormData({ ...formData, highlight_tagline: e.target.value })}
          placeholder="Explosive PG with court vision"
          className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50 transition-all"
        />
        <p className="text-xs text-zinc-500 mt-1">
          {formData.highlight_tagline?.length || 0}/80 characters
        </p>
      </div>

      <style>{`
        input[type="range"].slider::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #10b981;
          cursor: pointer;
          box-shadow: 0 0 10px rgba(16, 185, 129, 0.5);
        }
        input[type="range"].slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #10b981;
          cursor: pointer;
          border: none;
          box-shadow: 0 0 10px rgba(16, 185, 129, 0.5);
        }
      `}</style>
    </div>
  );
}
