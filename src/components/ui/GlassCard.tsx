"use client";

import { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glow?: "emerald" | "amber" | "none";
}

export default function GlassCard({
  children,
  className,
  hover = true,
  glow = "emerald",
}: GlassCardProps) {
  const glowClasses =
    glow === "emerald" && hover
      ? "hover:border-emerald-500/40 hover:shadow-emerald-glow-md"
      : glow === "amber" && hover
        ? "hover:border-amber-500/40 hover:shadow-amber-glow-sm"
        : "";

  return (
    <div className={`glass-card ${glowClasses} ${className || ""}`}>
      {children}
    </div>
  );
}
