import Link from "next/link";
import { ArrowRight, Gift, ShoppingBag } from "lucide-react";

export function SpecialPromos() {
  return (
    <section className="bg-[#E3F2FD] border-b-2 border-border py-8">
      <div className="container-x">
        <div className="section-title-bar-orange">🎁 Special Offers & Deals</div>
        <div className="grid gap-6 md:grid-cols-2">
          {/* Promo 1 */}
          <div className="border-b-4 border-[#D32F2F] bg-gradient-to-r from-[#D32F2F] to-[#B71C1C] p-8 text-white shadow-md">
            <div className="inline-flex items-center gap-1.5 bg-[#FFC107] text-[#333] font-bold text-xs px-3 py-1.5 mb-4 rounded-sm">
              <Gift className="size-3.5" /> LIMITED EDITION
            </div>
            <h3 className="text-3xl font-black mb-1">Weekend Flash Sale</h3>
            <h4 className="text-xl font-bold text-[#FFC107] mb-3">Up to 40% Off Everything!</h4>
            <p className="text-sm text-white/80 mb-6 max-w-sm">
              Premium disposables, pod kits, and e-liquids at unbeatable prices. Stock up and save big!
            </p>
            <div className="flex items-center justify-between">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 bg-white text-[#D32F2F] font-bold px-6 py-3 text-sm hover:bg-[#FFC107] hover:text-[#333] transition-all rounded-sm"
              >
                <ShoppingBag className="size-4" /> Shop Sale
              </Link>
              <span className="text-sm font-bold text-[#FFC107]">Ends Soon!</span>
            </div>
          </div>

          {/* Promo 2 */}
          <div className="border-b-4 border-[#2E7D32] bg-gradient-to-r from-[#2E7D32] to-[#1B5E20] p-8 text-white shadow-md">
            <div className="inline-flex items-center gap-1.5 bg-[#FFC107] text-[#333] font-bold text-xs px-3 py-1.5 mb-4 rounded-sm">
              <Gift className="size-3.5" /> BUNDLE & SAVE
            </div>
            <h3 className="text-3xl font-black mb-1">Premium Starter Kit</h3>
            <h4 className="text-xl font-bold text-[#FFC107] mb-3">Complete Setup — Save $95!</h4>
            <p className="text-sm text-white/80 mb-6 max-w-sm">
              Premium device + 2 premium e-liquids + carry case. Everything you need to start your journey.
            </p>
            <div className="flex items-center justify-between">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 bg-white text-[#2E7D32] font-bold px-6 py-3 text-sm hover:bg-[#FFC107] hover:text-[#333] transition-all rounded-sm"
              >
                <ShoppingBag className="size-4" /> Claim Offer
              </Link>
              <span className="text-sm font-bold text-[#FFC107]">Save $95</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
