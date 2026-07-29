const items = [
  "FREE SHIPPING OVER $75",
  "✅ 3-YEAR WARRANTY",
  "✅ 30-DAY RETURNS",
  "✅ BEST PRICE GUARANTEE",
  "✅ PREMIUM BRANDS",
  "✅ AUTHENTIC PRODUCTS",
  "✅ FAST EU DELIVERY",
  "✅ 24/7 CUSTOMER SUPPORT",
];

export function BrandMarquee() {
  const doubled = [...items, ...items];

  return (
    <div className="border-y-2 border-[#1565C0] bg-[#1565C0] overflow-hidden">
      <div className="animate-marquee flex whitespace-nowrap py-3.5">
        {doubled.map((item, i) => (
          <span key={i} className="mx-10 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white">
            <span className="inline-block size-2 rounded-full bg-[#FFC107]" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
