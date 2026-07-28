"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Award, Leaf, ShieldCheck, Truck } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const values = [
  { icon: Award, title: "Craft-engineered", copy: "Calibrated by hand at our Copenhagen workshop to 0.01mm tolerances." },
  { icon: Leaf, title: "Small-batch flavors", copy: "E-liquids aged and bottled in numbered runs of 200." },
  { icon: ShieldCheck, title: "3-year warranty", copy: "Industry-leading coverage on every powered device." },
  { icon: Truck, title: "Discreet shipping", copy: "Unmarked packaging, tracked delivery. Free over $75." },
];

export function ValueProps() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const cards = Array.from(el.querySelectorAll(".vp-card"));
    gsap.set(cards, { y: 25, opacity: 0 });
    gsap.to(cards, {
      y: 0,
      opacity: 1,
      duration: 0.6,
      ease: "power3.out",
      stagger: 0.08,
      scrollTrigger: { trigger: el, start: "top 85%", once: true },
    });
  }, []);

  return (
    <section ref={ref} className="container-x py-14 md:py-16">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {values.map((v) => (
          <div
            key={v.title}
            className="vp-card group relative overflow-hidden rounded-xl border border-border/60 bg-card/30 p-5 transition-all duration-400 hover:border-primary/20 hover:bg-card/50"
          >
            <div className="absolute -right-4 -top-4 size-24 rounded-full bg-primary/5 transition-all duration-500 group-hover:scale-150 group-hover:bg-primary/10" />
            <div className="relative">
              <div className="mb-3 flex size-10 items-center justify-center rounded-xl bg-primary/10 transition-colors duration-300 group-hover:bg-primary/15">
                <v.icon className="size-5 text-primary" />
              </div>
              <div className="font-display text-base">{v.title}</div>
              <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{v.copy}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
