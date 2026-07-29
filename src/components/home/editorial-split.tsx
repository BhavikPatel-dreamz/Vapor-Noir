import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShoppingBag, Star, ShieldCheck } from "lucide-react";
import type { Product } from "@/types/product";

export function EditorialSplit({ product }: { product: Product | null }) {
  if (!product) return null;

  return (
    <section className="bg-[#FFF8E1] border-b-2 border-[#FFC107] py-8">
      <div className="container-x">
        <div className="section-title-bar-red">⭐ Featured Product of the Week</div>
        <div className="grid border-2 border-[#FFC107] bg-white md:grid-cols-2 shadow-md">
          <div className="relative aspect-[4/3] min-h-[350px] overflow-hidden bg-white p-4 border-r-2 border-[#FFC107]/30">
            {product.images?.[0] ? (
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-contain p-4"
              />
            ) : null}
            <div className="absolute top-4 left-4 bg-[#D32F2F] text-white font-bold text-xs px-3 py-1.5 -rotate-3 shadow-md">
              🔥 HOT PICK
            </div>
          </div>
          <div className="flex flex-col justify-center p-8 lg:p-12 bg-gradient-to-br from-white to-[#FFF8E1]">
            <div className="text-xs font-bold uppercase tracking-wide text-[#D32F2F] mb-2 flex items-center gap-2">
              <Star className="size-4 text-[#FFC107] fill-[#FFC107]" /> Editor&apos;s Choice
            </div>
            <h2 className="text-[30px] font-black text-[#1565C0] leading-tight mb-3">
              {product.name}
            </h2>
            <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
              {product.description || "Premium quality products crafted for the best experience. Limited stock available!"}
            </p>
            <div className="flex items-center gap-5 mb-6">
              <span className="text-3xl font-black text-[#D32F2F]">${product.price}</span>
              {product.compareAtPrice && (
                <span className="text-base text-muted-foreground line-through">${product.compareAtPrice}</span>
              )}
              {product.compareAtPrice && (
                <span className="bg-[#2E7D32] text-white font-bold text-xs px-2 py-1 rounded-sm">
                  Save ${product.compareAtPrice - product.price}
                </span>
              )}
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href={`/product/${product.slug}`}
                className="inline-flex items-center gap-2 bg-[#1565C0] text-white font-bold px-8 py-3.5 text-sm border-b-2 border-[#0D47A1] hover:bg-[#0D47A1] transition-all rounded-sm"
              >
                <ShoppingBag className="size-4" /> Shop Now <ArrowRight className="size-4" />
              </Link>
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 border-2 border-[#1565C0] text-[#1565C0] font-bold px-8 py-3.5 text-sm hover:bg-[#E3F2FD] transition-all rounded-sm"
              >
                View All Products
              </Link>
            </div>
            <div className="mt-6 flex items-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5"><ShieldCheck className="size-3.5 text-[#2E7D32]" /> 30-Day Returns</span>
              <span className="flex items-center gap-1.5"><Star className="size-3.5 text-[#FFC107]" /> Best Price</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
