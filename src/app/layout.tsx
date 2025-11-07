import type { Metadata } from "next";
import { Inter, Orbitron, Bungee, Righteous } from "next/font/google";
import "./globals.css";
import { ClientLayout } from "@/components/client-layout";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
});

const bungee = Bungee({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-bungee",
});

const righteous = Righteous({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-righteous",
});

// Note: Exo_2 and Fredoka_One may need different import names
// Using fallback fonts for now

export const metadata: Metadata = {
  title: "TrustNet - AI-Powered Phishing Detection",
  description: "Privacy-first phishing scanner that runs in your browser. Detect phishing emails, URLs, and fake websites with real-time AI analysis.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${orbitron.variable} ${bungee.variable} ${righteous.variable} font-sans antialiased`}>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
