"use client";

import { Instagram, Youtube } from "lucide-react";
import type { CompletePlayerCardData } from "@/app/(app)/finish-profile/actions";

interface PlayerCardStep1Props {
  formData: Partial<CompletePlayerCardData>;
  setFormData: (data: Partial<CompletePlayerCardData>) => void;
}

const isValidUrl = (url: string) => {
  if (!url) return true; // Optional field
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export default function PlayerCardStep1({
  formData,
  setFormData,
}: PlayerCardStep1Props) {
  return (
    <div className="space-y-6">
      <p className="text-zinc-400 text-sm">{"Let's start with your basics"}</p>

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

      {/* Social Links */}
      <div className="pt-4 border-t border-zinc-800">
        <label className="block text-sm font-medium text-white mb-3">
          Social Links <span className="text-zinc-500 text-xs">(Optional)</span>
        </label>

        {/* Instagram */}
        <div className="mb-4">
          <label htmlFor="instagram" className="block text-xs font-medium text-zinc-300 mb-2 flex items-center gap-2">
            <Instagram className="w-4 h-4" />
            Instagram URL
          </label>
          <input
            id="instagram"
            type="url"
            value={formData.instagram_url || ""}
            onChange={(e) => setFormData({ ...formData, instagram_url: e.target.value || null })}
            placeholder="https://instagram.com/yourprofile"
            className={`w-full px-4 py-3 bg-zinc-900 border rounded-xl text-white placeholder-zinc-500 focus:outline-none transition-all ${
              formData.instagram_url && !isValidUrl(formData.instagram_url)
                ? "border-red-500/50 focus:border-red-500"
                : "border-zinc-800 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50"
            }`}
          />
          {formData.instagram_url && !isValidUrl(formData.instagram_url) && (
            <p className="text-xs text-red-400 mt-1">Invalid URL</p>
          )}
        </div>

        {/* YouTube */}
        <div>
          <label htmlFor="youtube" className="block text-xs font-medium text-zinc-300 mb-2 flex items-center gap-2">
            <Youtube className="w-4 h-4" />
            YouTube URL
          </label>
          <input
            id="youtube"
            type="url"
            value={formData.youtube_url || ""}
            onChange={(e) => setFormData({ ...formData, youtube_url: e.target.value || null })}
            placeholder="https://youtube.com/c/yourchannel"
            className={`w-full px-4 py-3 bg-zinc-900 border rounded-xl text-white placeholder-zinc-500 focus:outline-none transition-all ${
              formData.youtube_url && !isValidUrl(formData.youtube_url)
                ? "border-red-500/50 focus:border-red-500"
                : "border-zinc-800 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50"
            }`}
          />
          {formData.youtube_url && !isValidUrl(formData.youtube_url) && (
            <p className="text-xs text-red-400 mt-1">Invalid URL</p>
          )}
        </div>
      </div>
    </div>
  );
}
