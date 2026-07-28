"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function ShopPageClient() {
  const headerRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headerRef.current) {
        const children = Array.from(headerRef.current!.children);
        gsap.set(children, { y: 30, opacity: 0 });
        gsap.to(children, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.12,
        });
      }

      if (statsRef.current) {
        const items = Array.from(statsRef.current!.children);
        gsap.set(items, { y: 20, opacity: 0 });
        gsap.to(items, {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.08,
          delay: 0.4,
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return { headerRef, statsRef };
}

export function ShopProductsGrid() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = gridRef.current;
    if (!el) return;

    const children = Array.from(el.children);
    if (children.length === 0) return;

    gsap.set(children, { y: 50, opacity: 0, scale: 0.97 });

    const tween = gsap.to(children, {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 0.65,
      ease: "power3.out",
      stagger: {
        each: 0.07,
        from: "start",
      },
      scrollTrigger: {
        trigger: el,
        start: "top 88%",
        once: true,
      },
    });

    return () => {
      tween.kill();
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === el) st.kill();
      });
    };
  }, []);

  return gridRef;
}
