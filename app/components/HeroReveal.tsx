"use client";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { CustomEase } from "gsap/dist/CustomEase";
import HeroSection from "./sections/HeroSection";
import HorizontalScrollSection from "./sections/HorizontalScrollSection";
import FixedScene from "./3D/FixedSceneWrapper";
import ProtectionStory from "./sections/ProtectionStory";

if (typeof window !== "undefined") {
  gsap.registerPlugin(CustomEase);
}

export default function HeroReveal() {
  const containerRef = useRef(null);
  // proper callback ref pattern so children know when node is ready
  const [scrollContainer, setScrollContainer] = useState<HTMLDivElement | null>(null);
  const startTriggerRef = useRef(null); // Ref for where standard scroll starts

  // Create a stable callback for the ref
  const scrollContainerRefCallback = React.useCallback((node: HTMLDivElement | null) => {
    if (node !== null) {
      setScrollContainer(node);
    }
  }, []);

  const [counter, setCounter] = useState(0);
  const [isLoaderDone, setLoaderDone] = useState(false);
  const [isModelReady, setModelReady] = useState(false);

  // Failsafe: If model loading hangs or event is missed, force ready after 3s
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isModelReady) {
        console.warn("Model loading timed out or event missed - forcing reveal");
        setModelReady(true);
      }
    }, 3000); // 3 seconds max wait
    return () => clearTimeout(timer);
  }, [isModelReady]);


  // Loader timeline
  useEffect(() => {
    CustomEase.create("hop", "M0,0 C0.354,0 0.464,0.133 0.498,0.502 0.532,0.872 0.61,1 1,1");
    const counterProxy = { value: 0 };

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ onComplete: () => setLoaderDone(true) });

      tl.to(counterProxy, {
        value: 100,
        duration: 3,
        ease: "none",
        onUpdate: () => setCounter(Math.floor(counterProxy.value)),
      })
        .to(".counter-display", { y: -100, opacity: 0, delay: 0.2, duration: 0.8 })
        .to(".spinner", { opacity: 0, duration: 0.5 }, "-=0.5")
        .to(".intro-logo h1", { y: 0, stagger: 0.1 }, "-=0.2")
        .to(".divider", { scaleY: 1, duration: 1.5, ease: "power2.inOut" }, "-=0.5")
        .to(".divider", { scaleY: 0, duration: 1.5, ease: "power2.out", delay: 0.5 });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Reveal timeline
  useEffect(() => {
    if (isLoaderDone && isModelReady) {
      const ctx = gsap.context(() => {
        const revealTl = gsap.timeline();
        revealTl
          .to(".intro-logo #word1", { y: 220 }, "reveal")
          .to(".intro-logo #word2", { y: -220 }, "reveal")
          .to(".overlay > .block:first-child", { yPercent: -100, duration: 1.5, ease: "power2.inOut" }, "reveal")
          .to(".overlay > .block:last-child", { yPercent: 100, duration: 1.5, ease: "power2.inOut" }, "reveal")
          // We removed the .hero-model scale/opacity animation here because FixedScene handles it differently
          // or we can add it back if we want an initial pop-in
          .fromTo(".hero-content-line",
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, stagger: 0.2, duration: 1, ease: 'power3.out' },
            "reveal+=0.5"
          );
      }, containerRef);
      return () => ctx.revert();
    }
  }, [isLoaderDone, isModelReady]);


  // Animations are now handled in HorizontalScrollSection.tsx for perfect synchronization



  return (
    <main ref={containerRef} className={`relative w-full bg-black text-white font-sans `}>

      {/* LOADER UI */}
      <div className="loader fixed inset-0 z-50 flex flex-col items-center justify-center pointer-events-none">
        <div className="overlay absolute inset-0 flex">
          <div className="block flex-1 bg-[#121212]"></div>
          <div className="block flex-1 bg-[#121212]"></div>
        </div>

        <div className="intro-logo relative z-10 flex gap-4 overflow-hidden mb-4">
          <div id="word1" className="pr-0 overflow-hidden">
            <h1 className="text-[5vw] font-bold translate-y-[150%] uppercase tracking-tighter">Cover</h1>
          </div>
          <div id="word2" className="pl-4 overflow-hidden">
            <h1 className="ml-2 text-[5vw] font-light italic translate-y-[150%] uppercase tracking-tighter"> Mandu</h1>
          </div>
        </div>

        <div className="divider absolute z-100 w-px h-screen bg-white scale-y-0 origin-top"></div>

        <div className="counter-display absolute overflow-hidden h-12 flex items-center justify-center">
          <h1 className="text-4xl font-serif italic tracking-widest">
            {counter}
          </h1>
        </div>

        <div className="spinner relative z-10 mt-24 w-10 h-10 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
      </div>

      {/* Fixed Scene Background - z-index 1 */}
      <div className="fixed-scene-container fixed inset-0 z-1 pointer-events-none">
        <FixedScene
          scrollContainer={scrollContainer}
          onModelLoaded={() => setModelReady(true)}
        />
      </div>
      <div
        ref={scrollContainerRefCallback}
        className="relative z-10 min-h-screen"
        style={{ position: 'relative' }}
      >
        <HeroSection />
        <HorizontalScrollSection />
      </div>

    </main>
  );
}