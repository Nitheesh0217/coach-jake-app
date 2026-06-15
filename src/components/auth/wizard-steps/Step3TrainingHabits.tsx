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
      description: "Early bird",
    },
    {
      id: "afternoon",
      label: "Afternoon",
      icon: Cloud,
      description: "Midday grind",
    },
    {
      id: "evening",
      label: "Evening",
      icon: Moon,
      description: "Night sessions",
    },
    {
      id: "weekend",
      label: "Weekend",
      icon: Calendar,
      description: "Extra work",
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
          Step 3 of 4 · Your Training Habits
        </h2>
        <h1 className="text-4xl md:text-5xl font-black text-white mb-3">
          How do you train?
        </h1>
      </motion.div>

      {/* Sessions Per Week */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="mb-10"
      >
        <label className="text-sm font-bold text-zinc-300 uppercase tracking-widest block mb-4">
          Sessions per week
        </label>
        <div className="grid grid-cols-7 gap-2">
          {[1, 2, 3, 4, 5, 6, 7].map((num, idx) => (
            <motion.button
              key={num}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.25 + idx * 0.04 }}
              onClick={() => handleSessionsPerWeekChange(num)}
              className={`aspect-square rounded-xl font-bold text-sm transition-all duration-300 ${
                data.sessionsPerWeek === num
                  ? "bg-emerald-500 text-black border-2 border-emerald-400 shadow-lg shadow-emerald-500/30"
                  : "bg-zinc-800 text-zinc-300 border-2 border-zinc-700 hover:border-emerald-500/40"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {num}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Session Length */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.35 }}
        className="mb-10"
      >
        <label className="text-sm font-bold text-zinc-300 uppercase tracking-widest block mb-4">
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
              className={`py-3 rounded-xl font-bold text-sm transition-all duration-300 ${
                data.sessionLength === length
                  ? "bg-emerald-500 text-black border-2 border-emerald-400 shadow-lg shadow-emerald-500/30"
                  : "bg-zinc-800 text-zinc-300 border-2 border-zinc-700 hover:border-emerald-500/40"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {length} min
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Sleep Hours */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.5 }}
        className="mb-10"
      >
        <div className="flex items-center justify-between mb-4">
          <label className="text-sm font-bold text-zinc-300 uppercase tracking-widest block">
            How many hours of sleep do you get?
          </label>
          <motion.span
            className="text-sm font-bold text-emerald-400"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 0.3 }}
          >
            {data.sleepHours.toFixed(1)} hrs
          </motion.span>
        </div>

        <motion.div className="relative h-2 rounded-full bg-zinc-800 overflow-hidden">
          {/* Background gradient */}
          <motion.div
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-emerald-500 to-cyan-400"
            initial={{ width: `${((data.sleepHours - 4) / 6) * 100}%` }}
            animate={{ width: `${((data.sleepHours - 4) / 6) * 100}%` }}
            transition={{ duration: 0.2 }}
          />

          {/* Slider Input */}
          <input
            type="range"
            min="4"
            max="10"
            step="0.5"
            value={data.sleepHours}
            onChange={(e) => handleSleepChange(parseFloat(e.target.value))}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />

          {/* Thumb */}
          <motion.div
            className="absolute top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-white border-2 border-emerald-400 shadow-lg pointer-events-none"
            style={{
              left: `calc(${((data.sleepHours - 4) / 6) * 100}% - 10px)`,
            }}
          />
        </motion.div>

        <div className="flex justify-between text-xs text-zinc-600 mt-2">
          <span>4</span>
          <span>5</span>
          <span>6</span>
          <span>7</span>
          <span>8</span>
          <span>9</span>
          <span>10</span>
        </div>
      </motion.div>

      {/* Training Times */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.65 }}
      >
        <label className="text-sm font-bold text-zinc-300 uppercase tracking-widest block mb-4">
          When do you train?{" "}
          <span className="text-zinc-600">(Select all that apply)</span>
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
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
                className={`relative group py-4 px-3 rounded-xl border-2 transition-all duration-300 flex flex-col items-center gap-2 ${
                  isSelected
                    ? "border-emerald-400 bg-emerald-500/15"
                    : "border-zinc-700 bg-zinc-800/50 hover:border-emerald-500/40"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Selection pulse */}
                {isSelected && (
                  <motion.div
                    className="absolute inset-0 rounded-xl border border-emerald-400"
                    initial={{ scale: 1, opacity: 0.5 }}
                    animate={{ scale: 1.05, opacity: 0 }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                    }}
                  />
                )}

                <Icon className="w-5 h-5 text-emerald-400" />
                <span className="text-sm font-bold text-white">
                  {option.label}
                </span>
              </motion.button>
            );
          })}
        </div>
      </motion.div>

      {/* Animation Notes */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.85 }}
        className="mt-10 p-6 rounded-xl border border-zinc-800 bg-zinc-900/50 space-y-3"
      >
        <h3 className="text-sm font-bold text-cyan-400 uppercase tracking-widest">
          Interaction Effects
        </h3>
        <ul className="text-xs text-zinc-400 space-y-2">
          <li>• Pill tap (toggle): scales to 0.94 then springs to 1.00</li>
          <li>
            • Border glow intensifies with soft emerald aura that fades out
          </li>
          <li>
            • Multi-select behavior: Each pill is independent and maintains its
            own state
          </li>
          <li>• Selecting or deselecting one does not affect others</li>
        </ul>
      </motion.div>
    </motion.div>
  );
}
