"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function ProductGallery({ images, alt }: { images: string[]; alt: string }) {
  const [active, setActive] = useState(0);

  const handleThumbClick = (i: number) => {
    setActive(i);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="relative aspect-square overflow-hidden border-2 border-border bg-white shadow-sm">
        <Image
          src={images[active]}
          alt={alt}
          fill
          priority
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-contain p-4"
        />

        {/* Image counter */}
        <div className="absolute bottom-3 left-3 bg-[#1565C0] text-white px-3 py-1.5 text-xs font-bold shadow-sm">
          {active + 1} / {images.length}
        </div>

        {/* Navigation arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={() => handleThumbClick(active > 0 ? active - 1 : images.length - 1)}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white border-2 border-border p-2 hover:bg-[#E3F2FD] hover:border-[#1565C0] transition-all"
              aria-label="Previous image"
            >
              <ChevronLeft className="size-4 text-[#1565C0]" />
            </button>
            <button
              onClick={() => handleThumbClick(active < images.length - 1 ? active + 1 : 0)}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white border-2 border-border p-2 hover:bg-[#E3F2FD] hover:border-[#1565C0] transition-all"
              aria-label="Next image"
            >
              <ChevronRight className="size-4 text-[#1565C0]" />
            </button>
          </>
        )}
      </div>

      {/* Thumbnails */}
      <div className="flex gap-3 overflow-x-auto">
        {images.map((src, i) => (
          <button
            key={src}
            onClick={() => handleThumbClick(i)}
            className={`relative aspect-square w-20 shrink-0 overflow-hidden border-2 transition-all ${
              i === active
                ? "border-[#1565C0] shadow-sm"
                : "border-border hover:border-[#1565C0]/50 opacity-60 hover:opacity-100"
            }`}
          >
            <Image src={src} alt="" fill sizes="80px" className="object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}
