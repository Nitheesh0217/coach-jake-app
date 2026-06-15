"use client";

import { useState } from "react";

export default function FAQSection() {
  const items = [
    {
      q: "Do I need a full gym?",
      a: "No — many sessions use bodyweight and minimal equipment. We provide alternatives for home or limited-gear setups.",
    },
    {
      q: "Can I use this in-season?",
      a: "Yes. Plans adjust volume for in-season maintenance while protecting recovery.",
    },
    {
      q: "What ages do you work with?",
      a: "We work with middle school through college athletes; programs are scaled by age and maturity.",
    },
    {
      q: "Is this in-person or online?",
      a: "Both. Training plans and tools are online; select clinics are in-person (see upcoming sessions).",
    },
  ];

  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="mx-auto mt-16 max-w-5xl px-4 bg-[#050816]">
      <h2 className="text-xl sm:text-2xl font-semibold bg-gradient-to-r from-white via-zinc-100 to-zinc-300 bg-clip-text text-transparent">
        FAQ
      </h2>
      <div className="mt-4 space-y-3">
        {items.map((it, idx) => (
          <div
            key={it.q}
            className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4"
          >
            <button
              onClick={() => setOpen(open === idx ? null : idx)}
              className="w-full text-left"
            >
              <div className="text-sm font-semibold text-zinc-50">{it.q}</div>
              <div className="text-xs text-zinc-400 mt-1">
                {open === idx
                  ? it.a
                  : it.a.length > 120
                    ? it.a.slice(0, 120) + "…"
                    : it.a}
              </div>
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
