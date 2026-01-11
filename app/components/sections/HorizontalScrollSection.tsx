"use client";
import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProtectionStory from "./ProtectionStory";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HorizontalScrollSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Context without scope to allow targeting global elements (.protection-story-container)
    const ctx = gsap.context(() => {
      const pinRaw = sectionRef.current;

      if (pinRaw && triggerRef.current) {
        // Create a master timeline
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: triggerRef.current,
            pin: true,
            scrub: 1.2, // Smooth scrubbing
            start: "top top",
            // End after horizontal scroll width + extra space for the "curtain" reveal
            end: () => "+=" + (pinRaw.scrollWidth + window.innerHeight),
            invalidateOnRefresh: true,
          }
        });

        // 1. Horizontal Scroll Phase
        tl.to(pinRaw, {
          x: () => -(pinRaw.scrollWidth - window.innerWidth),
          ease: "none",
          duration: 2
        });

        // 2. Curtain Reveal Phase (Protection Story Slides Up)
        // Note: We use global selector for .protection-story-container
        tl.to(".protection-story-container", {
          y: "-5t a0%",
          ease: "none", // Linear movement driven by scroll
          duration: 1, // Relative duration 
          onStart: () => {
            console.log("Protection story started")
          }
        }); // Starts after horizontal scroll finishes

      }

    });
    return () => ctx.revert();
  }, []);

  return (
    <section ref={triggerRef} className="horizontal-scroll-section relative w-full h-screen overflow-hidden bg-transparent">
      <div ref={sectionRef} className="flex h-full items-center pl-[50vw]">
        <h2 className="text-[20vh] whitespace-nowrap font-bold text-foreground/10 px-20">
          PROTECTION STYLE PRECISION
        </h2>
        <h2 className="text-[20vh] whitespace-nowrap font-bold text-foreground px-20">
          COVERMANDU
        </h2>
      </div>
    </section>
  );
}
