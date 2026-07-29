import { Award, Leaf, ShieldCheck, Truck, Star, Clock } from "lucide-react";

const values = [
  { icon: Truck, title: "Free Shipping", copy: "Free shipping on all orders over $75. Fast delivery.", color: "#1565C0", bg: "#E3F2FD" },
  { icon: ShieldCheck, title: "Quality Guarantee", copy: "30-day money-back guarantee. Shop with confidence.", color: "#2E7D32", bg: "#E8F5E9" },
  { icon: Award, title: "Best Prices", copy: "Price match guarantee. We'll beat any price by 5%.", color: "#F57C00", bg: "#FFF3E0" },
  { icon: Star, title: "Premium Brands", copy: "Only authentic products from trusted manufacturers.", color: "#D32F2F", bg: "#FFEBEE" },
];

export function ValueProps() {
  return (
    <section className="bg-[#FFF8E1] border-b-2 border-[#FFC107]">
      <div className="container-x py-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v) => (
            <div
              key={v.title}
              className="flex items-start gap-3 p-4 border-2 border-[#1565C0]/20 bg-white shadow-sm card-hover"
              style={{ borderLeft: `4px solid ${v.color}` }}
            >
              <div className="flex size-11 shrink-0 items-center justify-center rounded-sm" style={{ backgroundColor: v.color, color: "white" }}>
                <v.icon className="size-5" />
              </div>
              <div>
                <div className="font-bold text-sm text-foreground">{v.title}</div>
                <p className="mt-0.5 text-xs text-muted-foreground">{v.copy}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
