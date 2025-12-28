"use client";

import { useState } from "react";
import Link from "next/link";

const nav = [
  { href: "/", label: "Home" },
  { href: "/programs", label: "Programs" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/login", label: "Log in" },
];

export default function PublicHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 bg-black/70 backdrop-blur">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="text-lg font-semibold tracking-tight text-zinc-50 no-underline">
          Coach Jake
        </Link>

        <nav className="hidden md:flex items-center gap-3">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-3 py-1 text-sm text-zinc-300 hover:bg-zinc-800 hover:text-white transition"
            >
              {item.label}
            </Link>
          ))}

          <Link
            href="/signup"
            className="ml-2 rounded-full bg-emerald-500 px-4 py-1.5 text-sm font-semibold text-black hover:bg-emerald-400 transition shadow shadow-emerald-500/30"
          >
            Sign up
          </Link>
        </nav>

        {/* Mobile controls */}
        <div className="md:hidden flex items-center gap-2">
          <Link href="/signup" className="rounded-full bg-emerald-500 px-3 py-1 text-sm font-semibold text-black">Sign up</Link>

          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            className="p-2 rounded-md bg-zinc-800/50 text-zinc-200"
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

      {/* Mobile menu overlay */}
      {open && (
        <div className="md:hidden border-t border-zinc-800 bg-black/80 backdrop-blur">
          <div className="max-w-5xl mx-auto px-4 py-4 flex flex-col gap-2">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full px-3 py-2 text-sm text-zinc-300 hover:bg-zinc-800 hover:text-white transition"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
