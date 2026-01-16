"use client";
import ProtectionStory from "./components/sections/ProtectionStory";
import ImageFlowAnimation from "./components/sections/ImageFlowAnimation";
import Hero from "./components/Hero";

export default function Home() {
  return (
    <main className="w-full bg-background text-foreground overflow-x-hidden">
      <Hero />

      <ProtectionStory />
      <ImageFlowAnimation />
    </main>
  );
}
