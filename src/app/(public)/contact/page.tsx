"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, Mail, Phone, Instagram, Youtube, MessageSquare, CheckCircle2, Quote, ArrowDown, Loader2 } from "lucide-react";
import { submitContact } from "./actions";

type UserRole = "player" | "parent" | null;
type ContactStep = 1 | 2 | 3 | 4;
type ContactPreference = "email" | "call" | null;

interface FormData {
  role: UserRole;
  name: string;
  email: string;
  location: string;
  age: string;
  level: string;
  season: string;
  goal: string;
  story: string;
  preference: ContactPreference;
  callTimes?: string;
}

export default function ContactPage() {
  const [step, setStep] = useState<ContactStep>(1);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });
  const [formData, setFormData] = useState<FormData>({
    role: null,
    name: "",
    email: "",
    location: "",
    age: "",
    level: "",
    season: "",
    goal: "",
    story: "",
    preference: null,
  });

  const handleNext = () => {
    if (step < 4) setStep((step + 1) as ContactStep);
  };

  const handleBack = () => {
    if (step > 1) setStep((step - 1) as ContactStep);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      const result = await submitContact({
        name: formData.name,
        email: formData.email,
        message: formData.story,
      });

      if (result.success) {
        setSubmitStatus({
          type: "success",
          message: result.message || "Message sent to Coach Jake",
        });
        // Reset form after 3 seconds
        setTimeout(() => {
          setFormData({
            role: null,
            name: "",
            email: "",
            location: "",
            age: "",
            level: "",
            season: "",
            goal: "",
            story: "",
            preference: null,
          });
          setStep(1);
          setSubmitStatus({ type: null, message: "" });
        }, 3000);
      } else {
        setSubmitStatus({
          type: "error",
          message: result.error || "Failed to send message",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToForm = () => {
    const formElement = document.getElementById("contact-form");
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const faqItems = [
    {
      q: "Is there a cost to reaching out?",
      a: "No cost to reach out. Jake reviews every message and will recommend a program or schedule a call if needed.",
    },
    {
      q: "Do you work with beginners?",
      a: "Absolutely. We have programs for youth hoopers all the way up to college and adult rec players. Starting strength and movement foundations is what we love.",
    },
    {
      q: "Can you help if I don't have a full gym?",
      a: "Yes. We have programs that work with minimal equipment, bodyweight, or home setup. Tell us what you have access to.",
    },
    {
      q: "Do you work with teams?",
      a: "We do custom team training programs. Reach out with your context and we can discuss options.",
    },
    {
      q: "How long before I see results?",
      a: "Most athletes see noticeable changes in 4–6 weeks (strength gains, conditioning, confidence). Bigger transformations happen over 12+ weeks.",
    },
  ];

  const testimonials = [
    {
      quote: "Reached out with questions, had a plan in my inbox the next day. Not just generic—actually addressed my situation.",
      name: "Marcus J.",
      role: "HS Guard",
    },
    {
      quote: "The call with Jake made it clear exactly what my son needed this off-season. Worth the conversation alone.",
      name: "Coach Smith",
      role: "Parent of 10th-grade guard",
    },
    {
      quote: "I was unsure if the program was for me. Jake's response answered every concern and showed he actually cares.",
      name: "Tyler D.",
      role: "College athlete",
    },
  ];

  return (
    <main className="relative text-zinc-50">
      {/* Background */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat -z-20"
        style={{ backgroundImage: "url('/hero.jpg')" }}
        aria-hidden
      />
      <div
        className="fixed inset-0 bg-black pointer-events-none -z-10"
        style={{ opacity: 0.65 }}
        aria-hidden
      />

      {/* ===== HERO ===== */}
      <section className="relative py-16 lg:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: Copy */}
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-emerald-300">
                  Ready to talk game?
                </div>

                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight tracking-tight">
                  Talk with Coach Jake about your game.
                </h1>

                <p className="text-xl text-zinc-300">
                  Share where you're at, what season you're in, and Jake will map
                  your next 4–12 weeks of training.
                </p>
              </div>

              <button
                onClick={scrollToForm}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-black font-semibold transition-all duration-200 shadow-lg shadow-emerald-500/20"
              >
                Start the conversation
                <ArrowDown className="w-4 h-4" />
              </button>
            </div>

            {/* Right: Card preview */}
            <div className="hidden lg:block rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/10 to-black/20 backdrop-blur-sm p-8 space-y-4 h-80 flex flex-col justify-center">
              <div className="space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-400" />
                <p className="text-lg font-bold">It's personal here.</p>
                <p className="text-sm text-zinc-400">
                  Jake reads every message. You're not getting a generic template—you're
                  getting a custom plan based on your exact situation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== MAIN 2-COLUMN LAYOUT ===== */}
      <section className="relative py-16 lg:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
            {/* LEFT COLUMN: How it works + ways to reach */}
            <div className="lg:col-span-2 space-y-8">
              {/* How this works */}
              <div className="rounded-2xl border border-zinc-800/60 bg-gradient-to-br from-zinc-900/50 to-black/30 backdrop-blur-sm p-8 space-y-6">
                <h3 className="text-2xl font-bold">How this works</h3>

                <div className="space-y-6">
                  {[
                    { num: "1", title: "You send a quick overview", desc: "Fill out the form—takes 5 min max." },
                    { num: "2", title: "Jake replies in 24–48 hours", desc: "Personal message with your situation in mind." },
                    { num: "3", title: "You choose next steps", desc: "Get a recommended program or hop on a call." },
                  ].map((step, idx) => (
                    <div key={idx} className="flex gap-4">
                      <div className="flex-shrink-0">
                        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-emerald-500/20 border border-emerald-500/40">
                          <span className="text-sm font-bold text-emerald-400">{step.num}</span>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <p className="font-semibold text-zinc-100">{step.title}</p>
                        <p className="text-sm text-zinc-400">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Ways to reach Jake */}
              <div className="space-y-4">
                <h4 className="text-sm font-semibold uppercase tracking-widest text-zinc-400">
                  Ways to reach Jake
                </h4>

                {/* Email */}
                <a
                  href="mailto:coachjake@example.com"
                  className="group flex items-center gap-4 rounded-lg border border-zinc-800/60 bg-gradient-to-br from-zinc-900/50 to-black/30 p-5 hover:border-emerald-500/40 transition-all duration-200"
                >
                  <Mail className="w-6 h-6 text-emerald-400 flex-shrink-0 group-hover:scale-110 transition-transform" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-zinc-200">Email</p>
                    <p className="text-sm text-zinc-400 truncate">coachjake@example.com</p>
                  </div>
                  <ChevronDown className="w-5 h-5 text-zinc-500 group-hover:text-emerald-400 transition-colors" />
                </a>

                {/* Phone (placeholder) */}
                <div className="group flex items-center gap-4 rounded-lg border border-zinc-800/60 bg-gradient-to-br from-zinc-900/50 to-black/30 p-5 opacity-60">
                  <Phone className="w-6 h-6 text-zinc-500 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-zinc-400">Phone</p>
                    <p className="text-xs text-zinc-500">Coming soon—use form for now</p>
                  </div>
                </div>

                {/* Socials */}
                <div className="space-y-2 pt-2">
                  <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
                    Follow first
                  </p>
                  <div className="flex gap-3">
                    {[
                      { icon: Instagram, label: "Instagram", href: "#" },
                      { icon: Youtube, label: "YouTube", href: "#" },
                      { icon: MessageSquare, label: "TikTok", href: "#" },
                    ].map((social, idx) => {
                      const Icon = social.icon;
                      return (
                        <a
                          key={idx}
                          href={social.href}
                          target="_blank"
                          rel="noreferrer"
                          className="p-3 rounded-lg border border-zinc-800 bg-zinc-900/50 hover:bg-zinc-800 hover:border-emerald-500/40 transition-all duration-200 text-zinc-400 hover:text-emerald-400"
                          title={social.label}
                        >
                          <Icon className="w-5 h-5" />
                        </a>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Contact form */}
            <div id="contact-form" className="lg:col-span-3 space-y-6">
              {/* Step indicator */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <p className="text-sm font-semibold text-zinc-300">
                    Step {step} of 4
                  </p>
                  <p className="text-xs text-zinc-500">{Math.round((step / 4) * 100)}%</p>
                </div>
                <div className="w-full h-2 rounded-full bg-zinc-800 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 transition-all duration-300"
                    style={{ width: `${(step / 4) * 100}%` }}
                  />
                </div>
              </div>

              {/* Form card */}
              <form
                onSubmit={handleSubmit}
                className="rounded-2xl border border-zinc-800/60 bg-gradient-to-br from-zinc-900/50 to-black/30 backdrop-blur-sm p-8 space-y-6"
              >
                {/* Success message */}
                {submitStatus.type === "success" && (
                  <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-4 flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-emerald-200">{submitStatus.message}</p>
                      <p className="text-sm text-emerald-300/80 mt-1">Jake will review your message within 24–48 hours.</p>
                    </div>
                  </div>
                )}

                {/* Error message */}
                {submitStatus.type === "error" && (
                  <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3">
                    <p className="font-semibold text-red-200">{submitStatus.message}</p>
                  </div>
                )}
                {/* STEP 1: Who you are */}
                {step === 1 && (
                  <div className="space-y-6 animate-in fade-in duration-300">
                    <h3 className="text-2xl font-bold">Who are you?</h3>

                    {/* Role toggle */}
                    <div className="space-y-3">
                      <label className="block text-sm font-semibold text-zinc-200">
                        Are you a player or a parent?
                      </label>
                      <div className="flex gap-3">
                        {[
                          { label: "I'm a player", value: "player" },
                          { label: "I'm a parent", value: "parent" },
                        ].map((opt) => (
                          <button
                            key={opt.value}
                            type="button"
                            onClick={() =>
                              setFormData({ ...formData, role: opt.value as UserRole })
                            }
                            className={`flex-1 px-4 py-3 rounded-lg font-medium transition-all duration-200 border ${
                              formData.role === opt.value
                                ? "bg-emerald-500/20 border-emerald-500/50 text-emerald-300"
                                : "bg-zinc-800 border-zinc-700 text-zinc-300 hover:border-zinc-600"
                            }`}
                          >
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Name */}
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-zinc-200">
                        Your name
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        placeholder="First and last name"
                        className="w-full px-4 py-3 rounded-lg bg-zinc-800/50 border border-zinc-700 text-zinc-50 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-zinc-200">
                        Email
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        placeholder="you@example.com"
                        className="w-full px-4 py-3 rounded-lg bg-zinc-800/50 border border-zinc-700 text-zinc-50 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                      />
                    </div>

                    {/* Location */}
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-zinc-200">
                        Location (city, state & time zone)
                      </label>
                      <input
                        type="text"
                        value={formData.location}
                        onChange={(e) =>
                          setFormData({ ...formData, location: e.target.value })
                        }
                        placeholder="e.g., Atlanta, GA (EST)"
                        className="w-full px-4 py-3 rounded-lg bg-zinc-800/50 border border-zinc-700 text-zinc-50 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                      />
                    </div>
                  </div>
                )}

                {/* STEP 2: Ball + training context */}
                {step === 2 && (
                  <div className="space-y-6 animate-in fade-in duration-300">
                    <h3 className="text-2xl font-bold">Your ball context</h3>

                    {/* Age + Level */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-zinc-200">
                          Age + Level
                        </label>
                        <select
                          value={formData.level}
                          onChange={(e) =>
                            setFormData({ ...formData, level: e.target.value })
                          }
                          className="w-full px-4 py-3 rounded-lg bg-zinc-800/50 border border-zinc-700 text-zinc-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                        >
                          <option value="">Select...</option>
                          <option value="youth">Youth (10–13)</option>
                          <option value="middle-school">Middle School (14–15)</option>
                          <option value="high-school">High School (16–18)</option>
                          <option value="college">College / D1</option>
                          <option value="adult">Adult / Rec</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-zinc-200">
                          Current Season
                        </label>
                        <select
                          value={formData.season}
                          onChange={(e) =>
                            setFormData({ ...formData, season: e.target.value })
                          }
                          className="w-full px-4 py-3 rounded-lg bg-zinc-800/50 border border-zinc-700 text-zinc-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                        >
                          <option value="">Select...</option>
                          <option value="off-season">Off-Season</option>
                          <option value="pre-season">Pre-Season</option>
                          <option value="in-season">In-Season</option>
                          <option value="tryout-prep">Tryout Prep</option>
                        </select>
                      </div>
                    </div>

                    {/* What do you want most */}
                    <div className="space-y-3">
                      <label className="block text-sm font-semibold text-zinc-200">
                        What do you want most from training?
                      </label>
                      <div className="space-y-2">
                        {[
                          "Jump higher",
                          "Get stronger / put on size",
                          "Stay fresh all season",
                          "Get ready for tryouts",
                          "Other",
                        ].map((option) => (
                          <label key={option} className="flex items-center gap-3 cursor-pointer">
                            <input
                              type="radio"
                              name="goal"
                              value={option}
                              checked={formData.goal === option}
                              onChange={(e) =>
                                setFormData({ ...formData, goal: e.target.value })
                              }
                              className="w-4 h-4 accent-emerald-500 cursor-pointer"
                            />
                            <span className="text-sm text-zinc-300">{option}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 3: Story */}
                {step === 3 && (
                  <div className="space-y-6 animate-in fade-in duration-300">
                    <h3 className="text-2xl font-bold">Tell Jake your story</h3>

                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-zinc-200">
                        What's going on with your game right now?
                      </label>
                      <p className="text-xs text-zinc-500">
                        E.g., Get tired late in games, struggle finishing through contact,
                        want to add muscle this off-season.
                      </p>
                      <textarea
                        value={formData.story}
                        onChange={(e) =>
                          setFormData({ ...formData, story: e.target.value })
                        }
                        placeholder="Tell Jake what's on your mind..."
                        rows={8}
                        className="w-full px-4 py-3 rounded-lg bg-zinc-800/50 border border-zinc-700 text-zinc-50 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 resize-none"
                      />
                    </div>
                  </div>
                )}

                {/* STEP 4: Contact preference */}
                {step === 4 && (
                  <div className="space-y-6 animate-in fade-in duration-300">
                    <h3 className="text-2xl font-bold">How do you want to start?</h3>

                    <div className="space-y-3">
                      {[
                        {
                          value: "email",
                          label: "Quick email with recommendations",
                          desc: "Jake sends a personal plan within 24–48 hours.",
                        },
                        {
                          value: "call",
                          label: "15–20 min call with Jake",
                          desc: "Schedule a time to chat directly about your game.",
                        },
                      ].map((option) => (
                        <label key={option.value} className="flex items-start gap-4 cursor-pointer">
                          <input
                            type="radio"
                            name="preference"
                            value={option.value}
                            checked={formData.preference === option.value}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                preference: e.target.value as ContactPreference,
                              })
                            }
                            className="w-5 h-5 accent-emerald-500 cursor-pointer mt-1 flex-shrink-0"
                          />
                          <div className="flex-1">
                            <p className="text-sm font-semibold text-zinc-200">
                              {option.label}
                            </p>
                            <p className="text-xs text-zinc-400">{option.desc}</p>
                          </div>
                        </label>
                      ))}
                    </div>

                    {/* Call times (if selected) */}
                    {formData.preference === "call" && (
                      <div className="space-y-2 pt-2">
                        <label className="block text-sm font-semibold text-zinc-200">
                          Preferred days/times for a call
                        </label>
                        <input
                          type="text"
                          value={formData.callTimes || ""}
                          onChange={(e) =>
                            setFormData({ ...formData, callTimes: e.target.value })
                          }
                          placeholder="e.g., Weekday mornings, Sat afternoons"
                          className="w-full px-4 py-3 rounded-lg bg-zinc-800/50 border border-zinc-700 text-zinc-50 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                        />
                      </div>
                    )}
                  </div>
                )}

                {/* Form navigation buttons */}
                <div className="flex gap-3 pt-6 border-t border-zinc-700">
                  {step > 1 && (
                    <button
                      type="button"
                      onClick={handleBack}
                      disabled={isSubmitting}
                      className="flex-1 px-4 py-3 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white font-semibold transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Back
                    </button>
                  )}
                  {step < 4 ? (
                    <button
                      type="button"
                      onClick={handleNext}
                      disabled={isSubmitting}
                      className="flex-1 px-4 py-3 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-black font-semibold transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={isSubmitting || submitStatus.type === "success"}
                      className="flex-1 px-4 py-3 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-black font-semibold transition-all duration-200 shadow-lg shadow-emerald-500/20 hover:scale-105 disabled:opacity-60 disabled:hover:scale-100 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Sending...
                        </>
                      ) : submitStatus.type === "success" ? (
                        <>
                          <CheckCircle2 className="w-4 h-4" />
                          Message Sent
                        </>
                      ) : (
                        "Send to Coach Jake"
                      )}
                    </button>
                  )}
                </div>

                {step === 4 && (
                  <p className="text-xs text-zinc-500 text-center">
                    You'll hear back within 24–48 hours with next steps.
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ===== WHAT JAKE DOES WITH YOUR MESSAGE ===== */}
      <section className="relative py-16 lg:py-20 border-t border-zinc-800/50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="rounded-2xl border border-zinc-800/60 bg-gradient-to-br from-zinc-900/50 to-black/30 backdrop-blur-sm p-8 lg:p-12 space-y-6">
            <h3 className="text-3xl font-bold">What Jake does with your message</h3>

            <div className="space-y-4 text-lg text-zinc-300">
              <p className="flex gap-3 items-start">
                <CheckCircle2 className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Jake reads every message himself.</strong> No filters, no
                  templated responses.
                </span>
              </p>

              <p className="flex gap-3 items-start">
                <CheckCircle2 className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>You'll get either:</strong> A recommended program based on your
                  situation, or an invite to a short call if we need more context.
                </span>
              </p>

              <p className="flex gap-3 items-start">
                <CheckCircle2 className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>No spam, no mailing list—</strong> only info about training
                  with Coach Jake.
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="relative py-16 lg:py-20 border-t border-zinc-800/50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 space-y-10">
          <div className="space-y-2">
            <h3 className="text-3xl font-bold">Real people, real results.</h3>
            <p className="text-lg text-zinc-400">What happened when they reached out.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testi, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-zinc-800/60 bg-gradient-to-br from-zinc-900/50 to-black/30 p-6 space-y-4 hover:border-emerald-500/20 transition-all duration-200"
              >
                <Quote className="w-6 h-6 text-emerald-400/50" />
                <p className="text-sm text-zinc-300 italic">"{testi.quote}"</p>
                <div className="pt-2 border-t border-zinc-800">
                  <p className="text-sm font-semibold text-zinc-100">{testi.name}</p>
                  <p className="text-xs text-zinc-500">{testi.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="relative py-16 lg:py-20 border-t border-zinc-800/50">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 space-y-8">
          <div className="space-y-2">
            <h3 className="text-3xl font-bold">Questions?</h3>
            <p className="text-lg text-zinc-400">Common ones answered below.</p>
          </div>

          <div className="space-y-3">
            {faqItems.map((item, idx) => (
              <div
                key={idx}
                className="rounded-lg border border-zinc-800/60 bg-gradient-to-br from-zinc-900/50 to-black/30 overflow-hidden"
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-zinc-800/30 transition-colors duration-200"
                >
                  <h4 className="text-sm font-semibold text-zinc-100 text-left">
                    {item.q}
                  </h4>
                  <ChevronDown
                    className={`w-5 h-5 text-zinc-500 flex-shrink-0 transition-transform duration-300 ${
                      expandedFaq === idx ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {expandedFaq === idx && (
                  <div className="px-6 py-4 bg-zinc-950/30 border-t border-zinc-800">
                    <p className="text-sm text-zinc-400">{item.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Spacer */}
      <div className="h-12" />
    </main>
  );
}
