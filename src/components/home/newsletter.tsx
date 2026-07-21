"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [ok, setOk] = useState(false);
  return (
    <section className="container-x py-16 md:py-24">
      <div className="mx-auto max-w-2xl rounded-2xl border border-border bg-card p-6 text-center md:p-10 lg:p-14">
        <div className="mb-2 text-[11px] uppercase tracking-[0.25em] text-muted-foreground">The Journal</div>
        <h2 className="font-display text-3xl tracking-tight md:text-4xl">Early access, quiet drops.</h2>
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
            className="h-12"
          />
          <Button type="submit" size="lg">Subscribe</Button>
        </form>
        {ok && <div className="mt-3 text-xs text-success">Thanks — check your inbox.</div>}
      </div>
    </section>
  );
}
