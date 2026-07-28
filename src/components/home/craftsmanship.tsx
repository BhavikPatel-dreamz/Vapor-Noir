"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CheckCircle2 } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const steps = [
  {
    num: "01",
    title: "Small-Batch Sourcing",
    desc: "Components sourced from certified European artisan suppliers, tested for purity.",
  },
  {
    num: "02",
    title: "Precision Engineering",
    desc: "CNC-milled to 0.01mm tolerances with medical-grade ceramic heating elements.",
  },
  {
    num: "03",
    title: "Rigorous Testing",
    desc: "500-cycle stress testing, ±0.5°C accuracy check, hand assembly in Denmark.",
  },
  {
    num: "04",
    title: "Lifetime Care",
    desc: "Up to 5-year warranty, express repairs, sustainable module recycling.",
  },
];

const highlights = [
  "100% Medical-Grade Ceramic Chambers",
  "Zero Synthetic Sweeteners or Diacetyl",
  "Carbon-Neutral EU Shipping",
  "30-Day Risk-Free In-Home Trial",
];

export function Craftsmanship() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const left = el.querySelector(".craft-left");
    const cards = Array.from(el.querySelectorAll(".craft-card"));
    const highlights = Array.from(el.querySelectorAll(".craft-highlight"));

    const ctx = gsap.context(() => {
      if (left) {
        gsap.set(left, { x: -30, opacity: 0 });
        gsap.to(left, {
          x: 0, opacity: 1, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 80%", once: true },
        });
      }

      if (cards.length > 0) {
        gsap.set(cards, { y: 30, opacity: 0 });
        gsap.to(cards, {
          y: 0, opacity: 1, duration: 0.6, ease: "power3.out", stagger: 0.1,
          scrollTrigger: { trigger: el, start: "top 75%", once: true },
        });
      }

      if (highlights.length > 0) {
        gsap.set(highlights, { x: -15, opacity: 0 });
        gsap.to(highlights, {
          x: 0, opacity: 1, duration: 0.5, ease: "power3.out", stagger: 0.06, delay: 0.3,
          scrollTrigger: { trigger: el, start: "top 75%", once: true },
        });
      }
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="border-t border-border bg-card/30 py-16 md:py-24">
      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
          <div className="craft-left">
            <div className="mb-3 text-[11px] uppercase tracking-[0.25em] text-primary">
              The Vapor Noir Difference
            </div>
            <h2 className="font-display text-3xl tracking-tight md:text-5xl">
              Engineered with{" "}
              <span className="italic text-primary">relentless precision.</span>
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
              We reject cheap mass manufacturing. From aerospace aluminum
              chassis to 90-day oak-aged extracts — built for connoisseurs
              who demand uncompromising quality.
            </p>

            <div className="mt-8 space-y-2.5">
              {highlights.map((h, i) => (
                <div key={i} className="craft-highlight flex items-center gap-3 text-sm font-medium">
                  <CheckCircle2 className="size-4 shrink-0 text-primary" />
                  <span>{h}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {steps.map((s) => (
              <div
                key={s.num}
                className="craft-card group rounded-2xl border border-border/60 bg-background/60 p-5 transition-all duration-300 hover:border-primary/30 hover:bg-background/80"
              >
                <div className="text-3xl font-light text-primary/25 font-display transition-colors duration-300 group-hover:text-primary/50">
                  {s.num}
                </div>
                <h3 className="mt-2.5 font-display text-lg">{s.title}</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
