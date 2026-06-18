import type { Metadata } from "next";
import AppSidebarLayout from "@/components/sections/layout/AppSidebarLayout";

export const metadata: Metadata = {
  title: "Coach Jake — Basketball Performance Platform",
  description:
    "Role-based training platform for coaches and athletes. Track workouts, manage players, analyze progress.",
};

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return <AppSidebarLayout>{children}</AppSidebarLayout>;
}
