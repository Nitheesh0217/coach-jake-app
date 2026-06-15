"use client";

import { Users, TrendingUp, Target, Zap } from "lucide-react";
import { motion } from "framer-motion";
import StatCard from "@/components/ui/StatCard";

interface CoachKPICardsProps {
  totalAthletes: number;
  thisWeekWorkouts: number;
  avgConsistency: number;
  activeSessions: number;
}

export default function CoachKPICards({
  totalAthletes,
  thisWeekWorkouts,
  avgConsistency,
  activeSessions,
}: CoachKPICardsProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
    >
      <motion.div variants={itemVariants}>
        <StatCard
          label="Total Athletes"
          value={totalAthletes}
          icon={Users}
          iconColor="sky"
          countUp={true}
          delay={0}
        />
      </motion.div>
      <motion.div variants={itemVariants}>
        <StatCard
          label="This Week"
          value={thisWeekWorkouts}
          icon={TrendingUp}
          iconColor="emerald"
          countUp={true}
          delay={0.08}
        />
      </motion.div>
      <motion.div variants={itemVariants}>
        <StatCard
          label="Avg Consistency"
          value={`${avgConsistency}%`}
          icon={Target}
          iconColor="violet"
          countUp={false}
          delay={0.16}
        />
      </motion.div>
      <motion.div variants={itemVariants}>
        <StatCard
          label="Active Now"
          value={activeSessions}
          icon={Zap}
          iconColor="amber"
          countUp={true}
          delay={0.24}
        />
      </motion.div>
    </motion.div>
  );
}
