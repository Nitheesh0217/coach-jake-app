"use client";

import { CSSProperties } from "react";

interface AmbientGlowProps {
  color: "emerald" | "amber" | "cyan";
  position:
    | "top-left"
    | "top-right"
    | "bottom-left"
    | "bottom-right"
    | "center";
  size?: number;
  opacity?: number;
}

const colorMap: Record<string, string> = {
  emerald: "rgba(16, 185, 129, 0.1)",
  amber: "rgba(245, 158, 11, 0.1)",
  cyan: "rgba(6, 182, 212, 0.1)",
};

const positionMap: Record<string, CSSProperties> = {
  "top-left": { top: "0", left: "0" },
  "top-right": { top: "0", right: "0" },
  "bottom-left": { bottom: "0", left: "0" },
  "bottom-right": { bottom: "0", right: "0" },
  center: { top: "50%", left: "50%", transform: "translate(-50%, -50%)" },
};

export default function AmbientGlow({
  color,
  position,
  size = 400,
  opacity = 0.05,
}: AmbientGlowProps) {
  const baseColor = colorMap[color];

  return (
    <div
      className="pointer-events-none absolute z-0 rounded-full blur-[120px] animate-ambient-pulse"
      style={{
        ...positionMap[position],
        width: `${size}px`,
        height: `${size}px`,
        background: `radial-gradient(circle, ${baseColor.replace("0.1", String(opacity))} 0%, transparent 70%)`,
      }}
    />
  );
}
