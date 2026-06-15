"use client";

import { motion } from "framer-motion";
import { WizardData } from "../OnboardingWizard";
import {
  TrendingUp,
  Dumbbell,
  Zap,
  Crosshair,
  Brain,
  Award,
} from "lucide-react";

interface Step4GoalsProps {
  data: WizardData;
  setData: (data: WizardData) => void;
}

const GOALS = [
  {
    id: "vertical",
    label: "Increase Vertical",
    icon: TrendingUp,
    description: "Dunk from the free throw line",
    color: "emerald",
  },
  {
    id: "strength",
    label: "Build Strength",
    icon: Dumbbell,
    description: "Power through defenders",
    color: "amber",
  },
  {
    id: "conditioning",
    label: "Improve Conditioning",
    icon: Zap,
    description: "Never gas out in the 4th",
    color: "cyan",
  },
  {
    id: "handles",
    label: "Sharpen Handles",
    icon: Crosshair,
    description: "Ankle-break defenders",
    color: "green",
  },
  {
    id: "court-iq",
    label: "Improve Court IQ",
    icon: Brain,
    description: "Make smarter decisions",
    color: "blue",
  },
  {
    id: "recruited",
    label: "Get Recruited",
    icon: Award,
    description: "Play at the next level",
    color: "purple",
  },
];

export default function Step4Goals({ data, setData }: Step4GoalsProps) {
  const handleGoalToggle = (goalId: string) => {
    setData({
      ...data,
      goals: data.goals.includes(goalId as any)
        ? data.goals.filter((g) => g !== goalId)
        : [...data.goals, goalId as any],
    });
  };

  const handleOptionalFieldChange = (
    field: "highlightTagline" | "instagramUrl" | "youtubeUrl",
    value: string
  ) => {
    setData({ ...data, [field]: value });
  };

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
          Step 4 of 4 · Your Goals
        </h2>
        <h1 className="text-4xl md:text-5xl font-black text-white mb-3">
          What are you training for?
        </h1>
      </motion.div>

      {/* Goals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
        {GOALS.map((goal, idx) => {
          const isSelected = data.goals.includes(goal.id as any);
          const Icon = goal.icon;

          return (
            <motion.button
              key={goal.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.2 + idx * 0.05 }}
              onClick={() => handleGoalToggle(goal.id)}
              className={`relative group text-left rounded-2xl border-2 p-6 transition-all duration-300 ${
                isSelected
                  ? "border-emerald-400 bg-emerald-500/15"
                  : "border-zinc-700 bg-zinc-800/50 hover:border-emerald-500/40 hover:bg-emerald-500/5"
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Checkmark Badge */}
              {isSelected && (
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
              <motion.div
                className="w-12 h-12 rounded-lg bg-zinc-700 flex items-center justify-center mb-3"
                animate={isSelected ? { scale: [1, 1.1, 1] } : {}}
                transition={isSelected ? { duration: 0.5, delay: 0.1 } : {}}
              >
                <Icon className="w-6 h-6 text-emerald-400" />
              </motion.div>

              {/* Content */}
              <h3 className="text-base font-bold text-white mb-1">
                {goal.label}
              </h3>
              <p className="text-sm text-zinc-400">{goal.description}</p>
            </motion.button>
          );
        })}
      </div>

      {/* Optional Fields */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.5 }}
        className="border-t border-zinc-800 pt-8"
      >
        <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-widest mb-6">
          Optional: Help us personalize your experience
        </h3>

        {/* Highlight Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.55 }}
          className="mb-6"
        >
          <label className="text-sm font-semibold text-zinc-300 block mb-2">
            Highlight tagline
          </label>
          <input
            type="text"
            placeholder="e.g. Point guard with a 36-inch vertical"
            value={data.highlightTagline}
            onChange={(e) =>
              handleOptionalFieldChange("highlightTagline", e.target.value)
            }
            className="w-full bg-zinc-800/60 border border-zinc-700 rounded-xl px-4 py-3.5 text-white placeholder-zinc-600 text-sm focus:border-emerald-400 focus:outline-none focus:ring-[3px] focus:ring-emerald-500/30 transition-all duration-300"
          />
        </motion.div>

        {/* Instagram URL */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.6 }}
          className="mb-6"
        >
          <label className="text-sm font-semibold text-zinc-300 block mb-2 flex items-center gap-2">
            <span>📸</span>
            Instagram URL
          </label>
          <input
            type="url"
            placeholder="https://instagram.com/yourhandle"
            value={data.instagramUrl}
            onChange={(e) =>
              handleOptionalFieldChange("instagramUrl", e.target.value)
            }
            className="w-full bg-zinc-800/60 border border-zinc-700 rounded-xl px-4 py-3.5 text-white placeholder-zinc-600 text-sm focus:border-emerald-400 focus:outline-none focus:ring-[3px] focus:ring-emerald-500/30 transition-all duration-300"
          />
        </motion.div>

        {/* YouTube URL */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.65 }}
          className="mb-6"
        >
          <label className="text-sm font-semibold text-zinc-300 block mb-2 flex items-center gap-2">
            <span>🎬</span>
            YouTube URL
          </label>
          <input
            type="url"
            placeholder="https://youtube.com/yourchannel"
            value={data.youtubeUrl}
            onChange={(e) =>
              handleOptionalFieldChange("youtubeUrl", e.target.value)
            }
            className="w-full bg-zinc-800/60 border border-zinc-700 rounded-xl px-4 py-3.5 text-white placeholder-zinc-600 text-sm focus:border-emerald-400 focus:outline-none focus:ring-[3px] focus:ring-emerald-500/30 transition-all duration-300"
          />
        </motion.div>
      </motion.div>

      {/* Animation Notes */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.75 }}
        className="mt-10 p-6 rounded-xl border border-zinc-800 bg-zinc-900/50 space-y-3"
      >
        <h3 className="text-sm font-bold text-cyan-400 uppercase tracking-widest flex items-center gap-2">
          <span>✨</span>
          Success Animation
        </h3>
        <ul className="text-xs text-zinc-400 space-y-2">
          <li>• Page wipe transition to dashboard</li>
          <li>• Confetti burst celebration animation</li>
          <li>• Success sparkle effects with spring easing</li>
          <li>• Basketball icon bounce animation</li>
        </ul>
      </motion.div>

      {/* Data Security */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.8 }}
        className="mt-4 p-4 rounded-lg border border-zinc-800 bg-zinc-900/30 flex items-start gap-3"
      >
        <svg
          className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z"
            clipRule="evenodd"
          />
        </svg>
        <p className="text-xs text-zinc-400">
          Your data is secure and never shared.
        </p>
      </motion.div>
    </motion.div>
  );
}
