"use client";

import { Instagram } from "lucide-react";
import Image from "next/image";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const feedImages = [
  { id: 1, url: "/images/generated/community_shot_1_1785229249506.jpg", handle: "@vapornoir_official" },
  { id: 2, url: "/images/generated/community_shot_2_1785229268515.jpg", handle: "@vape_connoisseur" },
  { id: 3, url: "/images/generated/community_shot_3_1785229287427.jpg", handle: "@nordic_edits" },
  { id: 4, url: "/images/generated/blog_temperature_guide_1785229088200.jpg", handle: "@atelier_craft" },
];

export function InstagramGallery() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const header = el.querySelector(".ig-header");
    const images = Array.from(el.querySelectorAll(".ig-image"));

    const ctx = gsap.context(() => {
      if (header) {
        gsap.set(header, { y: 20, opacity: 0 });
        gsap.to(header, {
          y: 0, opacity: 1, duration: 0.7, ease: "power3.out",
          scrollTrigger: { trigger: header, start: "top 85%", once: true },
        });
      }
      if (images.length > 0) {
        gsap.set(images, { y: 30, opacity: 0, scale: 0.95 });
        gsap.to(images, {
          y: 0, opacity: 1, scale: 1, duration: 0.6, ease: "power3.out", stagger: 0.08,
          scrollTrigger: { trigger: el, start: "top 80%", once: true },
        });
      }
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="border-t border-border py-16 md:py-24">
      <div className="ig-header container-x mb-8 flex flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left">
        <div>
          <div className="mb-1 text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
            @VAPORNOIR
          </div>
          <h2 className="font-display text-3xl tracking-tight md:text-4xl">
            In the wild
          </h2>
        </div>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-border bg-card/40 px-5 py-2.5 text-xs font-medium uppercase tracking-wider transition-all duration-300 hover:border-primary hover:text-primary hover:bg-card/60"
        >
          <Instagram className="size-4" /> Follow
        </a>
      </div>

      <div className="grid grid-cols-2 gap-2 px-2 md:grid-cols-4 md:gap-3 md:px-4">
        {feedImages.map((img) => (
          <a
            key={img.id}
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="ig-image group relative aspect-square overflow-hidden rounded-xl bg-muted"
          >
            <Image
              src={img.url}
              alt="Community shot"
              fill
              sizes="(min-width: 768px) 25vw, 50vw"
              className="object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-75"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <Instagram className="size-7 text-white mb-2" />
              <span className="text-xs font-mono font-medium text-white">{img.handle}</span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
