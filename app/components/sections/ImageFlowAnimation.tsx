"use client"
import Lenis from 'lenis';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import React, { useEffect, useRef, useState } from 'react';

/**
 * Image Flow Component
 * A robust React implementation of a 3D Z-axis image scroll gallery.
 * Fixed: Ensuring the last image perfectly covers the viewport at the end of scroll.
 */

const IMAGES = [
	"https://i.pinimg.com/1200x/6d/c1/51/6dc151fccad84848851615bf7fd5273e.jpg",
	"https://i.pinimg.com/736x/86/5b/37/865b37c273ce08ccba905cfd5c43f7fd.jpg",
	"https://i.pinimg.com/1200x/8d/ff/a1/8dffa167d7c06c98303cf74e1e684c0c.jpg",
	"https://i.pinimg.com/1200x/7a/9d/b3/7a9db3f4a8c14244c9799897c5b27e15.jpg",
	"https://i.pinimg.com/1200x/92/6a/f6/926af63e63524d0b2b5d4d29f8c2960f.jpg",
	"https://i.pinimg.com/736x/3c/fd/40/3cfd40d9da71424ccfdb4a4f23d24b15.jpg",
	"https://i.pinimg.com/736x/b3/a9/ea/b3a9eacf0a48d73daf7a9d99a641358d.jpg",
	"https://i.pinimg.com/1200x/ea/7d/64/ea7d6422e60fd7d08a2f57e7a81f8db5.jpg",
	"https://i.pinimg.com/1200x/df/e4/3e/dfe43e45689d1c604a3bdadc10ff6400.jpg",
	"https://i.pinimg.com/1200x/83/a0/61/83a0611b7dffe9a845b371161da4a6ca.jpg",
	"https://i.pinimg.com/736x/3b/30/71/3b30719fcf57e0fb4e4c7875c123be89.jpg",
	"https://i.pinimg.com/1200x/e6/9e/b6/e69eb622ea968f2d107bc5bce20aab71.jpg",
	"https://i.pinimg.com/1200x/b8/f8/a0/b8f8a07bb42de63c8a03c136457535d4.jpg",
	"https://i.pinimg.com/1200x/ce/8d/c9/ce8dc976c68aae6e5b6bf13f0b563de7.jpg",
	"https://i.pinimg.com/736x/bb/02/06/bb0206c39dbae6728fe93e97ea7caff1.jpg",
	"https://i.pinimg.com/736x/8d/70/95/8d7095181d12fd4452273eb2677a2ff4.jpg",
	"https://i.pinimg.com/736x/e4/3c/3c/e43c3c3f9bb348d26be1abd4eefbe2b7.jpg",
	"https://i.pinimg.com/736x/96/e1/ea/96e1eac3c1ccb9c7817cfd83e5d3c113.jpg",
	"https://i.pinimg.com/1200x/60/7c/14/607c144c8ed65de6179e9dcb43d0a949.jpg",
	"https://i.pinimg.com/736x/cf/a9/46/cfa94611e77bece6cb69df26f7d27c5c.jpg",
	"https://i.pinimg.com/736x/04/89/04/048904227df6ca36de30a4d0b874eaa4.jpg",
	"https://i.pinimg.com/1200x/77/ed/6f/77ed6fa44994de79cf59d92881cad332.jpg",
	"https://i.pinimg.com/1200x/b5/83/42/b583427440c3b45fb0624961bfc8ea66.jpg",
	"https://i.pinimg.com/1200x/dc/ee/8b/dcee8b92e1f9f766abe289dec5c54d85.jpg",
	"https://i.pinimg.com/736x/42/61/90/42619054f77a6e8cbbe20181b93027fd.jpg",
	"https://i.pinimg.com/736x/b6/ce/95/b6ce9557d1937922cdcc84d4abcb8143.jpg",
	"https://i.pinimg.com/1200x/a2/00/3f/a2003f95fde2cf6615a484ce3e43b33f.jpg",
	"https://i.pinimg.com/1200x/38/26/e4/3826e4c2a4cad3165d852d2ccbf078ed.jpg"
];

// Positions distributed across 3D space
const POSITIONS = [
	{ x: -0.8, y: -0.6 }, { x: 0.7, y: 0.4 }, { x: -0.5, y: 0.7 },
	{ x: 0.6, y: -0.5 }, { x: -0.8, y: 0.2 }, { x: 0.8, y: -0.3 },
	{ x: -0.6, y: -0.8 }, { x: 0.4, y: 0.6 }, { x: -0.7, y: 0.5 },
	{ x: 0.5, y: -0.7 }, { x: -0.4, y: -0.4 }, { x: 0.3, y: 0.8 },
	{ x: -0.8, y: 0.3 }, { x: 0.6, y: 0.2 }, { x: -0.2, y: -0.7 },
	{ x: 0.7, y: -0.6 }, { x: -0.5, y: 0.4 }, { x: 0.4, y: -0.4 },
	{ x: -0.6, y: 0.6 }, { x: 0.8, y: 0.5 }, { x: -0.3, y: -0.5 },
	{ x: 0.5, y: 0.3 }, { x: -0.7, y: -0.2 }, { x: 0.2, y: 0.7 },
	{ x: -0.4, y: 0.8 }, { x: 0.6, y: -0.8 }, { x: -0.8, y: 0.1 },
	{ x: 0, y: 0 } // Last one centered
];

