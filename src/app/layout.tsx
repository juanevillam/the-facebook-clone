import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "The Facebook Clone",
  description:
    "A clone of Facebook's website built with Next.js and Tailwind CSS.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
