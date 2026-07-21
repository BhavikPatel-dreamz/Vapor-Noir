"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, MapPin, Phone } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const schema = z.object({
  name: z.string().min(1, "Required"),
  email: z.string().email(),
  message: z.string().min(10, "Tell us a bit more"),
});
type Form = z.infer<typeof schema>;

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<Form>({
    resolver: zodResolver(schema),
  });
  const onSubmit = async (_: Form) => {
    await new Promise((r) => setTimeout(r, 700));
    setSent(true); reset();
  };

  return (
    <div className="container-x grid gap-8 py-16 md:gap-14 lg:grid-cols-2">
      <div>
        <div className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground">Say hello</div>
        <h1 className="mt-3 font-display text-4xl tracking-tight md:text-5xl lg:text-6xl">Contact</h1>
        <p className="mt-6 max-w-md text-muted-foreground">
          Questions about a device, an order, or a bulk enquiry — we typically reply within one
          business day.
        </p>
        <ul className="mt-10 space-y-5 text-sm">
          <li className="flex items-start gap-3"><Mail className="mt-0.5 size-4 text-primary" /> hello@vapornoir.example</li>
          <li className="flex items-start gap-3"><Phone className="mt-0.5 size-4 text-primary" /> +45 71 99 12 03</li>
          <li className="flex items-start gap-3"><MapPin className="mt-0.5 size-4 text-primary" /> Nørrebrogade 42, 2200 København N</li>
        </ul>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 rounded-xl border border-border bg-card p-4 md:p-8">
        <Field label="Name" error={errors.name?.message}><Input {...register("name")} /></Field>
        <Field label="Email" error={errors.email?.message}><Input type="email" {...register("email")} /></Field>
        <label className="block">
          <div className="mb-1.5 text-xs text-muted-foreground">Message</div>
          <textarea
            {...register("message")}
            rows={5}
            className="w-full rounded-md border border-border bg-input px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
          {errors.message && <div className="mt-1 text-xs text-destructive">{errors.message.message}</div>}
        </label>
        <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Sending…" : "Send message"}
        </Button>
        {sent && <div className="text-xs text-success">Thanks — we'll be in touch shortly.</div>}
      </form>
    </div>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <div className="mb-1.5 text-xs text-muted-foreground">{label}</div>
      {children}
      {error && <div className="mt-1 text-xs text-destructive">{error}</div>}
    </label>
  );
}
