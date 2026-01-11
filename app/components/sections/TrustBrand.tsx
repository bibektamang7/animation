"use client";
import { useRef, useState } from "react";
import { motion, useScroll } from "framer-motion";

const IPhone3D = ({ className = "" }) => {
  return (
    <div className={`relative w-48 h-80 mx-auto ${className}`}>
      {/* iPhone body */}
      <div className="absolute inset-0 bg-gray-900 rounded-[40px] shadow-2xl border-[6px] border-gray-800 flex flex-col items-center pt-6">
        {/* Screen area */}
        <div className="w-[90%] h-[90%] bg-gradient-to-b from-gray-900 to-black rounded-[30px] overflow-hidden relative">
          {/* Camera notch */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-6 bg-gray-900 rounded-b-lg flex justify-center items-center">
            <div className="w-6 h-6 rounded-full bg-gray-800"></div>
          </div>
          
          {/* Screen content */}
          <div className="absolute inset-4 border-2 border-yellow-600/30 rounded-[20px] bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
            <div className="w-24 h-40 border border-gray-700 rounded-lg flex items-center justify-center">
              <div className="text-gray-600 text-xs">iPhone</div>
            </div>
          </div>
        </div>
        
        {/* Case highlight */}
        <div className="absolute top-0 left-0 w-full h-full rounded-[40px] shadow-[inset_0_0_20px_rgba(198,160,82,0.3)] pointer-events-none"></div>
        
        {/* Side buttons */}
        <div className="absolute top-16 -left-[6px] w-1 h-10 bg-gray-800 rounded-l-lg"></div>
        <div className="absolute top-28 -left-[6px] w-1 h-6 bg-gray-800 rounded-l-lg"></div>
        <div className="absolute top-36 -right-[6px] w-1 h-10 bg-gray-800 rounded-r-lg"></div>
      </div>
    </div>
  );
};

const TrustBrand = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const trustPoints = [
    "Designed with care",
    "Quality materials",
    "Trusted by iPhone users",
  ];

  return (
    <section 
      ref={containerRef}
      className="w-full min-h-screen flex items-center justify-center relative bg-gradient-to-b from-surface to-background py-20"
      style={{ position: 'relative' }}
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light mb-6">
            Why <span className="text-gradient">Covermandu</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Proudly crafted for modern lifestyles.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="w-full h-96 md:h-[500px] mx-auto mb-16 relative flex items-center justify-center">
            <motion.div
              animate={{ 
                rotateY: [0, 10, 0],
                y: [-5, 5, -5]
              }}
              transition={{ 
                duration: 10, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <IPhone3D />
            </motion.div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {trustPoints.map((point, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <div className="w-6 h-6 rounded-full bg-primary"></div>
                </div>
                <h3 className="text-xl font-medium mb-2">{point}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustBrand;