"use client";

import { motion } from "framer-motion";
import { AlertCircle, TrendingUp, Zap } from "lucide-react";

interface CoachInsightsProps {
  atRiskCount: number;
  onFireCount: number;
  newAthletes: number;
}

export default function CoachInsights({
  atRiskCount,
  onFireCount,
  newAthletes,
}: CoachInsightsProps) {
  const insights = [
    {
      title: "Athletes at Risk",
      description: `${atRiskCount} athlete${atRiskCount !== 1 ? "s" : ""} below target consistency`,
      icon: AlertCircle,
      color: "bg-red-500/10",
      borderColor: "border-red-500/30",
      textColor: "text-red-400",
      accentColor: "sky",
      value: atRiskCount,
    },
    {
      title: "On a Hot Streak",
      description: `${onFireCount} athlete${onFireCount !== 1 ? "s" : ""} with 5+ day streak`,
      icon: Zap,
      color: "bg-amber-500/10",
      borderColor: "border-amber-500/30",
      textColor: "text-amber-400",
      accentColor: "amber",
      value: onFireCount,
    },
    {
      title: "New Enrollments",
      description: `${newAthletes} new athlete${newAthletes !== 1 ? "s" : ""} this week`,
      icon: TrendingUp,
      color: "bg-emerald-500/10",
      borderColor: "border-emerald-500/30",
      textColor: "text-emerald-400",
      accentColor: "emerald",
      value: newAthletes,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-3 gap-4"
    >
      {insights.map((insight, idx) => {
        const Icon = insight.icon;
        return (
          <motion.div
            key={insight.title}
            variants={itemVariants}
            className={`rounded-xl border ${insight.borderColor} ${insight.color} p-6 hover:border-opacity-60 transition-all duration-300 group`}
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <h3 className="font-bold text-white text-sm">{insight.title}</h3>
              <div
                className={`w-10 h-10 rounded-lg ${insight.color} border ${insight.borderColor} flex items-center justify-center`}
              >
                <Icon className={`w-5 h-5 ${insight.textColor}`} />
              </div>
            </div>

            {/* Value */}
            <motion.p
              className={`text-4xl font-bold ${insight.textColor} mb-2`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: 0.3,
                type: "spring",
                stiffness: 500,
                damping: 30,
              }}
            >
              {insight.value}
            </motion.p>

            {/* Description */}
            <p className="text-xs text-zinc-400">{insight.description}</p>

            {/* Accent line */}
            <div
              className={`h-0.5 ${insight.textColor} mt-4 rounded-full opacity-0 group-hover:opacity-50 transition-opacity duration-300`}
            />
          </motion.div>
        );
      })}
    </motion.div>
  );
}
