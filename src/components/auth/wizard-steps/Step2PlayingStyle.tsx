"use client";

import { motion } from "framer-motion";
import { Check, Hand, MoveRight, Users, Zap } from "lucide-react";
import { WizardData } from "../OnboardingWizard";

interface Step2PlayingStyleProps {
  data: WizardData;
  setData: (data: WizardData) => void;
}

const POSITIONS = [
  {
    id: "guard",
    label: "Guard",
    icon: "⛹️",
    description:
      "Quick, agile, and shifty. I run the offense and create opportunities.",
  },
  {
    id: "wing",
    label: "Wing",
    icon: "🏃",
    description:
      "Versatile and athletic. I can score from anywhere and defend anyone.",
  },
  {
    id: "forward",
    label: "Forward",
    icon: "🤾",
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

const COLOR_STYLES = {
  emerald: {
    bar: "from-emerald-400 via-emerald-300 to-emerald-500",
    text: "text-emerald-300",
    ring: "ring-emerald-400/40",
    dot: "bg-emerald-300",
  },
  cyan: {
    bar: "from-cyan-400 via-blue-300 to-blue-500",
    text: "text-cyan-300",
    ring: "ring-cyan-400/40",
    dot: "bg-cyan-300",
  },
  violet: {
    bar: "from-violet-400 via-purple-300 to-purple-500",
    text: "text-violet-300",
    ring: "ring-violet-400/40",
    dot: "bg-violet-300",
  },
};

const SLIDERS = [
  {
    label: "TEAM PLAY",
    rightLabel: "ISOLATION",
    key: "teamPlay",
    color: "emerald",
    icon: Users,
  },
  {
    label: "SHOOTER",
    rightLabel: "SLASHER",
    key: "shooter",
    color: "cyan",
    icon: Zap,
  },
  {
    label: "FINESSE",
    rightLabel: "POWER",
    key: "finesse",
    color: "violet",
    icon: MoveRight,
  },
] as const;

export default function Step2PlayingStyle({
  data,
  setData,
}: Step2PlayingStyleProps) {
  const handlePositionSelect = (position: typeof data.position) => {
    setData({ ...data, position });
  };

  const handleSliderChange = (
    field: "teamPlay" | "shooter" | "finesse",
    value: number,
  ) => {
    setData({ ...data, [field]: value });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.1 }}
      className="relative"
    >
      <div className="rounded-[32px] border border-cyan-400/30 bg-gradient-to-b from-slate-900/95 via-slate-950/95 to-slate-950/95 p-6 md:p-8 shadow-[0_0_60px_rgba(34,211,238,0.08)] backdrop-blur-xl">
        <div className="mb-6 text-center md:mb-8">
          <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-emerald-300">
            Step 2 of 4 • Your Playing Style
          </p>
          <h2 className="text-3xl font-black text-white md:text-5xl">
            What kind of player are you?
          </h2>
        </div>

        <div className="mb-6 grid grid-cols-1 gap-4 md:mb-8 md:grid-cols-2">
          {POSITIONS.map((position, idx) => {
            const selected = data.position === position.id;

            return (
              <motion.button
                key={position.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                onClick={() =>
                  handlePositionSelect(position.id as typeof data.position)
                }
                className={`group relative rounded-2xl border p-5 text-left transition-all duration-250 ${
                  selected
                    ? "border-emerald-300/90 bg-emerald-500/12 shadow-[0_0_35px_rgba(16,185,129,0.35)]"
                    : "border-slate-700 bg-slate-900/70 hover:border-cyan-300/40"
                }`}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.985 }}
              >
                <div className="flex items-start gap-4">
                  <span className="mt-1 text-4xl" aria-hidden>
                    {position.icon}
                  </span>
                  <div>
                    <h3 className="text-3xl font-bold text-white">{position.label}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-slate-300">
                      {position.description}
                    </p>
                  </div>
                </div>

                <div
                  className={`absolute right-4 top-4 flex h-7 w-7 items-center justify-center rounded-full border ${
                    selected
                      ? "border-emerald-300 bg-emerald-400 text-black"
                      : "border-slate-500 bg-slate-900/60 text-transparent"
                  }`}
                >
                  <Check className="h-4 w-4" />
                </div>
              </motion.button>
            );
          })}
        </div>

        <div className="space-y-6 border-t border-slate-800 pt-6 md:space-y-8 md:pt-8">
          {SLIDERS.map((slider, idx) => {
            const value = data[slider.key] as number;
            const color = COLOR_STYLES[slider.color];
            const Icon = slider.icon;

            return (
              <motion.div
                key={slider.key}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.15 + idx * 0.05 }}
              >
                <div className="mb-2 flex items-center justify-between text-sm font-semibold uppercase tracking-wider">
                  <span className={`flex items-center gap-2 ${color.text}`}>
                    <Icon className="h-4 w-4" /> {slider.label}
                  </span>
                  <span className="text-slate-500">{slider.rightLabel}</span>
                </div>

                <div className="relative pt-7">
                  <span
                    className={`absolute top-0 -translate-x-1/2 rounded-full border border-white/15 bg-slate-800 px-2 py-0.5 text-xs font-bold text-white ${color.ring} ring-2`}
                    style={{ left: `calc(${value}% + ${(50 - value) * 0.06}px)` }}
                  >
                    {value}%
                  </span>

                  <div className="relative h-2.5 rounded-full bg-slate-800/90">
                    <div className="absolute inset-0 rounded-full bg-[linear-gradient(90deg,transparent_0%,rgba(148,163,184,0.2)_100%)]" />
                    <div
                      className={`absolute left-0 top-0 h-full rounded-full bg-gradient-to-r ${color.bar} transition-all duration-200`}
                      style={{ width: `${value}%` }}
                    />
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={value}
                      onChange={(e) =>
                        handleSliderChange(
                          slider.key,
                          Number.parseInt(e.target.value, 10),
                        )
                      }
                      className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                      aria-label={slider.label}
                    />
                    <div
                      className={`absolute top-1/2 h-5 w-5 -translate-y-1/2 rounded-full border-2 border-white shadow-[0_0_16px_rgba(56,189,248,0.5)] ${color.dot}`}
                      style={{ left: `calc(${value}% - 10px)` }}
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <div className="pointer-events-none absolute -left-64 top-1/2 hidden w-56 -translate-y-1/2 xl:block">
        <div className="rounded-2xl border border-emerald-400/20 bg-slate-950/70 p-4 text-emerald-300 shadow-[0_0_35px_rgba(16,185,129,0.15)]">
          <p className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em]">
            <Hand className="h-4 w-4" /> Card Click Effect
          </p>
          <p className="text-sm text-slate-300">
            Clicking a card scales it up, adds a glow, and updates the selected
            role instantly.
          </p>
        </div>
      </div>

      <div className="pointer-events-none absolute -right-64 top-1/2 hidden w-56 -translate-y-1/2 xl:block">
        <div className="rounded-2xl border border-cyan-400/20 bg-slate-950/70 p-4 text-cyan-300 shadow-[0_0_35px_rgba(34,211,238,0.15)]">
          <p className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em]">
            <Hand className="h-4 w-4" /> Slider Drag Effect
          </p>
          <p className="text-sm text-slate-300">
            Dragging a slider thumb updates the percentage in real-time with a
            glowing trail.
          </p>
        </div>
      </div>
    </motion.div>
  );
}
