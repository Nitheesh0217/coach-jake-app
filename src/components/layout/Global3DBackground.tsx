"use client";

import React from "react";
import dynamic from "next/dynamic";

const BasketballOrb = dynamic(() => import("@/components/3d/BasketballOrb"), {
  ssr: false,
  loading: () => <div className="fixed inset-0 -z-10 bg-[#050816]" />,
});

export default function Global3DBackground() {
  return <BasketballOrb />;
}
