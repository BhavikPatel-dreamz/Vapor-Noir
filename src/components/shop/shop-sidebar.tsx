"use client";

import { useState } from "react";
import { ChevronRight, SlidersHorizontal } from "lucide-react";
import type { Category, Collection } from "@/types/product";
import { PriceRangeSlider } from "./price-range-slider";

type Params = Record<string, string | undefined>;

export function ShopSidebar({
  cats,
  collections,
  sp,
  priceMin,
  priceMax,
}: {
  cats: Category[];
  collections: Collection[];
  sp: Params;
  priceMin: number;
  priceMax: number;
}) {
  return (
    <form method="get" className="space-y-0">
      {sp.sort && <input type="hidden" name="sort" value={sp.sort} />}
      {sp.q && <input type="hidden" name="q" value={sp.q} />}

      <SidebarFilterSection title="Categories" defaultOpen>
        <div className="space-y-0.5">
          <label className="flex items-center gap-2.5 px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-[#E3F2FD] hover:text-[#1565C0] cursor-pointer transition-colors">
            <input
              type="radio"
              name="category"
              value=""
              defaultChecked={!sp.category}
              className="size-4 accent-[#1565C0]"
            />
            All Categories
          </label>
          {cats.map((c) => (
            <label key={c.slug} className="flex items-center gap-2.5 px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-[#E3F2FD] hover:text-[#1565C0] cursor-pointer transition-colors">
              <input
                type="radio"
                name="category"
                value={c.slug}
                defaultChecked={sp.category === c.slug}
                className="size-4 accent-[#1565C0]"
              />
              {c.name}
            </label>
          ))}
        </div>
      </SidebarFilterSection>

      {collections.length > 0 && (
        <SidebarFilterSection title="Collections">
          <div className="space-y-0.5">
            <label className="flex items-center gap-2.5 px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-[#FFF3E0] hover:text-[#F57C00] cursor-pointer transition-colors">
              <input
                type="radio"
                name="collection"
                value=""
                defaultChecked={!sp.collection}
                className="size-4 accent-[#F57C00]"
              />
              All Collections
            </label>
            {collections.map((col) => (
              <label key={col.slug} className="flex items-center gap-2.5 px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-[#FFF3E0] hover:text-[#F57C00] cursor-pointer transition-colors">
                <input
                  type="radio"
                  name="collection"
                  value={col.slug}
                  defaultChecked={sp.collection === col.slug}
                  className="size-4 accent-[#F57C00]"
                />
                {col.name}
              </label>
            ))}
          </div>
        </SidebarFilterSection>
      )}

      <SidebarFilterSection title="Price Range" defaultOpen>
        <PriceRangeSlider
          min={priceMin}
          max={priceMax}
          initialMin={Number(sp.minPrice) || priceMin}
          initialMax={Number(sp.maxPrice) || priceMax}
        />
      </SidebarFilterSection>

      <SidebarFilterSection title="Availability">
        <div className="space-y-0.5">
          <label className="flex items-center gap-2.5 px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-[#E8F5E9] hover:text-[#2E7D32] cursor-pointer transition-colors">
            <input
              type="checkbox"
              name="inStock"
              value="1"
              defaultChecked={sp.inStock === "1"}
              className="size-4 rounded accent-[#2E7D32]"
            />
            <span className="flex items-center gap-1.5"><span className="size-2 rounded-full bg-[#2E7D32]" /> In Stock</span>
          </label>
          <label className="flex items-center gap-2.5 px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-[#FFEBEE] hover:text-[#D32F2F] cursor-pointer transition-colors">
            <input
              type="checkbox"
              name="onSale"
              value="1"
              defaultChecked={sp.onSale === "1"}
              className="size-4 rounded accent-[#D32F2F]"
            />
            <span className="flex items-center gap-1.5"><span className="size-2 rounded-full bg-[#D32F2F]" /> On Sale</span>
          </label>
        </div>
      </SidebarFilterSection>

      <div className="border-t-2 border-border pt-4 mt-2">
        <button
          type="submit"
          className="w-full btn-gradient-blue text-white font-bold text-sm px-4 py-3 border-b-2 border-[#0D47A1] hover:brightness-110 transition-all rounded-sm"
        >
          Apply Filters
        </button>
      </div>
    </form>
  );
}

function SidebarFilterSection({
  title,
  defaultOpen = false,
  children,
}: {
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border-t-2 border-border pt-4 pb-2">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between text-xs font-bold uppercase tracking-wide text-[#1565C0] hover:text-[#0D47A1] px-3 py-2 bg-[#E3F2FD] transition-colors"
      >
        {title}
        <ChevronRight
          className={`size-4 shrink-0 transition-transform duration-200 ${open ? "rotate-90" : ""}`}
        />
      </button>
      <div
        className={`grid transition-all duration-200 ease-in-out ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="pt-2">{children}</div>
        </div>
      </div>
    </div>
  );
}
