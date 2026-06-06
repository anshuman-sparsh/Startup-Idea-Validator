import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Startup Idea Validator AI | Professional Investor-Grade Analysis",
  description: "Validate your startup idea in seconds using advanced AI evaluation. Analyze market sizing, target customer profiles, competitor weaknesses, and MVP milestones instantly.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={`${outfit.variable} ${inter.variable} min-h-screen bg-black text-slate-100 flex flex-col antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
