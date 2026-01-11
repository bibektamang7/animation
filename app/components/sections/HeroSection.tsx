"use client";
import { useRef } from "react";
// import { useGSAP } from "@gsap/react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// // Register GSAP plugins
// if (typeof window !== "undefined") {
//   gsap.registerPlugin(ScrollTrigger);
// }

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  

  return (
    <section ref={heroRef} className="w-full h-screen section-container relative overflow-hidden bg-transparent">
        {/* Gradients and Backgrounds handled by parent or transparent */}
      
      <div className="container h-screen mx-auto px-4 relative z-10 pointer-events-none">
        <div className="h-full w-full flex items-center justify-center">
            {/* 3D Model is now in FixedScene, acting as background */}
            
            <div className="relative text-center z-10 pointer-events-auto">
                <p
                className="hero-content-line text-primary tracking-[0.3em] uppercase text-sm mb-4"
                >
                Covermandu
                </p>

                <h1
                className="hero-content-line text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light leading-tight mb-6"
                >
                Designed to protect.
                <br />
                <span className="text-gradient font-medium">Styled to stand out.</span>
                </h1>

                <p
                className="hero-content-line text-lg md:text-xl text-muted-foreground max-w-md mx-auto mb-8"
                >
                Premium iPhone cases built for everyday life.
                </p>

                <div className="hero-content-line">
                <button
                    className="group relative px-8 py-4 bg-primary text-primary-foreground rounded-full font-medium overflow-hidden btn-glow"
                >
                    <span className="relative z-10">Visit store</span>
                    <div
                    className="absolute inset-0 bg-linear-to-r from-gold-light to-gold-dark"
                    />
                </button>
                </div>
            </div>
        </div>
      </div>

      <div
        className="absolute bottom-8 left-1/2 z-50 transform -translate-x-1/2 pointer-events-auto"
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