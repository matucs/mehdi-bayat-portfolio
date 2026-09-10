import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { themeInitScript } from "@/components/ThemeToggle";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Set NEXT_PUBLIC_SITE_URL to the real production domain once deployed
// (e.g. as a Vercel project environment variable) — falls back to the
// Vercel preview/production URL Vercel provides automatically.
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");
const title = "Mehdi Bayat — Senior Full-Stack Engineer | Distributed Systems | Cloud | AI";
const description =
  "Senior Full-Stack Engineer building real-time, distributed systems. Case study: LivePulse — an event-driven sports data platform on Kafka, Redis, and PostgreSQL.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: "%s — Mehdi Bayat",
  },
  description,
  keywords: [
    "Mehdi Bayat",
    "Senior Full-Stack Engineer",
    "Distributed Systems",
    "Cloud Engineer",
    "AI Engineer",
    "LivePulse",
  ],
  authors: [{ name: "Mehdi Bayat" }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: siteUrl,
    title,
    description,
    siteName: "Mehdi Bayat",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-full flex flex-col">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-foreground"
        >
          Skip to content
        </a>
        <Navigation />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
