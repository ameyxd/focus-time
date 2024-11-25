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
import { Martian_Mono } from 'next/font/google'

// For quick switch to JetBrains Mono, uncomment the line below and comment out Martian_Mono
// import { JetBrains_Mono } from 'next/font/google'

const martianMono = Martian_Mono({ 
  subsets: ['latin'],
  // Remove the line below if you want all weights
  weight: ['400', '500', '600', '700'],
})

// Quick switch to JetBrains Mono:
// const jetbrainsMono = JetBrains_Mono({ 
//   subsets: ['latin'],
//   weight: ['400', '500', '600', '700'],
// })

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
      <body className={martianMono.className} suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <main className="min-h-screen bg-gray-50/80 dark:bg-slate-900 p-4 md:p-8">
            {children}
            <footer className="fixed bottom-4 w-full text-center text-sm text-gray-500 dark:text-gray-400 space-y-1">
              <div>
                Engineered out of 🙄 by Amey Ambade in Houston 
                <span className="inline-block w-2 h-2 bg-green-500 rounded-full ml-1 animate-pulse" />
              </div>
              <div>© 2024 Focus App</div>
            </footer>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
} 