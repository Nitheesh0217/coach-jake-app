"use client";

interface TechCornersProps {
  color?: string;
  size?: string;
  className?: string;
}

export default function TechCorners({
  color = "border-emerald-500/40",
  size = "w-2 h-2",
  className = "",
}: TechCornersProps) {
  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`} aria-hidden="true">
      {/* Top Left */}
      <div
        className={`absolute top-0 left-0 ${size} border-t-2 border-l-2 ${color} rounded-tl-sm transition-transform duration-300 group-hover/card:-translate-x-1 group-hover/card:-translate-y-1 group-hover/btn:-translate-x-0.5 group-hover/btn:-translate-y-0.5`}
      />
      {/* Top Right */}
      <div
        className={`absolute top-0 right-0 ${size} border-t-2 border-r-2 ${color} rounded-tr-sm transition-transform duration-300 group-hover/card:translate-x-1 group-hover/card:-translate-y-1 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5`}
      />
      {/* Bottom Left */}
      <div
        className={`absolute bottom-0 left-0 ${size} border-b-2 border-l-2 ${color} rounded-bl-sm transition-transform duration-300 group-hover/card:-translate-x-1 group-hover/card:translate-y-1 group-hover/btn:-translate-x-0.5 group-hover/btn:translate-y-0.5`}
      />
      {/* Bottom Right */}
      <div
        className={`absolute bottom-0 right-0 ${size} border-b-2 border-r-2 ${color} rounded-br-sm transition-transform duration-300 group-hover/card:translate-x-1 group-hover/card:translate-y-1 group-hover/btn:translate-x-0.5 group-hover/btn:translate-y-0.5`}
      />
    </div>
  );
}
