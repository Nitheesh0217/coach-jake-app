"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface IntroSequenceProps {
  children: React.ReactNode;
}

export default function IntroSequence({ children }: { children: React.ReactNode }) {
  const [stage, setStage] = useState<"initial" | "blurred" | "normal">("initial");

  useEffect(() => {
    // 1. Start with the "Gravity Collapse" blurred state immediately on mount
    setStage("blurred");

    // 2. Snap back into focus and scale after 2.2 seconds once the floating ball settles
    const timer = setTimeout(() => {
      setStage("normal");
    }, 2200);

    return () => clearTimeout(timer);
  }, []);

  const variants = {
    initial: {
      filter: "blur(0px)",
      scale: 1,
      opacity: 1,
    },
    blurred: {
      filter: "blur(24px)",
      scale: 1.2,
      opacity: 0.08,
      backgroundColor: "#000000",
      transition: { duration: 0.45, ease: "easeIn" as any },
    },
    normal: {
      filter: "blur(0px)",
      scale: 1,
      opacity: 1,
      backgroundColor: "transparent",
      transition: { duration: 1.4, ease: [0.16, 1, 0.3, 1] as any }, // smooth zoom-in snap focus
    },
  };

  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate={stage}
      className="min-h-screen w-full"
    >
      {children}
    </motion.div>
  );
}
