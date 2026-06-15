"use client";

import { useEffect, useRef, useState } from "react";

export default function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    setIsDesktop(typeof window !== "undefined" && window.innerWidth > 768);

    if (!isDesktop || !glowRef.current) return;

    const handleMouseMove = (event: MouseEvent) => {
      if (glowRef.current) {
        const x = event.clientX - 200;
        const y = event.clientY - 200;
        glowRef.current.style.transform = `translate(${x}px, ${y}px)`;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isDesktop]);

  if (!isDesktop) return null;

  return (
    <div
      ref={glowRef}
      className="pointer-events-none fixed z-0 w-[400px] h-[400px] rounded-full overflow-hidden"
      style={{
        background:
          "radial-gradient(circle, rgba(16,185,129,0.15) 0%, transparent 70%)",
        filter: "blur(80px)",
        transition: "transform 300ms ease-out",
      }}
    />
  );
}
