import Link from "next/link";
import { getProducts } from "@/lib/api";
import { ProductCard } from "@/components/product/product-card";
import { ArrowUpRight } from "lucide-react";

export async function FeaturedGridServer() {
  const { products: items } = await getProducts({ limit: 8 });

  return (
    <section className="container-x py-16 md:py-24">
      <div className="mb-10 flex items-end justify-between gap-6">
        <div>
          <div className="mb-2 text-[11px] uppercase tracking-[0.25em] text-muted-foreground">Curated</div>
          <h2 className="font-display text-3xl tracking-tight md:text-4xl lg:text-5xl">Trending Arrivals</h2>
          <p className="mt-2 text-sm text-muted-foreground">Most popular items from our latest releases.</p>
        </div>
        <Link href="/shop" className="hidden text-sm text-primary hover:underline md:inline-flex items-center gap-1">
          View all <ArrowUpRight className="size-3.5" />
        </Link>
      </div>
      <div className="grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
      </div>
    </section>
  );
}
