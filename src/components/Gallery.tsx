"use client";

import Image from "next/image";
import { useState } from "react";
import { Search } from "lucide-react";

interface GalleryItem {
  id: string;
  src: string;
  title: string;
  category: string;
  aspect: string;
}

export default function Gallery() {
  const items: GalleryItem[] = [
    {
      id: "gal-1",
      src: "/images/hero_bg.jpg",
      title: "The Solarium Lounge",
      category: "Aesthetics",
      aspect: "aspect-[16/9] md:col-span-12 lg:col-span-8",
    },
    {
      id: "gal-2",
      src: "/images/coffee_pour.jpg",
      title: "Extraction calibration",
      category: "Craft",
      aspect: "aspect-[3/4] md:col-span-6 lg:col-span-4",
    },
    {
      id: "gal-3",
      src: "/images/dish_truffle.jpg",
      title: "Alba Truffle Tagliolini",
      category: "Culinary",
      aspect: "aspect-[4/3] md:col-span-6 lg:col-span-5",
    },
    {
      id: "gal-4",
      src: "/images/dish_pastry.jpg",
      title: "Glazed Sicilian Pistachio Tart",
      category: "Pastries",
      aspect: "aspect-[16/10] md:col-span-12 lg:col-span-7",
    },
  ];

  const [activeHover, setActiveHover] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, id: string) => {
    const box = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - box.left;
    const y = e.clientY - box.top;
    setMousePos({ x, y });
    setActiveHover(id);
  };

  const handleMouseLeave = () => {
    setActiveHover(null);
  };

  return (
    <section
      id="gallery"
      className="relative w-full py-24 md:py-36 bg-[#0B0B0B] text-[#F8F4ED] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        {/* Title */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-6">
          <div>
            <span className="text-xs tracking-[0.3em] uppercase text-gold font-bold mb-4 block">
              CHAPTER VI — GALLERY
            </span>
            <h2 className="text-4xl md:text-6xl font-light serif-title tracking-tight leading-[1.1]">
              Aesthetics in <br />
              <span className="italic font-normal text-gold">Focus</span>
            </h2>
          </div>
          <p className="max-w-md text-sm text-neutral-400 font-light leading-relaxed tracking-wider">
            Visual chapters capturing raw culinary ingredients, spatial geometric frames, and the ephemeral mist of espresso extraction.
          </p>
        </div>

        {/* Masonry-Style Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {items.map((item) => (
            <div
              key={item.id}
              onMouseMove={(e) => handleMouseMove(e, item.id)}
              onMouseLeave={handleMouseLeave}
              className={`relative overflow-hidden rounded-xl border border-white/5 shadow-2xl group cursor-pointer ${item.aspect}`}
            >
              {/* Image Container with Zoom */}
              <div className="relative w-full h-full min-h-[300px]">
                <Image
                  src={item.src}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105"
                />

                {/* Mouse-Follow Spotlight Glow */}
                {activeHover === item.id && (
                  <div
                    className="absolute pointer-events-none rounded-full w-[250px] h-[250px] mix-blend-overlay opacity-30 blur-2xl z-20"
                    style={{
                      left: `${mousePos.x - 125}px`,
                      top: `${mousePos.y - 125}px`,
                      background: "radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 70%)",
                      transition: "transform 0.1s ease-out",
                    }}
                  />
                )}

                {/* Glass reflection look overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-[1000ms] pointer-events-none z-10" />

                {/* Shadow overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-85 transition-opacity duration-500" />

                {/* Caption Details */}
                <div className="absolute bottom-6 left-6 right-6 z-30 flex items-end justify-between translate-y-3 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="space-y-1">
                    <span className="text-[9px] uppercase tracking-[0.25em] text-gold font-bold">
                      {item.category}
                    </span>
                    <h3 className="text-xl font-light serif-title text-white">
                      {item.title}
                    </h3>
                  </div>
                  <div className="p-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-white scale-0 group-hover:scale-100 transition-transform duration-500">
                    <Search className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
