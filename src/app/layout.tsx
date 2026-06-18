import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Global3DBackground from "@/components/layout/Global3DBackground";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
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
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden bg-[#050816] text-[#f9fafb]`}
      >
        <Global3DBackground />
        {children}
      </body>
    </html>
  );
}


