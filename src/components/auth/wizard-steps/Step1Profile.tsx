"use client";

import { motion } from "framer-motion";
import { WizardData } from "../OnboardingWizard";

interface Step1ProfileProps {
  data: WizardData;
  setData: (data: WizardData) => void;
  onNext: () => void;
}

export default function Step1Profile({ data, setData, onNext }: Step1ProfileProps) {
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
      className="rounded-[2rem] border border-zinc-600/60 bg-gradient-to-b from-zinc-900/80 to-zinc-950/90 backdrop-blur-xl p-8 md:p-10 shadow-2xl shadow-emerald-500/10"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="mb-8"
      >
        <h2 className="text-sm font-bold text-emerald-400 uppercase tracking-[0.24em] mb-3">
          Step 1 of 4 · Tell us about you
        </h2>
        <h1 className="text-4xl md:text-5xl font-black text-white mb-3 leading-[1.05]">
          Build your player profile
        </h1>
        <p className="text-zinc-400 text-base">
          We use this to personalize your training plan
        </p>
      </motion.div>

      {/* Form Fields */}
      <div className="space-y-6">
        {fields.map((field) => (
          <motion.div
            key={field.name}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: field.delay }}
            className={`space-y-2.5 ${field.name === "age" ? "max-w-[270px]" : ""}`}
          >
            <label className="text-sm font-semibold text-zinc-200 block">
              {field.label}
            </label>
            <div className="relative">
              <input
                type={field.type}
                name={field.name}
                value={data[field.name as keyof WizardData] as string}
                onChange={handleChange}
                placeholder={field.placeholder}
                className="w-full bg-zinc-800/45 border border-zinc-600/80 rounded-xl px-4 py-3.5 text-white placeholder-zinc-500 text-base focus:border-emerald-400 focus:outline-none focus:ring-[3px] focus:ring-emerald-500/30 transition-all duration-300"
              />
              {field.suffix && (
                <span className="absolute right-6 top-1/2 -translate-y-1/2 text-zinc-300 font-semibold text-xl">
                  {field.suffix}
                </span>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.56 }}
        className="mt-10 flex justify-end"
      >
        <button
          type="button"
          onClick={onNext}
          className="px-10 py-3.5 rounded-full bg-emerald-400 text-black font-bold text-2xl transition-all duration-300 shadow-[0_0_24px_rgba(16,185,129,0.5)] hover:-translate-y-1 hover:shadow-[0_0_38px_rgba(16,185,129,0.8)] active:translate-y-0 flex items-center gap-3"
        >
          Next <span>→</span>
        </button>
      </motion.div>
    </motion.div>
  );
}
