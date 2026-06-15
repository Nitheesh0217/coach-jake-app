"use client";

import { motion } from "framer-motion";
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
];

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

  const sliders = [
    {
      label: "TEAM PLAY",
      key: "teamPlay",
      color: "emerald",
      icon: "🤝",
      value: data.teamPlay,
    },
    {
      label: "SHOOTER",
      key: "shooter",
      color: "cyan",
      icon: "🎯",
      value: data.shooter,
    },
    {
      label: "FINESSE",
      key: "finesse",
      color: "violet",
      icon: "✨",
      value: data.finesse,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="rounded-3xl border border-emerald-500/20 bg-gradient-to-b from-zinc-900/80 to-zinc-950/80 backdrop-blur-xl p-8 md:p-10 shadow-2xl shadow-emerald-500/10"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="mb-8"
      >
        <h2 className="text-sm font-bold text-emerald-400 uppercase tracking-widest mb-3">
          Step 2 of 4 · Your Playing Style
        </h2>
        <h1 className="text-4xl md:text-5xl font-black text-white mb-3">
          What kind of player are you?
        </h1>
      </motion.div>

      {/* Position Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
        {POSITIONS.map((position, idx) => (
          <motion.button
            key={position.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.15 + idx * 0.06 }}
            onClick={() =>
              handlePositionSelect(position.id as typeof data.position)
            }
            className={`relative group text-left rounded-2xl border-2 p-6 transition-all duration-300 ${
              data.position === position.id
                ? "border-emerald-400 bg-emerald-500/15"
                : "border-zinc-700 bg-zinc-800/50 hover:border-emerald-500/40 hover:bg-emerald-500/5"
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Selection Checkmark */}
            {data.position === position.id && (
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 500,
                  damping: 30,
                }}
                className="absolute top-4 right-4 w-6 h-6 rounded-full bg-emerald-400 flex items-center justify-center"
              >
                <svg
                  className="w-4 h-4 text-black"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </motion.div>
            )}

            {/* Icon */}
            <div className="text-4xl mb-3">{position.icon}</div>

            {/* Content */}
            <h3 className="text-xl font-bold text-white mb-2">
              {position.label}
            </h3>
            <p className="text-sm text-zinc-400">{position.description}</p>
          </motion.button>
        ))}
      </div>

      {/* Sliders Section */}
      <div className="space-y-8">
        {sliders.map((slider, idx) => {
          const colorMap = {
            emerald: "from-emerald-500 to-green-400",
            cyan: "from-cyan-500 to-blue-400",
            violet: "from-violet-500 to-purple-400",
          };

          return (
            <motion.div
              key={slider.key}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.45 + idx * 0.08 }}
              className="space-y-3"
            >
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm font-bold text-zinc-300 uppercase tracking-widest">
                  <span>{slider.icon}</span>
                  {slider.label}
                </label>
                <motion.span
                  className={`text-sm font-bold bg-gradient-to-r ${colorMap[slider.color as keyof typeof colorMap]} bg-clip-text text-transparent`}
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 0.3 }}
                >
                  {slider.value}%
                </motion.span>
              </div>

              <motion.div className="relative h-2 rounded-full bg-zinc-800 overflow-hidden cursor-pointer group">
                {/* Background gradient */}
                <motion.div
                  className={`absolute top-0 left-0 h-full bg-gradient-to-r ${colorMap[slider.color as keyof typeof colorMap]}`}
                  initial={{ width: `${slider.value}%` }}
                  animate={{ width: `${slider.value}%` }}
                  transition={{ duration: 0.2 }}
                />

                {/* Slider Input */}
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={slider.value}
                  onChange={(e) =>
                    handleSliderChange(
                      slider.key as "teamPlay" | "shooter" | "finesse",
                      parseInt(e.target.value),
                    )
                  }
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />

                {/* Thumb */}
                <motion.div
                  className={`absolute top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-white border-2 border-current ${
                    slider.color === "emerald"
                      ? "border-emerald-400"
                      : slider.color === "cyan"
                        ? "border-cyan-400"
                        : "border-violet-400"
                  } shadow-lg pointer-events-none`}
                  style={{ left: `calc(${slider.value}% - 10px)` }}
                />
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      {/* Notes */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.7 }}
        className="mt-10 p-6 rounded-xl border border-zinc-800 bg-zinc-900/50 space-y-3"
      >
        <h3 className="text-sm font-bold text-cyan-400 uppercase tracking-widest">
          Card Click Effect
        </h3>
        <ul className="text-xs text-zinc-400 space-y-2">
          <li>• When a card is clicked, it scales up slightly and glows</li>
          <li>• The icon pulses with a soft emerald aura that fades out</li>
          <li>• A soft ripple expands from the center</li>
        </ul>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.75 }}
        className="mt-4 p-6 rounded-xl border border-zinc-800 bg-zinc-900/50 space-y-3"
      >
        <h3 className="text-sm font-bold text-cyan-400 uppercase tracking-widest">
          Slider Drag Effect
        </h3>
        <ul className="text-xs text-zinc-400 space-y-2">
          <li>
            • When dragging a slider thumb, it follows your finger with a glow
            trail
          </li>
          <li>• The percentage updates in real time</li>
          <li>• The background bar fills smoothly with gradient color</li>
        </ul>
      </motion.div>
    </motion.div>
  );
}
