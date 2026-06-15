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
    <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_320px]">
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="rounded-[28px] border border-emerald-400/20 bg-gradient-to-b from-[#111a30]/95 to-[#090f1f]/95 p-7 md:p-9 shadow-[0_0_50px_rgba(16,185,129,0.08)]"
      >
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mb-8"
        >
          <div className="mb-4 inline-flex rounded-full border border-emerald-400/25 bg-emerald-500/10 px-4 py-1 text-xs font-bold uppercase tracking-[0.16em] text-emerald-300">
            Step 3 of 4 · Your Training Habits
          </div>
          <h1 className="text-4xl font-black text-white md:text-5xl">
            How do you train?
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mb-9"
        >
          <label className="mb-3 block text-lg font-semibold text-zinc-300 md:text-xl">
            Sessions per week
          </label>
          <div className="grid grid-cols-7 gap-2.5">
            {[1, 2, 3, 4, 5, 6, 7].map((num, idx) => (
              <motion.button
                key={num}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.25 + idx * 0.04 }}
                onClick={() => handleSessionsPerWeekChange(num)}
                className={`aspect-square rounded-2xl border text-xl font-semibold transition-all duration-300 ${
                  data.sessionsPerWeek === num
                    ? "border-emerald-400 bg-emerald-500/15 text-white shadow-[0_0_24px_rgba(16,185,129,0.3)]"
                    : "border-zinc-700 bg-zinc-900/70 text-zinc-200 hover:border-emerald-500/40"
                }`}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.95 }}
              >
                {num}
              </motion.button>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.35 }}
          className="mb-9"
        >
          <label className="mb-3 block text-lg font-semibold text-zinc-300 md:text-xl">
            Typical session length
          </label>
          <div className="grid grid-cols-4 gap-3">
            {[30, 45, 60, 90].map((length, idx) => (
              <motion.button
                key={length}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.4 + idx * 0.04 }}
                onClick={() => handleSessionLengthChange(length)}
                className={`rounded-2xl border px-4 py-3 text-xl font-semibold transition-all duration-300 ${
                  data.sessionLength === length
                    ? "border-emerald-400 bg-emerald-500/15 text-white shadow-[0_0_24px_rgba(16,185,129,0.3)]"
                    : "border-zinc-700 bg-zinc-900/70 text-zinc-200 hover:border-emerald-500/40"
                }`}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.95 }}
              >
                {length} min
              </motion.button>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
          className="mb-9"
        >
          <div className="mb-4 flex items-center justify-between">
            <label className="text-lg font-semibold text-zinc-300 md:text-xl">
              How many hours of sleep do you get?
            </label>
            <motion.span
              className="text-2xl font-bold text-emerald-300"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 0.3 }}
            >
              {data.sleepHours.toFixed(1)} hrs
            </motion.span>
          </div>

          <motion.div className="relative h-2 rounded-full bg-zinc-800/90 overflow-hidden">
            <motion.div
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-emerald-500 to-cyan-400"
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
              className="absolute top-1/2 h-5 w-5 -translate-y-1/2 rounded-full border-2 border-emerald-300 bg-white shadow-[0_0_12px_rgba(52,211,153,0.8)] pointer-events-none"
              style={{
                left: `calc(${((data.sleepHours - 4) / 6) * 100}% - 10px)`,
              }}
            />
          </motion.div>

          <div className="mt-2 flex justify-between text-xs text-zinc-500">
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
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.65 }}
        >
          <label className="mb-4 block text-lg font-semibold text-zinc-300 md:text-xl">
            When do you train?{" "}
            <span className="text-sm text-zinc-500">(Select all that apply)</span>
          </label>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {trainingTimesOptions.map((option, idx) => {
              const isSelected = data.trainingTimes.includes(
                option.id as "morning" | "afternoon" | "evening" | "weekend",
              );
              const Icon = option.icon;

              return (
                <motion.button
                  key={option.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.7 + idx * 0.06 }}
                  onClick={() =>
                    handleTrainingTimeToggle(
                      option.id as
                        | "morning"
                        | "afternoon"
                        | "evening"
                        | "weekend",
                    )
                  }
                  className={`group relative flex items-center justify-center gap-2 rounded-2xl border px-4 py-3 text-lg font-medium transition-all duration-300 ${
                    isSelected
                      ? "border-emerald-400 bg-emerald-500/15 text-white shadow-[0_0_24px_rgba(16,185,129,0.25)]"
                      : "border-zinc-700 bg-zinc-900/70 text-zinc-100 hover:border-emerald-500/40"
                  }`}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isSelected && (
                    <motion.div
                      className="absolute inset-0 rounded-2xl border border-emerald-300"
                      initial={{ scale: 1, opacity: 0.45 }}
                      animate={{ scale: 1.06, opacity: 0 }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                  )}

                  <Icon className="h-4 w-4 text-emerald-300" />
                  <span>{option.label}</span>
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      </motion.div>

      <motion.aside
        initial={{ opacity: 0, x: 24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.45, delay: 0.3 }}
        className="h-fit rounded-[24px] border border-emerald-400/20 bg-[#0b1120]/90 p-5"
      >
        <h3 className="mb-4 text-sm font-bold uppercase tracking-widest text-emerald-300">
          Animation & Interaction Notes
        </h3>

        <div className="space-y-4 text-sm text-zinc-300">
          <div className="rounded-xl border border-zinc-700/80 bg-zinc-900/70 p-3">
            <p className="mb-2 text-xs font-bold uppercase tracking-wider text-emerald-300">
              Pill tap (toggle)
            </p>
            <ul className="space-y-1 text-zinc-400">
              <li>• Tap scales to 0.94 then springs to 1.0.</li>
              <li>• Border glow intensifies and fades in 300ms.</li>
            </ul>
          </div>

          <div className="rounded-xl border border-zinc-700/80 bg-zinc-900/70 p-3">
            <p className="mb-2 text-xs font-bold uppercase tracking-wider text-emerald-300">
              Multi-select behavior
            </p>
            <ul className="space-y-1 text-zinc-400">
              <li>• Each pill is independent and keeps its own state.</li>
              <li>• Selecting one pill does not affect others.</li>
            </ul>
          </div>

          <div className="rounded-xl border border-zinc-700/80 bg-zinc-900/70 p-3">
            <p className="mb-2 text-xs font-bold uppercase tracking-wider text-emerald-300">
              Bounce feedback
            </p>
            <ul className="space-y-1 text-zinc-400">
              <li>• Selected pills use subtle bounce and ease-out glow.</li>
              <li>• Accent lines fade softly after 400ms.</li>
            </ul>
          </div>
        </div>
      </motion.aside>
    </div>
  );
}
