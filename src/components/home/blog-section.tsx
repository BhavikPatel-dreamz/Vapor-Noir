import Image from "next/image";
import Link from "next/link";
import { Clock, ArrowRight, BookOpen } from "lucide-react";

const articles = [
  {
    id: 1,
    title: "The Ultimate Guide to Choosing Your First Vape",
    category: "Guides",
    readTime: "5 min",
    date: "Jul 24, 2026",
    summary: "Everything you need to know about selecting the perfect device for your needs.",
    image: "/images/generated/blog_temperature_guide_1785229088200.jpg",
  },
  {
    id: 2,
    title: "Top 10 Best-Selling Disposable Vapes of 2026",
    category: "Reviews",
    readTime: "7 min",
    date: "Jul 18, 2026",
    summary: "Our expert picks for the hottest disposables on the market right now.",
    image: "/images/generated/blog_oak_aging_1785229215281.jpg",
  },
  {
    id: 3,
    title: "How to Maintain Your Vape Device for Long Life",
    category: "Maintenance",
    readTime: "4 min",
    date: "Jul 10, 2026",
    summary: "Simple tips to keep your device performing at its best for years to come.",
    image: "/images/generated/blog_ceramic_chamber_1785229233539.jpg",
  },
];

export function BlogSection() {
  return (
    <section className="bg-[#E8F5E9] border-b-2 border-border py-8">
      <div className="container-x">
        <div className="section-title-bar-green">📖 Latest News & Guides</div>
        <div className="grid gap-6 md:grid-cols-3">
          {articles.map((article) => (
            <article
              key={article.id}
              className="border-2 border-border bg-white card-hover"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-muted border-b-2 border-border">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover group-hover:scale-105 transition-transform"
                />
                <div className="absolute top-3 left-3 bg-[#D32F2F] text-white text-[10px] font-bold px-2.5 py-1 uppercase tracking-wider shadow-sm">
                  {article.category}
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                  <span className="flex items-center gap-1"><Clock className="size-3" /> {article.readTime}</span>
                  <span className="text-border">|</span>
                  <span>{article.date}</span>
                </div>
                <h3 className="font-bold text-lg text-foreground leading-snug hover:text-[#1565C0] transition-colors mb-2">
                  {article.title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                  {article.summary}
                </p>
                <div className="flex items-center gap-1.5 text-sm font-bold text-[#2E7D32] hover:underline">
                  <BookOpen className="size-3.5" /> Read More <ArrowRight className="size-3.5" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
