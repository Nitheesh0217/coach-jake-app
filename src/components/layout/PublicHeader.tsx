"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const nav = [
  { href: "/", label: "Home" },
  { href: "/programs", label: "Programs" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function PublicHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#050816]/90 backdrop-blur-xl border-b border-zinc-800/60 shadow-[0_4px_32px_rgba(0,0,0,0.5)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group no-underline">
            <div className="h-8 w-8 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center group-hover:border-emerald-400/70 group-hover:bg-emerald-500/30 transition-all duration-200">
              <span className="text-sm font-black text-emerald-300">CJ</span>
            </div>
            <span className="text-base font-bold tracking-tight text-zinc-50 group-hover:text-white transition-colors">
              Coach Jake
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full px-4 py-1.5 text-sm text-zinc-300 hover:bg-zinc-800/70 hover:text-white transition-all duration-200 font-medium"
              >
                {item.label}
              </Link>
            ))}
            <div className="w-px h-5 bg-zinc-700 mx-2" />
            <Link
              href="/login"
              className="rounded-full px-4 py-1.5 text-sm text-zinc-300 hover:bg-zinc-800/70 hover:text-white transition-all duration-200 font-medium"
            >
              Log in
            </Link>
            <Link
              href="/signup"
              className="ml-1 rounded-full bg-emerald-500 px-5 py-2 text-sm font-bold text-black hover:bg-emerald-400 transition-all duration-200 shadow-[0_0_20px_rgba(16,185,129,0.4)] hover:shadow-[0_0_28px_rgba(16,185,129,0.6)]"
            >
              Sign up
            </Link>
          </nav>

          {/* Mobile controls */}
          <div className="md:hidden flex items-center gap-2">
            <Link
              href="/signup"
              className="rounded-full bg-emerald-500 px-3.5 py-1.5 text-sm font-bold text-black shadow-[0_0_16px_rgba(16,185,129,0.35)]"
            >
              Sign up
            </Link>
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
              className="p-2 rounded-lg bg-zinc-800/60 text-zinc-200 border border-zinc-700/50"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                {open ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-zinc-800/60 bg-[#050816]/95 backdrop-blur-xl overflow-hidden"
          >
            <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-xl px-4 py-2.5 text-sm text-zinc-300 hover:bg-zinc-800 hover:text-white transition-all font-medium"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/login"
                className="rounded-xl px-4 py-2.5 text-sm text-zinc-300 hover:bg-zinc-800 hover:text-white transition-all font-medium"
                onClick={() => setOpen(false)}
              >
                Log in
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
