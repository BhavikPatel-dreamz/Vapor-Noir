"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import type { Product } from "@/types/product";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function EditorialSplit({ product }: { product: Product | null }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const image = el.querySelector(".editorial-image");
    const content = el.querySelector(".editorial-content");
    const items = content ? Array.from(content.children) : [];

    const ctx = gsap.context(() => {
      if (image) {
        gsap.set(image, { scale: 1.05, opacity: 0 });
        gsap.to(image, {
          scale: 1, opacity: 1, duration: 1.2, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 80%", once: true },
        });
      }
      if (items.length > 0) {
        gsap.set(items, { y: 25, opacity: 0 });
        gsap.to(items, {
          y: 0, opacity: 1, duration: 0.7, ease: "power3.out", stagger: 0.1, delay: 0.2,
          scrollTrigger: { trigger: el, start: "top 80%", once: true },
        });
      }
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section className="container-x py-16 md:py-24">
      <div className="grid overflow-hidden rounded-3xl border border-border/60 bg-card/20 lg:grid-cols-[1.1fr_1fr]">
        <div ref={ref} className="editorial-image relative aspect-[4/3] min-h-[280px] overflow-hidden lg:aspect-auto lg:min-h-[460px]">
          {product?.images?.[0] ? (
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover transition-transform duration-700 hover:scale-105"
            />
          ) : null}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/10" />
        </div>
        <div className="editorial-content flex flex-col justify-center gap-4 bg-card/40 p-8 backdrop-blur-sm md:p-12 lg:p-16">
          {product && (
            <>
              <div className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
                {product.name}
              </div>
              <h2 className="font-display text-2xl leading-tight tracking-tight md:text-4xl lg:text-5xl">
                {product.tagline || "Discover quality."}
              </h2>
              <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
                {product.description || "Premium products crafted for the enthusiast."}
              </p>
              <div className="pt-3">
                <Link
                  href={`/product/${product.slug}`}
                  className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/20 transition-all duration-300 hover:shadow-xl"
                >
                  Explore {product.name}
                  <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
