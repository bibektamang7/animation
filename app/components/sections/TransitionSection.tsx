"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { HeroModelScene } from "@/app/components/3D/HeroModel";

const TransitionSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Transform scroll progress to scale
  const scale = useTransform(scrollYProgress, [0, 1], [1, 2]);
  const rotateY = useTransform(scrollYProgress, [0, 1], [0, 20]);

  return (
    <section
      ref={containerRef}
      className="w-full h-screen flex items-center justify-center relative bg-gradient-to-b from-background via-surface to-surface py-20"
    >
      <div className="absolute inset-0 opacity-20"
           style={{
             backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 250 250' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
             opacity: 0.05
           }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.p
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-4"
            style={{ opacity: useTransform(scrollYProgress, [0, 0.5, 1], [1, 1, 0]) }}
          >
            Your phone goes everywhere with you.
          </motion.p>
          <motion.h2
            className="text-3xl md:text-4xl lg:text-5xl font-light text-center"
            style={{ opacity: useTransform(scrollYProgress, [0, 0.5, 1], [1, 1, 0]) }}
          >
            Your case should <span className="text-gradient">keep up</span>.
          </motion.h2>
        </motion.div>

        <div className="w-full h-96 md:h-[500px] relative flex items-center justify-center">
          <motion.div
            style={{
              scale,
              rotateY
            }}
            className="h-full flex items-center justify-center w-full"
          >
            <HeroModelScene
              iPhonePath="/models/iphone_16_pro_max.glb"
              casePath="/models/iphone_15_pro_case.glb"
              scale={2.5}
              autoRotate={false}
              animationProgress={1}
              className="w-full h-full"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TransitionSection;