// Minimal root layout — the real layout lives in [locale]/layout.tsx.
// This exists because Next.js requires a root layout at src/app/layout.tsx.
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
