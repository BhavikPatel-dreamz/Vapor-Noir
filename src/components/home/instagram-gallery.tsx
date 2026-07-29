import { Instagram, Heart, MessageCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const feedImages = [
  { id: 1, url: "/images/generated/community_shot_1_1785229249506.jpg", handle: "@vapornoir_official", likes: 234 },
  { id: 2, url: "/images/generated/community_shot_2_1785229268515.jpg", handle: "@vape_connoisseur", likes: 189 },
  { id: 3, url: "/images/generated/community_shot_3_1785229287427.jpg", handle: "@nordic_edits", likes: 312 },
  { id: 4, url: "/images/generated/blog_temperature_guide_1785229088200.jpg", handle: "@atelier_craft", likes: 156 },
];

export function InstagramGallery() {
  return (
    <section className="bg-white border-b-2 border-border py-8">
      <div className="container-x">
        <div className="flex items-center justify-between mb-5">
          <h2 className="section-title-bar mb-0 flex-1">📸 Follow Us on Instagram</h2>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 bg-gradient-to-r from-[#833AB4] to-[#FD1D1D] text-white text-xs font-bold px-5 py-2.5 hover:opacity-90 transition-all rounded-sm shadow-sm ml-4"
          >
            <Instagram className="size-4" /> Follow @VAPOR
          </a>
        </div>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {feedImages.map((img) => (
            <a
              key={img.id}
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="group relative aspect-square overflow-hidden border-2 border-border bg-muted shadow-sm card-hover"
            >
              <Image
                src={img.url}
                alt="Community shot"
                fill
                sizes="(min-width: 768px) 25vw, 50vw"
                className="object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/50">
                <Instagram className="size-10 text-white mb-2" />
                <div className="flex items-center gap-4 text-white text-xs font-bold">
                  <span className="flex items-center gap-1"><Heart className="size-3.5" /> {img.likes}</span>
                  <span className="flex items-center gap-1"><MessageCircle className="size-3.5" /></span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
