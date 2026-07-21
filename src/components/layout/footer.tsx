import Link from "next/link";
import { Instagram, Youtube, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-12 border-t border-border bg-muted/20 md:mt-24">
      <div className="container-x grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <div className="font-display text-2xl tracking-tight">
            Vapor <span className="text-primary">Noir</span>
          </div>
          <p className="mt-4 max-w-sm text-sm text-muted-foreground">
            Craft-engineered vaporizers and small-batch e-liquids. Designed in Copenhagen, built to
            last.
          </p>
          <div className="mt-6 flex gap-3">
            <a href="#" className="rounded-full border border-border p-2 hover:bg-muted"><Instagram className="size-4" /></a>
            <a href="#" className="rounded-full border border-border p-2 hover:bg-muted"><Youtube className="size-4" /></a>
            <a href="#" className="rounded-full border border-border p-2 hover:bg-muted"><Twitter className="size-4" /></a>
          </div>
        </div>
        {[
          { title: "Shop", links: [["Vaporizers", "/shop?category=vaporizers"], ["Pods & Mods", "/shop?category=pods-and-mods"], ["E-Liquids", "/shop?category=e-liquids"], ["Accessories", "/shop?category=accessories"]] },
          { title: "Support", links: [["Contact", "/contact"], ["Shipping", "/about"], ["Returns", "/about"], ["Warranty", "/about"]] },
          { title: "Company", links: [["About", "/about"], ["Journal", "/about"], ["Stores", "/about"], ["Careers", "/about"]] },
        ].map((col) => (
          <div key={col.title}>
            <div className="mb-4 text-xs uppercase tracking-[0.2em] text-muted-foreground">{col.title}</div>
            <ul className="space-y-3">
              {col.links.map(([label, href]) => (
                <li key={label}><Link href={href} className="text-sm hover:text-primary">{label}</Link></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-border">
        <div className="container-x flex flex-col gap-2 py-6 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">
          <div>© {new Date().getFullYear()} Vapor Noir. All rights reserved.</div>
          <div>Warning: this product contains nicotine. Nicotine is an addictive chemical.</div>
        </div>
      </div>
    </footer>
  );
}
