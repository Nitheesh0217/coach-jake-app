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
      <div className="relative flex items-start justify-between">
        <div className="absolute top-5 left-0 right-0 h-px bg-white/20" />
        <motion.div
          className="absolute top-5 left-0 h-px bg-emerald-400"
          initial={{ width: 0 }}
          animate={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
        {STEP_LABELS.map((step) => {
          const isCompleted = step.num < currentStep;
          const isCurrent = step.num === currentStep;

          return (
            <motion.div
              key={step.num}
              className="relative z-10 flex flex-col items-center gap-4"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: step.num * 0.05 }}
            >
              {/* Circle Indicator */}
              <motion.div
                className={`h-10 w-10 rounded-full border flex items-center justify-center transition-all duration-300 ${
                  isCompleted
                    ? "bg-emerald-500/20 border-emerald-400 text-emerald-300"
                    : isCurrent
                      ? "bg-emerald-500/20 border-emerald-400 text-emerald-300 shadow-[0_0_14px_rgba(16,185,129,0.5)]"
                      : "bg-transparent border-zinc-600 text-zinc-400"
                }`}
                animate={
                  isCurrent
                    ? {
                        boxShadow: [
                          "0 0 0 0 rgba(16, 185, 129, 0.3)",
                          "0 0 0 8px rgba(16, 185, 129, 0.15)",
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
                    className="w-4 h-4"
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
                  <div className="h-2 w-2 rounded-full bg-current" />
                )}
              </motion.div>

              {/* Step Label */}
              <span
                className={`text-lg transition-colors duration-300 ${
                  isCurrent
                    ? "text-zinc-100"
                    : isCompleted
                      ? "text-zinc-200"
                      : "text-zinc-400"
                }`}
              >
                {step.label}
              </span>
            </motion.div>
          );
        })}
      </div>

      <div className="flex items-center justify-end gap-3">
        <div className="h-2 w-80 max-w-full rounded-full bg-zinc-800">
          <motion.div
            className="h-2 rounded-full bg-gradient-to-r from-emerald-400 to-emerald-500"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
        <motion.div
          className="text-sm font-semibold text-emerald-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {progressPercent}% COMPLETE
        </motion.div>
      </div>
    </motion.div>
  );
}
