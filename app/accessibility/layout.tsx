export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="max-w-screen-md mx-auto my-8">{children}</div>;
}
