"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useRef } from "react";
import { Heart, Info, ChefHat, Sparkles } from "lucide-react";

interface Dish {
  id: string;
  name: string;
  price: string;
  image: string;
  story: string;
  ingredients: string[];
  calories: string;
  pairing: string;
  chefNote: string;
}

interface CulinaryCollectionProps {
  favorites: string[];
  onToggleFavorite: (id: string) => void;
}

export default function CulinaryCollection({ favorites, onToggleFavorite }: CulinaryCollectionProps) {
  const dishes: Dish[] = [
    {
      id: "truffle-tagliolini",
      name: "Black Truffle Tagliolini",
      price: "$45",
      image: "/images/dish_truffle.jpg",
      story: "A luxurious hand-cut pasta tossed in triple-churned Normandy butter, shaved Alba white truffle, and a dash of edible gold dust.",
      ingredients: ["Hand-cut Tagliolini", "Winter Truffle", "Aged Parmigiano", "Normandy Butter"],
      calories: "520 kcal",
      pairing: "French Chardonnay or Smoked Oak Latte",
      chefNote: "Truffles are sourced directly from Alba, Italy and shaved fresh. Serve immediately to capture the earthy aroma.",
    },
    {
      id: "pistachio-tart",
      name: "Glazed Pistachio Tart",
      price: "$28",
      image: "/images/dish_pastry.jpg",
      story: "A delicate chocolate and almond shell filled with dense roasted Sicilian pistachio praline, raspberries, and white chocolate curls.",
      ingredients: ["Bronte Pistachios", "Raspberry Coulis", "Organic White Chocolate", "Crispy Sable"],
      calories: "410 kcal",
      pairing: "Velvet Cold Drip or Espresso",
      chefNote: "Crafted daily at 5:00 AM. We roast the pistachios in-house for a richer, toasted aroma.",
    },
  ];

  // Mouse tilt logic state and refs
  const [tiltStyles, setTiltStyles] = useState<{ [key: string]: string }>({});

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, id: string) => {
    const card = e.currentTarget;
    const box = card.getBoundingClientRect();
    const x = e.clientX - box.left - box.width / 2;
    const y = e.clientY - box.top - box.height / 2;
    
    // Divide by dampening factor to restrict rotation angle
    const rotateX = -(y / box.height) * 15;
    const rotateY = (x / box.width) * 15;

    setTiltStyles((prev) => ({
      ...prev,
      [id]: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`,
    }));
  };

  const handleMouseLeave = (id: string) => {
    setTiltStyles((prev) => ({
      ...prev,
      [id]: `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`,
    }));
  };

  return (
    <section
      id="culinary"
      className="relative w-full py-24 md:py-36 bg-[#F8F4ED] text-[#0B0B0B] dark:bg-[#0B0B0B] dark:text-[#F8F4ED] transition-colors duration-500 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-6">
          <div>
            <span className="text-xs tracking-[0.3em] uppercase text-gold font-bold mb-4 block">
              CHAPTER III — CULINARY COLLECTION
            </span>
            <h2 className="text-4xl md:text-6xl font-light serif-title tracking-tight leading-[1.1]">
              Artisanal Plates, <br />
              <span className="italic font-normal text-gold">Timeless Taste</span>
            </h2>
          </div>
          <p className="max-w-md text-sm text-neutral-600 dark:text-neutral-400 font-light leading-relaxed tracking-wider">
            Gourmet offerings constructed by world-renowned chefs. Every plate represents a balance between aesthetic presentation and deep culinary layers.
          </p>
        </div>

        {/* Dishes Showcase Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {dishes.map((dish) => {
            const isFavorite = favorites.includes(dish.id);
            return (
              <div
                key={dish.id}
                onMouseMove={(e) => handleMouseMove(e, dish.id)}
                onMouseLeave={() => handleMouseLeave(dish.id)}
                className="relative rounded-2xl p-6 md:p-8 bg-white/40 dark:bg-neutral-900/40 border border-[#0B0B0B]/5 dark:border-[#F8F4ED]/5 shadow-xl backdrop-blur-sm transition-all duration-300 flex flex-col gap-8 select-none"
                style={{
                  transform: tiltStyles[dish.id] || "perspective(1000px) rotateX(0deg) rotateY(0deg)",
                  transition: "transform 0.1s ease-out, background-color 0.5s ease",
                }}
              >
                {/* Visual Image container */}
                <div className="relative w-full h-[280px] md:h-[350px] overflow-hidden rounded-xl shadow-inner group">
                  <Image
                    src={dish.image}
                    alt={dish.name}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-60 group-hover:opacity-85 transition-opacity duration-500" />
                  
                  {/* Floating price and favorite button */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-20">
                    <span className="px-4 py-1.5 rounded-full bg-matte-black/75 border border-gold/30 text-gold text-xs font-semibold uppercase tracking-wider backdrop-blur-md">
                      {dish.price}
                    </span>
                    
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleFavorite(dish.id);
                      }}
                      className="p-2.5 rounded-full bg-[#F8F4ED]/80 hover:bg-white dark:bg-matte-black/80 dark:hover:bg-matte-black border border-gold/20 text-[#0B0B0B] dark:text-[#F8F4ED] hover:scale-110 active:scale-95 transition-all duration-300"
                      title={isFavorite ? "Remove from Favorites" : "Add to Favorites"}
                    >
                      <Heart
                        className={`w-4 h-4 transition-colors duration-300 ${
                          isFavorite ? "fill-red-500 text-red-500" : "text-gold"
                        }`}
                      />
                    </button>
                  </div>

                  {/* Name and Story floating inside image overlay */}
                  <div className="absolute bottom-4 left-4 right-4 text-white z-20">
                    <h3 className="text-xl md:text-2xl font-light serif-title tracking-wide text-white mb-1">
                      {dish.name}
                    </h3>
                    <p className="text-[10px] text-neutral-300 tracking-wider uppercase font-semibold">
                      {dish.calories} — pairing: {dish.pairing}
                    </p>
                  </div>
                </div>

                {/* Details / Text Info */}
                <div className="flex flex-col gap-6">
                  {/* Story & Description */}
                  <p className="text-xs md:text-sm text-neutral-600 dark:text-neutral-400 font-light leading-relaxed tracking-wider">
                    {dish.story}
                  </p>

                  {/* Ingredients Tags */}
                  <div className="flex flex-wrap gap-2">
                    {dish.ingredients.map((ingredient) => (
                      <span
                        key={ingredient}
                        className="text-[9px] uppercase tracking-widest px-2.5 py-1 rounded-full border border-neutral-300 dark:border-neutral-800 text-neutral-500 dark:text-neutral-400"
                      >
                        {ingredient}
                      </span>
                    ))}
                  </div>

                  {/* Chef Notes Block */}
                  <div className="p-4 rounded-lg bg-neutral-500/5 border border-gold/10 flex items-start gap-3">
                    <ChefHat className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[10px] font-bold tracking-widest uppercase text-gold block mb-1">
                        CHEF&apos;S NOTE
                      </span>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400 font-light leading-normal italic">
                        &ldquo;{dish.chefNote}&rdquo;
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
