import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = "https://deign-lazaro-dev.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Deign Lazaro | Full-Stack Developer & AI Enthusiast",
  description: "Building modern web apps with Python, TypeScript & AI integrations. From concept to deployment—clean code, thoughtful design.",
  keywords: ["developer", "portfolio", "full-stack", "python", "typescript", "AI", "react", "nextjs", "software engineer"],
  authors: [{ name: "Deign Lazaro" }],
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Deign Lazaro | Full-Stack Developer & AI Enthusiast",
    description: "Building modern web apps with Python, TypeScript & AI integrations. From concept to deployment—clean code, thoughtful design.",
    url: "/",
    type: "website",
    images: [
      {
        url: "/preview/portfolio-hero.png",
        width: 1280,
        height: 800,
        alt: "Smooth-scroll tour of the Deign Lazaro portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Deign Lazaro | Full-Stack Developer & AI Enthusiast",
    description: "Building modern web apps with Python, TypeScript & AI integrations. From concept to deployment—clean code, thoughtful design.",
    images: ["/preview/portfolio-hero.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
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
        {/* Skip to main content link for keyboard accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-mono-950 focus:text-mono-50 focus:rounded-lg focus:outline-none focus:ring-2 focus:ring-mono-50"
        >
          Skip to main content
        </a>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
