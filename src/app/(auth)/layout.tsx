export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#040814] text-zinc-50">
      <div
        className="fixed inset-0 -z-30 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/hero.jpg')" }}
        aria-hidden
      />

      <div className="fixed inset-0 -z-20 bg-[#030711]/80" aria-hidden />

      <div
        className="fixed inset-0 -z-10 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 46% 50%, rgba(16,185,129,0.32) 0%, rgba(16,185,129,0.08) 20%, rgba(4,8,20,0.05) 45%, rgba(3,7,17,0.88) 80%)",
        }}
        aria-hidden
      />

      <main className="relative z-10 min-h-screen">{children}</main>
    </div>
  );
}
