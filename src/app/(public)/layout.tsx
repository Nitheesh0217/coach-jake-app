import type { Metadata } from "next";
import PublicHeader from "@/components/sections/layout/PublicHeader";
import PublicFooter from "@/components/sections/layout/PublicFooter";
import IntroSequence from "@/components/public/IntroSequence";

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
    </div>
  );
}
