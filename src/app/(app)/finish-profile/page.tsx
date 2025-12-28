import { redirect } from "next/navigation";
import { getCurrentUserProfile } from "./actions";
import { isProfileComplete } from "@/lib/profileUtils";
import PlayerCardWizard from "@/components/auth/PlayerCardWizard";

export const metadata = {
  title: "Build Your Player Card - Coach Jake",
  description: "Set up your complete player profile",
};

export default async function FinishProfilePage() {
  // Get the current user's profile
  const { profile, error: fetchError } = await getCurrentUserProfile();

  // If not authenticated, this shouldn't happen (middleware should redirect to login)
  if (fetchError && fetchError.includes("Not authenticated")) {
    redirect("/login");
  }

  // If profile exists and is complete, redirect to dashboard
  if (profile && isProfileComplete(profile) && profile.is_fully_scouted) {
    redirect("/dashboard");
  }

  // Get user role - fallback to "athlete" if not set yet
  const userRole = profile?.role || "athlete";

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#050816]">
      {/* Multi-layer background system */}
      
      {/* Layer 1: Base gradient background */}
      <div className="fixed inset-0 bg-gradient-to-br from-[#050816] via-[#0a1220] to-[#050816]"></div>

      {/* Layer 2: Radial gradients (premium glow effect) */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Primary emerald glow - top left */}
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-gradient-to-br from-emerald-500/20 to-emerald-500/0 rounded-full blur-3xl"></div>
        
        {/* Secondary emerald glow - bottom right */}
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-gradient-to-tl from-emerald-600/15 to-emerald-500/0 rounded-full blur-3xl"></div>
        
        {/* Accent cyan glow - top right */}
        <div className="absolute -top-48 -right-32 w-80 h-80 bg-gradient-to-bl from-cyan-400/10 to-cyan-400/0 rounded-full blur-3xl"></div>
        
        {/* Accent purple glow - bottom left */}
        <div className="absolute -bottom-48 -left-32 w-72 h-72 bg-gradient-to-tr from-purple-500/10 to-purple-500/0 rounded-full blur-3xl"></div>
      </div>

      {/* Layer 3: Animated gradient orbs */}
      <div className="fixed inset-0 pointer-events-none opacity-40">
        {/* Animated emerald orb */}
        <div 
          className="absolute top-1/4 left-1/3 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl"
          style={{
            animation: 'float 20s ease-in-out infinite',
          }}
        ></div>
        
        {/* Animated purple orb */}
        <div 
          className="absolute bottom-1/3 right-1/4 w-56 h-56 bg-blue-500/5 rounded-full blur-3xl"
          style={{
            animation: 'float 25s ease-in-out infinite reverse',
            animationDelay: '5s'
          }}
        ></div>
      </div>

      {/* Layer 4: Premium grid pattern */}
      <div 
        className="fixed inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(90deg, rgba(34, 197, 94, 0.1) 1px, transparent 1px),
            linear-gradient(0deg, rgba(34, 197, 94, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
      ></div>

      {/* Layer 5: Noise texture for depth */}
      <div 
        className="fixed inset-0 opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage: `
            url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' result='noise' /%3E%3C/filter%3E%3Crect width='400' height='400' fill='%23fff' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")
          `,
          backgroundSize: '200px 200px'
        }}
      ></div>

      {/* Layer 6: Floating decorative stickers - Premium positioning */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Top stickers */}
        <div className="absolute top-24 right-12 text-7xl opacity-15 select-none" style={{animation: 'float 8s ease-in-out infinite'}}>🏀</div>
        <div className="absolute top-40 left-16 text-6xl opacity-12 select-none" style={{animation: 'float 10s ease-in-out infinite reverse', animationDelay: '2s'}}>💪</div>
        
        {/* Middle stickers */}
        <div className="absolute top-1/2 right-20 text-5xl opacity-10 select-none" style={{animation: 'float 12s ease-in-out infinite', animationDelay: '1s'}}>⚡</div>
        <div className="absolute top-1/3 left-1/4 text-5xl opacity-10 select-none" style={{animation: 'float 9s ease-in-out infinite reverse', animationDelay: '3s'}}>🔥</div>
        
        {/* Bottom stickers */}
        <div className="absolute bottom-32 right-1/4 text-6xl opacity-12 select-none" style={{animation: 'float 11s ease-in-out infinite', animationDelay: '2s'}}>🎯</div>
        <div className="absolute bottom-24 left-1/3 text-5xl opacity-10 select-none" style={{animation: 'float 13s ease-in-out infinite reverse', animationDelay: '4s'}}>✨</div>
        <div className="absolute bottom-1/3 right-1/3 text-4xl opacity-8 select-none" style={{animation: 'float 15s ease-in-out infinite', animationDelay: '5s'}}>🏆</div>
      </div>

      {/* Layer 7: Radial vignette for depth */}
      <div className="fixed inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse at 50% 50%, rgba(5, 8, 22, 0) 0%, rgba(5, 8, 22, 0.4) 100%)'
      }}></div>

      {/* Content wrapper with proper z-index */}
      <div className="relative z-20 min-h-screen">
        <PlayerCardWizard currentProfile={profile} userRole={userRole} />
      </div>

      {/* CSS animations */}
      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
          }
          25% {
            transform: translateY(-20px) translateX(10px);
          }
          50% {
            transform: translateY(-40px) translateX(-10px);
          }
          75% {
            transform: translateY(-20px) translateX(10px);
          }
        }
      `}</style>
    </div>
  );
}

