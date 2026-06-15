import type { Metadata } from "next";
import AppHeader from "@/components/layout/AppHeader";

export const metadata: Metadata = {
  title: "Coach Jake — Basketball Performance Platform",
  description:
    "Role-based training platform for coaches and athletes. Track workouts, manage players, analyze progress.",
};

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AppHeader />
      <main className="py-6 px-4 max-w-7xl mx-auto">{children}</main>
    </>
  );
}
