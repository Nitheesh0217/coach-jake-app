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

export default function PlayerCardStep4({
  formData,
  setFormData,
}: PlayerCardStep4Props) {
  const isValidUrl = (url: string) => {
    if (!url) return true; // Optional field
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  return (
    <div className="space-y-6">
      <p className="text-zinc-400 text-sm">Final touches: visibility and social links</p>

      {/* Visibility */}
      <div>
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
          A short phrase that describes your game (e.g., "Explosive PG with court vision")
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

      {/* Social Links */}
      <div className="pt-4 border-t border-zinc-800">
        <label className="block text-sm font-medium text-white mb-3">
          Social Links <span className="text-zinc-500 text-xs">(Optional)</span>
        </label>

        {/* Instagram */}
        <div className="mb-4">
          <label htmlFor="instagram" className="block text-xs font-medium text-zinc-300 mb-2">
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
          <label htmlFor="youtube" className="block text-xs font-medium text-zinc-300 mb-2">
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
