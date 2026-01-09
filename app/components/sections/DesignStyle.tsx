"use client";
import { useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

const IPhone3D = ({ className = "", color = "gray" }) => {
  // Map color names to actual colors
  const colorMap = {
    midnight: "#0A0A0A",
    ocean: "#005F73",
    forest: "#0A9396",
    sand: "#F2CC8F",
    sunset: "#AE2012",
    gold: "#C6A052"
  };
  
  const bgColor = colorMap[color as keyof typeof colorMap] || colorMap.midnight;

  return (
    <div className={`relative w-48 h-80 mx-auto ${className}`}>
      {/* iPhone body with case color */}
      <div 
        className="absolute inset-0 bg-gray-900 rounded-[40px] shadow-2xl border-[8px] flex flex-col items-center pt-6"
        style={{ borderColor: bgColor }}
      >
        {/* Screen area */}
        <div className="w-[90%] h-[90%] bg-gradient-to-b from-gray-900 to-black rounded-[30px] overflow-hidden relative">
          {/* Camera notch */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-6 bg-gray-900 rounded-b-lg flex justify-center items-center">
            <div className="w-6 h-6 rounded-full bg-gray-800"></div>
          </div>
          
          {/* Screen content */}
          <div className="absolute inset-4 rounded-[20px] bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
            <div className="w-24 h-40 border border-gray-700 rounded-lg flex items-center justify-center">
              <div className="text-gray-600 text-xs">iPhone</div>
            </div>
          </div>
        </div>
        
        {/* Case highlight */}
        <div 
          className="absolute top-0 left-0 w-full h-full rounded-[40px] pointer-events-none"
          style={{ boxShadow: `inset 0 0 20px ${bgColor}50, 0 0 20px ${bgColor}30` }}
        ></div>
        
        {/* Side buttons */}
        <div className="absolute top-16 -left-[8px] w-1 h-10" style={{ backgroundColor: bgColor }}></div>
        <div className="absolute top-28 -left-[8px] w-1 h-6" style={{ backgroundColor: bgColor }}></div>
        <div className="absolute top-36 -right-[8px] w-1 h-10" style={{ backgroundColor: bgColor }}></div>
      </div>
    </div>
  );
};

const DesignStyle = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const [selectedDesign, setSelectedDesign] = useState("midnight");
  
  // Design options with colors
  const designs = [
    { name: "Midnight", color: "midnight", value: "#0A0A0A" },
    { name: "Ocean", color: "ocean", value: "#005F73" },
    { name: "Forest", color: "forest", value: "#0A9396" },
    { name: "Sand", color: "sand", value: "#F2CC8F" },
    { name: "Sunset", color: "sunset", value: "#AE2012" },
    { name: "Gold", color: "gold", value: "#C6A052" },
  ];

  return (
    <section 
      ref={containerRef}
      className="w-full min-h-screen flex items-center justify-center relative bg-gradient-to-b from-background to-surface py-20"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light mb-6">
            Your phone. Your <span className="text-gradient">style</span>.
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Minimal. Bold. Clean. Choose a case that feels like you.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="w-full h-96 md:h-[500px] relative flex items-center justify-center">
            <motion.div
              key={selectedDesign}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="w-full h-full flex items-center justify-center"
            >
              <IPhone3D color={selectedDesign} />
            </motion.div>
          </div>
          
          <div className="space-y-8">
            <div className="space-y-4">
              <h3 className="text-2xl font-medium">Designs</h3>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {designs.map((design, index) => (
                  <motion.button
                    key={index}
                    className={`p-4 rounded-xl border transition-all ${
                      selectedDesign === design.color
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-muted-foreground/50"
                    }`}
                    onClick={() => setSelectedDesign(design.color)}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div 
                      className="w-full h-12 rounded-lg mb-2"
                      style={{ backgroundColor: design.value }}
                    />
                    <span className="text-sm font-medium">{design.name}</span>
                  </motion.button>
                ))}
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-2xl font-medium">Materials</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {["Premium TPU", "Carbon Fiber", "Leather", "Marble"].map((material, index) => (
                  <motion.button
                    key={index}
                    className="p-4 rounded-xl border border-border hover:border-muted-foreground/50 text-left transition-all"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="font-medium">{material}</span>
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DesignStyle;