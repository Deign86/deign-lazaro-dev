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
  title: "Deign | Full-Stack Developer & Student",
  description: "Personal portfolio showcasing full-stack development projects with Python, TypeScript, and Flutter.",
  keywords: ["developer", "portfolio", "full-stack", "python", "typescript", "flutter", "react", "nextjs"],
  authors: [{ name: "Deign" }],
  openGraph: {
    title: "Deign | Full-Stack Developer & Student",
    description: "Personal portfolio showcasing full-stack development projects.",
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
