"use client";

import Image from "next/image";
import Link from "next/link";
import { X, Minus, Plus, ShoppingBag, Loader2, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/store/cart-store";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/format";
import { Separator } from "@/components/ui/separator";

export function CartDrawer() {
  const { isOpen, close, items, update, remove, removingItemId } = useCart();
  const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0);
  const currency = items[0]?.currency ?? "USD";

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60"
            onClick={close}
          />
          <motion.aside
            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 260 }}
            className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-white"
          >
            <div className="flex items-center justify-between border-b-2 border-[#1565C0] px-6 py-4">
              <div className="text-lg font-black text-[#1565C0]">🛒 Shopping Cart</div>
              <button onClick={close} aria-label="Close" className="p-2 hover:bg-[#FFEBEE] transition-colors text-muted-foreground hover:text-[#D32F2F]">
                <X className="size-5" />
              </button>
            </div>

            {items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
                <div className="bg-[#E3F2FD] p-5 rounded-full">
                  <ShoppingBag className="size-10 text-[#1565C0]" />
                </div>
                <div>
                  <div className="text-lg font-black text-[#1565C0]">Your cart is empty</div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Add some products to get started.
                  </p>
                </div>
                <Button asChild onClick={close}>
                  <Link href="/shop"><ShoppingBag className="size-4" /> Shop Now</Link>
                </Button>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto px-6 py-4">
                  <ul className="divide-y-2 divide-border">
                    {items.map((i) => (
                      <li key={i.id} className="flex gap-4 py-4">
                        <div className="relative size-20 shrink-0 overflow-hidden border-2 border-border bg-white">
                          <Image src={i.image} alt={i.name} fill sizes="80px" className="object-contain p-1" />
                        </div>
                        <div className="flex flex-1 flex-col">
                          <div className="flex justify-between gap-3">
                            <div>
                              <div className="text-sm font-bold text-foreground">{i.name}</div>
                              <div className="text-xs text-muted-foreground">{i.variantName}</div>
                            </div>
                            <div className="text-sm font-black text-[#D32F2F]">{formatPrice(i.price * i.quantity, i.currency)}</div>
                          </div>
                          <div className="mt-auto flex items-center justify-between">
                            <div className="flex items-center border-2 border-border">
                              <button className="p-1.5 hover:bg-[#E3F2FD] transition-colors" onClick={() => update(i.id, i.quantity - 1)} aria-label="Decrease">
                                <Minus className="size-3" />
                              </button>
                              <div className="w-8 text-center text-xs font-bold tabular-nums border-x-2 border-border">{i.quantity}</div>
                              <button className="p-1.5 hover:bg-[#E3F2FD] transition-colors" onClick={() => update(i.id, i.quantity + 1)} aria-label="Increase">
                                <Plus className="size-3" />
                              </button>
                            </div>
                            <button className="inline-flex items-center gap-1 text-xs font-bold text-muted-foreground hover:text-[#D32F2F] disabled:opacity-50 transition-colors" onClick={() => remove(i.id)} disabled={removingItemId === i.id}>
                              {removingItemId === i.id ? <Loader2 className="size-3 animate-spin" /> : null}
                              Remove
                            </button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="border-t-2 border-[#1565C0]/20 px-6 py-5 bg-[#E3F2FD]">
                  <div className="mb-2 flex justify-between text-sm text-muted-foreground">
                    <span>Shipping</span><span className="text-[#2E7D32] font-bold">FREE over $75</span>
                  </div>
                  <div className="flex items-baseline justify-between">
                    <span className="text-sm font-black uppercase text-[#1565C0]">Subtotal</span>
                    <span className="text-2xl font-black text-[#D32F2F]">{formatPrice(subtotal, currency)}</span>
                  </div>
                  <Separator className="my-4 bg-[#1565C0]/20" />
                  <Button asChild size="lg" className="w-full" onClick={close}>
                    <Link href="/checkout"><ShoppingBag className="size-4" /> Proceed to Checkout</Link>
                  </Button>
                  <Button asChild variant="outline" className="mt-2 w-full" onClick={close}>
                    <Link href="/cart"><ArrowRight className="size-4" /> View Cart</Link>
                  </Button>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
