import type { Metadata } from "next";
import PublicHeader from "@/components/layout/PublicHeader";
import PublicFooter from "@/components/layout/PublicFooter";

export const metadata: Metadata = {
  title: "Coach Jake — Elite Basketball Performance Coaching",
  description:
    "Elite strength, conditioning, and skill training for serious basketball players. Science-backed programs for guards, wings, and bigs.",
};

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#050816]">
      <PublicHeader />
      <main>{children}</main>
      <PublicFooter />
    </div>
  );
}
