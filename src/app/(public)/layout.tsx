import type { Metadata } from "next";
import PublicHeader from "@/components/layout/PublicHeader";
import PublicFooter from "@/components/layout/PublicFooter";

export const metadata: Metadata = {
  title: "Coach Jake Strength & Conditioning",
  description: "Mobile-first strength & conditioning coaching app.",
};

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <PublicHeader />
      <main className="py-6">{children}</main>
      <PublicFooter />
    </>
  );
}
