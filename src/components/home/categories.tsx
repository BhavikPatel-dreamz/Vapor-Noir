import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getCategories } from "@/lib/api";

export async function Categories() {
  const cats = await getCategories();
  return (
    <section className="container-x py-16 md:py-24">
      <div className="mb-10 flex items-end justify-between gap-6">
        <div>
          <div className="mb-2 text-[11px] uppercase tracking-[0.25em] text-muted-foreground">01 · Categories</div>
          <h2 className="font-display text-4xl tracking-tight md:text-5xl">Curated collections</h2>
        </div>
        <Link href="/shop" className="hidden text-sm text-primary hover:underline md:inline-flex">
          View all →
        </Link>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {cats.map((c) => (
          <Link
            key={c.id}
            href={`/shop?category=${c.slug}`}
            className="group relative aspect-[4/5] overflow-hidden rounded-lg bg-muted"
          >
            {c.image ? (
              <Image
                src={c.image}
                alt={c.name}
                fill
                sizes="(min-width: 1024px) 25vw, 50vw"
                className="object-cover transition-transform duration-[900ms] group-hover:scale-105"
              />
            ) : null}
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-5">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <div className="font-display text-2xl">{c.name}</div>
                  <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{c.description}</p>
                </div>
                <ArrowUpRight className="size-5 shrink-0 text-primary transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
