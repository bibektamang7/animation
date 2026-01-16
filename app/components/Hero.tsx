import Image from "next/image"
import { motion } from "framer-motion"

const Hero = () => {
	return (
		<section className="relative h-screen w-full bg-[#f2f2f2] text-black overflow-hidden flex flex-col justify-between">
			<motion.header
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8, ease: "easeOut" }}
				className="absolute top-0 left-0 w-full py-6 px-6 lg:px-18 flex justify-between items-start z-20"
			>
				<h1 className="text-2xl font-bold tracking-tighter">Covermandu</h1>
				<div className="flex gap-4">
					<button className="w-8 h-8 rounded-full border border-black/20 flex items-center justify-center hover:bg-black/5 transition-colors">
						<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
							<circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" />
						</svg>
					</button>
					<button className="w-8 h-8 rounded-full border border-black/20 flex items-center justify-center hover:bg-black/5 transition-colors">
						<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
							<path d="M20.5 11a5.8 5.8 0 0 0-4-4h-.2a4 4 0 0 1-7.6 0H8.5a5.8 5.8 0 0 0-4 4v.2a4 4 0 0 1 0 7.6v.2a5.8 5.8 0 0 0 4 4h.2a4 4 0 0 1 7.6 0h.2a5.8 5.8 0 0 0 4-4v-.2a4 4 0 0 1 0-7.6V11z" />
						</svg>
					</button>
				</div>
			</motion.header>
			<div className="flex-1 flex lg:flex-row h-full relative isolate">
				<div className="absolute inset-0 lg:static w-full lg:w-[45%] h-full flex flex-col justify-center items-center lg:items-start px-6 lg:pl-16 z-30 pt-20 lg:pt-0 pointer-events-none lg:pointer-events-auto">
					<div className="flex flex-col space-y-[-1rem] lg:space-y-[-2rem] mb-6 text-center lg:text-left overflow-hidden">
						<motion.span
							initial={{ y: "100%" }}
							animate={{ y: 0 }}
							transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
							className="block text-[15vw] lg:text-[11rem] leading-none font-medium tracking-tight"
						>
							feel
						</motion.span>
						<motion.span
							initial={{ y: "100%" }}
							animate={{ y: 0 }}
							transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
							className="block text-[15vw] lg:text-[11rem] leading-none font-medium tracking-tight"
						>
							better
						</motion.span>
					</div>

					<motion.p
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
						className="max-w-md text-sm lg:text-base font-medium text-black/80 leading-relaxed mb-8 text-center lg:text-left bg-white/50 lg:bg-transparent backdrop-blur-sm lg:backdrop-blur-none p-4 lg:p-0 rounded-xl lg:rounded-none"
					>
						From basic protection to thoughtful design
						Covermandu is shaping the next generation of IPhone cases.
					</motion.p>
					<motion.div
						initial={{ opacity: 0, scale: 0.9 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.5, delay: 0.6 }}
						className="pointer-events-auto"
					>
						<button className="bg-black text-white px-8 py-3 rounded-full text-sm font-medium hover:bg-black/90 transition-colors whitespace-nowrap">
							shop covermandu
						</button>
					</motion.div>
				</div>

				<div className="w-full lg:w-[85%] h-full relative flex items-center justify-center lg:justify-end lg:absolute lg:right-0 lg:top-0 z-0">
					<motion.div
						initial={{ y: "100%", opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
						className="absolute inset-0 z-0 opacity-100"
					>
						<Image
							src="/images/hero.png"
							alt="Hand holding covermandu device"
							fill
							className="object-cover lg:object-contain object-center lg:object-right-bottom"
							priority
						/>
					</motion.div>
				</div>
			</div>

			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
				className="absolute bottom-6 w-full px-6 flex justify-center z-20 pointer-events-none"
			>
				<div className="pointer-events-auto flex flex-col items-center gap-3">
					<span className="text-sm font-bold uppercase tracking-widest text-black/60 bg-white/30 backdrop-blur-md px-4 py-1 rounded-full border border-white/40 shadow-sm">
						Scroll Down
					</span>
					<motion.div
						animate={{ y: [0, 8, 0] }}
						transition={{
							duration: 1.5,
							repeat: Infinity,
							ease: "easeInOut"
						}}
						className="bg-black text-white p-2.5 rounded-full shadow-lg"
					>
						<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
							<path d="M12 5v14M5 12l7 7 7-7" />
						</svg>
					</motion.div>
				</div>
			</motion.div>
		</section>
	)
}

export default Hero