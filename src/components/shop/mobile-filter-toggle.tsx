"use client";

import { useState, type ReactNode } from "react";
import { SlidersHorizontal, X } from "lucide-react";

export function MobileFilterToggle({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 border border-border px-4 py-2 text-xs font-bold text-muted-foreground hover:bg-muted lg:hidden"
      >
        <SlidersHorizontal className="size-4" />
        Filters
      </button>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setOpen(false)} />
          <div className="absolute inset-y-0 left-0 w-full max-w-md overflow-y-auto bg-white p-6 shadow-xl">
            <div className="mb-4 flex items-center justify-between border-b border-border pb-4">
              <div className="text-xs font-bold uppercase text-muted-foreground">Filters</div>
              <button type="button" onClick={() => setOpen(false)} className="p-1 hover:bg-muted">
                <X className="size-5" />
              </button>
            </div>
            {children}
          </div>
        </div>
      )}

      <div className="hidden w-72 shrink-0 lg:block lg:sticky lg:top-4">{children}</div>
    </>
  );
}
