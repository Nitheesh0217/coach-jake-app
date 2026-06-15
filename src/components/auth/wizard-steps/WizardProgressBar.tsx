"use client";

import { motion } from "framer-motion";

interface WizardProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

const STEP_LABELS = [
  { num: 1, label: "Your Profile" },
  { num: 2, label: "Athlete Details" },
  { num: 3, label: "Training Preferences" },
  { num: 4, label: "Your Goals" },
];

export default function WizardProgressBar({
  currentStep,
  totalSteps,
}: WizardProgressBarProps) {
  const progressPercent = Math.round((currentStep / totalSteps) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Main Progress Bar */}
      <div className="relative h-1 rounded-full bg-zinc-800 overflow-hidden">
        <motion.div
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-emerald-400 to-cyan-400"
          initial={{ width: 0 }}
          animate={{ width: `${progressPercent}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>

      {/* Step Indicators */}
      <div className="flex items-center justify-between">
        {STEP_LABELS.map((step) => {
          const isCompleted = step.num < currentStep;
          const isCurrent = step.num === currentStep;
          const isUpcoming = step.num > currentStep;

          return (
            <motion.div
              key={step.num}
              className="flex flex-col items-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: step.num * 0.05 }}
            >
              {/* Circle Indicator */}
              <motion.div
                className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm mb-2 transition-all duration-300 ${
                  isCompleted
                    ? "bg-emerald-500 text-black border-2 border-emerald-400"
                    : isCurrent
                      ? "bg-emerald-500 text-black border-2 border-emerald-400 ring-4 ring-emerald-400/30"
                      : "bg-zinc-800 text-zinc-600 border-2 border-zinc-700"
                }`}
                animate={
                  isCurrent
                    ? {
                        boxShadow: [
                          "0 0 0 0 rgba(16, 185, 129, 0.3)",
                          "0 0 0 8px rgba(16, 185, 129, 0.1)",
                          "0 0 0 0 rgba(16, 185, 129, 0.3)",
                        ],
                      }
                    : {}
                }
                transition={isCurrent ? { duration: 2, repeat: Infinity } : {}}
              >
                {isCompleted ? (
                  <motion.svg
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 30,
                    }}
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </motion.svg>
                ) : (
                  step.num
                )}
              </motion.div>

              {/* Step Label */}
              <span
                className={`text-[11px] md:text-xs font-semibold text-center max-w-[90px] md:max-w-none transition-colors duration-300 ${
                  isCurrent
                    ? "text-emerald-400"
                    : isCompleted
                      ? "text-zinc-400"
                      : "text-zinc-600"
                }`}
              >
                {step.label}
              </span>
            </motion.div>
          );
        })}
      </div>

      {/* Percentage */}
      <motion.div
        className="text-right text-sm font-bold text-emerald-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {progressPercent}% COMPLETE
      </motion.div>
    </motion.div>
  );
}
