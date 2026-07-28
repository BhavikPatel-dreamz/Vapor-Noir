"use client";

import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Plus, Minus } from "lucide-react";
import Link from "next/link";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const faqs = [
  {
    q: "What makes Vapor Noir products different?",
    a: "Vapor Noir products are engineered in Scandinavia using medical-grade ceramics, aerospace aluminum, and pure convection heating. Zero synthetic additives or diacetyl in our liquids — pure flavor without compromise.",
  },
  {
    q: "How long does shipping take and is it discreet?",
    a: "All orders ship in plain, unbranded recycled cardboard boxes. Standard shipping: 2-4 business days across North America and Europe. Free shipping on orders over $75.",
  },
  {
    q: "What is your warranty and returns policy?",
    a: "30-day risk-free in-home trial with full refund. All hardware carries a 3-5 year manufacturer warranty covering all defects, with express complimentary repairs.",
  },
  {
    q: "Are these products age-restricted?",
    a: "Yes. All products are strictly for adult users of legal smoking age (18+ or 21+ depending on jurisdiction). Age verification is performed at checkout.",
  },
  {
    q: "How do I choose between convection and conduction?",
    a: "Convection devices heat surrounding air for ultra-clean flavor and efficiency. Conduction devices heat the chamber directly for faster heat-up and dense vapor clouds.",
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
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

  const toggle = (idx: number) => setOpenIndex(openIndex === idx ? null : idx);

  return (
    <section ref={ref} className="border-t border-border bg-card/20 py-16 md:py-24">
      <div className="container-x max-w-3xl">
        <div className="text-center">
          <div className="mb-2 text-[11px] uppercase tracking-[0.25em] text-muted-foreground">FAQ</div>
          <h2 className="font-display text-3xl tracking-tight md:text-4xl lg:text-5xl">
            Common questions
          </h2>
        </div>

        <div className="mt-10 space-y-2">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="overflow-hidden rounded-xl border border-border/60 bg-background/40 transition-colors duration-200 hover:border-border"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="flex w-full items-center justify-between p-5 text-left text-sm font-medium transition-colors hover:text-primary md:p-6 md:text-base"
                >
                  <span>{faq.q}</span>
                  <span className="ml-4 flex size-7 shrink-0 items-center justify-center rounded-full bg-muted/80 transition-colors duration-200 group-hover:bg-muted">
                    {isOpen ? <Minus className="size-3.5" /> : <Plus className="size-3.5" />}
                  </span>
                </button>
                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="border-t border-border/40 px-5 pb-5 pt-4 text-sm leading-relaxed text-muted-foreground md:px-6 md:pb-6">
                      {faq.a}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 rounded-xl border border-border/60 bg-background/40 p-5 text-center text-sm text-muted-foreground">
          Still have questions?{" "}
          <Link href="/contact" className="font-medium text-primary hover:underline">
            Contact support →
          </Link>
        </div>
      </div>
    </section>
  );
}
