"use client";
import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const IPhone3D = ({ className = "", exploded = false }) => {
  return (
    <div className={`relative w-48 h-80 mx-auto ${className}`}>
      {!exploded ? (
        // Regular iPhone with case
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
      ) : (
        <>
          {/* iPhone body */}
          <div className="absolute inset-0 bg-gray-900 rounded-[40px] shadow-2xl border-[6px] border-gray-800 flex flex-col items-center pt-6 z-10"
               style={{ transform: 'translateX(-20px) translateY(-20px)' }}>
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
          </div>
          
          {/* Case part */}
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-600/20 to-yellow-800/30 rounded-[46px] shadow-2xl border-[6px] border-yellow-700/50 z-0"
               style={{ transform: 'translateX(20px) translateY(20px)', opacity: 0.8 }}>
          </div>
        </>
      )}
    </div>
  );
};

const FitPrecision = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const [explodedView, setExplodedView] = useState(false);

  return (
    <section 
      ref={containerRef}
      className="w-full min-h-screen flex items-center justify-center relative bg-gradient-to-b from-surface to-background py-20"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light mb-6">
            Precision in every <span className="text-gradient">detail</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Engineered for perfect fit and functionality.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="w-full h-96 md:h-[500px] relative flex items-center justify-center">
            <motion.div
              className="w-full h-full flex items-center justify-center"
              animate={{ rotateY: explodedView ? 20 : 0 }}
              transition={{ duration: 0.5 }}
            >
              <IPhone3D exploded={explodedView} />
            </motion.div>
          </div>
          
          <div className="space-y-8">
            <div className="space-y-4">
              <h3 className="text-2xl font-medium">Precision Features</h3>
              
              <div className="space-y-6">
                {[
                  { title: "Perfect fit for iPhone", desc: "Engineered specifically for your model" },
                  { title: "Responsive buttons", desc: "Precise cutouts for tactile feedback" },
                  { title: "Camera and port accuracy", desc: "Perfect alignment for all ports" },
                  { title: "Wireless charging compatible", desc: "No need to remove for charging" }
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start space-x-4 p-4 rounded-xl bg-muted/10 border border-border"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="w-3 h-3 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium">{feature.title}</h4>
                      <p className="text-sm text-muted-foreground">{feature.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            
            <motion.button
              className="group relative px-6 py-3 bg-primary text-primary-foreground rounded-full font-medium overflow-hidden btn-glow"
              onClick={() => setExplodedView(!explodedView)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10">
                {explodedView ? "Show Assembly" : "See Exploded View"}
              </span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-gold-light to-gold-dark"
                initial={{ x: "100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FitPrecision;