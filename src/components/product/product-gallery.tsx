"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function ProductGallery({ images, alt }: { images: string[]; alt: string }) {
  const [active, setActive] = useState(0);
  const mainRef = useRef<HTMLDivElement>(null);
  const thumbsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (mainRef.current) {
        gsap.set(mainRef.current, { scale: 0.95, opacity: 0 });
        gsap.to(mainRef.current, {
          scale: 1,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          delay: 0.2,
        });
      }
      if (thumbsRef.current) {
        const thumbs = Array.from(thumbsRef.current!.children);
        gsap.set(thumbs, { x: -20, opacity: 0 });
        gsap.to(thumbs, {
          x: 0,
          opacity: 1,
          duration: 0.5,
          ease: "power3.out",
          stagger: 0.08,
          delay: 0.4,
        });
      }
    });

    return () => ctx.revert();
  }, []);

  const handleThumbClick = (i: number) => {
    setActive(i);
    if (mainRef.current) {
      const img = mainRef.current.querySelector("img");
      if (img) {
        gsap.fromTo(img, { scale: 1.05, opacity: 0.6 }, { scale: 1, opacity: 1, duration: 0.5, ease: "power2.out" });
      }
    }
  };

  return (
    <div className="grid gap-4 md:grid-cols-[80px_1fr]">
      <div ref={thumbsRef} className="order-2 flex gap-3 overflow-x-auto md:order-1 md:flex-col">
        {images.map((src, i) => (
          <button
            key={src}
            onClick={() => handleThumbClick(i)}
            className={`relative aspect-square w-20 shrink-0 overflow-hidden rounded-lg border-2 transition-all duration-300 ${
              i === active
                ? "border-primary shadow-lg shadow-primary/20"
                : "border-border hover:border-primary/40 opacity-60 hover:opacity-100"
            }`}
          >
            <Image src={src} alt="" fill sizes="80px" className="object-cover" />
          </button>
        ))}
      </div>
      <div ref={mainRef} className="relative order-1 aspect-[4/5] overflow-hidden rounded-2xl bg-muted md:order-2">
        <Image
          src={images[active]}
          alt={alt}
          fill
          priority
          sizes="(min-width: 768px) 60vw, 100vw"
          className="object-cover transition-transform duration-700"
        />

        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent pointer-events-none" />

        {/* Image counter */}
        <div className="absolute bottom-4 left-4 rounded-full bg-background/70 px-3 py-1 text-xs backdrop-blur-md">
          {active + 1} / {images.length}
        </div>

        {/* Navigation arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={() => handleThumbClick(active > 0 ? active - 1 : images.length - 1)}
              className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-background/70 p-2 backdrop-blur-md transition-all duration-200 hover:bg-background hover:scale-110 opacity-0 group-hover:opacity-100"
              aria-label="Previous image"
            >
              <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => handleThumbClick(active < images.length - 1 ? active + 1 : 0)}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-background/70 p-2 backdrop-blur-md transition-all duration-200 hover:bg-background hover:scale-110 opacity-0 group-hover:opacity-100"
              aria-label="Next image"
            >
              <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}
      </div>
    </div>
  );
}
