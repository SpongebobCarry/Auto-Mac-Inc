
// This RootLayout is intentionally minimal.
// The main layout with <html>, <body>, and providers is in `src/app/[locale]/layout.tsx`.
// This setup is required by next-intl to correctly handle internationalized routing.
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
