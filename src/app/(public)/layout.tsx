import type { Metadata } from "next";
import PublicHeader from "@/components/layout/PublicHeader";
import PublicFooter from "@/components/layout/PublicFooter";

export const metadata: Metadata = {
  title: "Coach Jake — Elite Basketball Performance Coaching",
  description: "Elite strength, conditioning, and skill training for serious basketball players.",
};

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#050816] overflow-x-hidden">
      <PublicHeader />
      <div>{children}</div>
      <PublicFooter />
    </div>
  );
}
