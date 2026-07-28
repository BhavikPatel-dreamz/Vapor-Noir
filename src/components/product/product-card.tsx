"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Heart, ShoppingBag, Loader2, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Rating } from "@/components/ui/rating";
import { formatPrice } from "@/lib/format";
import { cn } from "@/lib/utils";
import { useCart } from "@/store/cart-store";
import { useWishlist } from "@/store/wishlist-store";
import type { Product } from "@/types/product";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const has = useWishlist((s) => s.ids.includes(product.id));
  const toggle = useWishlist((s) => s.toggle);
  const add = useCart((s) => s.add);
  const addingVariantId = useCart((s) => s.addingVariantId);
  const cardRef = useRef<HTMLDivElement>(null);

  const variant = product.variants[0];
  const isAdding = addingVariantId === variant?.id;
  const isSoldOut = product.variants.every((v) => !v.inStock);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    gsap.set(el, { y: 40, opacity: 0 });

    const tween = gsap.to(el, {
      y: 0,
      opacity: 1,
      duration: 0.6,
      ease: "power3.out",
      delay: (index % 4) * 0.08,
      scrollTrigger: {
        trigger: el,
        start: "top 90%",
        once: true,
      },
    });

    return () => {
      tween.kill();
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === el) st.kill();
      });
    };
  }, [index]);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!variant?.inStock || isAdding) return;
    const btn = (e.currentTarget as HTMLElement).closest(".card-actions");
    if (btn) {
      gsap.fromTo(btn, { scale: 1 }, { scale: 1.15, duration: 0.15, yoyo: true, repeat: 1, ease: "power2.out" });
    }
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
    <div ref={cardRef} className="group relative">
      <Link href={`/product/${product.slug}`} className="block">
        <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-muted">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-all duration-700 ease-out group-hover:scale-105 group-hover:brightness-110"
          />

          {/* Gradient overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

          {/* Badges */}
          <div className="absolute left-3 top-3 flex flex-col gap-1.5">
            {isSoldOut && <Badge variant="muted">Sold out</Badge>}
            {!isSoldOut && product.new && <Badge variant="accent">New</Badge>}
            {!isSoldOut && product.bestseller && <Badge>Bestseller</Badge>}
            {!isSoldOut && product.compareAtPrice && <Badge variant="outline">Sale</Badge>}
          </div>

          {/* Quick actions */}
          <div className="card-actions absolute right-3 top-3 flex flex-col gap-2 opacity-0 translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
            <button
              type="button"
              onClick={(e) => { e.preventDefault(); toggle(product.id); }}
              aria-label="Add to wishlist"
              className="rounded-full bg-background/80 p-2.5 backdrop-blur-md transition-all duration-200 hover:bg-background hover:scale-110 hover:shadow-lg"
            >
              <Heart className={cn("size-4", has && "fill-accent text-accent")} />
            </button>
          </div>

          {/* Add to cart - bottom right */}
          <div className="absolute bottom-3 right-3 opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
            <button
              type="button"
              onClick={handleAddToCart}
              disabled={isAdding || isSoldOut}
              aria-label="Add to cart"
              className="flex items-center gap-2 rounded-full bg-primary px-4 py-2.5 text-xs font-medium text-primary-foreground shadow-lg shadow-primary/30 transition-all duration-200 hover:bg-primary/90 hover:scale-105 disabled:opacity-60"
            >
              {isAdding ? (
                <Loader2 className="size-3.5 animate-spin" />
              ) : (
                <ShoppingBag className="size-3.5" />
              )}
              {isAdding ? "Adding..." : "Add to cart"}
            </button>
          </div>

          {/* Bottom gradient bar */}
          <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-primary via-accent to-primary opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        </div>

        <div className="mt-4 flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <div className="font-display text-base leading-tight md:text-lg">{product.name}</div>
            <div className="mt-1 truncate text-xs text-muted-foreground">{product.tagline}</div>
            <div className="mt-1.5"><Rating value={product.rating} count={product.reviewCount} /></div>
          </div>
          <div className="text-right shrink-0">
            <div className="text-sm font-medium md:text-base">{formatPrice(product.price, product.currency)}</div>
            {product.compareAtPrice && (
              <div className="text-xs text-muted-foreground line-through">
                {formatPrice(product.compareAtPrice, product.currency)}
              </div>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}
