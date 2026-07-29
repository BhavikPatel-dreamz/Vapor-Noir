"use client";

import Link from "next/link";
import { ChevronRight, Package } from "lucide-react";
import { ProductGallery } from "@/components/product/product-gallery";
import { ProductDetails } from "@/components/product/product-details";
import { ProductCard } from "@/components/product/product-card";
import type { Product } from "@/types/product";

export function ProductPageContent({
  product,
  related,
}: {
  product: Product;
  related: Product[];
}) {
  const categoryName = product.category.replace(/-/g, " ");

  return (
    <div className="bg-white">
      {/* Breadcrumb */}
      <div className="bg-muted/50 border-b border-border">
        <div className="container-x py-3">
          <nav className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Link href="/" className="hover:text-foreground">Home</Link>
            <ChevronRight className="size-3" />
            <Link href="/shop" className="hover:text-foreground">Shop</Link>
            <ChevronRight className="size-3" />
            <Link href={`/shop?category=${product.category}`} className="hover:text-foreground capitalize">
              {categoryName}
            </Link>
            <ChevronRight className="size-3" />
            <span className="text-foreground font-bold truncate max-w-[200px]">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Main Product Section */}
      <section className="container-x py-6 md:py-10">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          <div>
            <ProductGallery images={product.images} alt={product.name} />
          </div>
          <div>
            <ProductDetails product={product} />
          </div>
        </div>
      </section>

      {/* Related Products */}
      {related.length > 0 && (
        <section className="border-t border-border bg-muted/30 py-8">
          <div className="container-x">
            <div className="section-title-bar">🔗 Related Products</div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
            </div>
          </div>
        </section>
      )}

      {/* Bottom trust bar */}
      <section className="border-t-2 border-border bg-[#FFF8E1]">
        <div className="container-x py-6">
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-3 text-xs font-bold uppercase tracking-wide">
            <span className="flex items-center gap-2">
              <Package className="size-4 text-[#1565C0]" />
              Secure packaging
            </span>
            <span className="flex items-center gap-2">
              <span className="size-4 text-[#2E7D32]">🔒</span>
              Secure checkout
            </span>
            <span className="flex items-center gap-2">
              <span className="size-4 text-[#F57C00]">💳</span>
              Secure payment
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
