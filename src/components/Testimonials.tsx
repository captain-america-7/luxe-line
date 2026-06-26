"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { useEffect, useState } from "react";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  rating: number;
  quote: string;
  avatarText: string;
}

export default function Testimonials() {
  const testimonials: Testimonial[] = [
    {
      id: "t-1",
      name: "Eleanor Vance",
      role: "Architectural Designer",
      rating: 5,
      quote: "The acoustic engineering is spectacular. The space feels like an Aman resort—warm, minimalist, and smelling of rich, perfectly extracted espresso.",
      avatarText: "EV",
    },
    {
      id: "t-2",
      name: "Julian Draxler",
      role: "Luxury Brand Curator",
      rating: 5,
      quote: "Every detail has been curated to perfection. From the weighted ceramic cups to the soft, warm lighting, it sets a new global standard for hospitality.",
      avatarText: "JD",
    },
    {
      id: "t-3",
      name: "Marcus Sterling",
      role: "Gastronomy Critic",
      rating: 5,
      quote: "The Alba white truffle pasta is outstanding, but it is the cold drip coffee that stole the evening. A masterful display of scientific brewing.",
      avatarText: "MS",
    },
  ];

  // Animated rating counter state
  const [ratingCount, setRatingCount] = useState(0.0);

  useEffect(() => {
    let start = 0.0;
    const end = 4.9;
    const duration = 1500; // ms
    const increment = 0.1;
    const stepTime = Math.abs(Math.floor(duration / (end / increment)));

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setRatingCount(end);
        clearInterval(timer);
      } else {
        setRatingCount(parseFloat(start.toFixed(1)));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, []);

  return (
    <section
      className="relative w-full py-24 md:py-36 bg-[#F8F4ED] text-[#0B0B0B] dark:bg-[#0B0B0B] dark:text-[#F8F4ED] transition-colors duration-500 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-8">
          <div>
            <span className="text-xs tracking-[0.3em] uppercase text-gold font-bold mb-4 block">
              CHAPTER VII — TESTIMONIALS
            </span>
            <h2 className="text-4xl md:text-6xl font-light serif-title tracking-tight leading-[1.1]">
              Reflections of <br />
              <span className="italic font-normal text-gold">Distinction</span>
            </h2>
          </div>

          {/* Animated Rating Counter Block */}
          <div className="flex items-center gap-4 bg-white/50 dark:bg-neutral-900/50 px-6 py-4 rounded-2xl border border-neutral-300 dark:border-neutral-800 backdrop-blur-sm shadow-lg">
            <div className="text-center">
              <span className="text-4xl md:text-5xl font-light font-mono text-gold block">
                {ratingCount.toFixed(1)}
              </span>
              <span className="text-[10px] tracking-widest text-neutral-400 uppercase font-semibold">
                Average Rating
              </span>
            </div>
            <div className="h-10 w-[1px] bg-neutral-300 dark:bg-neutral-800" />
            <div className="space-y-1">
              <div className="flex text-gold">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                ))}
              </div>
              <span className="text-[10px] text-neutral-500 tracking-wider block">
                Based on 320 global reviews
              </span>
            </div>
          </div>
        </div>

        {/* Floating Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, index) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="glass-card rounded-2xl p-8 flex flex-col justify-between relative shadow-xl hover:shadow-2xl transition-all duration-500"
            >
              {/* Quote Mark */}
              <Quote className="absolute top-6 right-6 w-12 h-12 text-gold/10 pointer-events-none" />

              <div className="space-y-6">
                {/* Stars */}
                <div className="flex text-gold">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-gold text-gold" />
                  ))}
                </div>

                {/* Quote Text */}
                <p className="text-xs md:text-sm text-neutral-600 dark:text-neutral-300 font-light leading-relaxed tracking-wider">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              {/* Author Info */}
              <div className="flex items-center gap-4 border-t border-[#0B0B0B]/5 dark:border-[#F8F4ED]/5 pt-6 mt-8">
                {/* Circular minimalist initials profile */}
                <div className="w-10 h-10 rounded-full bg-gold/10 text-gold flex items-center justify-center font-semibold text-xs tracking-wider border border-gold/20">
                  {t.avatarText}
                </div>

                <div>
                  <h4 className="text-sm font-semibold tracking-wide text-[#0B0B0B] dark:text-[#F8F4ED]">
                    {t.name}
                  </h4>
                  <span className="text-[10px] text-neutral-400 tracking-wider uppercase block">
                    {t.role}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
