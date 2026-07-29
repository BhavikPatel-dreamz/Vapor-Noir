import type { Metadata } from "next";
import Link from "next/link";
import { Search as SearchIcon, ShoppingBag } from "lucide-react";
import { getProducts } from "@/lib/api";
import { ProductCard } from "@/components/product/product-card";
import { SearchInput } from "@/components/search/search-input";

export const metadata: Metadata = {
  title: "Search",
  description: "Search our collection of products.",
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const sp = await searchParams;
  const query = sp.q?.trim() || "";

  const { products } = query
    ? await getProducts({ search: query, limit: 50 })
    : { products: [] };

  return (
    <div className="bg-white min-h-screen">
      <div className="bg-gradient-to-r from-[#1565C0] to-[#0D47A1] border-b-4 border-[#FFC107]">
        <div className="container-x py-10 text-center">
          <SearchIcon className="mx-auto mb-4 size-10 text-[#FFC107]" />
          <h1 className="text-[34px] font-black text-white">Search Products</h1>
          <p className="mt-2 text-white/70 max-w-lg mx-auto">
            Search by name, category, or keyword.
          </p>
        </div>
      </div>

      <div className="container-x py-8">
        <div className="mx-auto max-w-xl">
          <SearchInput defaultValue={query} />
        </div>

        {query && (
          <div className="mt-8">
            <p className="mb-4 text-sm text-muted-foreground font-bold">
              <span className="text-[#1565C0]">{products.length}</span> result{products.length !== 1 && "s"} for &ldquo;{query}&rdquo;
            </p>
            {products.length > 0 ? (
              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {products.map((p, i) => (
                  <ProductCard key={p.id} product={p} index={i} />
                ))}
              </div>
            ) : (
              <div className="py-16 text-center border-2 border-border bg-[#E3F2FD]">
                <SearchIcon className="mx-auto mb-4 size-10 text-[#1565C0]/40" />
                <p className="text-muted-foreground font-bold">
                  No products found. Try a different search term.
                </p>
                <Link
                  href="/shop"
                  className="mt-4 inline-flex items-center gap-2 bg-[#1565C0] text-white font-bold text-sm px-6 py-3 border-b-2 border-[#0D47A1] hover:bg-[#0D47A1] transition-all rounded-sm"
                >
                  <ShoppingBag className="size-4" /> Browse All Products
                </Link>
              </div>
            )}
          </div>
        )}

        {!query && (
          <div className="py-16 text-center">
            <SearchIcon className="mx-auto mb-4 size-12 text-[#1565C0]/30" />
            <p className="text-muted-foreground font-bold">
              Start typing to search our collection.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
