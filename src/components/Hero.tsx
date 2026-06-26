"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef } from "react";

interface HeroProps {
  onOpenMenu: () => void;
}

export default function Hero({ onOpenMenu }: HeroProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const bgImageRef = useRef<HTMLDivElement | null>(null);

  // Parallax effect on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (!bgImageRef.current) return;
      const scrollPos = window.scrollY;
      bgImageRef.current.style.transform = `translate3d(0, ${scrollPos * 0.4}px, 0) scale(${1 + scrollPos * 0.0005})`;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden flex items-center justify-center bg-matte-black text-warm-ivory"
    >
      {/* Background Cinematic Image with Zoom Parallax */}
      <div
        ref={bgImageRef}
        className="absolute inset-0 w-full h-full select-none pointer-events-none will-change-transform opacity-60 dark:opacity-45"
      >
        <Image
          src="/images/hero_bg.jpg"
          alt="Luxury Café Interior"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        {/* Soft atmospheric gradient washes */}
        <div className="absolute inset-0 bg-gradient-to-t from-matte-black via-matte-black/30 to-matte-black/50" />
        <div className="absolute inset-0 bg-gradient-to-r from-matte-black/40 via-transparent to-matte-black/40" />
      </div>

      {/* Floating Ambient Steam Effect inside Hero Container */}
      <div className="absolute inset-0 pointer-events-none z-10 opacity-30">
        <div className="absolute bottom-[20%] left-[50%] -translate-x-1/2 w-48 h-96 bg-gradient-to-t from-transparent via-white/5 to-transparent blur-3xl animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-[15%] left-[48%] -translate-x-1/2 w-32 h-64 bg-gradient-to-t from-transparent via-white/8 to-transparent blur-2xl animate-pulse" style={{ animationDuration: '5s' }} />
      </div>

      {/* Hero Typography & CTA */}
      <div className="relative z-20 max-w-4xl mx-auto px-6 text-center flex flex-col items-center">
        {/* Elite Subtitle */}
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-xs lg:text-sm tracking-[0.3em] uppercase text-gold mb-6 font-semibold"
        >
          LUXE LINE — A CULINARY SANCTUARY
        </motion.span>

        {/* Large Luxury Serif Title */}
        <motion.h1
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl md:text-7xl lg:text-8xl font-light tracking-tight serif-title mb-8 leading-[1.1] text-warm-ivory"
        >
          Where Every Sip <br />
          <span className="italic text-gold font-normal">Defines Luxury</span>
        </motion.h1>

        {/* Cinematic Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-xl text-sm md:text-base text-warm-ivory/70 font-light leading-relaxed tracking-wider mb-12"
        >
          A destination where handcrafted coffee, artisanal cuisine, and timeless design merge into one unforgettable sensory experience.
        </motion.p>

        {/* Action Buttons with magnetic hovering cues */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center gap-6"
        >
          <button
            onClick={() => scrollToSection("reservation")}
            className="w-48 py-3.5 rounded-full border border-gold bg-gold hover:bg-gold-hover text-[#0B0B0B] font-semibold text-xs uppercase tracking-widest transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg shadow-gold/10"
          >
            Reserve a Table
          </button>
          
          <button
            onClick={onOpenMenu}
            className="w-48 py-3.5 rounded-full border border-warm-ivory/30 hover:border-gold hover:text-gold bg-transparent text-warm-ivory font-semibold text-xs uppercase tracking-widest transition-all duration-300 hover:scale-105 active:scale-95"
          >
            Explore Menu
          </button>
        </motion.div>
      </div>

      {/* Downward Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 select-none">
        <span className="text-[9px] uppercase tracking-[0.35em] text-warm-ivory/40">
          Scroll to explore
        </span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-gold/70 to-transparent animate-bounce" style={{ animationDuration: '2.5s' }} />
      </div>
    </section>
  );
}
