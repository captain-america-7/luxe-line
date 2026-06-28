"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Search, Heart, Star, Sparkles } from "lucide-react";
import Image from "next/image";

interface MenuItem {
  id: string;
  name: string;
  price: string;
  category: "coffee" | "pastries" | "culinary";
  image: string;
  description: string;
  ingredients: string[];
  pairing: string;
  calories: string;
  chefRec: boolean;
  story: string;
}

interface MenuOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  favorites: string[];
  onToggleFavorite: (id: string) => void;
}

export default function MenuOverlay({ isOpen, onClose, favorites, onToggleFavorite }: MenuOverlayProps) {
  const menuItems: MenuItem[] = [
    {
      id: "golden-espresso",
      name: "Golden Espresso",
      price: "₹1,500",
      category: "coffee",
      image: "/images/coffee_pour.jpg",
      description: "Ethiopian single-origin beans, pulled at 9.2 bars, infused with 24k edible champagne gold leaf.",
      ingredients: ["Single-origin Espresso", "24k Gold Flakes", "Organic Honey Notes"],
      pairing: "Glazed Pistachio Tart",
      calories: "12 kcal",
      chefRec: true,
      story: "Each cup is extracted over raw gold leaf. As the espresso pours, the gold molecularly binds to the crema, yielding a metallic sweetness.",
    },
    {
      id: "smoked-oak-latte",
      name: "Smoked Oak Latte",
      price: "₹1,800",
      category: "coffee",
      image: "/images/coffee_pour.jpg",
      description: "Espresso sweetened with organic maple wood extract, cold-smoked in wood chambers.",
      ingredients: ["Espresso", "Maple Extract", "Steamed Milk", "Oak Smoke"],
      pairing: "French Croissant",
      calories: "185 kcal",
      chefRec: false,
      story: "We trap slow-burning oak sawdust smoke inside an airtight glass dome, releasing it only as it reaches the guest table.",
    },
    {
      id: "pistachio-tart",
      name: "Glazed Pistachio Tart",
      price: "₹2,300",
      category: "pastries",
      image: "/images/dish_pastry.jpg",
      description: "Baked daily. Crispy chocolate base, Sicilian pistachio cream, fresh raspberry coulis glaze.",
      ingredients: ["Bronte Pistachios", "Raspberries", "White Cocoa Butter", "Almond Crust"],
      pairing: "Velvet Cold Drip",
      calories: "410 kcal",
      chefRec: true,
      story: "The pistachios are hand-harvested from Mount Etna slopes. We bake them slowly at low temperatures to retain their bright green hue.",
    },
    {
      id: "truffle-tagliolini",
      name: "Black Truffle Tagliolini",
      price: "₹3,750",
      category: "culinary",
      image: "/images/dish_truffle.jpg",
      description: "Normandy butter-based pasta tossed with parmigiano, topped with thin Alba white truffle shaves.",
      ingredients: ["Fresh Pasta", "Alba White Truffles", "Double-cream Butter", "Gold Dust"],
      pairing: "French Chardonnay",
      calories: "520 kcal",
      chefRec: true,
      story: "Alba truffles are flown in weekly under strict humidity locks. We shave them paper-thin so they melt on contact with hot pasta.",
    },
  ];

  const [activeTab, setActiveTab] = useState<"all" | "coffee" | "pastries" | "culinary" | "favorites">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  // Filter items
  const filteredItems = menuItems.filter((item) => {
    // Search query matching
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Category selection matching
    if (activeTab === "all") return matchesSearch;
    if (activeTab === "favorites") return matchesSearch && favorites.includes(item.id);
    return matchesSearch && item.category === activeTab;
  });

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[100] w-full h-full bg-[#0B0B0B]/95 text-[#F8F4ED] flex flex-col backdrop-blur-xl"
        >
          {/* Header Panel */}
          <div className="max-w-7xl mx-auto w-full px-6 lg:px-12 py-8 flex items-center justify-between border-b border-white/5">
            <div>
              <span className="text-[10px] tracking-[0.3em] text-gold uppercase block mb-1">
                DIGITAL CONCIERGE
              </span>
              <h2 className="text-2xl font-light serif-title tracking-widest text-white uppercase">
                The Luxe Line Menu
              </h2>
            </div>
            
            <button
              onClick={onClose}
              className="p-3 rounded-full border border-white/10 text-white hover:border-gold hover:text-gold transition-colors focus:outline-none"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Search and Filters panel */}
          <div className="max-w-7xl mx-auto w-full px-6 lg:px-12 py-6 flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/5">
            {/* Category tabs */}
            <div className="flex flex-wrap gap-2">
              {(["all", "coffee", "pastries", "culinary", "favorites"] as const).map((tab) => {
                const count = tab === "favorites"
                  ? favorites.length
                  : tab === "all"
                    ? menuItems.length
                    : menuItems.filter(item => item.category === tab).length;
                return (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-5 py-2 rounded-full border text-[10px] uppercase tracking-widest font-semibold transition-all duration-300 ${
                      activeTab === tab
                        ? "bg-gold border-gold text-[#0B0B0B]"
                        : "bg-transparent border-white/10 text-neutral-400 hover:border-gold/30"
                    }`}
                  >
                    {tab} ({count})
                  </button>
                );
              })}
            </div>

            {/* Search Input bar */}
            <div className="relative max-w-sm w-full">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500">
                <Search className="w-4 h-4" />
              </span>
              <input
                type="text"
                placeholder="Search catalog..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-2.5 rounded-full bg-white/5 border border-white/10 focus:outline-none focus:border-gold text-sm tracking-wider font-light"
              />
            </div>
          </div>

          {/* Main Grid View */}
          <div className="max-w-7xl mx-auto w-full px-6 lg:px-12 flex-1 overflow-y-auto py-8 grid grid-cols-1 lg:grid-cols-12 gap-12 no-scrollbar">
            {/* Left Column: Menu Items list */}
            <div className="lg:col-span-7 space-y-6">
              {filteredItems.length > 0 ? (
                filteredItems.map((item) => {
                  const isFav = favorites.includes(item.id);
                  return (
                    <div
                      key={item.id}
                      onMouseEnter={() => setHoveredItem(item.id)}
                      className="group p-6 rounded-xl border border-white/5 hover:border-gold/30 bg-[#141414]/50 hover:bg-[#141414]/80 transition-all duration-300 flex items-center justify-between gap-6 cursor-pointer"
                    >
                      <div className="flex items-center gap-6 flex-1">
                        {/* Mini image thumbnail */}
                        <div className="relative w-20 h-20 rounded-lg overflow-hidden shrink-0">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        </div>

                        {/* Name and description details */}
                        <div className="space-y-1.5">
                          <div className="flex items-center gap-3">
                            <h3 className="text-lg font-medium text-white group-hover:text-gold transition-colors">
                              {item.name}
                            </h3>
                            {item.chefRec && (
                              <span className="p-1 rounded-full bg-gold/10 text-gold" title="Chef Recommendation">
                                <Sparkles className="w-3 h-3" />
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-neutral-400 font-light line-clamp-2 max-w-lg leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                      </div>

                      {/* Pricing and Favoriting actions */}
                      <div className="flex flex-col items-end gap-3 justify-center shrink-0">
                        <span className="text-lg font-light font-mono text-gold">
                          {item.price}
                        </span>
                        
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onToggleFavorite(item.id);
                          }}
                          className="p-2 rounded-full border border-white/10 hover:border-gold text-neutral-400 hover:text-gold hover:scale-105 transition-all"
                        >
                          <Heart className={`w-3.5 h-3.5 ${isFav ? "fill-red-500 text-red-500" : ""}`} />
                        </button>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="py-24 text-center text-neutral-500 tracking-wider">
                  No items found matching the selected filters.
                </div>
              )}
            </div>

            {/* Right Column: Dynamic Editorial Showcase of hovered item */}
            <div className="lg:col-span-5 hidden lg:block h-full relative">
              {hoveredItem ? (
                (() => {
                  const activeItem = menuItems.find((i) => i.id === hoveredItem);
                  if (!activeItem) return null;
                  return (
                    <motion.div
                      key={activeItem.id}
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4 }}
                      className="sticky top-0 w-full rounded-2xl border border-white/10 p-8 bg-[#141414] shadow-2xl flex flex-col gap-6"
                    >
                      {/* Big Showcase Image */}
                      <div className="relative w-full h-[240px] rounded-xl overflow-hidden shadow-inner">
                        <Image
                          src={activeItem.image}
                          alt={activeItem.name}
                          fill
                          className="object-cover"
                        />
                      </div>

                      {/* Header details */}
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="text-2xl font-light serif-title tracking-wide text-gold">
                            {activeItem.name}
                          </h4>
                          <span className="text-[10px] uppercase tracking-widest text-neutral-400">
                            {activeItem.calories} • pairing: {activeItem.pairing}
                          </span>
                        </div>
                        <span className="text-2xl font-light font-mono text-gold">
                          {activeItem.price}
                        </span>
                      </div>

                      {/* Story / Legend */}
                      <div className="space-y-2 border-t border-white/5 pt-4">
                        <span className="text-[9px] uppercase tracking-widest text-gold font-bold">
                          The Story
                        </span>
                        <p className="text-xs text-neutral-400 font-light leading-relaxed">
                          {activeItem.story}
                        </p>
                      </div>

                      {/* Ingredients */}
                      <div className="space-y-2 border-t border-white/5 pt-4">
                        <span className="text-[9px] uppercase tracking-widest text-gold font-bold">
                          Ingredients
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {activeItem.ingredients.map((ing) => (
                            <span
                              key={ing}
                              className="text-[9px] uppercase tracking-widest px-2.5 py-1 rounded-full bg-matte-black text-neutral-300 border border-white/5"
                            >
                              {ing}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  );
                })()
              ) : (
                <div className="sticky top-0 w-full h-[450px] rounded-2xl border border-white/5 border-dashed flex flex-col items-center justify-center text-center p-8 text-neutral-600">
                  <Star className="w-8 h-8 text-neutral-800 mb-4 animate-pulse" />
                  <p className="text-xs uppercase tracking-widest max-w-xs font-light">
                    Hover over a menu item to explore its cinematic preparation story.
                  </p>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
