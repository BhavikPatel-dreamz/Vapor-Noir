"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, X, Loader2 } from "lucide-react";
import { useCart } from "@/store/cart-store";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { formatPrice } from "@/lib/format";

export default function CartPage() {
  const { items, update, remove, removingItemId } = useCart();
  const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0);
  const currency = items[0]?.currency ?? "USD";
  const shipping = subtotal > 75 || subtotal === 0 ? 0 : 8;
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <div className="container-x flex min-h-[60vh] flex-col items-center justify-center gap-4 py-16 md:py-24 text-center">
        <h1 className="font-display text-4xl">Your bag is empty</h1>
        <p className="max-w-md text-muted-foreground">
          You haven&apos;t added anything yet. Explore our latest devices and small-batch liquids.
        </p>
        <Button asChild size="lg" className="mt-4"><Link href="/shop">Shop the collection</Link></Button>
      </div>
    );
  }

  return (
    <div className="container-x py-14">
      <h1 className="mb-10 font-display text-4xl tracking-tight md:text-5xl lg:text-6xl">Your bag</h1>
      <div className="grid gap-10 lg:grid-cols-[1fr_400px]">
        <ul className="divide-y divide-border">
          {items.map((i) => (
            <li key={i.id} className="flex gap-4 py-6 sm:gap-5">
              <div className="relative size-16 shrink-0 overflow-hidden rounded-md bg-muted sm:size-20 md:size-28">
                <Image src={i.image} alt={i.name} fill sizes="120px" className="object-cover" />
              </div>
              <div className="flex min-w-0 flex-1 flex-col gap-2">
                <div className="flex justify-between gap-3">
                  <div className="min-w-0">
                    <Link href={`/product/${i.slug}`} className="font-display text-lg hover:text-primary sm:text-xl">
                      {i.name}
                    </Link>
                    <div className="text-xs text-muted-foreground sm:text-sm">{i.variantName}</div>
                  </div>
                  <div className="shrink-0 text-right">
                    <div className="font-medium">{formatPrice(i.price * i.quantity, i.currency)}</div>
                    <div className="text-xs text-muted-foreground">{formatPrice(i.price, i.currency)} each</div>
                  </div>
                </div>
                <div className="mt-auto flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center rounded-md border border-border">
                    <button className="p-2" onClick={() => update(i.id, i.quantity - 1)} aria-label="Decrease"><Minus className="size-3.5" /></button>
                    <div className="w-10 text-center text-sm tabular-nums">{i.quantity}</div>
                    <button className="p-2" onClick={() => update(i.id, i.quantity + 1)} aria-label="Increase"><Plus className="size-3.5" /></button>
                  </div>
                  <button className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-accent disabled:opacity-50" onClick={() => remove(i.id)} disabled={removingItemId === i.id}>
                    {removingItemId === i.id ? <Loader2 className="size-4 animate-spin" /> : <X className="size-4" />}
                    Remove
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <aside className="h-fit rounded-xl border border-border bg-card p-6">
          <div className="mb-2 text-[11px] uppercase tracking-[0.2em] text-muted-foreground">Order summary</div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span>Subtotal</span><span>{formatPrice(subtotal, currency)}</span></div>
            <div className="flex justify-between"><span>Shipping</span><span>{shipping === 0 ? "Free" : formatPrice(shipping, currency)}</span></div>
          </div>
          <Separator className="my-4" />
          <div className="flex items-baseline justify-between">
            <span>Total</span>
            <span className="font-display text-2xl">{formatPrice(total, currency)}</span>
          </div>
          <Button asChild size="lg" className="mt-6 w-full"><Link href="/checkout">Checkout</Link></Button>
          <Button asChild variant="ghost" className="mt-2 w-full"><Link href="/shop">Continue shopping</Link></Button>
        </aside>
      </div>
    </div>
  );
}
