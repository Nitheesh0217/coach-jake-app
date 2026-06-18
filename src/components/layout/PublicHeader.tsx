"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const nav = [
  { href: "/", label: "Home" },
  { href: "/programs", label: "Programs" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function PublicHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-6 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Premium glass navbar */}
        <div className="flex items-center justify-between h-14 px-6 rounded-full border border-white/10 bg-white/5 backdrop-blur-[10px] shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
          {/* Logo with tagline */}
          <Link
            href="/"
            className="flex items-center gap-2.5 group no-underline flex-shrink-0"
          >
            <div className="h-7 w-7 rounded-md bg-gradient-to-br from-emerald-500 to-emerald-600 border border-emerald-400/60 flex items-center justify-center group-hover:border-emerald-300 transition-all duration-200">
              <svg
                className="w-4 h-4 text-white"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
              </svg>
            </div>
            <div>
              <div className="text-sm font-bold tracking-tight text-white leading-none">
                COACH JAKE
              </div>
              <div className="text-[10px] font-semibold text-emerald-300 tracking-wider leading-none mt-0.5">
                Train Smarter. Win More.
              </div>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-0.5 flex-1 justify-center">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-3 py-1 text-xs font-medium text-zinc-300 hover:text-white transition-colors duration-200"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Desktop auth links */}
          <div className="hidden md:flex items-center gap-2.5 flex-shrink-0">
            <Link
              href="/login"
              className="px-3 py-1 text-xs font-medium text-zinc-300 hover:text-white transition-colors duration-200"
            >
              Log in
            </Link>
            <Link
              href="/signup"
              className="rounded-full bg-emerald-500 hover:bg-emerald-400 px-4 py-1.5 text-xs font-bold text-black transition-all duration-200 shadow-[0_0_16px_rgba(16,185,129,0.4)] hover:shadow-[0_0_24px_rgba(16,185,129,0.6)]"
            >
              Sign up
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-3">
            <Link
              href="/signup"
              className="rounded-full bg-emerald-500 px-3.5 py-1 text-xs font-bold text-black shadow-[0_0_12px_rgba(16,185,129,0.35)]"
            >
              Sign up
            </Link>
            <button
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
              className="p-1.5 text-zinc-300 hover:text-white transition-colors"
            >
              {open ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden absolute top-16 left-4 right-4 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-[10px] shadow-[0_8px_32px_rgba(0,0,0,0.3)] p-4"
          >
            <nav className="flex flex-col gap-2">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="px-4 py-2 text-sm font-medium text-zinc-300 hover:text-white transition-colors"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="border-t border-white/10 my-2" />
              <Link
                href="/login"
                className="px-4 py-2 text-sm font-medium text-zinc-300 hover:text-white transition-colors"
                onClick={() => setOpen(false)}
              >
                Log in
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
