"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingBag, ArrowRight, Star, ShieldCheck, Truck } from "lucide-react";
import type { Product } from "@/types/product";

export function Hero({ product }: { product?: Product | null }) {
  const img = product?.images?.[0] || "";

  return (
    <section className="bg-gradient-to-br from-[#1565C0] via-[#1976D2] to-[#0D47A1] border-b-4 border-[#FFC107]">
      <div className="container-x">
        <div className="relative flex flex-col lg:flex-row items-center gap-8 py-12 lg:py-16">
          {/* Mega Sale Ribbon */}
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 z-20 bg-[#D32F2F] text-white px-8 py-2 font-bold text-sm uppercase tracking-wider shadow-lg border-b-2 border-[#B71C1C]">
            🔥 MEGA SALE — UP TO 40% OFF — LIMITED TIME! 🔥
          </div>

          {/* Left: Product Image */}
          <div className="w-full lg:w-1/2 relative mt-6">
            <div className="relative aspect-square max-w-md mx-auto border-4 border-[#FFC107] bg-white p-4 shadow-xl">
              {img ? (
                <Image
                  src={img}
                  alt={product?.name || "Featured product"}
                  fill
                  priority
                  className="object-contain p-2"
                  sizes="400px"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  Featured Product
                </div>
              )}
              {/* Discount badge */}
              <div className="absolute -right-4 -top-4 bg-[#D32F2F] text-white rounded-full w-20 h-20 flex flex-col items-center justify-center font-bold border-4 border-[#FFC107] shadow-lg">
                <span className="text-lg">-40%</span>
                <span className="text-[9px] uppercase">OFF</span>
              </div>
              {/* New badge */}
              <div className="absolute -left-3 bottom-4 bg-[#2E7D32] text-white px-3 py-1.5 font-bold text-xs uppercase shadow-md transform -rotate-3">
                ✨ New Arrival
              </div>
            </div>
          </div>

          {/* Right: Content */}
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <div className="text-[#FFC107] font-bold text-sm uppercase tracking-[0.2em] mb-2">
              ★ Premium Quality Vape Store ★
            </div>
            <h1 className="text-[38px] lg:text-[44px] leading-tight font-black text-white mb-4">
              Welcome to <span className="text-[#FFC107]">VAPOR</span>
              <br />
              <span className="text-2xl lg:text-3xl font-bold">Your Ultimate Vaping Destination</span>
            </h1>
            <p className="text-[15px] text-white/80 mb-8 max-w-lg mx-auto lg:mx-0 leading-relaxed">
              Shop 500+ premium disposables, pod kits, and e-liquids from top brands.
              <span className="text-[#FFC107] font-bold"> Free shipping</span> on orders over $75.
            </p>

            {/* Price */}
            {product && (
              <div className="flex items-center justify-center lg:justify-start gap-4 mb-8 bg-white/10 rounded-sm p-4 inline-flex">
                <span className="text-[32px] font-black text-[#FFC107]">
                  ${product.price}
                </span>
                {product.compareAtPrice && (
                  <>
                    <span className="text-xl text-white/60 line-through">
                      ${product.compareAtPrice}
                    </span>
                    <span className="bg-[#D32F2F] text-white text-xs font-bold px-2 py-1 rounded-sm">
                      SAVE ${product.compareAtPrice - product.price}
                    </span>
                  </>
                )}
              </div>
            )}

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 px-10 py-4 bg-[#F57C00] text-white font-bold text-base border-b-4 border-[#E65100] hover:bg-[#E65100] hover:border-[#CC4400] transition-all uppercase tracking-wide shadow-lg"
              >
                <ShoppingBag className="size-5" /> Shop Now
              </Link>
              <Link
                href="/shop?category=disposable-vape"
                className="inline-flex items-center gap-2 px-10 py-4 bg-white text-[#1565C0] font-bold text-base border-2 border-white hover:bg-[#E3F2FD] hover:border-[#FFC107] transition-all uppercase tracking-wide"
              >
                View Deals <ArrowRight className="size-5" />
              </Link>
            </div>

            {/* Trust badges */}
            <div className="mt-10 flex flex-wrap items-center justify-center lg:justify-start gap-8 text-sm text-white/80">
              <span className="flex items-center gap-2"><Truck className="size-4 text-[#FFC107]" /> Free Shipping $75+</span>
              <span className="flex items-center gap-2"><ShieldCheck className="size-4 text-[#FFC107]" /> 30-Day Returns</span>
              <span className="flex items-center gap-2"><Star className="size-4 text-[#FFC107]" /> Best Price Guarantee</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
