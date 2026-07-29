"use client";

import { useToast } from "@/store/toast-store";
import { cn } from "@/lib/utils";
import { X, CheckCircle, AlertCircle } from "lucide-react";

export function Toaster() {
  const { toasts, dismiss } = useToast();

  if (!toasts.length) return null;

  return (
    <div className="fixed bottom-4 right-4 z-[9999] flex flex-col gap-2">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={cn(
            "flex items-center gap-3 border-2 px-4 py-3 text-sm font-bold shadow-md min-w-[300px]",
            t.variant === "error"
              ? "border-[#D32F2F] bg-[#FFEBEE] text-[#D32F2F]"
              : "border-[#2E7D32] bg-[#E8F5E9] text-[#2E7D32]",
          )}
          role="alert"
        >
          {t.variant === "error" ? (
            <AlertCircle className="size-5 shrink-0" />
          ) : (
            <CheckCircle className="size-5 shrink-0" />
          )}
          <span className="flex-1 font-medium">{t.message}</span>
          <button onClick={() => dismiss(t.id)} className="shrink-0 opacity-60 hover:opacity-100 transition-opacity">
            <X className="size-4" />
          </button>
        </div>
      ))}
    </div>
  );
}
