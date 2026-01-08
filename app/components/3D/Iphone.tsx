"use client";
import { useRef, Suspense, useState } from "react";
import { Canvas, useFrame, useGraph } from "@react-three/fiber";
import {
	useGLTF,
	Environment,
	Float,
	PresentationControls,
} from "@react-three/drei";
import * as THREE from "three";

interface ModelProps {
	modelPath: string;
	scale?: number;
	rotation?: [number, number, number];
	position?: [number, number, number];
	autoRotate?: boolean;
	floatIntensity?: number;
}

const Model = ({
	modelPath,
	scale = 1,
	rotation = [0, 0, 0],
	position = [0, 0, 0],
	autoRotate = true,
	floatIntensity = 1,
}: ModelProps) => {
	const groupRef = useRef<THREE.Group>(null);
	const { scene } = useGLTF(modelPath);

	// const {nodes, materials} = useGraph(scene)

	useFrame((state) => {
		if (groupRef.current && autoRotate) {
			groupRef.current.rotation.y =
				Math.sin(state.clock.elapsedTime * 0.3) * 0.3;
		}
	});

	return (
		<group
			ref={groupRef}
			position={position}
			rotation={rotation}
			scale={scale}
		>
			<primitive
				object={scene}
			/>
		</group>
	);
};

const Placeholder = () => {
	return (
		<mesh>
			<boxGeometry args={[1, 1, 1]} />
			<meshStandardMaterial color="red" />
		</mesh>
	);
};

interface IPhoneModelProps {
	modelPath?: string;
	className?: string;
	scale?: number;
	autoRotate?: boolean;
	interactive?: boolean;
}

const IPhoneModel = ({
	modelPath = "/models/iphone_12.glb",
	className = "",
	scale = 2.5,
	autoRotate = true,
	interactive = true,
}: IPhoneModelProps) => {
	return (
		<div className={`w-full h-full ${className} bg-blue-500`}>
			<Canvas
				camera={{ position: [0, 0, 5], fov: 45 }}
				dpr={[1, 2]}
				gl={{ antialias: true, alpha: true }}
				style={{ background: "transparent" }}
			>
				<ambientLight intensity={0.4} />
				<spotLight
					position={[10, 10, 10]}
					angle={0.15}
					penumbra={1}
					intensity={1}
					castShadow
				/>
				<spotLight
					position={[-10, -10, -10]}
					angle={0.15}
					penumbra={1}
					intensity={0.5}
				/>
				<pointLight
					position={[0, 5, 0]}
					intensity={0.5}
					color="#c6a052"
				/>

				{interactive ? (
					<Suspense fallback={<Placeholder />}>
						<Model
							modelPath={modelPath}
							scale={scale}
							autoRotate={autoRotate}
						/>
					</Suspense>
				) : (
					<Suspense fallback={<Placeholder />}>
						<Model
							modelPath={modelPath}
							scale={2.5}
							position={[0, -1, 0]}
							autoRotate={false}
						/>
					</Suspense>

					// <Model
					// 	modelPath={modelPath}
					// 	scale={scale}
					// 	autoRotate={autoRotate}
					// />
				)}

				<Environment preset="city" />
			</Canvas>
		</div>
	);
};

// Preload models
useGLTF.preload("/models/iphone_16_pro_max.glb");
useGLTF.preload("/models/iphone_15_pro_case.glb");
useGLTF.preload("/models/iphone_14_pro.glb");
useGLTF.preload("/models/iphone_12.glb");

export default IPhoneModel;
