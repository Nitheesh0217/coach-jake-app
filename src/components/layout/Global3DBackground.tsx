"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";

const Spline = dynamic(() => import("@splinetool/react-spline"), {
  ssr: false,
});

const BasketballOrb = dynamic(() => import("@/components/3d/BasketballOrb"), {
  ssr: false,
  loading: () => <div className="fixed inset-0 -z-10 bg-[#050816]" />,
});

export default function Global3DBackground() {
  const [splineLoaded, setSplineLoaded] = useState(false);
  const [useSpline, setUseSpline] = useState(true);

  // Fallback timeout: if Spline fails to load in 5 seconds (e.g. adblocker, network),
  // fallback to our high-fidelity procedural Three.js Cyber Basketball.
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!splineLoaded) {
        setUseSpline(false);
      }
    }, 5000);
    return () => clearTimeout(timer);
  }, [splineLoaded]);

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none -z-10 bg-transparent">
      {useSpline ? (
        <div
          className={`w-full h-full transition-opacity duration-1000 ${
            splineLoaded ? "opacity-100" : "opacity-0"
          }`}
        >
          <Spline
            scene="https://prod.spline.design/kbKIxYhLg0wP268U/scene.splinecode"
            onLoad={() => setSplineLoaded(true)}
            onError={() => setUseSpline(false)}
          />
        </div>
      ) : null}

      {/* Render local procedural Three.js background if Spline is bypassed or has loaded fallback */}
      {!splineLoaded || !useSpline ? (
        <div
          className={`absolute inset-0 transition-opacity duration-1000 ${
            !useSpline ? "opacity-100" : "opacity-20"
          }`}
        >
          <BasketballOrb />
        </div>
      ) : null}
    </div>
  );
}
