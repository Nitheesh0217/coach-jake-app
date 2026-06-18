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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return <BasketballOrb />;
}
