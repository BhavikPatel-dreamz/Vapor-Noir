import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductBySlug, getRelatedProducts, getProducts } from "@/lib/api";
import { ProductPageContent } from "@/components/product/product-page-content";

export async function generateStaticParams() {
  const { products: list } = await getProducts();
  return list.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
): Promise<Metadata> {
  const { slug } = await params;
  const p = await getProductBySlug(slug);
  if (!p) return { title: "Not found" };
  return {
    title: p.name,
    description: p.description,
    openGraph: {
      title: `${p.name} · Vapor Noir`,
      description: p.description,
      images: [{ url: p.images[0] }],
    },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();
  const related = await getRelatedProducts(slug);

  return <ProductPageContent product={product} related={related} />;
}
