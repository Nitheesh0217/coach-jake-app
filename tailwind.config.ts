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
          amber:   "#f59e0b",
          cyan:    "#06b6d4",
        },
        space: {
          900: "#050816",
          800: "#0a0f1e",
        },
      },
      boxShadow: {
        "emerald-glow-sm": "0 0 20px rgba(16,185,129,0.35)",
        "emerald-glow-md": "0 0 32px rgba(16,185,129,0.55)",
        "amber-glow-sm":   "0 0 20px rgba(245,158,11,0.35)",
        "card-default":    "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.04)",
        "card-hover":      "0 16px 48px rgba(0,0,0,0.5), 0 0 24px rgba(16,185,129,0.08)",
      },
      // NOTE: keyframes and animation names live in globals.css ONLY.
      // Do NOT redeclare them here — that causes the double-definition
      // conflict that was breaking the site.
    },
  },
  plugins: [],
} satisfies Config;
