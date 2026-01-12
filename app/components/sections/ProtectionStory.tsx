"use client";
import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const IPhone3D = ({ className = "", hasCase = true }) => {
  return (
    <div className={`relative w-48 h-80 mx-auto ${className}`}>
      {/* iPhone body */} <div className="absolute inset-0 bg-gray-900 rounded-[40px] shadow-2xl border-[6px] border-gray-800 flex flex-col items-center pt-6">
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
        
        {/* Case highlight if enabled */}
        {hasCase && (
          <div className="absolute top-0 left-0 w-full h-full rounded-[40px] shadow-[inset_0_0_20px_rgba(198,160,82,0.3)] pointer-events-none border-2 border-yellow-600/20"></div>
        )}
        
        {/* Side buttons */}
        <div className="absolute top-16 -left-[6px] w-1 h-10 bg-gray-800 rounded-l-lg"></div>
        <div className="absolute top-28 -left-[6px] w-1 h-6 bg-gray-800 rounded-l-lg"></div>
        <div className="absolute top-36 -right-[6px] w-1 h-10 bg-gray-800 rounded-r-lg"></div>
      </div>
    </div>
  );
};

const ProtectionStory = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const [showDrop, setShowDrop] = useState(false);
  
  // Update showDrop based on scroll progress
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      if (latest > 0.2 && latest < 0.8) {
        setShowDrop(true);
      } else {
        setShowDrop(false);
      }
    });
    
    return () => unsubscribe();
  }, [scrollYProgress]);


  return (
    <section 
      ref={containerRef}
      className="pt-60 bg-white text-black w-full min-h-screen flex items-center justify-center relative bg-gradient-to-b from-surface to-background py-20"
      style={{ position: 'relative' }}
    >
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light mb-6">
            Built to <span className="text-gradient">protect</span> what matters
          </h2>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Protection you forget is even there.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <motion.div 
            className="feature-card text-center p-6"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
              <div className="w-8 h-8 rounded-full bg-primary"></div>
            </div>
            <h3 className="text-xl font-medium mb-2">Shock-absorbing edges</h3>
            <p className="text-muted-foreground">Advanced TPU corners protect against drops</p>
          </motion.div>
          
          <motion.div 
            className="feature-card text-center p-6"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
              <div className="w-8 h-8 rounded-full bg-primary"></div>
            </div>
            <h3 className="text-xl font-medium mb-2">Scratch-resistant</h3>
            <p className="text-muted-foreground">Premium materials resist everyday wear</p>
          </motion.div>
          
          <motion.div 
            className="feature-card text-center p-6"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
              <div className="w-8 h-8 rounded-full bg-primary"></div>
            </div>
            <h3 className="text-xl font-medium mb-2">Everyday drop protection</h3>
            <p className="text-muted-foreground">Tested for real-world scenarios</p>
          </motion.div>
        </div>
        
        <div className="w-full h-96 md:h-[500px] relative mb-16 flex items-center justify-center">
          <motion.div
            animate={{
              y: showDrop ? [0, 100, 0] : 0,
              rotateX: showDrop ? [0, 20, 0] : 0
            }}
            transition={{
              y: { duration: 0.5, times: [0, 0.5, 1] },
              rotateX: { duration: 0.5 }
            }}
            className="w-full h-full flex items-center justify-center"
          >
            <IPhone3D hasCase={true} />
          </motion.div>
        </div>
        
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <p className="text-xl text-muted-foreground italic">
            Watch how our case absorbs impact with innovative shock-absorbing technology.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ProtectionStory;