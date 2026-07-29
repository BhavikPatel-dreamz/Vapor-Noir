"use client";

import Link from "next/link";
import { Phone, Mail, MapPin, Heart, ShoppingBag, User, Gift, Star, ShieldCheck, Truck, Facebook, Twitter, Instagram, Youtube } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-8 border-t-4 border-[#FFC107] bg-[#1a1a2e] text-[#ccc]">
      {/* Main footer columns */}
      <div className="container-x py-12">
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          {/* About */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-[#1565C0] text-white font-black text-xl px-3 py-2 rounded-sm">
                V
              </div>
              <div>
                <div className="text-xl font-black text-white leading-tight">VAPOR</div>
                <div className="text-[10px] uppercase tracking-[0.15em] text-[#FFC107] font-bold">Online Vape Store</div>
              </div>
            </div>
            <p className="text-sm text-[#999] mb-4 max-w-sm">
              Your trusted online vape store. Premium disposables, pod kits, e-liquids, and accessories from the world&apos;s top brands. Fast, discreet shipping worldwide.
            </p>
            <div className="flex items-center gap-2 mb-8">
              <span className="flex items-center gap-1 text-xs text-[#FFC107] font-bold"><ShieldCheck className="size-3.5" /> 100% Authentic</span>
              <span className="text-[#444]">|</span>
              <span className="flex items-center gap-1 text-xs text-[#FFC107] font-bold"><Truck className="size-3.5" /> Free Ship $75+</span>
            </div>
            <div className="flex gap-2">
              <a href="#" className="bg-[#1565C0] p-2.5 hover:bg-[#0D47A1] transition-colors rounded-sm"><Facebook className="size-4 text-white" /></a>
              <a href="#" className="bg-[#1DA1F2] p-2.5 hover:opacity-80 transition-colors rounded-sm"><Twitter className="size-4 text-white" /></a>
              <a href="#" className="bg-[#E4405F] p-2.5 hover:opacity-80 transition-colors rounded-sm"><Instagram className="size-4 text-white" /></a>
              <a href="#" className="bg-[#FF0000] p-2.5 hover:opacity-80 transition-colors rounded-sm"><Youtube className="size-4 text-white" /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-[#FFC107] font-bold text-sm uppercase mb-4 border-b border-[#333] pb-2">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-[13px]">
              <li><Link href="/shop" className="hover:text-[#FFC107] transition-colors flex items-center gap-2"><ShoppingBag className="size-3 text-[#F57C00]" /> All Products</Link></li>
              <li><Link href="/shop?category=disposable-vape" className="hover:text-[#FFC107] transition-colors flex items-center gap-2"><Star className="size-3 text-[#F57C00]" /> Disposable Vapes</Link></li>
              <li><Link href="/shop?category=pod-kits" className="hover:text-[#FFC107] transition-colors flex items-center gap-2"><Star className="size-3 text-[#F57C00]" /> Pod Kits</Link></li>
              <li><Link href="/shop?category=e-liquids" className="hover:text-[#FFC107] transition-colors flex items-center gap-2"><Star className="size-3 text-[#F57C00]" /> E-Liquids</Link></li>
              <li><Link href="/shop?category=accessories" className="hover:text-[#FFC107] transition-colors flex items-center gap-2"><Star className="size-3 text-[#F57C00]" /> Accessories</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-[#FFC107] font-bold text-sm uppercase mb-4 border-b border-[#333] pb-2">
              Customer Service
            </h4>
            <ul className="space-y-2.5 text-[13px]">
              <li><Link href="/contact" className="hover:text-[#FFC107] transition-colors flex items-center gap-2"><User className="size-3 text-[#F57C00]" /> Contact Us</Link></li>
              <li><Link href="/about" className="hover:text-[#FFC107] transition-colors flex items-center gap-2"><ShieldCheck className="size-3 text-[#F57C00]" /> Shipping Info</Link></li>
              <li><Link href="/about" className="hover:text-[#FFC107] transition-colors flex items-center gap-2"><Gift className="size-3 text-[#F57C00]" /> Returns & Exchanges</Link></li>
              <li><Link href="/about" className="hover:text-[#FFC107] transition-colors flex items-center gap-2"><Heart className="size-3 text-[#F57C00]" /> Order Tracking</Link></li>
              <li><Link href="/about" className="hover:text-[#FFC107] transition-colors flex items-center gap-2"><ShoppingBag className="size-3 text-[#F57C00]" /> FAQ</Link></li>
            </ul>
          </div>

          {/* My Account */}
          <div>
            <h4 className="text-[#FFC107] font-bold text-sm uppercase mb-4 border-b border-[#333] pb-2">
              My Account
            </h4>
            <ul className="space-y-2.5 text-[13px]">
              <li><Link href="/contact" className="hover:text-[#FFC107] transition-colors flex items-center gap-2"><User className="size-3 text-[#F57C00]" /> My Account</Link></li>
              <li><Link href="/cart" className="hover:text-[#FFC107] transition-colors flex items-center gap-2"><ShoppingBag className="size-3 text-[#F57C00]" /> View Cart</Link></li>
              <li><Link href="/wishlist" className="hover:text-[#FFC107] transition-colors flex items-center gap-2"><Heart className="size-3 text-[#F57C00]" /> Wishlist</Link></li>
              <li><Link href="/checkout" className="hover:text-[#FFC107] transition-colors flex items-center gap-2"><ShieldCheck className="size-3 text-[#F57C00]" /> Checkout</Link></li>
            </ul>
          </div>
        </div>

        {/* Newsletter + Contact row */}
        <div className="mt-10 border-t border-[#333] pt-8">
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <h4 className="text-[#FFC107] font-bold text-sm uppercase mb-3">📧 Newsletter</h4>
              <p className="text-[13px] text-[#999] mb-3">Subscribe and get <span className="text-[#FFC107] font-bold">10% off</span> your first order!</p>
              <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-3 py-2.5 text-sm bg-[#222] border-2 border-[#444] text-white placeholder:text-[#666] focus:outline-none focus:border-[#FFC107]"
                />
                <button
                  type="submit"
                  className="bg-[#F57C00] text-white font-bold text-sm px-5 py-2.5 hover:bg-[#E65100] transition-colors border-b-2 border-[#E65100]"
                >
                  Subscribe
                </button>
              </form>
            </div>
            <div>
              <h4 className="text-[#FFC107] font-bold text-sm uppercase mb-3">📞 Contact Us</h4>
              <div className="space-y-2 text-[13px]">
                <div className="flex items-center gap-2.5">
                  <Phone className="size-3.5 shrink-0 text-[#F57C00]" />
                  <span>+45 80 82 01 90</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Mail className="size-3.5 shrink-0 text-[#F57C00]" />
                  <span>support@vapornoir.com</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <MapPin className="size-3.5 shrink-0 text-[#F57C00]" />
                  <span>Copenhagen, Denmark</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t-2 border-[#333] bg-[#111]">
        <div className="container-x py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#666]">
            <div>
              &copy; {new Date().getFullYear()} <span className="text-white font-bold">VAPOR</span> Store. All Rights Reserved.
            </div>
            <div className="flex items-center gap-4">
              <span className="text-[#999]">We accept:</span>
              <span className="bg-white/10 px-2 py-1 font-bold text-white/60">Visa</span>
              <span className="bg-white/10 px-2 py-1 font-bold text-white/60">MC</span>
              <span className="bg-white/10 px-2 py-1 font-bold text-white/60">PayPal</span>
              <span className="bg-white/10 px-2 py-1 font-bold text-white/60">Crypto</span>
            </div>
          </div>
          <div className="mt-3 text-[10px] text-center uppercase tracking-wider text-[#555] font-bold">
            ⚠️ WARNING: This product contains nicotine. Nicotine is an addictive chemical.
          </div>
        </div>
      </div>
    </footer>
  );
}
