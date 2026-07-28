"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronRight, Package, Sparkles } from "lucide-react";
import { ProductGallery } from "@/components/product/product-gallery";
import { ProductDetails } from "@/components/product/product-details";
import { ProductCard } from "@/components/product/product-card";
import type { Product } from "@/types/product";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function ProductPageContent({
  product,
  related,
}: {
  product: Product;
  related: Product[];
}) {
  const galleryRef = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);
  const relatedSectionRef = useRef<HTMLDivElement>(null);
  const breadcrumbRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (breadcrumbRef.current) {
        gsap.set(breadcrumbRef.current, { y: -10, opacity: 0 });
        gsap.to(breadcrumbRef.current, {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
          delay: 0.1,
        });
      }

      if (galleryRef.current) {
        gsap.set(galleryRef.current, { x: -40, opacity: 0 });
        gsap.to(galleryRef.current, {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          delay: 0.15,
        });
      }

      if (detailsRef.current) {
        const children = Array.from(detailsRef.current!.children);
        gsap.set(children, { y: 30, opacity: 0 });
        gsap.to(children, {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.07,
          delay: 0.3,
        });
      }
    });

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const el = relatedSectionRef.current;
    if (!el || related.length === 0) return;

    const header = el.querySelector(".related-header");
    const grid = el.querySelector(".related-grid");

    const ctx = gsap.context(() => {
      if (header) {
        gsap.set(header, { y: 30, opacity: 0 });
        gsap.to(header, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 82%",
            once: true,
          },
        });
      }

      if (grid) {
        const cards = Array.from(grid.children);
        gsap.set(cards, { y: 50, opacity: 0, scale: 0.96 });
        gsap.to(cards, {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.65,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: grid,
            start: "top 88%",
            once: true,
          },
        });
      }
    }, el);

    return () => ctx.revert();
  }, [related]);

  const categoryName = product.category.replace(/-/g, " ");

  return (
    <>
      {/* Breadcrumb */}
      <div className="container-x pt-6 pb-2">
        <nav ref={breadcrumbRef} className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
          <ChevronRight className="size-3" />
          <Link href="/shop" className="hover:text-foreground transition-colors">Shop</Link>
          <ChevronRight className="size-3" />
          <Link href={`/shop?category=${product.category}`} className="hover:text-foreground transition-colors capitalize">
            {categoryName}
          </Link>
          <ChevronRight className="size-3" />
          <span className="text-foreground truncate max-w-[200px]">{product.name}</span>
        </nav>
      </div>

      {/* Main Product Section */}
      <section className="relative container-x py-6 md:py-10 product-hero-gradient">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div ref={galleryRef}>
            <ProductGallery images={product.images} alt={product.name} />
          </div>
          <div ref={detailsRef}>
            <ProductDetails product={product} />
          </div>
        </div>
      </section>

      {/* Related Products */}
      {related.length > 0 && (
        <section ref={relatedSectionRef} className="container-x py-16 md:py-20">
          <div className="related-header mb-10">
            <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
              <Sparkles className="size-3.5 text-primary" />
              You may also like
            </div>
            <h2 className="mt-2 font-display text-3xl tracking-tight md:text-4xl">
              More from{" "}
              <span className="text-primary capitalize">{categoryName}</span>
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Discover more premium picks from this collection.
            </p>
          </div>
          <div className="related-grid grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        </section>
      )}

      {/* Bottom trust bar */}
      <section className="border-t border-border bg-card/30">
        <div className="container-x py-8">
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-4 text-xs uppercase tracking-[0.2em] text-muted-foreground">
            <span className="flex items-center gap-2">
              <Package className="size-4 text-primary" />
              Secure packaging
            </span>
            <span className="flex items-center gap-2">
              <svg className="size-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Secure checkout
            </span>
            <span className="flex items-center gap-2">
              <svg className="size-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
              Secure payment
            </span>
          </div>
        </div>
      </section>
    </>
  );
}
