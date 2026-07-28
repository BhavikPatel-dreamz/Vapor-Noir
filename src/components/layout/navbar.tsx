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
  Sparkles,
  Flame,
  ShieldCheck,
  Zap,
  BookOpen,
  User,
  SlidersHorizontal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/store/cart-store";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { motion, AnimatePresence } from "framer-motion";

const categoriesMenu = [
  {
    name: "Spoons",
    href: "/shop?category=spoons",
    desc: "Handcrafted glass spoon pipes & dry herb pieces",
    tag: "Popular",
    items: [
      { name: "Eyce ORAFLEX Switchback Spoon", href: "/product/eyce-oraflex-switchback-spoon-d2c33a", sub: "Silicone Spoon • €24" },
      { name: "Eyce ProTeck Alien Spoon", href: "/product/eyce-alien-d2c33a", sub: "Alien Glass Spoon • €28" },
    ],
  },
  {
    name: "Bubblers & Rigs",
    href: "/shop?category=bubblers-rigs",
    desc: "Water-filtered rigs & precision desktop units",
    tag: "Premium",
    items: [
      { name: "Free Quartz Banger with Rig Bundle", href: "/product/free-quartz-banger-with-rig-bundle-d2c33a", sub: "Rig Bundle • €46" },
      { name: "Eyce Titanium Slide with Poker", href: "/product/eyce-titanium-flower-bowl-with-poker-d2c33a", sub: "Titanium Slide • €21" },
    ],
  },
  {
    name: "Bundles",
    href: "/shop?category=bundles",
    desc: "Curated collector bundles & starter suites",
    tag: "Save 25%",
    items: [
      { name: "Mini Collector Bundle: Eyce Shorty", href: "/product/eyce-shorty-titanium-straw-mini-collector-bundle-d2c33a", sub: "Mini Collector Set • €35" },
      { name: "Free Quartz Banger Rig Set", href: "/product/free-quartz-banger-with-rig-bundle-d2c33a", sub: "Complete Rig Set • €46" },
    ],
  },
  {
    name: "Accessories & Apparel",
    href: "/shop?category=accessories",
    desc: "Replacement bowls, quartz nozzles & apparel",
    items: [
      { name: "Oraflex Sherlock XL Bowl Replacement", href: "/product/oraflex-large-bowl-d2c33a", sub: "XL Replacement Bowl • €9" },
      { name: "Men's Surf Rash Guard", href: "/product/mens-rash-guard-d2c33a", sub: "Apparel Gear • €39" },
    ],
  },
];

