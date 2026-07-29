"use client";

import { Phone, Mail, Truck, Heart, User, LogIn } from "lucide-react";
import Link from "next/link";

export function AnnouncementBar() {
  return (
    <div className="bg-[#D32F2F] text-white text-[12px]">
      <div className="container-x flex h-9 items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5">
            <Phone className="size-3" /> +45 80 82 01 90
          </span>
          <span className="hidden sm:flex items-center gap-1.5">
            <Mail className="size-3" /> support@vapornoir.com
          </span>
          <span className="hidden md:flex items-center gap-1.5 text-[#FFC107] font-bold">
            <Truck className="size-3" /> FREE Shipping Over $75
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden sm:inline text-[#FFC107] font-bold">🔥 Today&apos;s Deals</span>
          <span className="text-white/40 hidden sm:inline">|</span>
          <Link href="/wishlist" className="flex items-center gap-1 hover:text-[#FFC107] transition-colors">
            <Heart className="size-3" /> Wishlist
          </Link>
          <span className="text-white/40">|</span>
          <Link href="/contact" className="flex items-center gap-1 hover:text-[#FFC107] transition-colors">
            <User className="size-3" /> Login
          </Link>
          <span className="text-white/40">|</span>
          <Link href="/contact" className="hover:text-[#FFC107] transition-colors">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}
