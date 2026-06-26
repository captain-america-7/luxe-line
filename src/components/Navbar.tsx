"use client";

import { useState, useEffect } from "react";
import { Sun, Moon, Menu, X } from "lucide-react";
import AudioPlayer from "./AudioPlayer";

interface NavbarProps {
  onOpenMenu: () => void;
  favoritesCount: number;
}

export default function Navbar({ onOpenMenu, favoritesCount }: NavbarProps) {
  const [isDark, setIsDark] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Initialize theme
  useEffect(() => {
    const root = window.document.documentElement;
    const initialTheme = root.classList.contains("dark") || root.style.colorScheme === "dark";
    setTimeout(() => {
      setIsDark(initialTheme);
    }, 0);
  }, []);

  // Monitor scroll height for visual triggers
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Calculate scroll progress percentage
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDark(false);
    } else {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDark(true);
    }
  };

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "glass-nav py-4 shadow-lg shadow-black/5"
          : "bg-transparent py-6 border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between">
        {/* Brand Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="text-2xl font-semibold tracking-[0.2em] serif-title text-gold focus:outline-none"
        >
          LUXE LINE
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 lg:gap-12 text-xs uppercase tracking-[0.2em]">
          <button
            onClick={() => scrollToSection("philosophy")}
            className="hover:text-gold transition-colors duration-300 focus:outline-none cursor-pointer"
          >
            Philosophy
          </button>
          <button
            onClick={() => scrollToSection("coffee")}
            className="hover:text-gold transition-colors duration-300 focus:outline-none cursor-pointer"
          >
            Signature Coffee
          </button>
          <button
            onClick={() => scrollToSection("culinary")}
            className="hover:text-gold transition-colors duration-300 focus:outline-none cursor-pointer"
          >
            Culinary
          </button>
          <button
            onClick={() => scrollToSection("interior")}
            className="hover:text-gold transition-colors duration-300 focus:outline-none cursor-pointer"
          >
            Aesthetics
          </button>
          <button
            onClick={() => scrollToSection("crafted-daily")}
            className="hover:text-gold transition-colors duration-300 focus:outline-none cursor-pointer"
          >
            Craft
          </button>
          <button
            onClick={() => scrollToSection("reservation")}
            className="hover:text-gold transition-colors duration-300 focus:outline-none cursor-pointer"
          >
            Bookings
          </button>
        </nav>

        {/* Live Cafe Status, Theme Toggle, Audio, and Actions */}
        <div className="hidden md:flex items-center gap-6">
          {/* Live Status indicator */}
          <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold tracking-widest uppercase">
              OPEN — till 22:00
            </span>
          </div>

          {/* Audio Visualizer Toggle */}
          <AudioPlayer />

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full border border-gold/30 hover:border-gold/70 text-gold transition-all duration-300"
            title="Toggle theme"
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Explore Menu overlay trigger */}
          <button
            onClick={onOpenMenu}
            className="relative px-6 py-2.5 rounded-full bg-gold hover:bg-gold-hover text-[#0B0B0B] text-xs font-semibold uppercase tracking-wider transition-all duration-300 hover:scale-105"
          >
            Explore Menu
            {favoritesCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#0B0B0B] text-[10px] font-bold text-gold border border-gold animate-bounce">
                {favoritesCount}
              </span>
            )}
          </button>
        </div>

        {/* Mobile Controls */}
        <div className="flex items-center gap-4 md:hidden">
          <AudioPlayer />
          
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full border border-gold/30 text-gold focus:outline-none"
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-full border border-gold/30 text-gold focus:outline-none"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-[73px] z-40 bg-[#F8F4ED] dark:bg-[#0B0B0B] flex flex-col items-center justify-center gap-8 text-lg uppercase tracking-[0.25em] serif-title transition-all duration-500 animate-fade-in px-6">
          <button
            onClick={() => scrollToSection("philosophy")}
            className="hover:text-gold transition-colors"
          >
            Philosophy
          </button>
          <button
            onClick={() => scrollToSection("coffee")}
            className="hover:text-gold transition-colors"
          >
            Signature Coffee
          </button>
          <button
            onClick={() => scrollToSection("culinary")}
            className="hover:text-gold transition-colors"
          >
            Culinary Collection
          </button>
          <button
            onClick={() => scrollToSection("interior")}
            className="hover:text-gold transition-colors"
          >
            Aesthetics
          </button>
          <button
            onClick={() => scrollToSection("crafted-daily")}
            className="hover:text-gold transition-colors"
          >
            Crafted Daily
          </button>
          <button
            onClick={() => scrollToSection("reservation")}
            className="hover:text-gold transition-colors"
          >
            Reservations
          </button>

          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenMenu();
            }}
            className="w-full max-w-xs mt-4 py-3 rounded-full bg-gold text-[#0B0B0B] text-center font-semibold text-sm tracking-widest uppercase hover:scale-105 transition-transform"
          >
            Explore Menu {favoritesCount > 0 && `(${favoritesCount})`}
          </button>

          <div className="flex items-center gap-2 mt-4 px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold tracking-widest uppercase">
              OPEN — 08:00 to 22:00
            </span>
          </div>
        </div>
      )}

      {/* Progress Bar (Bottom Border-Style) */}
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-transparent">
        <div
          id="scroll-progress"
          className="h-full bg-gold transition-all duration-100 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>
    </header>
  );
}
