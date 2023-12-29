export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-screen-md mx-auto my-4 p-8 rounded-xl bg-white dark:bg-inherit">
      {children}
    </div>
  );
}
