import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ExShip - Global Logistics & Shipping Platform",
  description: "ExShip - Your ultimate platform for seamless global shipping, courier tracking, and logistics management.",
  icons: {
    icon: '/ExShip logo-01.png',
    shortcut: '/ExShip logo-01.png',
    apple: '/ExShip logo-01.png',
  },
};

import { NavbarWrapper } from "@/components/layout/NavbarWrapper";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <NavbarWrapper />
        <main className="flex-1">
          {children}
        </main>
      </body>
    </html>
  );
}
