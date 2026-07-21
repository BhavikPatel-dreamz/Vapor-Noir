import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { AnnouncementBar } from "@/components/layout/announcement-bar";
import { AgeGate } from "@/components/layout/age-gate";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://vapornoir.example"),
  title: {
    default: "Vapor Noir — Premium Vaporizers & Accessories",
    template: "%s · Vapor Noir",
  },
  description:
    "Craft-engineered vaporizers, curated e-liquids and accessories. Designed for the discerning enthusiast.",
  openGraph: {
    title: "Vapor Noir — Premium Vaporizers",
    description: "Craft-engineered vaporizers and accessories.",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} dark`}>
      <body className="min-h-screen bg-background text-foreground antialiased">
        <AgeGate />
        <AnnouncementBar />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
