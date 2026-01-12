"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const features = [
  {
    id: 1,
    title: "Shock-absorbing edges",
    description: "Advanced TPU corners protect against drops from everyday heights.",
  },
  {
    id: 2,
    title: "Scratch-resistant",
    description: "Premium materials resist everyday wear and maintain pristine look.",
  },
  {
    id: 3,
    title: "Everyday drop protection",
    description: "Rigorously tested for real-world scenarios up to 6 feet.",
  },
];

const ProtectionStory = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const featureRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate main headline
      const headline = sectionRef.current?.querySelector(".headline");
      if (headline) {
        gsap.fromTo(
          headline,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // Animate each feature row
      featureRefs.current.forEach((feature, index) => {
        if (!feature) return;

        gsap.fromTo(
          feature,
          { y: 100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: feature,
              start: "top 85%", // Start animating when top of feature hits 85% from top
              end: "top 50%",
              scrub: 1, // Smooth scrubbed animation
              // Optional: markers: true for debugging
            },
          }
        );
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="pt-32 pb-24 bg-white text-black w-full relative min- h-screen"
    >
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Main headline */}
        <div className="headline text-center mb-20">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light mb-6">
            Built to <span className="text-blue-600">protect</span> what matters
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Protection you forget is even there.
          </p>
        </div>

        {/* Feature List */}
        <div className="relative w-full h-screen space-y-24">
          {features.map((feature, index) => (
            <div
              key={feature.id}
              ref={(el) => {
                (featureRefs.current[index] = el)
              }}
              className="flex flex-col w-full lg:flex-row items-center gap-12"
            >

              <div className="lg:w-1/2 w-full h-64 md:h-80 rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center shadow-lg">
                <div className="text-gray-500 italic text-center px-4">
                  Visual for: {feature.title}
                </div>
              </div>

              <div className="lg:w-1/2 text-center lg:text-left space-y-4">
                <h3 className="text-2xl md:text-3xl font-medium text-gray-900">
                  {feature.title}
                </h3>
                <p className="text-lg text-gray-600">{feature.description}</p>
              </div>

            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-20">
          <p className="text-xl text-gray-600 italic">
            Engineered for confidence in every drop.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProtectionStory;
