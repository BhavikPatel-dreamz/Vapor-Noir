import type { Metadata } from "next";
import Image from "next/image";
import { Star, Truck, Shield, Headphones } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn more about Vapor Store — your trusted online vape shop.",
};

const values = [
  { icon: Star, title: "Quality Products", desc: "We only stock authentic products from trusted manufacturers. Every item is verified.", color: "#FFC107", bg: "#FFF8E1" },
  { icon: Truck, title: "Best Prices", desc: "We work directly with manufacturers to offer competitive pricing. Price match guaranteed.", color: "#1565C0", bg: "#E3F2FD" },
  { icon: Shield, title: "Customer First", desc: "Our team is available 24/7 to help with any questions. Free shipping on orders over $75.", color: "#2E7D32", bg: "#E8F5E9" },
];

export default function AboutPage() {
  return (
    <div className="bg-white">
      <div className="bg-gradient-to-r from-[#1565C0] to-[#0D47A1] border-b-4 border-[#FFC107]">
        <div className="container-x py-12 text-center">
          <h1 className="text-[36px] font-black text-white">About Vapor Store</h1>
          <p className="mt-2 text-white/70 max-w-xl mx-auto">
            Your trusted online vape store since 2018. Premium products, exceptional service.
          </p>
        </div>
      </div>

      <div className="container-x py-10">
        <div className="grid gap-6 md:grid-cols-3">
          {values.map((s) => (
            <div key={s.title} className="border-2 border-border bg-white p-6 card-hover" style={{ borderTop: `4px solid ${s.color}` }}>
              <div className="flex size-12 items-center justify-center mb-4" style={{ backgroundColor: s.color, color: "white" }}>
                <s.icon className="size-6" />
              </div>
              <h3 className="text-lg font-black text-foreground">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 grid overflow-hidden border-2 border-[#1565C0]/20 lg:grid-cols-2 shadow-sm">
          <div className="relative min-h-[240px] md:min-h-[380px] bg-muted">
            <Image
              src="https://images.unsplash.com/photo-1567721913486-6585f069b332?w=1400&q=80&auto=format&fit=crop"
              alt="Our store"
              fill
              sizes="(min-width:1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="flex flex-col justify-center gap-4 bg-[#E3F2FD] p-8 md:p-12">
            <div className="text-xs font-bold uppercase tracking-wide text-[#1565C0]">Our Commitment</div>
            <h2 className="text-[28px] font-black text-[#1565C0] leading-tight">
              Quality You Can Trust
            </h2>
            <p className="text-muted-foreground">
              We personally test every product we sell. If we wouldn&apos;t use it ourselves,
              we won&apos;t sell it to you. Your satisfaction is guaranteed.
            </p>
            <div className="flex items-center gap-2 text-sm font-bold text-[#2E7D32]">
              <Headphones className="size-4" /> 24/7 Customer Support
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
