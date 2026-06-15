"use client";

import { motion } from "framer-motion";
import { Users, Crosshair, Sparkles } from "lucide-react";
import { WizardData } from "../OnboardingWizard";

interface Step2PlayingStyleProps {
  data: WizardData;
  setData: (data: WizardData) => void;
}

const POSITIONS = [
  {
    id: "guard",
    label: "Guard",
    icon: "🏃",
    description:
      "Quick, agile, and shifty. I run the offense and create opportunities.",
  },
  {
    id: "wing",
    label: "Wing",
    icon: "🏃‍♂️",
    description:
      "Versatile and athletic. I can score from anywhere and defend anyone.",
  },
  {
    id: "forward",
    label: "Forward",
    icon: "💪",
    description:
      "Strong, tough, and relentless. I score inside and out and do the dirty work.",
  },
  {
    id: "center",
    label: "Center",
    icon: "🏋️",
    description:
      "Big, physical, and dominant. I protect the paint and control the boards.",
  },
] as const;

type SliderKey = "teamPlay" | "shooter" | "finesse";

const SLIDERS: {
  key: SliderKey;
  label: string;
  leftLabel: string;
  rightLabel: string;
  valueField: keyof Pick<WizardData, "teamPlay" | "shooter" | "finesse">;
  gradient: string;
  thumbBorder: string;
  icon: typeof Users;
}[] = [
  {
    key: "teamPlay",
    label: "TEAM PLAY",
    leftLabel: "TEAM PLAY",
    rightLabel: "ISOLATION",
    valueField: "teamPlay",
    gradient: "from-emerald-400 via-emerald-500 to-cyan-400",
    thumbBorder: "border-emerald-300",
    icon: Users,
  },
  {
    key: "shooter",
    label: "SHOOTER",
    leftLabel: "SHOOTER",
    rightLabel: "SLASHER",
    valueField: "shooter",
    gradient: "from-cyan-400 via-cyan-500 to-blue-500",
    thumbBorder: "border-cyan-300",
    icon: Crosshair,
  },
  {
    key: "finesse",
    label: "FINESSE",
    leftLabel: "FINESSE",
    rightLabel: "POWER",
    valueField: "finesse",
    gradient: "from-violet-400 via-violet-500 to-purple-500",
    thumbBorder: "border-violet-300",
    icon: Sparkles,
  },
];

export default function Step2PlayingStyle({
  data,
  setData,
}: Step2PlayingStyleProps) {
  const handlePositionSelect = (position: WizardData["position"]) => {
    setData({ ...data, position });
  };

  const handleSliderChange = (field: SliderKey, value: number) => {
    setData({ ...data, [field]: value });
  };

  return (
    <div className="relative">
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="rounded-[2rem] border border-cyan-400/20 bg-gradient-to-b from-[#101a30]/85 to-[#070d1d]/95 backdrop-blur-xl p-6 md:p-8 shadow-2xl shadow-cyan-950/60"
      >
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mb-8 text-center"
        >
          <h2 className="text-xs md:text-sm font-bold text-emerald-300 uppercase tracking-[0.2em] mb-3">
            Step 2 of 4 · Your Playing Style
          </h2>
          <h1 className="text-3xl md:text-5xl font-black text-white">
            What kind of player are you?
          </h1>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {POSITIONS.map((position, idx) => {
            const selected = data.position === position.id;

            return (
              <motion.button
                key={position.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.35, delay: 0.15 + idx * 0.06 }}
                onClick={() => handlePositionSelect(position.id)}
                className={`relative text-left rounded-2xl border p-5 transition-all duration-300 ${
                  selected
                    ? "border-emerald-300/80 bg-emerald-400/15 shadow-[0_0_30px_rgba(16,185,129,0.35)]"
                    : "border-white/15 bg-white/[0.03] hover:border-cyan-300/40 hover:bg-white/[0.05]"
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {selected && (
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    className="absolute right-4 top-4 h-6 w-6 rounded-full bg-emerald-300 text-[#0d1627] flex items-center justify-center text-xs font-black"
                  >
                    ✓
                  </motion.div>
                )}

                <div className="flex items-start gap-4">
                  <div className="text-4xl leading-none mt-1">{position.icon}</div>
                  <div>
                    <h3 className="text-3xl/none md:text-4xl/none font-black text-white mb-2 tracking-tight">
                      {position.label}
                    </h3>
                    <p className="text-sm text-zinc-300/90 max-w-[32ch]">
                      {position.description}
                    </p>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>

        <div className="space-y-6 border-t border-white/10 pt-6">
          {SLIDERS.map((slider, idx) => {
            const value = data[slider.valueField];
            const Icon = slider.icon;

            return (
              <motion.div
                key={slider.key}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.38 + idx * 0.08 }}
              >
                <div className="mb-2 flex items-center justify-between text-xs md:text-sm font-bold uppercase tracking-wider">
                  <span className="flex items-center gap-2 text-zinc-300">
                    <Icon className="w-4 h-4" />
                    {slider.leftLabel}
                  </span>
                  <span className="rounded-full border border-white/20 bg-white/10 px-2.5 py-0.5 text-white">
                    {value}%
                  </span>
                  <span className="text-zinc-400">{slider.rightLabel}</span>
                </div>

                <div className="relative h-2 rounded-full bg-zinc-800/90 overflow-hidden">
                  <motion.div
                    className={`absolute inset-y-0 left-0 bg-gradient-to-r ${slider.gradient}`}
                    initial={{ width: `${value}%` }}
                    animate={{ width: `${value}%` }}
                    transition={{ duration: 0.2 }}
                  />

                  <div className="absolute inset-0 flex items-center justify-between px-2 pointer-events-none">
                    {Array.from({ length: 9 }).map((_, mark) => (
                      <span key={mark} className="h-1.5 w-1.5 rounded-full bg-white/25" />
                    ))}
                  </div>

                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={value}
                    onChange={(e) =>
                      handleSliderChange(slider.key, Number(e.target.value))
                    }
                    className="absolute inset-0 h-full w-full opacity-0 cursor-pointer z-10"
                  />

                  <motion.div
                    className={`absolute top-1/2 -translate-y-1/2 h-5 w-5 rounded-full border-2 ${slider.thumbBorder} bg-white shadow-lg shadow-cyan-500/30 pointer-events-none`}
                    style={{ left: `calc(${value}% - 10px)` }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      <div className="hidden xl:block pointer-events-none absolute left-[-220px] top-[310px] max-w-[190px] text-cyan-300/90">
        <p className="text-xs font-bold uppercase tracking-wider mb-2">Card click effect</p>
        <p className="text-xs text-zinc-400 leading-relaxed">
          When a card is clicked, it scales up and glows with a soft ripple.
        </p>
      </div>

      <div className="hidden xl:block pointer-events-none absolute right-[-225px] top-[525px] max-w-[190px] text-cyan-300/90">
        <p className="text-xs font-bold uppercase tracking-wider mb-2">Slider drag effect</p>
        <p className="text-xs text-zinc-400 leading-relaxed">
          Dragging a thumb updates percentages in real time with a glow trail.
        </p>
      </div>
    </div>
  );
}
