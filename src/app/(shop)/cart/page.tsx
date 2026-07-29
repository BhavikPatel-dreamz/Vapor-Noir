"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, X, Loader2, ShoppingBag, ArrowRight } from "lucide-react";
import { useCart } from "@/store/cart-store";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { formatPrice } from "@/lib/format";

export default function CartPage() {
  const { items, update, remove, removingItemId } = useCart();
  const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0);
  const currency = items[0]?.currency ?? "USD";
  const total = subtotal;

  if (items.length === 0) {
    return (
      <div className="bg-white">
        <div className="container-x flex min-h-[60vh] flex-col items-center justify-center gap-4 py-16 text-center">
          <div className="bg-[#E3F2FD] p-6 rounded-full">
            <ShoppingBag className="size-12 text-[#1565C0]" />
          </div>
          <h1 className="text-[28px] font-black text-[#1565C0]">Your Cart is Empty</h1>
          <p className="max-w-md text-muted-foreground">
            You haven&apos;t added anything yet. Browse our products and find something you love.
          </p>
          <Button asChild size="lg" className="mt-4"><Link href="/shop"><ShoppingBag className="size-4" /> Shop Now</Link></Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <div className="bg-gradient-to-r from-[#1565C0] to-[#0D47A1] border-b-4 border-[#FFC107]">
        <div className="container-x py-6">
          <h1 className="text-[28px] font-black text-white">Shopping Cart</h1>
          <p className="text-white/70 text-sm">{items.length} item{items.length !== 1 ? "s" : ""} in your cart</p>
        </div>
      </div>

      <div className="container-x py-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
          <ul className="divide-y-2 divide-border">
            {items.map((i) => (
              <li key={i.id} className="flex gap-4 py-5 sm:gap-5">
                <div className="relative size-20 shrink-0 overflow-hidden border-2 border-border bg-white sm:size-24">
                  <Image src={i.image} alt={i.name} fill sizes="96px" className="object-contain p-1" />
                </div>
                <div className="flex min-w-0 flex-1 flex-col gap-2">
                  <div className="flex justify-between gap-3">
                    <div className="min-w-0">
                      <Link href={`/product/${i.slug}`} className="font-bold text-foreground hover:text-[#1565C0] transition-colors">
                        {i.name}
                      </Link>
                      <div className="text-xs text-muted-foreground">{i.variantName}</div>
                    </div>
                    <div className="shrink-0 text-right">
                      <div className="font-black text-[#D32F2F]">{formatPrice(i.price * i.quantity, i.currency)}</div>
                      <div className="text-xs text-muted-foreground">{formatPrice(i.price, i.currency)} each</div>
                    </div>
                  </div>
                  <div className="mt-auto flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center border-2 border-border">
                      <button className="p-2 hover:bg-[#E3F2FD] transition-colors" onClick={() => update(i.id, i.quantity - 1)} aria-label="Decrease"><Minus className="size-3.5" /></button>
                      <div className="w-10 text-center text-sm font-bold tabular-nums border-x-2 border-border">{i.quantity}</div>
                      <button className="p-2 hover:bg-[#E3F2FD] transition-colors" onClick={() => update(i.id, i.quantity + 1)} aria-label="Increase"><Plus className="size-3.5" /></button>
                    </div>
                    <button className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-[#D32F2F] disabled:opacity-50 font-bold" onClick={() => remove(i.id)} disabled={removingItemId === i.id}>
                      {removingItemId === i.id ? <Loader2 className="size-4 animate-spin" /> : <X className="size-4" />}
                      Remove
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <aside className="h-fit border-2 border-[#1565C0]/20 bg-[#E3F2FD] p-6 shadow-sm">
            <div className="text-sm font-black uppercase text-[#1565C0] mb-4 border-b-2 border-[#1565C0]/20 pb-3">Order Summary</div>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span className="font-bold">{formatPrice(subtotal, currency)}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Shipping</span><span className="text-[#2E7D32] font-bold">FREE</span></div>
            </div>
            <Separator className="my-4 bg-[#1565C0]/20" />
            <div className="flex items-baseline justify-between mb-6">
              <span className="font-black text-lg">Total</span>
              <span className="text-3xl font-black text-[#D32F2F]">{formatPrice(total, currency)}</span>
            </div>
            <Button asChild size="lg" className="w-full"><Link href="/checkout"><ShoppingBag className="size-4" /> Proceed to Checkout</Link></Button>
            <Button asChild variant="outline" className="mt-2 w-full"><Link href="/shop"><ArrowRight className="size-4" /> Continue Shopping</Link></Button>
          </aside>
        </div>
      </div>
    </div>
  );
}
