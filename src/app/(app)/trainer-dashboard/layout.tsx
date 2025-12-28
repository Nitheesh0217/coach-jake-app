export default function TrainerDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Don't wrap trainer dashboard with AppHeader - it has its own layout
  return children;
}
