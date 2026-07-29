import Link from "next/link";
import { getProducts } from "@/lib/api";
import { ProductCard } from "@/components/product/product-card";

export async function FeaturedGridServer() {
  const { products: items } = await getProducts({ limit: 8 });

  return (
    <section className="bg-[#F5F5F5] border-b-2 border-border py-8">
      <div className="container-x">
        <div className="section-title-bar">🔥 Featured Products</div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
        <div className="mt-6 text-center">
          <Link href="/shop" className="inline-flex items-center gap-2 bg-[#1565C0] text-white font-bold px-8 py-3 text-sm border-b-2 border-[#0D47A1] hover:bg-[#0D47A1] transition-all uppercase tracking-wide shadow-sm">
            View All Products →
          </Link>
        </div>
      </div>
    </section>
  );
}
