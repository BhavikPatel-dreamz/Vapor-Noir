"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check, Mail, Gift } from "lucide-react";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [ok, setOk] = useState(false);

  return (
    <section className="bg-gradient-to-r from-[#1565C0] to-[#0D47A1] border-t-4 border-[#FFC107]">
      <div className="container-x py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left">
            <div className="flex items-center gap-4 justify-center md:justify-start">
              <div className="bg-[#FFC107] text-[#1565C0] rounded-full p-3">
                <Mail className="size-8" />
              </div>
              <div>
                <h3 className="text-2xl font-black text-white">Subscribe & Save!</h3>
                <p className="text-sm text-white/80">Get exclusive deals, new arrivals & <span className="text-[#FFC107] font-bold">10% off</span> your first order!</p>
              </div>
            </div>
          </div>
          <form
            className="flex w-full max-w-lg gap-2"
            onSubmit={(e) => { e.preventDefault(); if (email) { setOk(true); setEmail(""); } }}
          >
            <input
              type="email"
              required
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-13 flex-1 px-4 text-sm border-2 border-white/30 bg-white/10 text-white placeholder:text-white/60 focus:outline-none focus:border-[#FFC107] focus:bg-white/20 backdrop-blur"
            />
            <button
              type="submit"
              className="h-13 px-8 bg-[#F57C00] hover:bg-[#E65100] text-white font-bold text-sm border-b-2 border-[#E65100] transition-all uppercase tracking-wide whitespace-nowrap flex items-center gap-2"
            >
              <Gift className="size-4" /> Subscribe
            </button>
          </form>
        </div>
        {ok && (
          <div className="mt-6 flex items-center justify-center gap-2 text-base text-[#FFC107] font-bold">
            <Check className="size-5" /> Thanks for subscribing! Check your inbox for your 10% discount code.
          </div>
        )}
      </div>
    </section>
  );
}
