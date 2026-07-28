"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Package, Truck, Shield, Sparkles, Grid3X3, LayoutList } from "lucide-react";
import { ProductCard } from "@/components/product/product-card";
import { ShopToolbar } from "@/components/shop/shop-toolbar";
import type { Category, Collection, Product } from "@/types/product";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type Params = Record<string, string | undefined>;

function buildHref(sp: Params, overrides: Params = {}) {
  const merged = { ...sp, ...overrides };
  const params = new URLSearchParams();
  if (merged.category) params.set("category", merged.category);
  if (merged.collection) params.set("collection", merged.collection);
  if (merged.sort) params.set("sort", merged.sort);
  if (merged.q) params.set("q", merged.q);
  if (merged.minPrice) params.set("minPrice", merged.minPrice);
  if (merged.maxPrice) params.set("maxPrice", merged.maxPrice);
  if (merged.inStock === "1") params.set("inStock", "1");
  if (merged.onSale === "1") params.set("onSale", "1");
  const p = Number(merged.page) || 1;
  if (p > 1) params.set("page", String(p));
  const qs = params.toString();
  return `/shop${qs ? `?${qs}` : ""}`;
}

interface ShopPageContentProps {
  cats: Category[];
  collections: Collection[];
  sp: Params;
  priceMin: number;
  priceMax: number;
  products: Product[];
  filtered: Product[];
  page: number;
  totalPages: number;
  active: string | undefined;
}

export function ShopPageContent({
  cats,
  collections,
  sp,
  priceMin,
  priceMax,
  products,
  filtered,
  page,
  totalPages,
  active,
}: ShopPageContentProps) {
  const headerRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const paginationRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headerRef.current) {
        const items = Array.from(headerRef.current!.children);
        gsap.set(items, { y: 30, opacity: 0 });
        gsap.to(items, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.12,
        });
      }

      if (statsRef.current) {
        const items = Array.from(statsRef.current!.children);
        gsap.set(items, { y: 15, opacity: 0 });
        gsap.to(items, {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: "power3.out",
          stagger: 0.06,
          delay: 0.5,
        });
      }
    });

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const el = gridRef.current;
    if (!el || products.length === 0) return;

    const children = Array.from(el.children);

    gsap.set(children, { y: 40, opacity: 0, scale: 0.97 });

    const tween = gsap.to(children, {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 0.6,
      ease: "power3.out",
      stagger: {
        each: 0.06,
        from: "start",
      },
      scrollTrigger: {
        trigger: el,
        start: "top 88%",
        once: true,
      },
    });

    return () => {
      tween.kill();
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === el) st.kill();
      });
    };
  }, [products]);

  useEffect(() => {
    if (!paginationRef.current) return;
    const el = paginationRef.current;

    gsap.set(el, { y: 20, opacity: 0 });
    const tween = gsap.to(el, {
      y: 0,
      opacity: 1,
      duration: 0.6,
      ease: "power3.out",
      scrollTrigger: {
        trigger: el,
        start: "top 95%",
        once: true,
      },
    });

    return () => {
      tween.kill();
    };
  }, [totalPages]);

  const stats = [
    { icon: Package, label: "Products", value: filtered.length },
    { icon: Truck, label: "Free Shipping", value: "$75+" },
    { icon: Shield, label: "Warranty", value: "3 Years" },
    { icon: Sparkles, label: "New This Week", value: "12+" },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border shop-hero-gradient">
        <div className="container-x py-12 md:py-16">
          <div ref={headerRef}>
            <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
              <span className="size-1.5 rounded-full bg-primary" />
              Collection
            </div>
            <h1 className="mt-3 font-display text-4xl tracking-tight md:text-5xl lg:text-6xl">
              {active ? cats.find((c) => c.slug === active)?.name ?? "Shop" : "Shop All"}
            </h1>
            <p className="mt-3 max-w-xl text-sm text-muted-foreground md:text-base">
              Discover our curated collection of premium vaporizers, artisan e-liquids, and handcrafted accessories.
            </p>
          </div>

          <div ref={statsRef} className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {stats.map(({ icon: Icon, label, value }) => (
              <div key={label} className="glass-card rounded-lg px-4 py-3">
                <div className="flex items-center gap-2.5">
                  <div className="flex size-8 items-center justify-center rounded-md bg-primary/10">
                    <Icon className="size-4 text-primary" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">{label}</div>
                    <div className="text-sm font-medium">{value}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Breadcrumb + Toolbar + Grid */}
      <section className="container-x py-10">
        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center gap-2 text-xs text-muted-foreground">
          <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
          <span>/</span>
          {active ? (
            <>
              <Link href="/shop" className="hover:text-foreground transition-colors">Shop</Link>
              <span>/</span>
              <span className="text-foreground">{cats.find((c) => c.slug === active)?.name ?? active}</span>
            </>
          ) : (
            <span className="text-foreground">Shop</span>
          )}
        </nav>

        <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
          <div className="flex-1 min-w-0">
            <ShopToolbar
              cats={cats}
              collections={collections}
              sp={sp as Record<string, string | undefined>}
              priceMin={priceMin}
              priceMax={priceMax}
              totalProducts={filtered.length}
            />

            {products.length === 0 ? (
              <div className="py-24 text-center">
                <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-muted">
                  <Package className="size-7 text-muted-foreground" />
                </div>
                <div className="text-lg font-display">No products found</div>
                <p className="mt-2 text-sm text-muted-foreground">
                  Try adjusting your filters or search terms.
                </p>
                <Link
                  href="/shop"
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-xs font-medium uppercase tracking-widest text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  Clear all filters
                </Link>
              </div>
            ) : (
              <>
                <div ref={gridRef} className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {products.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
                </div>

                {totalPages > 1 && (
                  <nav ref={paginationRef} className="mt-14 flex items-center justify-center gap-2">
                    {page > 1 && (
                      <Link
                        href={buildHref({ ...sp, page: String(page - 1) })}
                        className="rounded-full border border-border px-5 py-2 text-xs uppercase tracking-widest hover:bg-muted transition-colors"
                      >
                        ← Prev
                      </Link>
                    )}
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                      <Link
                        key={p}
                        href={buildHref({ ...sp, page: String(p) })}
                        className={`rounded-full px-4 py-2 text-xs transition-all duration-300 ${
                          p === page
                            ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                            : "border border-border hover:bg-muted hover:border-primary/30"
                        }`}
                      >
                        {p}
                      </Link>
                    ))}
                    {page < totalPages && (
                      <Link
                        href={buildHref({ ...sp, page: String(page + 1) })}
                        className="rounded-full border border-border px-5 py-2 text-xs uppercase tracking-widest hover:bg-muted transition-colors"
                      >
                        Next →
                      </Link>
                    )}
                  </nav>
                )}
              </>
            )}
          </div>
        </div>
      </section>

      {/* Bottom trust bar */}
      <section className="border-t border-border bg-card/30">
        <div className="container-x py-8">
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-4 text-xs uppercase tracking-[0.2em] text-muted-foreground">
            <span className="flex items-center gap-2">
              <Truck className="size-4 text-primary" />
              Free shipping over $75
            </span>
            <span className="flex items-center gap-2">
              <Shield className="size-4 text-primary" />
              3-year warranty
            </span>
            <span className="flex items-center gap-2">
              <Package className="size-4 text-primary" />
              30-day returns
            </span>
            <span className="flex items-center gap-2">
              <Sparkles className="size-4 text-primary" />
              Authentic guarantee
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
