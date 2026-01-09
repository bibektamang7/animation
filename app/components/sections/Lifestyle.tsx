"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

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

const Lifestyle = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Parallax effect for background elements
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);

  return (
    <section 
      ref={containerRef}
      className="w-full min-h-screen flex items-center justify-center relative bg-gradient-to-b from-background to-surface py-20"
    >
      <div className="absolute inset-0 overflow-hidden">
        {/* Parallax background elements */}
        <motion.div 
          className="absolute top-1/4 left-1/4 w-16 h-16 rounded-full bg-primary/5 blur-xl"
          style={{ y: y1 }}
        />
        <motion.div 
          className="absolute bottom-1/3 right-1/3 w-24 h-24 rounded-full bg-primary/5 blur-xl"
          style={{ y: y2 }}
        />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center mb-16"
          style={{ opacity }}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light mb-6">
            Made for <span className="text-gradient">real life</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            From workdays to weekends, Covermandu moves with you.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {[
            { 
              title: "Café", 
              desc: "Perfect grip for daily essentials", 
              icon: "☕" 
            },
            { 
              title: "Desk", 
              desc: "Professional look for work environment", 
              icon: "💼" 
            },
            { 
              title: "Pocket", 
              desc: "Slim profile for comfort and style", 
              icon: "👖" 
            }
          ].map((scene, index) => (
            <motion.div
              key={index}
              className="feature-card p-6 text-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
            >
              <div className="w-full h-48 rounded-xl bg-muted/20 mb-4 flex items-center justify-center">
                <div className="text-5xl">{scene.icon}</div>
              </div>
              <h3 className="text-xl font-medium mb-2">{scene.title}</h3>
              <p className="text-muted-foreground">{scene.desc}</p>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-16 w-full h-80 md:h-[400px] relative flex items-center justify-center">
          <motion.div
            animate={{ rotateY: [0, 10, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          >
            <IPhone3D />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Lifestyle;