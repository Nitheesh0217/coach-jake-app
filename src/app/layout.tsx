import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google";
import Global3DBackground from "@/components/sections/layout/Global3DBackground";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Coach Jake — Basketball Performance Coaching",
  description:
    "Elite strength, conditioning, and skill training for serious basketball players",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#10b981",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable}`}>
      <body
        className="antialiased overflow-x-hidden bg-[#050816] text-[#f9fafb]"
      >
        <Global3DBackground />
        <div className="relative z-10 min-h-screen bg-transparent">
          {children}
        </div>
      </body>
    </html>
  );
}


