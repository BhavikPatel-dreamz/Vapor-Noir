"use client";

import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [ok, setOk] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    gsap.set(el, { y: 30, opacity: 0, scale: 0.98 });
    gsap.to(el, {
      y: 0, opacity: 1, scale: 1, duration: 0.8, ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 85%", once: true },
    });
  }, []);

  return (
    <section className="container-x py-16 md:py-24">
      <div
        ref={ref}
        className="relative mx-auto max-w-2xl overflow-hidden rounded-3xl border border-border/60 bg-card/40 p-8 text-center backdrop-blur-sm md:p-12 lg:p-14"
      >
        <div className="absolute -right-16 -top-16 size-48 rounded-full bg-primary/8 blur-[80px]" />
        <div className="absolute -bottom-16 -left-16 size-48 rounded-full bg-accent/6 blur-[80px]" />

        <div className="relative z-10">
          <div className="mb-2 text-[11px] uppercase tracking-[0.25em] text-muted-foreground">The Journal</div>
          <h2 className="font-display text-2xl tracking-tight md:text-3xl lg:text-4xl">Early access, quiet drops.</h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Once a month. No noise. Reserve releases and workshop stories.
          </p>
          <form
            className="mt-6 flex flex-col gap-2 sm:flex-row"
            onSubmit={(e) => { e.preventDefault(); setOk(true); setEmail(""); }}
          >
            <Input
              type="email"
              required
              placeholder="you@domain.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 flex-1"
            />
            <Button type="submit" size="lg" className="px-8">
              Subscribe
            </Button>
          </form>
          {ok && (
            <div className="mt-3 flex items-center justify-center gap-1.5 text-xs text-success">
              <Check className="size-3.5" /> Thanks — check your inbox.
            </div>
          )}
          <p className="mt-3 text-[11px] text-muted-foreground/60">
            No spam. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  );
}
