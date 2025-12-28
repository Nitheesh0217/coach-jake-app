export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Don't wrap dashboard with AppHeader - it has its own layout
  return children;
}
