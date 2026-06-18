import type { Metadata } from "next";
import PublicHeader from "@/components/sections/layout/PublicHeader";
import PublicFooter from "@/components/sections/layout/PublicFooter";
import IntroSequence from "@/components/public/IntroSequence";
import FloatingBall from "@/components/public/FloatingBall";

export const metadata: Metadata = {
  title: "Coach Jake — Elite Basketball Performance Coaching",
  description: "Elite strength, conditioning, and skill training for serious basketball players.",
};

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-transparent overflow-x-hidden relative">
      {/* Page Load Intro Sequence (Gravity Collapse) */}
      <IntroSequence>
        <PublicHeader />
        <div>{children}</div>
        <PublicFooter />
      </IntroSequence>

      {/* Persistent 3D Floating Ball Centerpiece */}
      <FloatingBall />
    </div>
  );
}
