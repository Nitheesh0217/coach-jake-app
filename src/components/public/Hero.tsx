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
      {/* Background image layer - place your hero at public/hero.jpg */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat -z-20"
        style={{ backgroundImage: "url('/hero.jpg')" }}
        aria-hidden
      />

      {/* Dark overlay that will darken while scrolling */}
      <div
        ref={overlayRef}
        className="fixed inset-0 bg-black pointer-events-none -z-10"
        style={{ opacity: 0.25, transition: "opacity 0.1s linear" }}
        aria-hidden
      />

      <div className="max-w-5xl mx-auto px-4 pt-24 pb-32 lg:pt-36 lg:pb-44 flex flex-col gap-6 lg:flex-row lg:items-center">
        {/* Left */}
        <div className="lg:w-1/2 space-y-6">
          <div className="inline-flex items-center rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-300">
            Basketball performance coaching
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-zinc-50">
            Explosive Basketball Performance for Serious Hoopers
          </h1>

          <p className="mt-4 text-sm sm:text-base text-zinc-300 max-w-xl">
            Mobile-first strength, conditioning, and on-court skill work to get you stronger, quicker, and game-ready — in the gym or at home.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-4">
            <Link
              href="/signup"
              className="inline-flex items-center justify-center rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-black shadow-lg shadow-emerald-500/30 transition transform will-change-transform hover:bg-emerald-400 hover:-translate-y-0.5 hover:shadow-emerald-500/30"
            >
              Start training free
            </Link>

            <a
              href="#overview"
              className="inline-flex items-center justify-center rounded-full border border-zinc-700 px-5 py-2.5 text-sm font-medium text-zinc-200 hover:border-zinc-500 hover:bg-zinc-900/60 hover:text-white transition"
            >
              Watch 60s overview
            </a>
          </div>

          {/* Stats row */}
          <div className="mt-8 grid grid-cols-1 gap-4 text-sm text-zinc-300 sm:grid-cols-3">
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 px-4 py-3">120+ athletes trained</div>
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 px-4 py-3">Average +3" vertical in 12 weeks</div>
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 px-4 py-3">5+ years coaching experience</div>
          </div>
        </div>

        {/* Right - decorative glass card (keeps layout balance) */}
        <div className="lg:w-1/2 flex justify-center">
          <div className="relative w-full max-w-md rounded-3xl overflow-hidden border border-zinc-800 bg-zinc-900/40 shadow-xl shadow-black/40 backdrop-blur-sm">
            <div className="relative h-64 sm:h-72 md:h-96 lg:h-[420px] w-full">
              {/* Panel image (in-app preview) */}
              <img
                src="/images/hero-panel.jpg"
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
