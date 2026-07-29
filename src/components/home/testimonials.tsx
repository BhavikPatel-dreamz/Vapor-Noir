"use client";

import { Star, Quote, ThumbsUp } from "lucide-react";
import { testimonials } from "@/data/testimonials";
import { useState, useEffect } from "react";

export function Testimonials() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIdx((p) => (p + 1) % testimonials.length), 5000);
    return () => clearInterval(t);
  }, []);

  const t = testimonials[idx];
  if (!t) return null;

  return (
    <section className="bg-[#FFF3E0] border-b-2 border-border py-8">
      <div className="container-x">
        <div className="section-title-bar">⭐ What Our Customers Say</div>
        <div className="mx-auto max-w-3xl">
          <div className="border-2 border-[#F57C00]/30 bg-white p-8 md:p-10 text-center shadow-md">
            <Quote className="mx-auto mb-4 size-10 text-[#F57C00]/20" />
            <div className="mb-4 inline-flex gap-1">
              {Array.from({ length: t.rating }).map((_, i) => (
                <Star key={i} className="size-6 fill-[#FFC107] text-[#FFC107]" />
              ))}
            </div>
            <blockquote className="text-xl leading-relaxed font-normal text-foreground italic mb-6">
              &ldquo;{t.quote}&rdquo;
            </blockquote>
            <div className="text-sm text-muted-foreground">
              <span className="font-bold text-foreground text-base">{t.author}</span>
              <span className="mx-2 text-border">|</span>
              <span className="text-[#1565C0] font-bold">{t.role}</span>
            </div>
            <div className="mt-6 flex items-center justify-center gap-1 text-xs text-[#2E7D32] font-bold">
              <ThumbsUp className="size-3.5" /> Verified Purchase
            </div>
          </div>
          <div className="flex justify-center gap-2 mt-4">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setIdx(i)}
                className={`w-3 h-3 rounded-full transition-all ${i === idx ? "bg-[#F57C00] scale-125" : "bg-[#F57C00]/30 hover:bg-[#F57C00]/60"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
