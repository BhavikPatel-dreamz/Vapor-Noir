"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Star, Quote } from "lucide-react";
import { testimonials } from "@/data/testimonials";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function Testimonials() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    gsap.set(el, { y: 30, opacity: 0 });
    gsap.to(el, {
      y: 0, opacity: 1, duration: 0.8, ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 85%", once: true },
    });
  }, []);

  return (
    <section ref={ref} className="border-y border-border bg-muted/10 py-16 md:py-24">
      <div className="container-x">
        <div className="text-center">
          <div className="mb-2 text-[11px] uppercase tracking-[0.25em] text-muted-foreground">Reviews</div>
          <h2 className="font-display text-3xl tracking-tight md:text-4xl lg:text-5xl">What people say</h2>
        </div>
        <div className="mx-auto mt-10 max-w-3xl md:mt-14">
          <Swiper
            modules={[Autoplay, Pagination]}
            autoplay={{ delay: 5500, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            loop
          >
            {testimonials.map((t) => (
              <SwiperSlide key={t.id}>
                <div className="px-4 pb-16 text-center">
                  <Quote className="mx-auto mb-5 size-8 text-primary/30" />
                  <div className="mb-4 inline-flex gap-0.5">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="size-3.5 fill-primary text-primary" />
                    ))}
                  </div>
                  <blockquote className="font-display text-xl leading-snug tracking-tight md:text-2xl lg:text-3xl">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <div className="mt-6 text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">{t.author}</span>
                    <span className="mx-1.5 text-border">·</span>
                    <span className="text-primary">{t.role}</span>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
