import type { Metadata } from "next";
import { Orbitron } from "next/font/google";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from "@vercel/analytics/next";
import MusicWrapper from "@/components/MusicWrapper"; // Client wrapper

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "MainakVerse",
  description: "The Multiverse of Mainak Chaudhuri",
  generator: "MainakVerse.app",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`font-sans ${GeistSans.variable} ${GeistMono.variable} ${orbitron.variable} antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
          <MusicWrapper />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
