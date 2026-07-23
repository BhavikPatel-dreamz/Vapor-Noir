"use client";

import { useState, useRef, useCallback, useEffect } from "react";

export function PriceRangeSlider({
  min = 0,
  max = 500,
  initialMin,
  initialMax,
}: {
  min?: number;
  max?: number;
  initialMin?: number;
  initialMax?: number;
}) {
  const [lo, setLo] = useState(initialMin ?? min);
  const [hi, setHi] = useState(initialMax ?? max);
  const trackRef = useRef<HTMLDivElement>(null);
  const dragging = useRef<"lo" | "hi" | null>(null);
  const loRef = useRef(initialMin ?? min);
  const hiRef = useRef(initialMax ?? max);

  const pct = (v: number) => ((v - min) / (max - min)) * 100;

  const resolve = useCallback(
    (clientX: number) => {
      const rect = trackRef.current?.getBoundingClientRect();
      if (!rect) return;
      const raw = ((clientX - rect.left) / rect.width) * (max - min) + min;
      return Math.round(Math.min(max, Math.max(min, raw)));
    },
    [min, max],
  );

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const v = resolve(e.clientX);
      if (v == null) return;
      if (dragging.current === "lo") {
        const next = Math.min(v, hiRef.current - 1);
        loRef.current = next;
        setLo(next);
      } else if (dragging.current === "hi") {
        const next = Math.max(v, loRef.current + 1);
        hiRef.current = next;
        setHi(next);
      }
    };
    const onUp = () => {
      dragging.current = null;
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, [resolve]);

  const onTouchStart = useCallback(
    (thumb: "lo" | "hi") => (e: React.TouchEvent) => {
      e.preventDefault();
      dragging.current = thumb;
      const v = resolve(e.touches[0].clientX);
      if (v == null) return;
      if (thumb === "lo") {
        const next = Math.min(v, hiRef.current - 1);
        loRef.current = next;
        setLo(next);
      } else {
        const next = Math.max(v, loRef.current + 1);
        hiRef.current = next;
        setHi(next);
      }
    },
    [resolve],
  );

  const onTouchEnd = useCallback(() => {
    dragging.current = null;
  }, []);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>${lo}</span>
        <span>${hi}</span>
      </div>

      <div ref={trackRef} className="relative h-5 select-none touch-none">
        <div className="absolute top-1/2 left-0 right-0 h-1 -translate-y-1/2 rounded-full bg-border" />
        <div
          className="absolute top-1/2 h-1 -translate-y-1/2 rounded-full bg-primary"
          style={{ left: `${pct(lo)}%`, right: `${100 - pct(hi)}%` }}
        />

        <input type="hidden" name="minPrice" value={lo > min ? lo : ""} />
        <input type="hidden" name="maxPrice" value={hi < max ? hi : ""} />

        <div
          className="absolute top-1/2 size-4 -translate-x-1/2 -translate-y-1/2 cursor-grab rounded-full border-2 border-primary bg-background shadow-sm active:cursor-grabbing"
          style={{ left: `${pct(lo)}%` }}
          onMouseDown={() => (dragging.current = "lo")}
          onTouchStart={onTouchStart("lo")}
          onTouchEnd={onTouchEnd}
        />
        <div
          className="absolute top-1/2 size-4 -translate-x-1/2 -translate-y-1/2 cursor-grab rounded-full border-2 border-primary bg-background shadow-sm active:cursor-grabbing"
          style={{ left: `${pct(hi)}%` }}
          onMouseDown={() => (dragging.current = "hi")}
          onTouchStart={onTouchStart("hi")}
          onTouchEnd={onTouchEnd}
        />
      </div>

      <div className="flex items-center justify-between text-[10px] text-muted-foreground">
        <span>${min}</span>
        <span>${max}</span>
      </div>
    </div>
  );
}