export function Navbar() {
  const count = useCart((s) => s.items.reduce((a, i) => a + i.quantity, 0));
  const openCart = useCart((s) => s.open);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [shopMegaOpen, setShopMegaOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur-2xl">
        <div className="container-x flex h-16 items-center justify-between gap-8 md:h-20">
          <div className="flex items-center gap-10">
            {/* Brand Logo */}
            <Link href="/" className="group flex items-center gap-3 font-display text-xl tracking-tight md:text-2xl">
              <div className="relative size-9 overflow-hidden rounded-xl shadow-md shadow-primary/10 transition-transform duration-300 group-hover:scale-105">
                <img
                  src="/logo.svg"
                  alt="Vapor Noir Logo"
                  className="size-full object-cover"
                />
              </div>
              <span className="font-display font-medium tracking-tight">
                Vapor <span className="text-primary group-hover:underline">Noir</span>
              </span>
            </Link>

            {/* Desktop Navigation with Mega Menu */}
            <nav className="hidden items-center gap-1 lg:flex">
              {/* Shop Mega Menu Trigger */}
              <div
                className="relative"
                onMouseEnter={() => setShopMegaOpen(true)}
                onMouseLeave={() => setShopMegaOpen(false)}
              >
                <Link
                  href="/shop"
                  className="flex items-center gap-1 rounded-md px-3.5 py-2 text-sm font-medium text-foreground/90 transition-colors hover:bg-muted hover:text-foreground"
                >
                  Shop Catalog
                  <ChevronDown className={`size-4 text-muted-foreground transition-transform duration-200 ${shopMegaOpen ? "rotate-180 text-primary" : ""}`} />
                </Link>

                {/* Mega Menu Dropdown */}
                <AnimatePresence>
                  {shopMegaOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.98 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 w-[780px] rounded-2xl border border-border bg-card/95 p-6 shadow-2xl backdrop-blur-xl"
                    >
                      <div className="grid grid-cols-4 gap-6">
                        {categoriesMenu.map((cat) => (
                          <div key={cat.name} className="flex flex-col">
                            <Link
                              href={cat.href}
                              className="group/title flex items-center justify-between border-b border-border/60 pb-2 text-xs font-semibold uppercase tracking-wider text-foreground hover:text-primary"
                            >
                              <span>{cat.name}</span>
                              {cat.tag && (
                                <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[9px] text-primary font-normal">
                                  {cat.tag}
                                </span>
                              )}
                            </Link>
                            <p className="mt-1.5 text-[11px] text-muted-foreground line-clamp-2 leading-relaxed">
                              {cat.desc}
                            </p>
                            <div className="mt-3 space-y-2">
                              {cat.items.map((item) => (
                                <Link
                                  key={item.name}
                                  href={item.href}
                                  className="block rounded-lg p-1.5 transition-colors hover:bg-muted/60"
                                >
                                  <div className="text-xs font-medium text-foreground group-hover:text-primary">
                                    {item.name}
                                  </div>
                                  <div className="text-[10px] text-muted-foreground">
                                    {item.sub}
                                  </div>
                                </Link>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Mega Menu Footer Ribbon */}
                      <div className="mt-6 flex items-center justify-between rounded-xl border border-border/60 bg-muted/30 p-3.5 text-xs">
                        <div className="flex items-center gap-4 text-muted-foreground">
                          <span className="flex items-center gap-1 text-foreground font-medium">
                            <Sparkles className="size-3.5 text-primary" /> Free EU & US Shipping over $75
                          </span>
                          <span className="hidden sm:inline">•</span>
                          <span className="hidden sm:inline">30-Day Money Back Guarantee</span>
                        </div>
                        <Link href="/shop" className="font-medium text-primary hover:underline">
                          View All Products →
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link
                href="/shop?category=spoons"
                className="rounded-md px-3.5 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-muted hover:text-foreground"
              >
                Spoons
              </Link>
              <Link
                href="/shop?category=bubblers-rigs"
                className="rounded-md px-3.5 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-muted hover:text-foreground"
              >
                Bubblers & Rigs
              </Link>
              <Link
                href="/shop?category=bundles"
                className="rounded-md px-3.5 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-muted hover:text-foreground"
              >
                Bundles
              </Link>
              <Link
                href="/about"
                className="rounded-md px-3.5 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-muted hover:text-foreground"
              >
                Craftsmanship
              </Link>
            </nav>
          </div>

          {/* Right Header Controls */}
          <div className="flex items-center gap-1.5">
            <Link href="/search">
              <Button variant="ghost" size="icon" aria-label="Search" className="hover:bg-muted">
                <Search className="size-5" />
              </Button>
            </Link>

            <Link href="/wishlist">
              <Button variant="ghost" size="icon" aria-label="Wishlist" className="hover:bg-muted relative">
                <Heart className="size-5" />
              </Button>
            </Link>

            <Link href="/contact" className="hidden md:inline-flex">
              <Button variant="ghost" size="icon" aria-label="Account" className="hover:bg-muted">
                <User className="size-5" />
              </Button>
            </Link>

            <Button
              variant="ghost"
              size="icon"
              aria-label="Cart"
              onClick={openCart}
              className="relative hover:bg-muted"
            >
              <ShoppingBag className="size-5" />
              {count > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground shadow">
                  {count}
                </span>
              )}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              aria-label="Menu"
              onClick={() => setMobileOpen(true)}
              className="lg:hidden"
            >
              <Menu className="size-6" />
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-50 flex flex-col bg-background lg:hidden"
          >
            <div className="container-x flex h-16 items-center justify-between border-b border-border">
              <Link href="/" onClick={() => setMobileOpen(false)} className="font-display text-xl">
                Vapor <span className="text-primary">Noir</span>
              </Link>
              <Button variant="ghost" size="icon" onClick={() => setMobileOpen(false)}>
                <X className="size-6" />
              </Button>
            </div>
            <nav className="container-x flex-1 overflow-y-auto py-6 space-y-6">
              <div>
                <div className="mb-2 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  Categories
                </div>
                <div className="space-y-1">
                  {categoriesMenu.map((cat) => (
                    <Link
                      key={cat.name}
                      href={cat.href}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center justify-between border-b border-border/40 py-3 font-display text-xl"
                    >
                      <span>{cat.name}</span>
                      <span className="text-xs text-muted-foreground font-sans">{cat.items.length} items</span>
                    </Link>
                  ))}
                </div>
              </div>

              <div>
                <div className="mb-2 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  Navigation
                </div>
                <div className="space-y-1">
                  <Link
                    href="/about"
                    onClick={() => setMobileOpen(false)}
                    className="block border-b border-border/40 py-3 font-display text-xl"
                  >
                    Our Story & Craft
                  </Link>
                  <Link
                    href="/contact"
                    onClick={() => setMobileOpen(false)}
                    className="block border-b border-border/40 py-3 font-display text-xl"
                  >
                    Contact & Stores
                  </Link>
                  <Link
                    href="/wishlist"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-2 border-b border-border/40 py-3 font-display text-xl"
                  >
                    <Heart className="size-5" /> Saved Wishlist
                  </Link>
                </div>
              </div>
            </nav>

            <div className="border-t border-border p-6 bg-card">
              <div className="text-xs text-muted-foreground">
                Need help? Call +45 80 82 01 90 or email support@vapornoir.com
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <CartDrawer />
    </>
  );
}
