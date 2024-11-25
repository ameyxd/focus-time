/**
 * Focus Time App - Main Layout
 * Author: [Your Name]
 * Created: [Date]
 * 
 * This is the root layout component that wraps all pages
 * and provides the basic app structure and theme setup.
 */

/* eslint-disable react/no-unescaped-entities */

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Focus Time",
  description: "A minimal pomodoro and focus app",
  suppressHydrationWarning: true,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <main className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 p-4 md:p-8">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
} 