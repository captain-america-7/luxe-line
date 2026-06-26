"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Philosophy() {
  // Reveal parameters for animations
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <section
      id="philosophy"
      className="relative w-full min-h-screen py-24 md:py-36 bg-[#F8F4ED] text-[#0B0B0B] dark:bg-[#0B0B0B] dark:text-[#F8F4ED] flex items-center transition-colors duration-500 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        {/* Left Side: Editorial Typography & Philosophy Statement */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          <motion.span
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="text-xs tracking-[0.3em] uppercase text-gold font-bold mb-4"
          >
            CHAPTER I — THE PHILOSOPHY
          </motion.span>
          
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="text-4xl md:text-6xl font-light serif-title tracking-tight leading-[1.15] mb-8"
          >
            Our philosophy is simple. <br />
            <span className="italic font-normal text-gold">Crafting Perfection.</span>
          </motion.h2>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="space-y-6 text-base md:text-lg text-neutral-600 dark:text-neutral-300 font-light leading-relaxed max-w-xl"
          >
            <p>
              We believe that luxury is not about excess, but about the reduction to what is essential and perfect. Every detail of our process is handled with meticulous intent.
            </p>
            <div className="h-[1px] w-24 bg-gold/50 my-8" />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 text-sm font-semibold tracking-wider uppercase text-neutral-800 dark:text-neutral-200">
              <div>
                <span className="text-gold serif-title text-2xl block mb-1">01</span>
                EXCEPTIONAL INGREDIENTS
              </div>
              <div>
                <span className="text-gold serif-title text-2xl block mb-1">02</span>
                PERFECT CRAFTSMANSHIP
              </div>
              <div>
                <span className="text-gold serif-title text-2xl block mb-1">03</span>
                MEMORABLE MOMENTS
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Side: Elegant Double-Image Frame with Parallax/Float */}
        <div className="lg:col-span-5 relative w-full h-[500px] md:h-[600px] flex items-center justify-center">
          {/* Main Large Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-[80%] h-[80%] overflow-hidden rounded-lg shadow-2xl z-10"
          >
            <Image
              src="/images/coffee_pour.jpg"
              alt="Artisanal Espresso Craft"
              fill
              className="object-cover transition-transform duration-700 hover:scale-105"
            />
          </motion.div>

          {/* Secondary Overlay Image (Floating slightly offset) */}
          <motion.div
            initial={{ opacity: 0, y: 50, x: -30 }}
            whileInView={{ opacity: 0.85, y: 0, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="absolute bottom-4 left-4 w-[160px] h-[220px] md:w-[200px] md:h-[270px] overflow-hidden rounded-lg shadow-2xl border border-warm-ivory/10 z-20 hidden sm:block"
          >
            <Image
              src="/images/hero_bg.jpg"
              alt="Luxury Interior View"
              fill
              className="object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
