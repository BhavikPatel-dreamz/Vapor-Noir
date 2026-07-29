import { Hero } from "@/components/home/hero";
import { ValueProps } from "@/components/home/value-props";
import { Categories } from "@/components/home/categories";
import { FeaturedGridServer } from "@/components/home/featured-grid";
import { SpecialPromos } from "@/components/home/promos";
import { Craftsmanship } from "@/components/home/craftsmanship";
import { EditorialSplit } from "@/components/home/editorial-split";
import { BlogSection } from "@/components/home/blog-section";
import { Testimonials } from "@/components/home/testimonials";
import { FAQSection } from "@/components/home/faq-section";
import { InstagramGallery } from "@/components/home/instagram-gallery";
import { Newsletter } from "@/components/home/newsletter";
import { BrandMarquee } from "@/components/home/brand-marquee";
import { GsapReveal } from "@/components/ui/gsap-reveal";
import { getProducts, getCategories } from "@/lib/api";

export default async function HomePage() {
  const { products: list } = await getProducts({ limit: 2 });
  const heroProduct = list[1] ?? list[0] ?? null;
  const categories = await getCategories();

  return (
    <>
      <Hero product={heroProduct} />
      <BrandMarquee />
      <GsapReveal y={30}>
        <ValueProps />
      </GsapReveal>
      <GsapReveal y={30}>
        <Categories categories={categories} />
      </GsapReveal>
      <FeaturedGridServer />
      <BrandMarquee />
      <GsapReveal y={30}>
        <SpecialPromos />
      </GsapReveal>
      <GsapReveal y={30}>
        <Craftsmanship />
      </GsapReveal>
      <GsapReveal y={30}>
        <EditorialSplit product={heroProduct} />
      </GsapReveal>
      <GsapReveal y={30}>
        <BlogSection />
      </GsapReveal>
      <Testimonials />
      <FAQSection />
      <GsapReveal y={30}>
        <InstagramGallery />
      </GsapReveal>
      <Newsletter />
    </>
  );
}
