"use client";

import type { CompletePlayerCardData } from "@/app/(app)/finish-profile/actions";

interface PlayerCardStep2Props {
  formData: Partial<CompletePlayerCardData>;
  setFormData: (data: Partial<CompletePlayerCardData>) => void;
}

const ARCHETYPES = [
  { id: "3-d-wing", name: "3 & D Wing", emoji: "🎯", desc: "Lockdown defender with range" },
  { id: "floor-general", name: "Floor General", emoji: "👑", desc: "Playmaker and leader" },
  { id: "slashing-guard", name: "Slashing Guard", emoji: "⚡", desc: "Attack the basket aggressively" },
  { id: "stretch-big", name: "Stretch Big", emoji: "📍", desc: "Tall with range and versatility" },
  { id: "two-way-wing", name: "Two-Way Wing", emoji: "🔄", desc: "Balanced scorer and defender" },
  { id: "rim-protector", name: "Rim Protector", emoji: "🛡️", desc: "Defensive anchor and rebounder" },
];

export default function PlayerCardStep2({
  formData,
  setFormData,
}: PlayerCardStep2Props) {
  return (
    <div className="space-y-6">
      <p className="text-zinc-400 text-sm">Define your game and playstyle</p>

      {/* Archetype Selection */}
      <div>
        <label className="block text-sm font-medium text-white mb-3">
          Player Archetype <span className="text-red-400">*</span>
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {ARCHETYPES.map((arch) => (
            <button
              key={arch.id}
              type="button"
              onClick={() => setFormData({ ...formData, playerArchetype: arch.id })}
              className={`p-4 rounded-xl border-2 transition-all text-left ${
                formData.playerArchetype === arch.id
                  ? "border-emerald-500 bg-emerald-500/10"
                  : "border-zinc-700 bg-zinc-900 hover:border-zinc-600"
              }`}
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl">{arch.emoji}</span>
                <div className="flex-1">
                  <p className="font-semibold text-white">{arch.name}</p>
                  <p className="text-xs text-zinc-400 mt-1">{arch.desc}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Playstyle Sliders */}
      <div className="pt-4 border-t border-zinc-800">
        <p className="text-sm font-medium text-white mb-4">Playstyle Preference</p>

        {/* Slider 1: Team vs ISO */}
        <div className="mb-6">
          <div className="flex justify-between mb-2">
            <label className="text-xs font-medium text-zinc-300">Team-First</label>
            <span className="text-xs text-emerald-400 font-semibold">
              {formData.playstyle_team_vs_iso ?? 50}
            </span>
            <label className="text-xs font-medium text-zinc-300">ISO Scorer</label>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={formData.playstyle_team_vs_iso ?? 50}
            onChange={(e) =>
              setFormData({ ...formData, playstyle_team_vs_iso: Number(e.target.value) })
            }
            className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer slider"
          />
        </div>

        {/* Slider 2: Shooter vs Slasher */}
        <div className="mb-6">
          <div className="flex justify-between mb-2">
            <label className="text-xs font-medium text-zinc-300">Shooter</label>
            <span className="text-xs text-emerald-400 font-semibold">
              {formData.playstyle_shooter_vs_slasher ?? 50}
            </span>
            <label className="text-xs font-medium text-zinc-300">Slasher</label>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={formData.playstyle_shooter_vs_slasher ?? 50}
            onChange={(e) =>
              setFormData({ ...formData, playstyle_shooter_vs_slasher: Number(e.target.value) })
            }
            className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer slider"
          />
        </div>

        {/* Slider 3: Finesse vs Power */}
        <div>
          <div className="flex justify-between mb-2">
            <label className="text-xs font-medium text-zinc-300">Finesse</label>
            <span className="text-xs text-emerald-400 font-semibold">
              {formData.playstyle_finesse_vs_power ?? 50}
            </span>
            <label className="text-xs font-medium text-zinc-300">Power</label>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={formData.playstyle_finesse_vs_power ?? 50}
            onChange={(e) =>
              setFormData({ ...formData, playstyle_finesse_vs_power: Number(e.target.value) })
            }
            className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer slider"
          />
        </div>
      </div>

      <style>{`
        input[type="range"].slider::-webkit-slider-thumb {
          appearance: none;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #10b981;
          cursor: pointer;
          box-shadow: 0 0 8px rgba(16, 185, 129, 0.3);
        }
        input[type="range"].slider::-moz-range-thumb {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #10b981;
          cursor: pointer;
          border: none;
          box-shadow: 0 0 8px rgba(16, 185, 129, 0.3);
        }
      `}</style>
    </div>
  );
}
