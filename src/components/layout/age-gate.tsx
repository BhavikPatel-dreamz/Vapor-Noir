"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Shield, AlertTriangle } from "lucide-react";

const KEY = "vn-age-verified";

export function AgeGate() {
  const [visible, setVisible] = useState(
    () => typeof window !== "undefined" && !localStorage.getItem(KEY),
  );
  const confirm = () => {
    localStorage.setItem(KEY, "1");
    setVisible(false);
  };
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80"
        >
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="mx-4 max-w-md border-4 border-[#FFC107] bg-white p-8 text-center shadow-xl"
          >
            <div className="bg-[#1565C0] text-white font-black text-2xl px-4 py-3 inline-block mb-4">
              VAPOR
            </div>
            <div className="flex items-center justify-center gap-2 text-[#D32F2F] mb-4">
              <AlertTriangle className="size-5" />
              <span className="font-bold text-sm">AGE VERIFICATION REQUIRED</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              This site contains nicotine products intended for adults <strong>21+</strong> only. By entering you
              confirm you are of legal age in your jurisdiction.
            </p>
            <div className="mt-6 flex gap-3">
              <Button className="flex-1" onClick={confirm}>Yes, I am 21+</Button>
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => (window.location.href = "https://google.com")}
              >
                Exit
              </Button>
            </div>
            <div className="mt-4 flex items-center justify-center gap-1.5 text-[10px] uppercase tracking-wider text-[#666] font-bold">
              <Shield className="size-3 text-[#F57C00]" /> Warning: nicotine is an addictive chemical.
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
