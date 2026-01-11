"use client";
import { Suspense, useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Environment, useAnimations } from "@react-three/drei";
import * as THREE from "three";

interface ModelProps {
  iPhonePath: string;
  scale?: number;
  autoRotate?: boolean;
  animationProgress?: number;
  onLoad?: () => void;
}

export const HeroModel = ({
  iPhonePath,
  scale = 3,
  onLoad,
}: ModelProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const { scene: iPhoneScene } = useGLTF(iPhonePath);

  // Helper to convert degrees to radians
  const degToRad = (deg: number) => deg * (Math.PI / 180);

  useEffect(() => {
    if (onLoad) onLoad();
  }, [onLoad]);

  return (
    <group 
      ref={groupRef} 
      scale={scale} 
      /* Rotate 145 degrees on Y axis */
      rotation={[6, degToRad(80), 50]} 
    >
      <primitive object={iPhoneScene.clone()} position={[0, 0, 0]} />
    </group>
  );
};

const ModelFallback = () => {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#333333" wireframe />
    </mesh>
  );
};

interface HeroModelSceneProps {
  iPhonePath: string;
  scale?: number;
  autoRotate?: boolean;
  animationProgress?: number;
  className?: string;
  onLoad?: () => void;
}

export const HeroModelScene = ({
  iPhonePath,
  scale = 2.5,
  autoRotate = true,
  animationProgress = 1,
  className = "",
  onLoad,
}: HeroModelSceneProps) => {
  return (
    <div className={`${className}`}>
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 45 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "low-power" // Changed to low-power to reduce strain
        }}
        style={{ background: "transparent", minHeight: "300px" }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight
          position={[5, 5, 5]}
          intensity={0.8}
        />
        <pointLight position={[-5, -5, -5]} intensity={0.3} />

        <Suspense fallback={<ModelFallback />}>
          <HeroModel
            iPhonePath={iPhonePath}
            scale={scale}
            animationProgress={animationProgress}
            onLoad={onLoad}
          />
          <Environment preset="sunset" />
        </Suspense>
      </Canvas>
    </div>
  );
};

// Preload models
if (typeof window !== 'undefined') {
  useGLTF.preload("/models/iphone_16_pro_max.glb");
  useGLTF.preload("/models/iphone_15_pro_case.glb");
  useGLTF.preload("/models/iphone_14_pro__leather_case.glb");
}