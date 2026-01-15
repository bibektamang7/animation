"use client";
import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProtectionStory from "./ProtectionStory"; // adjust path

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HorizontalScrollSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const protectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const pinRaw = sectionRef.current;
      const protectionEl = protectionRef.current;

      if (!pinRaw || !triggerRef.current || !protectionEl) return;

      const horizontalDistance = pinRaw.scrollWidth - window.innerWidth;
      const extraDistance = window.innerHeight * 0.6; // space for smooth slide

      // Initially hide ProtectionStory below the viewport
      gsap.set(protectionEl, { y: "100%", visibility: "hidden" });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerRef.current,
          pin: true,
          scrub: 1.2,
          start: "top top",
          end: `+=${horizontalDistance + extraDistance}`,
          invalidateOnRefresh: true,
        }
      });

      // 1. Horizontal scroll
      tl.to(pinRaw, {
        x: -horizontalDistance,
        ease: "none"
      }, 0)

      // 2. Slide up ProtectionStory during extra scroll
      const slideStartProgress = horizontalDistance / (horizontalDistance + extraDistance);
      tl.to(
        protectionEl,
        {
          y: "0%",
          visibility: "visible",
          ease: "none"
        },
        slideStartProgress
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={triggerRef}
      className="relative w-screen h-screen"
    >
      {/* Pinned horizontal content */}
      <div ref={sectionRef} className="w-full flex h-full items-center pl-[50vw] whitespace-nowrap">
        <h2 className="text-[20vh] font-bold text-white/10 px-20 mr-20">
          PROTECTION STYLE PRECISION
        </h2>
        <h2 className="text-[20vh] font-bold text-white px-20">
          COVERMANDU
        </h2>
      </div>

      <div
        ref={protectionRef}
        className="absolute bottom-0 left-0 w-full z-10 bg-white text-black"
        style={{ pointerEvents: 'auto' }}
      >
        <ProtectionStory />
      </div>
    </section>
  );
}