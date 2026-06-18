"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";

const Spline = dynamic(() => import("@splinetool/react-spline"), {
  ssr: false,
});

const BasketballOrb = dynamic(() => import("@/components/3d/BasketballOrb"), {
  ssr: false,
  loading: () => <div className="fixed inset-0 -z-10 bg-transparent" />,
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
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Fallback timeout: if Spline fails to load in 4 seconds, fallback
  // NOTE: hooks must always run — the early return happens AFTER all hooks
  useEffect(() => {
    // Don't start the timer on homepage (where this component renders null)
    if (pathname === "/") return;

    const timer = setTimeout(() => {
      if (!splineLoaded) {
        setUseSpline(false);
      }
    }, 4000);
    return () => clearTimeout(timer);
  }, [splineLoaded, pathname]);

  // Disable global background on homepage to avoid resource conflict with Hero Spline
  // Also wait for client mount to prevent server/client hydration mismatch
  if (!mounted || pathname === "/") {
    return null;
  }

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
