"use client";

import { useState, useEffect } from "react";
import { Truck, ShieldCheck, Sparkles, MapPin, Phone, HelpCircle } from "lucide-react";
import Link from "next/link";

const announcements = [
  { icon: Truck, text: "Complimentary Express Shipping on Orders Over $75" },
  { icon: ShieldCheck, text: "Complimentary 3-Year Warranty & 30-Day In-Home Trial" },
  { icon: Sparkles, text: "New Release: Atelier Oak-Aged Reserve 2026 Batch Now Live" },
];

export function AnnouncementBar() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % announcements.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const CurrentIcon = announcements[index].icon;

  return (
    <div className="border-b border-border/80 bg-black/40 text-xs">
      <div className="container-x flex h-9 items-center justify-between">
        {/* Left: Quick store info */}
        <div className="hidden items-center gap-5 text-muted-foreground md:flex text-[11px]">
          <span className="flex items-center gap-1.5 hover:text-foreground transition-colors cursor-pointer">
            <MapPin className="size-3 text-primary" /> Store Locator (Copenhagen & London)
          </span>
          <span className="h-3 w-px bg-border" />
          <span className="flex items-center gap-1.5 hover:text-foreground transition-colors">
            <Phone className="size-3 text-primary" /> +45 80 82 01 90 (24/7 Support)
          </span>
        </div>

        {/* Center: Revolving Ticker */}
        <div className="mx-auto md:mx-0 flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.18em] text-foreground/90">
          <CurrentIcon className="size-3.5 text-primary shrink-0" />
          <span key={index} className="animate-slide-up">{announcements[index].text}</span>
        </div>

        {/* Right: Currency / Region / Support links */}
        <div className="hidden items-center gap-4 text-[11px] text-muted-foreground md:flex">
          <Link href="/contact" className="flex items-center gap-1 hover:text-primary transition-colors">
            <HelpCircle className="size-3" /> Help & Support
          </Link>
          <span className="h-3 w-px bg-border" />
          <div className="flex items-center gap-1 font-mono font-medium text-foreground">
            <span className="size-1.5 rounded-full bg-emerald-500" /> EUR (€) / EN
          </div>
        </div>
      </div>
    </div>
  );
}
