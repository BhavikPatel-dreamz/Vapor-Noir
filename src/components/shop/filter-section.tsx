"use client";

import { useState } from "react";
import { ChevronRight } from "lucide-react";

export function FilterSection({
  title,
  defaultOpen = true,
  children,
}: {
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border-t-2 border-border pt-4 pb-2">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between text-xs font-bold uppercase tracking-wide text-[#1565C0] hover:text-[#0D47A1] px-3 py-2 bg-[#E3F2FD] transition-colors"
      >
        {title}
        <ChevronRight
          className={`size-4 shrink-0 transition-transform duration-200 ${open ? "rotate-90" : ""}`}
        />
      </button>
      <div
        className={`grid transition-all duration-200 ease-in-out ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="pt-2 px-3">{children}</div>
        </div>
      </div>
    </div>
  );
}
