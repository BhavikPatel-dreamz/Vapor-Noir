"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, MapPin, Phone, Send, Headphones } from "lucide-react";
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
    <div className="bg-white">
      <div className="bg-gradient-to-r from-[#1565C0] to-[#0D47A1] border-b-4 border-[#FFC107]">
        <div className="container-x py-10 text-center">
          <Headphones className="mx-auto mb-4 size-10 text-[#FFC107]" />
          <h1 className="text-[34px] font-black text-white">Contact Us</h1>
          <p className="mt-2 text-white/70 max-w-lg mx-auto">
            Have a question about a product, an order, or anything else? We&apos;re here to help.
            Typically reply within one business day.
          </p>
        </div>
      </div>

      <div className="container-x grid gap-8 py-10 lg:grid-cols-2">
        <div>
          <h2 className="text-2xl font-black text-[#1565C0] mb-6">Get In Touch</h2>
          <p className="text-sm text-muted-foreground mb-8">
            Our customer support team is available 24/7. Drop us a message and we&apos;ll get back to you as soon as possible.
          </p>
          <div className="space-y-5">
            <div className="flex items-start gap-4 p-4 border-l-4 border-[#1565C0] bg-[#E3F2FD]">
              <div className="bg-[#1565C0] text-white p-2.5 rounded-sm">
                <Mail className="size-5" />
              </div>
              <div>
                <div className="font-bold text-sm">Email</div>
                <div className="text-sm text-muted-foreground">support@vapornoir.com</div>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 border-l-4 border-[#F57C00] bg-[#FFF3E0]">
              <div className="bg-[#F57C00] text-white p-2.5 rounded-sm">
                <Phone className="size-5" />
              </div>
              <div>
                <div className="font-bold text-sm">Phone</div>
                <div className="text-sm text-muted-foreground">+45 80 82 01 90</div>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 border-l-4 border-[#2E7D32] bg-[#E8F5E9]">
              <div className="bg-[#2E7D32] text-white p-2.5 rounded-sm">
                <MapPin className="size-5" />
              </div>
              <div>
                <div className="font-bold text-sm">Location</div>
                <div className="text-sm text-muted-foreground">Copenhagen, Denmark</div>
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 border-2 border-[#1565C0]/20 bg-[#F5F5F5] p-6 md:p-8 shadow-sm">
          <h3 className="font-black text-[#1565C0] text-lg">Send Us a Message</h3>
          <Field label="Name" error={errors.name?.message}><Input {...register("name")} /></Field>
          <Field label="Email" error={errors.email?.message}><Input type="email" {...register("email")} /></Field>
          <label className="block">
            <div className="mb-1.5 text-xs font-bold text-muted-foreground uppercase tracking-wide">Message</div>
            <textarea
              {...register("message")}
              rows={5}
              className="w-full border-2 border-border bg-white px-3 py-2 text-sm text-foreground focus:outline-none focus:border-[#1565C0] focus:ring-1 focus:ring-[#1565C0]"
            />
            {errors.message && <div className="mt-1 text-xs text-[#D32F2F] font-bold">{errors.message.message}</div>}
          </label>
          <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Sending..." : <><Send className="size-4" /> Send Message</>}
          </Button>
          {sent && <div className="text-sm text-[#2E7D32] font-bold bg-[#E8F5E9] p-3 border border-[#2E7D32]/30">✅ Thanks — we&apos;ll be in touch shortly.</div>}
        </form>
      </div>
    </div>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <div className="mb-1.5 text-xs font-bold text-muted-foreground uppercase tracking-wide">{label}</div>
      {children}
      {error && <div className="mt-1 text-xs text-[#D32F2F] font-bold">{error}</div>}
    </label>
  );
}
