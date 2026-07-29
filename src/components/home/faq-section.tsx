"use client";

import { useState } from "react";
import { Plus, Minus, HelpCircle } from "lucide-react";
import Link from "next/link";

const faqs = [
  {
    q: "What makes Vapor products different?",
    a: "Our products are engineered using premium materials and pure convection heating. Zero synthetic additives — pure flavor without compromise.",
  },
  {
    q: "How long does shipping take?",
    a: "All orders ship in plain, unbranded packaging. Standard shipping: 2-4 business days across EU. Free shipping on orders over $75.",
  },
  {
    q: "What is your warranty and returns policy?",
    a: "30-day risk-free in-home trial with full refund. All hardware carries a 3-year manufacturer warranty covering all defects.",
  },
  {
    q: "Are these products age-restricted?",
    a: "Yes. All products are strictly for adult users of legal smoking age (18+ or 21+ depending on jurisdiction). Age verification is performed at checkout.",
  },
  {
    q: "How do I choose the right product?",
    a: "Our product guides and customer support team can help you find the perfect device. Check our blog for detailed buying guides!",
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => setOpenIndex(openIndex === idx ? null : idx);

  return (
    <section className="bg-[#E3F2FD] border-b-2 border-border py-8">
      <div className="container-x max-w-3xl">
        <div className="section-title-bar text-center">❓ Frequently Asked Questions</div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={idx} className="border-2 border-[#1565C0]/20 bg-white shadow-sm">
                <button
                  onClick={() => toggle(idx)}
                  className="flex w-full items-center justify-between p-5 text-left text-sm font-bold text-foreground hover:text-[#1565C0] transition-colors"
                >
                  <span className="flex items-center gap-3">
                    <HelpCircle className="size-4 shrink-0 text-[#1565C0]" />
                    {faq.q}
                  </span>
                  <span className={`ml-4 flex size-7 shrink-0 items-center justify-center transition-colors ${isOpen ? "bg-[#1565C0] text-white" : "bg-[#E3F2FD] text-[#1565C0]"}`}>
                    {isOpen ? <Minus className="size-3.5" /> : <Plus className="size-3.5" />}
                  </span>
                </button>
                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="border-t-2 border-[#E3F2FD] px-5 pb-5 pt-3 text-sm text-muted-foreground leading-relaxed">
                      {faq.a}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 border-2 border-[#1565C0]/20 bg-white p-6 text-center shadow-sm">
          <p className="text-sm text-muted-foreground mb-3">
            Still have questions? We&apos;re here to help!
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-[#1565C0] text-white font-bold px-6 py-3 text-sm border-b-2 border-[#0D47A1] hover:bg-[#0D47A1] transition-all rounded-sm"
          >
            Contact Support →
          </Link>
        </div>
      </div>
    </section>
  );
}
