"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Minus, Plus, ShoppingBag, Heart, Check, Loader2, Zap, ChevronDown, Truck, Shield, RotateCcw, Award } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import { Rating } from "@/components/ui/rating";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { formatPrice } from "@/lib/format";
import { cn } from "@/lib/utils";
import { useCart } from "@/store/cart-store";
import { useWishlist } from "@/store/wishlist-store";
import type { Product } from "@/types/product";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function ProductDetails({ product }: { product: Product }) {
  const [variantId, setVariantId] = useState(product.variants[0].id);
  const [qty, setQty] = useState(1);
  const add = useCart((s) => s.add);
  const addingVariantId = useCart((s) => s.addingVariantId);
  const wl = useWishlist();
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);

  const variant = product.variants.find((v) => v.id === variantId) ?? product.variants[0];
  const isAdding = addingVariantId === variant.id;

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const children = Array.from(el.children);
    gsap.set(children, { y: 30, opacity: 0 });
    gsap.to(children, {
      y: 0,
      opacity: 1,
      duration: 0.7,
      ease: "power3.out",
      stagger: 0.07,
      delay: 0.3,
    });
  }, []);

  const onAdd = () => {
    if (!variant.inStock || isAdding) return;
    const btn = document.querySelector(".add-to-cart-btn");
    if (btn) {
      gsap.fromTo(btn, { scale: 1 }, { scale: 1.05, duration: 0.15, yoyo: true, repeat: 1, ease: "power2.out" });
    }
    add(
      {
        id: `${product.id}:${variant.id}`,
        productId: product.id,
        variantId: variant.id,
        slug: product.slug,
        name: product.name,
        variantName: variant.name,
        price: variant.price,
        currency: product.currency,
        image: product.images[0],
      },
      qty,
    );
  };

  const onBuyNow = async () => {
    if (!variant.inStock || isAdding) return;
    const ok = await add(
      {
        id: `${product.id}:${variant.id}`,
        productId: product.id,
        variantId: variant.id,
        slug: product.slug,
        name: product.name,
        variantName: variant.name,
        price: variant.price,
        currency: product.currency,
        image: product.images[0],
      },
      qty,
    );
    if (ok) router.push("/checkout");
  };

  const trustItems = [
    { icon: Truck, text: "Free shipping over $75" },
    { icon: Shield, text: "3-year warranty" },
    { icon: RotateCcw, text: "30-day returns" },
    { icon: Award, text: "Authentic guarantee" },
  ];

  return (
    <div ref={containerRef} className="flex flex-col gap-5">
      {/* Breadcrumb-style category */}
      <div>
        <div className="flex flex-wrap items-center gap-2">
          {product.new && <Badge variant="accent">New</Badge>}
          {product.bestseller && <Badge>Bestseller</Badge>}
        </div>
        <h1 className="mt-3 font-display text-3xl leading-[1.08] tracking-tight md:text-4xl lg:text-5xl">
          {product.name}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground md:text-base">{product.tagline}</p>
        <div className="mt-3 flex items-center gap-3">
          <Rating value={product.rating} count={product.reviewCount} />
          <span className="text-xs text-muted-foreground">|</span>
          <span className="text-xs text-muted-foreground">{product.reviewCount} reviews</span>
        </div>
      </div>

      {/* Price */}
      <div className="flex items-baseline gap-3 flex-wrap">
        <div className={cn("text-3xl font-medium md:text-4xl", product.compareAtPrice && "text-accent")}>
          {formatPrice(variant.price, product.currency)}
        </div>
        {product.compareAtPrice && (
          <>
            <div className="text-lg text-muted-foreground line-through">
              {formatPrice(product.compareAtPrice, product.currency)}
            </div>
            <Badge variant="sale">
              Save {Math.round(((product.compareAtPrice - variant.price) / product.compareAtPrice) * 100)}%
            </Badge>
          </>
        )}
      </div>

      {/* Description */}
      <p className="text-sm leading-relaxed text-foreground/80">{product.longDescription}</p>

      <Separator />

      {/* Variants */}
      <div>
        <div className="mb-3 text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
          {product.category === "e-liquids" ? "Strength" : "Finish"}
        </div>
        <div className="flex flex-wrap gap-2">
          {product.variants.map((v) => (
            <button
              key={v.id}
              disabled={!v.inStock}
              onClick={() => setVariantId(v.id)}
              className={cn(
                "rounded-lg border-2 px-5 py-2.5 text-sm font-medium transition-all duration-300",
                v.id === variantId
                  ? "border-primary bg-primary-light text-foreground shadow-md shadow-primary/10 ring-1 ring-primary/30"
                  : "border-border hover:border-primary/40 hover:bg-primary-light/50",
                !v.inStock && "opacity-30 line-through cursor-not-allowed",
              )}
            >
              {v.name}
            </button>
          ))}
        </div>
      </div>

      {/* Quantity + Actions */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <div className="flex items-center rounded-lg border border-border overflow-hidden">
            <button aria-label="Decrease" onClick={() => setQty(Math.max(1, qty - 1))} className="p-3 transition-all duration-200 hover:bg-muted hover:text-primary">
              <Minus className="size-4" />
            </button>
            <div className="w-12 text-center text-sm font-medium tabular-nums border-x border-border">{qty}</div>
            <button aria-label="Increase" onClick={() => setQty(qty + 1)} className="p-3 transition-all duration-200 hover:bg-muted hover:text-primary">
              <Plus className="size-4" />
            </button>
          </div>

          <div className="flex flex-1 gap-2">
            <Button
              size="lg"
              className="add-to-cart-btn flex-1 h-12 text-sm font-medium uppercase tracking-widest"
              onClick={onAdd}
              disabled={!variant.inStock || isAdding}
            >
              {isAdding ? <Loader2 className="size-5 animate-spin" /> : <ShoppingBag />}
              {isAdding ? "Adding..." : variant.inStock ? "Add to cart" : "Sold out"}
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-12 px-5"
              onClick={onBuyNow}
              disabled={!variant.inStock || isAdding}
            >
              <Zap className="size-4" />
              Buy now
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-12 w-12 p-0"
              aria-label={wl.ids.includes(product.id) ? "Remove from wishlist" : "Add to wishlist"}
              onClick={() => wl.toggle(product.id)}
            >
              <Heart className={cn("size-5", wl.ids.includes(product.id) && "fill-accent text-accent")} />
            </Button>
          </div>
        </div>
      </div>

      {/* Trust badges */}
      <div className="grid grid-cols-2 gap-2 rounded-xl border border-border/60 bg-card/40 p-4 shadow-sm">
        {trustItems.map(({ icon: Icon, text }) => (
          <div key={text} className="flex items-center gap-2.5">
            <div className="flex size-8 items-center justify-center rounded-lg bg-primary-light">
              <Icon className="size-4 text-primary" />
            </div>
            <span className="text-xs text-muted-foreground font-medium">{text}</span>
          </div>
        ))}
      </div>

      {/* Features */}
      <div>
        <div className="mb-3 text-xs uppercase tracking-[0.2em] text-muted-foreground">Key Features</div>
        <ul className="grid gap-2.5 sm:grid-cols-2">
          {product.features.map((f) => (
            <li key={f} className="flex items-start gap-2.5 text-sm text-foreground/85">
              <div className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/10">
                <Check className="size-3 text-primary" />
              </div>
              {f}
            </li>
          ))}
        </ul>
      </div>

      <Separator />

      {/* Specifications */}
      <div>
        <div className="mb-3 text-xs uppercase tracking-[0.2em] text-muted-foreground">Specifications</div>
        <div className="rounded-xl border border-border overflow-hidden">
          {product.specs.map((s, i) => (
            <div
              key={s.label}
              className={cn(
                "flex justify-between px-4 py-3 text-sm",
                i % 2 === 0 ? "bg-card/30" : "bg-transparent",
              )}
            >
              <span className="text-muted-foreground">{s.label}</span>
              <span className="font-medium">{s.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
