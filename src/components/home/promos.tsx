"use client";

import Link from "next/link";
import { ArrowRight, Flame, ShieldAlert, Sparkles, Award } from "lucide-react";
import { Button } from "@/components/ui/button";

export function SpecialPromos() {
  return (
    <section className="container-x py-16 md:py-24">
      <div className="grid gap-6 md:grid-cols-2">
        {/* Banner 1: Limited Collector's Edition */}
        <div className="group relative overflow-hidden rounded-2xl border border-primary/30 bg-gradient-to-br from-card via-background to-primary/10 p-8 md:p-12">
          <div className="absolute right-0 top-0 -mr-16 -mt-16 size-64 rounded-full bg-primary/10 blur-3xl group-hover:bg-primary/20 transition-all duration-700" />
          <div className="relative z-10">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-primary">
              <Sparkles className="size-3" /> Limited Reserve Batch
            </div>
            <h3 className="font-display text-3xl md:text-4xl tracking-tight">
              Atelier Oak-Aged <br /><span className="text-primary">2026 Vintage Series</span>
            </h3>
            <p className="mt-3 max-w-sm text-sm text-muted-foreground">
              Aged for 120 days in French oak barrels. Hand-numbered bottles, limited to 500 units worldwide.
            </p>
            <div className="mt-6 flex items-center gap-4">
              <Button asChild size="lg" className="shadow-lg shadow-primary/20">
                <Link href="/shop?category=e-liquids">
                  Explore Reserve <ArrowRight className="ml-2 size-4" />
                </Link>
              </Button>
              <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest">
                248 / 500 Left
              </span>
            </div>
          </div>
        </div>

        {/* Banner 2: Starter Kit / Bundle & Save */}
        <div className="group relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-card via-muted/30 to-background p-8 md:p-12">
          <div className="relative z-10">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              <Flame className="size-3 text-amber-500" /> Bundle & Save 25%
            </div>
            <h3 className="font-display text-3xl md:text-4xl tracking-tight">
              The Connoisseur <br />Starter Suite
            </h3>
            <p className="mt-3 max-w-sm text-sm text-muted-foreground">
              Get the Obsidian Pro, 2 Reserve Liquids, and custom Italian leather case at an exclusive package price.
            </p>
            <div className="mt-6 flex items-center gap-4">
              <Button asChild size="lg" variant="outline">
                <Link href="/shop">
                  Claim Suite Offer <ArrowRight className="ml-2 size-4" />
                </Link>
              </Button>
              <span className="text-sm font-semibold text-primary">
                Save $95 Today
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
