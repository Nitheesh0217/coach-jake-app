"use client";

import React from "react";

interface BrandLogoProps {
  showSubtitle?: boolean;
  className?: string;
  logoSize?: string;
}

export default function BrandLogo({
  showSubtitle = true,
  className = "",
  logoSize = "w-8 h-8",
}: BrandLogoProps) {
  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Green Basketball SVG */}
      <svg viewBox="0 0 100 100" className={`${logoSize} flex-shrink-0`} fill="none">
        <circle cx="50" cy="50" r="45" fill="#10b981" />
        <path d="M50 5 L50 95" stroke="#050816" strokeWidth="5.5" strokeLinecap="round" />
        <path d="M5 50 L95 50" stroke="#050816" strokeWidth="5.5" strokeLinecap="round" />
        <path d="M22 14 Q 55 50 22 86" stroke="#050816" strokeWidth="5.5" strokeLinecap="round" fill="none" />
        <path d="M78 14 Q 45 50 78 86" stroke="#050816" strokeWidth="5.5" strokeLinecap="round" fill="none" />
        <circle cx="50" cy="50" r="45" stroke="#050816" strokeWidth="5.5" />
      </svg>
      {/* Brand Text & Subtitle */}
      <div className="flex flex-col">
        <span className="font-black text-white text-base tracking-tight uppercase leading-none">
          COACH <span className="text-emerald-400">JAKE</span>
        </span>
        {showSubtitle && (
          <span className="text-[10px] text-zinc-500 font-bold tracking-wide mt-1 leading-none">
            Train Smarter. Win More.
          </span>
        )}
      </div>
    </div>
  );
}
