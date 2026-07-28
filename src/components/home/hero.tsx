"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { Product } from "@/types/product";

export function Hero({ product }: { product?: Product | null }) {
  const img = product?.images?.[0] || "";
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const priceCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      if (badgeRef.current) {
        gsap.set(badgeRef.current, { y: 15, opacity: 0 });
        tl.to(badgeRef.current, { y: 0, opacity: 1, duration: 0.6 }, 0.2);
      }

      if (textRef.current) {
        const lines = textRef.current.querySelectorAll(".hero-line");
        gsap.set(lines, { y: 70, opacity: 0, rotateX: 15 });
        tl.to(lines, {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 1,
          stagger: 0.12,
        }, 0.3);
      }

      if (ctaRef.current) {
        const items = Array.from(ctaRef.current!.children);
        gsap.set(items, { y: 20, opacity: 0 });
        tl.to(items, { y: 0, opacity: 1, duration: 0.6, stagger: 0.1 }, 0.9);
      }

      if (metaRef.current) {
        gsap.set(metaRef.current, { opacity: 0 });
        tl.to(metaRef.current, { opacity: 1, duration: 0.8 }, 1.1);
      }

      if (imageRef.current) {
        gsap.set(imageRef.current, { scale: 1.08, opacity: 0, x: 30 });
        tl.to(imageRef.current, {
          scale: 1,
          opacity: 1,
          x: 0,
          duration: 1.2,
          ease: "power3.out",
        }, 0.4);
      }

      if (priceCardRef.current) {
        gsap.set(priceCardRef.current, { y: 30, opacity: 0, scale: 0.95 });
        tl.to(priceCardRef.current, {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "back.out(1.4)",
        }, 1);
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden">
      {/* Background image with heavy overlay */}
      <div className="absolute inset-0 -z-10">
        {img ? (
          <Image
            src={img}
            alt=""
            fill
            priority
            className="object-cover opacity-[0.25] scale-105"
          />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-background/80" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_70%_40%,oklch(0.82_0.14_78/0.06),transparent_70%)]" />
      </div>

      <div className="container-x grid min-h-[70vh] items-center gap-8 py-20 md:min-h-[88vh] md:gap-16 md:py-28 lg:grid-cols-[1fr_1.1fr]">
        {/* Left: Text content */}
        <div className="relative z-10">
          <div ref={badgeRef}>
            <div className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-border/60 bg-card/50 px-4 py-1.5 text-[11px] uppercase tracking-[0.2em] text-muted-foreground backdrop-blur-md">
              <span className="size-1.5 animate-pulse rounded-full bg-primary" />
              New Collection · 2026
            </div>
          </div>

          <div ref={textRef} style={{ perspective: "600px" }}>
            <h1 className="font-display text-[2.75rem] leading-[0.92] tracking-tight md:text-6xl lg:text-[5.2rem] xl:text-[6rem]">
              <span className="hero-line block">Vapor,</span>
              <span className="hero-line block">refined to</span>
              <span className="hero-line block">
                an{" "}
                <span className="relative italic text-primary">
                  art form.
                  <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none">
                    <path d="M2 8.5C40 2.5 80 2 100 4C120 6 160 9 198 5" stroke="oklch(0.82 0.14 78)" strokeWidth="2.5" strokeLinecap="round" opacity="0.5" />
                  </svg>
                </span>
              </span>
            </h1>
          </div>

          <p className="mt-7 max-w-md text-[15px] leading-relaxed text-muted-foreground md:text-base">
            Premium materials. Small-batch flavors. Devices engineered like
            Swiss timepieces — for the enthusiast who notices the difference.
          </p>

          <div ref={ctaRef} className="mt-9 flex flex-wrap items-center gap-3">
            <Link
              href="/shop"
              className="group inline-flex items-center gap-2.5 rounded-full bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/20 transition-all duration-300 hover:shadow-xl hover:shadow-primary/30 hover:scale-[1.02]"
            >
              Shop the collection
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            {product && (
              <Link
                href={`/product/${product.slug}`}
                className="group inline-flex items-center gap-2 rounded-full border border-border bg-card/40 px-6 py-3.5 text-sm font-medium backdrop-blur-sm transition-all duration-300 hover:border-primary/40 hover:bg-card/60"
              >
                Meet {product.name}
                <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            )}
          </div>

          <div ref={metaRef} className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3">
            {[
              { num: "3yr", label: "Warranty" },
              { num: "$75+", label: "Free shipping" },
              { num: "EU", label: "Handmade" },
            ].map((item) => (
              <div key={item.label} className="flex items-baseline gap-1.5">
                <span className="text-sm font-medium text-foreground">{item.num}</span>
                <span className="text-[11px] uppercase tracking-[0.15em] text-muted-foreground">{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Product image */}
        {product && (
          <div ref={imageRef} className="relative hidden lg:block">
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl">
              <Image
                src={img}
                alt={product.name}
                fill
                className="object-cover"
                sizes="600px"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
            </div>

            {/* Floating price card */}
            <div
              ref={priceCardRef}
              className="absolute -bottom-5 -left-5 rounded-2xl border border-border/60 bg-card/80 p-5 shadow-2xl backdrop-blur-xl"
            >
              <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Featured</div>
              <div className="mt-1 font-display text-lg">{product.name}</div>
              <div className="mt-1 text-sm font-medium text-primary">${product.price}</div>
            </div>

            {/* Floating badge */}
            <div className="absolute -right-3 top-8 rounded-xl border border-border/60 bg-card/80 px-4 py-2.5 shadow-xl backdrop-blur-xl">
              <div className="flex items-center gap-2">
                <div className="size-2 rounded-full bg-primary animate-pulse" />
                <span className="text-[10px] font-medium uppercase tracking-wider">In Stock</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
