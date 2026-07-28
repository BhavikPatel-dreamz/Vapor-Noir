import { Flame } from "lucide-react";

const items = [
  "Free shipping over $75",
  "3-Year Warranty",
  "Handmade in Copenhagen",
  "Small-Batch Flavors",
  "30-Day Returns",
  "Medical-Grade Ceramic",
  "Carbon-Neutral EU Shipping",
  "Oak-Aged Reserve Collection",
];

export function BrandMarquee() {
  const doubled = [...items, ...items];

  return (
    <div className="relative border-y border-border bg-card/40 overflow-hidden">
      <div className="animate-marquee flex whitespace-nowrap py-3.5">
        {doubled.map((item, i) => (
          <span key={i} className="mx-6 flex items-center gap-2.5 text-[11px] uppercase tracking-[0.2em] text-muted-foreground/70">
            <Flame className="size-3 text-primary/50" />
            {item}
          </span>
        ))}
      </div>
      {/* Fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent" />
    </div>
  );
}
