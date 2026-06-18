import HeroSection from "@/components/HeroSection";
import ProgramsSection from "@/components/sections/public/ProgramsSection";
import BenefitsSection from "@/components/sections/public/BenefitsSection";
import TestimonialsSection from "@/components/sections/public/TestimonialsSection";
import FinalCtaSection from "@/components/sections/public/FinalCtaSection";
import HowItWorksSection from "@/components/sections/public/HowItWorksSection";
import FAQSection from "@/components/sections/public/FAQSection";
import CoachCredibilityBand from "@/components/sections/public/CoachCredibilityBand";
import GamificationSection from "@/components/sections/public/GamificationSection";
import InsideAppSection from "@/components/sections/public/InsideAppSection";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-transparent text-white overflow-x-hidden">
      {/* Hero — full screen 3D */}
      <HeroSection />

      {/* Separator */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ProgramsSection />
      </div>

      <div className="w-full h-px bg-gradient-to-r from-transparent via-zinc-800/60 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <InsideAppSection />
        <BenefitsSection />
        <HowItWorksSection />
        <GamificationSection />
        <TestimonialsSection />
        <CoachCredibilityBand />
        <FAQSection />
        <FinalCtaSection />
      </div>
    </main>
  );
}
