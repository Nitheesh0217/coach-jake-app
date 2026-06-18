"use client";

import { useEffect, useRef } from "react";

export default function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (window.innerWidth <= 768) return;
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
  }, []);

  return (
    <div
      ref={glowRef}
      className="pointer-events-none fixed z-0 w-[400px] h-[400px] rounded-full overflow-hidden hidden md:block"
      style={{
        background:
          "radial-gradient(circle, rgba(16,185,129,0.15) 0%, transparent 70%)",
        filter: "blur(80px)",
        transition: "transform 300ms ease-out",
      }}
    />
  );
}
