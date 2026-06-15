import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          emerald: "#10b981",
          amber: "#f59e0b",
          cyan: "#06b6d4",
        },
        space: {
          900: "#050816",
          800: "#0a0f1e",
        },
      },
      animation: {
        "court-reveal":
          "court-reveal 500ms cubic-bezier(0.22,1,0.36,1) forwards",
        shimmer: "shimmer-sweep 2.5s linear infinite",
        "ambient-pulse": "ambient-pulse 4s ease-in-out infinite",
        "streak-ring": "streak-ring 1.5s ease-out infinite",
        "liquid-fill":
          "liquid-fill 1.2s cubic-bezier(0.34,1.56,0.64,1) forwards",
      },
      keyframes: {
        "court-reveal": {
          from: { opacity: "0", transform: "translateY(24px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "shimmer-sweep": {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
        "liquid-fill": {
          from: { width: "0%" },
          to: { width: "var(--fill-target, 100%)" },
        },
        "ambient-pulse": {
          "0%, 100%": { opacity: "0.04", transform: "scale(1)" },
          "50%": { opacity: "0.07", transform: "scale(1.08)" },
        },
        "streak-ring": {
          "0%": { opacity: "0.6", transform: "scale(1)" },
          "100%": { opacity: "0", transform: "scale(2.2)" },
        },
      },
      boxShadow: {
        "emerald-glow-sm": "0 0 20px rgba(16,185,129,0.35)",
        "emerald-glow-md": "0 0 32px rgba(16,185,129,0.55)",
        "amber-glow-sm": "0 0 20px rgba(245,158,11,0.35)",
        "card-default":
          "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.04)",
        "card-hover":
          "0 16px 48px rgba(0,0,0,0.5), 0 0 24px rgba(16,185,129,0.08)",
      },
    },
  },
  plugins: [],
} satisfies Config;
