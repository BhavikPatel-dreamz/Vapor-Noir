import { getProducts } from "@/lib/api";
import { ProductCard } from "@/components/product/product-card";
import Link from "next/link";

export async function FeaturedGrid() {
  const { products: items } = await getProducts({ limit: 8 });
  return (
    <section className="container-x py-16 md:py-24">
      <div className="mb-10 flex items-end justify-between gap-6">
        <div>
          <div className="mb-2 text-[11px] uppercase tracking-[0.25em] text-muted-foreground">02 · Featured</div>
          <h2 className="font-display text-4xl tracking-tight md:text-5xl">This season</h2>
        </div>
        <Link href="/shop" className="text-sm text-primary hover:underline">View all →</Link>
      </div>
      <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
      </div>
    </section>
  );
}
