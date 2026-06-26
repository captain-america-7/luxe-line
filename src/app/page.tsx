"use client";

import { useEffect, useState } from "react";
import Lenis from "lenis";
import { motion, AnimatePresence } from "framer-motion";
import CustomCursor from "@/components/CustomCursor";
import CanvasBackground from "@/components/CanvasBackground";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Philosophy from "@/components/Philosophy";
import SignatureCoffee from "@/components/SignatureCoffee";
import CulinaryCollection from "@/components/CulinaryCollection";
import InteriorWalkthrough from "@/components/InteriorWalkthrough";
import CraftedDaily from "@/components/CraftedDaily";
import Gallery from "@/components/Gallery";
import Testimonials from "@/components/Testimonials";
import ReservationForm from "@/components/ReservationForm";
import MenuOverlay from "@/components/MenuOverlay";
import { Sparkles } from "lucide-react";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [newsEmail, setNewsEmail] = useState("");
  const [newsSubscribed, setNewsSubscribed] = useState(false);

  // Initialize Lenis smooth scroll and load favorites from localStorage
  useEffect(() => {
    // 1. Initialize Lenis
    const lenisInstance = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      wheelMultiplier: 1.1,
    });

    const raf = (time: number) => {
      lenisInstance.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    // 2. Load favorites
    const savedFavorites = localStorage.getItem("luxe_favorites");
    if (savedFavorites) {
      try {
        const parsed = JSON.parse(savedFavorites);
        setTimeout(() => {
          setFavorites(parsed);
        }, 0);
      } catch {
        // Safe fallback
      }
    }

    // 3. Clear loading screen after a deluxe interval
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);

    return () => {
      lenisInstance.destroy();
      clearTimeout(timer);
    };
  }, []);

  const handleToggleFavorite = (id: string) => {
    setFavorites((prev) => {
      let updated: string[];
      if (prev.includes(id)) {
        updated = prev.filter((item) => item !== id);
      } else {
        updated = [...prev, id];
      }
      localStorage.setItem("luxe_favorites", JSON.stringify(updated));
      return updated;
    });
  };

  const handleSubscribeNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsEmail) return;
    setNewsSubscribed(true);
    setNewsEmail("");
  };

  return (
    <>
      {/* Luxury Loading Sequence */}
      <AnimatePresence>
        {loading && (
          <motion.div
            key="page-loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
            className="fixed inset-0 z-[999] bg-[#0B0B0B] text-[#F8F4ED] flex flex-col items-center justify-center pointer-events-auto"
          >
            <div className="flex flex-col items-center gap-6">
              <motion.span
                initial={{ letterSpacing: "0.4em", opacity: 0 }}
                animate={{ letterSpacing: "0.2em", opacity: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="text-3xl font-light tracking-[0.2em] serif-title text-gold"
              >
                LUXE LINE
              </motion.span>
              <div className="w-36 h-[1px] bg-white/10 relative overflow-hidden">
                <motion.div
                  initial={{ left: "-100%" }}
                  animate={{ left: "100%" }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-0 bottom-0 w-1/2 bg-gold"
                />
              </div>
              <span className="text-[9px] uppercase tracking-[0.3em] text-neutral-500 font-semibold">
                Where Every Sip Defines Luxury
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Grainy Film Texture Overlay */}
      <div className="grainy-overlay" />

      {/* Floating Canvas particles in the background */}
      <CanvasBackground />

      {/* Premium custom mouse indicators */}
      <CustomCursor />

      {/* Global Navbar */}
      <Navbar onOpenMenu={() => setIsMenuOpen(true)} favoritesCount={favorites.length} />

      {/* Content Chapters */}
      <main className="relative z-20">
        <Hero onOpenMenu={() => setIsMenuOpen(true)} />
        <Philosophy />
        <SignatureCoffee />
        <CulinaryCollection favorites={favorites} onToggleFavorite={handleToggleFavorite} />
        <InteriorWalkthrough />
        <CraftedDaily />
        <Gallery />
        <Testimonials />
        <ReservationForm />
      </main>

      {/* Fullscreen Concierge Menu Overlay */}
      <MenuOverlay
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        favorites={favorites}
        onToggleFavorite={handleToggleFavorite}
      />

      {/* Footer component */}
      <footer className="relative z-20 py-20 bg-[#0B0B0B] text-neutral-400 border-t border-white/5 font-light tracking-wide text-xs">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Logo & Manifesto column */}
          <div className="space-y-4 md:col-span-1">
            <h4 className="text-lg font-semibold tracking-[0.2em] serif-title text-gold uppercase">
              LUXE LINE
            </h4>
            <p className="leading-relaxed text-neutral-500 text-xs">
              &ldquo;Luxury lives in the smallest details.&rdquo;
            </p>
          </div>

          {/* Social Links column */}
          <div className="space-y-4">
            <h5 className="text-[10px] font-bold tracking-widest text-gold uppercase">
              Follow Us
            </h5>
            <div className="flex flex-col gap-2.5">
              <a href="#" className="hover:text-gold transition-colors">Instagram</a>
              <a href="#" className="hover:text-gold transition-colors">WhatsApp</a>
              <a href="#" className="hover:text-gold transition-colors">Pinterest</a>
            </div>
          </div>

          {/* Operating details column */}
          <div className="space-y-4">
            <h5 className="text-[10px] font-bold tracking-widest text-gold uppercase">
              Contact & Hours
            </h5>
            <div className="space-y-2 text-neutral-500 text-xs">
              <p>Location: 12 Sanctuary Boulevard, Metro</p>
              <p>Call: +1 (800) LUXE-LINE</p>
              <p>Hours: Daily 08:00 — 22:00</p>
            </div>
          </div>

          {/* Newsletter column */}
          <div className="space-y-4">
            <h5 className="text-[10px] font-bold tracking-widest text-gold uppercase">
              The Chronicle Newsletter
            </h5>
            {!newsSubscribed ? (
              <form onSubmit={handleSubscribeNewsletter} className="flex flex-col gap-3">
                <input
                  type="email"
                  required
                  placeholder="Enter email address"
                  value={newsEmail}
                  onChange={(e) => setNewsEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-full bg-white/5 border border-white/10 text-white focus:outline-none focus:border-gold placeholder:text-neutral-600 text-xs"
                />
                <button
                  type="submit"
                  className="py-2.5 rounded-full bg-gold hover:bg-gold-hover text-[#0B0B0B] font-semibold uppercase tracking-wider text-[10px] transition-transform hover:scale-102"
                >
                  Subscribe
                </button>
              </form>
            ) : (
              <p className="text-[10px] text-gold uppercase tracking-widest font-semibold flex items-center gap-1.5 animate-pulse">
                <Sparkles className="w-3.5 h-3.5" /> Subscribed successfully.
              </p>
            )}
          </div>
        </div>

        {/* Legal copyright footer */}
        <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] uppercase tracking-widest text-neutral-600">
          <p>© {new Date().getFullYear()} LUXE LINE. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-neutral-400">Privacy Policy</a>
            <a href="#" className="hover:text-neutral-400">Terms of Service</a>
          </div>
        </div>
      </footer>
    </>
  );
}
