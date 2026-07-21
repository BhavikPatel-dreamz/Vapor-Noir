"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Product } from "@/types/product";

export function Hero({ product }: { product?: Product | null }) {
  const img = product?.images?.[0] || "";
  const price = product ? `$${product.price}` : "";
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="absolute inset-0 -z-10">
        {img ? (
          <Image
            src={img}
            alt=""
            fill
            priority
            className="object-cover opacity-40"
          />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/70 to-background" />
      </div>
      <div className="container-x grid min-h-[60vh] items-center gap-8 py-16 md:min-h-[86vh] md:gap-12 md:py-24 lg:grid-cols-2">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-muted-foreground backdrop-blur">
              <span className="size-1.5 rounded-full bg-primary" /> New Collection · 2026
            </div>
            <h1 className="font-display text-4xl leading-[0.95] tracking-tight md:text-7xl lg:text-[5.5rem]">
              Vapor,<br />refined to<br />an <span className="italic text-primary">art form.</span>
            </h1>
            <p className="mt-6 max-w-lg text-base text-muted-foreground md:text-lg">
              Premium materials. Small-batch flavors. Devices engineered like Swiss
              timepieces — for the enthusiast who notices the difference.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link href="/shop">Shop the collection <ArrowRight /></Link>
              </Button>
              {product && (
                <Button asChild size="lg" variant="outline">
                  <Link href={`/product/${product.slug}`}>Meet {product.name}</Link>
                </Button>
              )}
            </div>
            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-xs uppercase tracking-[0.2em] text-muted-foreground">
              <span>3-year warranty</span>
              <span>Free shipping over $75</span>
              <span>Handmade in EU</span>
            </div>
          </motion.div>
        </div>
        {product && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative hidden aspect-[4/5] lg:block"
          >
            <div className="absolute inset-0 rounded-2xl border border-border bg-card/40 backdrop-blur" />
            <Image
              src={img}
              alt={product.name}
              fill
              className="rounded-2xl object-cover"
              sizes="600px"
            />
            <div className="absolute -bottom-6 -left-6 rounded-lg border border-border bg-card p-4 shadow-xl">
              <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Featured</div>
              <div className="font-display text-xl">{product.name}</div>
              {price && <div className="text-sm text-primary">{price}</div>}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
