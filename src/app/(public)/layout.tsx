import type { Metadata } from "next";
import PublicHeader from "@/components/layout/PublicHeader";
import PublicFooter from "@/components/layout/PublicFooter";

export const metadata: Metadata = {
  title: "Coach Jake — Elite Basketball Performance Coaching",
  description:
    "Elite strength, conditioning, and skill training for serious basketball players. Science-backed programs for guards, wings, and bigs.",
  openGraph: {
    title: "Coach Jake — Elite Basketball Performance Coaching",
    description:
      "Elite strength, conditioning, and skill training for serious basketball players. Science-backed programs for guards, wings, and bigs.",
    url: "https://coachjakeb.com",
    type: "website",
    images: [
      {
        url: "/hero.jpg",
        width: 1200,
        height: 630,
        alt: "Coach Jake Basketball Training Platform",
      },
    ],
  },
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
