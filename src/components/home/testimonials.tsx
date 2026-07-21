"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { Star } from "lucide-react";
import { testimonials } from "@/data/testimonials";

export function Testimonials() {
  return (
    <section className="border-y border-border bg-muted/20 py-16 md:py-24">
      <div className="container-x">
        <div className="mb-2 text-center text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
          03 · From our community
        </div>
        <h2 className="text-center font-display text-3xl tracking-tight md:text-5xl">Loved by 40,000+ enthusiasts</h2>
        <div className="mx-auto mt-8 max-w-3xl md:mt-12">
          <Swiper
            modules={[Autoplay, Pagination]}
            autoplay={{ delay: 5000 }}
            pagination={{ clickable: true }}
            loop
          >
            {testimonials.map((t) => (
              <SwiperSlide key={t.id}>
                <div className="px-4 pb-14 text-center">
                  <div className="mb-4 inline-flex">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="size-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <blockquote className="font-display text-2xl leading-snug tracking-tight md:text-3xl">
                    “{t.quote}”
                  </blockquote>
                  <div className="mt-6 text-sm text-muted-foreground">
                    {t.author} · <span className="text-primary">{t.role}</span>
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
