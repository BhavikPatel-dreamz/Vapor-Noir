import Image from "next/image";
import Link from "next/link";
import type { Category } from "@/types/product";

const catColors = [
  { bg: "bg-[#E3F2FD]", border: "border-[#1565C0]", txt: "text-[#1565C0]" },
  { bg: "bg-[#FFF3E0]", border: "border-[#F57C00]", txt: "text-[#F57C00]" },
  { bg: "bg-[#E8F5E9]", border: "border-[#2E7D32]", txt: "text-[#2E7D32]" },
  { bg: "bg-[#FFEBEE]", border: "border-[#D32F2F]", txt: "text-[#D32F2F]" },
];

export function Categories({ categories }: { categories: Category[] }) {
  if (categories.length === 0) return null;

  return (
    <section className="bg-white border-b-2 border-border py-8">
      <div className="container-x">
        <div className="section-title-bar">📂 Shop by Category</div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {categories.slice(0, 8).map((c, i) => {
            const clr = catColors[i % catColors.length];
            return (
              <Link
                key={c.id}
                href={`/shop?category=${c.slug}`}
                className={`group relative overflow-hidden border-2 ${clr.border} ${clr.bg} card-hover p-6 text-center`}
              >
                <div className="relative aspect-square max-w-[120px] mx-auto mb-4">
                  {c.image ? (
                    <Image
                      src={c.image}
                      alt={c.name}
                      fill
                      className="object-contain"
                      sizes="120px"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-4xl font-black" style={{ opacity: 0.3 }}>
                      {c.name.charAt(0)}
                    </div>
                  )}
                </div>
                <h3 className={`font-bold text-lg ${clr.txt} group-hover:underline`}>
                  {c.name}
                </h3>
                {c.description && (
                  <p className="mt-1 text-xs text-muted-foreground">{c.description}</p>
                )}
                <div className={`mt-3 text-xs font-bold ${clr.txt} opacity-0 group-hover:opacity-100 transition-opacity`}>
                  Shop Now →
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
