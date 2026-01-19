import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "Deign Lazaro | Full-Stack Developer & AI Enthusiast",
  description: "Building modern web apps with Python, TypeScript & AI integrations. From concept to deployment—clean code, thoughtful design.",
  keywords: ["developer", "portfolio", "full-stack", "python", "typescript", "AI", "react", "nextjs", "software engineer"],
  authors: [{ name: "Deign Lazaro" }],
  openGraph: {
    title: "Deign Lazaro | Full-Stack Developer & AI Enthusiast",
    description: "Building modern web apps with Python, TypeScript & AI integrations. From concept to deployment—clean code, thoughtful design.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
