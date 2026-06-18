import type { Metadata } from "next";
import PublicHeader from "@/components/sections/layout/PublicHeader";
import PublicFooter from "@/components/sections/layout/PublicFooter";

export const metadata: Metadata = {
  title: "Coach Jake — Elite Basketball Performance Coaching",
  description: "Elite strength, conditioning, and skill training for serious basketball players.",
};

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-transparent overflow-x-hidden">
      <PublicHeader />
      <div>{children}</div>
      <PublicFooter />
    </div>
  );
}
