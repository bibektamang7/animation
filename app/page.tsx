import { Suspense } from "react";
import HeroSection from "./components/sections/HeroSection";

export default function Home() {
	return (
		<main className="w-full min-h-screen bg-background text-foreground overflow-x-hidden">
			<Suspense
				fallback={
					<div className="w-full h-full flex items-center justify-center">
						Loading....
					</div>
				}
			>
				<HeroSection />
			</Suspense>
		</main>
	);
}
