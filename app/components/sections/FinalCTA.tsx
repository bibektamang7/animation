"use client";
import { useRef } from "react";
import { motion } from "framer-motion";

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

const FinalCTA = () => {
  return (
    <section className="w-full min-h-screen flex items-center justify-center relative bg-gradient-to-b from-background to-surface py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light">
            Find the case made for your <span className="text-gradient">iPhone</span>
          </h2>
        </div>
        
        <div className="w-full h-96 md:h-[500px] mx-auto mb-16 relative flex items-center justify-center">
          <motion.div
            animate={{ 
              scale: [1, 1.05, 1],
              rotateY: [0, 10, 0]
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <IPhone3D />
          </motion.div>
        </div>
        
        <div className="flex flex-col sm:flex-row justify-center gap-6 max-w-md mx-auto">
          <motion.button
            className="group relative px-8 py-4 bg-primary text-primary-foreground rounded-full font-medium overflow-hidden btn-glow"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="relative z-10">Shop Now</span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-gold-light to-gold-dark"
              initial={{ x: "100%" }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>
          
          <motion.button
            className="group relative px-8 py-4 border border-border text-foreground rounded-full font-medium overflow-hidden"
            whileHover={{ scale: 1.05, borderColor: "hsl(var(--primary))" }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="relative z-10">View All Designs</span>
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;