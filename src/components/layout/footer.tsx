import Link from "next/link";
import { Instagram, Youtube, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-12 border-t border-border bg-card/20 md:mt-24">
      <div className="container-x grid gap-10 py-16 md:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-3 font-display text-2xl tracking-tight">
            <img src="/logo.svg" alt="Vapor Noir Logo" className="size-8 rounded-lg" />
            <span>Vapor <span className="text-primary">Noir</span></span>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
            Craft-engineered vaporizers, dry herb pieces, and small-batch extracts. Designed in Copenhagen, built to last.
          </p>
          <div className="mt-6 flex gap-3">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram" className="rounded-full border border-border p-2.5 transition-all duration-200 hover:bg-primary hover:text-primary-foreground hover:border-primary hover:shadow-lg hover:shadow-primary/20"><Instagram className="size-4" /></a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer" aria-label="Youtube" className="rounded-full border border-border p-2.5 transition-all duration-200 hover:bg-destructive hover:text-destructive-foreground hover:border-destructive hover:shadow-lg hover:shadow-destructive/20"><Youtube className="size-4" /></a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter" className="rounded-full border border-border p-2.5 transition-all duration-200 hover:bg-primary hover:text-primary-foreground hover:border-primary hover:shadow-lg hover:shadow-primary/20"><Twitter className="size-4" /></a>
          </div>
        </div>
        {[
          { title: "Shop Catalog", links: [["Spoons", "/shop?category=spoons"], ["Bubblers & Rigs", "/shop?category=bubblers-rigs"], ["Collector Bundles", "/shop?category=bundles"], ["Accessories & Apparel", "/shop?category=accessories"]] },
          { title: "Support", links: [["Contact", "/contact"], ["Shipping", "/about"], ["Returns", "/about"], ["Warranty", "/about"]] },
          { title: "Company", links: [["About", "/about"], ["Journal", "/about"], ["Stores", "/about"], ["Careers", "/about"]] },
        ].map((col) => (
          <div key={col.title}>
            <div className="mb-4 text-[11px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">{col.title}</div>
            <ul className="space-y-2.5">
              {col.links.map(([label, href]) => (
                <li key={label}>
                  <Link href={href} className="relative inline-block text-sm text-muted-foreground transition-colors duration-200 hover:text-primary after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-border bg-card/30">
        <div className="container-x flex flex-col gap-2 py-6 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">
          <div>© {new Date().getFullYear()} Vapor Noir. All rights reserved.</div>
          <div className="text-[10px] uppercase tracking-wider opacity-70">Warning: this product contains nicotine. Nicotine is an addictive chemical.</div>
        </div>
      </div>
    </footer>
  );
}
