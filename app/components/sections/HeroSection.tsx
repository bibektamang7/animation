"use client"
import { motion } from "framer-motion";
import IPhoneModel from "../3D/Iphone";

const HeroSection = () => {
  return (
    <section className="w-full h-screen section-container relative">
      <div className="absolute inset-0 bg-linear-to-b from-background via-background to-surface/50" />
      
      {/* Subtle noise texture */}
      <div className="absolute inset-0 noise pointer-events-none" />
      
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-primary/5 rounded-full blur-3xl" />

      <div className="container h-screen mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-16">
          {/* Content */}
          <motion.div 
            className="flex-1 text-center lg:text-left"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.p 
              className="text-primary tracking-[0.3em] uppercase text-sm mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Covermandu
            </motion.p>
            
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light leading-tight mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Designed to protect.
              <br />
              <span className="text-gradient font-medium">Styled to stand out.</span>
            </motion.h1>
            
            <motion.p 
              className="text-lg md:text-xl text-muted-foreground max-w-md mx-auto lg:mx-0 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              Premium iPhone cases built for everyday life.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <motion.button 
                className="group relative px-8 py-4 bg-primary text-primary-foreground rounded-full font-medium overflow-hidden btn-glow"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10">Explore the Cases</span>
                <motion.div 
                  className="absolute inset-0 bg-linear-to-r from-gold-light to-gold-dark"
                  initial={{ x: "100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
            </motion.div>
          </motion.div>

          {/* 3D Model */}
          <motion.div 
            className="flex-1 w-full h-[40rem]"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <IPhoneModel 
              modelPath="/models/iphone_16_pro_max.glb"
              scale={3}
            />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        className="scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <div className="flex flex-col items-center gap-2 text-muted-foreground">
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          {/* <ChevronDown className="w-5 h-5" /> */}
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
