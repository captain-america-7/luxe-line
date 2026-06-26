"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { Heart, Maximize, Play, Sparkles } from "lucide-react";

export default function InteriorWalkthrough() {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!scrollRef.current) return;
      const box = scrollRef.current.getBoundingClientRect();
      const scrolledPast = window.innerHeight - box.top;
      
      if (scrolledPast > 0 && box.bottom > 0) {
        const speed = 0.08;
        const offset = scrolledPast * speed;
        // Apply parallax offset to the image wrappers
        const images = scrollRef.current.querySelectorAll(".parallax-img");
        images.forEach((img, index) => {
          const factor = index === 0 ? 1 : -0.7;
          (img as HTMLElement).style.transform = `translate3d(0, ${offset * factor}px, 0)`;
        });
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      id="interior"
      ref={scrollRef}
      className="relative w-full py-24 md:py-36 bg-[#0B0B0B] text-[#F8F4ED] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-20">
          <span className="text-xs tracking-[0.3em] uppercase text-gold font-bold mb-4 block">
            CHAPTER IV — THE INTERIOR
          </span>
          <h2 className="text-4xl md:text-6xl font-light serif-title tracking-tight leading-[1.15] mb-6">
            A Sanctuary of <br />
            <span className="italic font-normal text-gold">Stone, Walnut & Light</span>
          </h2>
          <p className="text-sm md:text-base text-neutral-400 font-light leading-relaxed tracking-wider">
            Our interior design marries the Japanese philosophy of Wabi-Sabi with sleek Apple-level minimalism. Large steel-framed windows frame natural light while sound-dampened surfaces ensure private conversations remain confidential.
          </p>
        </div>

        {/* Parallax Image Grid Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          {/* Main Visual Panel */}
          <div className="md:col-span-8 overflow-hidden rounded-xl h-[400px] md:h-[550px] relative shadow-2xl">
            <div className="parallax-img absolute inset-0 w-full h-[120%] -top-[10%] will-change-transform">
              <Image
                src="/images/hero_bg.jpg"
                alt="Luxury Café Lounge Interior"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            </div>
            {/* Floating indicator */}
            <div className="absolute bottom-6 left-6 z-20">
              <span className="text-xs font-semibold tracking-widest uppercase text-gold/80 block mb-1">
                ZONE 01
              </span>
              <h3 className="text-2xl font-light serif-title text-white">
                The Central Salon
              </h3>
            </div>
          </div>

          {/* Details / Text Panel */}
          <div className="md:col-span-4 space-y-12">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="space-y-4"
            >
              <h4 className="text-lg font-semibold tracking-wider text-gold uppercase">
                Acoustic Clarity
              </h4>
              <p className="text-xs text-neutral-400 font-light leading-relaxed tracking-wider">
                We engineered noise-absorption panels wrapped in organic Belgian linens, permitting a soft hum of jazz without intruding on table dialogues.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 }}
              className="space-y-4"
            >
              <h4 className="text-lg font-semibold tracking-wider text-gold uppercase">
                Tactile Luxury
              </h4>
              <p className="text-xs text-neutral-400 font-light leading-relaxed tracking-wider">
                Run your hands along our counter carved from single slabs of Italian Calacatta marble, complemented by details of dark oiled solid American Walnut.
              </p>
            </motion.div>

            {/* Smaller Parallax Panel */}
            <div className="overflow-hidden rounded-xl h-[280px] relative shadow-xl w-full border border-white/5">
              <div className="parallax-img absolute inset-0 w-full h-[120%] -top-[10%] will-change-transform">
                <Image
                  src="/images/coffee_pour.jpg"
                  alt="Espresso Machine Brass Details"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
              <div className="absolute bottom-4 left-4 z-20">
                <span className="text-[10px] tracking-widest text-gold/80 block uppercase">
                  ZONE 02
                </span>
                <h4 className="text-lg font-light serif-title text-white">
                  The Brewing Bench
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
