"use client";
import { useState, useEffect, useRef } from "react";
import { HeroModelScene } from "@/app/components/3D/HeroModel";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const HeroSection = () => {
  const [caseAnimationProgress, setCaseAnimationProgress] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const modelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animate the case effect after component mounts
    const timer = setTimeout(() => {
      setCaseAnimationProgress(1);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  useGSAP(() => {
    // Animation for content elements
    gsap.fromTo(contentRef.current,
      {
        opacity: 0,
        x: -50,
        y: 20
      },
      {
        opacity: 1,
        x: 0,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: contentRef.current,
          start: "top 80%",
          end: "top 20%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Animation for the 3D model
    gsap.fromTo(modelRef.current,
      {
        x: 100,
        opacity: 0.7,
        rotateY: -20,
        scale: 0.8
      },
      {
        x: 0,
        opacity: 1,
        rotateY: 0,
        scale: 1,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
          toggleActions: "play none none reverse"
        }
      }
    );

    // Additional scroll animation for the model to move to the next section
    gsap.to(modelRef.current, {
      y: -200,
      x: -100,
      rotateY: 10,
      scale: 1.2,
      duration: 2,
      ease: "power3.inOut",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "center center",
        end: "bottom top",
        scrub: 1.5
      }
    });
  }, { scope: heroRef });

  return (
    <section ref={heroRef} className="w-full h-screen section-container relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-surface/50" />

      <div className="absolute inset-0 pointer-events-none"
           style={{
             backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 250 250' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
             opacity: 0.05
           }}
      />

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-primary/5 rounded-full blur-[100px]" />

      <div className="container h-screen mx-auto px-4 relative z-10">
        <div className="h-full flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-16">
          <div ref={contentRef} className="flex-1 text-center lg:text-left">
            <p
              className="text-primary tracking-[0.3em] uppercase text-sm mb-4"
            >
              Covermandu
            </p>

            <h1
              className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light leading-tight mb-6"
            >
              Designed to protect.
              <br />
              <span className="text-gradient font-medium">Styled to stand out.</span>
            </h1>

            <p
              className="text-lg md:text-xl text-muted-foreground max-w-md mx-auto lg:mx-0 mb-8"
            >
              Premium iPhone cases built for everyday life.
            </p>

            <div>
              <button
                className="group relative px-8 py-4 bg-primary text-primary-foreground rounded-full font-medium overflow-hidden btn-glow"
              >
                <span className="relative z-10">Explore the Cases</span>
                <div
                  className="absolute inset-0 bg-linear-to-r from-gold-light to-gold-dark"
                />
              </button>
            </div>
          </div>

          <div
            ref={modelRef}
            className="absolute flex-1 w-full h-120 flex items-center justify-center"
          >
            <div className="w-full h-full max-w-lg flex items-center justify-center">
              <div className="w-full h-full flex items-center justify-center">
                <HeroModelScene
                  iPhonePath="/models/iphone_16_pro_max.glb"
                  scale={2.5}
                  autoRotate={true}
                  animationProgress={caseAnimationProgress}
                  className="w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2 text-muted-foreground">
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <div>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M7 13l3 3 3-3" />
              <path d="M7 6l3 3 3-3" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;