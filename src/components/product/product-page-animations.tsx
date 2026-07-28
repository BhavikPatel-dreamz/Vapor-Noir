"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function ProductPageAnimations() {
  const galleryRef = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
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
          stagger: 0.08,
          delay: 0.3,
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return { galleryRef, detailsRef };
}

export function RelatedProductsAnimation() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

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
            start: "top 85%",
            once: true,
          },
        });
      }

      if (grid) {
        const cards = Array.from(grid.children);
        gsap.set(cards, { y: 40, opacity: 0, scale: 0.96 });
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

    return () => {
      ctx.revert();
    };
  }, []);

  return sectionRef;
}

export function ProductBreadcrumbs() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    gsap.set(ref.current, { y: -10, opacity: 0 });
    gsap.to(ref.current, {
      y: 0,
      opacity: 1,
      duration: 0.5,
      ease: "power2.out",
      delay: 0.1,
    });
  }, []);

  return ref;
}
