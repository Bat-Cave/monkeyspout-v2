import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Monkey Spout",
  description: "Welcome to Monkey Spout",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
