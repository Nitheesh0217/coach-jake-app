"use client";

import { motion } from "framer-motion";
import { WizardData } from "../OnboardingWizard";

interface Step1ProfileProps {
  data: WizardData;
  setData: (data: WizardData) => void;
}

export default function Step1Profile({ data, setData }: Step1ProfileProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const fields = [
    {
      name: "fullName",
      label: "Full Name",
      placeholder: "Enter your full name",
      type: "text",
      delay: 0.3,
    },
    {
      name: "age",
      label: "Age",
      placeholder: "Enter your age",
      type: "number",
      delay: 0.36,
    },
    {
      name: "height",
      label: "Height",
      placeholder: "Enter your height",
      type: "number",
      suffix: "cm",
      delay: 0.42,
    },
    {
      name: "weight",
      label: "Weight",
      placeholder: "Enter your weight",
      type: "number",
      suffix: "kg",
      delay: 0.48,
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
          Step 1 of 4 · Tell us about you
        </h2>
        <h1 className="text-4xl md:text-5xl font-black text-white mb-3">
          Build your player profile
        </h1>
        <p className="text-zinc-400 text-base">
          We use this to personalize your training plan
        </p>
      </motion.div>

      {/* Form Fields */}
      <div className="space-y-6">
        {fields.map((field, idx) => (
          <motion.div
            key={field.name}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: field.delay }}
            className="space-y-2.5"
          >
            <label className="text-sm font-bold text-zinc-300 uppercase tracking-widest block">
              {field.label}
            </label>
            <div className="relative">
              <input
                type={field.type}
                name={field.name}
                value={data[field.name as keyof WizardData] as string}
                onChange={handleChange}
                placeholder={field.placeholder}
                className="w-full bg-zinc-800/60 border border-zinc-700 rounded-xl px-4 py-3.5 text-white placeholder-zinc-600 text-base focus:border-emerald-400 focus:outline-none focus:ring-[3px] focus:ring-emerald-500/30 transition-all duration-300"
              />
              {field.suffix && (
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 font-semibold">
                  {field.suffix}
                </span>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Help Text */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.54 }}
        className="text-xs text-zinc-500 mt-8 italic"
      >
        Your data is secure and never shared.
      </motion.p>
    </motion.div>
  );
}
