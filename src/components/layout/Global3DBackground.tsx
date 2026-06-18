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

// ── ROBUST REACT ERROR BOUNDARY FOR 3D RENDER CRASHES ──
class SplineErrorBoundary extends React.Component<
  { fallback: React.ReactNode; onError: () => void; children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.error("Spline render crash caught by boundary:", error, errorInfo);
    this.props.onError();
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

export default function Global3DBackground() {
  const [splineLoaded, setSplineLoaded] = useState(false);
  const [useSpline, setUseSpline] = useState(true);

  // Fallback timeout: if Spline fails to load in 4 seconds, fallback
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!splineLoaded) {
        setUseSpline(false);
      }
    }, 4000);
    return () => clearTimeout(timer);
  }, [splineLoaded]);

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none -z-10 bg-transparent">
      {useSpline ? (
        <SplineErrorBoundary
          fallback={<BasketballOrb />}
          onError={() => setUseSpline(false)}
        >
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
        </SplineErrorBoundary>
      ) : null}

      {/* Render local procedural Three.js background if Spline is bypassed or failed */}
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
