"use client";

import { useEffect, useState, useRef } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [trailPosition, setTrailPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isHidden, setIsHidden] = useState(true);
  
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const trailRef = useRef<HTMLDivElement | null>(null);
  const glowRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsHidden(false);

      // Smooth background glow movement
      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${e.clientX - 250}px, ${e.clientY - 250}px, 0)`;
      }
    };

    const handleMouseLeave = () => {
      setIsHidden(true);
    };

    const handleMouseEnter = () => {
      setIsHidden(false);
    };

    // Attach to window
    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    // Dynamic hover elements
    const updateHoverStates = () => {
      const interactiveElements = document.querySelectorAll(
        'a, button, [role="button"], input, select, textarea, .interactive-card, .cursor-pointer'
      );

      interactiveElements.forEach((el) => {
        el.addEventListener("mouseenter", () => setIsHovered(true));
        el.addEventListener("mouseleave", () => setIsHovered(false));
      });
    };

    // Run initially and set up a mutation observer for dynamically loaded items
    updateHoverStates();
    const observer = new MutationObserver(updateHoverStates);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      observer.disconnect();
    };
  }, []);

  // Trail animation using requestAnimationFrame for perfect smooth inertia lag
  useEffect(() => {
    let animId: number;
    
    const updateTrail = () => {
      setTrailPosition((prev) => {
        const dx = position.x - prev.x;
        const dy = position.y - prev.y;
        // Dampening factor (inertia)
        const ease = 0.15; 
        return {
          x: prev.x + dx * ease,
          y: prev.y + dy * ease,
        };
      });
      animId = requestAnimationFrame(updateTrail);
    };
    
    animId = requestAnimationFrame(updateTrail);
    return () => cancelAnimationFrame(animId);
  }, [position]);

  if (isHidden) return null;

  return (
    <>
      {/* Background soft light glow (GPU accelerated) */}
      <div
        ref={glowRef}
        className="fixed top-0 left-0 w-[500px] h-[500px] rounded-full pointer-events-none z-0 opacity-15 dark:opacity-20 transition-transform duration-300 ease-out will-change-transform filter blur-[100px] hidden md:block"
        style={{
          background: "radial-gradient(circle, rgba(199, 164, 108, 0.4) 0%, rgba(78, 83, 64, 0.1) 60%, transparent 100%)",
        }}
      />

      {/* Main Cursor Dot */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 bg-gold transition-transform duration-100 ease-out hidden md:block"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: `translate3d(-50%, -50%, 0) scale(${isHovered ? 2 : 1})`,
        }}
      />

      {/* Outer Cursor Ring */}
      <div
        ref={trailRef}
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-gold/40 pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 mix-blend-difference hidden md:block"
        style={{
          left: `${trailPosition.x}px`,
          top: `${trailPosition.y}px`,
          transform: `translate3d(-50%, -50%, 0) scale(${isHovered ? 1.6 : 1})`,
          transition: "transform 0.2s cubic-bezier(0.25, 1, 0.5, 1)",
        }}
      />
    </>
  );
}
