"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { SlidersHorizontal, X, ChevronDown, LayoutGrid, List } from "lucide-react";
import type { Category, Collection } from "@/types/product";
import { ShopSidebar } from "./shop-sidebar";

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

function clearFilterHref(sp: Params, keys: string[]) {
  const cleared: Params = { ...sp };
  for (const k of keys) delete cleared[k];
  cleared.page = undefined;
  return buildHref(cleared);
}

const SORT_OPTIONS: [string, string][] = [
  ["Featured", ""],
  ["Newest", "newest"],
  ["Price ↑", "price-asc"],
  ["Price ↓", "price-desc"],
  ["Rating", "rating"],
];

export function ShopToolbar({
  cats,
  collections,
  sp,
  priceMin,
  priceMax,
  totalProducts,
}: {
  cats: Category[];
  collections: Collection[];
  sp: Params;
  priceMin: number;
  priceMax: number;
  totalProducts: number;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  const activeFilterCount = [
    sp.category,
    sp.collection,
    sp.minPrice,
    sp.maxPrice,
    sp.inStock === "1",
    sp.onSale === "1",
  ].filter(Boolean).length;

  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [sidebarOpen]);

  return (
    <>
      <div className="mb-6 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="relative flex items-center gap-2 rounded-full border border-border bg-card/40 px-4 py-2 text-xs font-medium text-muted-foreground transition-all duration-300 hover:bg-muted hover:border-primary/30 hover:text-foreground"
          >
            <SlidersHorizontal className="size-3.5" />
            Filters
            {activeFilterCount > 0 && (
              <span className="flex size-4 items-center justify-center rounded-full bg-primary text-[10px] font-semibold text-primary-foreground">
                {activeFilterCount}
              </span>
            )}
          </button>

          <div className="flex items-center gap-3">
            {/* Sort pills */}
            <div className="hidden items-center gap-1 rounded-full border border-border bg-card/40 p-1 sm:flex">
              {SORT_OPTIONS.map(([label, val]) => {
                const href = buildHref(sp, { sort: val || undefined, page: undefined });
                const isActive = (sp.sort ?? "") === val;
                return (
                  <Link
                    key={label}
                    href={href}
                    className={`rounded-full px-3 py-1.5 text-xs transition-all duration-300 ${
                      isActive
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {label}
                  </Link>
                );
              })}
            </div>

            {/* Mobile sort */}
            <div className="sm:hidden">
              <select
                className="rounded-full border border-border bg-card/40 px-3 py-2 text-xs text-muted-foreground appearance-none cursor-pointer"
                defaultValue={sp.sort ?? ""}
                onChange={(e) => {
                  const url = buildHref(sp, { sort: e.target.value || undefined, page: undefined });
                  window.location.href = url;
                }}
              >
                {SORT_OPTIONS.map(([label, val]) => (
                  <option key={label} value={val}>{label}</option>
                ))}
              </select>
            </div>

            <div className="text-xs text-muted-foreground">
              <span className="font-medium text-foreground">{totalProducts}</span> product{totalProducts !== 1 && "s"}
            </div>
          </div>
        </div>

        {/* Active filter pills */}
        {(sp.category || sp.collection || sp.minPrice || sp.maxPrice || sp.inStock === "1" || sp.onSale === "1") && (
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] uppercase tracking-wider text-muted-foreground">Active:</span>
            {sp.category && (
              <span className="flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-xs">
                {cats.find((c) => c.slug === sp.category)?.name ?? sp.category}
                <Link href={clearFilterHref(sp, ["category"])} className="text-muted-foreground hover:text-foreground transition-colors">
                  <X className="size-3" />
                </Link>
              </span>
            )}
            {sp.collection && (
              <span className="flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-xs">
                {collections.find((c) => c.slug === sp.collection)?.name ?? sp.collection}
                <Link href={clearFilterHref(sp, ["collection"])} className="text-muted-foreground hover:text-foreground transition-colors">
                  <X className="size-3" />
                </Link>
              </span>
            )}
            {sp.minPrice && (
              <span className="flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-xs">
                Min ${sp.minPrice}
                <Link href={clearFilterHref(sp, ["minPrice"])} className="text-muted-foreground hover:text-foreground transition-colors">
                  <X className="size-3" />
                </Link>
              </span>
            )}
            {sp.maxPrice && (
              <span className="flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-xs">
                Max ${sp.maxPrice}
                <Link href={clearFilterHref(sp, ["maxPrice"])} className="text-muted-foreground hover:text-foreground transition-colors">
                  <X className="size-3" />
                </Link>
              </span>
            )}
            {sp.inStock === "1" && (
              <span className="flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-xs">
                In Stock
                <Link href={clearFilterHref(sp, ["inStock"])} className="text-muted-foreground hover:text-foreground transition-colors">
                  <X className="size-3" />
                </Link>
              </span>
            )}
            {sp.onSale === "1" && (
              <span className="flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-xs">
                On Sale
                <Link href={clearFilterHref(sp, ["onSale"])} className="text-muted-foreground hover:text-foreground transition-colors">
                  <X className="size-3" />
                </Link>
              </span>
            )}
            <Link
              href={buildHref(sp, { category: undefined, collection: undefined, minPrice: undefined, maxPrice: undefined, inStock: undefined, onSale: undefined, page: undefined })}
              className="text-xs text-primary hover:text-primary/80 transition-colors"
            >
              Clear all
            </Link>
          </div>
        )}
      </div>

      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          sidebarOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Sidebar Panel */}
      <div
        ref={panelRef}
        className={`fixed inset-y-0 left-0 z-50 w-96 max-w-[85vw] overflow-y-auto bg-background p-6 shadow-2xl transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="mb-6 flex items-center justify-between border-b border-border pb-4">
          <div className="text-sm font-medium uppercase tracking-[0.2em] text-foreground">Filters</div>
          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            className="rounded-md p-1.5 transition-colors hover:bg-muted"
          >
            <X className="size-5" />
          </button>
        </div>
        <ShopSidebar
          cats={cats}
          collections={collections}
          sp={sp}
          priceMin={priceMin}
          priceMax={priceMax}
        />
      </div>
    </>
  );
}
