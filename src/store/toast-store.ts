"use client";

import { create } from "zustand";

export type Toast = {
  id: string;
  message: string;
  variant: "error" | "success";
};

type ToastState = {
  toasts: Toast[];
  show: (message: string, variant?: Toast["variant"]) => void;
  dismiss: (id: string) => void;
};

let counter = 0;

export const useToast = create<ToastState>()((set) => ({
  toasts: [],
  show: (message, variant = "error") => {
    const id = `t_${++counter}`;
    set((s) => ({ toasts: [...s.toasts, { id, message, variant }] }));
    setTimeout(() => {
      set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) }));
    }, 4000);
  },
  dismiss: (id) =>
    set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),
}));
