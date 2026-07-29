"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Minus, Plus, ShoppingBag, Heart, Check, Loader2, Truck, Shield, RotateCcw, Award, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Rating } from "@/components/ui/rating";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { formatPrice } from "@/lib/format";
import { cn } from "@/lib/utils";
import { useCart } from "@/store/cart-store";
import { useWishlist } from "@/store/wishlist-store";
import type { Product } from "@/types/product";

export function ProductDetails({ product }: { product: Product }) {
  const [variantId, setVariantId] = useState(product.variants[0].id);
  const [qty, setQty] = useState(1);
  const add = useCart((s) => s.add);
  const addingVariantId = useCart((s) => s.addingVariantId);
  const wl = useWishlist();
  const router = useRouter();

  const variant = product.variants.find((v) => v.id === variantId) ?? product.variants[0];
  const isAdding = addingVariantId === variant.id;
  const savings = product.compareAtPrice ? product.compareAtPrice - variant.price : 0;

  const onAdd = () => {
    if (!variant.inStock || isAdding) return;
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
    { icon: Truck, text: "Free shipping over $75", color: "#1565C0", bg: "#E3F2FD" },
    { icon: Shield, text: "3-year warranty", color: "#2E7D32", bg: "#E8F5E9" },
    { icon: RotateCcw, text: "30-day returns", color: "#F57C00", bg: "#FFF3E0" },
    { icon: Award, text: "Authentic guarantee", color: "#D32F2F", bg: "#FFEBEE" },
  ];

  return (
    <div className="flex flex-col gap-5">
      {/* Badges + Title */}
      <div>
        <div className="flex flex-wrap items-center gap-2 mb-2">
          {product.new && <Badge variant="new">New</Badge>}
          {product.bestseller && <Badge variant="gold">Best Seller</Badge>}
          {product.compareAtPrice && <Badge variant="sale">Sale</Badge>}
        </div>
        <h1 className="text-[30px] font-black text-[#1565C0] leading-tight">
          {product.name}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">{product.tagline}</p>
        <div className="mt-2">
          <Rating value={product.rating} count={product.reviewCount} />
        </div>
      </div>

      {/* Price */}
      <div className="flex items-baseline gap-3 flex-wrap">
        <div className={cn("text-3xl font-black", product.compareAtPrice ? "text-[#D32F2F]" : "text-foreground")}>
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
            {savings > 0 && (
              <Badge variant="gold">Save ${savings}</Badge>
            )}
          </>
        )}
      </div>

      {/* Description */}
      <p className="text-sm leading-relaxed text-foreground/80">{product.longDescription}</p>

      <Separator />

      {/* Variants */}
      <div>
        <div className="mb-2 text-xs font-bold uppercase tracking-wide text-[#1565C0]">
          {product.category === "e-liquids" ? "Strength" : "Finish"}
        </div>
        <div className="flex flex-wrap gap-2">
          {product.variants.map((v) => (
            <button
              key={v.id}
              disabled={!v.inStock}
              onClick={() => setVariantId(v.id)}
              className={cn(
                "border-2 px-5 py-2.5 text-sm font-bold transition-all duration-200 rounded-sm",
                v.id === variantId
                  ? "border-[#1565C0] bg-[#1565C0] text-white"
                  : "border-border hover:border-[#1565C0] hover:text-[#1565C0]",
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
          <div className="flex items-center border-2 border-border">
            <button aria-label="Decrease" onClick={() => setQty(Math.max(1, qty - 1))} className="p-3 hover:bg-[#E3F2FD] transition-colors">
              <Minus className="size-4 text-[#1565C0]" />
            </button>
            <div className="w-12 text-center text-sm font-bold tabular-nums border-x-2 border-border">{qty}</div>
            <button aria-label="Increase" onClick={() => setQty(qty + 1)} className="p-3 hover:bg-[#E3F2FD] transition-colors">
              <Plus className="size-4 text-[#1565C0]" />
            </button>
          </div>

          <div className="flex flex-1 gap-2">
            <Button
              size="lg"
              className="flex-1 h-12 text-sm font-bold uppercase"
              onClick={onAdd}
              disabled={!variant.inStock || isAdding}
            >
              {isAdding ? <Loader2 className="size-5 animate-spin" /> : <ShoppingBag />}
              {isAdding ? "Adding..." : variant.inStock ? "Add to Cart" : "Sold Out"}
            </Button>
            <Button
              variant="secondary"
              className="h-12 px-4 text-sm font-bold uppercase"
              onClick={onBuyNow}
              disabled={!variant.inStock || isAdding}
            >
              Buy Now
            </Button>
            <Button
              variant="outline"
              className="h-12 w-12 p-0"
              aria-label={wl.ids.includes(product.id) ? "Remove from wishlist" : "Add to wishlist"}
              onClick={() => wl.toggle(product.id)}
            >
              <Heart className={cn("size-5", wl.ids.includes(product.id) && "fill-[#D32F2F] text-[#D32F2F]")} />
            </Button>
          </div>
        </div>
      </div>

      {/* Trust badges */}
      <div className="grid grid-cols-2 gap-3">
        {trustItems.map(({ icon: Icon, text, color, bg }) => (
          <div key={text} className="flex items-center gap-2.5 p-3" style={{ backgroundColor: bg }}>
            <div className="flex size-9 items-center justify-center" style={{ backgroundColor: color, color: "white" }}>
              <Icon className="size-4" />
            </div>
            <span className="text-xs font-bold" style={{ color }}>{text}</span>
          </div>
        ))}
      </div>

      {/* Features */}
      <div>
        <div className="mb-2 text-xs font-bold uppercase tracking-wide text-[#1565C0]">Key Features</div>
        <ul className="grid gap-2 sm:grid-cols-2">
          {product.features.map((f) => (
            <li key={f} className="flex items-start gap-2 text-sm text-foreground/85">
              <div className="mt-0.5 flex size-5 shrink-0 items-center justify-center bg-[#E8F5E9]">
                <Check className="size-3 text-[#2E7D32]" />
              </div>
              {f}
            </li>
          ))}
        </ul>
      </div>

      <Separator />

      {/* Specifications */}
      <div>
        <div className="mb-2 text-xs font-bold uppercase tracking-wide text-[#1565C0]">Specifications</div>
        <div className="border-2 border-border">
          {product.specs.map((s, i) => (
            <div
              key={s.label}
              className={cn(
                "flex justify-between px-4 py-3 text-sm",
                i % 2 === 0 ? "bg-[#E3F2FD]" : "bg-white",
              )}
            >
              <span className="text-muted-foreground font-medium">{s.label}</span>
              <span className="font-bold text-foreground">{s.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
