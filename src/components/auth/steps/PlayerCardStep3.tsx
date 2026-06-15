"use client";

import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import type { CompletePlayerCardData } from "@/app/(app)/finish-profile/actions";
import type { PlayerGoal } from "@/types";

interface PlayerCardStep3Props {
  formData: Partial<CompletePlayerCardData>;
  setFormData: (data: Partial<CompletePlayerCardData>) => void;
}

export default function PlayerCardStep3({
  formData,
  setFormData,
}: PlayerCardStep3Props) {
  const [newGoal, setNewGoal] = useState<Partial<PlayerGoal>>({});
  const [showGoalForm, setShowGoalForm] = useState(false);
  const [goalError, setGoalError] = useState<string | null>(null);

  const handleAddGoal = () => {
    setGoalError(null);

    if (!newGoal.title?.trim()) {
      setGoalError("Goal title is required");
      return;
    }

    if (!newGoal.target_value) {
      setGoalError("Target value is required");
      return;
    }

    if (!newGoal.target_date) {
      setGoalError("Target date is required");
      return;
    }

    if ((formData.goals?.length || 0) >= 5) {
      setGoalError("Maximum 5 goals allowed");
      return;
    }

    const updatedGoals = [...(formData.goals || []), newGoal as PlayerGoal];
    setFormData({ ...formData, goals: updatedGoals });
    setNewGoal({});
    setShowGoalForm(false);
  };

  const handleRemoveGoal = (index: number) => {
    const updatedGoals = formData.goals?.filter((_, i) => i !== index) || [];
    setFormData({ ...formData, goals: updatedGoals });
  };

  const goalsCount = formData.goals?.length || 0;

  return (
    <div className="space-y-6">
      <p className="text-zinc-400 text-sm">What do you want to achieve? (Required: At least 1 goal)</p>

      {/* Goals List */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <label className="block text-sm font-medium text-white">
            Your Goals <span className="text-red-400">*</span>
            <span className="text-xs text-zinc-500 ml-2">
              ({goalsCount}/5 goals)
            </span>
          </label>
        </div>

        {/* Goals Cards */}
        {goalsCount > 0 && (
          <div className="space-y-3 mb-4">
            {formData.goals?.map((goal, idx) => (
              <div
                key={idx}
                className="flex items-start gap-4 p-4 bg-zinc-900/50 border border-emerald-500/20 rounded-xl hover:border-emerald-500/40 transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-white text-sm">{goal.title}</p>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 text-xs text-zinc-400 mt-2">
                    <span>📊 Target: {goal.target_value}</span>
                    <span className="hidden sm:inline">•</span>
                    <span>📅 Deadline: {new Date(goal.target_date).toLocaleDateString()}</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveGoal(idx)}
                  className="flex-shrink-0 text-zinc-500 hover:text-red-400 hover:bg-red-400/10 p-2 rounded-lg transition-colors"
                  title="Remove goal"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Add Goal Form */}
        {showGoalForm && goalsCount < 5 && (
          <div className="space-y-3 p-4 bg-emerald-500/5 border border-emerald-500/30 rounded-xl mb-4">
            <div>
              <label htmlFor="goalTitle" className="block text-xs font-medium text-zinc-300 mb-2">
                Goal Title <span className="text-red-400">*</span>
              </label>
              <input
                id="goalTitle"
                type="text"
                placeholder="e.g., Improve 3P% to 40%"
                value={newGoal.title || ""}
                onChange={(e) => {
                  setNewGoal({ ...newGoal, title: e.target.value });
                  setGoalError(null);
                }}
                className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-emerald-500 transition-colors"
              />
            </div>

            <div>
              <label htmlFor="targetValue" className="block text-xs font-medium text-zinc-300 mb-2">
                Target Value <span className="text-red-400">*</span>
              </label>
              <input
                id="targetValue"
                type="text"
                placeholder="e.g., 40% or 5 mph"
                value={newGoal.target_value || ""}
                onChange={(e) => {
                  setNewGoal({ ...newGoal, target_value: e.target.value });
                  setGoalError(null);
                }}
                className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-emerald-500 transition-colors"
              />
            </div>

            <div>
              <label htmlFor="targetDate" className="block text-xs font-medium text-zinc-300 mb-2">
                Target Date <span className="text-red-400">*</span>
              </label>
              <input
                id="targetDate"
                type="date"
                value={newGoal.target_date || ""}
                onChange={(e) => {
                  setNewGoal({ ...newGoal, target_date: e.target.value });
                  setGoalError(null);
                }}
                className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white text-sm focus:outline-none focus:border-emerald-500 transition-colors"
              />
            </div>

            {goalError && (
              <div className="p-2 bg-red-500/10 border border-red-500/30 rounded-lg">
                <p className="text-red-400 text-xs">⚠️ {goalError}</p>
              </div>
            )}

            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleAddGoal}
                className="flex-1 py-2 bg-emerald-500 hover:bg-emerald-600 text-black text-sm font-semibold rounded-lg transition-colors"
              >
                Add Goal
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowGoalForm(false);
                  setGoalError(null);
                }}
                className="flex-1 py-2 bg-zinc-800 hover:bg-zinc-700 text-white text-sm font-semibold rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Add Goal Button */}
        {(!showGoalForm || goalsCount >= 5) && goalsCount < 5 && (
          <button
            type="button"
            onClick={() => {
              setShowGoalForm(true);
              setGoalError(null);
            }}
            className="w-full py-3 border-2 border-dashed border-emerald-500/50 hover:border-emerald-500 text-emerald-400 hover:bg-emerald-500/5 rounded-xl text-sm font-medium transition-colors flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add a Goal
          </button>
        )}

        {/* No Goals Warning */}
        {goalsCount === 0 && !showGoalForm && (
          <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg">
            <p className="text-amber-400 text-xs">📌 You need at least 1 goal to proceed</p>
          </div>
        )}

        {/* At Max Warning */}
        {goalsCount >= 5 && (
          <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-lg">
            <p className="text-emerald-400 text-xs">✅ You've added the maximum 5 goals</p>
          </div>
        )}
      </div>
    </div>
  );
}
