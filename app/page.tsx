"use client";
import { useState, Suspense } from "react";
import ProtectionStory from "./components/sections/ProtectionStory";
import DesignStyle from "./components/sections/DesignStyle";
import FitPrecision from "./components/sections/FitPrecision";
import Lifestyle from "./components/sections/Lifestyle";
import TrustBrand from "./components/sections/TrustBrand";
import FinalCTA from "./components/sections/FinalCTA";
import HeroReveal from "./components/HeroReveal";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  
  return (
    <main className="w-full bg-background text-foreground overflow-x-hidden">
      <Suspense
        fallback={
          <div className="w-full h-screen flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        }
      >
        <HeroReveal/>
        {/* <DesignStyle />
        <FitPrecision />
        <Lifestyle />
        <TrustBrand />
        <FinalCTA /> */}
      </Suspense>
    </main>
  );
}
