"use client";

import { ReactNode, createElement } from "react";

interface GradientTextProps {
  children: ReactNode;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
  from?: string;
  to?: string;
}

export default function GradientText({
  children,
  as = "span",
  className = "",
  from = "emerald-400",
  to = "cyan-400",
}: GradientTextProps) {
  const colorClass = `from-${from} to-${to}`;

  return createElement(as, {
    className: `gradient-text ${colorClass} ${className}`,
    children,
  });
}