export default function ImageFlowAnimation() {
	const flowRef = useRef<HTMLDivElement>(null);
	const imagesRef = useRef<(HTMLDivElement | null)[]>([]);

	useEffect(() => {
		gsap.registerPlugin(ScrollTrigger);

		const lenis = new Lenis({
			duration: 1.2,
			easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
			smoothWheel: true
		});

		lenis.on('scroll', ScrollTrigger.update);
		gsap.ticker.add((time: number) => lenis.raf(time * 1000));
		gsap.ticker.lagSmoothing(0);

		const images = imagesRef.current.filter(Boolean) as HTMLDivElement[];
		const screenHeight = window.innerHeight;
		const screenWidth = window.innerWidth;
		const isMobile = screenWidth < 800;
		const spread = isMobile ? 1.5 : 1.2;

		const initPos = images.map(() => ({ x: 0, y: 0, z: -1000, scale: 0.2, opacity: 0 }));
		const finalPos = images.map((_, index) => {
			const isLast = index === images.length - 1;
			return {
				x: isLast ? 0 : POSITIONS[index].x * screenWidth * spread,
				y: isLast ? 0 : POSITIONS[index].y * screenHeight * spread,
				z: 1500, // Move past the camera
				scale: isLast ? 1 : 1.5,
				opacity: 1
			};
		});

		images.forEach((img, i) => gsap.set(img, initPos[i]));

		const st = ScrollTrigger.create({
			trigger: flowRef.current,
			start: "top top",
			end: `+=${screenHeight * 6}px`, // Adjusted for better feel
			pin: true,
			scrub: 1.5,
			onUpdate: (self: any) => {
				const progress = self.progress;
				images.forEach((img, index) => {
					const isLast = index === images.length - 1;

					const startOffset = index * 0.03;
					const imgProgress = Math.min(1, Math.max(0, (progress - startOffset) / (1 - startOffset)));

					const start = initPos[index];
					const end = finalPos[index];

					let x = gsap.utils.interpolate(start.x, end.x, imgProgress);
					let y = gsap.utils.interpolate(start.y, end.y, imgProgress);
					let z = gsap.utils.interpolate(start.z, end.z, imgProgress);
					let scale = gsap.utils.interpolate(start.scale, end.scale, imgProgress);
					let opacity = imgProgress < 0.1 ? imgProgress * 10 : 1;

					if (isLast) {
						z = gsap.utils.interpolate(-800, 0, imgProgress);
						scale = gsap.utils.interpolate(0.5, 1, imgProgress);
						x = 0; y = 0;
						opacity = imgProgress; // Gradual fade in
					}

					gsap.set(img, { x, y, z, scale, opacity });
				});
			}
		});

		return () => {
			st.kill();
			lenis.destroy();
			gsap.ticker.remove((time: number) => lenis.raf(time * 1000));
		};
	}, []);

	return (
		<div className="min-h-screen bg-[#e9e9e9] overflow-x-hidden font-sans">

			<section ref={flowRef} className="h-screen w-full bg-[#111] relative overflow-hidden">
				<div className="absolute inset-0 flex items-center justify-center z-[5] pointer-events-none text-white/20 text-center font-instrument px-6">
					<p className="text-4xl md:text-7xl lg:text-9xl tracking-tighter italic">
						Covermandu
					</p>
				</div>

				<div className="absolute inset-0 w-full h-full [perspective:1200px] preserve-3d">
					{IMAGES.map((src, idx) => {
						const isLast = idx === IMAGES.length - 1;
						return (
							<div
								key={idx}
								ref={(el) => { imagesRef.current[idx] = el }}
								className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                  ${isLast ? 'w-full h-full' : 'w-[200px] h-[130px] md:w-[450px] md:h-[300px]'} 
                  overflow-hidden pointer-events-none shadow-2xl`}
							>
								<img src={src} alt="" className="w-full h-full object-cover" />
								{isLast && (
									<div className="absolute inset-0 flex flex-col items-center justify-center bg-black/30 text-white font-instrument p-12 text-center">
										<h2 className="text-4xl md:text-7xl mb-4 italic">The Destination</h2>
										<p className="font-raleway tracking-widest text-xs uppercase opacity-80">Full View Reached</p>
									</div>
								)}
							</div>
						);
					})}
				</div>
			</section>

			<section className="h-screen w-full flex items-center justify-center relative bg-white">
				<div className="text-center pointer-events-none z-10 font-raleway">
					<h1 className="font-extralight tracking-[0.3em] uppercase text-5xl md:text-8xl text-black">
						The End
					</h1>
					<p className="mt-4 font-light tracking-[0.15em] text-xs md:text-sm opacity-50 text-black">
						Reflecting on the visual path
					</p>
				</div>
			</section>
		</div>
	);
}