"use client";

import { motion } from "framer-motion";
import { WizardData } from "../OnboardingWizard";
import { Sun, Cloud, Moon, Calendar } from "lucide-react";

interface Step3TrainingHabitsProps {
  data: WizardData;
  setData: (data: WizardData) => void;
}

export default function Step3TrainingHabits({
  data,
  setData,
}: Step3TrainingHabitsProps) {
  const handleSessionsPerWeekChange = (value: number) => {
    setData({ ...data, sessionsPerWeek: value });
  };

  const handleSessionLengthChange = (value: number) => {
    setData({ ...data, sessionLength: value });
  };

  const handleSleepChange = (value: number) => {
    setData({ ...data, sleepHours: value });
  };

  const handleTrainingTimeToggle = (
    time: "morning" | "afternoon" | "evening" | "weekend",
  ) => {
    const isSelected = data.trainingTimes.includes(time);
    setData({
      ...data,
      trainingTimes: isSelected
        ? data.trainingTimes.filter((t) => t !== time)
        : [...data.trainingTimes, time],
    });
  };

  const trainingTimesOptions = [
    {
      id: "morning",
      label: "Morning",
      icon: Sun,
    },
    {
      id: "afternoon",
      label: "Afternoon",
      icon: Cloud,
    },
    {
      id: "evening",
      label: "Evening",
      icon: Moon,
    },
    {
      id: "weekend",
      label: "Weekend",
      icon: Calendar,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.15 }}
      className="rounded-[32px] border border-emerald-400/20 bg-gradient-to-b from-[#0f1830]/90 to-[#080f24]/90 px-8 py-7 md:px-9 md:py-8 shadow-[0_0_0_1px_rgba(52,211,153,0.05),0_25px_80px_rgba(2,8,23,0.6)] backdrop-blur-xl"
    >
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mb-7"
      >
        <span className="inline-flex rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1 text-sm font-semibold uppercase tracking-wide text-emerald-300">
          Step 3 of 4 · Your Training Habits
        </span>
        <h1 className="mt-3 text-4xl font-bold text-white md:text-5xl">
          How do you train?
        </h1>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.1 }}
        className="mb-7"
      >
        <label className="mb-3 block text-3xl font-medium text-zinc-300 md:text-[32px]">
          Sessions per week
        </label>
        <div className="grid grid-cols-7 gap-2.5 md:gap-3">
          {[1, 2, 3, 4, 5, 6, 7].map((num, idx) => (
            <motion.button
              key={num}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25, delay: 0.16 + idx * 0.03 }}
              onClick={() => handleSessionsPerWeekChange(num)}
              className={`h-14 rounded-2xl border text-2xl font-semibold transition-all duration-300 md:h-16 ${
                data.sessionsPerWeek === num
                  ? "border-emerald-400 bg-emerald-500/20 text-emerald-100 shadow-[0_0_16px_rgba(16,185,129,0.35)]"
                  : "border-white/20 bg-[#09122a]/70 text-zinc-100 hover:border-emerald-500/50"
              }`}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.94 }}
            >
              {num}
            </motion.button>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.18 }}
        className="mb-7"
      >
        <label className="mb-3 block text-3xl font-medium text-zinc-300 md:text-[32px]">
          Typical session length
        </label>
        <div className="grid grid-cols-2 gap-2.5 md:grid-cols-4 md:gap-3">
          {[30, 45, 60, 90].map((length, idx) => (
            <motion.button
              key={length}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25, delay: 0.24 + idx * 0.03 }}
              onClick={() => handleSessionLengthChange(length)}
              className={`h-14 rounded-2xl border text-2xl font-semibold transition-all duration-300 md:h-16 ${
                data.sessionLength === length
                  ? "border-emerald-400 bg-emerald-500/20 text-emerald-100 shadow-[0_0_16px_rgba(16,185,129,0.35)]"
                  : "border-white/20 bg-[#09122a]/70 text-zinc-100 hover:border-emerald-500/50"
              }`}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.94 }}
            >
              {length} min
            </motion.button>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.27 }}
        className="mb-7"
      >
        <div className="mb-3 flex items-center justify-between">
          <label className="text-3xl font-medium text-zinc-300 md:text-[32px]">
            How many hours of sleep do you get?
          </label>
          <span className="text-3xl font-semibold text-emerald-400 md:text-[36px]">
            {data.sleepHours.toFixed(1)} hrs
          </span>
        </div>

        <div className="relative h-2 rounded-full bg-[#2b3556] overflow-hidden">
          <motion.div
            className="absolute left-0 top-0 h-full bg-gradient-to-r from-emerald-400 to-emerald-500"
            initial={{ width: `${((data.sleepHours - 4) / 6) * 100}%` }}
            animate={{ width: `${((data.sleepHours - 4) / 6) * 100}%` }}
            transition={{ duration: 0.2 }}
          />

          <input
            type="range"
            min="4"
            max="10"
            step="0.5"
            value={data.sleepHours}
            onChange={(e) => handleSleepChange(parseFloat(e.target.value))}
            className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
          />

          <motion.div
            className="absolute top-1/2 h-5 w-5 -translate-y-1/2 rounded-full border-2 border-emerald-300 bg-zinc-100 shadow-[0_0_14px_rgba(16,185,129,0.5)] pointer-events-none"
            style={{ left: `calc(${((data.sleepHours - 4) / 6) * 100}% - 10px)` }}
          />
        </div>

        <div className="mt-3 flex justify-between text-xl text-zinc-400 md:text-2xl">
          <span>4</span>
          <span>5</span>
          <span>6</span>
          <span>7</span>
          <span>8</span>
          <span>9</span>
          <span>10</span>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.35 }}
      >
        <label className="mb-3 block text-3xl font-medium text-zinc-300 md:text-[32px]">
          When do you train? <span className="text-zinc-500">(Select all that apply)</span>
        </label>
        <div className="grid grid-cols-2 gap-2.5 md:grid-cols-4 md:gap-3">
          {trainingTimesOptions.map((option, idx) => {
            const isSelected = data.trainingTimes.includes(
              option.id as "morning" | "afternoon" | "evening" | "weekend",
            );
            const Icon = option.icon;

            return (
              <motion.button
                key={option.id}
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.25, delay: 0.42 + idx * 0.03 }}
                onClick={() =>
                  handleTrainingTimeToggle(
                    option.id as "morning" | "afternoon" | "evening" | "weekend",
                  )
                }
                className={`relative flex h-16 items-center justify-center gap-2 rounded-2xl border px-4 text-2xl font-medium transition-all duration-300 ${
                  isSelected
                    ? "border-emerald-400 bg-emerald-500/20 text-emerald-100 shadow-[0_0_16px_rgba(16,185,129,0.35)]"
                    : "border-white/20 bg-[#09122a]/70 text-zinc-100 hover:border-emerald-500/50"
                }`}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.94 }}
              >
                <Icon className="h-5 w-5" />
                <span>{option.label}</span>
              </motion.button>
            );
          })}
        </div>
      </motion.div>
    </motion.div>
  );
}
