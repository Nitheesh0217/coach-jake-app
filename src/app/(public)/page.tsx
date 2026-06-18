import HeroSection from "@/components/home/HeroSection";
import ProgramsSection from "@/components/public/ProgramsSection";
import BenefitsSection from "@/components/public/BenefitsSection";
import TestimonialsSection from "@/components/public/TestimonialsSection";
import FinalCtaSection from "@/components/public/FinalCtaSection";
import HowItWorksSection from "@/components/public/HowItWorksSection";
import FAQSection from "@/components/public/FAQSection";
import CoachCredibilityBand from "@/components/public/CoachCredibilityBand";
import GamificationSection from "@/components/public/GamificationSection";
import InsideAppSection from "@/components/public/InsideAppSection";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#050816] text-white overflow-x-hidden">
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
