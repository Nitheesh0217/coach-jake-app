import Link from "next/link";
import Hero from "@/components/public/Hero";
import ProgramsSection from "@/components/public/ProgramsSection";
import BenefitsSection from "@/components/public/BenefitsSection";
import TestimonialsSection from "@/components/public/TestimonialsSection";
import FinalCtaSection from "@/components/public/FinalCtaSection";
import HowItWorksSection from "@/components/public/HowItWorksSection";
import UpcomingSessionsSection from "@/components/public/UpcomingSessionsSection";
import FAQSection from "@/components/public/FAQSection";
import CoachCredibilityBand from "@/components/public/CoachCredibilityBand";
import GamificationSection from "@/components/public/GamificationSection";
import InsideAppSection from "@/components/public/InsideAppSection";
import PublicHeader from "@/components/layout/PublicHeader";
import PublicFooter from "@/components/layout/PublicFooter";

export default function RootPage() {
  return (
    <div className="min-h-screen bg-transparent text-[#f9fafb] flex flex-col relative">
      {/* Background image layer */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat -z-20"
        style={{ backgroundImage: "url('/hero.jpg')" }}
        aria-hidden
      />

      {/* Dark overlay */}
      <div
        className="fixed inset-0 bg-black pointer-events-none -z-10"
        style={{ opacity: 0.25 }}
        aria-hidden
      />

      <PublicHeader />
      <main className="flex-1 relative z-0">
        <Hero />
        <ProgramsSection />
        <InsideAppSection />
        <BenefitsSection />
        <GamificationSection />
        <HowItWorksSection />
        <UpcomingSessionsSection />
        <FAQSection />
        <TestimonialsSection />
        <CoachCredibilityBand />
        <FinalCtaSection />
      </main>
      <PublicFooter />
    </div>
  );
}
