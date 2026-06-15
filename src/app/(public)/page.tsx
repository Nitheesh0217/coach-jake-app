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
      {/* Hero + Programs with court backdrop */}
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-0">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-35"
            style={{ backgroundImage: "url('/images/hero.jpg')" }}
          />
          <div className="absolute inset-0 bg-[#040712]/80" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[950px] h-[620px] rounded-full bg-emerald-500/10 blur-[125px]" />
          <div className="absolute top-24 right-0 w-[480px] h-[420px] rounded-full bg-cyan-500/10 blur-[110px]" />
        </div>
        <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 pb-8">
          <HeroSection />
        </div>
        <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <ProgramsSection />
        </div>
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
