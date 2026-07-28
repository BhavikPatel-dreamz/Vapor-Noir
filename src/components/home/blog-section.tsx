import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, BookOpen, Clock } from "lucide-react";

const articles = [
  {
    id: 1,
    title: "Convection vs. Conduction: The Ultimate Temperature Guide",
    category: "Guides",
    readTime: "5 min read",
    date: "July 24, 2026",
    summary: "Discover how precise airflow dynamics impact flavor profiles, terpene preservation, and vapor smoothness.",
    image: "/images/generated/blog_temperature_guide_1785229088200.jpg",
  },
  {
    id: 2,
    title: "The Art of Oak Aging Small-Batch E-Liquids in Bordeaux",
    category: "Craftsmanship",
    readTime: "7 min read",
    date: "July 18, 2026",
    summary: "An inside look at our 90-day barrel aging process that unlocks deep vanilla and toasted oak notes.",
    image: "/images/generated/blog_oak_aging_1785229215281.jpg",
  },
  {
    id: 3,
    title: "Maintaining Medical Ceramic Chambers for Peak Performance",
    category: "Maintenance",
    readTime: "4 min read",
    date: "July 10, 2026",
    summary: "Step-by-step care techniques to ensure your Obsidian Pro delivers 100% pure flavor for years.",
    image: "/images/generated/blog_ceramic_chamber_1785229233539.jpg",
  },
];

export function BlogSection() {
  return (
    <section className="container-x py-16 md:py-24">
      <div className="mb-10 flex items-end justify-between gap-6">
        <div>
          <h2 className="font-display text-4xl tracking-tight md:text-5xl">
            Latest Stories & Guides
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">Expert insights on temperature control, glass care, and craftsmanship.</p>
        </div>
        <Link href="/about" className="hidden text-sm text-primary hover:underline md:inline-flex items-center gap-1">
          Explore Journal <ArrowUpRight className="size-4" />
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {articles.map((article) => (
          <article
            key={article.id}
            className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:border-primary/50 hover:shadow-lg"
          >
            <div className="relative aspect-[16/10] overflow-hidden bg-muted">
              <Image
                src={article.image}
                alt={article.title}
                fill
                sizes="(min-width: 768px) 33vw, 100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute top-3 left-3 rounded-full border border-border/60 bg-background/80 px-3 py-1 text-[10px] uppercase tracking-wider backdrop-blur">
                {article.category}
              </div>
            </div>

            <div className="flex flex-1 flex-col p-6">
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><Clock className="size-3" /> {article.readTime}</span>
                <span>•</span>
                <span>{article.date}</span>
              </div>

              <h3 className="mt-3 font-display text-xl leading-snug tracking-tight group-hover:text-primary transition-colors">
                {article.title}
              </h3>

              <p className="mt-2 line-clamp-2 flex-1 text-xs text-muted-foreground leading-relaxed">
                {article.summary}
              </p>

              <div className="mt-5 border-t border-border/60 pt-4 flex items-center justify-between text-xs font-medium text-primary">
                <span>Read article</span>
                <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
