import type { Metadata } from "next";
import Link from "next/link";
import { getCategories, getCollections, getProducts } from "@/lib/api";
import { ProductCard } from "@/components/product/product-card";
import { ShopToolbar } from "@/components/shop/shop-toolbar";
import { ShopPageContent } from "@/components/shop/shop-page-content";

export const metadata: Metadata = {
  title: "Shop all",
  description: "Browse our full collection of vaporizers, pods, e-liquids and accessories.",
};

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; collection?: string; sort?: string; q?: string; page?: string; minPrice?: string; maxPrice?: string; inStock?: string; onSale?: string }>;
}) {
  const sp = await searchParams;
  const [cats, collections] = await Promise.all([getCategories(), getCollections()]);
  const page = Math.max(1, Number(sp.page) || 1);
  const perPage = 12;
  const { products: allProducts } = await getProducts({
    category: sp.category,
    collection: sp.collection,
    sort: (sp.sort as "price-asc" | "price-desc" | "newest" | "rating" | undefined),
    search: sp.q,
    limit: 100,
  });

  const prices = allProducts.map((p) => p.price);
  const priceMin = Math.min(...prices);
  const priceMax = Math.max(...prices);

  let filtered = allProducts;
  const minP = Number(sp.minPrice) || 0;
  const maxP = Number(sp.maxPrice) || Infinity;
  if (minP > 0) filtered = filtered.filter((p) => p.price >= minP);
  if (maxP < Infinity) filtered = filtered.filter((p) => p.price <= maxP);
  if (sp.inStock === "1") filtered = filtered.filter((p) => p.variants.some((v) => v.inStock));
  if (sp.onSale === "1") filtered = filtered.filter((p) => p.compareAtPrice != null);

  const totalPages = Math.ceil(filtered.length / perPage);
  const products = filtered.slice((page - 1) * perPage, page * perPage);
  const active = sp.category;

  return (
    <ShopPageContent
      cats={cats}
      collections={collections}
      sp={sp}
      priceMin={priceMin}
      priceMax={priceMax}
      products={products}
      filtered={filtered}
      page={page}
      totalPages={totalPages}
      active={active}
    />
  );
}
