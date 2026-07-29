"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Heart,
  Menu,
  Search,
  ShoppingBag,
  X,
  ChevronDown,
  User,
  Phone,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/store/cart-store";
import { CartDrawer } from "@/components/cart/cart-drawer";

const navLinks = [
  { name: "Home", href: "/" },
  {
    name: "Products",
    href: "/shop",
    dropdown: [
      { name: "All Products", href: "/shop" },
      { name: "Disposable Vape", href: "/shop?category=disposable-vape" },
      { name: "Pod Kits", href: "/shop?category=pod-kits" },
      { name: "E-Liquids", href: "/shop?category=e-liquids" },
      { name: "Accessories", href: "/shop?category=accessories" },
    ],
  },
  { name: "Disposable Vape", href: "/shop?category=disposable-vape" },
  { name: "Pod Kits", href: "/shop?category=pod-kits" },
  { name: "E-Liquids", href: "/shop?category=e-liquids" },
  { name: "Accessories", href: "/shop?category=accessories" },
  { name: "Brands", href: "/shop" },
  { name: "Offers", href: "/shop?category=offers" },
  { name: "Contact", href: "/contact" },
];

export function Navbar() {
  const count = useCart((s) => s.items.reduce((a, i) => a + i.quantity, 0));
  const openCart = useCart((s) => s.open);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/shop?q=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  return (
    <>
      {/* Level 1: Announcement inside header */}
      <div className="bg-[#1565C0] text-white text-[11px] text-center py-1.5 font-bold tracking-wide">
        <span className="text-[#FFC107]">⚡</span> FREE SHIPPING ON ORDERS OVER $75 &nbsp;|&nbsp;{" "}
        <span className="text-[#FFC107]">📦</span> 30-DAY RETURNS &nbsp;|&nbsp;{" "}
        <span className="text-[#FFC107]">🛡️</span> BEST PRICE GUARANTEE
      </div>

      {/* Level 2: Logo + Search + Cart */}
      <div className="bg-white border-b-2 border-[#1565C0]">
        <div className="container-x flex h-22 items-center justify-between gap-6 py-3">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 shrink-0">
            <div className="bg-[#1565C0] text-white font-black text-xl px-3 py-2 rounded-sm">
              V
            </div>
            <div>
              <div className="text-xl font-black text-[#1565C0] leading-tight tracking-tight">VAPOR</div>
              <div className="text-[10px] uppercase tracking-[0.15em] text-[#D32F2F] font-bold leading-tight">Online Vape Store</div>
            </div>
          </Link>

          {/* Search */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-xl">
            <div className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full h-12 rounded-sm border-2 border-[#1565C0] bg-white pl-4 pr-14 text-sm text-foreground focus:outline-none focus:border-[#D32F2F]"
              />
              <button
                type="submit"
                className="absolute right-0 top-0 h-full px-5 bg-[#1565C0] text-white font-bold text-sm hover:bg-[#0D47A1] transition-colors flex items-center gap-1.5"
              >
                <Search className="size-4" />
                Search
              </button>
            </div>
          </form>

          {/* Right: Cart + Contact */}
          <div className="flex items-center gap-3">
            <div className="hidden lg:flex flex-col items-end text-xs border-r-2 border-[#1565C0] pr-4">
              <span className="text-muted-foreground">Call us toll-free</span>
              <span className="font-bold text-[#1565C0]">+45 80 82 01 90</span>
            </div>

            <Link
              href="/wishlist"
              className="hidden sm:flex flex-col items-center gap-0.5 text-muted-foreground hover:text-[#D32F2F] transition-colors"
            >
              <Heart className="size-5" />
              <span className="text-[10px] font-bold">Wishlist</span>
            </Link>

            <button
              onClick={openCart}
              className="relative flex items-center gap-2.5 bg-[#F57C00] text-white px-5 py-3 rounded-sm hover:bg-[#E65100] transition-colors shadow-sm"
            >
              <ShoppingBag className="size-5" />
              <span className="hidden sm:block text-sm font-bold">Cart</span>
              {count > 0 && (
                <span className="absolute -top-2.5 -right-2.5 flex h-6 min-w-6 items-center justify-center rounded-full bg-[#D32F2F] text-xs font-bold text-white shadow-md border-2 border-white">
                  {count}
                </span>
              )}
            </button>

            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-2 text-foreground hover:text-[#1565C0]"
            >
              <Menu className="size-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Level 3: Navigation */}
      <div className="hidden lg:block bg-[#1565C0] border-t-2 border-[#0D47A1] shadow-md">
        <div className="container-x">
          <nav className="flex">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="relative group px-5 py-3.5 text-[13px] font-bold text-white hover:bg-[#0D47A1] transition-colors uppercase tracking-wide border-r border-[#1565C0]/40 last:border-r-0"
              >
                {link.name}
                {link.dropdown && <ChevronDown className="inline size-3.5 ml-1" />}
                {link.dropdown && (
                  <div className="absolute top-full left-0 min-w-[220px] bg-white border-2 border-[#1565C0] shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 z-50">
                    <div className="py-1">
                      {link.dropdown.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className="block px-4 py-2.5 text-sm text-foreground hover:bg-[#E3F2FD] hover:text-[#1565C0] font-medium"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </Link>
            ))}
            <div className="ml-auto flex items-center px-4 py-3.5 bg-[#D32F2F] text-white text-xs font-bold uppercase tracking-wide">
              <Zap className="size-4 mr-1.5 text-[#FFC107]" /> Hot Deals
            </div>
          </nav>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/60" onClick={() => setMobileOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-[300px] max-w-[85vw] bg-white shadow-xl">
            <div className="flex items-center justify-between border-b-2 border-[#1565C0] px-4 py-4">
              <span className="font-black text-[#1565C0] text-lg">VAPOR</span>
              <button onClick={() => setMobileOpen(false)} className="p-1">
                <X className="size-6" />
              </button>
            </div>
            <nav className="overflow-y-auto h-full pb-20">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-3.5 text-sm text-foreground hover:bg-[#E3F2FD] hover:text-[#1565C0] font-medium border-b border-border"
                >
                  {link.name}
                </Link>
              ))}
              <div className="border-t-2 border-border mt-4 pt-4 px-4">
                <form onSubmit={handleSearch} className="mb-4">
                  <div className="relative">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search..."
                      className="w-full h-11 rounded-sm border-2 border-[#1565C0] bg-white pl-3 pr-12 text-sm"
                    />
                    <button type="submit" className="absolute right-0 top-0 h-full px-4 bg-[#1565C0] text-white font-bold rounded-r-sm">
                      <Search className="size-4" />
                    </button>
                  </div>
                </form>
                <Link href="/wishlist" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 py-2.5 text-sm hover:text-[#D32F2F]">
                  <Heart className="size-4" /> Wishlist
                </Link>
                <Link href="/contact" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 py-2.5 text-sm hover:text-[#1565C0]">
                  <User className="size-4" /> My Account
                </Link>
              </div>
            </nav>
          </div>
        </div>
      )}

      <CartDrawer />
    </>
  );
}
