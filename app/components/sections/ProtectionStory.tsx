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
  const galleryRef = useRef<HTMLDivElement>(null);
  const leftPanelRef = useRef<HTMLDivElement>(null);

useEffect(() => {
  if (typeof window === "undefined") return;

  const gallery = galleryRef.current;
  const leftPanel = leftPanelRef.current;

  if (!gallery || !leftPanel) return;

  // Ensure layout is ready
  const ctx = gsap.context(() => {
    ScrollTrigger.create({
      trigger: gallery,
      start: "top top",
      end: () => `+=${gallery.scrollHeight}`,
      pin: leftPanel,
      pinSpacing: true, // keeps original space (usually default)
      markers: true,
      invalidateOnRefresh: true,
    });
  });

  // Critical: refresh after DOM is stable
  const refreshTimer = setTimeout(() => {
    ScrollTrigger.refresh();
  }, 200);

  return () => {
    clearTimeout(refreshTimer);
    ctx.revert();
  };
}, []);

  return (
    <section
      className="pt-32 pb-24 bg-white text-black w-full min-h-screen"
    >
      <div className="relative container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light mb-6">
            Built to <span className="text-blue-600">protect</span> what matters
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Protection you forget is even there.
          </p>
        </div>

        <div
          ref={galleryRef}
          className="gallery flex justify-between min-h-[250vh]">
          <div

            ref={leftPanelRef}
            className="left-panel absolute top-32 left-0w-1/2 pr-8">
            <div className="w-full h-[80vh] rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center shadow-lg">
              <div className="feature-content text-2xl font-bold">Feature Panel</div>
            </div>
          </div>
          <div ref={galleryRef} className="absolute top-32 right-0 w-1/2 space-y-24">
            {features.map((feature, index) => (
              <div
                key={feature.id}
                className="w-full h-[80vh] flex flex-col lg:flex-row items-center gap-12"
              >
                <div className="content-holder w-full text-center space-y-4">
                  <h3 className="text-2xl md:text-3xl font-medium text-gray-900">
                    {feature.title}
                  </h3>
                  <p className="text-lg text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section >
  );
};

export default ProtectionStory;

