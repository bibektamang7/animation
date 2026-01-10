"use client";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { CustomEase } from "gsap/dist/CustomEase";
import HeroSection from "./sections/HeroSection";

if (typeof window !== "undefined") {
  gsap.registerPlugin(CustomEase);
}

export default function HeroReveal() {
  const containerRef = useRef(null);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    CustomEase.create("hop", "M0,0 C0.354,0 0.464,0.133 0.498,0.502 0.532,0.872 0.61,1 1,1");

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "hop", duration: 1.5 }
      });

      // 1. DYNAMIC COUNTER ANIMATION
      // We animate a proxy object to update the state from 0 to 100
      const counterProxy = { value: 0 };
      tl.to(counterProxy, {
        value: 100,
        duration: 3,
        ease: "none",
        onUpdate: () => {
          setCounter(Math.floor(counterProxy.value));
        }
      });

      // 2. SLIDE THE COUNTER OUT AFTER 100%
      tl.to(".counter-display", {
        y: -100,
        opacity: 0,
        delay: 0.2,
        duration: 0.8
      });

      // 3. REMAINING REVEAL ANIMATION (UPDATED)
      tl.to(".spinner", { opacity: 0, duration: 0.5 }, "-=0.5")
        .to(".intro-logo h1", { y: 0, stagger: 0.1 }, "-=0.2")
        .to(".divider", { scaleY: 1, duration: 1.5, ease: "power2.inOut" }, "-=0.5")
        .to(".divider", { scaleY: 0, duration: 1.5, ease: "power2.out", delay: 0.5 })
        .to(".intro-logo #word1", { y: 220 }, "reveal")
        .to(".intro-logo #word2", { y: -220 }, "reveal")
        .to(".overlay > .block:first-child", {
          yPercent: -100,
          duration: 1.5,
          ease: "power2.inOut"
        }, "reveal")
        .to(".overlay > .block:last-child", {
          yPercent: 100,
          duration: 1.5,
          ease: "power2.inOut"
        }, "reveal")
        .from(".hero-model", { scale: 0, opacity: 0, duration: 1.5, ease: 'power3.inOut' }, "reveal")
        .from(".hero-content-line", { y: 20, opacity: 0, stagger: 0.2, duration: 1, ease: 'power3.out' }, "reveal+=0.5");

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={containerRef} className="relative w-full h-screen bg-black overflow-hidden text-white font-sans">
      
      <div className="loader fixed inset-0 z-20 flex flex-col items-center justify-center pointer-events-none">
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
								{/* <span className="text-lg ml-1 opacity-50">%</span> */}
            </h1>
        </div>

        <div className="spinner relative z-10 mt-24 w-10 h-10 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
      </div>

      <div className="relative w-full h-full">
				<HeroSection/>
      </div>
    </main>
  );
}