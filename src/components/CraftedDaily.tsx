"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sunrise, Flame, ChefHat, Coffee, Moon } from "lucide-react";

interface TimelineStep {
  time: string;
  title: string;
  icon: React.ReactNode;
  description: string;
  details: string[];
}

export default function CraftedDaily() {
  const steps: TimelineStep[] = [
    {
      time: "05:00",
      title: "Morning Roasting",
      icon: <Sunrise className="w-5 h-5" />,
      description: "Our roasting masters calibrate thermal profiles for single-origin beans, filling the morning air with rich caramelized notes.",
      details: ["Moisture level analysis", "Roast temperature logging", "First-crack profiling"],
    },
    {
      time: "07:00",
      title: "Artisanal Baking",
      icon: <Flame className="w-5 h-5" />,
      description: "Hand-rolled French croissants, brioches, and organic sourdough boules are pulled warm from our heavy stone deck ovens.",
      details: ["Lamination checking", "Stone deck preheat", "Fresh fruit glaze glaze"],
    },
    {
      time: "08:30",
      title: "Chef Preparation",
      icon: <ChefHat className="w-5 h-5" />,
      description: "Truffle suppliers deliver fresh weekly yields. Jus is reduced, plate dressings prepped, and A5 Wagyu cuts inspected.",
      details: ["Alba truffle inspection", "Consommé double reduction", "Microgreen selection"],
    },
    {
      time: "10:00",
      title: "Espresso Extraction",
      icon: <Coffee className="w-5 h-5" />,
      description: "Refractometers measure extraction yield percentages. Water minerals are balanced, and machines calibrated to 9.2 bars.",
      details: ["Refractometer calibration", "Water mineral adjusting", "Portafilter preheating"],
    },
    {
      time: "18:00",
      title: "Evening Dining",
      icon: <Moon className="w-5 h-5" />,
      description: "Warm candlelight is lit, the acoustic environment transitions to slow jazz, and premium wine pairings are uncorked.",
      details: ["Acoustic levels check", "Candelabra lighting", "Vintage Bordeaux decanting"],
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section
      id="crafted-daily"
      className="relative w-full py-24 md:py-36 bg-[#F8F4ED] text-[#0B0B0B] dark:bg-[#0B0B0B] dark:text-[#F8F4ED] transition-colors duration-500 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        {/* Title */}
        <div className="mb-20">
          <span className="text-xs tracking-[0.3em] uppercase text-gold font-bold mb-4 block">
            CHAPTER V — CRAFTED DAILY
          </span>
          <h2 className="text-4xl md:text-6xl font-light serif-title tracking-tight leading-[1.15]">
            Chronicles of <br />
            <span className="italic font-normal text-gold">Exceptional Quality</span>
          </h2>
        </div>

        {/* Timeline Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left timeline selectors */}
          <div className="lg:col-span-5 space-y-4">
            {steps.map((step, idx) => {
              const isActive = activeIndex === idx;
              return (
                <button
                  key={step.time}
                  onClick={() => setActiveIndex(idx)}
                  className={`w-full text-left p-6 rounded-xl border transition-all duration-500 flex items-center gap-6 focus:outline-none cursor-pointer ${
                    isActive
                      ? "bg-white dark:bg-neutral-900 border-gold shadow-lg shadow-gold/5 scale-102"
                      : "bg-transparent border-[#0B0B0B]/5 dark:border-[#F8F4ED]/5 hover:border-gold/30"
                  }`}
                >
                  {/* Time Badge */}
                  <span className={`text-sm tracking-widest font-mono font-bold ${isActive ? "text-gold" : "text-neutral-500"}`}>
                    {step.time}
                  </span>

                  {/* Icon Wrapper */}
                  <div className={`p-2.5 rounded-full border transition-all duration-300 ${
                    isActive ? "bg-gold border-gold text-[#0B0B0B]" : "bg-neutral-500/5 border-neutral-300 dark:border-neutral-800 text-gold"
                  }`}>
                    {step.icon}
                  </div>

                  {/* Title */}
                  <div>
                    <h3 className={`text-base font-semibold tracking-wide transition-colors ${isActive ? "text-gold" : "text-[#0B0B0B] dark:text-[#F8F4ED]"}`}>
                      {step.title}
                    </h3>
                    <span className="text-[10px] uppercase tracking-widest text-neutral-400">
                      Step 0{idx + 1}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right details display card with transition */}
          <div className="lg:col-span-7 h-full min-h-[380px] flex items-stretch">
            <div className="w-full rounded-2xl p-8 md:p-12 bg-white/50 dark:bg-neutral-900/50 border border-[#0B0B0B]/5 dark:border-[#F8F4ED]/5 backdrop-blur-sm shadow-xl flex flex-col justify-between">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="space-y-8"
                >
                  {/* Big floating quote time */}
                  <div className="flex justify-between items-center">
                    <span className="text-4xl md:text-5xl font-light text-gold/30 font-mono">
                      {steps[activeIndex].time}
                    </span>
                    <span className="text-xs font-semibold uppercase tracking-widest text-gold bg-gold/5 px-3 py-1 rounded-full border border-gold/20">
                      Active Phase
                    </span>
                  </div>

                  {/* Phase Title */}
                  <h4 className="text-2xl md:text-3xl font-light serif-title tracking-wide text-gold">
                    {steps[activeIndex].title}
                  </h4>

                  {/* Description */}
                  <p className="text-sm md:text-base text-neutral-600 dark:text-neutral-300 font-light leading-relaxed tracking-wider">
                    {steps[activeIndex].description}
                  </p>

                  {/* Phase checklists */}
                  <div className="space-y-3 pt-6 border-t border-neutral-300 dark:border-neutral-800">
                    <span className="text-[10px] font-bold tracking-widest uppercase text-neutral-500 block mb-2">
                      INSPECTION PROCEDURES
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {steps[activeIndex].details.map((detail, dIdx) => (
                        <div key={dIdx} className="flex items-center gap-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-gold" />
                          <span className="text-xs text-neutral-600 dark:text-neutral-400 font-light tracking-wide">
                            {detail}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
