"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import { getCategories } from "@/lib/api";
import type { Category } from "@/types/product";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function Categories() {
  const ref = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [cats, setCats] = useState<Category[]>([]);

  useEffect(() => {
    getCategories().then(setCats).catch(() => {});
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el || cats.length === 0) return;

    const ctx = gsap.context(() => {
      if (headerRef.current) {
        const items = Array.from(headerRef.current!.children);
        gsap.set(items, { y: 20, opacity: 0 });
        gsap.to(items, {
          y: 0, opacity: 1, duration: 0.7, ease: "power3.out", stagger: 0.1,
          scrollTrigger: { trigger: headerRef.current, start: "top 85%", once: true },
        });
      }

      if (gridRef.current) {
        const cards = Array.from(gridRef.current!.children);
        gsap.set(cards, { y: 40, opacity: 0, scale: 0.97 });
        gsap.to(cards, {
          y: 0, opacity: 1, scale: 1, duration: 0.7, ease: "power3.out", stagger: 0.08,
          scrollTrigger: { trigger: gridRef.current, start: "top 85%", once: true },
        });
      }
    }, ref);

    return () => ctx.revert();
  }, [cats]);

  if (cats.length === 0) return null;

  return (
    <section ref={ref} className="container-x py-16 md:py-24">
      <div ref={headerRef} className="mb-10 flex items-end justify-between gap-6">
        <div>
          <div className="mb-2 text-[11px] uppercase tracking-[0.25em] text-muted-foreground">Browse by</div>
          <h2 className="font-display text-4xl tracking-tight md:text-5xl">Collections</h2>
        </div>
        <Link href="/shop" className="hidden text-sm text-primary hover:underline md:inline-flex items-center gap-1">
          View all <ArrowUpRight className="size-3.5" />
        </Link>
      </div>
      <div ref={gridRef} className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {cats.map((c, i) => (
          <Link
            key={c.id}
            href={`/shop?category=${c.slug}`}
            className={`group relative overflow-hidden rounded-2xl bg-muted ${
              i === 0 ? "md:col-span-2 md:row-span-2 aspect-square md:aspect-auto" : "aspect-[4/5]"
            }`}
          >
            {c.image ? (
              <Image
                src={c.image}
                alt={c.name}
                fill
                sizes={i === 0 ? "(min-width: 768px) 50vw, 100vw" : "(min-width: 1024px) 25vw, 50vw"}
                className="object-cover transition-all duration-700 ease-out group-hover:scale-105 group-hover:brightness-110"
              />
            ) : null}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <div className={`font-display ${i === 0 ? "text-3xl md:text-4xl" : "text-2xl"}`}>
                    {c.name}
                  </div>
                  {c.description && (
                    <p className="mt-1 line-clamp-2 max-w-[200px] text-xs text-white/60">{c.description}</p>
                  )}
                </div>
                <div className="flex size-9 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-sm transition-all duration-300 group-hover:bg-primary group-hover:border-primary group-hover:scale-110">
                  <ArrowUpRight className="size-4 text-white transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
