import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { AnnouncementBar } from "@/components/layout/announcement-bar";
import { AgeGate } from "@/components/layout/age-gate";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  metadataBase: new URL("https://vapornoir.example"),
  title: {
    default: "Vapor Store — #1 Online Vape Store | Disposables, Pod Kits & E-Liquids",
    template: "%s · Vapor Store",
  },
  description:
    "🔥 Shop 500+ premium vape products at Vapor Store. Free shipping over $75. Best prices guaranteed on disposables, pod kits, e-liquids & accessories. 30-day returns.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-muted text-foreground">
        <AgeGate />
        <AnnouncementBar />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
