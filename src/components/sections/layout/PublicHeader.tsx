"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import BrandLogo from "@/components/ui/BrandLogo";

const NAV = [
  { href: "/",         label: "Home"     },
  { href: "/programs", label: "Programs" },
  { href: "/contact",  label: "Contact"  },
];

export default function PublicHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open,     setOpen]     = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0,   opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-transparent/95 backdrop-blur-xl border-b border-zinc-800/60 shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="group">
            <BrandLogo />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV.map((n) => (
              <Link key={n.href} href={n.href}
                className="px-4 py-2 rounded-lg text-sm font-semibold text-zinc-400 hover:text-white hover:bg-zinc-800/50 transition-all duration-200">
                {n.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <Link href="/login"
              className="px-4 py-2 rounded-lg text-sm font-semibold text-zinc-400 hover:text-white transition-colors">
              Log in
            </Link>
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Link href="/signup"
                className="px-5 py-2.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black font-black text-sm transition-all shadow-[0_0_16px_rgba(16,185,129,0.4)] hover:shadow-[0_0_28px_rgba(16,185,129,0.7)]">
                Sign up
              </Link>
            </motion.div>
          </div>

          {/* Mobile burger */}
          <button onClick={() => setOpen((v) => !v)}
            className="md:hidden p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800/50 transition-all">
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.22 }}
            className="md:hidden bg-transparent/98 backdrop-blur-xl border-t border-zinc-800/60 px-4 py-5 space-y-1"
          >
            {NAV.map((n) => (
              <Link key={n.href} href={n.href} onClick={() => setOpen(false)}
                className="block px-4 py-3 rounded-xl text-sm font-semibold text-zinc-300 hover:text-white hover:bg-zinc-800/50 transition-all">
                {n.label}
              </Link>
            ))}
            <div className="pt-3 border-t border-zinc-800/60 flex gap-3 mt-2">
              <Link href="/login" onClick={() => setOpen(false)}
                className="flex-1 py-3 rounded-xl border border-zinc-700 text-center text-sm font-semibold text-zinc-300 hover:border-zinc-500 hover:text-white transition-all">
                Log in
              </Link>
              <Link href="/signup" onClick={() => setOpen(false)}
                className="flex-1 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-center text-sm font-black text-black transition-all shadow-[0_0_16px_rgba(16,185,129,0.4)]">
                Sign up
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
