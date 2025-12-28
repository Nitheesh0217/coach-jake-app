"use client";

import type { CompletePlayerCardData } from "@/app/(app)/finish-profile/actions";

interface PlayerCardStep1Props {
  formData: Partial<CompletePlayerCardData>;
  setFormData: (data: Partial<CompletePlayerCardData>) => void;
}

export default function PlayerCardStep1({
  formData,
  setFormData,
}: PlayerCardStep1Props) {
  return (
    <div className="space-y-6">
      <p className="text-zinc-400 text-sm">Let's start with your basics</p>

      {/* Full Name */}
      <div>
        <label htmlFor="fullName" className="block text-sm font-medium text-white mb-2">
          Full Name <span className="text-red-400">*</span>
        </label>
        <input
          id="fullName"
          type="text"
          value={formData.fullName || ""}
          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
          placeholder="Your name"
          className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50 transition-all"
          required
        />
      </div>

      {/* Age */}
      <div>
        <label htmlFor="age" className="block text-sm font-medium text-white mb-2">
          Age <span className="text-zinc-500 text-xs">(Optional)</span>
        </label>
        <input
          id="age"
          type="number"
          min="10"
          max="120"
          value={formData.age || ""}
          onChange={(e) => setFormData({ ...formData, age: e.target.value ? Number(e.target.value) : null })}
          placeholder="25"
          className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50 transition-all"
        />
      </div>

      {/* Height & Weight Grid */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="height" className="block text-sm font-medium text-white mb-2">
            Height <span className="text-zinc-500 text-xs">(cm)</span>
          </label>
          <input
            id="height"
            type="number"
            min="100"
            max="250"
            value={formData.heightCm || ""}
            onChange={(e) => setFormData({ ...formData, heightCm: e.target.value ? Number(e.target.value) : null })}
            placeholder="180"
            className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50 transition-all"
          />
        </div>

        <div>
          <label htmlFor="weight" className="block text-sm font-medium text-white mb-2">
            Weight <span className="text-zinc-500 text-xs">(kg)</span>
          </label>
          <input
            id="weight"
            type="number"
            min="30"
            max="300"
            value={formData.weightKg || ""}
            onChange={(e) => setFormData({ ...formData, weightKg: e.target.value ? Number(e.target.value) : null })}
            placeholder="75"
            className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50 transition-all"
          />
        </div>
      </div>

      {/* Role Display (Read-only) */}
      <div>
        <label className="block text-sm font-medium text-white mb-2">Role</label>
        <div className="px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-white">
          {formData.role === "athlete" ? "🏀 Athlete" : "👨‍🏫 Coach"}
        </div>
      </div>
    </div>
  );
}
