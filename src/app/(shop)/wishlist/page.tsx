"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Heart, Loader2, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/product/product-card";
import { useWishlist } from "@/store/wishlist-store";
import { getProductsByIds } from "@/lib/api";
import type { Product } from "@/types/product";

export default function WishlistPage() {
  const ids = useWishlist((s) => s.ids);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    getProductsByIds(ids)
      .then((data) => { if (!cancelled) setProducts(data); })
      .catch(console.error)
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [ids]);

  if (loading) {
    return (
      <div className="bg-white min-h-[60vh] flex items-center justify-center">
        <Loader2 className="size-8 animate-spin text-[#1565C0]" />
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="bg-white">
        <div className="container-x flex min-h-[60vh] flex-col items-center justify-center gap-4 py-16 text-center">
          <div className="bg-[#FFEBEE] p-6 rounded-full">
            <Heart className="size-12 text-[#D32F2F]" />
          </div>
          <h1 className="text-[28px] font-black text-[#1565C0]">Your Wishlist is Empty</h1>
          <p className="max-w-md text-muted-foreground">
            Save your favorite products and come back to them later.
          </p>
          <Button asChild size="lg" className="mt-4">
            <Link href="/shop"><ShoppingBag className="size-4" /> Explore Products</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <div className="bg-gradient-to-r from-[#D32F2F] to-[#B71C1C] border-b-4 border-[#FFC107]">
        <div className="container-x py-6">
          <h1 className="text-[28px] font-black text-white">My Wishlist</h1>
          <p className="text-white/70 text-sm"><Heart className="inline size-4 mr-1" /> {products.length} saved product{products.length !== 1 ? "s" : ""}</p>
        </div>
      </div>
      <div className="container-x py-8">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
