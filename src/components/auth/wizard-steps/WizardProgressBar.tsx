"use client";

import { motion } from "framer-motion";

interface WizardProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

const STEP_LABELS = [
  { num: 1, label: "Welcome" },
  { num: 2, label: "About You" },
  { num: 3, label: "Your Habits" },
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
      {/* Step Indicators */}
      <div className="flex items-center justify-between gap-4">
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
                className={`mb-2 flex h-12 w-12 items-center justify-center rounded-full border-2 text-sm font-bold transition-all duration-300 ${
                  isCompleted
                    ? "border-emerald-400 bg-emerald-500 text-black"
                    : isCurrent
                      ? "border-emerald-400 bg-emerald-500 text-black ring-4 ring-emerald-400/30"
                      : "border-zinc-700 bg-zinc-800 text-zinc-600"
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
                className={`text-sm font-medium transition-colors duration-300 ${
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

      {/* Main Progress Bar */}
      <div className="relative h-2 overflow-hidden rounded-full bg-zinc-800/80">
        <motion.div
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-emerald-400 to-cyan-400"
          initial={{ width: 0 }}
          animate={{ width: `${progressPercent}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
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
