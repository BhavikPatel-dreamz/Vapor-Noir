"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { SlidersHorizontal, X, ArrowUpDown } from "lucide-react";
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
      <div className="mb-4 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="flex items-center gap-2 border-2 border-[#1565C0] bg-white px-4 py-2.5 text-xs font-bold text-[#1565C0] hover:bg-[#E3F2FD] transition-colors rounded-sm"
            >
              <SlidersHorizontal className="size-3.5" />
              Filters
              {activeFilterCount > 0 && (
                <span className="flex size-5 items-center justify-center bg-[#D32F2F] text-[10px] font-bold text-white rounded-sm">
                  {activeFilterCount}
                </span>
              )}
            </button>

            <div className="hidden sm:flex items-center gap-1">
              {SORT_OPTIONS.map(([label, val]) => {
                const href = buildHref(sp, { sort: val || undefined, page: undefined });
                const isActive = (sp.sort ?? "") === val;
                return (
                  <Link
                    key={label}
                    href={href}
                    className={`px-3.5 py-2 text-xs font-bold border-2 transition-all rounded-sm ${
                      isActive
                        ? "bg-[#1565C0] text-white border-[#1565C0]"
                        : "border-border text-muted-foreground hover:border-[#1565C0] hover:text-[#1565C0]"
                    }`}
                  >
                    {label}
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="sm:hidden">
              <select
                className="border-2 border-border bg-white px-3 py-2 text-xs text-muted-foreground"
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
              <span className="font-bold text-[#1565C0]">{totalProducts}</span> product{totalProducts !== 1 && "s"}
            </div>
          </div>
        </div>

        {/* Active filter pills */}
        {(sp.category || sp.collection || sp.minPrice || sp.maxPrice || sp.inStock === "1" || sp.onSale === "1") && (
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-bold uppercase text-muted-foreground">Active:</span>
            {sp.category && (
              <span className="flex items-center gap-1.5 border-2 border-[#1565C0]/30 bg-[#E3F2FD] px-2.5 py-1 text-xs font-bold text-[#1565C0] rounded-sm">
                {cats.find((c) => c.slug === sp.category)?.name ?? sp.category}
                <Link href={clearFilterHref(sp, ["category"])} className="text-[#1565C0] hover:text-[#D32F2F]">
                  <X className="size-3" />
                </Link>
              </span>
            )}
            {sp.collection && (
              <span className="flex items-center gap-1.5 border-2 border-[#F57C00]/30 bg-[#FFF3E0] px-2.5 py-1 text-xs font-bold text-[#F57C00] rounded-sm">
                {collections.find((c) => c.slug === sp.collection)?.name ?? sp.collection}
                <Link href={clearFilterHref(sp, ["collection"])} className="text-[#F57C00] hover:text-[#D32F2F]">
                  <X className="size-3" />
                </Link>
              </span>
            )}
            {sp.minPrice && (
              <span className="flex items-center gap-1.5 border-2 border-[#2E7D32]/30 bg-[#E8F5E9] px-2.5 py-1 text-xs font-bold text-[#2E7D32] rounded-sm">
                Min ${sp.minPrice}
                <Link href={clearFilterHref(sp, ["minPrice"])} className="text-[#2E7D32] hover:text-[#D32F2F]">
                  <X className="size-3" />
                </Link>
              </span>
            )}
            {sp.maxPrice && (
              <span className="flex items-center gap-1.5 border-2 border-[#D32F2F]/30 bg-[#FFEBEE] px-2.5 py-1 text-xs font-bold text-[#D32F2F] rounded-sm">
                Max ${sp.maxPrice}
                <Link href={clearFilterHref(sp, ["maxPrice"])} className="text-[#D32F2F] hover:text-[#D32F2F]">
                  <X className="size-3" />
                </Link>
              </span>
            )}
            {sp.inStock === "1" && (
              <span className="flex items-center gap-1.5 border-2 border-[#2E7D32]/30 bg-[#E8F5E9] px-2.5 py-1 text-xs font-bold text-[#2E7D32] rounded-sm">
                In Stock
                <Link href={clearFilterHref(sp, ["inStock"])} className="text-[#2E7D32] hover:text-[#D32F2F]">
                  <X className="size-3" />
                </Link>
              </span>
            )}
            {sp.onSale === "1" && (
              <span className="flex items-center gap-1.5 border-2 border-[#D32F2F]/30 bg-[#FFEBEE] px-2.5 py-1 text-xs font-bold text-[#D32F2F] rounded-sm">
                On Sale
                <Link href={clearFilterHref(sp, ["onSale"])} className="text-[#D32F2F] hover:text-[#D32F2F]">
                  <X className="size-3" />
                </Link>
              </span>
            )}
            <Link
              href={buildHref(sp, { category: undefined, collection: undefined, minPrice: undefined, maxPrice: undefined, inStock: undefined, onSale: undefined, page: undefined })}
              className="text-xs font-bold text-[#D32F2F] hover:underline"
            >
              Clear all
            </Link>
          </div>
        )}
      </div>

      {/* Sidebar backdrop */}
      <div
        className={`fixed inset-0 z-50 bg-black/50 transition-opacity duration-300 ${
          sidebarOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Sidebar Panel */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-80 max-w-[85vw] overflow-y-auto bg-white p-6 shadow-xl transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="mb-4 flex items-center justify-between border-b-2 border-[#1565C0] pb-4">
          <div className="text-sm font-black uppercase text-[#1565C0] flex items-center gap-2">
            <SlidersHorizontal className="size-4" /> Filters
          </div>
          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            className="p-1 hover:bg-[#FFEBEE] transition-colors text-muted-foreground hover:text-[#D32F2F]"
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
