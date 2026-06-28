"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Coffee, Flame, Droplets, Sparkles } from "lucide-react";

interface Drink {
  id: string;
  name: string;
  price: string;
  notes: string[];
  description: string;
  icon: React.ReactNode;
  pairing: string;
}

export default function SignatureCoffee() {
  const drinks: Drink[] = [
    {
      id: "golden-espresso",
      name: "Golden Espresso",
      price: "₹1,500",
      notes: ["Dark Cocoa", "Champagne Flakes", "Citrus Zest"],
      description: "A double shot of single-origin Ethiopian beans infused with micro-flakes of 24k edible champagne gold.",
      icon: <Sparkles className="w-5 h-5 text-gold" />,
      pairing: "Flaky Croissant or Dark Chocolate Entremet",
    },
    {
      id: "smoked-oak-latte",
      name: "Smoked Oak Latte",
      price: "₹1,800",
      notes: ["Maple Syrup", "Oak Smoke", "Walnut Nutty"],
      description: "Double extraction pulled over dark maple wood and cold smoked with oak flakes, served with velvet micro-foam.",
      icon: <Flame className="w-5 h-5 text-gold" />,
      pairing: "Walnut Tart or Almond Biscotti",
    },
    {
      id: "matcha-olive-tonic",
      name: "Matcha Olive Tonic",
      price: "₹1,650",
      notes: ["Uji Matcha", "Tonic Botanical", "Olive Mist"],
      description: "Organic stone-ground ceremonial matcha floated over premium tonic water, misted with fresh olive blossom essence.",
      icon: <Droplets className="w-5 h-5 text-gold" />,
      pairing: "Lemon Tart or Pistachio Macaron",
    },
    {
      id: "velvet-cold-drip",
      name: "Velvet Cold Drip",
      price: "₹2,000",
      notes: ["Dark Berries", "Wild Honey", "Jasmine"],
      description: "24-hour slow drip extraction through organic mineral water, revealing delicate fruit esters and floral notes.",
      icon: <Coffee className="w-5 h-5 text-gold" />,
      pairing: "Fresh Berries or Vanilla Crème Brûlée",
    },
  ];

  return (
    <section
      id="coffee"
      className="relative w-full py-24 md:py-36 bg-[#0B0B0B] text-[#F8F4ED] overflow-hidden"
    >
      {/* Background visual texture */}
      <div className="absolute inset-0 opacity-15 pointer-events-none">
        <Image
          src="/images/coffee_pour.jpg"
          alt="Coffee pour background"
          fill
          className="object-cover mix-blend-luminosity filter blur-sm"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-matte-black via-transparent to-matte-black" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        {/* Editorial Heading */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <div>
            <span className="text-xs tracking-[0.3em] uppercase text-gold font-bold mb-4 block">
              CHAPTER II — SIGNATURE COFFEE
            </span>
            <h2 className="text-4xl md:text-6xl font-light serif-title tracking-tight leading-[1.1]">
              Crafted in Slow <br />
              <span className="italic font-normal text-gold">Motion</span>
            </h2>
          </div>
          <p className="max-w-md text-sm text-neutral-400 font-light leading-relaxed tracking-wider">
            Our coffee is prepared under precise scientific conditions. Temperature, pressure, and extraction timing are monitored to highlight original botanical characteristics.
          </p>
        </div>

        {/* Floating Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {drinks.map((drink, index) => (
            <motion.div
              key={drink.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -8 }}
              className="group relative rounded-xl p-8 bg-[#141414]/80 border border-[#F8F4ED]/10 backdrop-blur-md overflow-hidden transition-all duration-500 cursor-pointer flex flex-col justify-between min-h-[380px]"
            >
              {/* Card Glow / Reflection Line on Hover */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-[#C7A46C]/5 to-[#C7A46C]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              
              <div>
                {/* Header info */}
                <div className="flex justify-between items-start mb-8">
                  <div className="p-3 rounded-full bg-matte-black/55 border border-[#F8F4ED]/5 text-gold">
                    {drink.icon}
                  </div>
                  <span className="text-xl md:text-2xl font-light serif-title text-gold">
                    {drink.price}
                  </span>
                </div>

                {/* Drink Name */}
                <h3 className="text-xl md:text-2xl font-semibold tracking-wide mb-3 text-warm-ivory group-hover:text-gold transition-colors duration-300">
                  {drink.name}
                </h3>

                {/* Description */}
                <p className="text-xs text-neutral-400 font-light leading-relaxed tracking-wider mb-6">
                  {drink.description}
                </p>
              </div>

              <div>
                {/* Tasting Notes */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {drink.notes.map((note) => (
                    <span
                      key={note}
                      className="text-[9px] uppercase tracking-widest px-2.5 py-1 rounded-full bg-matte-black border border-[#F8F4ED]/5 text-neutral-300"
                    >
                      {note}
                    </span>
                  ))}
                </div>

                {/* Recommended pairing revealed on hover */}
                <div className="h-0 group-hover:h-12 overflow-hidden transition-all duration-500 ease-out border-t border-[#F8F4ED]/5 pt-4">
                  <p className="text-[10px] uppercase tracking-widest text-gold/80">
                    Pairing: <span className="text-neutral-300 normal-case tracking-normal">{drink.pairing}</span>
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
