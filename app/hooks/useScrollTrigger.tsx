"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const useScrollTrigger = () => {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Cleanup any previous ScrollTrigger instances on unmount
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Function to create scroll-triggered animations
  const createScrollAnimation = (
    elementRef: React.RefObject<HTMLElement>,
    animationProps: gsap.TweenVars,
    triggerProps: Partial<ScrollTrigger.Vars> = {}
  ) => {
    if (!elementRef.current) return null;

    const defaultTriggerProps: Partial<ScrollTrigger.Vars> = {
      trigger: elementRef.current,
      start: "top bottom",
      end: "bottom top",
      scrub: 1,
    };

    const combinedTriggerProps = { ...defaultTriggerProps, ...triggerProps };

    // Create the animation with ScrollTrigger
    return gsap.fromTo(
      elementRef.current,
      { ...animationProps },
      {
        ...animationProps,
        scrollTrigger: combinedTriggerProps
      }
    );
  };

  return { createScrollAnimation, containerRef };
};