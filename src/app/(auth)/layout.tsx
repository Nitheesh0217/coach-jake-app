import PublicHeader from "@/components/layout/PublicHeader";
import PublicFooter from "@/components/layout/PublicFooter";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-transparent text-[#f9fafb] flex flex-col relative">
      {/* Background image layer */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat -z-20"
        style={{ backgroundImage: "url('/hero.jpg')" }}
        aria-hidden
      />

      {/* Dark overlay */}
      <div
        className="fixed inset-0 bg-black pointer-events-none -z-10"
        style={{ opacity: 0.25 }}
        aria-hidden
      />

      <PublicHeader />
      <main className="flex-1 relative z-0">
        {children}
      </main>
      <PublicFooter />
    </div>
  );
}
