"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Menu, X } from "lucide-react";

const NAV = [
  { href:"/",        label:"Home" },
  { href:"/programs",label:"Programs" },
  { href:"/#about",  label:"About" },
  { href:"/contact", label:"Contact" },
];

export default function PublicHeader() {
  const [scrolled, setScrolled]   = useState(false);
  const [mobileOpen, setMobile]   = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive:true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header initial={{ y:-80, opacity:0 }} animate={{ y:0, opacity:1 }} transition={{ duration:0.6, ease:[0.22,1,0.36,1] }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-[#050816]/95 backdrop-blur-xl border-b border-zinc-800/60 shadow-[0_4px_30px_rgba(0,0,0,0.5)]" : "bg-transparent"
      }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <motion.div whileHover={{ rotate:15, scale:1.1 }} transition={{ type:"spring", stiffness:400 }}
              className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center group-hover:shadow-[0_0_16px_rgba(16,185,129,0.5)] transition-shadow">
              <Zap className="w-4 h-4 text-emerald-400 fill-emerald-400" />
            </motion.div>
            <span className="font-black text-white tracking-tight">Coach <span className="text-emerald-400">Jake</span></span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV.map(n => (
              <Link key={n.href} href={n.href}
                className="px-4 py-2 rounded-lg text-sm font-semibold text-zinc-400 hover:text-white hover:bg-zinc-800/50 transition-all duration-200">
                {n.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <Link href="/login" className="px-4 py-2 rounded-lg text-sm font-semibold text-zinc-400 hover:text-white transition-colors">Log in</Link>
            <motion.div whileHover={{ scale:1.04 }} whileTap={{ scale:0.97 }}>
              <Link href="/signup" className="px-5 py-2.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black font-black text-sm transition-all shadow-[0_0_16px_rgba(16,185,129,0.4)] hover:shadow-[0_0_24px_rgba(16,185,129,0.7)]">
                Sign up
              </Link>
            </motion.div>
          </div>

          {/* Mobile burger */}
          <button onClick={() => setMobile(v=>!v)} className="md:hidden p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800/50 transition-all">
            {mobileOpen ? <X className="w-5 h-5"/> : <Menu className="w-5 h-5"/>}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity:0, y:-20 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-20 }} transition={{ duration:0.25 }}
            className="md:hidden bg-[#050816]/98 backdrop-blur-xl border-t border-zinc-800/60 px-4 py-5 space-y-1">
            {NAV.map(n => (
              <Link key={n.href} href={n.href} onClick={() => setMobile(false)}
                className="block px-4 py-3 rounded-xl text-sm font-semibold text-zinc-300 hover:text-white hover:bg-zinc-800/50 transition-all">
                {n.label}
              </Link>
            ))}
            <div className="pt-3 border-t border-zinc-800/60 flex gap-3">
              <Link href="/login" onClick={() => setMobile(false)} className="flex-1 py-3 rounded-xl border border-zinc-700 text-center text-sm font-semibold text-zinc-300 hover:border-zinc-500 hover:text-white transition-all">Log in</Link>
              <Link href="/signup" onClick={() => setMobile(false)} className="flex-1 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-center text-sm font-black text-black transition-all shadow-[0_0_16px_rgba(16,185,129,0.4)]">Sign up</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
