"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Flame, Sparkles } from "lucide-react";
import { getProducts } from "@/lib/api";
import type { Product } from "@/types/product";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function SpecialPromos() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const cards = Array.from(el.querySelectorAll(".promo-card"));
    gsap.set(cards, { y: 40, opacity: 0, scale: 0.97 });
    gsap.to(cards, {
      y: 0, opacity: 1, scale: 1, duration: 0.8, ease: "power3.out", stagger: 0.12,
      scrollTrigger: { trigger: el, start: "top 85%", once: true },
    });
  }, []);

  return (
    <section ref={ref} className="container-x py-16 md:py-24">
      <div className="grid gap-5 md:grid-cols-2">
        {/* Banner 1: Limited Reserve */}
        <div className="promo-card group relative overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-br from-card via-background to-primary/5">
          <div className="absolute right-0 top-0 size-80 rounded-full bg-primary/8 blur-[100px] transition-all duration-700 group-hover:bg-primary/12" />
          <div className="relative z-10 flex flex-col justify-between p-8 md:p-10 min-h-[320px]">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-primary">
                <Sparkles className="size-3" /> Limited Reserve
              </div>
              <h3 className="font-display text-3xl leading-tight tracking-tight md:text-4xl">
                Atelier Oak-Aged
                <br />
                <span className="text-primary">2026 Vintage</span>
              </h3>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
                Aged 120 days in French oak. Hand-numbered, limited to 500 units.
              </p>
            </div>
            <div className="mt-6 flex items-center justify-between">
              <Link
                href="/shop?category=e-liquids"
                className="group/btn inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/20 transition-all duration-300 hover:shadow-xl hover:shadow-primary/30"
              >
                Explore Reserve
                <ArrowRight className="size-4 transition-transform duration-300 group-hover/btn:translate-x-0.5" />
              </Link>
              <span className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground">
                248 / 500 left
              </span>
            </div>
          </div>
        </div>

        {/* Banner 2: Bundle */}
        <div className="promo-card group relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-card via-muted/20 to-background">
          <div className="absolute right-0 bottom-0 size-64 rounded-full bg-accent/8 blur-[80px] transition-all duration-700 group-hover:bg-accent/12" />
          <div className="relative z-10 flex flex-col justify-between p-8 md:p-10 min-h-[320px]">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
                <Flame className="size-3 text-amber-500" /> Bundle & Save
              </div>
              <h3 className="font-display text-3xl leading-tight tracking-tight md:text-4xl">
                The Connoisseur
                <br />
                Starter Suite
              </h3>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
                Obsidian Pro + 2 Reserve Liquids + Italian leather case. Complete set.
              </p>
            </div>
            <div className="mt-6 flex items-center justify-between">
              <Link
                href="/shop"
                className="group/btn inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-6 py-3 text-sm font-medium backdrop-blur-sm transition-all duration-300 hover:border-primary/40 hover:bg-card"
              >
                Claim offer
                <ArrowRight className="size-4 transition-transform duration-300 group-hover/btn:translate-x-0.5" />
              </Link>
              <span className="text-sm font-semibold text-primary">Save $95</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
