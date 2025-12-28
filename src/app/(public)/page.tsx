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

export default function HomePage() {
  return (
    <main className="min-h-screen bg-transparent text-[#f9fafb]">
      

      
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
  );
}
