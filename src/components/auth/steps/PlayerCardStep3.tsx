"use client";

import { useState } from "react";
import type { CompletePlayerCardData } from "@/app/(app)/finish-profile/actions";
import type { PlayerGoal } from "@/types";

interface PlayerCardStep3Props {
  formData: Partial<CompletePlayerCardData>;
  setFormData: (data: Partial<CompletePlayerCardData>) => void;
}

const TRAINING_CONTEXTS = [
  { id: "off-season", name: "Off-season", emoji: "🏖️" },
  { id: "pre-season", name: "Pre-season", emoji: "🔥" },
  { id: "in-season", name: "In-season", emoji: "🏀" },
  { id: "tryouts", name: "Tryouts", emoji: "🎯" },
  { id: "showcases", name: "Showcases", emoji: "⭐" },
  { id: "general", name: "General Fitness", emoji: "💪" },
];

export default function PlayerCardStep3({
  formData,
  setFormData,
}: PlayerCardStep3Props) {
  const [newGoal, setNewGoal] = useState<Partial<PlayerGoal>>({});
  const [showGoalForm, setShowGoalForm] = useState(false);

  const handleAddGoal = () => {
    if (newGoal.title && newGoal.target_value && newGoal.target_date) {
      const updatedGoals = [...(formData.goals || []), newGoal as PlayerGoal];
      setFormData({ ...formData, goals: updatedGoals });
      setNewGoal({});
      setShowGoalForm(false);
    }
  };

  const handleRemoveGoal = (index: number) => {
    const updatedGoals = formData.goals?.filter((_, i) => i !== index) || [];
    setFormData({ ...formData, goals: updatedGoals });
  };

  return (
    <div className="space-y-6">
      <p className="text-zinc-400 text-sm">Your goals and training context</p>

      {/* Training Context */}
      <div>
        <label className="block text-sm font-medium text-white mb-3">
          Training Context <span className="text-red-400">*</span>
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {TRAINING_CONTEXTS.map((ctx) => (
            <button
              key={ctx.id}
              type="button"
              onClick={() => setFormData({ ...formData, training_context: ctx.id })}
              className={`p-3 rounded-lg border-2 text-center transition-all ${
                formData.training_context === ctx.id
                  ? "border-emerald-500 bg-emerald-500/10"
                  : "border-zinc-700 bg-zinc-900 hover:border-zinc-600"
              }`}
            >
              <div className="text-xl mb-1">{ctx.emoji}</div>
              <div className="text-xs font-medium text-white">{ctx.name}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Goals Section */}
      <div className="pt-4 border-t border-zinc-800">
        <label className="block text-sm font-medium text-white mb-3">
          Goals <span className="text-red-400">*</span> <span className="text-zinc-500 text-xs">(Add up to 3)</span>
        </label>

        {/* Display Goals */}
        <div className="space-y-2 mb-4">
          {formData.goals?.map((goal, idx) => (
            <div key={idx} className="flex items-start gap-3 p-3 bg-zinc-900 border border-zinc-800 rounded-lg">
              <div className="flex-1 min-w-0">
                <p className="font-medium text-white text-sm">{goal.title}</p>
                <p className="text-xs text-zinc-400">{goal.target_value} by {goal.target_date}</p>
              </div>
              <button
                type="button"
                onClick={() => handleRemoveGoal(idx)}
                className="text-zinc-500 hover:text-red-400 transition text-sm"
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        {/* Add Goal Form */}
        {showGoalForm && formData.goals && formData.goals.length < 3 && (
          <div className="space-y-3 p-4 bg-zinc-900 border border-zinc-800 rounded-lg mb-3">
            <input
              type="text"
              placeholder="Goal title (e.g., Increase 3P%)"
              value={newGoal.title || ""}
              onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
              className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-emerald-500"
            />
            <input
              type="text"
              placeholder="Target (e.g., 40%)"
              value={newGoal.target_value || ""}
              onChange={(e) => setNewGoal({ ...newGoal, target_value: e.target.value })}
              className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-emerald-500"
            />
            <input
              type="date"
              value={newGoal.target_date || ""}
              onChange={(e) => setNewGoal({ ...newGoal, target_date: e.target.value })}
              className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white text-sm focus:outline-none focus:border-emerald-500"
            />
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleAddGoal}
                className="flex-1 py-2 bg-emerald-500 hover:bg-emerald-600 text-black text-sm font-semibold rounded-lg transition"
              >
                Add Goal
              </button>
              <button
                type="button"
                onClick={() => setShowGoalForm(false)}
                className="flex-1 py-2 bg-zinc-800 hover:bg-zinc-700 text-white text-sm font-semibold rounded-lg transition"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {(!showGoalForm || (formData.goals && formData.goals.length >= 3)) && (
          <button
            type="button"
            onClick={() => setShowGoalForm(true)}
            disabled={formData.goals && formData.goals.length >= 3}
            className="w-full py-2 border border-dashed border-emerald-500/50 text-emerald-400 hover:bg-emerald-500/5 rounded-lg text-sm font-medium transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            + Add Goal
          </button>
        )}
      </div>

      {/* Schedule Preferences */}
      <div className="pt-4 border-t border-zinc-800">
        <label className="block text-sm font-medium text-white mb-3">
          Weekly Sessions Target
        </label>
        <select
          value={formData.weekly_sessions_target || 3}
          onChange={(e) => setFormData({ ...formData, weekly_sessions_target: Number(e.target.value) })}
          className="w-full px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-white focus:outline-none focus:border-emerald-500"
        >
          {[1, 2, 3, 4, 5, 6, 7].map((n) => (
            <option key={n} value={n}>{n} session{n !== 1 ? "s" : ""}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-white mb-3">
          Typical Session Length
        </label>
        <select
          value={formData.typical_session_length_minutes || 60}
          onChange={(e) => setFormData({ ...formData, typical_session_length_minutes: Number(e.target.value) })}
          className="w-full px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-white focus:outline-none focus:border-emerald-500"
        >
          <option value={30}>30 minutes</option>
          <option value={45}>45 minutes</option>
          <option value={60}>60 minutes</option>
          <option value={75}>75 minutes</option>
          <option value={90}>90 minutes</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-white mb-3">
          Sleep Per Night
        </label>
        <select
          value={formData.sleep_hours_per_night || "7-8"}
          onChange={(e) => setFormData({ ...formData, sleep_hours_per_night: e.target.value })}
          className="w-full px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-white focus:outline-none focus:border-emerald-500"
        >
          <option value="<6">Less than 6 hours</option>
          <option value="6-7">6-7 hours</option>
          <option value="7-8">7-8 hours</option>
          <option value=">8">More than 8 hours</option>
        </select>
      </div>
    </div>
  );
}
