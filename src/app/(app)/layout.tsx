import AppHeader from "@/components/layout/AppHeader";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AppHeader />
      <main className="py-6 px-4 max-w-7xl mx-auto">{children}</main>
    </>
  );
}
