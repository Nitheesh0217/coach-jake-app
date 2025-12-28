"use client";

import { Suspense } from "react";
import LoginForm from "./login-form";

export default function LoginPage() {
  return (
    <Suspense fallback={<LoginPageSkeleton />}>
      <LoginForm />
    </Suspense>
  );
}

function LoginPageSkeleton() {
  return (
    <section className="min-h-screen py-16 sm:py-20 lg:py-24">
      <div className="max-w-5xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="space-y-6 lg:pr-4">
            <div className="h-4 bg-zinc-800 rounded w-48 animate-pulse"></div>
            <div className="space-y-4">
              <div className="h-8 bg-zinc-800 rounded w-64 animate-pulse"></div>
              <div className="h-5 bg-zinc-800 rounded w-80 animate-pulse"></div>
            </div>
          </div>
          <div className="w-full">
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-6 sm:p-8 space-y-4">
              <div className="h-6 bg-zinc-800 rounded w-40 animate-pulse"></div>
              <div className="h-10 bg-zinc-800 rounded animate-pulse"></div>
              <div className="h-10 bg-zinc-800 rounded animate-pulse"></div>
              <div className="h-10 bg-zinc-800 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
