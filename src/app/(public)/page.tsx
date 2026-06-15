import HeroSection from "@/components/home/HeroSection";
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
    <main className="min-h-screen bg-[#050816] text-[#f9fafb] overflow-x-hidden">
      {/* Hero — full bleed dark background with radial glow */}
      <div className="relative">
        {/* Global ambient glow behind hero */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden -z-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full bg-emerald-500/10 blur-[120px]" />
          <div className="absolute top-40 right-0 w-[400px] h-[400px] rounded-full bg-cyan-500/8 blur-[100px]" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-24">
          <HeroSection />
        </div>
      </div>

      {/* Thin separator line */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent" />

      {/* Programs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ProgramsSection />
      </div>

      <div className="w-full h-px bg-gradient-to-r from-transparent via-zinc-700/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <InsideAppSection />
        <BenefitsSection />
        <GamificationSection />
        <HowItWorksSection />
        <UpcomingSessionsSection />
        <FAQSection />
        <TestimonialsSection />
      </div>

      <CoachCredibilityBand />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FinalCtaSection />
      </div>
    </main>
  );
}
