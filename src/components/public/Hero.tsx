"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

export default function Hero() {
  const heroRef = useRef<HTMLElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const overlay = overlayRef.current;
    const hero = heroRef.current;
    if (!overlay || !hero) return;

    function handleScroll() {
      if (!hero) return;
      const heroHeight = hero.offsetHeight;
      const scrollY = window.scrollY;
      const progress = Math.min(Math.max(scrollY / heroHeight, 0), 1);
      const min = 0.25;
      const max = 0.75;
      const opacity = min + (max - min) * progress;
      if (overlay) {
        overlay.style.opacity = opacity.toFixed(2);
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative text-white min-h-screen"
      aria-label="Hero"
    >
      {/* Background image layer - using Pexels free image */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat -z-20"
        style={{ backgroundImage: "url('https://images.pexels.com/photos/3808517/pexels-photo-3808517.jpeg?auto=compress&cs=tinysrgb&w=1600')" }}
        aria-hidden
      />

      {/* Dark overlay that will darken while scrolling */}
      <div
        ref={overlayRef}
        className="fixed inset-0 bg-black pointer-events-none -z-10"
        style={{ opacity: 0.5, transition: "opacity 0.1s linear" }}
        aria-hidden
      />

      <div className="max-w-5xl mx-auto px-4 pt-24 pb-32 lg:pt-36 lg:pb-44 flex flex-col gap-6 lg:flex-row lg:items-center">
        {/* Left */}
        <div className="lg:w-1/2 space-y-6">
          <div className="inline-flex items-center rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-300">
            Basketball performance coaching
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
            <span className="text-zinc-50">
              Explosive Basketball Performance for{" "}
            </span>
            <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-300 bg-clip-text text-transparent">
              Serious Hoopers
            </span>
          </h1>

          <p className="mt-4 text-sm sm:text-base text-zinc-300 max-w-xl">
            Mobile-first strength, conditioning, and on-court skill work to get
            you stronger, quicker, and game-ready — in the gym or at home.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-4">
            <Link
              href="/signup"
              className="inline-flex items-center justify-center rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold px-8 py-3 shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] transition-all duration-300 hover:-translate-y-0.5"
            >
              Start training free
            </Link>

            <a
              href="#overview"
              className="inline-flex items-center justify-center rounded-xl border border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/10 px-8 py-3 transition-all duration-300"
            >
              Watch 60s overview
            </a>
          </div>

          {/* Stats row */}
          <div className="mt-8 grid grid-cols-2 gap-4 text-sm text-zinc-300 sm:grid-cols-4">
            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 hover:border-emerald-500/30 hover:bg-emerald-500/[0.04] transition-all duration-200">
              <p className="text-2xl font-bold text-emerald-400">500+</p>
              <p className="text-xs mt-1">Athletes Trained</p>
            </div>
            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 hover:border-emerald-500/30 hover:bg-emerald-500/[0.04] transition-all duration-200">
              <p className="text-2xl font-bold text-emerald-400">92%</p>
              <p className="text-xs mt-1">Report Improved Performance</p>
            </div>
            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 hover:border-emerald-500/30 hover:bg-emerald-500/[0.04] transition-all duration-200">
              <p className="text-2xl font-bold text-emerald-400">3</p>
              <p className="text-xs mt-1">Texas High Schools</p>
            </div>
            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 hover:border-emerald-500/30 hover:bg-emerald-500/[0.04] transition-all duration-200">
              <p className="text-2xl font-bold text-emerald-400">10,000+</p>
              <p className="text-xs mt-1">Workouts Logged</p>
            </div>
          </div>
        </div>

        {/* Right - decorative glass card (keeps layout balance) */}
        <div className="lg:w-1/2 flex justify-center">
          <div className="relative w-full max-w-md rounded-3xl overflow-hidden border border-white/[0.08] bg-white/[0.03] shadow-xl shadow-black/40 backdrop-blur-sm">
            <div className="relative h-64 sm:h-72 md:h-96 lg:h-[420px] w-full">
              {/* Panel image (in-app preview) - using Pexels free image */}
              <img
                src="https://images.pexels.com/photos/3839969/pexels-photo-3839969.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Panel preview"
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover"
              />

              {/* Decorative foreground gradient to sit above the image */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />
            </div>

            {/* subtle inner highlight */}
            <div className="absolute left-0 top-0 h-full w-1/3 bg-gradient-to-r from-emerald-500/6 to-transparent mix-blend-overlay pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
}
