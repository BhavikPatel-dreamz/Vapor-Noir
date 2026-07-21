import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getProducts } from "@/lib/api";

export async function EditorialSplit() {
  const { products: list } = await getProducts({ limit: 1 });
  const product = list[0] ?? null;

  return (
    <section className="container-x py-16 md:py-24">
      <div className="grid overflow-hidden rounded-2xl border border-border lg:grid-cols-2">
        <div className="relative aspect-video min-h-[240px] lg:aspect-auto lg:min-h-[420px]">
          {product?.images?.[0] ? (
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          ) : null}
        </div>
        <div className="flex flex-col justify-center gap-5 bg-card p-6 md:p-10 lg:p-16">
          {product && (
            <>
              <div className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
                {product.name}
              </div>
              <h2 className="font-display text-2xl leading-tight tracking-tight md:text-4xl lg:text-5xl">
                {product.tagline || "Discover quality."}
              </h2>
              <p className="text-muted-foreground">
                {product.description || "Premium products crafted for the enthusiast."}
              </p>
              <div className="pt-2">
                <Button asChild size="lg" variant="outline">
                  <Link href={`/product/${product.slug}`}>Explore {product.name} →</Link>
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
