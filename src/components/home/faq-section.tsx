"use client";

import { useState } from "react";
import { Plus, Minus, HelpCircle } from "lucide-react";
import Link from "next/link";

const faqs = [
  {
    q: "What makes Vapor Noir products different from standard vaporizers?",
    a: "Vapor Noir products are engineered in Scandinavia using medical-grade ceramics, aerospace aluminum, and pure convection heating. We use zero synthetic additives or diacetyl in our liquids, guaranteeing pure flavor without compromise.",
  },
  {
    q: "How long does shipping take and is it discreet?",
    a: "All orders are packaged in plain, unbranded recycled cardboard boxes for maximum discretion. Standard shipping takes 2-4 business days across North America and Europe, with free shipping on orders over $75.",
  },
  {
    q: "What is your warranty and returns policy?",
    a: "We offer a 30-day risk-free in-home trial. If you are not completely satisfied, return it for a full refund. All hardware devices carry a 3-year to 5-year full manufacturer warranty covering all defects.",
  },
  {
    q: "Are these products age-restricted?",
    a: "Yes. All products sold by Vapor Noir are strictly intended for adult users of legal smoking age (18+ or 21+ depending on your local jurisdiction). Age verification is performed at checkout.",
  },
  {
    q: "How do I choose between convection and conduction devices?",
    a: "Convection devices (like Obsidian Pro) heat the air surrounding your material for ultra-clean flavor and maximum efficiency. Conduction devices heat the chamber directly for faster heat-up times and dense vapor clouds.",
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="border-t border-border bg-card/30 py-16 md:py-24">
      <div className="container-x max-w-4xl">
        <div className="text-center">
          <div className="mb-2 text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
            Got Questions?
          </div>
          <h2 className="font-display text-3xl tracking-tight md:text-5xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Everything you need to know about our products, technology, and delivery.
          </p>
        </div>

        <div className="mt-12 space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="overflow-hidden rounded-xl border border-border bg-background transition-colors"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="flex w-full items-center justify-between p-6 text-left font-display text-lg font-medium transition-colors hover:text-primary"
                >
                  <span>{faq.q}</span>
                  <span className="ml-4 flex size-8 shrink-0 items-center justify-center rounded-full bg-muted">
                    {isOpen ? <Minus className="size-4" /> : <Plus className="size-4" />}
                  </span>
                </button>
                {isOpen && (
                  <div className="border-t border-border/50 px-6 pb-6 pt-4 text-sm leading-relaxed text-muted-foreground">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-10 rounded-xl border border-border bg-background/80 p-6 text-center text-sm text-muted-foreground">
          Still have questions? Our customer care specialists are available 24/7.{" "}
          <Link href="/contact" className="text-primary hover:underline font-medium">
            Contact Support →
          </Link>
        </div>
      </div>
    </section>
  );
}
