"use client";

import Link from "next/link";
import { Package, Truck, Shield, Sparkles, Star, ShoppingBag } from "lucide-react";
import { ProductCard } from "@/components/product/product-card";
import { ShopToolbar } from "@/components/shop/shop-toolbar";
import type { Category, Collection, Product } from "@/types/product";

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
  const stats = [
    { icon: Package, label: "Products", value: filtered.length, color: "#1565C0", bg: "#E3F2FD" },
    { icon: Truck, label: "Free Shipping", value: "$75+", color: "#2E7D32", bg: "#E8F5E9" },
    { icon: Shield, label: "Warranty", value: "3 Years", color: "#F57C00", bg: "#FFF3E0" },
    { icon: Sparkles, label: "New This Week", value: "12+", color: "#D32F2F", bg: "#FFEBEE" },
  ];

  return (
    <div className="bg-white">
      {/* Header */}
      <section className="border-b-2 border-border bg-gradient-to-r from-[#1565C0] to-[#0D47A1]">
        <div className="container-x py-8">
          <h1 className="text-[30px] font-black text-white">
            {active ? cats.find((c) => c.slug === active)?.name ?? "Shop" : "Shop All Products"}
          </h1>
          <p className="mt-1 text-sm text-white/70">
            Browse our full collection of premium vaporizers, e-liquids, and accessories.
          </p>

          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {stats.map(({ icon: Icon, label, value, color, bg }) => (
              <div key={label} className="border-2 border-white/20 bg-white/10 backdrop-blur px-4 py-3">
                <div className="flex items-center gap-2.5">
                  <div className="flex size-9 items-center justify-center" style={{ backgroundColor: color, color: "white" }}>
                    <Icon className="size-4" />
                  </div>
                  <div>
                    <div className="text-xs text-white/60">{label}</div>
                    <div className="text-base font-black text-white">{value}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Breadcrumb + Content */}
      <section className="container-x py-6">
        {/* Breadcrumb */}
        <nav className="mb-4 flex items-center gap-2 text-xs text-muted-foreground">
          <Link href="/" className="hover:text-[#1565C0]">Home</Link>
          <span className="text-[#1565C0] font-bold">/</span>
          {active ? (
            <>
              <Link href="/shop" className="hover:text-[#1565C0]">Shop</Link>
              <span className="text-[#1565C0] font-bold">/</span>
              <span className="text-foreground font-bold">{cats.find((c) => c.slug === active)?.name ?? active}</span>
            </>
          ) : (
            <span className="text-foreground font-bold">Shop</span>
          )}
        </nav>

        <ShopToolbar
          cats={cats}
          collections={collections}
          sp={sp as Record<string, string | undefined>}
          priceMin={priceMin}
          priceMax={priceMax}
          totalProducts={filtered.length}
        />

        {products.length === 0 ? (
          <div className="py-16 text-center border-2 border-border bg-[#E3F2FD]">
            <Package className="mx-auto mb-4 size-12 text-[#1565C0]/40" />
            <div className="text-lg font-bold text-[#1565C0]">No products found</div>
            <p className="mt-2 text-sm text-muted-foreground">
              Try adjusting your filters or search terms.
            </p>
            <Link
              href="/shop"
              className="mt-4 inline-flex items-center gap-2 bg-[#1565C0] text-white font-bold text-sm px-6 py-3 border-b-2 border-[#0D47A1] hover:bg-[#0D47A1] transition-all rounded-sm"
            >
              Clear All Filters
            </Link>
          </div>
        ) : (
          <>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {products.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
            </div>

            {totalPages > 1 && (
              <nav className="mt-8 flex items-center justify-center gap-2">
                {page > 1 && (
                  <Link
                    href={buildHref({ ...sp, page: String(page - 1) })}
                    className="border-2 border-[#1565C0] px-5 py-2.5 text-xs font-bold text-[#1565C0] hover:bg-[#E3F2FD] transition-colors rounded-sm"
                  >
                    &larr; Prev
                  </Link>
                )}
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <Link
                    key={p}
                    href={buildHref({ ...sp, page: String(p) })}
                    className={`px-5 py-2.5 text-xs font-bold border-2 transition-all rounded-sm ${
                      p === page
                        ? "bg-[#1565C0] text-white border-[#1565C0]"
                        : "border-border hover:border-[#1565C0] hover:text-[#1565C0]"
                    }`}
                  >
                    {p}
                  </Link>
                ))}
                {page < totalPages && (
                  <Link
                    href={buildHref({ ...sp, page: String(page + 1) })}
                    className="border-2 border-[#1565C0] px-5 py-2.5 text-xs font-bold text-[#1565C0] hover:bg-[#E3F2FD] transition-colors rounded-sm"
                  >
                    Next &rarr;
                  </Link>
                )}
              </nav>
            )}
          </>
        )}
      </section>

      {/* Bottom trust bar */}
      <section className="border-t-2 border-border bg-[#FFF8E1]">
        <div className="container-x py-6">
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-3 text-xs font-bold uppercase tracking-wide">
            <span className="flex items-center gap-2">
              <Truck className="size-4 text-[#1565C0]" />
              Free shipping over $75
            </span>
            <span className="flex items-center gap-2">
              <Shield className="size-4 text-[#2E7D32]" />
              3-year warranty
            </span>
            <span className="flex items-center gap-2">
              <Package className="size-4 text-[#F57C00]" />
              30-day returns
            </span>
            <span className="flex items-center gap-2">
              <Sparkles className="size-4 text-[#D32F2F]" />
              Authentic guarantee
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
