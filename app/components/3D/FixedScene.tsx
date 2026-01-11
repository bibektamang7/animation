import React, { useRef, useLayoutEffect, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, useGLTF } from "@react-three/drei";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { HeroModel } from "./HeroModel";
import * as THREE from "three";

// Register ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface SceneProps {
  scrollContainer: HTMLDivElement | null;
  onModelLoaded?: () => void;
}

const SceneContent = ({ scrollContainer, onModelLoaded }: SceneProps) => {
  const modelRef = useRef<THREE.Group>(null);

  useGSAP(() => {
      if (!scrollContainer || !modelRef.current) return;

      const tl = gsap.timeline({
          scrollTrigger: {
              trigger: scrollContainer,
              start: "top top",
              end: "bottom bottom",
              scrub: 1,
          },
      });

      tl.to(modelRef.current.position, {
          x: 2,
          y: -1,
          z: 0,
          duration: 1,
      }, 0)
      .to(modelRef.current.rotation, {
          y: Math.PI / 2,
          duration: 1,
      }, 0);

  }, { scope: scrollContainer ?? undefined, dependencies: [scrollContainer, modelRef.current] });

  return (
        <group ref={modelRef}>
            <Suspense fallback={null}>
                 <HeroModel 
                    iPhonePath="/models/iphone_16_pro_max.glb" 
                    scale={2.5} 
                    onLoad={onModelLoaded}
                 />
            </Suspense>
        </group>
  );
};

// Re-export specific props if needed by parent
export interface FixedSceneProps extends SceneProps {}

export default function FixedScene({ scrollContainer, onModelLoaded }: FixedSceneProps) {
  // We don't need useGSAP here anymore, it's inside SceneContent

  return (
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 45 }}
        dpr={[1, 2]}
        frameloop="always"
        gl={{ 
          antialias: true, 
          alpha: true, 
          powerPreference: "high-performance",
          failIfMajorPerformanceCaveat: false
        }}
        style={{ background: "transparent", width: "100%", height: "100%" }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} />
        <pointLight position={[-5, -5, -5]} intensity={0.3} />

        <SceneContent scrollContainer={scrollContainer} onModelLoaded={onModelLoaded} />
        
        <Environment preset="sunset" />
      </Canvas>
  );
}
