import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, ShieldCheck, Zap, RefreshCw, Award } from "lucide-react";

const steps = [
  {
    num: "01",
    title: "Small-Batch Sourcing",
    desc: "Every component and e-liquid base is sourced from certified European artisan suppliers, rigorously tested for purity.",
  },
  {
    num: "02",
    title: "Precision Engineering",
    desc: "Device body CNC-milled to 0.01mm tolerances with medical-grade ceramic heating elements and tactile haptic controls.",
  },
  {
    num: "03",
    title: "Rigorous Testing",
    desc: "Each unit undergoes 500-cycle stress testing, temperature accuracy check (±0.5°C), and hand assembly in Denmark.",
  },
  {
    num: "04",
    title: "Lifetime Guarantee & Care",
    desc: "Backed by up to 5-year warranty, express complimentary repairs, and sustainable module recycling program.",
  },
];

const highlights = [
  "100% Medical-Grade Ceramic Chambers",
  "Zero Synthetic Sweeteners or Diacetyl",
  "Carbon-Neutral EU Shipping",
  "30-Day Risk-Free In-Home Trial",
];

export function Craftsmanship() {
  return (
    <section className="border-t border-border bg-card/50 py-16 md:py-24">
      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <div className="mb-3 text-[11px] uppercase tracking-[0.25em] text-primary">
              The Vapor Noir Difference
            </div>
            <h2 className="font-display text-3xl tracking-tight md:text-5xl">
              Engineered with <span className="italic text-primary">relentless precision.</span>
            </h2>
            <p className="mt-4 text-base text-muted-foreground md:text-lg">
              We reject cheap mass manufacturing. From our aerospace aluminum chassis to our 90-day oak-aged e-liquid extracts, we build for connoisseurs who demand uncompromising quality.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {highlights.map((h, i) => (
                <div key={i} className="flex items-center gap-3 rounded-lg border border-border/80 bg-background/60 p-3.5 text-sm font-medium">
                  <CheckCircle2 className="size-5 shrink-0 text-primary" />
                  <span>{h}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {steps.map((s) => (
              <div key={s.num} className="group relative overflow-hidden rounded-xl border border-border bg-background p-6 transition-all duration-300 hover:border-primary/50 hover:shadow-lg">
                <div className="font-display text-4xl font-light text-primary/30 group-hover:text-primary transition-colors">
                  {s.num}
                </div>
                <h3 className="mt-3 font-display text-xl">{s.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
