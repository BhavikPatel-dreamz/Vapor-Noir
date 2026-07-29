"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag, Eye, Loader2, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Rating } from "@/components/ui/rating";
import { formatPrice } from "@/lib/format";
import { cn } from "@/lib/utils";
import { useCart } from "@/store/cart-store";
import { useWishlist } from "@/store/wishlist-store";
import type { Product } from "@/types/product";

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const has = useWishlist((s) => s.ids.includes(product.id));
  const toggle = useWishlist((s) => s.toggle);
  const add = useCart((s) => s.add);
  const addingVariantId = useCart((s) => s.addingVariantId);

  const variant = product.variants[0];
  const isAdding = addingVariantId === variant?.id;
  const isSoldOut = product.variants.every((v) => !v.inStock);
  const savings = product.compareAtPrice ? product.compareAtPrice - product.price : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!variant?.inStock || isAdding) return;
    add({
      id: `${product.id}:${variant.id}`,
      productId: product.id,
      variantId: variant.id,
      slug: product.slug,
      name: product.name,
      variantName: variant.name,
      price: variant.price,
      currency: product.currency,
      image: product.images[0],
    });
  };

  return (
    <div className="group bg-white border-2 border-border hover:border-[#1565C0] transition-all duration-200 shadow-sm hover:shadow-md">
      <Link href={`/product/${product.slug}`} className="block">
        {/* Image container */}
        <div className="relative aspect-square overflow-hidden bg-white border-b-2 border-border">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="object-contain p-3 transition-transform duration-300 group-hover:scale-105"
          />

          {/* Badges */}
          <div className="absolute left-2 top-2 flex flex-col gap-1">
            {isSoldOut && <Badge variant="muted">Sold Out</Badge>}
            {!isSoldOut && product.new && <Badge variant="new">New</Badge>}
            {!isSoldOut && product.bestseller && <Badge variant="gold">Best Seller</Badge>}
            {!isSoldOut && product.compareAtPrice && <Badge variant="sale">Sale</Badge>}
          </div>

          {/* Savings badge */}
          {savings > 0 && !isSoldOut && (
            <div className="absolute right-2 bottom-2 bg-[#D32F2F] text-white text-[10px] font-bold px-2 py-1 rounded-sm shadow-sm">
              Save ${savings}
            </div>
          )}

          {/* Wishlist button */}
          <button
            type="button"
            onClick={(e) => { e.preventDefault(); toggle(product.id); }}
            aria-label={has ? "Remove from wishlist" : "Add to wishlist"}
            className="absolute right-2 top-2 bg-white border-2 border-border p-1.5 hover:border-[#D32F2F] hover:text-[#D32F2F] transition-colors opacity-0 group-hover:opacity-100"
          >
            <Heart className={cn("size-4", has && "fill-[#D32F2F] text-[#D32F2F]")} />
          </button>
        </div>

        {/* Product info */}
        <div className="p-4">
          <h3 className="text-sm font-bold text-foreground leading-tight line-clamp-2 h-10 hover:text-[#1565C0] transition-colors">
            {product.name}
          </h3>
          <div className="mt-1.5">
            <Rating value={product.rating} count={product.reviewCount} />
          </div>
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-baseline gap-2">
              {product.compareAtPrice ? (
                <>
                  <span className="text-lg font-black text-[#D32F2F]">
                    {formatPrice(product.price, product.currency)}
                  </span>
                  <span className="text-xs text-muted-foreground line-through">
                    {formatPrice(product.compareAtPrice, product.currency)}
                  </span>
                </>
              ) : (
                <span className="text-lg font-black text-foreground">
                  {formatPrice(product.price, product.currency)}
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>

      {/* Actions */}
      <div className="border-t-2 border-border p-3">
        <div className="flex gap-2">
          <button
            type="button"
            onClick={handleAddToCart}
            disabled={isAdding || isSoldOut}
            className="flex-1 flex items-center justify-center gap-1.5 btn-gradient-blue text-white text-xs font-bold px-3 py-2.5 border-b-2 border-[#0D47A1] hover:brightness-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed rounded-sm"
          >
            {isAdding ? (
              <Loader2 className="size-3.5 animate-spin" />
            ) : (
              <ShoppingBag className="size-3.5" />
            )}
            {isAdding ? "Adding..." : "Add to Cart"}
          </button>
          <Link
            href={`/product/${product.slug}`}
            className="flex items-center justify-center gap-1.5 border-2 border-border px-3 py-2.5 text-xs font-bold text-muted-foreground hover:bg-[#E3F2FD] hover:text-[#1565C0] hover:border-[#1565C0] transition-all rounded-sm"
          >
            <Eye className="size-3.5" /> View
          </Link>
        </div>
      </div>
    </div>
  );
}
