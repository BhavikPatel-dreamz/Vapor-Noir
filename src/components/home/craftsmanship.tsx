import { CheckCircle2, Star, Truck, Shield, Headphones } from "lucide-react";

const steps = [
  {
    num: "01",
    title: "Premium Sourcing",
    desc: "Products sourced from certified European suppliers, tested for purity and quality.",
    color: "#1565C0",
    bg: "#E3F2FD",
  },
  {
    num: "02",
    title: "Quality Control",
    desc: "Every product undergoes rigorous testing to ensure consistent performance and safety.",
    color: "#2E7D32",
    bg: "#E8F5E9",
  },
  {
    num: "03",
    title: "Secure Packaging",
    desc: "Discreet, secure packaging with tracking on every order. Fast EU-wide delivery.",
    color: "#F57C00",
    bg: "#FFF3E0",
  },
  {
    num: "04",
    title: "24/7 Support",
    desc: "Round-the-clock customer service. We're here to help with any questions.",
    color: "#D32F2F",
    bg: "#FFEBEE",
  },
];

const highlights = [
  { icon: Star, text: "100% Authentic Products Guaranteed", color: "#FFC107" },
  { icon: Truck, text: "Free Shipping on Orders Over $75", color: "#1565C0" },
  { icon: Shield, text: "30-Day Money-Back Guarantee", color: "#2E7D32" },
  { icon: Headphones, text: "24/7 Customer Support", color: "#F57C00" },
];

export function Craftsmanship() {
  return (
    <section className="bg-white border-b-2 border-border py-8">
      <div className="container-x">
        <div className="section-title-bar">🏆 Why Shop With Us</div>
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="bg-[#E3F2FD] border-2 border-[#1565C0]/20 p-8">
            <h2 className="text-[28px] font-black text-[#1565C0] leading-tight mb-2">
              Your Trusted Vape Store
            </h2>
            <p className="text-sm text-foreground/70 mb-6">
              We are committed to providing the best products at the best prices.
              All items are sourced directly from manufacturers to ensure authenticity.
            </p>
            <div className="space-y-4">
              {highlights.map((h, i) => (
                <div key={i} className="flex items-center gap-3 bg-white p-3 border-l-4 shadow-sm" style={{ borderLeftColor: h.color }}>
                  <h.icon className="size-5 shrink-0" style={{ color: h.color }} />
                  <span className="text-sm font-bold">{h.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 content-start">
            {steps.map((s) => (
              <div
                key={s.num}
                className="border-2 border-border bg-white p-5 card-hover"
                style={{ borderTop: `3px solid ${s.color}` }}
              >
                <div className="text-3xl font-black opacity-20" style={{ color: s.color }}>{s.num}</div>
                <h3 className="mt-1 font-bold text-foreground">{s.title}</h3>
                <p className="mt-1 text-xs text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
