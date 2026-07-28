"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Clock } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const articles = [
  {
    id: 1,
    title: "Convection vs. Conduction: The Ultimate Temperature Guide",
    category: "Guides",
    readTime: "5 min",
    date: "Jul 24",
    summary: "How precise airflow dynamics impact flavor profiles, terpene preservation, and vapor smoothness.",
    image: "/images/generated/blog_temperature_guide_1785229088200.jpg",
  },
  {
    id: 2,
    title: "The Art of Oak Aging Small-Batch E-Liquids in Bordeaux",
    category: "Craft",
    readTime: "7 min",
    date: "Jul 18",
    summary: "An inside look at our 90-day barrel aging process that unlocks deep vanilla and toasted oak notes.",
    image: "/images/generated/blog_oak_aging_1785229215281.jpg",
  },
  {
    id: 3,
    title: "Maintaining Medical Ceramic Chambers for Peak Performance",
    category: "Maintenance",
    readTime: "4 min",
    date: "Jul 10",
    summary: "Step-by-step care techniques to ensure your device delivers pure flavor for years.",
    image: "/images/generated/blog_ceramic_chamber_1785229233539.jpg",
  },
];

export function BlogSection() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const header = el.querySelector(".blog-header");
    const cards = Array.from(el.querySelectorAll(".blog-card"));

    const ctx = gsap.context(() => {
      if (header) {
        const items = Array.from(header.children);
        gsap.set(items, { y: 20, opacity: 0 });
        gsap.to(items, {
          y: 0, opacity: 1, duration: 0.7, ease: "power3.out", stagger: 0.1,
          scrollTrigger: { trigger: header, start: "top 85%", once: true },
        });
      }
      if (cards.length > 0) {
        gsap.set(cards, { y: 30, opacity: 0 });
        gsap.to(cards, {
          y: 0, opacity: 1, duration: 0.6, ease: "power3.out", stagger: 0.1,
          scrollTrigger: { trigger: el, start: "top 80%", once: true },
        });
      }
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="container-x py-16 md:py-24">
      <div className="blog-header mb-10 flex items-end justify-between gap-6">
        <div>
          <div className="mb-2 text-[11px] uppercase tracking-[0.25em] text-muted-foreground">Journal</div>
          <h2 className="font-display text-3xl tracking-tight md:text-4xl lg:text-5xl">Stories & Guides</h2>
        </div>
        <Link href="/about" className="hidden text-sm text-primary hover:underline md:inline-flex items-center gap-1">
          All articles <ArrowUpRight className="size-3.5" />
        </Link>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        {articles.map((article, i) => (
          <article
            key={article.id}
            className={`blog-card group overflow-hidden rounded-2xl border border-border/60 bg-card/20 transition-all duration-300 hover:border-primary/20 hover:bg-card/40 ${
              i === 0 ? "md:col-span-2 md:grid md:grid-cols-[1.2fr_1fr]" : ""
            }`}
          >
            <div className="relative aspect-[16/10] overflow-hidden bg-muted md:aspect-auto">
              <Image
                src={article.image}
                alt={article.title}
                fill
                sizes={i === 0 ? "(min-width: 768px) 40vw, 100vw" : "(min-width: 768px) 33vw, 100vw"}
                className="object-cover transition-all duration-700 group-hover:scale-105 group-hover:brightness-110"
              />
              <div className="absolute top-3 left-3 rounded-full border border-white/20 bg-black/40 px-3 py-1 text-[10px] uppercase tracking-wider backdrop-blur-md">
                {article.category}
              </div>
            </div>

            <div className={`flex flex-col p-5 ${i === 0 ? "justify-center p-6 md:p-8" : ""}`}>
              <div className="flex items-center gap-2.5 text-[11px] text-muted-foreground">
                <span className="flex items-center gap-1"><Clock className="size-3" /> {article.readTime}</span>
                <span className="text-border">·</span>
                <span>{article.date}</span>
              </div>

              <h3 className={`mt-2.5 font-display leading-snug tracking-tight group-hover:text-primary transition-colors ${
                i === 0 ? "text-xl md:text-2xl" : "text-lg"
              }`}>
                {article.title}
              </h3>

              <p className="mt-2 line-clamp-2 flex-1 text-xs leading-relaxed text-muted-foreground">
                {article.summary}
              </p>

              <div className="mt-4 flex items-center gap-1.5 text-xs font-medium text-primary">
                Read article
                <ArrowUpRight className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
